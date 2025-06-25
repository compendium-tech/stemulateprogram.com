import { FC } from "react"
import { StandartLayout } from "@/layout/standard-layout"
import { BookTextIcon, UsersRoundIcon } from "lucide-react" // Icons for visual flair

// --- MOCKING SHADCN UI COMPONENTS (Keep as is, but their internal styling will be overridden for mobile) ---
// In a real project, you would import these from '@/components/ui/table'
const TableHeader: FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => <div className={`relative w-full ${className}`}>{children}</div>
const TableBody: FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => <div className={`relative w-full ${className}`}>{children}</div>
// TableRow is modified to be a block on mobile
const TableRow: FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div
    className={`flex flex-col md:flex-row w-full border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted
                md:data-[state=selected]:bg-muted/50 md:[&>*:last-child]:pr-4 md:[&>*:first-child]:pl-4
                p-4 md:p-0 border rounded-lg shadow-sm mb-4 md:mb-0 md:border-none md:rounded-none md:shadow-none
                ${className}`}
  >
    {children}
  </div>
)
// TableHead will be hidden on mobile within the main table, and re-used as labels inside cells
const TableHead: FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div
    className={`h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0
                 [&amp;:not(:last-child)]:border-r [&amp;:not(:last-child)]:border-gray-200
                 flex-1 md:flex-auto hidden md:block ${className}`}
  >
    {children}
  </div>
)
// TableCell will be a block on mobile, and flex-auto on desktop
const TableCell: FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div
    className={`p-4 md:p-4 align-top md:align-middle [&amp;:has([role=checkbox])]:pr-0
                flex-1 md:flex-auto w-full md:w-auto
                border-b last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0
                border-gray-200 ${className}`}
  >
    {children}
  </div>
)
// --- END MOCKING ---

const ProgramsPageContent: FC = () => {
  const programs = [
    {
      name: "Research Writing Bootcamp",
      phase: "Step 1",
      icon: <BookTextIcon className="w-6 h-6 text-red-600 mr-2" />,
      description: `This intensive bootcamp provides students with the foundational knowledge and essential skills required for academic research and writing. It covers various aspects from understanding research methodologies to mastering citation styles and ensuring academic integrity.`,
      features: [
        "Interactive workshops & lectures",
        "Introduction to diverse research methodologies",
        "Training on academic writing conventions",
        "Plagiarism awareness & ethical research practices",
        "Group exercises & peer feedback",
      ],
      outcome: `Students will gain a robust theoretical and practical foundation in research principles, preparing them for independent research endeavors.`,
    },
    {
      name: "Individual Research Mentorship Program",
      phase: "Step 2",
      icon: <UsersRoundIcon className="w-6 h-6 text-red-600 mr-2" />,
      description: `Following the bootcamp, selected students are paired with experienced mentors who provide one-on-one guidance. This personalized program supports students through the entire research process, from refining their topic to data analysis and paper submission.`,
      features: [
        "Personalized research topic development",
        "Regular one-on-one feedback sessions",
        "Guidance on data collection & analysis",
        "Assistance with paper structuring & refinement",
        "Support for publication or presentation preparation",
      ],
      outcome: `Each student will complete a high-quality, original research paper under expert guidance, with potential opportunities for publication in academic journals or presentation at conferences.`,
    },
  ]

  return (
    <main className="min-h-screen bg-white text-black py-24 px-4 md:px-8 flex flex-col items-center">
      <div className="max-w-6xl mx-auto space-y-10 w-full">
        <p className="font-bold text-2xl sm:text-3xl md:text-4xl font-serif md:text-left">
          Programs at STEMulate
        </p>
        <p className="sm:text-xl text-gray-700 md:text-left">
          At STEMulate, we believe in nurturing future researchers through a
          structured yet personalized approach. Our program is designed in two
          distinct phases to ensure comprehensive development.
        </p>

        {/* Outer container for responsiveness */}
        <div className="md:border md:rounded-lg md:shadow-md md:bg-white md:overflow-hidden">
          {/* Table Header - visible only on desktop */}
          <TableHeader className="bg-gray-100 hidden md:flex md:w-full">
            <TableRow className="w-full">
              <TableHead className="p-5 w-1/4">Program</TableHead>
              <TableHead className="p-5 w-2/5">Key Features</TableHead>
              <TableHead className="p-5 w-1/4">Outcome</TableHead>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody>
            {programs.map((program, index) => (
              <TableRow
                key={index}
                // Custom mobile styling applied directly to TableRow for a card-like appearance
                className="flex flex-col md:flex-row w-full items-start md:items-stretch
                           mb-4 md:mb-0 border rounded-lg shadow-sm bg-white md:border-b md:last:border-b-0"
              >
                {/* Program Name & Phase - visible on both mobile & desktop */}
                <TableCell className="w-full md:w-1/4">
                  <span className="md:hidden text-sm font-semibold text-gray-500 block mb-1">
                    Program
                  </span>
                  <div className="flex items-center text-xl font-semibold mb-2">
                    {program.icon}
                    {program.name}
                  </div>
                  <span className="text-sm font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">
                    {program.phase}
                  </span>
                </TableCell>

                {/* Key Features - specific layout for mobile vs. desktop */}
                <TableCell className="w-full md:w-2/5">
                  <span className="md:hidden text-sm font-semibold text-gray-500 block mb-1">
                    Key Features
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {program.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </TableCell>

                {/* Outcome - specific layout for mobile vs. desktop */}
                <TableCell className="w-full md:w-1/4">
                  <span className="md:hidden text-sm font-semibold text-gray-500 block mb-1">
                    Outcome
                  </span>
                  <span className="text-gray-700">{program.outcome}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </div>

        <div className="mt-12">
          <p className="md:text-xl text-gray-700">
            Interested in joining STEMulate? Learn more about the application
            process:{" "}
            <a
              href="/apply"
              className="underline text-red-600 hover:text-red-800 transition-colors duration-200"
            >
              Apply now!
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}

export const ProgramsPage: FC = () => (
  <StandartLayout>
    <ProgramsPageContent />
  </StandartLayout>
)
