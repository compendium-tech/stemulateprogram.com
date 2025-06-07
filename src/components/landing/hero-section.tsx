import { Link } from "react-router-dom"
import { CityData, WorldMapSimple } from "./world-map2"
import { StaggerText } from "@/components/ui/stagger-text"
import { StarsIcon } from "lucide-react"
import { DeadlineCountdown } from "./deadline-countdown"
import { Button } from "@/components/ui/button"
import { FC } from "react"

const highlightedCities: CityData[] = [
  { name: "Almaty", coordinates: [76.9286, 43.2563] },
  { name: "Shymkent", coordinates: [69.5901, 42.3417] },
  { name: "Lima", coordinates: [-77.0428, -12.0464] },
  { name: "Uralsk", coordinates: [51.2277, 51.2277] },
  { name: "Termez", coordinates: [67.2896, 37.3019] },
  { name: "Kernersville", coordinates: [-80.0769, 36.1192] },
  { name: "Jambi", coordinates: [103.6167, -1.6] },
  { name: "Lampung", coordinates: [105.1952, -5.4288] },
  { name: "Kanpur", coordinates: [80.3319, 26.4499] },
  { name: "Karachi", coordinates: [67.0011, 24.8607] },
  { name: "Dhaka", coordinates: [90.4125, 23.8103] },
  { name: "Salzburg", coordinates: [13.0433, 47.8095] },
  { name: "Mirpur", coordinates: [74.0, 33.5] },
  { name: "Novosibirsk", coordinates: [82.9204, 55.0346] }, // Based on a pin in Siberia, Russia
  { name: "Perm", coordinates: [56.236, 58.0105] }, // Based on a pin in Ural region, Russia
  { name: "Kazan", coordinates: [49.1221, 55.7961] }, // Based on a pin in Western Russia
  { name: "Saratov", coordinates: [46.0343, 51.5336] }, // Based on a pin in Southern European Russia
  { name: "Aktobe", coordinates: [57.1672, 50.2793] },
  { name: "Krasnoyarsk", coordinates: [92.8704, 56.0097] }, // Based on a pin in Central Siberia, Russia
  { name: "Omsk", coordinates: [73.3689, 54.9924] }, // Based on a pin in Western Siberia, Russia
  { name: "Astana", coordinates: [71.4475, 51.1694] },
  { name: "Vladivostok", coordinates: [131.8854, 43.1189] }, // Based on a pin in Far East Russia
  { name: "Beijing", coordinates: [116.4074, 39.9042] }, // Based on a pin in Eastern China
  { name: "Tokyo", coordinates: [139.6917, 35.6895] }, // Based on a pin near Japan
  { name: "Jakarta", coordinates: [106.8456, -6.2088] }, // Based on a pin in Indonesia
  { name: "Manila", coordinates: [120.9842, 14.5995] }, // Based on a pin in the Philippines
  { name: "Manaus", coordinates: [-60.0217, -3.119] },
  { name: "Iquitos", coordinates: [-73.2536, -3.74] }, // A major city in the Peruvian Amazon
  { name: "Leticia", coordinates: [-69.9403, -4.2153] }, // A city in the Colombian Amazon
  { name: "Seoul", coordinates: [126.978, 37.5665] },
  { name: "Kyzylorda", coordinates: [65.5, 44.8] }, // A city in Southern Kazakhstan
  { name: "Karaganda", coordinates: [73.1, 49.8] }, // A city in Central Kazakhstan
  { name: "Tashkent", coordinates: [69.2401, 41.2995] }, // The capital of Uzbekistan
  { name: "Samarkand", coordinates: [66.9597, 39.6542] }, // A city in Uzbekistan
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
        <WorldMapSimple highlightedCities={highlightedCities} />
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
