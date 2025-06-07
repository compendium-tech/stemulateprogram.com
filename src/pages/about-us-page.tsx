import { StandartLayout } from "@/layout/standard-layout"
import { FC, useEffect, useRef, useState } from "react"

const useVantaEffect = () => {
  const [vantaEffect, setVantaEffect] = useState<any>(null)
  const myRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!vantaEffect) {
      import("vanta/dist/vanta.globe.min.js")
        .then((vantaModule) => {
          if (!myRef.current) return

          const GLOBE = vantaModule.default
          const effect = GLOBE({
            el: myRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0xff3f3f,
            backgroundColor: "#171717",
          })
          setVantaEffect(effect)
        })
        .catch((err) => {
          console.error("Error loading Vanta Globe:", err)
        })
    }
    return () => {
      if (vantaEffect) {
        vantaEffect.destroy()
      }
    }
  }, [vantaEffect])

  return { myRef, vantaEffect }
}

const AboutUsPageContent: FC = () => {
  const { myRef } = useVantaEffect()

  return (
    <div ref={myRef}>
      <main className="min-h-screen text-white py-8 px-4 md:px-8 flex items-center justify-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <p className="font-bold text-3xl md:text-5xl">About Us</p>
          <p className="text-lg md:text-xl">
            STEMulate was created to address a critical gap in research
            education. Our mission is to train over 5000 students in research
            skills and project development in the fields of STEM, economics, and
            social sciences. By providing structured learning opportunities and
            hands-on guidance, we aim to bridge the gap between classroom
            education and real-world research, inspiring students to pursue
            academic excellence and contribute to the scientific community.
          </p>
        </div>
      </main>
    </div>
  )
}

export const AboutUsPage: FC = () => (
  <StandartLayout>
    <AboutUsPageContent />
  </StandartLayout>
)
