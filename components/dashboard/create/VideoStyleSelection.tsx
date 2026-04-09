"use client";

import { Check } from "lucide-react";
import Image from "next/image";

interface VideoStyle {
    id: string;
    name: string;
    image: string;
}

const VIDEO_STYLES: VideoStyle[] = [
    { id: "realistic", name: "Realistic", image: "/video-style/realistic.png" },
    { id: "cinematic", name: "Cinematic", image: "/video-style/cinematic.png" },
    { id: "anime", name: "Anime", image: "/video-style/anime.png" },
    { id: "cyberpunk", name: "Cyberpunk", image: "/video-style/cyberpunk.png" },
    { id: "gta", name: "GTA Style", image: "/video-style/gta.png" },
    { id: "3d-render", name: "3D Render", image: "/video-style/3d-render.png" },
];

interface VideoStyleSelectionProps {
    selectedStyle: string;
    onSelect: (styleId: string) => void;
}

export function VideoStyleSelection({ selectedStyle, onSelect }: VideoStyleSelectionProps) {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Select Video Style</h2>
                <p className="text-gray-500 dark:text-white/40 text-sm mt-1">
                    Choose the visual aesthetic for your generated videos
                </p>
            </div>

            {/* Horizontal Scroll List */}
            <div className="relative group">
                <div className="flex gap-4 overflow-x-auto pb-6 pt-2 px-2 -mx-2 snap-x no-scrollbar">
                    {VIDEO_STYLES.map((style) => {
                        const isSelected = selectedStyle === style.id;

                        return (
                            <button
                                key={style.id}
                                onClick={() => onSelect(style.id)}
                                className={`
                                    relative flex-none w-[200px] snap-start
                                    transition-all duration-300 group/item
                                    ${isSelected ? "scale-105 z-10" : "hover:scale-[1.02]"}
                                `}
                            >
                                {/* Aspect Ratio Container (9:16) */}
                                <div className={`
                                    relative aspect-[9/16] rounded-2xl overflow-hidden border-2
                                    transition-all duration-300
                                    ${isSelected
                                        ? "border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.4)]"
                                        : "border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/30"
                                    }
                                `}>
                                    <Image
                                        src={style.image}
                                        alt={style.name}
                                        fill
                                        sizes="200px"
                                        className={`
                                            object-cover transition-transform duration-500
                                            ${isSelected ? "scale-110" : "group-hover/item:scale-105"}
                                        `}
                                    />

                                    {/* Overlay Gradient */}
                                    <div className={`
                                        absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent
                                        transition-opacity duration-300
                                        ${isSelected ? "opacity-100" : "opacity-60 group-hover/item:opacity-80"}
                                    `} />

                                    {/* Selected Badge */}
                                    {isSelected && (
                                        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center shadow-lg animate-in zoom-in duration-300">
                                            <Check size={18} className="text-white" strokeWidth={3} />
                                        </div>
                                    )}

                                    {/* Style Name */}
                                    <div className="absolute bottom-6 left-0 right-0 text-center px-4">
                                        <h3 className={`
                                            text-lg font-bold tracking-tight
                                            ${isSelected ? "text-indigo-300" : "text-white"}
                                        `}>
                                            {style.name}
                                        </h3>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Optional: Add fade edges if needed */}
                <div className="absolute top-0 left-0 bottom-6 w-12 bg-gradient-to-r from-gray-50/40 dark:from-[#0d0d0d]/40 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-0 right-0 bottom-6 w-12 bg-gradient-to-l from-gray-50/40 dark:from-[#0d0d0d]/40 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {selectedStyle === "" && (
                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-amber-500/70 text-xs flex items-center gap-3">
                    <span className="text-lg">✨</span>
                    Please select a style to proceed with the video generation.
                </div>
            )}
        </div>
    );
}
