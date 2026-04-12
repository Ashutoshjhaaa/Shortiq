"use client";

import { CreditCard, Zap, CheckCircle2, Crown, Settings as SettingsIcon, Package, Sparkles, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useClerk } from "@clerk/nextjs";

export default function BillingPage() {
    const { openUserProfile } = useClerk();
    const [activeTab, setActiveTab] = useState("overview");

    const tabs = [
        { id: "overview", name: "Subscription Overview", icon: <CreditCard size={18} /> },
        { id: "pricing", name: "Pricing Plans", icon: <Package size={18} /> },
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 pb-12 animate-in fade-in duration-500">
            {/* Hero Section */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white dark:bg-[#0d0d14] border border-gray-200 dark:border-white/10 p-6 sm:p-10 md:p-14 shadow-sm dark:shadow-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-primary/20 via-primary/5 to-transparent blur-3xl rounded-full -mr-40 -mt-40 pointer-events-none" />
                <div className="relative z-10 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/10 text-primary font-medium text-xs sm:text-sm mb-4 sm:mb-6 border border-primary/20">
                        <CreditCard size={16} />
                        Billing &amp; Subscription
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-3 sm:mb-4">
                        Choose Your <br />
                        <span className="gradient-text">Growth Plan</span>
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-gray-500 dark:text-white/60 leading-relaxed">
                        Scale your content creation with high-performance video generation. Manage your subscription and invoices with ease.
                    </p>
                </div>
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">

                {/* Sidebar Navigation */}
                <div className="md:col-span-3 space-y-2">
                    <h3 className="text-[10px] sm:text-xs font-bold text-gray-400 dark:text-white/40 uppercase tracking-wider mb-2 sm:mb-4 px-3">
                        Billing Menu
                    </h3>
                    <div className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0 custom-scrollbar">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
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

                    <div className="hidden md:block mt-8 p-6 rounded-2xl bg-primary/10 border border-primary/20">
                        <h4 className="text-primary font-bold text-xs uppercase tracking-widest mb-3">Your Usage</h4>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-[10px] font-bold text-gray-400 dark:text-white/30 uppercase mb-1.5">
                                    <span>Videos Used</span>
                                    <span>7 / 20</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full w-[35%] bg-primary rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="md:col-span-9">
                    <div className="bg-white dark:bg-[#0d0d14] rounded-2xl sm:rounded-3xl border border-gray-200 dark:border-white/10 p-6 sm:p-8 md:p-10 shadow-sm min-h-[400px]">

                        {/* Overview Content */}
                        {activeTab === "overview" && (
                            <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Subscription Management</h2>
                                        <p className="text-gray-500 dark:text-white/40 text-xs sm:text-sm">Update your plan or manage payment methods.</p>
                                    </div>
                                    <button
                                        onClick={() => openUserProfile()}
                                        className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm font-semibold hover:bg-gray-100 dark:hover:bg-white/10 transition-all"
                                    >
                                        <SettingsIcon size={16} />
                                        Manage
                                    </button>
                                </div>

                                <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-white relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-8 -mr-10 -mt-10 bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700" />
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-4 sm:mb-6">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                                                <Crown size={20} className="sm:text-[24px] text-yellow-300" />
                                            </div>
                                            <span className="text-base sm:text-lg font-bold tracking-tight">Active Plan: Pro</span>
                                        </div>
                                        <h3 className="text-2xl sm:text-3xl font-black mb-3 sm:mb-4">You&apos;re on the ultimate plan.</h3>
                                        <p className="text-sm sm:text-base text-white/80 max-w-md mb-6 sm:mb-8 leading-relaxed">
                                            Enjoy unlimited video generations, priority rendering, and early access to new AI features.
                                        </p>
                                        <div className="flex flex-wrap gap-2 sm:gap-4">
                                            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-lg text-[10px] sm:text-xs font-bold border border-white/10">
                                                <CheckCircle2 size={14} className="text-white/80" />
                                                Unlimited Generations
                                            </div>
                                            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-lg text-[10px] sm:text-xs font-bold border border-white/10">
                                                <CheckCircle2 size={14} className="text-white/80" />
                                                Priority Support
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                    <div className="p-5 sm:p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                                        <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                            <Zap size={16} className="text-primary" /> Current Usage
                                        </h4>
                                        <p className="text-[10px] sm:text-xs text-gray-500 dark:text-white/40 mb-3 sm:mb-4">Next reset in 21 days</p>
                                        <div className="flex items-end gap-2">
                                            <span className="text-3xl font-black text-gray-900 dark:text-white">7</span>
                                            <span className="text-gray-400 dark:text-white/20 mb-1.5 font-bold text-xs">/ 20 videos</span>
                                        </div>
                                    </div>
                                    <div className="p-5 sm:p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                                        <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                            <CheckCircle2 size={16} className="text-primary" /> Payment Method
                                        </h4>
                                        <p className="text-[10px] sm:text-xs text-gray-500 dark:text-white/40 mb-3 sm:mb-4">Managed via Clerk Billing</p>
                                        <button
                                            onClick={() => openUserProfile()}
                                            className="text-[10px] sm:text-xs font-black text-primary uppercase tracking-widest hover:opacity-80 transition-opacity"
                                        >
                                            Update Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Pricing Content */}
                        {activeTab === "pricing" && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="text-center max-w-xl mx-auto mb-10">
                                    <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-3">Simple, Transparent Pricing</h2>
                                    <p className="text-gray-500 dark:text-white/40">Choose the plan that&apos;s right for your content creation journey.</p>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    {/* Free Plan */}
                                    <div className="bg-gray-50 dark:bg-white/[0.02] rounded-3xl border border-gray-200 dark:border-white/10 p-8 flex flex-col h-full relative group transition-all hover:border-primary/30">
                                        <div className="mb-8">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Free</h3>
                                                <span className="px-3 py-1 bg-gray-900 dark:bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest text-white/50">Active</span>
                                            </div>
                                            <div className="flex items-baseline gap-1 mb-1">
                                                <span className="text-4xl font-black text-gray-900 dark:text-white">$0</span>
                                                <span className="text-gray-400 dark:text-white/20 font-medium text-xs">Always free</span>
                                            </div>
                                        </div>
                                        <div className="space-y-4 mb-10 flex-1">
                                            {["3 Video Generations", "Basic Quality", "ShortIQ Watermark"].map((feature, i) => (
                                                <div key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-white/60">
                                                    <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                                                    {feature}
                                                </div>
                                            ))}
                                        </div>
                                        <button disabled className="w-full py-4 px-6 rounded-2xl bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-white/60 font-bold text-sm">
                                            Active
                                        </button>
                                    </div>

                                    {/* Basic Plan */}
                                    <div className="bg-white dark:bg-primary/5 rounded-3xl border-2 border-primary/20 dark:border-primary/30 p-8 flex flex-col h-full relative group transition-all hover:border-primary shadow-sm">
                                        <div className="mb-8">
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Basic</h3>
                                            <div className="flex items-baseline gap-1 mb-2">
                                                <span className="text-4xl font-black text-gray-900 dark:text-white">$7</span>
                                                <span className="text-gray-400 dark:text-white/20 font-medium text-xs">/ month</span>
                                            </div>
                                            <div className="flex items-center gap-2 mb-6 text-[10px] text-gray-500 dark:text-white/40 font-bold uppercase tracking-wider">
                                                <div className="w-8 h-4 bg-primary rounded-full relative">
                                                    <div className="absolute right-1 top-1 w-2 h-2 bg-white rounded-full" />
                                                </div>
                                                Billed annually
                                            </div>
                                        </div>
                                        <div className="space-y-4 mb-10 flex-1">
                                            {["Unlimited Video Generation", "Max 5 Series Created", "No Watermarks", "High Quality (1080p)"].map((feature, i) => (
                                                <div key={i} className="flex items-start gap-3 text-sm text-gray-900 dark:text-white/80 font-medium">
                                                    <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                                                    {feature}
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            onClick={() => openUserProfile()}
                                            className="w-full py-4 px-6 rounded-2xl bg-primary text-white font-bold text-sm transition-all hover:opacity-90 shadow-lg shadow-primary/20 active:scale-[0.98]"
                                        >
                                            Subscribe
                                        </button>
                                    </div>

                                    {/* Advanced Plan */}
                                    <div className="bg-white dark:bg-[#0d0d14] rounded-3xl border border-gray-200 dark:border-white/10 p-8 flex flex-col h-full relative group transition-all hover:border-primary/50 shadow-sm">
                                        <div className="absolute top-0 right-8 -translate-y-1/2 bg-primary text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                                            RECOMMENDED
                                        </div>
                                        <div className="mb-8">
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                                Advanced <Sparkles size={16} className="text-primary" />
                                            </h3>
                                            <div className="flex items-baseline gap-1 mb-2">
                                                <span className="text-4xl font-black text-gray-900 dark:text-white">$10</span>
                                                <span className="text-gray-400 dark:text-white/20 font-medium text-xs">/ month</span>
                                            </div>
                                            <div className="flex items-center gap-2 mb-6 text-[10px] text-gray-500 dark:text-white/40 font-bold uppercase tracking-wider">
                                                <div className="w-8 h-4 bg-primary rounded-full relative">
                                                    <div className="absolute right-1 top-1 w-2 h-2 bg-white rounded-full" />
                                                </div>
                                                Billed annually
                                            </div>
                                        </div>
                                        <div className="space-y-4 mb-10 flex-1">
                                            {["Unlimited Video Generation", "Unlimited Series Created", "Priority Rendering", "Direct Social Publishing", "Advanced AI Scripting", "Priority Support"].map((feature, i) => (
                                                <div key={i} className="flex items-start gap-3 text-sm text-gray-900 dark:text-white/80 font-medium">
                                                    <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                                                    {feature}
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            onClick={() => openUserProfile()}
                                            className="w-full py-4 px-6 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-[#0d0d14] font-bold text-sm transition-all hover:bg-gray-800 dark:hover:bg-gray-100 shadow-lg active:scale-[0.98]"
                                        >
                                            Subscribe
                                        </button>
                                    </div>
                                </div>

                                <p className="text-center text-xs text-gray-400 dark:text-white/20 mt-8">
                                    Secure payments powered by Clerk &amp; Stripe. Cancel anytime.
                                </p>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}
