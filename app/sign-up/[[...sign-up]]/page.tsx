import { SignUp } from "@clerk/nextjs";
import AuthLayout from "@/components/auth/AuthLayout";

export default function Page() {
    return (
        <AuthLayout
            title="Transform Your Content with AI-Powered Scripts"
            subtitle="Create your free account and start generating viral shorts instantly."
            heading="Get Started"
            headingSubtitle="Create your free account to continue"
        >
            <SignUp
                appearance={{
                    elements: {
                        rootBox: "w-full mx-auto",
                        card: "bg-white/40 dark:bg-white/5 backdrop-blur-xl shadow-2xl shadow-rose-500/10 border border-white/20 dark:border-white/10 rounded-2xl p-6 w-full",
                        headerTitle: "hidden",
                        headerSubtitle: "hidden",
                        socialButtonsBlockButton: "border border-gray-200 hover:bg-gray-50 text-gray-600 transition-all font-medium h-12 rounded-xl",
                        dividerRow: "my-5",
                        dividerText: "text-gray-400 dark:text-gray-500 text-[10px] font-bold uppercase tracking-widest",
                        formFieldLabel: "text-gray-700 dark:text-gray-300 font-semibold text-xs mb-1.5",
                        formFieldInput: "h-11 border-gray-200 focus:border-rose-500 focus:ring-rose-500/20 rounded-xl transition-all text-sm",
                        formButtonPrimary: "bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 hover:opacity-90 text-white font-bold h-12 rounded-xl shadow-lg shadow-rose-500/20 transition-all text-sm normal-case",
                        footerActionText: "text-gray-500 dark:text-gray-400 font-medium text-xs",
                        footerActionLink: "text-rose-600 hover:text-pink-600 font-bold text-xs",
                        formFieldAction: "text-rose-600 hover:text-pink-600 font-bold text-xs",
                        identityPreviewText: "text-gray-600 dark:text-gray-300",
                        identityPreviewEditButton: "text-rose-600 hover:text-pink-600 font-bold",
                        footer: "hidden",
                    },
                    variables: {
                        colorPrimary: "#e11d48",
                        fontFamily: "var(--font-sans)",
                        borderRadius: "0.75rem",
                    }
                }}
            />
        </AuthLayout>
    );
}
