"use client";

import { useEffect, useState } from "react";
import { Check, Type } from "lucide-react";

interface CaptionStyle {
    id: string;
    name: string;
    description: string;
    previewClass: string;
}

const CAPTION_STYLES: CaptionStyle[] = [
    {
        id: "classic",
        name: "Classic",
        description: "Bold white text with a strong black shadow.",
        previewClass: "style-classic",
    },
    {
        id: "karaoke",
        name: "Karaoke",
        description: "Highlights the active word in vibrant yellow.",
        previewClass: "style-karaoke",
    },
    {
        id: "popup",
        name: "Pop-up",
        description: "Animated zoom-in effect for every word.",
        previewClass: "style-popup",
    },
    {
        id: "glow",
        name: "Neon Glow",
        description: "Soft neon glow around futuristic typography.",
        previewClass: "style-glow",
    },
    {
        id: "typewriter",
        name: "Typewriter",
        description: "Classic mechanical typing effect.",
        previewClass: "style-typewriter",
    },
    {
        id: "gradient",
        name: "Gradient",
        description: "Beautiful animated color gradients.",
        previewClass: "style-gradient",
    },
];

interface CaptionStyleSelectionProps {
    selectedStyle: string;
    onSelect: (styleId: string) => void;
}

export function CaptionStyleSelection({ selectedStyle, onSelect }: CaptionStyleSelectionProps) {
    const [previewText, setPreviewText] = useState("Your Captions Look Like This");
    const [tick, setTick] = useState(0);

    // Animation cycle for previews
    useEffect(() => {
        const interval = setInterval(() => {
            setTick((t) => (t + 1) % 100);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Caption Style</h2>
                <p className="text-gray-500 dark:text-white/40 text-sm mt-1">
                    Choose how subtitles appear on your video
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {CAPTION_STYLES.map((style) => {
                    const isSelected = selectedStyle === style.id;

                    return (
                        <button
                            key={style.id}
                            onClick={() => onSelect(style.id)}
                            className={`
                                relative flex flex-col p-4 rounded-2xl border-2 text-left transition-all duration-300
                                ${isSelected
                                    ? "bg-indigo-50 dark:bg-indigo-500/10 border-indigo-500 shadow-[0_0_24px_-4px_rgba(99,102,241,0.3)]"
                                    : "bg-white dark:bg-white/[0.03] border-gray-200 dark:border-white/[0.06] hover:bg-gray-50 dark:hover:bg-white/[0.06] hover:border-gray-300 dark:hover:border-white/15 shadow-sm dark:shadow-none"
                                }
                            `}
                        >
                            {/* Visual Preview Box */}
                            <div className="w-full aspect-video rounded-xl bg-black/40 mb-4 flex items-center justify-center overflow-hidden relative">
                                <div className={`px-4 text-center text-xl font-black uppercase tracking-tighter ${style.id}-preview`}>
                                    {style.id === "karaoke" ? (
                                        <span className="flex gap-2">
                                            <span>Your</span>
                                            <span className="text-yellow-400 animate-pulse">Captions</span>
                                            <span>Look</span>
                                        </span>
                                    ) : style.id === "typewriter" ? (
                                        <span className="border-r-2 border-white animate-typing overflow-hidden whitespace-nowrap block">
                                            Preview
                                        </span>
                                    ) : style.id === "popup" ? (
                                        <span className="animate-bounce-short inline-block">
                                            BOUNCE
                                        </span>
                                    ) : style.id === "glow" ? (
                                        <span className="text-indigo-400 drop-shadow-[0_0_8px_rgba(129,140,248,0.8)] animate-pulse">
                                            NEON
                                        </span>
                                    ) : style.id === "gradient" ? (
                                        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
                                            COLORS
                                        </span>
                                    ) : (
                                        <span className="text-white drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
                                            CLASSIC
                                        </span>
                                    )}
                                </div>

                                {/* Background grid for contrast */}
                                <div className="absolute inset-0 opacity-10 pointer-events-none"
                                    style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "10px 10px" }} />
                            </div>

                            {/* Info */}
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className={`font-bold text-sm ${isSelected ? "text-indigo-600 dark:text-indigo-300" : "text-gray-800 dark:text-white"}`}>
                                        {style.name}
                                    </h3>
                                    <p className="text-[11px] text-gray-500 dark:text-white/30 mt-1 leading-tight">
                                        {style.description}
                                    </p>
                                </div>
                                {isSelected && (
                                    <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center shrink-0">
                                        <Check size={12} className="text-white" strokeWidth={3} />
                                    </div>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>

            <style jsx>{`
                @keyframes typing {
                    from { width: 0 }
                    to { width: 100% }
                }
                .animate-typing {
                    animation: typing 2s steps(10, end) infinite;
                }
                @keyframes gradient-x {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                .animate-gradient-x {
                    background-size: 200% 200%;
                    animation: gradient-x 3s ease infinite;
                }
                @keyframes bounce-short {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.2); }
                }
                .animate-bounce-short {
                    animation: bounce-short 1s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
