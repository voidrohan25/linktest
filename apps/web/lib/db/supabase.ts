import { createClient, SupabaseClient, SupabaseAuthClient } from '@supabase/supabase-js';

// Attempt to create a real Supabase client if env vars are present.
let supabase: SupabaseClient<any, "public", any>;

if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
} else {
  // Export a dummy object that mimics the parts of the Supabase client we use.
  // This prevents the whole app from crashing when env vars are missing.
  const dummyAuth = {
    signInWithPassword: async () => ({ error: new Error('Supabase not configured: missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY') }),
    signInWithOAuth: async () => ({ error: new Error('Supabase not configured: missing env vars') }),
    signUp: async () => ({ error: new Error('Supabase not configured: missing env vars') }),
  } as unknown as SupabaseAuthClient<any>;
  supabase = {
    auth: dummyAuth,
    // other methods are not used in the current codebase, so we leave them undefined.
  } as unknown as SupabaseClient<any, "public", any>;
}

export { supabase };
