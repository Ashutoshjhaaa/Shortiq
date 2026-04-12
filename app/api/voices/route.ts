/**
 * GET /api/voices?language=Hindi
 *
 * Returns curated voice list: 2 male + 2 female voices
 * based on the selected language.
 *
 * - Indian languages → Sarvam AI voices
 * - Foreign languages → Deepgram voices
 *
 * No external API calls are made — uses static voice pool.
 */

import { NextRequest, NextResponse } from "next/server";
import { getVoicesForLanguage, LANGUAGE_CODES } from "@/lib/voice-config";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get("language");

    // ── Validate ─────────────────────────────────────────────────────
    if (!language) {
        return NextResponse.json(
            { error: "Missing required query parameter: language" },
            { status: 400 }
        );
    }

    if (!LANGUAGE_CODES[language]) {
        return NextResponse.json(
            {
                error: `Unsupported language: "${language}"`,
                supported: Object.keys(LANGUAGE_CODES),
            },
            { status: 400 }
        );
    }

    // ── Get voices ───────────────────────────────────────────────────
    const result = getVoicesForLanguage(language);

    return NextResponse.json(result, { status: 200 });
}
