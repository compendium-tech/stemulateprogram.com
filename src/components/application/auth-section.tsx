import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { Input } from "../ui/input"
import { supabaseClient } from "@/supabase"

export function AuthSection() {
  const [email, setEmail] = useState<string>("")
  const [loading, setLoading] = useState(false)

  const handleSendMagicLink = async () => {
    if (!email) return
    setLoading(true)
    try {
      // By default, this is a "magic link" type if you don't specify otherwise.
      const { error } = await supabaseClient.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: "https://stemulate-website.vercel.app/apply",
        },
      })
      if (error) {
        toast({
          title: "Error Sending Sign In Link",
          description: error.message,
        })
      } else {
        toast({
          title: "Sign In Link Sent!",
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

  return (
    <>
      <div className="mt-2 px-2 w-full md:w-1/2 space-y-3">
        <p className="text-xl font-semibold">Login with email</p>
        <Input
          type="email"
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="text-sm">
          We will send you a link to sign into your STEMulate account.
        </p>

        <div className="flex items-center space-x-2">
          <Button onClick={handleSendMagicLink} disabled={loading || !email}>
            {loading ? "Sending link..." : "Send Sign In Link"}
          </Button>
        </div>
      </div>
    </>
  )
}
