import { CheckCircleIcon } from "lucide-react"
import { StaggerText } from "@/components/ui/stagger-text"
import "./why-research-section.css"
import { FC } from "react"

interface ReasonWhyResearch {
  title: string
  description: string
}

const reasonsWhyResearch: ReasonWhyResearch[] = [
  {
    title: "Make an impact on the world",
    description: `Every day, we read about research that changes our lives - from
         studies on vaccines to new computational algorithms. Each of
         these breakthroughs comes from researchers working to advance
         their field.`,
  },
  {
    title: "Develop crucial skills",
    description: `The goal of research is to extend human knowledge in an area.
                     When you do research, you learn about the advances that came
                     before you and contribute to our current knowledge.`,
  },
  {
    title: "Get a head start on your career",
    description: `Creating a research project is an effective way for you to
                     showcase your strengths and demonstrate your abilities. Doing
                     research can help at each stage of life - whether applying to
                     college, grad school, or your next job.`,
  },
]

export const WhyResearchSection: FC = () => (
  <section
    className="relative text-white section-with-fixed-bg bg-cover bg-center bg-no-repeat
                 py-24 px-5 sm:px-14"
  >
    {/* To make background look darker */}
    <div className="absolute inset-0 bg-black bg-opacity-60"></div>

    {/* Content Wrapper */}
    <div className="relative z-10 container mx-auto">
      <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold mb-8">
        <StaggerText className="font-serif" text="Why do research?" />
      </h2>

      {/* Change items-center to items-start here */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 justify-center items-start">
        {reasonsWhyResearch.map((item, index) => (
          <div
            className="flex flex-col lg:items-start"
            key={`research-reason-${index}`}
          >
            <div>
              <CheckCircleIcon className="h-8 w-8 mb-4 text-red-500" />
              <h3 className="font-serif text-lg sm:text-2xl font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-sm md:text-lg">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)
