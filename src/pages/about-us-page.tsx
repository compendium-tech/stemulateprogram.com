import { StandartLayout } from "@/layout/navbar"
import { useEffect, useRef, useState } from "react"
import GLOBE from "vanta/dist/vanta.globe.min"

const AboutUsPageContent: React.FC = () => {
  const [vantaEffect, setVantaEffect] = useState(null)
  const myRef = useRef(null)
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        GLOBE({
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
      )
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])

  return (
    <div ref={myRef}>
      <main className="min-h-screen text-white py-8 px-4 md:px-8 flex items-center justify-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <p className="font-bold text-5xl">About Us</p>
          <p className="text-xl">
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

export const AboutUsPage: React.FC = () => (
  <StandartLayout>
    <AboutUsPageContent />
  </StandartLayout>
)
