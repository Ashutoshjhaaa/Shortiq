-- Run this SQL in your Supabase SQL Editor to set up the complete database schema

-- 0. Profiles Table (For user data)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL UNIQUE, -- Clerk User ID
    email TEXT,
    full_name TEXT,
    avatar_url TEXT,
    billing_plan TEXT DEFAULT 'free',
    updated_at TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 1. Social Accounts Table (For connecting YouTube/TikTok/Instagram)
CREATE TABLE IF NOT EXISTS public.social_accounts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL, -- Storing Clerk User ID
    platform TEXT NOT NULL, -- 'youtube', 'instagram', 'tiktok'
    platform_account_id TEXT,
    platform_account_name TEXT,
    access_token TEXT,
    refresh_token TEXT,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, platform)
);

-- 2. Series Table (For automated video series)
CREATE TABLE IF NOT EXISTS public.series (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL, -- Storing Clerk User ID
    series_name TEXT NOT NULL,
    niche TEXT NOT NULL,
    language TEXT NOT NULL,
    voice_id TEXT NOT NULL,
    background_music TEXT[] DEFAULT '{}',
    video_style TEXT NOT NULL,
    caption_style TEXT NOT NULL,
    video_duration TEXT,
    platforms TEXT[] DEFAULT '{}',
    publish_time TEXT,
    status TEXT DEFAULT 'active', -- 'active', 'paused'
    video_status TEXT DEFAULT 'pending',
    model_name TEXT,
    model_lang_code TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Video Projects Table (For individual video generations)
CREATE TABLE IF NOT EXISTS public.video_projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL, -- Storing Clerk User ID
    series_id UUID REFERENCES public.series(id) ON DELETE CASCADE,
    title TEXT,
    total_script TEXT,
    scenes JSONB DEFAULT '[]',
    audio_url TEXT,
    captions_url TEXT,
    image_urls TEXT[] DEFAULT '{}',
    video_url TEXT,
    render_id TEXT,
    status TEXT DEFAULT 'generating', -- 'generating', 'ready', 'failed', 'cancelled', 'rendering'
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.social_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.series ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_projects ENABLE ROW LEVEL SECURITY;

-- Note: Since we are using Clerk for Auth and Supabase for DB, 
-- RLS policies are bypassed when using the Supabase Service Role Key.

