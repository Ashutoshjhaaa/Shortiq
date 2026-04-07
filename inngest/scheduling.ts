import { inngest } from "./client";
import { supabaseAdmin } from "@/lib/supabase";
import { plunk } from "@/lib/plunk";
import { buildVideoReadyEmail } from "@/lib/email-templates";

/**
 * Hourly cron job that checks for scheduled series and triggers their daily workflow.
 */
export const seriesScheduler = inngest.createFunction(
    { id: "series-scheduler", name: "Series Scheduler" },
    { cron: "0 * * * *" }, // Run every hour
    async ({ step }) => {
        // Fetch all active series
        const { data: activeSeries, error } = await supabaseAdmin
            .from("series")
            .select("id")
            .eq("status", "active");

        if (error) {
            console.error("[Scheduler] Error fetching active series:", error.message);
            return { error: error.message };
        }

        if (!activeSeries || activeSeries.length === 0) {
            return { message: "No active series found." };
        }

        // Send a daily workflow event for each active series
        const events = activeSeries.map((s) => ({
            name: "series/daily-workflow",
            data: { seriesId: s.id },
        }));

        await step.sendEvent("trigger-daily-workflows", events);

        return { count: activeSeries.length };
    }
);

/**
 * Main workflow for a single series per day:
 * 1. Wait until 2h before publish time -> Generate Video
 * 2. Wait until publish time -> Perform Publish (Email/Social)
 */
export const dailyWorkflow = inngest.createFunction(
    { id: "daily-workflow", name: "Daily Video Workflow" },
    { event: "series/daily-workflow" },
    async ({ event, step }) => {
        const { seriesId, isTest } = event.data;

        // Fetch series details
        const series = await step.run("fetch-series", async () => {
            const { data, error } = await supabaseAdmin
                .from("series")
                .select("*")
                .eq("id", seriesId)
                .single();
            if (error) throw new Error(`Series not found: ${error.message}`);
            return data;
        });

        if (series.status !== "active" && !isTest) {
            return { message: "Series is not active, skipping." };
        }

        if (!series.publish_time && !isTest) {
            return { message: "No publish time set, skipping." };
        }

        // --- CALCULATION LOGIC ---
        const now = new Date();
        const [pubHour, pubMin] = (series.publish_time || "12:00").split(":").map(Number);

        // Target publish time TODAY in UTC (assuming server is UTC or handling accordingly)
        // For simplicity, we treat the HH:mm as "server local time" or UTC
        const publishTime = new Date(now);
        publishTime.setHours(pubHour, pubMin, 0, 0);

        // If publish time already passed today, skip (scheduler handles it tomorrow)
        if (publishTime < now && !isTest) {
            return { message: "Publish time for today has already passed." };
        }

        const generationTime = new Date(publishTime);
        generationTime.setHours(generationTime.getHours() - 2);

        // --- STEP 1: WAIT & GENERATE ---
        if (!isTest && generationTime > now) {
            console.log(`[Workflow] Sleeping until generation time: ${generationTime.toISOString()}`);
            await step.sleepUntil("wait-for-generation-window", generationTime);
        }

        // Trigger the actual video generation function
        await step.invoke("trigger-video-generation", {
            function: "generate-video", // Matches the id in functions.ts
            data: { seriesId },
        });

        // --- STEP 2: WAIT & PUBLISH ---
        if (!isTest && publishTime > now) {
            console.log(`[Workflow] Sleeping until publish time: ${publishTime.toISOString()}`);
            await step.sleepUntil("wait-for-publish-window", publishTime);
        }

        // Perform Publishing Actions
        await step.run("publish-actions", async () => {
            const platforms = series.platforms || [];
            const results: string[] = [];

            // 1. Email (Plunk)
            if (platforms.includes("email")) {
                // Fetch the latest successful video for this series
                const { data: video } = await supabaseAdmin
                    .from("video_projects")
                    .select("*")
                    .eq("series_id", seriesId)
                    .order("created_at", { ascending: false })
                    .limit(1)
                    .single();

                if (video && plunk) {
                    const { data: userData } = await supabaseAdmin.auth.admin.getUserById(series.user_id);
                    if (userData?.user?.email) {
                        const emailHtml = buildVideoReadyEmail({
                            userName: userData.user.user_metadata?.full_name || userData.user.user_metadata?.name || userData.user.email.split("@")[0],
                            videoTitle: video.title || series.series_name,
                            thumbnailUrl: video.image_urls?.[0],
                            videoUrl: video.video_url,
                            niche: series.niche,
                            duration: series.video_duration,
                            language: series.language,
                            appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
                            videoProjectId: video.id,
                        });
                        await plunk.emails.send({
                            to: userData.user.email,
                            subject: `Your scheduled video is ready: ${series.series_name}`,
                            body: emailHtml,
                        });
                        results.push("Email sent via Plunk");
                    }
                }
            }

            // 2. Placeholders for Social Media
            if (platforms.includes("youtube")) {
                console.log(`[PUBLISH] [YouTube] Placeholder: Publishing video for series ${seriesId}`);
                results.push("YouTube (Placeholder executed)");
            }
            if (platforms.includes("instagram")) {
                console.log(`[PUBLISH] [Instagram] Placeholder: Publishing video for series ${seriesId}`);
                results.push("Instagram (Placeholder executed)");
            }
            if (platforms.includes("tiktok")) {
                console.log(`[PUBLISH] [TikTok] Placeholder: Publishing video for series ${seriesId}`);
                results.push("TikTok (Placeholder executed)");
            }

            return { publishedTo: results };
        });

        return { success: true, isTest };
    }
);
