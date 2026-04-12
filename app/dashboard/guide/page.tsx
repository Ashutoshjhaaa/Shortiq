"use client";

import { useState } from "react";
import {
    BookOpen,
    PlaySquare,
    Settings,
    Zap,
    Video,
    Music,
    Type,
    Globe,
    Clock,
    ChevronRight,
    CheckCircle2,
    Instagram
} from "lucide-react";

export default function GuidePage() {
    const [activeTab, setActiveTab] = useState("getting-started");

    const categories = [
        { id: "getting-started", name: "Getting Started", icon: <Zap size={18} /> },
        { id: "create-series", name: "Creating a Series", icon: <PlaySquare size={18} /> },
        { id: "customization", name: "Customization", icon: <Settings size={18} /> },
        { id: "publishing", name: "Publishing", icon: <Globe size={18} /> },
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 pb-12 animate-in fade-in duration-500">
            {/* Hero Section */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white dark:bg-[#0d0d14] border border-gray-200 dark:border-white/10 p-6 sm:p-10 md:p-14 shadow-sm dark:shadow-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-primary/20 via-primary/10 to-transparent blur-3xl rounded-full -mr-40 -mt-40 pointer-events-none" />

                <div className="relative z-10 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/10 text-primary font-medium text-xs sm:text-sm mb-4 sm:mb-6 border border-primary/20">
                        <BookOpen size={16} />
                        ShortIQ Documentation
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-3 sm:mb-4">
                        Master the Art of <br />
                        <span className="gradient-text">
                            Automated Content
                        </span>
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-gray-500 dark:text-white/60 leading-relaxed">
                        Learn how to set up, customize, and automatically publish faceless viral videos to all your social platforms using ShortIQ&apos;s powerful engine.
                    </p>
                </div>
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">

                {/* Sidebar Navigation */}
                <div className="md:col-span-3 space-y-2">
                    <h3 className="text-[10px] sm:text-xs font-bold text-gray-400 dark:text-white/40 uppercase tracking-wider mb-2 sm:mb-4 px-3">
                        Guide Topics
                    </h3>
                    <div className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0 custom-scrollbar">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveTab(category.id)}
                                className={`flex-1 md:flex-none flex items-center gap-3 px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-medium transition-all text-left whitespace-nowrap md:whitespace-normal ${activeTab === category.id
                                    ? "bg-primary/10 text-primary shadow-sm border border-primary/20"
                                    : "text-gray-600 dark:text-white/60 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white border border-transparent"
                                    }`}
                            >
                                <span className={activeTab === category.id ? "text-primary" : "text-gray-400 dark:text-white/40"}>
                                    {category.icon}
                                </span>
                                {category.name}
                                {activeTab === category.id && (
                                    <ChevronRight size={16} className="hidden md:block ml-auto opacity-50" />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="hidden md:block mt-8 p-5 rounded-2xl bg-primary/10 border border-primary/20 text-center">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3 text-primary">
                            <Zap size={20} fill="currentColor" />
                        </div>
                        <h4 className="text-gray-900 dark:text-white font-bold text-sm mb-1">Need Quick Help?</h4>
                        <p className="text-gray-500 dark:text-white/50 text-xs mb-4">Our support team is available 24/7 to assist you.</p>
                        <button className="w-full py-2 bg-white dark:bg-white/10 hover:bg-gray-50 dark:hover:bg-white/20 text-gray-900 dark:text-white text-xs font-bold rounded-lg transition-colors border border-gray-200 dark:border-transparent">
                            Contact Support
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="md:col-span-9">
                    <div className="bg-white dark:bg-[#0d0d14] rounded-2xl sm:rounded-3xl border border-gray-200 dark:border-white/10 p-6 sm:p-8 md:p-10 shadow-sm dark:shadow-none min-h-[400px]">

                        {/* Getting Started Content */}
                        {activeTab === "getting-started" && (
                            <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome to ShortIQ</h2>
                                    <p className="text-gray-500 dark:text-white/60 leading-relaxed">
                                        ShortIQ is your all-in-one platform for creating and distributing faceless short-form videos. We combine advanced AI scripting, voice generation, and visual synthesis to produce high-retention content automatically.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="p-5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-4">
                                            <PlaySquare size={18} />
                                        </div>
                                        <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-2">1. Connect Accounts</h3>
                                        <p className="text-xs text-gray-500 dark:text-white/50">Link your TikTok, YouTube, and Instagram accounts in the Settings page to enable auto-posting.</p>
                                    </div>
                                    <div className="p-5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-4">
                                            <Video size={18} />
                                        </div>
                                        <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-2">2. Create a Series</h3>
                                        <p className="text-xs text-gray-500 dark:text-white/50">Define your niche, style, and schedule. ShortIQ will generate videos for this series automatically.</p>
                                    </div>
                                </div>

                                <div className="bg-primary/10 rounded-2xl p-6 border border-primary/20">
                                    <h3 className="font-bold text-primary mb-2 flex items-center gap-2">
                                        <CheckCircle2 size={18} /> Pro Tip
                                    </h3>
                                    <p className="text-sm text-gray-700 dark:text-white/70">
                                        You don&apos;t need to stay logged in! Once a series is scheduled, our cloud engines will generate and publish the videos at your specified times.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Create Series Content */}
                        {activeTab === "create-series" && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Creating Your First Series</h2>
                                    <p className="text-gray-500 dark:text-white/60 leading-relaxed">
                                        A &quot;Series&quot; is an automated content pipeline. When you create a series, you are defining the rules for all future videos generated under that topic.
                                    </p>
                                </div>

                                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-white/10 before:to-transparent">

                                    {[
                                        { step: "01", title: "Niche Selection", desc: "Choose a topic like 'Scary Stories' or 'Finance'. This trains the AI scriptwriter on what content to produce.", icon: <BookOpen size={16} /> },
                                        { step: "02", title: "Voice & Language", desc: "Select from our ultra-realistic AI voices. You can create content in multiple languages to reach global audiences.", icon: <Music size={16} /> },
                                        { step: "03", title: "Visual & Captions", desc: "Pick aesthetic styles (e.g., Cinematic, Anime) and caption animations (e.g., Karaoke, Pop-up) to boost retention.", icon: <Video size={16} /> },
                                        { step: "04", title: "Scheduling", desc: "Set the time of day you want videos to post. The AI will render the video 3-6 hours before the scheduled time.", icon: <Clock size={16} /> },
                                    ].map((item, i) => (
                                        <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                            <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-white dark:border-[#0d0d14] bg-primary text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm">
                                                <span className="text-[10px] font-bold">{item.step}</span>
                                            </div>
                                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 transition-colors hover:border-primary/50">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="text-primary">{item.icon}</div>
                                                    <h3 className="font-bold text-gray-900 dark:text-white text-sm">{item.title}</h3>
                                                </div>
                                                <p className="text-xs text-gray-500 dark:text-white/50 leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Customization Content */}
                        {activeTab === "customization" && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Customizing Your Aesthetic</h2>
                                    <p className="text-gray-500 dark:text-white/60 leading-relaxed">
                                        Stand out on the For You page by tailoring the visual and audio elements of your videos.
                                    </p>
                                </div>

                                <div className="grid gap-6">
                                    <div className="flex gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                            <Type size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 dark:text-white mb-1">Caption Styles</h3>
                                            <p className="text-sm text-gray-500 dark:text-white/50 mb-3">Dynamic captions are crucial for short-form video retention. We offer several styles:</p>
                                            <ul className="text-sm text-gray-600 dark:text-white/60 list-disc list-inside space-y-1">
                                                <li><strong className="text-gray-900 dark:text-white">Karaoke:</strong> Highlights words as they are spoken.</li>
                                                <li><strong className="text-gray-900 dark:text-white">Pop-up:</strong> Bouncy, animated words that grab attention.</li>
                                                <li><strong className="text-gray-900 dark:text-white">Neon Glow:</strong> Cyberpunk-inspired glowing text.</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                            <Video size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 dark:text-white mb-1">Visual Themes</h3>
                                            <p className="text-sm text-gray-500 dark:text-white/50">The AI image generator uses these themes as base prompts to maintain consistency across episodes. Experiment with &apos;Gta Style&apos; for gaming niches, or &apos;Cinematic&apos; for history and facts.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Publishing Content */}
                        {activeTab === "publishing" && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Auto-Publishing &amp; Distribution</h2>
                                    <p className="text-gray-500 dark:text-white/60 leading-relaxed">
                                        ShortIQ can automatically post your rendered videos directly to your connected social channels.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.38-.11 3.12-.01 6.25-.01 9.37 0 .85-.11 1.73-.46 2.53-.78 1.83-2.61 3.14-4.57 3.42-1.2.17-2.46.06-3.6-.45-2-1-3.23-3.32-2.91-5.54.19-1.25.9-2.39 1.9-3.13 1-.74 2.3-.98 3.52-.81V13.7c-1.39-.17-2.82.01-4.04.74-1.74 1.05-2.65 3.17-2.2 5.17.41 1.72 1.74 3.15 3.39 3.65 1.48.45 3.15.22 4.45-.69 1.25-.87 1.95-2.34 1.95-3.83-.01-4.29.01-8.58 0-12.87-1.14.77-2.49 1.25-3.89 1.34V4.14c1.6-.13 3.1-.9 4.13-2.14.28-.33.51-.71.69-1.12L12.525.02z" /></svg>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 dark:text-white text-sm">TikTok Integration</h4>
                                                <p className="text-xs text-gray-500 dark:text-white/50">Direct upload to drafted or public status via TikTok API.</p>
                                            </div>
                                        </div>
                                        <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 text-[10px] font-bold uppercase tracking-wider">Supported</span>
                                    </div>

                                    <div className="p-5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-[#FF0000] flex items-center justify-center text-white">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 dark:text-white text-sm">YouTube Shorts</h4>
                                                <p className="text-xs text-gray-500 dark:text-white/50">Auto-publishes with generated SEO title, description, and tags.</p>
                                            </div>
                                        </div>
                                        <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 text-[10px] font-bold uppercase tracking-wider">Supported</span>
                                    </div>

                                    <div className="p-5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#fd5949] to-[#d6249f] flex items-center justify-center text-white">
                                                <Instagram size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 dark:text-white text-sm">Instagram Reels</h4>
                                                <p className="text-xs text-gray-500 dark:text-white/50">Posts directly to your linked creator or business account.</p>
                                            </div>
                                        </div>
                                        <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 text-[10px] font-bold uppercase tracking-wider">Coming Soon</span>
                                    </div>
                                </div>
            </div>
        )}

                    </div>
                </div>

            </div>
        </div>
    );
}
