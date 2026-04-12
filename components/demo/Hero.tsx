"use client";

import { ArrowRight, Play } from "lucide-react";

export function Hero() {
    return (
        <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
            <div className="container mx-auto px-4 relative z-10 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 dark:bg-pink-900/20 border border-pink-100 dark:border-pink-800/50 mb-8 animate-fade-in">
                    <span className="flex h-2 w-2 rounded-full bg-pink-600"></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-pink-700 dark:text-pink-400">
                        New AI Features Released
                    </span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white">
                    Create Viral Shorts with <br />
                    <span className="bg-gradient-to-r from-pink-500 to-pink-700 bg-clip-text text-transparent">
                        AI Magic
                    </span>
                </h1>

                <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
                    The all-in-one platform to generate, edit, and schedule your short-form content across all social platforms in seconds.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                    <button className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-pink-700 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:-translate-y-1 transition-all duration-300">
                        Start Creating Free <ArrowRight className="w-5 h-5" />
                    </button>
                    <button className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-8 py-4 text-lg font-bold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300">
                        <Play className="w-5 h-5 fill-current" /> Watch Demo
                    </button>
                </div>

                {/* Feature Pills */}
                <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                    {["AI Face Swap", "Auto Captions", "Viral Scripting", "Background Removal", "Voice Synthesis", "Platform Optimization"].map((pill) => (
                        <div key={pill} className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-400 transition-all duration-500 hover:border-pink-500/50">
                            {pill}
                        </div>
                    ))}
                </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-pink-500/10 blur-[120px] dark:bg-pink-500/5" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px] dark:bg-blue-500/5" />
            </div>
        </section>
    );
}
