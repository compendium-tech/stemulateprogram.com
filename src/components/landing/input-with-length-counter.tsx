import * as React from "react"

import { Input } from "@/components/ui/input"

interface InputWithLengthCounterProps extends React.ComponentProps<"input"> {
  maxLength: number
}

export const InputWithLengthCounter = React.forwardRef<
  HTMLInputElement,
  InputWithLengthCounterProps
>(({ className, maxLength, ...props }, ref) => {
  const [length, setLength] = React.useState(0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLength(e.target.value.length)

    if (props.onChange) props.onChange(e)
  }

  return (
    <div className="relative">
      <Input ref={ref} {...props} onChange={handleChange} />
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
        {length}/{maxLength}
      </div>
    </div>
  )
})
