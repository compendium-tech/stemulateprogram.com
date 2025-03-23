import React, { ChangeEvent, FormEvent, useState } from "react"
import { createClient } from "@supabase/supabase-js"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

const supabaseUrl = "https://msrispzrxbjjnbrinwcp.supabase.co"
const supabaseAnonKey = "<YOUR_SUPABASE_KEY_HERE>"
const supabase = createClient(supabaseUrl, supabaseAnonKey)

const researchFields: string[] = [
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
  ): void => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
  }

  const handleMultiSelectChange = (
    field: keyof FormDataType,
    value: string
  ): void => {
    const updated = formData[field].includes(value)
      ? formData[field].filter((item) => item !== value)
      : [...formData[field], value].slice(0, 3)
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
      newErrors[key] = validateField(key, val)
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
    <div className="max-w-3xl mx-auto py-10 px-6 rounded-2xl shadow-2xl bg-white border border-blue-200">
      <h1 className="text-3xl md:text-5xl font-bold mb-8 text-blue-700">
        🎓 Application Form
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
          <div key={name}>
            <Label
              htmlFor={name}
              className="text-base font-medium text-gray-700"
            >
              {label}
            </Label>
            <Input
              id={name}
              name={name}
              placeholder={placeholder}
              value={formData[name]}
              onChange={handleChange}
              className="h-12 text-lg px-4 border border-blue-300 rounded-xl hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition placeholder:text-gray-400"
            />
            {errors[name] && (
              <p className="text-sm text-red-500 mt-1">{errors[name]}</p>
            )}
          </div>
        ))}

        <div>
          <Label className="text-base font-medium text-gray-700">
            Fields of Interest (Choose up to 3)
          </Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {researchFields.map((field) => (
              <label
                key={field}
                className="flex items-center space-x-2 hover:bg-blue-50 px-2 py-1 rounded-lg cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={formData.fieldsOfInterest.includes(field)}
                  onChange={() =>
                    handleMultiSelectChange("fieldsOfInterest", field)
                  }
                  className="accent-blue-500"
                />
                <span>{field}</span>
              </label>
            ))}
          </div>
        </div>

        {[
          "researchInterest",
          "extracurricular",
          "motivation",
          "additionalInfo",
        ].map((name) => (
          <div key={name}>
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
              value={formData[name]}
              onChange={handleChange}
              className="min-h-[150px] text-lg px-4 py-2 border border-blue-300 rounded-xl hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition placeholder:text-gray-400"
              maxLength={1000}
            />
            <p className="text-sm text-gray-500 italic mt-1">
              Using AI is prohibited.
            </p>
            <p className="text-sm text-gray-500">
              Character count: {formData[name].length}/1000
            </p>
            {errors[name] && (
              <p className="text-sm text-red-500 mt-1">{errors[name]}</p>
            )}
          </div>
        ))}

        <div>
          <Label className="text-base font-medium text-gray-700">
            Financial Aid
          </Label>
          <select
            className="h-12 w-full text-lg border border-blue-300 rounded-xl px-4 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition placeholder:text-gray-400"
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
            className="p-6 text-lg rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white"
          >
            Submit Application
          </Button>
        </div>
      </form>

      {/* Dialogs */}
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
            <div className="flex">
              <Button
                className=" p-6 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white"
                onClick={() => setFinancialAidDialogOpen(false)}
              >
                OK
              </Button>
            </div>
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
