import { WhyResearch } from "@/components/landing/why-research"
import { WorkWithExperts } from "@/components/landing/work-with-experts"
import { ResearchAreas } from "@/components/landing/research-areas"
import { FAQ } from "@/components/landing/faq"
import { StandartLayout } from "@/layout/navbar"
import { LandingHero } from "@/components/landing/hero"

const LandingPageContent: React.FC = () => {
  return (
    <>
      <LandingHero />
      <WhyResearch />
      <WorkWithExperts />
      <ResearchAreas />
      <FAQ />
    </>
  )
}
export const LandingPage: React.FC = () => (
  <StandartLayout>
    <LandingPageContent />
  </StandartLayout>
)
