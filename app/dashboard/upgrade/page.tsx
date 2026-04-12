"use client";

import { CheckCircle2, Crown, Sparkles, Zap, Star } from "lucide-react";
import { useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function UpgradePage() {
    const { openUserProfile } = useClerk();

    const plans = [
        {
            name: "Free",
            price: "0",
            description: "Perfect for testing the power of ShortIQ.",
            features: [
                "3 Video Generations",
                "Basic Quality",
                "ShortIQ Watermark",
                "Standard Rendering"
            ],
            buttonText: "Current Plan",
            active: true,
            recommended: false,
        },
        {
            name: "Basic",
            price: "7",
            description: "For serious content creators building an audience.",
            features: [
                "Unlimited Video Generation",
                "Max 5 Series Created",
                "No Watermarks",
                "High Quality (1080p)",
                "Standard Rendering Speed"
            ],
            buttonText: "Subscribe Now",
            active: false,
            recommended: false,
        },
        {
            name: "Advanced",
            price: "10",
            description: "The ultimate power for faceless channel empires.",
            features: [
                "Unlimited Video Generation",
                "Unlimited Series Created",
                "Direct Social Publishing",
                "Priority Rendering Speed",
                "Advanced AI Scripting",
                "Priority Support"
            ],
            buttonText: "Go Pro",
            active: false,
            recommended: true,
        }
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-12 animate-in fade-in duration-700">
            {/* Hero Section */}
            <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-[#0d0d14] border border-gray-200 dark:border-white/10 p-8 sm:p-14 text-center shadow-sm dark:shadow-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-3xl opacity-50 pointer-events-none" />
                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-xs mb-6 border border-primary/20 uppercase tracking-widest">
                        <Sparkles size={14} />
                        Premium Access
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
                        Elevate Your <br />
                        <span className="gradient-text">Content Empire</span>
                    </h1>
                    <p className="text-lg text-gray-500 dark:text-white/60 max-w-2xl mx-auto leading-relaxed">
                        Scale your reach with unlimited video generations, high-speed rendering, and direct social media automation. Pick the plan that fits your ambition.
                    </p>
                </div>
            </div>

            {/* Pricing Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                {plans.map((plan) => (
                    <div
                        key={plan.name}
                        className={`relative rounded-[32px] p-8 sm:p-10 flex flex-col h-full transition-all duration-500 hover:translate-y-[-8px] ${plan.recommended
                            ? 'bg-white dark:bg-[#0d0d14] border-2 border-primary/50 shadow-2xl shadow-primary/10'
                            : 'bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/5 shadow-sm'
                            }`}
                    >
                        {plan.recommended && (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-[0.2em] shadow-xl">
                                Recommended
                            </div>
                        )}

                        <div className="mb-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center border bg-primary/10 border-primary/20 text-primary">
                                    {plan.name === 'Free' ? <Zap size={24} /> : plan.name === 'Basic' ? <Star size={24} /> : <Crown size={24} />}
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">{plan.name}</h3>
                            </div>

                            <p className="text-sm text-gray-500 dark:text-white/40 font-medium mb-8 leading-relaxed">
                                {plan.description}
                            </p>

                            <div className="flex items-baseline gap-1">
                                <span className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter">${plan.price}</span>
                                <span className="text-gray-400 dark:text-white/20 font-bold text-sm tracking-wide">/month</span>
                            </div>
                            <div className="text-[10px] font-bold text-primary uppercase tracking-widest mt-2">
                                Billed Annually
                            </div>
                        </div>

                        <div className="space-y-4 mb-10 flex-1">
                            {plan.features.map((feature, i) => (
                                <div key={i} className="flex items-start gap-3 group/item">
                                    <div className="mt-1 rounded-full p-0.5 bg-primary/20 text-primary">
                                        <CheckCircle2 size={14} strokeWidth={3} />
                                    </div>
                                    <span className="text-sm font-semibold text-gray-600 dark:text-white/70 group-hover/item:text-gray-900 dark:group-hover/item:text-white transition-colors">
                                        {feature}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <Button
                            onClick={() => openUserProfile()}
                            className={`w-full h-14 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-lg active:scale-[0.98] ${plan.active
                                ? 'bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-white/20 cursor-not-allowed shadow-none'
                                : 'bg-primary hover:opacity-90 text-white shadow-primary/20'
                                }`}
                        >
                            {plan.buttonText}
                        </Button>
                    </div>
                ))}
            </div>

            {/* Comparison Note */}
            <div className="text-center p-8 rounded-3xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5">
                <p className="text-sm text-gray-500 dark:text-white/40 font-medium">
                    All plans include 256-bit SSL encryption. Secure payments powered by Clerk &amp; Stripe. <br />
                    <span className="text-gray-900 dark:text-white">Cancel or switch plans anytime from your billing settings.</span>
                </p>
            </div>
        </div>
    );
}
