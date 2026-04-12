"use client";

import { Header } from "@/components/demo/Header";
import { Hero } from "@/components/demo/Hero";
import { Features } from "@/components/demo/Features";
import { DashboardMockup } from "@/components/demo/DashboardMockup";
import { CTA } from "@/components/demo/CTA";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-500 font-sans">
            <Header />
            <main>
                <Hero />
                <DashboardMockup />
                <Features />
                <CTA />
            </main>

            <footer className="py-12 border-t border-gray-100 dark:border-gray-900 bg-white dark:bg-gray-950">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                        © 2026 VidMaxx AI. All rights reserved.
                    </div>
                    <div className="flex gap-8">
                        {["Privacy", "Terms", "Documentation", "Status"].map(link => (
                            <a key={link} href="#" className="text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-pink-600 transition-colors">
                                {link}
                            </a>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
}
