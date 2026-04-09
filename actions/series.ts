"use server";

import { auth } from "@/lib/clerk-server";
import { supabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { inngest } from "@/inngest/client";
import { getProvider, LANGUAGE_CODES } from "@/lib/voice-config";

export interface SeriesData {
    seriesName: string;
    niche: string;
    language: string;
    voice: string;
    backgroundMusic: string[];
    videoStyle: string;
    captionStyle: string;
    videoDuration: string;
    platforms: string[];
    publishTime: string;
}

export async function createSeries(data: SeriesData) {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    try {
        const modelName = getProvider(data.language);
        const modelLangCode = LANGUAGE_CODES[data.language] || data.language;

        const { data: inserted, error } = await supabaseAdmin.from("series").insert({
            user_id: userId,
            series_name: data.seriesName,
            niche: data.niche,
            language: data.language,
            voice_id: data.voice,
            background_music: data.backgroundMusic,
            video_style: data.videoStyle,
            caption_style: data.captionStyle,
            video_duration: data.videoDuration,
            platforms: data.platforms,
            publish_time: data.publishTime,
            status: "active",
            video_status: "pending",
            model_name: modelName,
            model_lang_code: modelLangCode,
        }).select("id").single();

        if (error) {
            console.error("Error creating series:", error);
            throw new Error(`Failed to save series: ${error.message}`);
        }

        // Trigger Inngest video generation immediately after series creation
        if (inserted?.id) {
            await inngest.send({
                name: "video/generate",
                data: { seriesId: inserted.id },
            });
        }

        revalidatePath("/dashboard");
        return { success: true };
    } catch (err: any) {
        console.error("createSeries failure:", err);
        return { success: false, error: err.message };
    }
}

export async function updateSeries(id: string, data: Partial<SeriesData>) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    try {
        const updatePayload: any = {
            series_name: data.seriesName,
            niche: data.niche,
            language: data.language,
            voice_id: data.voice,
            background_music: data.backgroundMusic,
            video_style: data.videoStyle,
            caption_style: data.captionStyle,
            video_duration: data.videoDuration,
            platforms: data.platforms,
            publish_time: data.publishTime,
        };

        if (data.language) {
            updatePayload.model_name = getProvider(data.language);
            updatePayload.model_lang_code = LANGUAGE_CODES[data.language] || data.language;
        }

        const { error } = await supabaseAdmin
            .from("series")
            .update(updatePayload)
            .eq("id", id)
            .eq("user_id", userId);

        if (error) throw error;
        revalidatePath("/dashboard");
        return { success: true };
    } catch (err: any) {
        console.error("updateSeries failure:", err);
        return { success: false, error: err.message };
    }
}

export async function triggerVideoGeneration(seriesId: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    try {
        await inngest.send({
            name: "video/generate",
            data: { seriesId },
        });
        return { success: true };
    } catch (err: any) {
        console.error("triggerVideoGeneration failure:", err);
        return { success: false, error: err.message };
    }
}

export async function fastTrackWorkflow(seriesId: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    try {
        await inngest.send({
            name: "series/daily-workflow",
            data: { seriesId, isTest: true },
        });
        return { success: true };
    } catch (err: any) {
        console.error("fastTrackWorkflow failure:", err);
        return { success: false, error: err.message };
    }
}

export async function deleteSeries(id: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    try {
        const { error } = await supabaseAdmin
            .from("series")
            .delete()
            .eq("id", id)
            .eq("user_id", userId);

        if (error) throw error;
        revalidatePath("/dashboard");
        return { success: true };
    } catch (err: any) {
        console.error("deleteSeries failure:", err);
        return { success: false, error: err.message };
    }
}

export async function toggleSeriesStatus(id: string, currentStatus: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const newStatus = currentStatus === "paused" ? "active" : "paused";

    try {
        const { error } = await supabaseAdmin
            .from("series")
            .update({ status: newStatus })
            .eq("id", id)
            .eq("user_id", userId);

        if (error) throw error;
        revalidatePath("/dashboard");
        return { success: true, newStatus };
    } catch (err: any) {
        console.error("toggleSeriesStatus failure:", err);
        return { success: false, error: err.message };
    }
}

export async function getSeriesById(id: string) {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }

    try {
        const { data, error } = await supabaseAdmin
            .from("series")
            .select("*")
            .eq("id", id)
            .eq("user_id", userId)
            .single();

        if (error) {
            console.error("Error fetching series by ID:", error);
            throw new Error(`Failed to fetch series: ${error.message}`);
        }

        return {
            success: true,
            data: {
                id: data.id,
                seriesName: data.series_name,
                niche: data.niche,
                language: data.language,
                voice: data.voice_id,
                backgroundMusic: data.background_music,
                videoStyle: data.video_style,
                captionStyle: data.caption_style,
                videoDuration: data.video_duration,
                platforms: data.platforms,
                publishTime: data.publish_time,
            }
        };
    } catch (err: any) {
        console.error("getSeriesById failure:", err);
        return { success: false, error: err.message };
    }
}
