import { FC } from "react"
import { Button } from "@/components/ui/button"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Fingerprint, MailCheckIcon, StepBackIcon } from "lucide-react"

interface OtpInputFormProps {
  email: string
  code: string
  setCode: (code: string) => void
  onVerifyCode: () => void
  verifyingOtp: boolean
  verifyCodeError: string
  onResendCode: () => void
  sendingOtp: boolean
  onGoBackToStart: () => void
}

export const OtpInputForm: FC<OtpInputFormProps> = ({
  email,
  code,
  setCode,
  onVerifyCode,
  verifyingOtp,
  verifyCodeError,
  onResendCode,
  sendingOtp,
  onGoBackToStart,
}) => (
  <>
    <p className="text-3xl md:text-4xl font-semibold">
      Enter Verification Code
    </p>
    <p>
      This may take a while for our system to send an email with verification
      code, check "Spam folder".
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

    <div className="flex flex-col md:flex-row gap-2 md:gap-4">
      <Button
        className="w-full md:w-1/2 bg-neutral-800 hover:bg-neutral-700 py-2 md:py-2.5"
        onClick={onVerifyCode}
        disabled={verifyingOtp || code.length !== 6}
      >
        <div className="flex items-center justify-center gap-2">
          <Fingerprint className="h-4 w-4 md:h-5 md:w-5" />
          <span>{verifyingOtp ? "Signing in..." : "Sign in"}</span>
        </div>
      </Button>

      <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
        <Button
          variant="outline"
          onClick={onResendCode}
          className="w-full md:w-auto text-primary hover:text-primary/80 py-2 md:py-2.5"
          disabled={sendingOtp}
        >
          <div className="flex items-center justify-center gap-2">
            <MailCheckIcon className="h-4 w-4 md:h-5 md:w-5" />
            <span>{sendingOtp ? "Resending..." : "Resend Code"}</span>
          </div>
        </Button>

        <Button
          onClick={onGoBackToStart}
          variant="outline"
          className="w-full md:w-auto py-2 md:py-2.5"
        >
          <div className="flex items-center justify-center gap-2">
            <StepBackIcon className="h-4 w-4 md:h-5 md:w-5" />
            <span>Go back</span>
          </div>
        </Button>
      </div>
    </div>
  </>
)
