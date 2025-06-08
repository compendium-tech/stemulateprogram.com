import { createClient } from "@supabase/supabase-js"
import { SUPABASE_KEY, SUPABASE_URL } from "./globals"

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    storageKey: "supabase.auth.token",
  },
})
