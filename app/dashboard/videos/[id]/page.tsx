"use client";

import { useEffect, useState } from "react";
import { getVideoById, VideoProject } from "@/actions/videos";
import {
    Clock,
    X,
    Play,
    Music,
    Type,
    ExternalLink,
    Download,
    FileText,
    Image as ImageIcon,
    Loader2
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { VideoPreviewModal } from "@/components/dashboard/VideoPreviewModal";
import { useParams, useRouter } from "next/navigation";

export default function VideoStudioPage() {
    const params = useParams();
    const router = useRouter();
    const videoId = params.id as string;
    const [video, setVideo] = useState<VideoProject | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    useEffect(() => {
        async function loadVideo() {
            const res = await getVideoById(videoId);
            if (res.success && res.data) {
                setVideo(res.data);
            } else {
                console.error("Failed to load video:", res.error);
            }
            setIsLoading(false);
        }
        loadVideo();

        // Optional: Poll for updates if video is rendering
        let interval: NodeJS.Timeout;
        if (video?.status === 'rendering' || video?.status === 'generating') {
            interval = setInterval(loadVideo, 5000);
        }
        return () => clearInterval(interval);
    }, [videoId, video?.status]);

    if (isLoading) {
        return (
            <div className="flex-1 flex items-center justify-center min-h-screen bg-[#07070a]">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 size={48} className="animate-spin text-indigo-500" />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Entering Studio...</p>
                </div>
            </div>
        );
    }

    if (!video) {
        return (
            <div className="flex-1 flex items-center justify-center min-h-screen bg-[#07070a] text-white">
                <p>Asset not found.</p>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col min-h-screen bg-black text-white selection:bg-indigo-500/30">
            {/* Immersive Background Atmosphere */}
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-20%,#1a1b2e,transparent)] pointer-events-none" />

            {/* Studio Header */}
            <header className="relative px-10 py-8 flex items-center justify-between z-10 border-b border-white/5 bg-black/50 backdrop-blur-md">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => router.push('/dashboard/videos')}
                        className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all active:scale-90"
                    >
                        <X size={20} />
                    </button>
                    <div className="space-y-1">
                        <h1 className="text-2xl sm:text-3xl font-black tracking-tighter leading-none">
                            {video.title}
                        </h1>
                        <div className="flex items-center gap-3 text-white/20 text-[10px] font-bold uppercase tracking-[0.2em]">
                            <div className="flex items-center gap-1.5">
                                <Clock size={12} />
                                {formatDistanceToNow(new Date(video.created_at))} ago
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className={`px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 font-black text-[9px] tracking-[0.2em] uppercase ${video.status === 'rendering' ? 'animate-pulse' : ''}`}>
                        {video.status}
                    </div>
                    {video.video_url && (
                        <button
                            onClick={() => setIsPreviewOpen(true)}
                            className="h-11 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white flex items-center justify-center gap-2.5 px-6 font-black uppercase tracking-[0.1em] shadow-xl shadow-indigo-500/20 active:scale-95 transition-all text-xs"
                        >
                            <Play size={16} fill="currentColor" />
                            Launch Player
                        </button>
                    )}
                </div>
            </header>

            {/* Studio Workspace */}
            <div className="relative flex-1 flex flex-col lg:flex-row z-10 overflow-hidden">
                {/* Visual Grid (Left) */}
                <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-pink-500/10 text-pink-500">
                                <ImageIcon size={18} />
                            </div>
                            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white/50">Production Timeline</h3>
                        </div>
                        <div className="text-[10px] font-black text-white/20 uppercase tracking-widest">
                            {video.scenes.length} Scenes Total
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {video.scenes.map((scene, idx) => (
                            <div key={idx} className="group relative bg-white/[0.02] border border-white/5 rounded-3xl p-4 hover:border-indigo-500/30 hover:bg-white/[0.04] transition-all duration-300">
                                <div className="absolute -top-2 -left-2 w-8 h-8 rounded-lg bg-black border border-white/10 flex items-center justify-center text-[10px] font-black text-white/40 z-10 group-hover:text-white group-hover:border-white/20 transition-colors">
                                    {idx + 1}
                                </div>

                                <div className="space-y-4">
                                    <div className="relative aspect-[9/16] w-full rounded-2xl overflow-hidden bg-white/5 border border-white/5 shadow-lg">
                                        {video.image_urls?.[idx] ? (
                                            <Image
                                                src={video.image_urls[idx]}
                                                alt={`Scene ${idx + 1}`}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-1000"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white/10">
                                                <Loader2 size={24} className="animate-spin" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4 rounded-xl bg-black/40 text-[11px] text-white/50 leading-relaxed min-h-[60px] line-clamp-3 group-hover:text-white/80 transition-colors italic">
                                        "{scene.scene_script}"
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Script & Assets (Right Panel) */}
                <aside className="w-full lg:w-[400px] xl:w-[450px] bg-white/[0.02] border-l border-white/5 flex flex-col overflow-hidden">
                    <div className="flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar">
                        <section className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                                    <FileText size={18} />
                                </div>
                                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Master Script</h3>
                            </div>

                            <div className="relative pl-6">
                                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.3)]" />
                                <div className="text-xs text-white/40 leading-relaxed font-medium bg-white/[0.01] p-6 rounded-2xl border border-white/5">
                                    {video.total_script}
                                </div>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                                    <Download size={18} />
                                </div>
                                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Project Assets</h3>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                <AssetCard
                                    label="Voiceover Audio"
                                    sublabel="Lossless MP3"
                                    icon={<Music size={16} />}
                                    color="emerald"
                                    href={video.audio_url}
                                />
                                <AssetCard
                                    label="Video Captions"
                                    sublabel="SRT Subtitles"
                                    icon={<Type size={16} />}
                                    color="violet"
                                    href={video.captions_url}
                                />
                                {video.video_url && (
                                    <AssetCard
                                        label="Full Video (MP4)"
                                        sublabel="1080p Export"
                                        icon={<Download size={16} />}
                                        color="indigo"
                                        href={video.video_url}
                                        isHighStatus={true}
                                    />
                                )}
                            </div>
                        </section>
                    </div>

                    <div className="p-8 border-t border-white/5 bg-black/40">
                        <Link href={`/dashboard/series/${video.series_id}`} className="block">
                            <button className="w-full h-12 rounded-xl bg-white/5 hover:bg-white/10 text-white/20 hover:text-white font-black text-[9px] uppercase tracking-[0.3em] transition-all border border-white/5">
                                Return to Series
                            </button>
                        </Link>
                    </div>
                </aside>
            </div>

            {isPreviewOpen && (
                <VideoPreviewModal
                    video={video}
                    isOpen={isPreviewOpen}
                    onClose={() => setIsPreviewOpen(false)}
                />
            )}
        </div>
    );
}

function AssetCard({ label, sublabel, icon, color, href, isHighStatus }: any) {
    if (!href) return null;
    return (
        <a
            href={href}
            target="_blank"
            className={`group flex items-center gap-6 p-6 rounded-[24px] transition-all hover:-translate-y-0.5 active:scale-[0.98] ${isHighStatus
                ? 'bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 shadow-[0_0_30px_rgba(99,102,241,0.1)]'
                : 'bg-white/[0.03] border border-white/5 hover:bg-white/[0.06]'
                }`}
        >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${color === 'emerald' ? 'bg-emerald-500/10 text-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.05)]' :
                color === 'violet' ? 'bg-violet-500/10 text-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.05)]' :
                    'bg-indigo-500/20 text-indigo-400'
                }`}>
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-black text-white text-base truncate">{label}</p>
                <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">{sublabel}</p>
            </div>
            <ExternalLink size={18} className="text-white/10 group-hover:text-white/30 transition-colors" />
        </a>
    );
}
