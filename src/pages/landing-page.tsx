import { FC } from "react"
import { CheckCircleIcon } from "lucide-react"
import { AnimatedTextWordByWord } from "@/components/landing/animated-text"
import { WorldMapSimple } from "@/components/landing/world-map"
import { ResearchAreasMarquee } from "@/components/landing/research-areas-marquee"
import { Link } from "react-router-dom"
import { StandartNavbarLayout } from "@/layout/navbar"

const LandingPageContent: FC = () => {
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

  const highlightedCountries = [
    "United States",
    "China",
    "France",
    "United Kingdom",
    "Kazakhstan",
    "Armenia",
    "Azerbaijan",
    "Brazil",
    "Uzbekistan",
    "Kyrgyzstan",
    "Nepal",
    "Belarus",
    "Russia",
    "Philippines",
    "Vietnam",
    "Thailand",
  ]

  return (
    <>
      <section className="relative pt-12 px-5 md:px-14 bg-neutral-900 text-white">
        <div className="flex justify-center align-center">
          <h2 className="text-4xl md:text-5xl font-semibold mb-4">
            <AnimatedTextWordByWord
              text="Develop your research"
              className="text-center"
            />
          </h2>
        </div>
        <p className="text-xl md:text-2xl text-center mb-6">
          Join students from over 20 countries in a world-class research
          program.
        </p>

        <div className="flex justify-center">
          <Link to="apply">
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded">
              Apply For Program
            </button>
          </Link>
        </div>
        <div className="mt-10">
          <WorldMapSimple highlightedCountries={highlightedCountries} />
        </div>
      </section>
      <section className="relative bg-fixed bg-cover bg-center bg-no-repeat text-white py-12 px-5 lg:px-14 bg-[url(/0x0.webp)]">
        {/* To make background look darker */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        {/* Content Wrapper */}
        <div className="relative z-10 container mx-auto">
          <div className="flex justify-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              <AnimatedTextWordByWord text="Why do research?" />
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center items-center">
            <div className="flex flex-col md:items-start">
              <div>
                <CheckCircleIcon className="h-10 w-10 mb-4 text-red-500" />
                <h3 className="text-2xl font-semibold mb-2">
                  Make an impact on the world
                </h3>
                <p className="text-lg">
                  Every day, we read about research that changes our lives—from
                  studies on vaccines to new computational algorithms. Each of
                  these breakthroughs comes from researchers working to advance
                  their field.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:items-start">
              <div>
                <CheckCircleIcon className="h-10 w-10 mb-4 text-red-500" />
                <h3 className="text-2xl font-semibold mb-2">
                  Gain expertise in a topic
                </h3>
                <p className="text-lg">
                  The goal of research is to extend human knowledge in an area.
                  When you do research, you learn about the advances that came
                  before you and contribute to our current knowledge.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:items-start">
              <div>
                <CheckCircleIcon className="h-10 w-10 mb-4 text-red-500" />
                <h3 className="text-2xl font-semibold mb-2">
                  Stand out for admissions
                </h3>
                <p className="text-lg">
                  Creating a research project is an effective way for you to
                  showcase your strengths and demonstrate your abilities. Doing
                  research can help at each stage of life—whether applying to
                  college, grad school, or your next job.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-5 md:px-14 bg-white py-20">
        <h2 className="text-3xl md:text-5xl font-semibold mb-4 text-center">
          <AnimatedTextWordByWord text="Work With International Experts" />
        </h2>
        <p className="text-lg md:text-xl mb-6">
          Our mentors are PhD holders and current graduate students from
          prestigious universities. Each mentor is carefully selected to ensure
          they can provide high-quality guidance and mentorship. Our mentors
          work closely with students, helping them navigate the complexities of
          academic research, data analysis, and scientific writing.
        </p>
        <img
          src="universities.png"
          alt="Universities"
          className="w-full max-w-4xl mx-auto mt-6"
        />
      </section>
      <section className="relative px-5 md:px-14 bg-neutral-900 text-white py-20">
        <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-center">
          <AnimatedTextWordByWord text="Research Areas" />
        </h2>
        <ResearchAreasMarquee areas={researchAreas} />
      </section>
      {/* <section className="relative px-5 md:px-14 bg-neutral-900 text-white py-20">
        <h2 className="text-3xl md:text-5xl font-semibold mb-10 text-center">
          <AnimatedTextWordByWord text="Recent Research Studies" />
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="bg-white text-black rounded-xl p-6 w-full sm:w-[280px] md:w-[250px] shadow">
            <img
              src="economics.jpg"
              alt="Economics"
              className="w-full h-auto mb-4 rounded"
            />
            <h3 className="text-xl font-bold text-red-500 mb-2">Economics</h3>
            <p>The Impact of Inflation on Income Inequality</p>
          </div>

          <div className="bg-white text-black rounded-xl p-6 w-full sm:w-[280px] md:w-[250px] shadow">
            <img
              src="political_science.jpg"
              alt="Political Science"
              className="w-full h-auto mb-4 rounded"
            />
            <h3 className="text-xl font-bold text-red-500 mb-2">
              Political Science
            </h3>
            <p>How Social Media Manipulates Political Opinion</p>
          </div>

          <div className="bg-white text-black rounded-xl p-6 w-full sm:w-[280px] md:w-[250px] shadow">
            <img
              src="mathematics.jpg"
              alt="Mathematics"
              className="w-full h-auto mb-4 rounded"
            />
            <h3 className="text-xl font-bold text-red-500 mb-2">Mathematics</h3>
            <p>Exploring the Limits of Infinity: Set Theory and Beyond</p>
          </div>

          <div className="bg-white text-black rounded-xl p-6 w-full sm:w-[280px] md:w-[250px] shadow">
            <img
              src="ecology.jpg"
              alt="Ecology"
              className="w-full h-auto mb-4 rounded"
            />
            <h3 className="text-xl font-bold text-red-500 mb-2">Ecology</h3>
            <p>The Future of Sustainable Urban Farming</p>
          </div>
        </div>
      </section> */}
    </>
  )
}
export const LandingPage = () => (
  <StandartNavbarLayout Component={LandingPageContent} />
)
