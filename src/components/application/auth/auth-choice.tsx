import { FC } from "react"
import { Button } from "@/components/ui/button"
import { LogInIcon, UserIcon } from "lucide-react"

interface AuthChoiceProps {
  onSignIn: () => void
  onSignUp: () => void
}

export const AuthChoice: FC<AuthChoiceProps> = ({ onSignIn, onSignUp }) => (
  <>
    <p className="text-3xl md:text-2xl font-semibold">
      Welcome to application form.
    </p>
    <p className="md:text-lg">
      It seems like you are not logged in to your STEMulate account.
    </p>
    <Button
      onClick={onSignIn}
      variant="outline"
      className="mr-4 p-4 rounded-xl"
    >
      <LogInIcon className="mr-2" />
      Login
    </Button>
    <Button onClick={onSignUp} variant="outline" className="p-4 rounded-xl">
      <UserIcon className="mr-2" />
      Sign up
    </Button>
  </>
)
