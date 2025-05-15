import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "../ui/input"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp" // Import OTP component
import { supabaseClient } from "@/supabase"
import { Fingerprint, MailCheckIcon } from "lucide-react"

export function AuthSection() {
  const [email, setEmail] = useState<string>("")
  const [code, setCode] = useState("")
  const [sendCodeError, setSendCodeError] = useState("")
  const [verifyCodeError, setVerifyCodeError] = useState("")
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [sendingOtp, setSendingOtp] = useState(false)
  const [verifyingOtp, setVerifyingOtp] = useState(false)

  const handleSendOtp = async () => {
    if (!email) return
    setSendingOtp(true)
    try {
      const { error } = await supabaseClient.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: "https://stemulateprogram.com/apply",
          shouldCreateUser: true,
        },
      })

      if (error) {
        if (error.code === "validation_failed") {
          setSendCodeError("Invalid email address.")
        } else if (error.code === "over_email_send_rate_limit") {
          if (!isCodeSent) {
            setSendCodeError("Too many login attempts. Please try again later.")
          } else {
            setVerifyCodeError(
              "Too many login attempts. Please try again later."
            )
          }
        } else {
          if (!isCodeSent) {
            setSendCodeError("Something went wrong, please try again.")
          } else {
            setVerifyCodeError("Something went wrong, please try again.")
          }
        }
      } else {
        setIsCodeSent(true)
      }
    } catch (err: any) {
      setSendCodeError("Something went wrong, please try again.")
    }
    setSendingOtp(false)
  }

  const handleVerifyCode = async () => {
    if (code.length !== 6) {
      setVerifyCodeError("Please enter a 6-digit code.")
      return
    }

    setVerifyingOtp(true)
    try {
      const { error } = await supabaseClient.auth.verifyOtp({
        email,
        token: code,
        type: "email",
      })

      if (error?.code === "otp_expired") {
        setVerifyCodeError(
          "The code is invalid or has expired. Please request a new one."
        )
      } else {
        setVerifyCodeError("Something went wrong, please try again.")
      }
    } catch (err: any) {
      setVerifyCodeError("Something went wrong, please try again.")
    }

    setVerifyingOtp(false)
  }

  return (
    <div className="mt-2 px-2 w-full md:w-3/6 space-y-3">
      {!isCodeSent ? (
        <>
          <p className="text-2xl md:text-3xl font-semibold">
            Confirm your email
          </p>
          <p className="md:text-lg">
            We'll send you a code to access your application form.
          </p>
          <Input
            className="md:text-base"
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {sendCodeError && (
            <p className="text-red-500 text-sm">{sendCodeError}</p>
          )}

          <Button
            onClick={handleSendOtp}
            disabled={sendingOtp || !email}
            className="w-full bg-neutral-800 hover:bg-neutral-700 rounded-xl"
          >
            <MailCheckIcon />
            {sendingOtp ? "Sending code..." : "Send Verification Code"}
          </Button>
        </>
      ) : (
        <>
          <p className="text-xl font-semibold">Enter Verification Code</p>
          <p>
            This may take a while for our system to send an email with
            verification code, check "Spam folder".
          </p>
          <InputOTP maxLength={6} value={code} onChange={setCode}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <p>Enter the 6-digit code sent to {email}</p>

          {verifyCodeError && (
            <p className="text-red-500 text-sm">{verifyCodeError}</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <Button
              className="bg-neutral-800 hover:bg-neutral-700"
              onClick={handleVerifyCode}
              disabled={verifyingOtp || code.length !== 6}
            >
              <Fingerprint />
              {verifyingOtp ? "Signing in..." : "Sign in"}
            </Button>

            <Button
              variant={"outline"}
              onClick={handleSendOtp}
              className="text-sm text-primary underline hover:text-primary/80"
              disabled={sendingOtp}
            >
              <MailCheckIcon />
              {sendingOtp ? "Resending..." : "Resend Code"}
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
