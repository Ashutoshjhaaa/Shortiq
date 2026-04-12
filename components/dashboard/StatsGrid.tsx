"use client";

interface StatsGridProps {
    credits?: number | string;
    videoCount?: number;
    seriesCount?: number;
    activeSchedules?: number;
}

export function StatsGrid({
    credits,
    videoCount = 0,
    seriesCount = 0,
    activeSchedules = 0
}: StatsGridProps) {
    const stats = [
        { label: "Videos Generated", value: videoCount.toLocaleString(), icon: "🎬", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
        { label: "Active Series", value: seriesCount.toLocaleString(), icon: "📈", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
        { label: "Active Schedules", value: activeSchedules.toLocaleString(), icon: "📅", color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
        { label: "Credits Left", value: credits?.toLocaleString() || "10,000", icon: "💎", color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
                <div key={stat.label} className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none hover:shadow-md dark:hover:bg-white/10 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                        <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center text-2xl border ${stat.border}`}>
                            {stat.icon}
                        </div>
                        <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-white/30 uppercase tracking-widest">
                            Live
                        </span>
                    </div>
                    <div className="text-3xl font-black text-gray-900 dark:text-white mb-1 leading-tight">{stat.value}</div>
                    <div className="text-xs text-gray-400 dark:text-white/40 font-bold uppercase tracking-wider">{stat.label}</div>
                </div>
            ))}
        </div>
    );
}
