import { ChangeEvent, FormEvent, useState } from "react"
import { createClient } from "@supabase/supabase-js"

import { Button } from "@/components/ui/button"
import { FormInput } from "./form-input"
import { FormTextarea } from "./form-textarea"
import { InterestCheckboxes } from "./interest-checkboxes"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

const supabaseUrl = "https://msrispzrxbjjnbrinwcp.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zcmlzcHpyeGJqam5icmlud2NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NzUwMTYsImV4cCI6MjA1ODI1MTAxNn0.97KV1d1i4jZP6A-y6Wl_CHiJLxF8v93F_xO4xBOYReY"
const supabase = createClient(supabaseUrl, supabaseAnonKey)

const researchFields = [
  "Biology",
  "Business",
  "Chemistry",
  "Computer Science",
  "Ecology",
  "Economics",
  "Education",
  "Engineering",
  "Gender Studies",
  "History",
  "Mathematics",
  "Media Studies",
  "Neuroscience",
  "Physics",
  "Political Science",
  "Psychology",
  "Sociology",
]

interface FormDataType {
  email: string
  fullName: string
  cityCountry: string
  phone: string
  ieltsScore: string
  satScore: string
  schoolName: string
  currentGrade: string
  gpa: string
  parentName: string
  parentPhone: string
  fieldsOfInterest: string[]
  researchInterest: string
  extracurricular: string
  motivation: string
  financialAid: string
  additionalInfo: string
}

interface FormErrors {
  [key: string]: string
}

export default function ApplicationForm() {
  const [formData, setFormData] = useState<FormDataType>({
    email: "",
    fullName: "",
    cityCountry: "",
    phone: "",
    ieltsScore: "",
    satScore: "",
    schoolName: "",
    currentGrade: "",
    gpa: "",
    parentName: "",
    parentPhone: "",
    fieldsOfInterest: [],
    researchInterest: "",
    extracurricular: "",
    motivation: "",
    financialAid: "",
    additionalInfo: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [financialAidDialogOpen, setFinancialAidDialogOpen] = useState(false)
  const [submissionErrorDialogOpen, setSubmissionErrorDialogOpen] =
    useState(false)
  const [submissionSuccessDialogOpen, setSubmissionSuccessDialogOpen] =
    useState(false)
  const [submissionErrorMessage, setSubmissionErrorMessage] = useState("")

  const countWords = (text: string): number =>
    text.trim().split(/\s+/).filter(Boolean).length

  const validateField = (name: string, value: string): string => {
    let error = ""
    if (
      ["email", "fullName", "phone", "currentGrade", "gpa"].includes(name) &&
      !value
    ) {
      error = "This field is required."
    }
    if (name === "email" && value && !/\S+@\S+\.\S+/.test(value)) {
      error = "Invalid email format."
    }
    if (name === "researchInterest" && countWords(value) > 300) {
      error = "Max 300 words allowed."
    }
    if (name === "motivation") {
      const words = countWords(value)
      if (words < 100 || words > 150) error = "Should be 100-150 words."
    }
    return error
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    const key = name as keyof FormDataType
    setFormData((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: validateField(name, value) }))
  }

  const handleMultiSelectChange = (
    field: keyof FormDataType,
    value: string
  ): void => {
    const current = formData[field] as string[]
    const updated = current.includes(value)
      ? current.filter((item: string) => item !== value)
      : [...current, value].slice(0, 3)
    setFormData((prev) => ({ ...prev, [field]: updated }))
  }

  const handleSelectChange = (
    field: keyof FormDataType,
    value: string
  ): void => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (field === "financialAid" && value === "yes")
      setFinancialAidDialogOpen(true)
  }

  const validateAll = (): boolean => {
    const newErrors: FormErrors = {}
    Object.entries(formData).forEach(([key, val]) => {
      newErrors[key] = validateField(key, val as string)
    })
    setErrors(newErrors)
    return Object.values(newErrors).some(Boolean)
  }

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault()
    if (validateAll()) {
      setSubmissionErrorMessage("Please correct the errors before submitting.")
      setSubmissionErrorDialogOpen(true)
      return
    }
    const { error } = await supabase.from("applications").insert([formData])
    if (error) {
      setSubmissionErrorMessage(error.message)
      setSubmissionErrorDialogOpen(true)
    } else {
      setSubmissionSuccessDialogOpen(true)
      setFormData({
        email: "",
        fullName: "",
        cityCountry: "",
        phone: "",
        ieltsScore: "",
        satScore: "",
        schoolName: "",
        currentGrade: "",
        gpa: "",
        parentName: "",
        parentPhone: "",
        fieldsOfInterest: [],
        researchInterest: "",
        extracurricular: "",
        motivation: "",
        financialAid: "",
        additionalInfo: "",
      })
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-6 bg-white">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-red-600">
        Application Form
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6 text-lg">
        {[
          ["Email", "email", "example@mail.com"],
          ["Full Name", "fullName", "John Doe"],
          ["City and Country", "cityCountry", "New York, USA"],
          ["Phone", "phone", "+1234567890"],
          ["IELTS/TOEFL Score", "ieltsScore", "e.g. 7.5"],
          ["SAT Score", "satScore", "e.g. 1450"],
          ["School Name", "schoolName", "Springfield High School"],
          ["Current Grade", "currentGrade", "11"],
          ["GPA", "gpa", "4.0 / 5.0"],
          ["Parent Name", "parentName", "Jane Doe"],
          ["Parent Phone", "parentPhone", "+1234567899"],
        ].map(([label, name, placeholder]) => (
          <FormInput
            key={name}
            label={label}
            name={name as keyof FormDataType}
            value={formData[name as keyof FormDataType] as string}
            placeholder={placeholder}
            error={errors[name as keyof FormDataType]}
            onChange={handleChange}
          />
        ))}

        <InterestCheckboxes
          fields={researchFields}
          selected={formData.fieldsOfInterest}
          onChange={(value) =>
            handleMultiSelectChange("fieldsOfInterest", value)
          }
        />

        {[
          "researchInterest",
          "extracurricular",
          "motivation",
          "additionalInfo",
        ].map((name) => (
          <FormTextarea
            key={name}
            name={name as keyof FormDataType}
            value={formData[name as keyof FormDataType] as string}
            error={errors[name]}
            onChange={handleChange}
          />
        ))}

        <div>
          <label className="text-base font-medium text-gray-700">
            Financial Aid
          </label>
          <select
            className="h-12 w-full text-lg border rounded-xl px-4 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-400"
            value={formData.financialAid}
            onChange={(e) => handleSelectChange("financialAid", e.target.value)}
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            className="p-6 text-lg rounded-xl bg-red-600 hover:bg-red-700 text-white"
          >
            Submit Application
          </Button>
        </div>
      </form>

      <Dialog
        open={financialAidDialogOpen}
        onOpenChange={setFinancialAidDialogOpen}
      >
        <DialogContent className="bg-white rounded-xl">
          <DialogHeader>
            <DialogTitle>Financial Aid Info</DialogTitle>
            <DialogDescription>
              You selected financial aid. Additional documents and interview
              will be required.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              className="p-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setFinancialAidDialogOpen(false)}
            >
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={submissionErrorDialogOpen}
        onOpenChange={setSubmissionErrorDialogOpen}
      >
        <DialogContent className="bg-white rounded-xl">
          <DialogHeader>
            <DialogTitle>Submission Error</DialogTitle>
            <DialogDescription>{submissionErrorMessage}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setSubmissionErrorDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={submissionSuccessDialogOpen}
        onOpenChange={setSubmissionSuccessDialogOpen}
      >
        <DialogContent className="bg-white rounded-xl">
          <DialogHeader>
            <DialogTitle>Success</DialogTitle>
            <DialogDescription>
              Your application was submitted successfully.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setSubmissionSuccessDialogOpen(false)}>
              Great!
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
