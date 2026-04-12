interface VideoReadyEmailData {
    userName: string;
    videoTitle: string;
    thumbnailUrl?: string;
    videoUrl?: string;
    niche: string;
    duration: string;
    language: string;
    appUrl: string;
    videoProjectId: string;
}

export function buildVideoReadyEmail(data: VideoReadyEmailData): string {
    const {
        userName,
        videoTitle,
        thumbnailUrl,
        videoUrl,
        niche,
        duration,
        language,
        appUrl,
        videoProjectId,
    } = data;

    const viewUrl = `${appUrl}/dashboard/videos`;
    const downloadUrl = videoUrl || viewUrl;
    const firstName = userName?.split(" ")[0] || "there";

    const thumbnailSection = thumbnailUrl
        ? `
        <div style="margin: 24px 0; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.3);">
            <img
                src="${thumbnailUrl}"
                alt="Video Thumbnail"
                width="560"
                style="width: 100%; display: block; object-fit: cover; max-height: 315px;"
            />
        </div>`
        : `
        <div style="margin: 24px 0; border-radius: 12px; overflow: hidden; background: linear-gradient(135deg, #1e1e2e 0%, #2d1b69 50%, #11998e 100%); height: 200px; display: flex; align-items: center; justify-content: center;">
            <div style="text-align: center; color: #fff;">
                <div style="font-size: 48px; margin-bottom: 8px;">🎬</div>
                <div style="font-size: 16px; opacity: 0.8;">Video Ready</div>
            </div>
        </div>`;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Your Video is Ready! 🎬</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0f0f1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    
    <!-- Wrapper -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #0f0f1a;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                
                <!-- Card -->
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; width: 100%; background-color: #1a1a2e; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.5);">
                    
                    <!-- Header Gradient Banner -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #11998e 100%); padding: 36px 40px; text-align: center;">
                            <div style="font-size: 36px; margin-bottom: 8px;">🎬</div>
                            <h1 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: 700; letter-spacing: -0.5px;">
                                Your Video is Ready!
                            </h1>
                            <p style="margin: 8px 0 0; color: rgba(255,255,255,0.85); font-size: 15px;">
                                VidMaxx has finished generating your video
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Body -->
                    <tr>
                        <td style="padding: 36px 40px;">
                            
                            <!-- Greeting -->
                            <p style="margin: 0 0 20px; color: #e2e8f0; font-size: 16px; line-height: 1.6;">
                                Hey <strong style="color: #a78bfa;">${firstName}</strong> 👋,
                            </p>
                            <p style="margin: 0 0 24px; color: #cbd5e1; font-size: 15px; line-height: 1.7;">
                                Great news! Your AI-generated video has been created and is ready to view. Here's what was created for you:
                            </p>

                            <!-- Video Title -->
                            <div style="background: linear-gradient(135deg, rgba(102,126,234,0.15) 0%, rgba(17,153,142,0.1) 100%); border: 1px solid rgba(167,139,250,0.3); border-radius: 12px; padding: 20px 24px; margin-bottom: 24px;">
                                <p style="margin: 0 0 4px; color: #94a3b8; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Video Title</p>
                                <p style="margin: 0; color: #f1f5f9; font-size: 20px; font-weight: 700; line-height: 1.3;">${videoTitle}</p>
                            </div>

                            <!-- Thumbnail -->
                            ${thumbnailSection}

                            <!-- Video Details Grid -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 32px;">
                                <tr>
                                    <td width="33%" style="padding: 4px;">
                                        <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 16px; text-align: center;">
                                            <div style="font-size: 22px; margin-bottom: 6px;">🎯</div>
                                            <p style="margin: 0 0 4px; color: #64748b; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Niche</p>
                                            <p style="margin: 0; color: #e2e8f0; font-size: 13px; font-weight: 600;">${niche}</p>
                                        </div>
                                    </td>
                                    <td width="33%" style="padding: 4px;">
                                        <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 16px; text-align: center;">
                                            <div style="font-size: 22px; margin-bottom: 6px;">⏱️</div>
                                            <p style="margin: 0 0 4px; color: #64748b; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Duration</p>
                                            <p style="margin: 0; color: #e2e8f0; font-size: 13px; font-weight: 600;">${duration}s</p>
                                        </div>
                                    </td>
                                    <td width="33%" style="padding: 4px;">
                                        <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 16px; text-align: center;">
                                            <div style="font-size: 22px; margin-bottom: 6px;">🌐</div>
                                            <p style="margin: 0 0 4px; color: #64748b; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Language</p>
                                            <p style="margin: 0; color: #e2e8f0; font-size: 13px; font-weight: 600;">${language}</p>
                                        </div>
                                    </td>
                                </tr>
                            </table>

                            <!-- CTA Buttons -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 32px;">
                                <tr>
                                    <td width="50%" style="padding: 0 6px 0 0;">
                                        <a href="${viewUrl}" target="_blank"
                                           style="display: block; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; font-size: 15px; font-weight: 600; text-decoration: none; padding: 14px 24px; border-radius: 10px; letter-spacing: 0.3px;">
                                            ▶&nbsp; View Video
                                        </a>
                                    </td>
                                    <td width="50%" style="padding: 0 0 0 6px;">
                                        <a href="${downloadUrl}" target="_blank"
                                           style="display: block; text-align: center; background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color: #0f0f1a; font-size: 15px; font-weight: 600; text-decoration: none; padding: 14px 24px; border-radius: 10px; letter-spacing: 0.3px;">
                                            ⬇&nbsp; Download
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <!-- Divider -->
                            <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 0 0 24px;" />

                            <!-- Footer note -->
                            <p style="margin: 0; color: #475569; font-size: 13px; line-height: 1.6; text-align: center;">
                                This email was sent because you have video generation enabled in your 
                                <a href="${viewUrl}" style="color: #a78bfa; text-decoration: none;">VidMaxx account</a>.
                                <br />Need help? Reply to this email or visit our support page.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background: rgba(0,0,0,0.3); padding: 20px 40px; text-align: center; border-top: 1px solid rgba(255,255,255,0.06);">
                            <p style="margin: 0; color: #334155; font-size: 12px;">
                                © 2026 VidMaxx · AI Video Generation Platform
                                <br />
                                <span style="color: #1e293b;">You're receiving this because you're a VidMaxx user.</span>
                            </p>
                        </td>
                    </tr>
                    
                </table>
                <!-- End Card -->

            </td>
        </tr>
    </table>

</body>
</html>`;
}
