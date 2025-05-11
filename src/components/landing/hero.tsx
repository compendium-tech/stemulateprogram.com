import { Link } from "react-router-dom"
import { WorldMapSimple } from "./world-map"
import { StaggerText } from "./stagger-text"
import { StarsIcon } from "lucide-react"

export const LandingHero = () => {
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
          <button
            className="text-sm sm:text-base bg-red-600
    hover:bg-red-700 text-white font-bold
    py-3 px-4 rounded-xl flex space-x-3
    transition duration-300 ease-in-out
    hover:drop-shadow-xl hover:shadow-red-500/50"
          >
            <StarsIcon className="w-5 h-5" />
            <p>Apply For Program</p>
          </button>
        </Link>
      </div>
      <div className="mt-10">
        <WorldMapSimple highlightedCountries={highlightedCountries} />
      </div>
    </section>
  )
}

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
