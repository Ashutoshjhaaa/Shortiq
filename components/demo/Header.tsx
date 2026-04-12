"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Play } from "lucide-react";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md transition-all duration-500">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-pink-700 flex items-center justify-center">
                        <Play className="w-5 h-5 text-white fill-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        VidMaxx
                    </span>
                </div>

                <nav className="hidden md:flex items-center gap-8">
                    <Link href="#" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                        Product
                    </Link>
                    <Link href="#" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                        Features
                    </Link>
                    <Link href="#" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                        Pricing
                    </Link>
                    <Link href="#" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                        Resources
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <button className="hidden sm:inline-flex items-center justify-center rounded-lg bg-pink-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 transition-all duration-300">
                        Get Started
                    </button>
                </div>
            </div>
        </header>
    );
}
