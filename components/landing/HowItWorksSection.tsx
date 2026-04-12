"use client";

const steps = [
    {
        num: "01",
        title: "Describe Your Video",
        desc: "Type your idea, paste a blog post, or input a product URL. ShortIQ's AI extracts the key content automatically.",
        icon: "✍️",
    },
    {
        num: "02",
        title: "AI Creates Your Video",
        desc: "The AI writes a script, selects stock footage, adds voiceover, drops captions, and applies your brand kit — all automatically.",
        icon: "🎬",
    },
    {
        num: "03",
        title: "Choose Your Platforms",
        desc: "Select which platforms and accounts to publish to. Customise format, aspect ratio, and description per channel.",
        icon: "🎯",
    },
    {
        num: "04",
        title: "Auto-Schedule & Publish",
        desc: "Set a schedule or let AI pick the best time. Sit back as ShortIQ publishes your video across all selected platforms.",
        icon: "🚀",
    },
];

export default function HowItWorksSection() {
    return (
        <section id="how-it-works" className="py-28 relative">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="section-badge">How It Works</span>
                    <h2 className="section-heading mt-4">From idea to published in <span className="gradient-text">4 steps</span></h2>
                    <p className="section-sub">
                        No video editing skills required. ShortIQ handles the entire production and distribution pipeline for you.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting line */}
                    <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, i) => (
                            <div key={step.num} className="flex flex-col items-center text-center group">
                                <div className="relative mb-6">
                                    <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-2xl shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                                        {step.icon}
                                    </div>
                                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white dark:bg-[#0d0d14] border border-primary/20 text-primary text-xs flex items-center justify-center font-bold transition-colors">
                                        {i + 1}
                                    </span>
                                </div>
                                <h3 className="text-gray-900 dark:text-white font-bold mb-2 transition-colors">{step.title}</h3>
                                <p className="text-gray-600 dark:text-white/60 text-sm leading-relaxed transition-colors">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
