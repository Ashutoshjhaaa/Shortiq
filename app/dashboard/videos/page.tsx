"use client";

import { useEffect, useState } from "react";
import { getVideos, VideoProject, cancelVideoGeneration, deleteVideo } from "@/actions/videos";
import { formatDistanceToNow, differenceInMinutes } from "date-fns";
import { Loader2, Video, Clock, ExternalLink, Play, XCircle, Eye, Download, Trash2, Maximize2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { VideoPreviewModal } from "@/components/dashboard/VideoPreviewModal";

export default function VideosPage() {
    const router = useRouter();
    const [videos, setVideos] = useState<VideoProject[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [previewVideo, setPreviewVideo] = useState<VideoProject | null>(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    const fetchVideos = async () => {
        const res = await getVideos();
        if (res.success) {
            setVideos(res.data || []);
        } else {
            toast.error(res.error || "Failed to load videos");
        }
        setIsLoading(false);
    };

    const handleCancel = async (videoId: string) => {
        if (!confirm("Are you sure you want to cancel this generation?")) return;

        toast.promise(cancelVideoGeneration(videoId), {
            loading: 'Cancelling generation...',
            success: () => {
                fetchVideos();
                return 'Generation cancelled';
            },
            error: 'Failed to cancel generation'
        });
    };

    useEffect(() => {
        fetchVideos();
        const hasInProgress = videos.some(v => v.status === "generating" || v.status === "rendering");

        // Polling for data
        const pollRate = (hasInProgress || videos.length === 0) ? 5000 : 30000;
        const dataInterval = setInterval(fetchVideos, pollRate);

        // Timer for the 5-minute cancel button UI
        const timerInterval = setInterval(() => {
            setCurrentTime(new Date());
        }, 10000); // Check every 10s for the timer

        return () => {
            clearInterval(dataInterval);
            clearInterval(timerInterval);
        };
    }, [videos.length, videos.some(v => v.status === "generating" || v.status === "rendering")]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-400 dark:text-white/20 gap-3">
                <Loader2 className="animate-spin" size={32} />
                <p className="text-sm font-medium text-gray-500 dark:text-white/40">Loading your videos...</p>
            </div>
        );
    }

    const handleDelete = async (videoId: string) => {
        if (!confirm("Are you sure you want to delete this video? This action cannot be undone.")) return;
        try {
            const res = await deleteVideo(videoId);
            if (res.success) {
                toast.success("Video deleted");
                fetchVideos(); // Refresh the list
            } else {
                toast.error(res.error || "Failed to delete video");
            }
        } catch (err) {
            toast.error("Error deleting video");
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 pb-12 animate-in fade-in duration-500">
            {/* Hero Section */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white dark:bg-[#0d0d14] border border-gray-200 dark:border-white/10 p-6 sm:p-10 md:p-14 shadow-sm dark:shadow-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-primary/10 via-primary/5 to-transparent blur-3xl rounded-full -mr-40 -mt-40 pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
                    <div className="max-w-xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/10 text-primary font-medium text-xs sm:text-sm mb-4 sm:mb-6 border border-primary/20">
                            <Video size={16} />
                            ShortIQ Studio
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-3 sm:mb-4">
                            Your <br />
                            <span className="text-primary">
                                Video Library
                            </span>
                        </h1>
                        <p className="text-sm sm:text-base md:text-lg text-gray-500 dark:text-white/60 leading-relaxed">
                            Manage, preview, and download your generated video assets. All your high-retention content in one place.
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            {videos.length === 0 ? (
                <div className="bg-white dark:bg-[#0d0d14] border-2 border-dashed border-gray-100 dark:border-white/5 rounded-[40px] p-20 text-center">
                    <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-8">
                        <Video size={40} className="text-primary" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter">Your Creative Studio is Empty</h3>
                    <p className="text-gray-500 dark:text-white/40 text-sm max-w-sm mx-auto mb-10 leading-relaxed">
                        Start your first series to see your automated video pipeline in action.
                    </p>
                    <Link href="/dashboard/create">
                        <Button className="bg-primary hover:bg-primary/90 text-white font-black text-[10px] uppercase tracking-[0.3em] px-10 h-14 rounded-2xl shadow-2xl shadow-primary/20 active:scale-95 transition-all">
                            Create New Series
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {videos.map((video) => (
                        <div
                            key={video.id}
                            className="group bg-white dark:bg-[#0d0d14] border border-gray-200 dark:border-white/10 rounded-[28px] overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1"
                        >
                            {/* Thumbnail Area */}
                            <div
                                className="relative aspect-video w-full overflow-hidden bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/5 cursor-pointer"
                                onClick={() => {
                                    if (video.status === "ready" || video.status === "rendering") {
                                        setPreviewVideo(video);
                                        setIsPreviewOpen(true);
                                    }
                                }}
                            >
                                {(video.status === "generating" || video.status === "cancelled") ? (
                                    <div className={`absolute inset-0 flex flex-col items-center justify-center gap-3 ${video.status === 'cancelled' ? 'bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-white/20' : 'bg-primary/10 text-primary'
                                        }`}>
                                        {video.status === 'generating' ? (
                                            <>
                                                <Loader2 className="animate-spin" size={32} />
                                                <span className="text-[10px] items-center gap-2 font-black uppercase tracking-[0.2em]">Engines Running...</span>

                                                {differenceInMinutes(currentTime, new Date(video.created_at)) >= 5 && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleCancel(video.id);
                                                        }}
                                                        className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-rose-500/10 hover:bg-rose-50 dark:hover:bg-rose-500/20 text-rose-500 dark:text-rose-400 text-[10px] font-black uppercase tracking-widest border border-rose-100 dark:border-rose-500/20 transition-all active:scale-95"
                                                    >
                                                        <XCircle size={14} />
                                                        Abort Process
                                                    </button>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <XCircle size={40} className="text-gray-300 dark:text-white/10" />
                                                <span className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-400 dark:text-white/20">Process Halted</span>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDelete(video.id);
                                                    }}
                                                    className="mt-2 flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-rose-500/10 hover:bg-rose-50 dark:hover:bg-rose-500/20 text-rose-500 dark:text-rose-400 text-[10px] font-black uppercase tracking-widest border border-rose-100 dark:border-rose-500/20 transition-all active:scale-95"
                                                    title="Delete this video"
                                                >
                                                    <Trash2 size={14} />
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </div>
                                ) : (
                                    <>
                                        {video.image_urls?.[0] ? (
                                            <Image
                                                src={video.image_urls[0]}
                                                alt={video.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-white/5 text-gray-300 dark:text-white/5">
                                                <Video size={48} />
                                            </div>
                                        )}


                                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 dark:from-black/90 to-transparent pointer-events-none" />

                                        {/* Status Badge */}
                                        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-black text-white uppercase tracking-widest z-10">
                                            {video.status}
                                        </div>

                                        {/* Centered Play Button */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
                                            <div className="w-16 h-16 bg-white dark:bg-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary/30">
                                                <Play size={24} fill="currentColor" className="ml-1 text-primary dark:text-white" />
                                            </div>
                                        </div>

                                        {/* Quick Actions */}
                                        <div className="absolute top-4 left-4 flex gap-2 z-20">
                                            {video.video_url && (
                                                <Link
                                                    href={video.video_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-10 h-10 rounded-xl bg-white dark:bg-primary text-primary dark:text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all opacity-0 group-hover:opacity-100 duration-300"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <Download size={18} />
                                                </Link>
                                            )}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(video.id);
                                                }}
                                                className="w-10 h-10 rounded-xl bg-white dark:bg-rose-500/10 text-rose-500 flex items-center justify-center shadow-lg hover:bg-rose-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 duration-300"
                                                title="Delete Asset"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Info Area */}
                            <div className="p-6">
                                <h3
                                    onClick={() => router.push(`/dashboard/videos/${video.id}`)}
                                    className="text-gray-900 dark:text-white font-black truncate text-lg mb-2 cursor-pointer hover:text-primary transition-colors tracking-tight"
                                >
                                    {video.title}
                                </h3>

                                <div className="flex items-center gap-4 text-gray-500 dark:text-white/30 text-[10px] font-bold uppercase tracking-widest">
                                    <div className="flex items-center gap-1.5">
                                        <Clock size={12} className="text-primary" />
                                        {formatDistanceToNow(new Date(video.created_at))} ago
                                    </div>
                                    {video.status === "ready" && video.image_urls && (
                                        <div className="flex items-center gap-1.5">
                                            <Eye size={12} className="text-primary" />
                                            Preview Ready
                                        </div>
                                    )}
                                </div>

                                {video.status === "ready" && (
                                    <div className="mt-6 flex flex-col gap-3">
                                        <div className="flex gap-2">
                                            <Link
                                                href={video.audio_url || "#"}
                                                target="_blank"
                                                onClick={(e) => e.stopPropagation()}
                                                className="flex-1 flex items-center justify-center gap-2 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white border border-gray-100 dark:border-white/5 py-2.5 rounded-xl text-xs font-bold font-mono transition-all"
                                            >
                                                VOICE <ExternalLink size={10} />
                                            </Link>
                                            <Link
                                                href={video.captions_url || "#"}
                                                target="_blank"
                                                onClick={(e) => e.stopPropagation()}
                                                className="flex-1 flex items-center justify-center gap-2 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white border border-gray-100 dark:border-white/5 py-2.5 rounded-xl text-xs font-bold font-mono transition-all"
                                            >
                                                CAPTIONS <ExternalLink size={10} />
                                            </Link>
                                        </div>

                                        {video.video_url ? (
                                            <Link
                                                href={video.video_url}
                                                target="_blank"
                                                onClick={(e) => e.stopPropagation()}
                                                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-primary/20 active:scale-95"
                                            >
                                                <Download size={14} />
                                                Export MP4
                                            </Link>
                                        ) : (
                                            <div className="w-full py-3 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-white/20 text-center text-[10px] font-black uppercase tracking-widest">
                                                Link Pending
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {previewVideo && (
                <VideoPreviewModal
                    video={previewVideo}
                    isOpen={isPreviewOpen}
                    onClose={() => {
                        setIsPreviewOpen(false);
                        setPreviewVideo(null);
                    }}
                />
            )}
        </div>
    );
}
