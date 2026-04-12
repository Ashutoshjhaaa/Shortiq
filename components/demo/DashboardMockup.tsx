"use client";

import { BarChart3, Users, Play, Video, TrendingUp, Calendar } from "lucide-react";

export function DashboardMockup() {
    return (
        <section className="py-12 md:py-20 bg-gray-50/50 dark:bg-gray-900/20">
            <div className="container mx-auto px-4">
                <div className="relative group max-w-5xl mx-auto">
                    {/* Decorative Glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/20 to-blue-500/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" />

                    {/* Dashboard Window */}
                    <div className="relative bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden transition-all duration-500">
                        {/* Toolbar */}
                        <div className="h-10 border-b border-gray-200 dark:border-gray-800 flex items-center px-4 gap-2 bg-gray-50 dark:bg-gray-900/50">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                            </div>
                            <div className="flex-1 text-[10px] text-center font-medium text-gray-400 dark:text-gray-600 tracking-wider uppercase">
                                VidMaxx Studio — Dashboard
                            </div>
                        </div>

                        {/* Dashboard Content */}
                        <div className="p-6 md:p-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                {/* Stat Cards */}
                                {[
                                    { label: "Total Views", value: "2.4M", icon: TrendingUp, delta: "+12%" },
                                    { label: "Active Projects", value: "148", icon: Video, delta: "+8%" },
                                    { label: "Community", value: "84.2K", icon: Users, delta: "+5%" }
                                ].map((stat, i) => (
                                    <div key={i} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 transition-all duration-500">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                                <stat.icon className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                                            </div>
                                            <span className="text-xs font-bold text-green-600 dark:text-green-400">{stat.delta}</span>
                                        </div>
                                        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Main "Chart" Area */}
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                                <div className="lg:col-span-3 h-64 rounded-xl border border-gray-100 dark:border-gray-800 flex items-end p-6 gap-3 group/chart transition-all duration-500 overflow-hidden relative">
                                    <div className="absolute top-4 left-4 text-sm font-bold text-gray-900 dark:text-white">Engagement Growth</div>
                                    {[40, 70, 45, 90, 65, 80, 55, 100, 75, 45].map((h, i) => (
                                        <div key={i} className="flex-1 bg-pink-500/10 dark:bg-pink-500/5 group-hover/chart:bg-pink-500/20 rounded-t-lg transition-all duration-500 relative overflow-hidden" style={{ height: `${h}%` }}>
                                            <div className="absolute inset-x-0 bottom-0 bg-pink-600/20 dark:bg-pink-600/10 transition-all duration-700" style={{ height: `${h / 2}%` }} />
                                        </div>
                                    ))}
                                </div>
                                <div className="h-64 rounded-xl border border-gray-100 dark:border-gray-800 p-6 transition-all duration-500">
                                    <div className="text-sm font-bold text-gray-900 dark:text-white mb-4">Upcoming</div>
                                    <div className="space-y-4">
                                        {[1, 2, 3].map((_, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
                                                    <Calendar className="w-4 h-4 text-gray-400" />
                                                </div>
                                                <div className="space-y-1 overflow-hidden">
                                                    <div className="h-2 w-20 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                                                    <div className="h-1.5 w-12 bg-gray-100 dark:bg-gray-900 rounded animate-pulse" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Floating Accents */}
                    <div className="absolute -top-6 -right-6 w-32 h-32 bg-pink-500/10 blur-3xl -z-10 animate-pulse" />
                    <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-500/10 blur-3xl -z-10 animate-pulse" style={{ animationDelay: '2s' }} />
                </div>
            </div>
        </section>
    );
}
