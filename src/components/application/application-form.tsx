import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs"
import { TabsList } from "@/components/ui/tabs"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Loader2,
  X,
  Plus,
  LogOutIcon,
  UserIcon,
  AlertCircle,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { AuthSection } from "./auth-section"
import { Spinner } from "./spinner"
import { supabaseClient } from "@/supabase"

const fieldsOfInterest = [
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

// Extracurricular item schema
const extracurricularItemSchema = z.object({
  position: z
    .string()
    .max(50, "Position/Leadership description must be at most 50 characters"),
  name: z.string().max(100, "Name must be at most 100 characters"),
  description: z
    .string()
    .max(150, "Description must be at most 150 characters"),
})

// Main form schema
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  fullName: z.string().min(2, { message: "Full name is required" }),
  city: z.string().min(2, { message: "City is required" }),
  country: z.string().min(2, { message: "Country is required" }),
  phone: z.string().min(10, { message: "Valid phone number is required" }),

  ieltsScore: z.string().min(1, { message: "IELTS score is required" }),
  satScore: z.string().min(1, { message: "SAT score is required" }),
  schoolName: z.string().min(2, { message: "School name is required" }),
  grade: z.string().min(1, { message: "Grade is required" }),
  gpa: z.string().min(1, { message: "GPA is required" }),

  parentFullName: z
    .string()
    .min(2, { message: "Parent's full name is required" }),
  parentPhone: z
    .string()
    .min(10, { message: "Valid parent phone number is required" }),

  fieldsOfInterest: z
    .array(z.string())
    .min(1, { message: "Select at least one field of interest" })
    .max(3, { message: "You can select up to 3 fields of interest" }),

  // 2) ADD MAX CHARACTER VALIDATION & SHOW COUNTER
  researchInterest: z
    .string()
    .min(50, { message: "Should be at least 50 characters" })
    .max(500, { message: "Should not exceed 500 characters" }),

  motivation: z
    .string()
    .min(50, {
      message: "Motivation statement should be at least 50 characters",
    })
    .max(500, { message: "Should not exceed 500 characters" }),

  additionalInfo: z.string().optional(),
  financialAid: z.boolean().default(false),

  // 3) EXTRACURRICULAR ACTIVITIES AS ARRAY OF OBJECTS
  extracurriculars: z
    .array(extracurricularItemSchema)
    .max(5, { message: "You can list up to 5 activities" })
    .optional(),
})

// -------------------------------------
// COMPONENT
// -------------------------------------
export const ApplicationForm = () => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [applicationExists, setApplicationExists] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // For extracurricular items
  const [showAddActivityModal, setShowAddActivityModal] = useState(false)
  const [newActivity, setNewActivity] = useState({
    position: "",
    name: "",
    description: "",
  })

  const tabsRef = useRef<HTMLDivElement>(null)
  const tabLabels: Record<string, string> = {
    personal: "Personal",
    academic: "Academic",
    parent: "Parent",
    research: "Research",
    extracurricular: "Activities",
    additional: "Additional",
  }

  const handleLogout = async () => {
    await supabaseClient.auth.signOut()
    setUser(null)
  }

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data }) => {
      if (data?.session?.user) {
        setUser(data.session.user)
        if (data.session.user.email) {
          checkApplicationExistence(data.session.user.email)
        }
      }
    })

    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      async (_, session) => {
        if (session?.user) {
          setUser(session.user)
          if (session.user.email) {
            checkApplicationExistence(session.user.email)
          }
        } else {
          setUser(null)
        }
      }
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const checkApplicationExistence = async (email: string) => {
    setLoading(true)
    try {
      const { data: applications, error } = await supabaseClient
        .from("applications")
        .select("id")
        .eq("email", email)

      if (error) {
        console.error("Error checking application existence:", error)
        setLoading(false)
        return
      }

      if (applications && applications.length > 0) {
        setApplicationExists(true)
      }
      setLoading(false)
    } catch (err) {
      console.error("Unexpected error checking application existence:", err)
      setLoading(false)
    }
  }

  const scrollToTab = (index: number) => {
    if (tabsRef.current) {
      const tabElements = tabsRef.current.querySelectorAll('[role="tab"]')
      if (tabElements[index]) {
        const tabElement = tabElements[index] as HTMLElement
        if (index === 0) {
          tabsRef.current.scrollLeft = 0
          return
        }
        const scrollLeft = Math.max(0, tabElement.offsetLeft - 20)
        tabsRef.current.scrollLeft = scrollLeft
      }
    }
  }

  // Auto-scroll to active tab when it changes
  useEffect(() => {
    const tabIndex = [
      "personal",
      "academic",
      "parent",
      "research",
      "extracurricular",
      "additional",
    ].indexOf(activeTab)
    if (tabIndex !== -1) {
      setTimeout(() => scrollToTab(tabIndex), 100)
    }
  }, [activeTab])

  // Ensure the first tab is visible on initial load
  useEffect(() => {
    if (tabsRef.current) {
      tabsRef.current.scrollLeft = 0
    }
  }, [])

  // 4) SETUP REACT HOOK FORM
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      fullName: "",
      city: "",
      country: "",
      phone: "",
      ieltsScore: "",
      satScore: "",
      schoolName: "",
      grade: "",
      gpa: "",
      parentFullName: "",
      parentPhone: "",
      fieldsOfInterest: [],
      researchInterest: "",
      motivation: "",
      additionalInfo: "",
      financialAid: false,
      extracurriculars: [],
    },
    mode: "onBlur", // or "onChange", depending on your preference
  })

  // 5) DETECT ERRORS FOR TABS & SHOW ICON
  const errors = form.formState.errors

  const hasErrorsInTab = (tab: string): boolean => {
    switch (tab) {
      case "personal":
        return !!(
          errors.email ||
          errors.fullName ||
          errors.city ||
          errors.country ||
          errors.phone
        )
      case "academic":
        return !!(
          errors.ieltsScore ||
          errors.satScore ||
          errors.schoolName ||
          errors.grade ||
          errors.gpa
        )
      case "parent":
        return !!(errors.parentFullName || errors.parentPhone)
      case "research":
        return !!(errors.fieldsOfInterest || errors.researchInterest)
      case "extracurricular":
        return !!errors.extracurriculars
      case "additional":
        return !!errors.motivation
      default:
        return false
    }
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    try {
      const { error: insertError } = await supabaseClient
        .from("applications")
        .insert([
          {
            ...values,
          },
        ])

      if (insertError) {
        toast({
          title: "Application Submission Failed",
          description:
            "Your research program application could not be submitted due to some technical issues.",
        })
        setIsSubmitting(false)
        return
      }

      toast({
        title: "Application Submitted",
        description:
          "Your research program application has been submitted successfully.",
      })
      setApplicationExists(true)
    } catch (error: any) {
      console.error("Error inserting form data:", error)
      toast({
        title: "Submission Error",
        description: error.message,
      })
    }
    setIsSubmitting(false)
  }

  // 6) POP-UP: ADD EXTRACURRICULAR
  const handleAddExtracurricular = () => {
    // Validate local fields quickly
    const parsed = extracurricularItemSchema.safeParse(newActivity)
    if (!parsed.success) {
      // If there's an error, you could display a local toast or handle it any way you like
      const firstError = parsed.error.issues[0]?.message || "Invalid input"
      toast({ title: "Error", description: firstError })
      return
    }

    // If valid, add it to array
    const currentActivities = form.getValues("extracurriculars") || []
    if (currentActivities.length >= 5) {
      toast({
        title: "Maximum Activities Reached",
        description: "You can only add up to 5 extracurricular activities.",
      })
      return
    }

    form.setValue("extracurriculars", [...currentActivities, newActivity])
    setNewActivity({ position: "", name: "", description: "" })
    setShowAddActivityModal(false)
  }

  const handleRemoveExtracurricular = (index: number) => {
    const currentActivities = form.getValues("extracurriculars") || []
    currentActivities.splice(index, 1)
    form.setValue("extracurriculars", currentActivities)
  }

  // 7) WORD/CHAR COUNTERS FOR TEXTAREAS
  // Using "character" counters here, but you can adapt to word-based if you prefer
  const researchInterestValue = form.watch("researchInterest") || ""
  const motivationValue = form.watch("motivation") || ""
  const researchChars = researchInterestValue.length
  const motivationChars = motivationValue.length
  const MAX_CHARS = 500 // from schema

  // Next tab function (unchanged logic, but calls trigger to validate)
  const nextTab = (tab: string) => {
    if (tab === "personal") {
      form
        .trigger(["email", "fullName", "city", "country", "phone"])
        .then((valid) => {
          if (valid) setActiveTab("academic")
        })
    } else if (tab === "academic") {
      form
        .trigger(["ieltsScore", "satScore", "schoolName", "grade", "gpa"])
        .then((valid) => {
          if (valid) setActiveTab("parent")
        })
    } else if (tab === "parent") {
      form.trigger(["parentFullName", "parentPhone"]).then((valid) => {
        if (valid) setActiveTab("research")
      })
    } else if (tab === "research") {
      form.trigger(["fieldsOfInterest", "researchInterest"]).then((valid) => {
        if (valid) setActiveTab("extracurricular")
      })
    } else if (tab === "extracurricular") {
      // extracurriculars is optional, but let's move on
      setActiveTab("additional")
    }
  }

  // -------------------------------------
  // RENDER
  // -------------------------------------
  if (!user) {
    return (
      <Card>
        <div className="flex flex-col items-center justify-center h-[60vh] space-y-3">
          <h1 className="text-3xl font-bold">STEMulate Account</h1>
          <p className="text-lg text-muted-foreground max-w-md text-center">
            Please log in to continue to the application form.
          </p>
          <AuthSection />
        </div>
      </Card>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-end mt-12 space-x-2">
        <Button>
          <UserIcon />
          <p className="text-xs">{user.email}</p>
        </Button>
        <Button variant="outline" onClick={handleLogout}>
          <LogOutIcon className="mr-2" />
          Logout
        </Button>
      </div>

      <Card>
        {loading ? (
          <Spinner />
        ) : applicationExists ? (
          <CardContent className="flex flex-col items-center justify-center h-[60vh] space-y-6">
            <h1 className="text-2xl font-semibold">Application Submitted</h1>
            <p className="text-center text-muted-foreground max-w-md">
              Thank you for submitting your application! If you have any
              questions or need to update your information, please contact us.
            </p>
          </CardContent>
        ) : (
          <CardContent className="pt-6 px-3 sm:px-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="relative mb-8">
                <TabsList
                  ref={tabsRef}
                  className="bg-white flex w-full overflow-x-auto snap-x scrollbar-none py-1 justify-start"
                  style={{ scrollBehavior: "smooth" }}
                >
                  {[
                    "personal",
                    "academic",
                    "parent",
                    "research",
                    "extracurricular",
                    "additional",
                  ].map((tab, index) => {
                    const isErrorTab = hasErrorsInTab(tab)
                    return (
                      <TabsTrigger
                        key={tab}
                        value={tab}
                        className={`min-w-[90px] text-xs sm:text-sm whitespace-nowrap px-2 sm:px-4 py-1.5 sm:py-2 snap-start ${
                          activeTab === tab ? "active-tab" : ""
                        }`}
                        onClick={() => scrollToTab(index)}
                      >
                        {tabLabels[tab]}
                        {isErrorTab && (
                          <AlertCircle className="inline-block ml-1 text-red-500 h-4 w-4" />
                        )}
                      </TabsTrigger>
                    )
                  })}
                </TabsList>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  {/* -------------------- PERSONAL TAB -------------------- */}
                  <TabsContent value="personal" className="space-y-6">
                    <div className="space-y-2">
                      <h2 className="text-2xl font-semibold">
                        Personal Information
                      </h2>
                      <p className="text-muted-foreground">
                        Please provide your contact details.
                      </p>
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            {/* Remove any "invalid" styling logic; rely on FormMessage only */}
                            <Input
                              type="email"
                              placeholder="your.email@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="New York" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                              <Input placeholder="United States" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 (555) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex flex-col sm:flex-row gap-2 justify-between">
                      <Button
                        type="button"
                        className="w-full sm:w-auto"
                        onClick={() => nextTab("personal")}
                      >
                        Next: Academic Background
                      </Button>
                    </div>
                  </TabsContent>

                  {/* -------------------- ACADEMIC TAB -------------------- */}
                  <TabsContent value="academic" className="space-y-6">
                    <div className="space-y-2">
                      <h2 className="text-2xl font-semibold">
                        Academic Background
                      </h2>
                      <p className="text-muted-foreground">
                        Please provide details about your education and test
                        scores.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <FormField
                        control={form.control}
                        name="ieltsScore"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>IELTS Score</FormLabel>
                            <FormControl>
                              <Input placeholder="7.5" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="satScore"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>SAT Score</FormLabel>
                            <FormControl>
                              <Input placeholder="1450" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="schoolName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>School Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Central High School"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <FormField
                        control={form.control}
                        name="grade"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Grade</FormLabel>
                            <FormControl>
                              <Input placeholder="12" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="gpa"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>GPA</FormLabel>
                            <FormControl>
                              <Input placeholder="3.8/4.0" {...field} />
                            </FormControl>
                            <FormDescription>
                              Please include the scale (e.g., 3.8/4.0)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={() => setActiveTab("personal")}
                      >
                        Previous: Personal Information
                      </Button>
                      <Button
                        type="button"
                        className="w-full sm:w-auto"
                        onClick={() => nextTab("academic")}
                      >
                        Next: Parent Information
                      </Button>
                    </div>
                  </TabsContent>

                  {/* -------------------- PARENT TAB -------------------- */}
                  <TabsContent value="parent" className="space-y-6">
                    <div className="space-y-2">
                      <h2 className="text-2xl font-semibold">
                        Parent Information
                      </h2>
                      <p className="text-muted-foreground">
                        Please provide your parent or guardian's contact
                        information.
                      </p>
                    </div>

                    <FormField
                      control={form.control}
                      name="parentFullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Parent/Guardian Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Jane Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="parentPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Parent/Guardian Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 (555) 987-6543" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex flex-col sm:flex-row gap-2 justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={() => setActiveTab("academic")}
                      >
                        Previous: Academic Background
                      </Button>
                      <Button
                        type="button"
                        className="w-full sm:w-auto"
                        onClick={() => nextTab("parent")}
                      >
                        Next: Research Interests
                      </Button>
                    </div>
                  </TabsContent>

                  {/* -------------------- RESEARCH TAB -------------------- */}
                  <TabsContent value="research" className="space-y-6">
                    <div className="space-y-2">
                      <h2 className="text-2xl font-semibold">
                        Research Interests
                      </h2>
                      <p className="text-muted-foreground">
                        Please select up to 3 fields of interest and describe
                        your research interests.
                      </p>
                    </div>

                    <FormField
                      control={form.control}
                      name="fieldsOfInterest"
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel className="text-base">
                              Fields of Interest (Choose up to 3)
                            </FormLabel>
                            <FormDescription>
                              Select up to three fields that you are most
                              interested in.
                            </FormDescription>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                            {fieldsOfInterest.map((field) => (
                              <FormField
                                key={field}
                                control={form.control}
                                name="fieldsOfInterest"
                                render={({ field: { onChange, value } }) => {
                                  const checked = value?.includes(field)
                                  return (
                                    <FormItem
                                      key={field}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={checked}
                                          onCheckedChange={(isChecked) => {
                                            const currentValues = [
                                              ...(value || []),
                                            ]
                                            if (
                                              isChecked &&
                                              currentValues.length < 3
                                            ) {
                                              onChange([
                                                ...currentValues,
                                                field,
                                              ])
                                            } else if (
                                              isChecked &&
                                              currentValues.length >= 3
                                            ) {
                                              toast({
                                                title:
                                                  "Maximum Selection Reached",
                                                description:
                                                  "You can only select up to 3 fields of interest.",
                                              })
                                            } else {
                                              onChange(
                                                currentValues.filter(
                                                  (val) => val !== field
                                                )
                                              )
                                            }
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        {field}
                                      </FormLabel>
                                    </FormItem>
                                  )
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="researchInterest"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Research Interest</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your research interests and any specific topics you would like to explore..."
                              className="min-h-[150px]"
                              {...field}
                            />
                          </FormControl>
                          {/* SHOW CHARACTER COUNTER */}
                          <div className="text-xs text-muted-foreground mt-1">
                            {researchChars}/{MAX_CHARS} characters
                          </div>
                          <FormDescription>
                            Explain why you are interested in these fields and
                            what specific questions or problems you hope to
                            address.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex flex-col sm:flex-row gap-2 justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={() => setActiveTab("parent")}
                      >
                        Previous: Parent Information
                      </Button>
                      <Button
                        type="button"
                        className="w-full sm:w-auto"
                        onClick={() => nextTab("research")}
                      >
                        Next: Extracurricular Activities
                      </Button>
                    </div>
                  </TabsContent>

                  {/* -------------------- EXTRACURRICULAR TAB -------------------- */}
                  <TabsContent value="extracurricular" className="space-y-6">
                    <div className="space-y-2">
                      <h2 className="text-2xl font-semibold">
                        Extracurricular Activities
                      </h2>
                      <p className="text-muted-foreground">
                        Please list up to 5 extracurricular activities you
                        participate in.
                      </p>
                    </div>

                    {/* Button to open modal */}
                    <Button
                      type="button"
                      variant="default"
                      onClick={() => setShowAddActivityModal(true)}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Activity
                    </Button>

                    {/* Show existing activities */}
                    <div className="space-y-4 mt-4">
                      <Label>Your Activities</Label>
                      {form.watch("extracurriculars")?.length === 0 ? (
                        <p className="text-sm text-muted-foreground py-2">
                          No activities added yet. Add up to 5 activities.
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {form
                            .watch("extracurriculars")
                            ?.map((activity, index) => (
                              <div
                                key={index}
                                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border rounded-md gap-2"
                              >
                                <div className="text-sm space-y-1">
                                  <p className="font-semibold">
                                    {activity.position} – {activity.name}
                                  </p>
                                  <p>{activity.description}</p>
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleRemoveExtracurricular(index)
                                  }
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={() => setActiveTab("research")}
                      >
                        Previous: Research Interests
                      </Button>
                      <Button
                        type="button"
                        className="w-full sm:w-auto"
                        onClick={() => nextTab("extracurricular")}
                      >
                        Next: Additional Information
                      </Button>
                    </div>
                  </TabsContent>

                  {/* -------------------- ADDITIONAL TAB -------------------- */}
                  <TabsContent value="additional" className="space-y-6">
                    <div className="space-y-2">
                      <h2 className="text-2xl font-semibold">
                        Additional Information
                      </h2>
                      <p className="text-muted-foreground">
                        Please provide any additional information to support
                        your application.
                      </p>
                    </div>

                    <FormField
                      control={form.control}
                      name="motivation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Motivation Statement</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Explain your motivation for applying to this research program..."
                              className="min-h-[150px]"
                              {...field}
                            />
                          </FormControl>
                          {/* SHOW CHARACTER COUNTER */}
                          <div className="text-xs text-muted-foreground mt-1">
                            {motivationChars}/{MAX_CHARS} characters
                          </div>
                          <FormDescription>
                            Describe why you want to participate in this program
                            and what you hope to achieve.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="additionalInfo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Additional Information (Optional)
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Any other information you would like to share..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Include any additional information that may be
                            relevant to your application.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="financialAid"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Financial Aid</FormLabel>
                          <FormControl>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                id="financial-aid"
                              />
                              <label
                                htmlFor="financial-aid"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                I am applying for financial aid
                              </label>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {form.watch("financialAid") && (
                      <Alert>
                        <AlertDescription>
                          You have selected that you are applying for financial
                          aid. Additional documents and an interview will be
                          required as part of the financial aid application
                          process.
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="flex flex-col sm:flex-row gap-2 justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={() => setActiveTab("extracurricular")}
                      >
                        Previous: Extracurricular Activities
                      </Button>
                      <Button
                        type="submit"
                        className="w-full sm:w-auto"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Submit Application"
                        )}
                      </Button>
                    </div>
                  </TabsContent>
                </form>
              </Form>
            </Tabs>
          </CardContent>
        )}
      </Card>

      {/* ------------------------------------------------
          EXTRACURRICULAR ADD MODAL
          ------------------------------------------------ */}
      {showAddActivityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white p-6 rounded-md w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              Add Extracurricular Activity
            </h3>
            <div className="space-y-4">
              {/* Position */}
              <div>
                <Label htmlFor="position">
                  Position/Leadership (max 50 chars)
                </Label>
                <Input
                  id="position"
                  placeholder="Captain, President, Member, etc."
                  value={newActivity.position}
                  onChange={(e) =>
                    setNewActivity((prev) => ({
                      ...prev,
                      position: e.target.value,
                    }))
                  }
                  maxLength={50}
                />
              </div>
              {/* Name */}
              <div>
                <Label htmlFor="name">Name (max 100 chars)</Label>
                <Input
                  id="name"
                  placeholder="Debate Club, Volunteer Group, etc."
                  value={newActivity.name}
                  onChange={(e) =>
                    setNewActivity((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  maxLength={100}
                />
              </div>
              {/* Description */}
              <div>
                <Label htmlFor="description">Description (max 150 chars)</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your role, accomplishments, recognition..."
                  value={newActivity.description}
                  onChange={(e) =>
                    setNewActivity((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  maxLength={150}
                  className="resize-none"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowAddActivityModal(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddExtracurricular}>Save</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
