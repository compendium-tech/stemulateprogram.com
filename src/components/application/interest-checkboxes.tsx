import { Checkbox } from "../ui/checkbox"

interface InterestCheckboxesProps {
  fields: string[]
  selected: string[]
  onChange: (field: string) => void
}

export const InterestCheckboxes = ({
  fields,
  selected,
  onChange,
}: InterestCheckboxesProps) => (
  <div>
    <label className="text-base font-medium text-gray-700">
      Fields of Interest (Choose up to 3)
    </label>
    <div className="grid grid-cols-2 gap-2 mt-2">
      {fields.map((field) => (
        <label
          key={field}
          className="flex items-center space-x-2 hover:bg-red-50 px-2 py-1 rounded-lg cursor-pointer"
        >
          <Checkbox
            id={field}
            checked={selected.includes(field)}
            onChange={() => onChange(field)}
            className="accent-red-500 rounded-lg"
          />
          <span>{field}</span>
        </label>
      ))}
    </div>
  </div>
)
