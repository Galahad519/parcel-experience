import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

const hasMissingSupabaseEnv = !supabaseUrl || !supabaseAnonKey;
const hasPlaceholderSupabaseEnv =
  supabaseUrl?.includes('your-project') ||
  supabaseAnonKey === 'your-anon-key' ||
  supabaseAnonKey === 'your-anon-public-key';

export const supabaseConfigError =
  hasMissingSupabaseEnv || hasPlaceholderSupabaseEnv
    ? 'Supabase is not configured. Create .env.local at the project root with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, then restart npm run dev.'
    : null;

export const supabase = supabaseConfigError
  ? null
  : createClient(supabaseUrl as string, supabaseAnonKey as string);
