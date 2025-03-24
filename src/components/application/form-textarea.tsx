import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { FormDataType } from "./form"

interface FormTextareaProps {
  name: keyof FormDataType
  value: string
  error?: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  name,
  value,
  error,
  onChange,
}) => (
  <>
    <Label
      htmlFor={name}
      className="text-base font-medium text-gray-700 capitalize"
    >
      {name.replace(/([A-Z])/g, " $1")}
    </Label>
    <Textarea
      id={name}
      name={name}
      placeholder="Write here..."
      value={value}
      onChange={onChange}
      className="min-h-[150px] text-lg px-4 py-2 border rounded-xl hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 transition placeholder:text-gray-400"
      maxLength={1000}
    />
    <p className="text-sm text-gray-500 italic mt-1">Using AI is prohibited.</p>
    <p className="text-sm text-gray-500">
      Character count: {value.length}/1000
    </p>
    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
  </>
)
