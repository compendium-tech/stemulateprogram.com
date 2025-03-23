import { StaggerText } from "./animated-text"
import { ResearchAreasMarquee } from "./research-areas-marquee"

export const ResearchAreas = () => {
  return (
    <section className="px-5 md:px-14 bg-neutral-900 text-white py-20">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 text-center">
        <StaggerText text="Research Areas" />
      </h2>
      <ResearchAreasMarquee areas={researchAreas} />
    </section>
  )
}

const researchAreas = [
  "Astronomy",
  "Biology",
  "Business",
  "Chemistry",
  "Computer Science",
  "Ecology",
  "Gender Studies",
  "History",
  "Mathematics",
  "Media Studies",
  "Neuroscience",
  "Physics",
  "Political Science",
  "Psychology",
  "Sociology",
  "Economics",
  "Education",
  "Engineering",
]
