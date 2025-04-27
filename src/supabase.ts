import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://msrispzrxbjjnbrinwcp.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zcmlzcHpyeGJqam5icmlud2NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NzUwMTYsImV4cCI6MjA1ODI1MTAxNn0.97KV1d1i4jZP6A-y6Wl_CHiJLxF8v93F_xO4xBOYReY"

export const supabaseClient = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storageKey: "supabase.auth.token",
  },
})
