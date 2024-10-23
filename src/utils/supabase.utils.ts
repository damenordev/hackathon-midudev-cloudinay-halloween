import { createClient } from '@supabase/supabase-js'

export const SUPABASE_URL = import.meta.env.SUPABASE_URL
export const SUPABASE_ANON_KEY = import.meta.env.SUPABASE_ANON_KEY
export const SUPABASE_COOKIE_ACCESS_TOKEN = 'sb-access-token'
export const SUPABASE_COOKIE_REFRESH_TOKEN = 'sb-refresh-token'
// export const SUPABASE_CALLBACK_URL = 'http://localhost:4321' + '/api/auth/callback'
export const SUPABASE_CALLBACK_URL = import.meta.env.WEBSITE_URL + '/api/auth/callback'

export const supabase = createClient(import.meta.env.SUPABASE_URL, import.meta.env.SUPABASE_ANON_KEY, {
  auth: {
    flowType: 'pkce',
    autoRefreshToken: false,
    detectSessionInUrl: false,
    persistSession: true,
    debug: true,
  },
})
