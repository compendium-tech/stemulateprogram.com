import { useState } from "react"
import { Button } from "@/components/ui/button"
import { createClient } from "@supabase/supabase-js"
import { toast } from "@/hooks/use-toast"
import { ArrowLeftIcon, LogInIcon } from "lucide-react"
import { Input } from "../ui/input"

const supabaseUrl = "https://msrispzrxbjjnbrinwcp.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zcmlzcHpyeGJqam5icmlud2NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NzUwMTYsImV4cCI6MjA1ODI1MTAxNn0.97KV1d1i4jZP6A-y6Wl_CHiJLxF8v93F_xO4xBOYReY"
const supabase = createClient(supabaseUrl, supabaseKey)

export function AuthSection() {
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [email, setEmail] = useState<string>("")
  const [loading, setLoading] = useState(false)

  async function handleGoogleLogin() {
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "/apply",
        },
      })
    } catch (error: any) {
      toast({
        title: "Google Auth Error",
        description: error.message,
      })
    }
  }

  async function handleSendMagicLink() {
    if (!email) return
    setLoading(true)
    try {
      // By default, this is a "magic link" type if you don't specify otherwise.
      // Or you can explicitly set `type: 'magiclink'` if needed.
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: "/apply",
        },
      })
      if (error) {
        toast({
          title: "Error Sending Magic Link",
          description: error.message,
        })
      } else {
        toast({
          title: "Magic Link Sent!",
          description: `Check your inbox (${email}) to complete sign-in.`,
        })
      }
    } catch (err: any) {
      toast({
        title: "Unexpected Error",
        description: err.message,
      })
    }
    setLoading(false)
  }

  // Otherwise, show the two login options
  return (
    <>
      {!showEmailForm ? (
        <div className="text-center space-x-2 space-y-2">
          {/* --------- Google Login --------- */}
          <Button onClick={handleGoogleLogin}>
            <LogInIcon className="mr-2 h-4 w-4" />
            Login with Google
          </Button>

          {/* --------- Email Login (Magic Link) --------- */}
          <Button variant="outline" onClick={() => setShowEmailForm(true)}>
            <LogInIcon className="mr-2 h-4 w-4" />
            Login with email
          </Button>
        </div>
      ) : (
        <div className="mt-2 md:w-1/2 space-y-3">
          <p className="text-xl font-semibold">Login with email</p>
          {/* Input on its own line */}
          <Input
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Put both buttons side by side in a flex row */}
          <div className="flex items-center space-x-2">
            <Button onClick={handleSendMagicLink} disabled={loading || !email}>
              {loading ? "Sending link..." : "Send Magic Link"}
            </Button>
            <Button onClick={() => setShowEmailForm(false)}>
              <ArrowLeftIcon className="mr-1" />
              Return
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
