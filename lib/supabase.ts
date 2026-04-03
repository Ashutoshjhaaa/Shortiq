import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase URL or Anon Key is missing. Check your .env.local file.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// For server-side operations that require bypass of RLS
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!serviceRoleKey || !serviceRoleKey.startsWith('eyJ')) {
    console.error(
        '[supabase] SUPABASE_SERVICE_ROLE_KEY is missing or invalid. ' +
        'It must be the service_role JWT from Supabase → Project Settings → API. ' +
        'Admin operations (RLS bypass) will fail until this is set correctly.'
    );
}
export const supabaseAdmin = createClient(
    supabaseUrl,
    serviceRoleKey || supabaseKey
);
