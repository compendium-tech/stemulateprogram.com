import { Link } from "react-router-dom"
import { WorldMapSimple } from "./world-map"
import { StaggerText } from "@/components/ui/stagger-text"
import { StarsIcon } from "lucide-react"
import { DeadlineCountdown } from "./deadline-countdown"
import { Button } from "@/components/ui/button"
import { FC } from "react"

const highlightedCountries = [
  "United States",
  "China",
  "France",
  "United Kingdom",
  "Kazakhstan",
  "Austria",
  "Armenia",
  "Azerbaijan",
  "Brazil",
  "Uzbekistan",
  "Kyrgyzstan",
  "Nepal",
  "Italy",
  "Belarus",
  "Russia",
  "Philippines",
  "Vietnam",
  "Thailand",
  "India",
  "Indonesia",
  "Ukraine",
  "Peru",
]

export const HeroSection: FC = () => {
  return (
    <section className="text-white bg-neutral-900 text-center pt-12 px-5 md:px-14">
      <p className="font-semibold text-4xl md:text-5xl mb-4">
        <StaggerText text="Develop your research" />
      </p>
      <p className="sm:text-xl md:text-2xl mb-6">
        Join students from over 20 countries in a world-class research program.
      </p>

      <div className="flex justify-center">
        <Link to="apply">
          <Button
            className="text-sm sm:text-base bg-red-600
    hover:bg-red-700 text-white
    py-6 px-5 rounded-xl items-center flex space-x-1
    transition duration-300 ease-in-out"
          >
            <StarsIcon className="w-5 h-5" />
            <p>Apply For Program</p>
          </Button>
        </Link>
      </div>
      <div className="mt-10 mb-8">
        <WorldMapSimple highlightedCountries={highlightedCountries} />
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center md:gap-4 gap-0">
        <DeadlineCountdown
          aboutDeadline="Priority Application Deadline"
          targetDate={new Date(2025, 5, 16, 23, 59, 59)}
          deadlineDescription="Applications submitted by this date will be given priority review."
          deadlinePassedHeader="Priority Application Deadline Passed"
          deadlinePassedBrief="The priority deadline for submitting applications was June 16th at 11:59
          PM. Please contact the program coordinator for any inquiries."
        />
        <DeadlineCountdown
          aboutDeadline="Final Application Deadline"
          targetDate={new Date(2025, 5, 23, 23, 59, 59)}
          deadlineDescription="Applications submitted by this date will be considered for review."
          deadlinePassedHeader="Final Application Deadline Passed"
          deadlinePassedBrief="The final deadline for submitting applications was June 23th at 11:59
          PM. Please contact the program coordinator for any inquiries."
        />
      </div>
    </section>
  )
}
