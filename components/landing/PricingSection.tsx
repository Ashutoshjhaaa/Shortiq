"use client";

const plans = [
    {
        name: "Free",
        price: "$0",
        period: "/month",
        desc: "Perfect for testing the power of ShortIQ.",
        features: [
            "3 Video Generations",
            "Basic Quality",
            "ShortIQ Watermark",
            "Standard Rendering",
        ],
        highlight: false,
        cta: "Start for Free",
    },
    {
        name: "Basic",
        price: "$7",
        period: "/month",
        desc: "For serious content creators building an audience.",
        features: [
            "Unlimited Video Generation",
            "Max 5 Series Created",
            "No Watermarks",
            "High Quality (1080p)",
            "Standard Rendering Speed",
        ],
        highlight: false,
        cta: "Get Started",
    },
    {
        name: "Advanced",
        price: "$10",
        period: "/month",
        desc: "The ultimate power for faceless channel empires.",
        features: [
            "Unlimited Video Generation",
            "Unlimited Series Created",
            "Direct Social Publishing",
            "Priority Rendering Speed",
            "Advanced AI Scripting",
            "Priority Support",
        ],
        highlight: true,
        cta: "Go Pro — Most Popular",
    },
];

export default function PricingSection() {
    return (
        <section id="pricing" className="py-28 relative">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="section-badge">Pricing</span>
                    <h2 className="section-heading mt-4">Simple, <span className="gradient-text">transparent pricing</span></h2>
                    <p className="section-sub">
                        All plans include a 14-day free trial. No credit card required.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`rounded-3xl p-8 border transition-all duration-500 flex flex-col h-full ${plan.highlight
                                ? "bg-primary/5 dark:bg-primary/10 border-primary shadow-xl dark:shadow-2xl shadow-primary/10 dark:shadow-primary/20 z-10"
                                : "bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10"
                                } relative`}
                        >
                            {plan.highlight && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-white text-xs font-bold shadow-lg shadow-primary/20">
                                    Most Popular
                                </div>
                            )}
                            <div className="mb-6">
                                <h3 className="text-gray-900 dark:text-white font-[800] text-xl mb-1 text-left transition-colors tracking-tight">{plan.name}</h3>
                                <div className="flex items-end gap-1 mb-2">
                                    <span className="text-5xl font-[900] text-gray-900 dark:text-white transition-colors tracking-tighter">{plan.price}</span>
                                    <span className="text-gray-400 dark:text-white/40 pb-1.5 transition-colors font-medium">{plan.period}</span>
                                </div>
                                <p className="text-gray-600 dark:text-white/60 text-sm text-left transition-colors font-medium">{plan.desc}</p>
                            </div>

                            <ul className="space-y-3 mb-8">
                                {plan.features.map((f) => (
                                    <li key={f} className="flex items-center gap-3 text-sm text-gray-700 dark:text-white/80 text-left transition-colors">
                                        <svg className="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                            <path d="M5 13l4 4L19 7" />
                                        </svg>
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <a
                                href="#"
                                className={`block text-center py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-300 ${plan.highlight
                                    ? "btn-primary shadow-lg shadow-primary/30"
                                    : "border border-gray-200 dark:border-white/20 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5"
                                    }`}
                            >
                                {plan.cta}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
