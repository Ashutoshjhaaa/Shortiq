"use client";

import { Sparkles, Zap, Shield, Globe, Clock, BarChart3 } from "lucide-react";

const features = [
    {
        title: "Instant AI Rendering",
        description: "Render high-quality 4K shorts in seconds using our global GPU cloud.",
        icon: Zap,
        color: "text-amber-500"
    },
    {
        title: "Viral Storytelling",
        description: "Our AI analyzes current trends to write scripts that maximize engagement.",
        icon: Sparkles,
        color: "text-purple-500"
    },
    {
        title: "Enterprise Security",
        description: "Bank-grade encryption for all your intellectual property and data.",
        icon: Shield,
        color: "text-blue-500"
    },
    {
        title: "Multi-Platform Sync",
        description: "Schedule once, post everywhere. YouTube, TikTok, Reels, and more.",
        icon: Globe,
        color: "text-emerald-500"
    },
    {
        title: "Smart Scheduling",
        description: "Let AI find the perfect posting window for each specific audience.",
        icon: Clock,
        color: "text-pink-500"
    },
    {
        title: "Deep Analytics",
        description: "Understand every second of viewer retention with visual heatmaps.",
        icon: BarChart3,
        color: "text-indigo-500"
    }
];

export function Features() {
    return (
        <section className="py-24 bg-white dark:bg-gray-950 transition-colors duration-500">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        Work Smarter, <br /> Not Harder
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Powerful tools designed to simplify your workflow and help you scale your social presence exponentially.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, i) => (
                        <div
                            key={i}
                            className="group p-8 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 hover:border-pink-500/50 dark:hover:border-pink-500/50 hover:shadow-xl hover:shadow-gray-200/20 dark:hover:shadow-pink-500/5 transition-all duration-500"
                        >
                            <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center mb-6 border border-gray-100 dark:border-gray-800 group-hover:scale-110 transition-transform duration-300">
                                <feature.icon className={`w-6 h-6 ${feature.color}`} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
