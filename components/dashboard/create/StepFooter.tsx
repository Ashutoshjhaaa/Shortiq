"use client";

import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

interface StepFooterProps {
    currentStep: number;
    onBack: () => void;
    onContinue: () => void;
    isNextDisabled?: boolean;
    isLoading?: boolean;
    continueLabel?: string;
}

export function StepFooter({
    currentStep,
    onBack,
    onContinue,
    isNextDisabled = false,
    isLoading = false,
    continueLabel = "Continue",
}: StepFooterProps) {
    const showBack = currentStep > 0;

    return (
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-200 dark:border-white/5">
            {/* Back Button */}
            {showBack ? (
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium
                               text-gray-500 dark:text-white/50 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5
                               transition-all duration-200 cursor-pointer"
                >
                    <ArrowLeft size={16} />
                    Back
                </button>
            ) : (
                <div />
            )}

            {/* Continue Button */}
            <button
                onClick={onContinue}
                disabled={isNextDisabled || isLoading}
                className={`
                    flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-bold
                    transition-all duration-200 cursor-pointer
                    ${isNextDisabled || isLoading
                        ? "bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-white/20 cursor-not-allowed"
                        : "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:brightness-110 active:scale-[0.97]"
                    }
                `}
            >
                {isLoading ? (
                    <>
                        Please wait...
                        <Loader2 size={16} className="animate-spin" />
                    </>
                ) : (
                    <>
                        {continueLabel}
                        <ArrowRight size={16} />
                    </>
                )}
            </button>
        </div>
    );
}
