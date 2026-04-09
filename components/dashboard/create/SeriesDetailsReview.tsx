"use client";

import { Clock, Globe, Layout, Monitor, Mail, Facebook, Instagram, Youtube, Check } from "lucide-react";

interface SeriesDetailsReviewProps {
    formData: {
        seriesName: string;
        videoDuration: string;
        platforms: string[];
        publishTime: string;
    };
    onUpdate: (data: Partial<SeriesDetailsReviewProps["formData"]>) => void;
}

const TikTokIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
    >
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.38-.11 3.12-.01 6.25-.01 9.37 0 .85-.11 1.73-.46 2.53-.78 1.83-2.61 3.14-4.57 3.42-1.2.17-2.46.06-3.6-.45-2-1-3.23-3.32-2.91-5.54.19-1.25.9-2.39 1.9-3.13 1-.74 2.3-.98 3.52-.81V13.7c-1.39-.17-2.82.01-4.04.74-1.74 1.05-2.65 3.17-2.2 5.17.41 1.72 1.74 3.15 3.39 3.65 1.48.45 3.15.22 4.45-.69 1.25-.87 1.95-2.34 1.95-3.83-.01-4.29.01-8.58 0-12.87-1.14.77-2.49 1.25-3.89 1.34V4.14c1.6-.13 3.1-.9 4.13-2.14.28-.33.51-.71.69-1.12L12.525.02z" />
    </svg>
);

const PLATFORMS = [
    { id: "tiktok", name: "TikTok", icon: TikTokIcon, color: "#000000", brandColor: "group-hover:text-white" },
    { id: "youtube", name: "YouTube", icon: Youtube, color: "#FF0000", brandColor: "group-hover:text-red-500" },
    { id: "instagram", name: "Instagram", icon: Instagram, color: "#E4405F", brandColor: "group-hover:text-pink-500" },
    { id: "facebook", name: "Facebook", icon: Facebook, color: "#1877F2", brandColor: "group-hover:text-blue-500" },
    { id: "email", name: "Email", icon: Mail, color: "#EA4335", brandColor: "group-hover:text-rose-400" },
];

export function SeriesDetailsReview({ formData, onUpdate }: SeriesDetailsReviewProps) {
    const togglePlatform = (id: string) => {
        const current = formData.platforms || [];
        if (current.includes(id)) {
            onUpdate({ platforms: current.filter((p) => p !== id) });
        } else {
            onUpdate({ platforms: [...current, id] });
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Series Details</h2>
                <p className="text-gray-500 dark:text-white/40 text-sm mt-1">
                    Finalize your series name and schedule your first video
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column: Name & Duration */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-600 dark:text-white/60 ml-1">Series Name</label>
                        <input
                            type="text"
                            value={formData.seriesName}
                            onChange={(e) => onUpdate({ seriesName: e.target.value })}
                            placeholder="e.g. Daily Stoic Wisdom"
                            className="w-full px-5 py-4 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/20 focus:outline-none focus:border-indigo-500 transition-all font-medium shadow-sm dark:shadow-none"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-600 dark:text-white/60 ml-1">Video Duration</label>
                        <select
                            value={formData.videoDuration}
                            onChange={(e) => onUpdate({ videoDuration: e.target.value })}
                            className="w-full px-5 py-4 rounded-2xl bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-all font-medium appearance-none cursor-pointer shadow-sm dark:shadow-none"
                        >
                            <option value="30-50">30-50 Seconds (Flashy)</option>
                            <option value="60-70">60-70 Seconds (Deep Dive)</option>
                        </select>
                    </div>
                </div>

                {/* Right Column: Platforms & Time */}
                <div className="space-y-6">
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-gray-600 dark:text-white/60 ml-1 flex items-center gap-2">
                            <Layout size={16} /> Publish Platforms
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {PLATFORMS.map((platform) => {
                                const isSelected = formData.platforms.includes(platform.id);
                                const Icon = platform.icon;
                                return (
                                    <button
                                        key={platform.id}
                                        onClick={() => togglePlatform(platform.id)}
                                        className={`
                                            flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs font-bold transition-all border-2 group
                                            ${isSelected
                                                ? "bg-gray-100 dark:bg-white/5 border-gray-300 dark:border-white/20 text-gray-900 dark:text-white shadow-md dark:shadow-lg"
                                                : "bg-white dark:bg-white/5 border-gray-200 dark:border-transparent text-gray-500 dark:text-white/40 hover:bg-gray-50 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/10 shadow-sm dark:shadow-none"}
                                        `}
                                        style={{
                                            borderColor: isSelected ? platform.color : undefined,
                                            color: isSelected ? platform.color : undefined
                                        }}
                                    >
                                        <div className={`transition-colors duration-200 ${platform.brandColor}`}>
                                            <Icon size={16} />
                                        </div>
                                        {platform.name}
                                        {isSelected && <Check size={14} strokeWidth={4} className="ml-1" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-600 dark:text-white/60 ml-1 flex items-center gap-2">
                            <Clock size={16} /> Schedule Time
                        </label>
                        <input
                            type="time"
                            value={formData.publishTime}
                            onChange={(e) => onUpdate({ publishTime: e.target.value })}
                            className="w-full px-5 py-4 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-all font-medium cursor-pointer shadow-sm dark:shadow-none"
                        />
                        <p className="text-[10px] text-indigo-400/60 mt-2 italic flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                            Note: video will generate 3-6 hours before video publish
                        </p>
                    </div>
                </div>
            </div>

            {/* Summary Card */}
            <div className="mt-4 p-6 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border border-white/10 overflow-hidden relative">
                <div className="relative z-10 flex items-center justify-between">
                    <div>
                        <h4 className="text-gray-900 dark:text-white font-bold text-lg">Ready to Launch?</h4>
                        <p className="text-gray-500 dark:text-white/40 text-xs mt-1">
                            Your series "{formData.seriesName || 'New Series'}" will be scheduled across {formData.platforms.length} platforms.
                        </p>
                    </div>
                </div>
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl -mr-10 -mt-10" />
            </div>
        </div>
    );
}
