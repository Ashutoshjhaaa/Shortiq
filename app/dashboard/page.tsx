import { auth, currentUser } from "@clerk/nextjs/server";
import { getUserProfile } from "@/actions/user";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { RecentProjects } from "@/components/dashboard/RecentProjects";
import { RecentVideos } from "@/components/dashboard/RecentVideos";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { getDashboardStats } from "@/actions/stats";

export default async function DashboardPage() {
    const { userId } = await auth();
    const user = await currentUser();
    const profile = await getUserProfile();
    const statsRes = await getDashboardStats();
    const stats = statsRes.success ? statsRes : { seriesCount: 0, videoCount: 0, activeSchedules: 0 };
    const firstName = user?.firstName;

    return (
        <div className="space-y-10">
            <DashboardHeader firstName={firstName} />

            {/* Stats Grid */}
            <StatsGrid
                credits={profile?.credits}
                videoCount={stats.videoCount}
                seriesCount={stats.seriesCount}
                activeSchedules={stats.activeSchedules}
            />

            {/* Content Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Active Projects */}
                <RecentProjects />

                {/* Right Column: Stats & Actions */}
                <div className="space-y-8">
                    <RecentVideos />
                    <QuickActions />
                </div>
            </div>
        </div>
    );
}
