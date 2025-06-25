import { FC } from "react"
import { StandartLayout } from "@/layout/standard-layout"
import { BookTextIcon, UsersRoundIcon } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const ProgramsPageContent: FC = () => {
  const programs = [
    {
      name: "Research Writing Bootcamp",
      phase: "Step 1",
      icon: <BookTextIcon className="w-6 h-6 text-red-600 mr-4" />,
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
      icon: <UsersRoundIcon className="w-8 h-8 text-red-600 mr-4" />,
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
        <p className="text-lg sm:text-xl text-gray-700 md:text-left">
          At STEMulate, we believe in nurturing future researchers through a
          structured yet personalized approach. Our program is designed in two
          distinct phases to ensure comprehensive development.
        </p>

        {/* Outer container for Shadcn Table */}
        {/* Shadcn Table often handles its own border/shadow */}
        <div className="rounded-lg border shadow-sm">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="hidden md:table-row text-lg">
                {" "}
                <TableHead className="w-[220px] p-3">Program</TableHead>{" "}
                <TableHead className="w-[400px] p-3">Key Features</TableHead>{" "}
                <TableHead className="w-[300px] p-3">Outcome</TableHead>{" "}
              </TableRow>
            </TableHeader>
            <TableBody>
              {programs.map((program, index) => (
                <TableRow
                  key={index}
                  className="flex flex-col md:table-row md:border-b transition-colors hover:bg-gray-50
                             p-4 md:p-0 mb-4 md:mb-0 rounded-lg shadow-sm bg-white md:rounded-none md:shadow-none"
                >
                  {/* Program Name & Phase */}
                  <TableCell className="md:w-[220px]">
                    {" "}
                    {/* Apply width for desktop */}
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

                  {/* Key Features */}
                  <TableCell className="md:w-[400px]">
                    {" "}
                    {/* Apply width for desktop */}
                    <span className="md:hidden text-sm font-semibold text-gray-500 block mb-1">
                      Key Features
                    </span>
                    <ul className="list-disc list-inside space-y-1 text-base text-gray-700">
                      {program.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </TableCell>

                  {/* Outcome */}
                  <TableCell className="md:w-[300px]">
                    {" "}
                    {/* Apply width for desktop */}
                    <span className="md:hidden text-sm font-semibold text-gray-500 block mb-1">
                      Outcome
                    </span>
                    <span className="text-gray-700 text-base">
                      {program.outcome}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-12">
          <p className="text-lg md:text-xl text-gray-700">
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
