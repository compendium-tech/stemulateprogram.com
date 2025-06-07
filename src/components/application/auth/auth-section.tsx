import { useAuthFlow } from "./hooks/use-auth-flow"
import { AuthChoice } from "./auth-choice"
import { EmailInputForm } from "./email-input-form"
import { OtpInputForm } from "./otp-input-form"

export function AuthSection() {
  const {
    email,
    setEmail,
    code,
    setCode,
    sendCodeError,
    verifyCodeError,
    signInOrSignUp,
    setSignInOrSignUp,
    isCodeSent,
    sendingOtp,
    verifyingOtp,
    captchaToken,
    setCaptchaToken,
    handleSendOtp,
    handleVerifyCode,
    resetAuthFlow,
  } = useAuthFlow()

  return (
    <div className="mt-2 px-2 w-full md:w-3/6 space-y-3">
      {!isCodeSent ? (
        !signInOrSignUp ? (
          <AuthChoice
            onSignIn={() => setSignInOrSignUp("signIn")}
            onSignUp={() => setSignInOrSignUp("signUp")}
          />
        ) : (
          <EmailInputForm
            email={email}
            setEmail={setEmail}
            onSendOtp={handleSendOtp}
            sendingOtp={sendingOtp}
            sendCodeError={sendCodeError}
            captchaToken={captchaToken}
            setCaptchaToken={setCaptchaToken}
            onGoBack={resetAuthFlow}
            isSignUp={signInOrSignUp === "signUp"}
          />
        )
      ) : (
        <OtpInputForm
          email={email}
          code={code}
          setCode={setCode}
          onVerifyCode={handleVerifyCode}
          verifyingOtp={verifyingOtp}
          verifyCodeError={verifyCodeError}
          onResendCode={() => handleSendOtp(signInOrSignUp === "signUp")} // Resend uses the same send logic
          sendingOtp={sendingOtp}
          onGoBackToStart={resetAuthFlow} // Resets to initial state
        />
      )}
    </div>
  )
}
