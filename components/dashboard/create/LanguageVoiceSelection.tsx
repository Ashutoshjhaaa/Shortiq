"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, ChevronDown, Check, Globe, Loader2 } from "lucide-react";
import { languages as staticLanguages, type Language } from "@/lib/voice-config";

// ── Types from the /api/voices endpoint ─────────────────────────────
interface VoiceOption {
    id: string;
    name: string;
    gender: "male" | "female";
    provider: "deepgram" | "sarvam";
    voiceId: string;
}

interface VoiceResult {
    language: string;
    provider: "deepgram" | "sarvam";
    voices: VoiceOption[];
}

// ── Props ────────────────────────────────────────────────────────────
interface LanguageVoiceSelectionProps {
    selectedLanguage: string;
    selectedVoice: string;
    onLanguageSelect: (lang: string) => void;
    onVoiceSelect: (voice: string) => void;
}

export function LanguageVoiceSelection({
    selectedLanguage,
    selectedVoice,
    onLanguageSelect,
    onVoiceSelect,
}: LanguageVoiceSelectionProps) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [playingVoice, setPlayingVoice] = useState<string | null>(null);
    const [loadingPreview, setLoadingPreview] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Dynamic voice state
    const [voiceResult, setVoiceResult] = useState<VoiceResult | null>(null);
    const [voicesLoading, setVoicesLoading] = useState(false);
    const [voiceError, setVoiceError] = useState<string | null>(null);
    const [audioError, setAudioError] = useState<string | null>(null);

    // Static language list (no API call needed for this)
    const allLanguages: Language[] = staticLanguages;
    const currentLang = allLanguages.find((l) => l.language === selectedLanguage);

    // Stable ref for onVoiceSelect to avoid re-creating fetchVoices
    const onVoiceSelectRef = useRef(onVoiceSelect);
    onVoiceSelectRef.current = onVoiceSelect;

    // ── Fetch voices when language changes ────────────────────────────
    const fetchVoices = useCallback(async (language: string) => {
        setVoicesLoading(true);
        setVoiceError(null);
        setVoiceResult(null);

        // Stop any playing audio
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        setPlayingVoice(null);

        try {
            const res = await fetch(`/api/voices?language=${encodeURIComponent(language)}`);
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || `Failed to fetch voices (${res.status})`);
            }
            const data: VoiceResult = await res.json();
            setVoiceResult(data);

            // Auto-select first voice
            if (data.voices.length > 0) {
                onVoiceSelectRef.current(data.voices[0].id);
            }
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Failed to load voices";
            setVoiceError(msg);
        } finally {
            setVoicesLoading(false);
        }
    }, []);

    useEffect(() => {
        if (selectedLanguage) {
            fetchVoices(selectedLanguage);
        }
    }, [selectedLanguage, fetchVoices]);

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    // Cleanup audio on unmount
    useEffect(() => {
        return () => { audioRef.current?.pause(); };
    }, []);

    // ── Play preview via /api/tts-preview ─────────────────────────────
    const togglePreview = async (voiceId: string, voiceName: string) => {
        setAudioError(null);

        // If clicking the same voice that's already playing, stop it
        if (playingVoice === voiceId) {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
            setPlayingVoice(null);
            return;
        }

        // Stop any currently playing audio
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }

        setLoadingPreview(voiceId);
        setPlayingVoice(null);

        try {
            // Fetch audio as blob — this lets us check HTTP status first
            const params = new URLSearchParams({
                voice: voiceName,
                language: selectedLanguage,
            });
            const response = await fetch(`/api/tts-preview?${params.toString()}`);

            if (!response.ok) {
                let detail = `API returned ${response.status}`;
                try {
                    const errData = await response.json();
                    detail = errData.error || errData.detail || detail;
                } catch { /* not JSON */ }
                throw new Error(detail);
            }

            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);
            const newAudio = new Audio(blobUrl);
            audioRef.current = newAudio;

            setLoadingPreview(null);
            setPlayingVoice(voiceId);
            await newAudio.play();

            newAudio.onended = () => {
                setPlayingVoice(null);
                URL.revokeObjectURL(blobUrl);
            };
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Preview failed";
            console.error("Audio preview error:", msg);
            setAudioError(`Preview unavailable for "${voiceName}" in ${selectedLanguage}. This voice may not support this language yet.`);
            setPlayingVoice(null);
            setLoadingPreview(null);
        }
    };

    const providerLabel = voiceResult?.provider === "deepgram" ? "Deepgram" : "Sarvam AI";

    return (
        <div className="flex flex-col gap-8 text-gray-900 dark:text-white">
            {/* ── Header ─────────────────────────────────────────────── */}
            <div>
                <h2 className="text-xl font-bold">Language & Voice</h2>
                <p className="text-sm text-gray-500 dark:text-white/35 mt-1">
                    Pick a language and a voice that matches your content&apos;s tone.
                </p>
            </div>

            {/* ERROR MESSAGE */}
            {audioError && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-medium flex items-center gap-2">
                    <span className="shrink-0">⚠️</span>
                    {audioError}
                </div>
            )}

            {/* ── Language selector row ───────────────────────────────── */}
            <div className="flex flex-col sm:flex-row items-end gap-3">

                {/* Dropdown */}
                <div className="relative flex flex-col gap-2 w-full sm:w-64" ref={dropdownRef}>
                    <label className="text-xs font-bold text-gray-500 dark:text-white/40 uppercase tracking-wider flex items-center gap-1.5 ml-1">
                        <Globe size={11} />
                        Select Language
                    </label>

                    {/* Trigger */}
                    <button
                        onClick={() => setDropdownOpen((v) => !v)}
                        className="flex items-center justify-between gap-3 px-4 py-3 w-full
                                   rounded-xl bg-white dark:bg-white/[0.05] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white shadow-sm dark:shadow-none
                                   hover:bg-gray-50 dark:hover:bg-white/[0.08] hover:border-gray-300 dark:hover:border-white/20 transition-all duration-200"
                    >
                        <div className="flex items-center gap-2.5">
                            {currentLang
                                ? <span className="text-xl leading-none">{currentLang.countryFlag}</span>
                                : <Globe size={18} className="text-gray-400 dark:text-white/30" />
                            }
                            <span className={`font-semibold text-sm ${currentLang ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-white/30"}`}>
                                {currentLang?.language ?? "Choose language"}
                            </span>
                        </div>
                        <ChevronDown
                            size={16}
                            className={`text-gray-500 dark:text-white/40 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                        />
                    </button>

                    {/* Dropdown list */}
                    {dropdownOpen && (
                        <div
                            className="absolute top-full left-0 mt-2 w-full z-50
                                       bg-white dark:bg-[#111114] border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-2xl
                                       overflow-hidden py-1"
                            style={{ maxHeight: "260px", overflowY: "auto" }}
                        >
                            {allLanguages.map((lang) => (
                                <button
                                    key={lang.language}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        onLanguageSelect(lang.language);
                                        setDropdownOpen(false);
                                    }}
                                    className={`w-full flex items-center justify-between gap-2 px-4 py-2.5
                                        text-sm transition-colors duration-150
                                        ${selectedLanguage === lang.language
                                            ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-300"
                                            : "text-gray-600 dark:text-white/60 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
                                        }`}
                                >
                                    <div className="flex items-center gap-2.5">
                                        <span className="text-lg leading-none">{lang.countryFlag}</span>
                                        <span className="font-medium">{lang.language}</span>
                                    </div>
                                    {selectedLanguage === lang.language && (
                                        <Check size={14} className="text-indigo-400 shrink-0" />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Selected language info box */}
                {currentLang && voiceResult && (
                    <div className="flex-1 flex items-center gap-4 px-5 py-3 rounded-xl bg-indigo-500/[0.08] border border-indigo-500/20 h-[52px]">
                        <span className="text-2xl leading-none opacity-80">{currentLang.countryFlag}</span>
                        <div className="flex flex-col justify-center">
                            <p className="text-sm font-bold text-indigo-300 leading-tight">
                                {currentLang.language} selected
                            </p>
                            <p className="text-[11px] text-indigo-400/50 leading-tight">
                                Using {providerLabel} model · {voiceResult.voices.length} voices
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* ── Loading state ────────────────────────────────────────── */}
            {voicesLoading && (
                <div className="flex items-center justify-center gap-3 py-12">
                    <Loader2 size={20} className="animate-spin text-indigo-400" />
                    <span className="text-sm text-gray-500 dark:text-white/40 font-medium">Loading voices...</span>
                </div>
            )}

            {/* ── Voice error ──────────────────────────────────────────── */}
            {voiceError && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                    {voiceError}
                </div>
            )}

            {/* ── Voice list ─────────────────────────────────────────── */}
            {voiceResult && voiceResult.voices.length > 0 && (
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-gray-500 dark:text-white/50 uppercase tracking-wider">Available Voices</h3>
                        <span className="text-xs font-bold text-gray-500 dark:text-white/25 uppercase tracking-wider bg-gray-100 dark:bg-white/5 px-3 py-1 rounded-lg border border-transparent dark:border-white/5">
                            {voiceResult.voices.length} voices available
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {voiceResult.voices.map((voice) => {
                            const isSelected = selectedVoice === voice.id;
                            const isPlaying = playingVoice === voice.id;
                            const isLoading = loadingPreview === voice.id;

                            return (
                                <div
                                    key={voice.id}
                                    onClick={() => onVoiceSelect(voice.id)}
                                    className={`
                                        relative flex items-center justify-between p-4 rounded-2xl border-2
                                        transition-all duration-200 cursor-pointer group
                                        ${isSelected
                                            ? "bg-indigo-50 dark:bg-indigo-500/10 border-indigo-500 shadow-[0_0_20px_-5px_rgba(99,102,241,0.25)]"
                                            : "bg-white dark:bg-white/[0.03] border-gray-200 dark:border-white/[0.06] hover:bg-gray-50 dark:hover:bg-white/[0.06] hover:border-gray-300 dark:hover:border-white/15 shadow-sm dark:shadow-none"
                                        }
                                    `}
                                >
                                    <div className="flex items-center gap-4">
                                        {/* Play / Loading button */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                togglePreview(voice.id, voice.voiceId);
                                            }}
                                            disabled={isLoading}
                                            className={`
                                                w-10 h-10 rounded-full flex items-center justify-center shrink-0
                                                transition-all duration-200
                                                ${isLoading
                                                    ? "bg-indigo-500/20 text-indigo-300"
                                                    : isPlaying
                                                        ? "bg-indigo-500 text-white"
                                                        : "bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-white/40 hover:bg-gray-200 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white"
                                                }
                                            `}
                                        >
                                            {isLoading
                                                ? <Loader2 size={17} className="animate-spin" />
                                                : isPlaying
                                                    ? <Pause size={17} />
                                                    : <Play size={17} fill="currentColor" />
                                            }
                                        </button>

                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className={`font-bold text-sm ${isSelected ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-white/80"}`}>
                                                    {voice.name}
                                                </span>
                                                <span className={`px-2 py-0.5 rounded-md text-[10px] uppercase tracking-tight font-bold border
                                                    ${voice.gender === "female"
                                                        ? "bg-pink-500/10 text-pink-400/70 border-pink-500/15"
                                                        : "bg-blue-500/10 text-blue-400/70 border-blue-500/15"
                                                    }`}>
                                                    {voice.gender}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-400 dark:text-white/25 mt-0.5">
                                                {voice.provider} · <span className="text-gray-500 dark:text-white/40">{voice.voiceId}</span>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Selection indicator */}
                                    <div className={`
                                        w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0
                                        transition-all duration-200
                                        ${isSelected
                                            ? "bg-indigo-500 border-indigo-500 text-white"
                                            : "bg-transparent border-gray-200 dark:border-white/10 group-hover:border-gray-300 dark:group-hover:border-white/25"
                                        }
                                    `}>
                                        {isSelected && <Check size={12} strokeWidth={3} />}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
