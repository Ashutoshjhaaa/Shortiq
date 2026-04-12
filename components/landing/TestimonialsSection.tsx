"use client";

const testimonials = [
    {
        name: "Ayasha Patel",
        handle: "@ayashacreates",
        avatar: "AP",
        role: "YouTube Creator · 180K subs",
        text: "ShortIQ cut my video production time from 6 hours to 20 minutes. I went from 2 Shorts a week to 14. My channel growth literally 3x'd in 60 days.",
        rating: 5,
    },
    {
        name: "Marcus Delgado",
        handle: "@marcusmktg",
        avatar: "MD",
        role: "Digital Marketing Agency Owner",
        text: "We manage 30+ client accounts. ShortIQ's bulk generation and scheduling is a game changer. We produce a month's worth of content in an afternoon.",
        rating: 5,
    },
    {
        name: "Priya Nair",
        handle: "@priyanairfitness",
        avatar: "PN",
        role: "Fitness Coach · TikTok & Instagram",
        text: "I had zero video editing experience. Now I publish daily Reels and TikToks without touching an editor. My followers grew 40K in 3 months.",
        rating: 5,
    },
    {
        name: "Chris Tanner",
        handle: "@tannertech",
        avatar: "CT",
        role: "SaaS Founder",
        text: "The email scheduling feature alone was worth it. Video open rates for our newsletters jumped from 12% to 38% after we started using ShortIQ.",
        rating: 5,
    },
    {
        name: "Sofia Brennan",
        handle: "@sofiastyle",
        avatar: "SB",
        role: "Fashion Influencer",
        text: "The AI understands my brand voice perfectly. Every video feels like I made it personally, but I barely touched anything. Absolutely wild.",
        rating: 5,
    },
    {
        name: "James Wu",
        handle: "@jwu_ecom",
        avatar: "JW",
        role: "E-Commerce Brand",
        text: "We scaled our product video content by 10x without hiring a single video editor. ROI is insane. Best SaaS investment we've made this year.",
        rating: 5,
    },
];

export default function TestimonialsSection() {
    return (
        <section id="testimonials" className="py-28 relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="section-badge">Testimonials</span>
                    <h2 className="section-heading mt-4">Loved by <span className="gradient-text">50,000+ creators</span></h2>
                    <p className="section-sub">
                        Real stories from real people who transformed their content game with ShortIQ.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((t) => (
                        <div key={t.name} className="glass-card group hover:border-primary/30 transition-all text-left">
                            <div className="flex gap-0.5 mb-4">
                                {Array.from({ length: t.rating }).map((_, i) => (
                                    <svg key={i} className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            <p className="text-gray-700 dark:text-white/80 text-sm leading-relaxed mb-6 italic text-left transition-colors">"{t.text}"</p>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white text-xs font-bold">
                                    {t.avatar}
                                </div>
                                <div>
                                    <div className="text-gray-900 dark:text-white font-semibold text-sm transition-colors">{t.name}</div>
                                    <div className="text-gray-400 dark:text-white/40 text-xs transition-colors">{t.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
