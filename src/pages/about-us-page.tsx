import { StandartNavbarLayout } from "@/layout/navbar"
const AboutUsPageContent = () => (
  <main className="min-h-screen bg-neutral-900 text-white py-8 px-4 md:px-8 flex items-center justify-center">
    <div className="max-w-4xl mx-auto space-y-8">
      <p className="font-bold text-5xl">About Us</p>
      <p className="text-xl">
        STEMulate was created to address a critical gap in research education.
        Our mission is to train over 5000 students in research skills and
        project development in the fields of STEM, economics, and social
        sciences. By providing structured learning opportunities and hands-on
        guidance, we aim to bridge the gap between classroom education and
        real-world research, inspiring students to pursue academic excellence
        and contribute to the scientific community.
      </p>
    </div>
  </main>
)

export const AboutUsPage = () => (
  <StandartNavbarLayout Component={AboutUsPageContent} />
)
