"use client";

import { useState, useEffect } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import {
    Share2,
    CheckCircle2,
    Trash2,
    AlertTriangle,
    Loader2,
    LogOut,
    UserCircle,
    Mail,
    Settings as SettingsIcon,
    ShieldAlert,
    ChevronRight,
    CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getConnectedAccounts, disconnectAccount } from "@/actions/social";
import { deleteUserAccount } from "@/actions/user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ConnectedAccount {
    platform: string;
    platform_account_name: string;
}

export default function SettingsPage() {
    const { user, isLoaded } = useUser();
    const { signOut, openUserProfile } = useClerk();
    const [connectedAccounts, setConnectedAccounts] = useState<ConnectedAccount[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [activeTab, setActiveTab] = useState("profile");
    const router = useRouter();

    const tabs = [
        { id: "profile", name: "Profile Info", icon: <UserCircle size={18} /> },
        { id: "social", name: "Social Accounts", icon: <Share2 size={18} /> },
        { id: "billing", name: "Billing", icon: <CreditCard size={18} />, href: "/dashboard/billing" },
        { id: "danger", name: "Danger Zone", icon: <ShieldAlert size={18} /> },
    ];

    useEffect(() => {
        if (isLoaded) {
            fetchAccounts();
        }
    }, [isLoaded]);

    const fetchAccounts = async () => {
        setLoading(true);
        const res = await getConnectedAccounts();
        if (res.success && res.data) {
            setConnectedAccounts(res.data);
        }
        setLoading(false);
    };

    const handleConnect = async (platform: string) => {
        toast.info(`Please connect your ${platform} account in your profile settings.`);
        openUserProfile();
    };

    const handleDisconnect = async (platform: string) => {
        if (!confirm(`Are you sure you want to disconnect your ${platform} account?`)) return;
        setActionLoading(platform);
        const res = await disconnectAccount(platform);
        if (res.success) {
            toast.success(`${platform} account disconnected`);
            fetchAccounts();
        } else {
            toast.error(res.error || "Failed to disconnect");
        }
        setActionLoading(null);
    };

    const handleDeleteAccount = async () => {
        setActionLoading("delete");
        const res = await deleteUserAccount();
        if (res.success) {
            toast.success("Account deleted successfully");
            await signOut();
            router.push("/");
        } else {
            toast.error(res.error || "Failed to delete account");
            setActionLoading(null);
        }
    };

    const isConnected = (platform: string) => {
        if (platform === 'email') return !!user?.primaryEmailAddress?.emailAddress;
        return connectedAccounts.some(acc => acc.platform === platform);
    };

    const getAccountName = (platform: string) => {
        if (platform === 'email') return user?.primaryEmailAddress?.emailAddress;
        return connectedAccounts.find(acc => acc.platform === platform)?.platform_account_name;
    };

    const platforms = [
        {
            id: "youtube",
            name: "Youtube",
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.14 1 12 1 12s0 3.86.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2c.46-1.72.46-5.58.46-5.58s0-3.86-.46-5.58z" fill="#FF0000" />
                    <path d="M9.75 15.02L15.5 12l-5.75-3.02v6.04z" fill="white" />
                </svg>
            ),
            description: "Required to schedule and publish Shorts directly."
        },
        {
            id: "instagram",
            name: "Instagram",
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="#E4405F" />
                </svg>
            ),
            description: "Connect to share your videos as Reels."
        },
        {
            id: "tiktok",
            name: "Tiktok",
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.38-.11 3.12-.01 6.25-.01 9.37 0 .85-.11 1.73-.46 2.53-.78 1.83-2.61 3.14-4.57 3.42-1.2.17-2.46.06-3.6-.45-2-1-3.23-3.32-2.91-5.54.19-1.25.9-2.39 1.9-3.13 1-.74 2.3-.98 3.52-.81V13.7c-1.39-.17-2.82.01-4.04.74-1.74 1.05-2.65 3.17-2.2 5.17.41 1.72 1.74 3.15 3.39 3.65 1.48.45 3.15.22 4.45-.69 1.25-.87 1.95-2.34 1.95-3.83-.01-4.29.01-8.58 0-12.87-1.14.77-2.49 1.25-3.89 1.34V4.14c1.6-.13 3.1-.9 4.13-2.14.28-.33.51-.71.69-1.12L12.525.02z" />
                </svg>
            ),
            description: "Post your creations to TikTok automatically."
        },
        {
            id: "email",
            name: "Email",
            icon: <Mail size={40} className="text-primary" />,
            description: "Receive notifications and send video copies."
        },
    ];

    if (!isLoaded) return <div className="text-gray-900 dark:text-white">Loading...</div>;

    return (
        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 pb-12 animate-in fade-in duration-500">
            {/* Hero Section */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white dark:bg-[#0d0d14] border border-gray-200 dark:border-white/10 p-6 sm:p-10 md:p-14 shadow-sm dark:shadow-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-primary/20 via-primary/10 to-transparent blur-3xl rounded-full -mr-40 -mt-40 pointer-events-none" />
                <div className="relative z-10 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/10 text-primary font-medium text-xs sm:text-sm mb-4 sm:mb-6 border border-primary/20">
                        <SettingsIcon size={16} />
                        Account Settings
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-3 sm:mb-4">
                        Manage Your <br />
                        <span className="gradient-text">Preferences</span>
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-gray-500 dark:text-white/60 leading-relaxed">
                        Configure your profile, connect social media accounts, and manage your account security settings in one place.
                    </p>
                </div>
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">

                {/* Sidebar Navigation */}
                <div className="md:col-span-3 space-y-2">
                    <h3 className="text-[10px] sm:text-xs font-bold text-gray-400 dark:text-white/40 uppercase tracking-wider mb-2 sm:mb-4 px-3">
                        Settings Categories
                    </h3>
                    <div className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0 custom-scrollbar">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => {
                                    if ('href' in tab && tab.href) {
                                        router.push(tab.href);
                                    } else {
                                        setActiveTab(tab.id);
                                    }
                                }}
                                className={`flex-1 md:flex-none flex items-center gap-3 px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-medium transition-all text-left whitespace-nowrap md:whitespace-normal ${activeTab === tab.id
                                    ? "bg-primary/10 text-primary shadow-sm border border-primary/20"
                                    : "text-gray-600 dark:text-white/60 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white border border-transparent"
                                    }`}
                            >
                                <span className={activeTab === tab.id ? "text-primary" : "text-gray-400 dark:text-white/40"}>
                                    {tab.icon}
                                </span>
                                {tab.name}
                                {activeTab === tab.id && (
                                    <ChevronRight size={16} className="hidden md:block ml-auto opacity-50" />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="hidden md:block mt-8 p-5 rounded-2xl bg-primary/10 border border-primary/20 text-center">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3 text-primary">
                            <UserCircle size={20} />
                        </div>
                        <h4 className="text-gray-900 dark:text-white font-bold text-sm mb-1">Need to update Auth?</h4>
                        <p className="text-gray-500 dark:text-white/50 text-xs mb-4">Manage password and security via Clerk.</p>
                        <button
                            onClick={() => openUserProfile()}
                            className="w-full py-2 bg-white dark:bg-white/10 hover:bg-gray-50 dark:hover:bg-white/20 text-gray-900 dark:text-white text-xs font-bold rounded-lg transition-colors border border-gray-200 dark:border-transparent"
                        >
                            Open Profile
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="md:col-span-9">
                    <div className="bg-white dark:bg-[#0d0d14] rounded-2xl sm:rounded-3xl border border-gray-200 dark:border-white/10 p-6 sm:p-8 md:p-10 shadow-sm dark:shadow-none min-h-[400px]">

                        {/* Profile Info Content */}
                        {activeTab === "profile" && (
                            <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center gap-2 border-b border-gray-200 dark:border-white/5 pb-4">
                                    <div className="w-5 h-5 rounded-full border border-primary flex items-center justify-center text-primary">
                                        <CheckCircle2 size={12} />
                                    </div>
                                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Profile Information</h2>
                                </div>

                                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 sm:gap-12">
                                    {/* Avatar with PRO Badge */}
                                    <div className="relative shrink-0">
                                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-lg overflow-hidden">
                                            <span className="text-4xl sm:text-5xl font-medium text-primary">
                                                {user?.fullName?.[0] || user?.primaryEmailAddress?.emailAddress?.[0] || "U"}
                                            </span>
                                        </div>
                                        <div className="absolute -bottom-2 -right-2 bg-primary text-white text-[9px] sm:text-[10px] font-black px-2 sm:px-2.5 py-1 rounded-lg border-2 sm:border-4 border-white dark:border-[#0d0d14] shadow-xl tracking-tight uppercase">
                                            PRO
                                        </div>
                                    </div>

                                    <div className="flex-1 grid gap-4 sm:gap-8 sm:grid-cols-2 w-full">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 dark:text-white/30 uppercase tracking-widest">Full Name</label>
                                            <div className="bg-gray-50 dark:bg-white/[0.02] text-gray-500 dark:text-white/50 font-medium px-4 py-2.5 sm:py-3.5 rounded-xl border border-gray-200 dark:border-white/5 cursor-not-allowed text-sm sm:text-[15px] shadow-inner select-none">
                                                {user?.fullName || "Loading..."}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 dark:text-white/30 uppercase tracking-widest">Email Address</label>
                                            <div className="bg-gray-50 dark:bg-white/[0.02] text-gray-500 dark:text-white/50 font-medium px-4 py-2.5 sm:py-3.5 rounded-xl border border-gray-200 dark:border-white/5 cursor-not-allowed text-sm sm:text-[15px] shadow-inner select-none overflow-hidden text-ellipsis">
                                                {user?.primaryEmailAddress?.emailAddress || "Loading..."}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-primary/10 rounded-2xl p-6 border border-primary/20">
                                    <h3 className="font-bold text-primary mb-2 flex items-center gap-2 text-sm">
                                        <CheckCircle2 size={16} /> Subscription Active
                                    </h3>
                                    <p className="text-xs text-gray-700 dark:text-white/70">
                                        Your Pro plan is active. You have unlimited video generations and priority rendering enabled for all your series.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Social Accounts Content */}
                        {activeTab === "social" && (
                            <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center gap-2 border-b border-gray-200 dark:border-white/5 pb-4">
                                    <Share2 className="text-primary transform rotate-45" size={20} />
                                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Social Media Connections</h2>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                    {platforms.map((platform) => (
                                        <div key={platform.id} className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex flex-col items-center transition-all hover:border-gray-300 dark:hover:border-white/20 shadow-sm group">
                                            {/* Platform Icon Box */}
                                            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-3 sm:mb-4 border border-gray-100 dark:border-white/5 transition-transform group-hover:scale-105 ${platform.id === 'youtube' ? 'bg-rose-50 dark:bg-rose-500/10' :
                                                platform.id === 'instagram' ? 'bg-pink-50 dark:bg-pink-500/10' : 'bg-white dark:bg-white/10'
                                                }`}>
                                                <div className="transform scale-90 sm:scale-110">
                                                    {platform.icon}
                                                </div>
                                            </div>

                                            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1 uppercase tracking-tight">{platform.name}</h3>

                                            {isConnected(platform.id) ? (
                                                <>
                                                    <p className="text-[8px] sm:text-[9px] font-black text-emerald-500 dark:text-emerald-400 uppercase tracking-[0.2em] mb-3 sm:mb-4">CONNECTED</p>
                                                    <div className="w-full space-y-2 sm:space-y-3">
                                                        <div className="w-full bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/5 py-2.5 sm:py-3 px-3 rounded-xl text-gray-600 dark:text-white/70 text-[10px] sm:text-xs font-medium text-center truncate shadow-inner">
                                                            {getAccountName(platform.id)}
                                                        </div>
                                                        <Button
                                                            variant="ghost"
                                                            className="w-full bg-transparent border border-rose-200 dark:border-rose-500/20 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-600 rounded-xl h-10 sm:h-11 gap-2 font-bold transition-all text-[10px] sm:text-xs"
                                                            onClick={() => handleDisconnect(platform.id)}
                                                            disabled={actionLoading === platform.id}
                                                        >
                                                            {actionLoading === platform.id ? (
                                                                <Loader2 className="animate-spin" size={14} />
                                                            ) : (
                                                                <LogOut size={14} className="transform rotate-180" />
                                                            )}
                                                            Disconnect
                                                        </Button>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <p className="text-[8px] sm:text-[9px] font-black text-gray-400 dark:text-white/20 uppercase tracking-[0.2em] mb-4 sm:mb-6">DISCONNECTED</p>
                                                    <Button
                                                        className="w-full bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-slate-100 font-bold h-10 sm:h-11 rounded-xl text-[10px] sm:text-xs transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
                                                        onClick={() => handleConnect(platform.id)}
                                                        disabled={actionLoading === platform.id}
                                                    >
                                                        {actionLoading === platform.id ? (
                                                            <Loader2 className="animate-spin" size={14} />
                                                        ) : (
                                                            <>
                                                                <Share2 size={14} className="transform rotate-45" />
                                                                Connect
                                                            </>
                                                        )}
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Danger Zone Content */}
                        {activeTab === "danger" && (
                            <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center gap-2 border-b border-gray-200 dark:border-white/5 pb-4">
                                    <AlertTriangle className="text-rose-500" size={20} />
                                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Danger Zone</h2>
                                </div>

                                <div className="bg-rose-50 dark:bg-rose-500/5 border border-rose-200 dark:border-rose-500/20 rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
                                    <div className="text-center lg:text-left">
                                        <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1.5 sm:mb-2">Delete Account</h3>
                                        <p className="text-gray-500 dark:text-white/40 text-xs sm:text-sm max-w-md">
                                            Permanently delete your account, all your series, and generated videos. This action is irreversible.
                                        </p>
                                    </div>

                                    {!showDeleteConfirm ? (
                                        <Button
                                            variant="destructive"
                                            className="w-full lg:w-auto bg-rose-600 hover:bg-rose-700 text-white font-bold h-11 sm:h-12 px-6 sm:px-8 rounded-xl shadow-lg shadow-rose-900/10 dark:shadow-rose-900/20 text-xs sm:text-sm"
                                            onClick={() => setShowDeleteConfirm(true)}
                                        >
                                            <Trash2 size={16} className="mr-2" />
                                            Delete Account
                                        </Button>
                                    ) : (
                                        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                                            <Button
                                                variant="ghost"
                                                className="w-full sm:w-auto text-gray-500 dark:text-white/40 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 text-xs sm:text-sm"
                                                onClick={() => setShowDeleteConfirm(false)}
                                                disabled={actionLoading === "delete"}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                className="w-full sm:w-auto bg-rose-600 hover:bg-rose-700 text-white font-bold h-11 sm:h-12 px-6 sm:px-8 rounded-xl text-xs sm:text-sm"
                                                onClick={handleDeleteAccount}
                                                disabled={actionLoading === "delete"}
                                            >
                                                {actionLoading === "delete" ? (
                                                    <Loader2 className="animate-spin mr-2" size={16} />
                                                ) : (
                                                    <Trash2 size={16} className="mr-2" />
                                                )}
                                                Confirm Delete
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>

            {/* Loading Overlay */}
            {loading && (
                <div className="fixed inset-0 bg-white/50 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="flex flex-col items-center gap-3">
                        <Loader2 className="animate-spin text-primary" size={40} />
                        <p className="text-gray-600 dark:text-white/60 font-medium">Loading settings...</p>
                    </div>
                </div>
            )}
        </div>
    );
}
