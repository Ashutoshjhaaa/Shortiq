"use client";

import { UserProfile } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function ProfilePage() {
    const { theme } = useTheme();

    return (
        <div className="-mx-4 -my-4 md:-mx-8 md:-my-8 min-h-[calc(100vh-4rem)] flex bg-white dark:bg-[#0a0a0b]">
            <UserProfile
                routing="hash"
                appearance={{
                    baseTheme: theme === "dark" ? dark : undefined,
                    variables: {
                        colorPrimary: "oklch(0.586 0.253 17.585)",
                    },
                    elements: {
                        rootBox: "!w-full !flex !flex-1",
                        cardBox: "!w-full !max-w-none !shadow-none !border-none !rounded-none !flex-1",
                        card: "!w-full !max-w-none !shadow-none !border-none !rounded-none !flex-1 !flex !bg-white dark:!bg-[#0a0a0b]",

                        // Sidebar Navigation inside Clerk
                        navbar: "!hidden md:!flex !border-r !border-gray-200 dark:!border-white/10 !p-6 md:!p-8 !bg-gray-50 dark:!bg-[#0d0d14] !min-w-[280px]",
                        navbarButton: "!text-gray-600 dark:!text-white/70 hover:!bg-gray-100 dark:hover:!bg-white/5 !py-3 !rounded-xl !transition-colors !w-full",

                        // Main Content Area inside Clerk
                        pageScrollBox: "!w-full !max-w-none !p-6 md:!p-12 !bg-white dark:!bg-[#0a0a0b]",
                        scrollBox: "!w-full !max-w-none !bg-transparent !rounded-none",
                        profileSectionTitle: "!text-gray-900 dark:!text-white !text-xl !font-bold !border-b !border-gray-200 dark:!border-white/10 !pb-4 !mb-6",
                        profileSectionContent: "!text-gray-600 dark:!text-white/70 !text-base",
                        dividerRow: "!border-gray-200 dark:!border-white/10",

                        // Headings
                        headerTitle: "!text-gray-900 dark:!text-white !text-3xl !font-extrabold !mb-1",
                        headerSubtitle: "!text-gray-500 dark:!text-white/50 !text-base",
                        profileSectionTitleText: "!text-gray-900 dark:!text-white !font-bold",

                        // Elements — colorPrimary handles most tinting automatically
                        secondaryButton: "!text-gray-700 dark:!text-white/80 !border !border-gray-300 dark:!border-white/20 hover:!bg-gray-100 dark:hover:!bg-white/10 !font-bold !h-11 !px-6 !rounded-xl !transition-colors",

                        // Forms & Inputs
                        formFieldLabel: "!text-[11px] !font-black !uppercase !tracking-widest !text-gray-500 dark:!text-white/40 !mb-2",
                        formFieldInput: "!bg-gray-50 dark:!bg-[#1a1a24] !border !border-gray-200 dark:!border-white/10 !text-gray-900 dark:!text-white !h-12 !rounded-xl !px-4 !text-base",
                        formFieldWarningText: "!text-rose-500 !font-medium !text-sm",
                        formFieldErrorText: "!text-rose-500 !font-medium !text-sm !mt-1",

                        // Misc Elements
                        breadcrumbsItemDivider: "!text-gray-300 dark:!text-white/20",
                        accordionTriggerButton: "!text-gray-900 dark:!text-white hover:!bg-gray-50 dark:hover:!bg-white/5 !font-semibold !py-4 !rounded-xl !transition-colors",
                        activeDeviceIcon: "!text-emerald-500",
                        userButtonPopoverCard: "!bg-white dark:!bg-[#12121a] !border !border-gray-200 dark:!border-white/10 !rounded-2xl !shadow-xl",
                    }
                }}
            />
        </div>
    );
}
