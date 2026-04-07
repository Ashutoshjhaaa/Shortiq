import { inngest } from "./client";
import * as fal from "@fal-ai/serverless-client";
import { clerkClient } from "@clerk/nextjs/server";
import { RetryAfterError } from "inngest";
import { supabaseAdmin } from "../lib/supabase";
import { groqClient } from "../lib/groq";
import { getProvider, getVoiceById, LANGUAGE_CODES } from "../lib/voice-config";
import { plunk } from "../lib/plunk";
import { buildVideoReadyEmail } from "../lib/email-templates";
import { renderWithCreatomate, pollCreatomateRender } from "../actions/render";
import { parseBuffer } from "music-metadata";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Scene {
    scene_script: string;
    image_prompt: string;
}

interface ScriptData {
    title: string;
    total_script: string;
    scenes: Scene[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Splits text into chunks of at most MAX_CHARS characters.
 *  First breaks at sentence boundaries (.!?), then further splits
 *  any oversized sentence word-by-word so no chunk ever exceeds maxChars.
 */
function splitTextIntoChunks(text: string, maxChars: number = 400): string[] {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    const chunks: string[] = [];
    let currentChunk = "";

    const flushCurrent = () => {
        if (currentChunk.trim().length > 0) {
            chunks.push(currentChunk.trim());
            currentChunk = "";
        }
    };

    for (const sentence of sentences) {
        // If adding this sentence would overflow, flush first
        if ((currentChunk + sentence).length > maxChars && currentChunk.length > 0) {
            flushCurrent();
        }

        // If the sentence itself is longer than maxChars, split it word-by-word
        if (sentence.length > maxChars) {
            const words = sentence.trim().split(/\s+/);
            for (const word of words) {
                if ((currentChunk + " " + word).trim().length > maxChars) {
                    flushCurrent();
                }
                currentChunk = currentChunk.length === 0 ? word : currentChunk + " " + word;
            }
        } else {
            currentChunk += sentence;
        }
    }

    flushCurrent();
    return chunks;
}

/** Upload raw bytes to Supabase Storage and return the public URL */
async function uploadToStorage(
    bucket: string,
    path: string,
    body: ArrayBuffer | Buffer,
    contentType: string
): Promise<string> {
    const { error } = await supabaseAdmin.storage
        .from(bucket)
        .upload(path, body, { contentType, upsert: true });

    if (error) throw new Error(`Storage upload failed (${bucket}/${path}): ${error.message}`);

    const { data } = supabaseAdmin.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
}

/** Parse video duration string like "30-40" → midpoint in seconds (35) */
function parseDurationSeconds(videoDuration: string): number {
    const parts = videoDuration.replace(/[^0-9-]/g, "").split("-").map(Number);
    const avg = parts.length === 2 ? (parts[0] + parts[1]) / 2 : parts[0] ?? 60;
    return avg;
}

// ─── TTS: Deepgram ────────────────────────────────────────────────────────────

async function generateDeepgramAudio(
    text: string,
    voiceId: string
): Promise<ArrayBuffer> {
    const response = await fetch(
        `https://api.deepgram.com/v1/speak?model=${encodeURIComponent(voiceId)}`,
        {
            method: "POST",
            headers: {
                Authorization: `Token ${process.env.DEEPGRAM_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text }),
        }
    );

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`Deepgram TTS failed: ${response.status} ${err}`);
    }

    return response.arrayBuffer();
}

/** 
 * Splits long Whisper segments into smaller "punchy" chunks of ~3 words each.
 */
function splitSegmentsIntoPunchyChunks(segments: any[]): any[] {
    const punchySegments: any[] = [];
    const WORDS_PER_CHUNK = 3;

    for (const seg of segments) {
        const words = seg.text.trim().split(/\s+/);
        if (words.length <= WORDS_PER_CHUNK) {
            punchySegments.push(seg);
            continue;
        }

        const duration = seg.end - seg.start;
        let currentStart = seg.start;

        for (let i = 0; i < words.length; i += WORDS_PER_CHUNK) {
            const chunkWords = words.slice(i, i + WORDS_PER_CHUNK);
            const chunkText = chunkWords.join(" ");
            const chunkDuration = (chunkWords.length / words.length) * duration;
            const currentEnd = currentStart + chunkDuration;

            punchySegments.push({
                start: currentStart,
                end: currentEnd,
                text: chunkText
            });

            currentStart = currentEnd;
        }
    }
    return punchySegments;
}

/** 
 * Generate SRT captions from audio URL using Groq's Whisper API.
 */
async function generateGroqWhisperCaptions(
    audioUrl: string,
    language: string,
    targetDuration?: number
): Promise<string> {
    let langCode = LANGUAGE_CODES[language] || "en";

    // Groq Whisper expects 2-letter ISO codes (e.g., "hi" instead of "hi-IN")
    if (langCode.includes("-")) {
        langCode = langCode.split("-")[0];
    }

    const audioRes = await fetch(audioUrl);
    if (!audioRes.ok) {
        throw new Error(`Failed to download audio from ${audioUrl}: ${audioRes.statusText}`);
    }
    const audioBuffer = await audioRes.arrayBuffer();
    const buffer = Buffer.from(audioBuffer);
    const file = new File([buffer], "audio.mp3", { type: "audio/mpeg" });

    try {
        const transcription = await groqClient.audio.transcriptions.create({
            file: file,
            model: "whisper-large-v3",
            prompt: "Please generate accurate subtitles with correct punctuation and capitalization. Keep segments natural.",
            response_format: "verbose_json",
            language: langCode,
        });

        let segments = (transcription as any).segments;
        if (!segments || !Array.isArray(segments) || segments.length === 0) {
            const text = (transcription as any).text;
            if (text) {
                return `1\n00:00:00,000 --> 00:00:10,000\n${text}\n`;
            }
            throw new Error("Groq Whisper did not return valid segments.");
        }

        segments = splitSegmentsIntoPunchyChunks(segments);

        if (targetDuration && segments.length > 0) {
            const last = segments[segments.length - 1];
            if (last.end < targetDuration) {
                last.end = targetDuration;
            }
        }

        const srt = segments
            .map((seg: any, i: number) => {
                const fmtTime = (s: number) => {
                    const h = Math.floor(s / 3600).toString().padStart(2, "0");
                    const m = Math.floor((s % 3600) / 60).toString().padStart(2, "0");
                    const sec = Math.floor(s % 60).toString().padStart(2, "0");
                    const ms = Math.round((s % 1) * 1000).toString().padStart(3, "0");
                    return `${h}:${m}:${sec},${ms}`;
                };
                return `${i + 1}\n${fmtTime(seg.start)} --> ${fmtTime(seg.end)}\n${seg.text.trim().toUpperCase()}\n`;
            })
            .join("\n");

        return srt;
    } catch (err: any) {
        console.error("Groq Whisper Error:", err.message);
        throw new Error(`Groq Whisper STT failed: ${err.message}`);
    }
}

// ─── TTS: Sarvam AI ──────────────────────────────────────────────────────────

async function generateSarvamAudio(
    text: string,
    voiceId: string,
    languageCode: string
): Promise<{ buffer: ArrayBuffer; duration: number }> {
    const response = await fetch("https://api.sarvam.ai/text-to-speech", {
        method: "POST",
        headers: {
            "api-subscription-key": process.env.SARVAM_API_KEY || "",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            inputs: [text],
            target_language_code: languageCode,
            speaker: voiceId,
            model: "bulbul:v3",
        }),
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`Sarvam AI TTS failed: ${response.status} ${err}`);
    }

    const data = await response.json();
    if (!data.audios || !data.audios[0]) {
        throw new Error("Sarvam AI TTS returned no audio data.");
    }
    
    const base64Audio = data.audios[0];
    const buffer = Buffer.from(base64Audio, "base64");

    try {
        const metadata = await parseBuffer(buffer, 'audio/mpeg');
        const duration = metadata.format.duration || 0;
        return { buffer: buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) as ArrayBuffer, duration };
    } catch (e) {
        console.warn("Could not parse metadata for Sarvam audio", e);
        return { buffer: buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) as ArrayBuffer, duration: 0 };
    }
}

// ─── Inngest Functions ────────────────────────────────────────────────────────

export const helloWorld = inngest.createFunction(
    { id: "hello-world" },
    { event: "test/hello.world" },
    async ({ event, step }) => {
        await step.sleep("wait-a-moment", "1s");
        return { message: `Hello ${event.data.name || "World"}!` };
    }
);

export const generateVideo = inngest.createFunction(
    { id: "generate-video", retries: 5 },
    { event: "video/generate" },
    async ({ event, step }) => {
        const { seriesId, testMock } = event.data;

        if (!seriesId) {
            throw new Error("No seriesId provided.");
        }

        const series = await step.run("fetch-series-data", async () => {
            const { data, error } = await supabaseAdmin
                .from("series")
                .select("*")
                .eq("id", seriesId)
                .single();

            if (error) throw new Error(`Failed to fetch series: ${error.message}`);
            return data;
        });

        const videoProjectId = await step.run("create-video-placeholder", async () => {
            const { data, error } = await supabaseAdmin
                .from("video_projects")
                .insert({
                    series_id: seriesId,
                    user_id: series.user_id,
                    title: "Generating...",
                    total_script: "",
                    scenes: [],
                    status: "generating",
                })
                .select("id")
                .single();

            if (error) throw new Error(`Failed to create video placeholder: ${error.message}`);
            return data.id;
        });

        const scriptData = await step.run("generate-video-script", async () => {
            if (testMock) {
                console.log("Mock Mode: Returning sample script data.");
                return {
                    title: "Mock Video Title",
                    total_script: "This is a mock script for testing purposes.",
                    scenes: [{ scene_script: "Mock scene 1", image_prompt: "Mock image prompt 1" }]
                } as ScriptData;
            }

            console.log(`[Script] Generating script for Niche: "${series.niche}", Style: "${series.video_style}", Lang: "${series.language}"`);

            const prompt = `You are an expert video content creator. Generate a high-quality video script, title, and image prompts for a short-form video based on the following series data:
- Niche: ${series.niche || "General"}
- Duration: ${series.video_duration || "30-40"} seconds
- Video Style: ${series.video_style || "Cinematic"}
- Language: ${series.language || "English"}

Rules:
1. The script must be natural, engaging, and suitable for a voiceover.
2. Generate 4-6 scenes.
3. Each scene must include "scene_script" (spoken words) and "image_prompt" (visual description matching the ${series.video_style || "Cinematic"} style).
4. Include "total_script" (concatenated spoken words) and "title".
5. Respond ONLY with a valid JSON object.

Expected Output Structure:
{
  "title": "Compelling Title",
  "total_script": "Full script text...",
  "scenes": [
    { "scene_script": "text...", "image_prompt": "description..." }
  ]
}`;

            try {
                const completion = await groqClient.chat.completions.create({
                    model: "llama-3.3-70b-versatile",
                    messages: [{ role: "user", content: prompt }],
                    response_format: { type: "json_object" },
                    temperature: 0.7,
                });

                let rawText = completion.choices[0]?.message?.content;
                if (!rawText) throw new Error("Groq returned no text.");

                // Clean potential markdown and log
                rawText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
                console.log("[Script] Raw LLM response:", rawText);

                let parsed = JSON.parse(rawText);
                
                // --- ROBUST PARSING ---
                // If it's wrapped in an outer key (like { "video": { ... } }), unwrap it
                if (!parsed.scenes && Object.keys(parsed).length === 1) {
                    const firstKey = Object.keys(parsed)[0];
                    if (parsed[firstKey] && typeof parsed[firstKey] === 'object') {
                        console.log(`[Script] Unwrapping JSON from key: "${firstKey}"`);
                        parsed = parsed[firstKey];
                    }
                }

                // Ensure scenes exists or try to find an array
                if (!parsed.scenes || !Array.isArray(parsed.scenes)) {
                    const arrayKey = Object.keys(parsed).find(k => Array.isArray(parsed[k]));
                    if (arrayKey) {
                        console.log(`[Script] Found array under key "${arrayKey}", assuming these are scenes.`);
                        parsed.scenes = parsed[arrayKey];
                    }
                }

                if (!parsed.scenes || parsed.scenes.length === 0) {
                    console.error("[Script] CRITICAL: No scenes found in parsed object. Keys present:", Object.keys(parsed));
                }

                return parsed as ScriptData;

            } catch (err: any) {
                console.error("[Script] Groq/Parsing Error:", err.message);
                if (err.status === 429) throw new RetryAfterError(`Rate limit`, "1m");
                throw err;
            }
        });

        if (!scriptData || !scriptData.scenes || scriptData.scenes.length === 0) {
            console.error("[Script] Final check failed. ScriptData structure:", JSON.stringify(scriptData));
            throw new Error(`No scenes generated. Check Inngest logs for raw LLM response.`);
        }

        const voice = await step.run("generate-voice", async () => {
            // Robust case-insensitive lookup
            const displayLang = series.language || "English";
            const normalizedLang = displayLang.charAt(0).toUpperCase() + displayLang.slice(1).toLowerCase();
            
            const provider = series.model_name || getProvider(displayLang);
            const langCode = series.model_lang_code || (LANGUAGE_CODES[normalizedLang] ?? LANGUAGE_CODES[displayLang] ?? displayLang);
            
            const internalVoiceId = series.voice_id;
            const voiceOption = getVoiceById(internalVoiceId);
            const actualVoiceId = voiceOption ? voiceOption.voiceId : internalVoiceId;
            const script = scriptData.total_script;
            const fileName = `${seriesId}-${Date.now()}.mp3`;

            console.log(`[Voice] Generating audio via ${provider} for language: "${displayLang}" (Code: "${langCode}")`);

            let audioBuffer: ArrayBuffer;
            let durationSeconds = 0;

            if (provider === "deepgram") {
                audioBuffer = await generateDeepgramAudio(script, actualVoiceId);
                const metadata = await parseBuffer(Buffer.from(audioBuffer), 'audio/mpeg');
                durationSeconds = metadata.format.duration || parseDurationSeconds(series.video_duration);
            } else {
                const result = await generateSarvamAudio(script, actualVoiceId, langCode);
                audioBuffer = result.buffer;
                durationSeconds = result.duration;
            }

            if (!audioBuffer) throw new Error(`Failed to generate audio via ${provider}`);

            const audioUrl = await uploadToStorage("video-audio", fileName, audioBuffer, "audio/mpeg");
            if (durationSeconds <= 0) durationSeconds = parseDurationSeconds(series.video_duration);
            
            console.log(`[Voice] Audio uploaded: ${audioUrl} (Duration: ${durationSeconds}s)`);
            return { audioUrl, durationSeconds };
        });

        const captions = await step.run("generate-captions", async () => {
            const srtContent = await generateGroqWhisperCaptions(voice.audioUrl, series.language, voice.durationSeconds);
            const fileName = `${seriesId}-${Date.now()}.srt`;
            const captionsUrl = await uploadToStorage("video-captions", fileName, Buffer.from(srtContent, "utf-8"), "text/plain");
            return { captionsUrl };
        });

        const images = await step.run("generate-images", async () => {
            const imageUrls: string[] = [];
            const leonardoKey = process.env.LEONARDO_API_KEY;

            async function generateWithLeonardo(prompt: string): Promise<string> {
                if (!leonardoKey) throw new Error("LEONARDO_API_KEY not set");

                const genRes = await fetch("https://cloud.leonardo.ai/api/rest/v1/generations", {
                    method: "POST",
                    headers: { 
                        Authorization: `Bearer ${leonardoKey}`, 
                        "Content-Type": "application/json", 
                        Accept: "application/json" 
                    },
                    body: JSON.stringify({ 
                        prompt, 
                        modelId: "6b645e3a-d64f-4341-a6d8-7a3690fbf042", 
                        width: 576, 
                        height: 1024, 
                        num_images: 1 
                    })
                });
                if (!genRes.ok) {
                    const err = await genRes.text();
                    throw new Error(`Leonardo failed (${genRes.status}): ${err}`);
                }
                const genData = await genRes.json();
                const generationId = genData?.sdGenerationJob?.generationId;
                if (!generationId) throw new Error("No generationId returned from Leonardo");

                const deadline = Date.now() + 2 * 60 * 1000;
                while (Date.now() < deadline) {
                    await new Promise(r => setTimeout(r, 3000));
                    const pollRes = await fetch(`https://cloud.leonardo.ai/api/rest/v1/generations/${generationId}`, { 
                        headers: { Authorization: `Bearer ${leonardoKey}`, Accept: "application/json" } 
                    });
                    if (!pollRes.ok) continue;

                    const pollData = await pollRes.json();
                    const status = pollData?.generations_by_pk?.status;
                    const imgs = pollData?.generations_by_pk?.generated_images;
                    if (status === "COMPLETE" && imgs?.length > 0) return imgs[0].url;
                    if (status === "FAILED") throw new Error("Leonardo generation failed");
                }
                throw new Error("Leonardo timeout after 2 minutes");
            }

            async function generateWithPollinations(prompt: string): Promise<string> {
                // Fixed URL format for Pollinations
                const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=768&nologo=true&seed=${Date.now()}`;
                const res = await fetch(url);
                if (!res.ok) throw new Error(`Pollinations failed (${res.status})`);
                return url;
            }

            async function generateWithFal(prompt: string): Promise<string> {
                const falKey = process.env.FAL_API_KEY;
                if (!falKey) throw new Error("FAL_API_KEY not set");

                console.log(`[Fal.ai] Starting generation for prompt: "${prompt.substring(0, 50)}..."`);
                
                const response = await fetch("https://fal.run/fal-ai/flux/schnell", {
                    method: "POST",
                    headers: {
                        Authorization: `Key ${falKey}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        prompt,
                        image_size: "portrait_4_3",
                        num_images: 1,
                    })
                });

                if (!response.ok) {
                    const err = await response.text();
                    console.error(`[Fal.ai] API failed: ${response.status} ${err}`);
                    throw new Error(`Fal.ai failed (${response.status})`);
                }

                const result = await response.json();
                if (result.images && result.images.length > 0) {
                    console.log(`[Fal.ai] Generation successful: ${result.images[0].url}`);
                    return result.images[0].url;
                }
                throw new Error("Fal.ai returned no images");
            }

            async function generateWithAIHorde(prompt: string): Promise<string> {
                console.log(`[AI Horde] Starting generation for prompt: "${prompt.substring(0, 50)}..."`);
                const apiKey = process.env.AI_HORDE_API_KEY || "0000000000";
                
                const response = await fetch("https://aihorde.net/api/v2/generate/async", {
                    method: "POST",
                    headers: {
                        "apikey": apiKey,
                        "Content-Type": "application/json",
                        "Client-Agent": "ShortIQ:1.0:unknown"
                    },
                    body: JSON.stringify({
                        prompt,
                        params: {
                            n: 1,
                            steps: 20,
                            width: 512, // More standard size
                            height: 768,
                            sampler_name: "k_euler_a",
                            cfg_scale: 7
                        }
                    })
                });

                if (!response.ok) {
                    const err = await response.text();
                    console.error(`[AI Horde] Initiation failed: ${response.status} ${err}`);
                    throw new Error(`AI Horde initiation failed: ${response.status}`);
                }

                const { id, message } = await response.json();
                if (message) console.log(`[AI Horde] Message: ${message}`);
                console.log(`[AI Horde] Job ID: ${id}`);
                
                const deadline = Date.now() + 5 * 60 * 1000; // 5 mins
                while (Date.now() < deadline) {
                    await new Promise(r => setTimeout(r, 5000));
                    const checkRes = await fetch(`https://aihorde.net/api/v2/generate/check/${id}`);
                    if (!checkRes.ok) {
                        console.warn(`[AI Horde] Check failed: ${checkRes.status}`);
                        continue;
                    }

                    const checkData = await checkRes.json();
                    console.log(`[AI Horde] Status: done=${checkData.done}, wait=${checkData.wait_time}s, queue=${checkData.queue_position}`);
                    
                    if (checkData.done) {
                        const statusRes = await fetch(`https://aihorde.net/api/v2/generate/status/${id}`);
                        if (!statusRes.ok) throw new Error("Failed to fetch AI Horde status");
                        const statusData = await statusRes.json();
                        const generations = statusData.generations;
                        if (generations && generations.length > 0) {
                            console.log(`[AI Horde] Generation successful: ${generations[0].img}`);
                            return generations[0].img;
                        }
                        throw new Error("AI Horde returned no images");
                    }
                }
                throw new Error("AI Horde timeout");
            }

            for (const [i, scene] of scriptData.scenes.entries()) {
                let tempUrl: string | null = null;
                let usedProvider = "unknown";

                try {
                    console.log(`[Image] Scene ${i + 1}: trying Leonardo.AI...`);
                    tempUrl = await generateWithLeonardo(scene.image_prompt);
                    usedProvider = "Leonardo.AI";
                } catch (err: any) {
                    console.warn(`[Image] Scene ${i + 1}: Leonardo failed (${err.message}), falling back to Fal.ai...`);
                    try {
                        tempUrl = await generateWithFal(scene.image_prompt);
                        usedProvider = "Fal.ai";
                    } catch (fErr: any) {
                        console.warn(`[Image] Scene ${i + 1}: Fal.ai failed (${fErr.message}), falling back to AI Horde...`);
                        try {
                            tempUrl = await generateWithAIHorde(scene.image_prompt);
                            usedProvider = "AI Horde";
                        } catch (hErr: any) {
                            console.warn(`[Image] Scene ${i + 1}: AI Horde failed (${hErr.message}), falling back to Pollinations...`);
                            try {
                                tempUrl = await generateWithPollinations(scene.image_prompt);
                                usedProvider = "Pollinations.ai";
                            } catch (pErr: any) {
                                throw new Error(`All providers (Leonardo, Fal, AI Horde, Pollinations) failed for scene ${i + 1}: ${pErr.message}`);
                            }
                        }
                    }
                }

                const imageRes = await fetch(tempUrl!);
                const buffer = Buffer.from(await imageRes.arrayBuffer());
                const fileName = `${seriesId}/scene-${i + 1}-${Date.now()}.jpg`;
                const url = await uploadToStorage("video-images", fileName, buffer, "image/jpeg");
                
                console.log(`[Image] Scene ${i + 1} uploaded via ${usedProvider}: ${url}`);
                imageUrls.push(url);
            }
            return { imageUrls };
        });

        await step.run("save-everything", async () => {
            await supabaseAdmin.from("video_projects").update({
                title: scriptData.title,
                total_script: scriptData.total_script,
                scenes: scriptData.scenes,
                audio_url: voice.audioUrl,
                captions_url: captions.captionsUrl,
                image_urls: images.imageUrls,
                status: "rendering",
                updated_at: new Date().toISOString(),
            }).eq("id", videoProjectId);

            await supabaseAdmin.from("series").update({ video_status: "completed" }).eq("id", seriesId);
            return { success: true };
        });

        await step.run("render-and-wait", async () => {
            const { data: project } = await supabaseAdmin.from("video_projects").select("captions_url, audio_url, image_urls, render_id").eq("id", videoProjectId).single();
            let renderId = project?.render_id;
            if (!renderId) {
                let srtContent = "";
                if (project?.captions_url) {
                    const srtRes = await fetch(project.captions_url);
                    if (srtRes.ok) srtContent = await srtRes.text();
                }
                const renderRes = await renderWithCreatomate({
                    videoProjectId, imageUrls: project?.image_urls || [], audioUrl: project?.audio_url || "", srtContent,
                    captionStyle: series.caption_style || "classic", durationSeconds: voice.durationSeconds,
                    webhookUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/creatomate`,
                });
                renderId = renderRes.renderId;
                await supabaseAdmin.from("video_projects").update({ render_id: renderId, status: "rendering" }).eq("id", videoProjectId);
            }

            const startTime = Date.now();
            let status = "planned";
            while (status !== "succeeded" && status !== "failed") {
                if (Date.now() - startTime > 4 * 60 * 1000) { status = "failed"; break; }
                await new Promise(r => setTimeout(r, 5000));
                const poll = await pollCreatomateRender(renderId!);
                status = poll.status;
                await supabaseAdmin.from("video_projects").update({
                    status: status === "succeeded" ? "ready" : status === "failed" ? "failed" : "rendering",
                    video_url: poll.videoUrl,
                    updated_at: new Date().toISOString(),
                }).eq("id", videoProjectId);
            }
            return { status };
        });

        await step.run("send-email-notification", async () => {
            try {
                if (!plunk) return;
                const clerk = await clerkClient();
                const user = await clerk.users.getUser(series.user_id);
                const userEmail = user.emailAddresses[0]?.emailAddress;
                if (!userEmail) return;
                const userName = user.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : userEmail.split("@")[0];
                const htmlBody = buildVideoReadyEmail({
                    userName, videoTitle: scriptData.title, thumbnailUrl: images.imageUrls?.[0], videoUrl: undefined,
                    niche: series.niche, duration: series.video_duration, language: series.language,
                    appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000", videoProjectId,
                });
                await plunk.emails.send({ to: userEmail, subject: `🎬 Your video "${scriptData.title}" is ready!`, body: htmlBody });
            } catch (err) { console.error("Email failed", err); }
        });

        return { success: true, seriesId };
    }
);
