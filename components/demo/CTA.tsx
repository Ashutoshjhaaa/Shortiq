"use client";

import { ArrowRight, Sparkles } from "lucide-react";

export function CTA() {
    return (
        <section className="py-24 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="relative rounded-3xl bg-gray-900 dark:bg-pink-600 px-8 py-16 md:px-16 md:py-24 text-center overflow-hidden transition-all duration-700">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-pink-500/20 blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-8">
                            <Sparkles className="w-4 h-4 text-pink-400" />
                            <span className="text-xs font-bold text-white uppercase tracking-widest">Limited Beta Access</span>
                        </div>

                        <h2 className="text-3xl md:text-6xl font-extrabold text-white mb-8 tracking-tight">
                            Ready to transform your <br /> content workflow?
                        </h2>

                        <p className="text-pink-100 dark:text-pink-50 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium opacity-90">
                            Join 10,000+ creators who are scaling their reach with VidMaxx AI. No credit card required to start.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <button className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-extrabold text-gray-900 shadow-xl hover:shadow-2xl hover:bg-gray-50 hover:-translate-y-1 transition-all duration-300">
                                Get Started Now <ArrowRight className="w-5 h-5" />
                            </button>
                            <button className="w-full sm:w-auto text-lg font-bold text-white hover:text-pink-200 transition-colors">
                                Talk to Sales
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
