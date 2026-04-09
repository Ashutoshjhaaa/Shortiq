"use client";

import { useState } from "react";
import {
    Ghost,
    Flame,
    Laptop,
    SearchCheck,
    Landmark,
    ChefHat,
    Dumbbell,
    FlaskConical,
    Plane,
    Gamepad2,
    TrendingUp,
    Laugh,
    type LucideIcon,
} from "lucide-react";

// ── Niche data ──────────────────────────────────────────────────────────────
const AVAILABLE_NICHES: { id: string; icon: LucideIcon; name: string; desc: string; color: string }[] = [
    { id: "scary-stories", icon: Ghost, name: "Scary Stories", desc: "Spine-chilling tales and creepy narrations", color: "rose" },
    { id: "motivational", icon: Flame, name: "Motivational", desc: "Uplifting speeches and success stories", color: "orange" },
    { id: "tech-reviews", icon: Laptop, name: "Tech Reviews", desc: "Latest gadgets, apps and tech breakdowns", color: "blue" },
    { id: "true-crime", icon: SearchCheck, name: "True Crime", desc: "Real-life mysteries and criminal investigations", color: "violet" },
    { id: "history", icon: Landmark, name: "History", desc: "Fascinating events and figures from the past", color: "amber" },
    { id: "cooking-tips", icon: ChefHat, name: "Cooking Tips", desc: "Quick recipes and culinary hacks", color: "emerald" },
    { id: "health-fitness", icon: Dumbbell, name: "Health & Fitness", desc: "Workout routines and wellness advice", color: "lime" },
    { id: "science-facts", icon: FlaskConical, name: "Science Facts", desc: "Mind-blowing discoveries and experiments", color: "indigo" },
    { id: "travel-vlogs", icon: Plane, name: "Travel Vlogs", desc: "Destination guides and travel adventures", color: "cyan" },
    { id: "gaming", icon: Gamepad2, name: "Gaming", desc: "Game reviews, walkthroughs and highlights", color: "fuchsia" },
    { id: "finance", icon: TrendingUp, name: "Finance & Investing", desc: "Market insights and money management tips", color: "green" },
    { id: "comedy", icon: Laugh, name: "Comedy & Memes", desc: "Funny skits, memes and viral humor", color: "pink" },
];

type Tab = "available" | "custom";

interface NicheSelectionProps {
    selectedNiche: string;
    customNiche: string;
    onSelect: (niche: string, isCustom: boolean) => void;
}

export function NicheSelection({ selectedNiche, customNiche, onSelect }: NicheSelectionProps) {
    const [activeTab, setActiveTab] = useState<Tab>(
        customNiche && !selectedNiche ? "custom" : "available"
    );

    // Determine if the current selection is custom
    const isCustomActive = !AVAILABLE_NICHES.some((n) => n.id === selectedNiche) && selectedNiche !== "";

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Choose Your Niche</h2>
                <p className="text-gray-500 dark:text-white/40 text-sm mt-1">
                    Select the content category for your new series
                </p>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-gray-100 dark:bg-white/5 w-fit">
                <button
                    onClick={() => setActiveTab("available")}
                    className={`
                        px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer
                        ${activeTab === "available"
                            ? "bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 shadow-sm"
                            : "text-gray-500 dark:text-white/40 hover:text-gray-700 dark:hover:text-white/60"
                        }
                    `}
                >
                    Available Niches
                </button>
                <button
                    onClick={() => setActiveTab("custom")}
                    className={`
                        px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer
                        ${activeTab === "custom"
                            ? "bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 shadow-sm"
                            : "text-gray-500 dark:text-white/40 hover:text-gray-700 dark:hover:text-white/60"
                        }
                    `}
                >
                    Custom Niche
                </button>
            </div>

            {/* ── Available Niches Tab ─────────────────────────────────────── */}
            {activeTab === "available" && (
                <div className="h-[420px] overflow-y-auto pr-1 custom-scroll">
                    <div className="grid grid-cols-2 gap-5">
                        {AVAILABLE_NICHES.map((niche) => {
                            const isSelected = selectedNiche === niche.id;
                            const Icon = niche.icon;

                            // Using style for dynamic colors to ensure they work with arbitrary strings if needed, 
                            // though Tailwind classes are preferred if static.
                            // However, since these are predefined categories, we can use a class mapping or inline styles.
                            // For simplicity and vibrancy, I'll use inline styles for the background opacity and text color.
                            const colors: Record<string, string> = {
                                rose: "#fb7185",
                                orange: "#fb923c",
                                blue: "#60a5fa",
                                violet: "#a78bfa",
                                amber: "#fbbf24",
                                emerald: "#34d399",
                                lime: "#a3e635",
                                indigo: "#818cf8",
                                cyan: "#22d3ee",
                                fuchsia: "#e879f9",
                                green: "#4ade80",
                                pink: "#f472b6"
                            };
                            const themeColor = colors[niche.color] || "#6366f1";

                            return (
                                <button
                                    key={niche.id}
                                    onClick={() => onSelect(niche.id, false)}
                                    className={`
                                        relative text-left p-7 rounded-2xl min-h-[130px]
                                        transition-all duration-200 border-2 cursor-pointer
                                        ${isSelected
                                            ? "bg-indigo-50 dark:bg-indigo-500/10 border-indigo-500 shadow-[0_0_24px_-4px_rgba(99,102,241,0.35)]"
                                            : "bg-white dark:bg-white/[0.03] border-gray-200 dark:border-white/[0.06] hover:bg-gray-50 dark:hover:bg-white/[0.06] hover:border-gray-300 dark:hover:border-white/15 shadow-sm dark:shadow-none"
                                        }
                                    `}
                                >
                                    {/* Checkmark badge — top right */}
                                    {isSelected && (
                                        <span className="absolute top-5 right-5 w-7 h-7 rounded-full bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                                            <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                                                <path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                    )}

                                    {/* Icon */}
                                    <div
                                        className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors duration-200 ${!isSelected && "bg-gray-100 dark:bg-white/5"}`}
                                        style={{ backgroundColor: isSelected ? `${themeColor}33` : undefined }}
                                    >
                                        <Icon size={20} className={!isSelected ? "text-gray-400 dark:text-white/40" : ""} style={{ color: isSelected ? themeColor : undefined }} />
                                    </div>

                                    {/* Niche name */}
                                    <p className={`font-bold text-base pr-10 ${isSelected ? "text-indigo-600 dark:text-indigo-300" : "text-gray-700 dark:text-white/85"}`}>
                                        {niche.name}
                                    </p>

                                    {/* Description */}
                                    <p className="text-sm text-gray-500 dark:text-white/35 mt-2 leading-relaxed">
                                        {niche.desc}
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* ── Custom Niche Tab ────────────────────────────────────────── */}
            {activeTab === "custom" && (
                <div className="space-y-4">
                    <p className="text-gray-500 dark:text-white/40 text-sm">
                        Have something unique in mind? Enter your niche below.
                    </p>
                    <input
                        type="text"
                        value={customNiche}
                        onChange={(e) => onSelect(e.target.value, true)}
                        placeholder="e.g. Underwater Photography Tips"
                        className="w-full px-5 py-3.5 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10
                                   text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/20 text-sm font-medium
                                   focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30
                                   transition-all duration-200 shadow-sm dark:shadow-none"
                    />
                </div>
            )}
        </div>
    );
}
