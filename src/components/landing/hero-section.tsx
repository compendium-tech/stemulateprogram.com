import { Link } from "react-router-dom"
import { CityData, WorldMapSimple } from "./world-map2"
import { StaggerText } from "@/components/ui/stagger-text"
import { StarsIcon } from "lucide-react"
import { DeadlineCountdown } from "./deadline-countdown"
import { Button } from "@/components/ui/button"
import { FC } from "react"

const highlightedCities: CityData[] = [
  { name: "Almaty, Kazakhstan", coordinates: [76.9286, 43.2563] },
  { name: "Shymkent, Kazakhstan", coordinates: [69.5901, 42.3417] },
  { name: "Lima, Peru", coordinates: [-77.0428, -12.0464] },
  { name: "Uralsk, Kazakhstan", coordinates: [51.2277, 51.2277] },
  { name: "Termez, Uzbekistan", coordinates: [67.2896, 37.3019] },
  { name: "Kernersville, USA", coordinates: [-80.0769, 36.1192] },
  { name: "Jambi, Indonesia", coordinates: [103.6167, -1.6] },
  { name: "Lampung, Indonesia", coordinates: [105.1952, -5.4288] },
  { name: "Kanpur, India", coordinates: [80.3319, 26.4499] },
  { name: "Karachi, Pakistan", coordinates: [67.0011, 24.8607] },
  { name: "Dhaka, Bangladesh", coordinates: [90.4125, 23.8103] },
  { name: "Salzburg, Austria", coordinates: [13.0433, 47.8095] },
  { name: "Mirpur, Pakistan", coordinates: [74.0, 33.5] },
  { name: "Novosibirsk, Russia", coordinates: [82.9204, 55.0346] }, // Based on a pin in Siberia, Russia
  { name: "Perm, Russia", coordinates: [56.236, 58.0105] }, // Based on a pin in Ural region, Russia
  { name: "Kazan, Russia", coordinates: [49.1221, 55.7961] }, // Based on a pin in Western Russia
  { name: "Saratov, Russia", coordinates: [46.0343, 51.5336] }, // Based on a pin in Southern European Russia
  { name: "Aktobe, Kazakhstan", coordinates: [57.1672, 50.2793] },
  { name: "Krasnoyarsk, Russia", coordinates: [92.8704, 56.0097] }, // Based on a pin in Central Siberia, Russia
  { name: "Omsk, Russia", coordinates: [73.3689, 54.9924] }, // Based on a pin in Western Siberia, Russia
  { name: "Astana, Kazakhstan", coordinates: [71.4475, 51.1694] },
  { name: "Vladivostok, Russia", coordinates: [131.8854, 43.1189] }, // Based on a pin in Far East Russia
  { name: "Beijing, China", coordinates: [116.4074, 39.9042] }, // Based on a pin in Eastern China
  { name: "Tokyo, Japan", coordinates: [139.6917, 35.6895] }, // Based on a pin near Japan
  { name: "Jakarta, Indonesia", coordinates: [106.8456, -6.2088] }, // Based on a pin in Indonesia
  { name: "Manila, Philippines", coordinates: [120.9842, 14.5995] }, // Based on a pin in the Philippines
  { name: "Manaus, Brazil", coordinates: [-60.0217, -3.119] },
  { name: "Iquitos, Peru", coordinates: [-73.2536, -3.74] }, // A major city in the Peruvian Amazon
  { name: "Leticia, Colombia", coordinates: [-69.9403, -4.2153] }, // A city in the Colombian Amazon
  { name: "Seoul, South Korea", coordinates: [126.978, 37.5665] },
  { name: "Kyzylorda, Kazakhstan", coordinates: [65.5, 44.8] }, // A city in Southern Kazakhstan
  { name: "Karaganda, Kazakhstan", coordinates: [73.1, 49.8] }, // A city in Central Kazakhstan
  { name: "Tashkent, Uzbekistan", coordinates: [69.2401, 41.2995] }, // The capital of Uzbekistan
  { name: "Samarkand, Uzbekistan", coordinates: [66.9597, 39.6542] }, // A city in Uzbekistan
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
