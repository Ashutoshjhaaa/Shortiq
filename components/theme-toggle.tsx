"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-white/5 animate-pulse" />
        );
    }

    return (
        <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="group relative flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-white/10 border border-transparent hover:border-gray-200 dark:hover:border-white/10"
            aria-label="Toggle theme"
        >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-orange-500 fill-orange-500/10" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-rose-500 fill-rose-500/10" />
            <span className="sr-only">Toggle theme</span>
        </button>
    );
}
