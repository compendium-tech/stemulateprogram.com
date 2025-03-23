import React, { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Optional: if using shadcn/ui for Dialog
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

// Example: set up Supabase client (use your own env variables or inline them here)
const supabaseUrl = "https://msrispzrxbjjnbrinwcp.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zcmlzcHpyeGJqam5icmlud2NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NzUwMTYsImV4cCI6MjA1ODI1MTAxNn0.97KV1d1i4jZP6A-y6Wl_CHiJLxF8v93F_xO4xBOYReY"
const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
  fieldsOfInterest: string[] | string // simplified to one string for the demo
  researchInterest: string
  extracurricular: string
  motivation: string
  financialAid: string
  additionalInfo: string
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

  // For storing validation errors by field
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // For controlling dialogs
  const [financialAidDialogOpen, setFinancialAidDialogOpen] = useState(false)
  const [submissionErrorDialogOpen, setSubmissionErrorDialogOpen] =
    useState(false)
  const [submissionSuccessDialogOpen, setSubmissionSuccessDialogOpen] =
    useState(false)
  const [submissionErrorMessage, setSubmissionErrorMessage] = useState("")

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

  // Simple helper to count words
  const countWords = (text: string) => {
    return text.trim().split(/\s+/).filter(Boolean).length
  }

  // Validate fields on change or blur (basic sample logic)
  const validateField = (name: string, value: string) => {
    let errorMsg = ""

    if (
      !value &&
      ["email", "fullName", "phone", "currentGrade", "gpa"].includes(name)
    ) {
      errorMsg = "This field is required."
    }

    if (name === "email" && value) {
      // Very naive email check
      const emailRegex = /\S+@\S+\.\S+/
      if (!emailRegex.test(value)) {
        errorMsg = "Please enter a valid email address."
      }
    }

    if (name === "researchInterest") {
      const words = countWords(value)
      // Example says 300 words max
      if (words > 300) {
        errorMsg = "Must not exceed 300 words."
      }
    }

    if (name === "motivation") {
      const words = countWords(value)
      // Example says 100-150 words
      if (words < 100 || words > 150) {
        errorMsg = "Must be between 100 and 150 words."
      }
    }

    return errorMsg
  }

  // Called when text fields change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Validate immediately
    const fieldError = validateField(name, value)
    setErrors((prevErrors) => ({ ...prevErrors, [name]: fieldError }))
  }

  // Called when single-select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // If the user selected "yes" for financialAid, show a dialog
    if (name === "financialAid" && value === "yes") {
      setFinancialAidDialogOpen(true)
    }
  }

  // Final check across all fields on submit
  const validateAll = () => {
    const newErrors: { [key: string]: string } = {}
    Object.entries(formData).forEach(([fieldName, fieldValue]) => {
      // We skip validating optional fields like ieltsScore if we want
      const err = validateField(fieldName, fieldValue)
      if (err) {
        newErrors[fieldName] = err
      }
    })
    setErrors(newErrors)
    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validateAll()

    if (Object.values(validationErrors).some((err) => err !== "")) {
      // If any errors exist, show them in a dialog or do something
      setSubmissionErrorMessage("Please correct the errors before submitting.")
      setSubmissionErrorDialogOpen(true)
      return
    }

    // If no errors, proceed with Supabase insert
    try {
      const { data, error } = await supabase
        .from("applications") // change to your table name
        .insert([formData])

      if (error) {
        console.error("Supabase error:", error)
        setSubmissionErrorMessage(error.message)
        setSubmissionErrorDialogOpen(true)
        return
      }

      // If success
      console.log("Form submitted successfully:", data)
      setSubmissionSuccessDialogOpen(true)

      // Optionally reset form
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
    } catch (err: any) {
      console.error("Submission error:", err)
      setSubmissionErrorMessage(err.message)
      setSubmissionErrorDialogOpen(true)
    }
  }

  return (
    <div className="py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Application Form</h1>

      <form onSubmit={handleSubmit} className="space-y-8 rounded-lg p-6 ">
        {/* Email */}
        <div>
          <Label htmlFor="email" className="text-lg font-medium">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 h-12"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Full Name */}
        <div>
          <Label htmlFor="fullName" className="text-lg font-medium">
            Full Name
          </Label>
          <Input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="mt-1 h-12"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
          )}
        </div>

        {/* City and Country */}
        <div>
          <Label htmlFor="cityCountry" className="text-lg font-medium">
            City and country of residence
          </Label>
          <Input
            id="cityCountry"
            name="cityCountry"
            value={formData.cityCountry}
            onChange={handleChange}
            className="mt-1 h-12"
          />
        </div>

        {/* Phone */}
        <div>
          <Label htmlFor="phone" className="text-lg font-medium">
            Phone number
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 h-12"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        {/* IELTS */}
        <div>
          <Label htmlFor="ieltsScore" className="text-lg font-medium">
            IELTS/TOEFL score (if available)
          </Label>
          <Input
            id="ieltsScore"
            name="ieltsScore"
            value={formData.ieltsScore}
            onChange={handleChange}
            className="mt-1 h-12"
          />
        </div>

        {/* SAT */}
        <div>
          <Label htmlFor="satScore" className="text-lg font-medium">
            SAT score (Verbal & Math) (if available)
          </Label>
          <Input
            id="satScore"
            name="satScore"
            value={formData.satScore}
            onChange={handleChange}
            className="mt-1 h-12"
          />
        </div>

        {/* School */}
        <div>
          <Label htmlFor="schoolName" className="text-lg font-medium">
            Current school name
          </Label>
          <Input
            id="schoolName"
            name="schoolName"
            value={formData.schoolName}
            onChange={handleChange}
            className="mt-1 h-12"
          />
        </div>

        {/* Grade */}
        <div>
          <Label htmlFor="currentGrade" className="text-lg font-medium">
            Current grade
          </Label>
          <Input
            id="currentGrade"
            name="currentGrade"
            value={formData.currentGrade}
            onChange={handleChange}
            className="mt-1 h-12"
          />
          {errors.currentGrade && (
            <p className="text-red-500 text-sm mt-1">{errors.currentGrade}</p>
          )}
        </div>

        {/* GPA */}
        <div>
          <Label htmlFor="gpa" className="text-lg font-medium">
            High school GPA. (e.g. 4.8/5)
          </Label>
          <Input
            id="gpa"
            name="gpa"
            value={formData.gpa}
            onChange={handleChange}
            className="mt-1 h-12"
          />
          {errors.gpa && (
            <p className="text-red-500 text-sm mt-1">{errors.gpa}</p>
          )}
        </div>

        {/* Parent name */}
        <div>
          <Label htmlFor="parentName" className="text-lg font-medium">
            Full name of your parent/guardian
          </Label>
          <Input
            id="parentName"
            name="parentName"
            value={formData.parentName}
            onChange={handleChange}
            className="mt-1 h-12"
          />
        </div>

        {/* Parent phone */}
        <div>
          <Label htmlFor="parentPhone" className="text-lg font-medium">
            Phone number of your parent/guardian
          </Label>
          <Input
            id="parentPhone"
            name="parentPhone"
            type="tel"
            value={formData.parentPhone}
            onChange={handleChange}
            className="mt-1 h-12"
          />
        </div>

        {/* Fields of interest */}
        <div>
          <Label htmlFor="fieldsOfInterest" className="text-lg font-medium">
            Pick top 3 fields of interest
          </Label>
          <Select
            onValueChange={(value) =>
              handleSelectChange("fieldsOfInterest", value)
            }
          >
            <SelectTrigger className="mt-1 h-12">
              <SelectValue placeholder="Select fields" />
            </SelectTrigger>
            <SelectContent>
              {researchFields.map((field) => (
                <SelectItem key={field} value={field}>
                  {field}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-gray-500 mt-1">
            Note: In a real app, this might be a multi-select
          </p>
        </div>

        {/* Research Interest */}
        <div>
          <Label htmlFor="researchInterest" className="text-lg font-medium">
            Why are you interested in the chosen areas of research? (300 words).
          </Label>
          <p className="text-base italic mt-1 mb-2">Using AI is prohibited</p>
          <Textarea
            id="researchInterest"
            name="researchInterest"
            value={formData.researchInterest}
            onChange={handleChange}
            className="mt-1 min-h-[200px]"
          />
          {errors.researchInterest && (
            <p className="text-red-500 text-sm mt-1">
              {errors.researchInterest}
            </p>
          )}
        </div>

        {/* Extracurricular */}
        <div>
          <Label htmlFor="extracurricular" className="text-lg font-medium">
            Extracurricular activities (Please list up to 5).
          </Label>
          <Textarea
            id="extracurricular"
            name="extracurricular"
            value={formData.extracurricular}
            onChange={handleChange}
            className="mt-1 min-h-[200px]"
          />
        </div>

        {/* Motivation */}
        <div>
          <Label htmlFor="motivation" className="text-lg font-medium">
            What are your motivations to apply? (100-150 words)
          </Label>
          <p className="text-base italic mt-1 mb-2">Using AI is prohibited</p>
          <Textarea
            id="motivation"
            name="motivation"
            value={formData.motivation}
            onChange={handleChange}
            className="mt-1 min-h-[200px]"
          />
          {errors.motivation && (
            <p className="text-red-500 text-sm mt-1">{errors.motivation}</p>
          )}
        </div>

        {/* Financial aid */}
        <div>
          <Label htmlFor="financialAid" className="text-lg font-medium">
            Are you applying for financial aid?
          </Label>
          <Select
            onValueChange={(value) => handleSelectChange("financialAid", value)}
          >
            <SelectTrigger className="mt-1 h-12">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Additional Info */}
        <div>
          <Label htmlFor="additionalInfo" className="text-lg font-medium">
            Additional information
          </Label>
          <Textarea
            id="additionalInfo"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            className="mt-1 min-h-[100px]"
          />
        </div>

        <Button type="submit" className="w-full py-6 text-lg">
          Submit Application
        </Button>
      </form>

      {/* === Dialog when user selects "yes" for financial aid === */}
      <Dialog
        open={financialAidDialogOpen}
        onOpenChange={setFinancialAidDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Financial Aid Notice</DialogTitle>
            <DialogDescription>
              You have indicated you need financial aid. An additional interview
              and documentation from your parents will be required.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setFinancialAidDialogOpen(false)}>OK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* === Dialog for submission errors === */}
      <Dialog
        open={submissionErrorDialogOpen}
        onOpenChange={setSubmissionErrorDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submission Error</DialogTitle>
            <DialogDescription>
              {submissionErrorMessage ||
                "There was a problem submitting your application."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setSubmissionErrorDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* === Dialog for successful submission === */}
      <Dialog
        open={submissionSuccessDialogOpen}
        onOpenChange={setSubmissionSuccessDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Success</DialogTitle>
            <DialogDescription>
              Your application has been submitted successfully.
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
