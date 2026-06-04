import { createClient, type SupabaseClient } from "@supabase/supabase-js"

let serverClient: SupabaseClient | null = null

/** Server-side Supabase client. Uses service role when set (bypasses RLS). */
export function getSupabaseServer(): SupabaseClient {
  if (typeof window !== "undefined") {
    throw new Error("getSupabaseServer must only be called on the server")
  }

  if (serverClient) return serverClient

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const key = serviceKey || anonKey

  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL and Supabase API key. Check your .env.local file."
    )
  }

  serverClient = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  return serverClient
}
