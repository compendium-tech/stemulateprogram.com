// components/ui/spinner.tsx
import { Loader2 } from "lucide-react"
import { cn } from "../lib/utils"

export function Spinner({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center py-12", className)}>
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  )
}
