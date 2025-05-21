import { useEffect, useState } from "react"
import { Clock, CheckCircle } from "lucide-react"

export function Countdown() {
  // Target date: June 1st at 11:59 PM of the current year
  const targetDate = new Date(new Date().getFullYear(), 5, 19, 23, 59, 59)
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  function calculateTimeLeft() {
    const difference = targetDate.getTime() - new Date().getTime()

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      }
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex items-center justify-center p-4 mt-8">
      <div className="w-full max-w-3xl">
        {timeLeft.days == 0 && timeLeft.hours == 0 && timeLeft.minutes == 0 ? (
          <div className="flex flex-col items-center space-y-4 p-6 text-center">
            <CheckCircle className="h-9 w-9 text-red-600 mb-2" />
            <h3 className="text-xl font-bold text-red-600">
              Application Deadline Has Passed
            </h3>
            <p className="text-gray-400 text-sm">
              The deadline for submitting applications was June 19th at 11:59
              PM. Please contact the program coordinator for any inquiries.
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-xl md:text-2xl font-bold text-center mb-6 text-white">
              Time Remaining Until Deadline:
            </h3>
            <div className="grid grid-cols-4 gap-2 sm:gap-0 mb-8 text-white">
              <TimeUnit value={timeLeft.days} label="Days" />
              <TimeUnit value={timeLeft.hours} label="Hours" />
              <TimeUnit value={timeLeft.minutes} label="Minutes" />
              <TimeUnit value={timeLeft.seconds} label="Seconds" />
            </div>
            <div className="py-4 px-6">
              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0">
                  <Clock className="h-6 w-6 text-gray-200" />
                </div>
                <div className="ml-3">
                  <p className="text-left text-xs md:text-sm text-gray-200">
                    Deadline:{" "}
                    <span className="font-semibold">June 19th at 11:59 PM</span>
                    . Be sure to submit your application on time to be
                    considered for the research program.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
        {/* <CardFooter className="flex justify-center">
          {!isExpired && (
            <Link to={"/apply"}>
              <Button className="bg-red-600 hover:bg-red-700">Apply Now</Button>
            </Link>
          )}
        </CardFooter> */}
      </div>
    </div>
  )
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-neutral-900 px-4 py-3 rounded-xl border border-gray-200 flex items-center justify-center">
        <span className="text-2xl sm:text-3xl font-bold">
          {value < 10 ? `0${value}` : value}
        </span>
      </div>
      <span className="text-xs sm:text-sm font-medium mt-2">{label}</span>
    </div>
  )
}
