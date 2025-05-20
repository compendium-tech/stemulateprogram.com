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
import { Fingerprint, LogInIcon, MailCheckIcon, UserIcon } from "lucide-react"

export function AuthSection() {
  const [email, setEmail] = useState<string>("")
  const [code, setCode] = useState("")
  const [sendCodeError, setSendCodeError] = useState("")
  const [verifyCodeError, setVerifyCodeError] = useState("")
  const [signInOrSignUp, setSignInOrSignUp] = useState<
    "signIn" | "signUp" | null
  >(null)
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [sendingOtp, setSendingOtp] = useState(false)
  const [verifyingOtp, setVerifyingOtp] = useState(false)

  const handleSendOtp = async (signUp: boolean) => {
    if (!email) return
    setSendingOtp(true)
    try {
      const { error } = await supabaseClient.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: "https://stemulateprogram.com/apply",
          shouldCreateUser: signUp,
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
        } else if (error.code === "otp_disabled") {
          if (!isCodeSent) {
            setSendCodeError("Account with such email doesn't exist.")
          } else {
            setVerifyCodeError("Account with such email doesn't exist.")
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
        !signInOrSignUp ? (
          <>
            <p className="text-3xl md:text-2xl font-semibold">
              Welcome to application form.
            </p>
            <p className="md:text-lg">
              It seems like you are not logged in to your STEMulate account.
            </p>
            <Button
              onClick={() => setSignInOrSignUp("signIn")}
              variant="outline"
              className="mr-4 p-4 rounded-xl"
            >
              <LogInIcon />
              Login
            </Button>
            <Button
              onClick={() => setSignInOrSignUp("signUp")}
              variant="outline"
              className="p-4 rounded-xl"
            >
              <UserIcon />
              Sign up
            </Button>
          </>
        ) : signInOrSignUp === "signIn" ? (
          <>
            <p className="text-2xl md:text-3xl font-semibold">
              Log into your account
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
              onClick={() => handleSendOtp(false)}
              disabled={sendingOtp || !email}
              variant="outline"
              className="w-full rounded-xl"
            >
              <MailCheckIcon />
              {sendingOtp ? "Sending code..." : "Send Verification Code"}
            </Button>
          </>
        ) : (
          <>
            <>
              <p className="text-2xl md:text-3xl font-semibold">
                Create an account
              </p>
              <p className="md:text-lg">
                We'll send you a code to confirm you email and access your
                application form.
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
                onClick={() => handleSendOtp(true)}
                disabled={sendingOtp || !email}
                variant="outline"
                className="w-full rounded-xl"
              >
                <MailCheckIcon />
                {sendingOtp ? "Sending code..." : "Send Verification Code"}
              </Button>
            </>
          </>
        )
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
              className="bg-neutral-800 hover:bg-neutral-700 rounded-xl"
              onClick={handleVerifyCode}
              disabled={verifyingOtp || code.length !== 6}
            >
              <Fingerprint />
              {verifyingOtp ? "Signing in..." : "Sign in"}
            </Button>

            <Button
              variant={"outline"}
              onClick={() => handleSendOtp(true)}
              className="text-sm text-primary underline hover:text-primary/80 rounded-xl"
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
