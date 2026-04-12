"use client";

import {
    Bot,
    Calendar,
    Palette,
    BarChart3,
    Globe,
    Zap,
    Play,
    Type,
    CheckCircle2,
    Image as ImageIcon
} from "lucide-react";

const features = [
    {
        icon: <Bot className="w-6 h-6" />,
        title: "AI Script & Video Generation",
        desc: "Describe your idea in plain English and watch ShortIQ transform it into a fully produced short video with voiceover, captions, and stock footage — in minutes.",
        color: "bg-primary",
        shadow: "shadow-primary/20",
        ring: "ring-primary/30",
        border: "border-primary/20",
        gradient: "from-primary/20 to-primary/5",
        num: "01",
        graphic: (
            <div className="w-full h-full p-4 md:p-6 flex flex-col justify-center gap-4 animate-in fade-in duration-1000">
                <div className="w-full bg-white dark:bg-[#0d0d14] rounded-xl border border-gray-200 dark:border-white/10 p-3 shadow-sm transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                    <div className="flex gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-primary/40"></div>
                        <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    </div>
                    <div className="font-mono text-[10px] sm:text-xs text-gray-600 dark:text-green-400">
                        <span className="text-gray-400 dark:text-white/40">&gt;</span> /generate video "Scary Stories"
                    </div>
                </div>
                <div className="w-[90%] self-end bg-primary/10 dark:bg-primary/20 rounded-xl border border-primary/20 p-3 backdrop-blur-md transform rotate-1 hover:rotate-0 transition-transform duration-500 delay-100">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
                            <Bot size={16} />
                        </div>
                        <div className="w-full space-y-2">
                            <div className="h-2 bg-primary/20 rounded-full w-3/4 animate-pulse"></div>
                            <div className="h-2 bg-primary/20 rounded-full w-1/2 animate-pulse delay-75"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        icon: <Calendar className="w-6 h-6" />,
        title: "Smart Auto-Scheduling",
        desc: "Our AI analyses your audience's behaviour and schedules your content at peak engagement times for maximum reach on every platform.",
        color: "bg-primary",
        shadow: "shadow-primary/20",
        ring: "ring-primary/30",
        border: "border-primary/20",
        gradient: "from-primary/20 to-primary/5",
        num: "02",
        graphic: (
            <div className="w-full h-full p-6 flex items-center justify-center relative">
                <div className="w-full max-w-[240px] bg-white dark:bg-[#0d0d14] rounded-2xl border border-gray-200 dark:border-white/10 p-4 shadow-xl z-10 animate-fade-in-up">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-xs text-gray-900 dark:text-white">Next Uploads</h4>
                        <Calendar size={14} className="text-primary" />
                    </div>
                    <div className="space-y-3">
                        {[
                            { time: "09:00 AM", title: "Daily Stoic #14", status: "Scheduled" },
                            { time: "03:30 PM", title: "Finance Tips", status: "Rendering" }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                                <div className="text-[10px] font-bold text-gray-500 dark:text-white/40 w-14">{item.time}</div>
                                <div className="flex-1">
                                    <div className="text-xs font-bold text-gray-800 dark:text-white/90 truncate">{item.title}</div>
                                    <div className="text-[9px] text-primary font-medium uppercase tracking-wider">{item.status}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Floating elements */}
                <div className="absolute top-8 right-8 w-12 h-12 bg-primary/20 rounded-xl backdrop-blur-md border border-primary/20 flex items-center justify-center animate-bounce-short delay-200">
                    <Globe size={20} className="text-primary" />
                </div>
            </div>
        )
    },
    {
        icon: <Palette className="w-6 h-6" />,
        title: "Brand Customisation",
        desc: "Add your logo, brand colours, custom fonts and watermarks. Maintain a consistent identity across all your video content automatically.",
        color: "bg-primary",
        shadow: "shadow-primary/20",
        ring: "ring-primary/30",
        border: "border-primary/20",
        gradient: "from-primary/20 to-primary/5",
        num: "03",
        graphic: (
            <div className="w-full h-full p-6 relative flex items-center justify-center">
                {/* Simulated Video Frame */}
                <div className="w-32 h-48 bg-gray-900 rounded-xl overflow-hidden relative shadow-2xl border-[4px] border-white dark:border-[#1a1a24] z-10 transform -rotate-6">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-3">
                        <div className="w-full h-8 bg-white/20 backdrop-blur-md rounded border border-white/30 flex items-center justify-center text-[10px] font-bold text-white shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                            KARAOKE TEXT
                        </div>
                    </div>
                </div>
                {/* Floating Tools */}
                <div className="absolute right-6 top-10 flex flex-col gap-3 z-20 transform rotate-6 animate-float">
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-[#0d0d14] shadow-lg border border-gray-200 dark:border-white/10 flex items-center justify-center text-primary">
                        <Palette size={18} />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-[#0d0d14] shadow-lg border border-gray-200 dark:border-white/10 flex items-center justify-center text-primary">
                        <Type size={18} />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-[#0d0d14] shadow-lg border border-gray-200 dark:border-white/10 flex items-center justify-center text-amber-500">
                        <ImageIcon size={18} />
                    </div>
                </div>
            </div>
        )
    },
    {
        icon: <BarChart3 className="w-6 h-6" />,
        title: "Cross-Platform Analytics",
        desc: "Unified dashboard showing views, watch time, engagement, and conversions across YouTube, Instagram, TikTok, Facebook, and email — all in one place.",
        color: "bg-primary",
        shadow: "shadow-primary/20",
        ring: "ring-primary/30",
        border: "border-primary/20",
        gradient: "from-primary/20 to-primary/5",
        num: "04",
        graphic: (
            <div className="w-full h-full p-6 flex flex-col justify-center">
                <div className="w-full bg-white dark:bg-[#0d0d14] rounded-2xl border border-gray-200 dark:border-white/10 p-5 shadow-xl">
                    <div className="flex items-end justify-between mb-6">
                        <div>
                            <div className="text-[10px] font-bold text-gray-400 dark:text-white/40 uppercase tracking-wider mb-1">Total Views</div>
                            <div className="text-2xl font-black text-gray-900 dark:text-white">2.4M</div>
                        </div>
                        <div className="px-2 py-1 rounded bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 text-[10px] font-bold">
                            +124%
                        </div>
                    </div>
                    {/* Simulated Bar Chart */}
                    <div className="flex items-end justify-between gap-2 h-20">
                        {[40, 70, 45, 90, 65, 100, 85].map((height, i) => (
                            <div key={i} className="w-full bg-gray-100 dark:bg-white/5 rounded-t-sm relative group overflow-hidden" style={{ height: '100%' }}>
                                <div
                                    className="absolute bottom-0 w-full bg-primary rounded-t-sm transition-all duration-1000"
                                    style={{ height: `${height}%` }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    },
    {
        icon: <Globe className="w-6 h-6" />,
        title: "Auto-Translate & Dub",
        desc: "Expand your reach globally. ShortIQ auto-translates scripts and dubs voiceovers into 50+ languages with natural-sounding AI voices.",
        color: "bg-primary",
        shadow: "shadow-primary/20",
        ring: "ring-primary/30",
        border: "border-primary/20",
        gradient: "from-primary/20 to-primary/5",
        num: "05",
        graphic: (
            <div className="w-full h-full p-6 flex items-center justify-center relative">
                <div className="flex items-center gap-4 z-10">
                    <div className="w-20 p-3 bg-white dark:bg-[#0d0d14] rounded-xl border border-gray-200 dark:border-white/10 shadow-lg text-center transform -translate-y-4">
                        <div className="text-2xl mb-1">🇺🇸</div>
                        <div className="text-[9px] font-bold text-gray-500 dark:text-white/50">English</div>
                    </div>

                    <div className="flex flex-col gap-1 items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></div>
                        <div className="w-8 h-px bg-primary/30"></div>
                        <div className="text-[10px] font-bold text-primary">AI</div>
                    </div>

                    <div className="flex flex-col gap-3 transform translate-y-4">
                        <div className="w-20 p-2 bg-white dark:bg-[#0d0d14] rounded-xl border border-gray-200 dark:border-white/10 shadow-sm text-center flex items-center gap-2">
                            <span className="text-sm">🇪🇸</span>
                            <span className="text-[9px] font-bold text-gray-800 dark:text-white/80">Spanish</span>
                        </div>
                        <div className="w-20 p-2 bg-white dark:bg-[#0d0d14] rounded-xl border border-gray-200 dark:border-white/10 shadow-sm text-center flex items-center gap-2">
                            <span className="text-sm">🇫🇷</span>
                            <span className="text-[9px] font-bold text-gray-800 dark:text-white/80">French</span>
                        </div>
                    </div>
                </div>
                {/* Background waveforms */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                    <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5, 4, 3, 2, 1, 2, 3, 4, 3, 2, 1].map((h, i) => (
                            <div key={i} className="w-1.5 bg-primary rounded-full" style={{ height: `${h * 8}px` }}></div>
                        ))}
                    </div>
                </div>
            </div>
        )
    },
    {
        icon: <Zap className="w-6 h-6" />,
        title: "Bulk Video Generation",
        desc: "Create tens or hundreds of unique variations of your video for A/B testing, repurposing, or rolling out entire campaign series at once.",
        color: "bg-primary",
        shadow: "shadow-primary/20",
        ring: "ring-primary/30",
        border: "border-primary/20",
        gradient: "from-primary/20 to-primary/5",
        num: "06",
        graphic: (
            <div className="w-full h-full p-2 relative overflow-hidden flex items-center justify-center">
                <div className="grid grid-cols-3 gap-3 transform rotate-12 scale-110 opacity-80">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                        <div key={i} className={`
                            w-16 h-20 rounded-lg shadow-lg border border-white/20
                            bg-primary/20 dark:bg-primary/40
                            flex flex-col
                        `}>
                            <div className="flex-1 bg-gray-900 overflow-hidden m-1 rounded relative">
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/10"></div>
                                <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-green-400"></div>
                            </div>
                            <div className="h-2 w-1/2 bg-white/20 rounded-full mx-1 mb-1.5"></div>
                        </div>
                    ))}
                </div>
                {/* Center overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#f8fafc] dark:from-[#0a0a0b] via-transparent to-transparent"></div>
                <div className="absolute z-10 w-12 h-12 rounded-full bg-white dark:bg-[#0d0d14] shadow-2xl border border-gray-200 dark:border-white/10 flex items-center justify-center text-primary animate-pulse">
                    <CheckCircle2 size={24} />
                </div>
            </div>
        )
    },
];

export default function FeaturesSection() {
    return (
        <section id="features" className="py-28 relative">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-24">
                    <span className="font-bold tracking-tight text-gray-400 dark:text-white transition-colors">ShortIQ.ai</span>
                    <h2 className="section-heading mt-4">Everything you need to <span className="gradient-text">go viral</span></h2>
                    <p className="section-sub">
                        A complete AI-powered video creation and distribution suite built for modern content creators and brands.
                    </p>
                </div>

                <div className="relative flex flex-col gap-24 pb-32">
                    {features.map((f, i) => (
                        <div
                            key={f.title}
                            className="sticky group"
                            style={{ top: `${130 + (i * 20)}px` }}
                        >
                            <div className={`relative overflow-hidden rounded-3xl bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl p-8 shadow-2xl transition-all duration-500 ease-in-out md:p-12 border border-gray-200/50 ring-1 ${f.ring} max-w-5xl mx-auto group-hover:bg-primary/5 dark:group-hover:bg-primary/10 group-hover:scale-[1.01]`}>
                                <div className="grid gap-12 md:grid-cols-2 items-center">
                                    <div className="order-1">
                                        <div className={`relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-50 dark:bg-white/[0.02] shadow-inner bg-gradient-to-br ${f.gradient} border border-gray-200 dark:border-white/10 flex items-center justify-center`}>
                                            {f.graphic ? f.graphic : (
                                                <div className={`${f.color.replace('bg-', 'text-')} opacity-80 dark:opacity-60 scale-[6] transition-transform duration-700 group-hover:scale-[6.5]`}>
                                                    {f.icon}
                                                </div>
                                            )}
                                            {/* Subtle accent glow */}
                                            <div className={`absolute inset-0 ${f.color} opacity-[0.03] blur-3xl`} />
                                        </div>
                                    </div>
                                    <div className="order-2 text-left">
                                        <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${f.color} mb-6 shadow-lg ${f.shadow} text-white`}>
                                            {f.icon}
                                        </div>
                                        <h3 className="mb-4 text-3xl font-[800] text-gray-900 dark:text-white transition-colors tracking-tight">{f.title}</h3>
                                        <p className="text-lg leading-relaxed text-gray-600 dark:text-white/60 mb-8 transition-colors">{f.desc}</p>
                                        <div className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white transition-colors tracking-widest opacity-60">
                                            <span className="h-px w-8 bg-gray-900 dark:bg-white"></span>
                                            FEATURE {f.num}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
