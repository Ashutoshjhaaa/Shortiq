"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { createSeries, getSeriesById, updateSeries } from "@/actions/series";
import { StepperProgress } from "@/components/dashboard/create/StepperProgress";
import { StepFooter } from "@/components/dashboard/create/StepFooter";
import { NicheSelection } from "@/components/dashboard/create/NicheSelection";

import { LanguageVoiceSelection } from "@/components/dashboard/create/LanguageVoiceSelection";
import { BackgroundMusicSelection } from "@/components/dashboard/create/BackgroundMusicSelection";
import { VideoStyleSelection } from "@/components/dashboard/create/VideoStyleSelection";
import { CaptionStyleSelection } from "@/components/dashboard/create/CaptionStyleSelection";
import { SeriesDetailsReview } from "@/components/dashboard/create/SeriesDetailsReview";
import { Loader2 } from "lucide-react";

// ── Global form state type ──────────────────────────────────────────────────
export interface CreateSeriesFormData {
    // Step 0 — Niche
    niche: string;
    customNiche: string;
    isCustomNiche: boolean;

    // Step 1 — Language & Voice
    language: string;
    voice: string;

    // Step 2 — Background Music
    backgroundMusic: string[];

    // Step 3 — Video Style
    videoStyle: string;

    // Step 4 — Caption Style
    captionStyle: string;

    // Step 5 — Series Details & Scheduling
    seriesName: string;
    videoDuration: string;
    platforms: string[];
    publishTime: string;

    // Step 4 — Review (future)
    // Step 5 — Publish (future)
}

const INITIAL_FORM_DATA: CreateSeriesFormData = {
    niche: "",
    customNiche: "",
    isCustomNiche: false,
    language: "English",
    voice: "aura-2-odysseus-en",
    backgroundMusic: [],
    videoStyle: "",
    captionStyle: "classic",
    seriesName: "",
    videoDuration: "30-50",
    platforms: ["instagram"],
    publishTime: "09:00",
};

const TOTAL_STEPS = 6;

function CreatePageContent() {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<CreateSeriesFormData>(INITIAL_FORM_DATA);
    const [isFetching, setIsFetching] = useState(false);
    const [seriesId, setSeriesId] = useState<string | null>(null);

    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    // ── Pre-fill data if editing ─────────────────────────────────────────────
    useEffect(() => {
        if (id) {
            setSeriesId(id);
            setIsFetching(true);
            getSeriesById(id).then((result) => {
                if (result.success && result.data) {
                    const data = result.data;
                    // Check if niche is in our available list
                    const AVAILABLE_NICHE_IDS = [
                        "scary-stories", "motivational", "tech-reviews", "true-crime",
                        "history", "cooking-tips", "health-fitness", "science-facts",
                        "travel-vlogs", "gaming", "finance", "comedy"
                    ];
                    const isCustom = !AVAILABLE_NICHE_IDS.includes(data.niche);

                    setFormData({
                        seriesName: data.seriesName,
                        niche: data.niche,
                        customNiche: isCustom ? data.niche : "",
                        isCustomNiche: isCustom,
                        language: data.language,
                        voice: data.voice,
                        backgroundMusic: data.backgroundMusic,
                        videoStyle: data.videoStyle,
                        captionStyle: data.captionStyle,
                        videoDuration: data.videoDuration,
                        platforms: data.platforms,
                        publishTime: data.publishTime,
                    });
                } else {
                    toast.error("Failed to load series data");
                }
                setIsFetching(false);
            });
        }
    }, [id]);

    // ── Navigation ──────────────────────────────────────────────────────────
    const handleContinue = () => {
        if (currentStep < TOTAL_STEPS - 1) {
            setCurrentStep((s) => s + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep((s) => s - 1);
        }
    };

    // ── Form Handlers ───────────────────────────────────────────────────────
    const handleNicheSelect = (value: string, isCustom: boolean) => {
        if (isCustom) {
            setFormData((prev) => ({ ...prev, niche: value, customNiche: value, isCustomNiche: true }));
        } else {
            setFormData((prev) => ({ ...prev, niche: value, isCustomNiche: false }));
        }
    };

    const handleLanguageSelect = (lang: string) => {
        // Reset voice when language changes
        setFormData((prev) => ({ ...prev, language: lang, voice: "" }));
    };

    const handleVoiceSelect = (voice: string) => {
        setFormData((prev) => ({ ...prev, voice }));
    };

    const handleMusicSelect = (backgroundMusic: string[]) => {
        setFormData((prev) => ({ ...prev, backgroundMusic }));
    };

    const handleStyleSelect = (videoStyle: string) => {
        setFormData((prev) => ({ ...prev, videoStyle }));
    };

    const handleCaptionStyleSelect = (captionStyle: string) => {
        setFormData((prev) => ({ ...prev, captionStyle }));
    };

    const handleSeriesDetailsUpdate = (details: Partial<CreateSeriesFormData>) => {
        setFormData((prev) => ({ ...prev, ...details }));
    };

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSchedule = async () => {
        setIsSubmitting(true);
        try {
            let result;
            if (seriesId) {
                result = await updateSeries(seriesId, formData);
            } else {
                result = await createSeries(formData);
            }

            if (result.success) {
                toast.success(seriesId ? "Series updated successfully! 🎉" : "Series scheduled successfully! 🎉");
                router.push("/dashboard/series");
            } else {
                toast.error(result.error || `Failed to ${seriesId ? "update" : "schedule"} series`);
            }
        } catch (err) {
            toast.error("An unexpected error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    // ── Decide if Continue should be disabled ───────────────────────────────
    const isNextDisabled = (() => {
        if (currentStep === 0) {
            return formData.niche.trim() === "";
        }
        if (currentStep === 1) {
            return formData.language === "" || formData.voice === "";
        }
        if (currentStep === 2) {
            return (formData.backgroundMusic?.length ?? 0) === 0;
        }
        if (currentStep === 3) {
            return formData.videoStyle === "";
        }
        if (currentStep === 4) {
            return formData.captionStyle === "";
        }
        if (currentStep === 5) {
            return formData.seriesName.trim() === "" || formData.platforms.length === 0;
        }
        return false;
    })();

    // ── Render current step content ─────────────────────────────────────────
    const renderStep = () => {
        if (isFetching) {
            return (
                <div className="flex-1 flex flex-col items-center justify-center text-white/20 gap-3">
                    <Loader2 className="animate-spin" size={32} />
                    <p className="text-sm font-medium">Loading series data...</p>
                </div>
            );
        }

        switch (currentStep) {
            case 0:
                return (
                    <NicheSelection
                        selectedNiche={formData.isCustomNiche ? "" : formData.niche}
                        customNiche={formData.customNiche}
                        onSelect={handleNicheSelect}
                    />
                );
            case 1:
                return (
                    <LanguageVoiceSelection
                        selectedLanguage={formData.language}
                        selectedVoice={formData.voice}
                        onLanguageSelect={handleLanguageSelect}
                        onVoiceSelect={handleVoiceSelect}
                    />
                );
            case 2:
                return (
                    <BackgroundMusicSelection
                        selectedTracks={formData.backgroundMusic || []}
                        onSelect={handleMusicSelect}
                    />
                );
            case 3:
                return (
                    <VideoStyleSelection
                        selectedStyle={formData.videoStyle}
                        onSelect={handleStyleSelect}
                    />
                );
            case 4:
                return (
                    <CaptionStyleSelection
                        selectedStyle={formData.captionStyle}
                        onSelect={handleCaptionStyleSelect}
                    />
                );
            case 5:
                return (
                    <SeriesDetailsReview
                        formData={{
                            seriesName: formData.seriesName,
                            videoDuration: formData.videoDuration,
                            platforms: formData.platforms,
                            publishTime: formData.publishTime
                        }}
                        onUpdate={handleSeriesDetailsUpdate}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="max-w-5xl mx-auto min-h-[calc(100vh-7rem)] flex flex-col">
            {/* Page title */}
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
                {seriesId ? "Edit Series" : "Create New Series"}
            </h1>
            <p className="text-gray-500 dark:text-white/35 text-sm mb-6">
                {seriesId ? "Update your automated content pipeline settings" : "Set up your automated content pipeline in a few steps"}
            </p>

            {/* Stepper */}
            <StepperProgress currentStep={currentStep} />

            {/* Step Content Card — fills remaining height */}
            <div className="mt-8 rounded-2xl bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/5 shadow-sm dark:shadow-none p-8 flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto">
                    {renderStep()}
                </div>

                {/* Reusable Footer — always pinned to bottom of card */}
                <StepFooter
                    currentStep={currentStep}
                    onBack={() => setCurrentStep((prev) => prev - 1)}
                    onContinue={() => {
                        if (currentStep === TOTAL_STEPS - 1) {
                            handleSchedule();
                        } else {
                            setCurrentStep((prev) => prev + 1);
                        }
                    }}
                    isNextDisabled={isNextDisabled || isFetching}
                    isLoading={isSubmitting}
                    continueLabel={currentStep === TOTAL_STEPS - 1 ? (seriesId ? "Update Series" : "Schedule Series") : "Continue"}
                />
            </div>
        </div>
    );
}

export default function CreatePage() {
    return (
        <Suspense fallback={
            <div className="max-w-5xl mx-auto min-h-[calc(100vh-7rem)] flex items-center justify-center">
                <Loader2 className="animate-spin text-rose-500" size={48} />
            </div>
        }>
            <CreatePageContent />
        </Suspense>
    );
}
