import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string

// Client-side supabase client (uses anon key, subject to RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side supabase client (uses service role key, bypasses RLS)
// Only use in server actions for privileged operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey)
