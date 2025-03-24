import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormDataType } from "./form"

interface FormInputProps {
  label: string
  name: keyof FormDataType
  value: string
  placeholder: string
  error?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  value,
  placeholder,
  error,
  onChange,
}) => (
  <>
    <Label htmlFor={name} className="text-base font-medium text-gray-700">
      {label}
    </Label>
    <Input
      id={name}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="h-12 text-lg px-4 border rounded-xl hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 transition placeholder:text-gray-400"
    />
    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
  </>
)
