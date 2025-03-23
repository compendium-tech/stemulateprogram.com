import { useCallback, useEffect, useState } from "react"

const useCountdown = (initialTime: number = 60) => {
  const [countdown, setCountdown] = useState(initialTime)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isActive) {
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval)
            setIsActive(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isActive])

  const startCountdown = useCallback(() => {
    setCountdown(initialTime)
    setIsActive(true)
  }, [initialTime])

  return { countdown, startCountdown, isActive }
}

export default useCountdown
