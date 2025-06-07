import { WhyResearchSection } from "@/components/landing/why-research-section"
import { WorkWithExpertsSection } from "@/components/landing/work-with-experts-section"
import { ResearchAreasSection } from "@/components/landing/research-areas-section"
import { FAQSection } from "@/components/landing/faq-section"
import { StandartLayout } from "@/layout/standard-layout"
import { HeroSection } from "@/components/landing/hero-section"
import { FC } from "react"

const LandingPageContent: FC = () => {
  return (
    <>
      <HeroSection />
      <WhyResearchSection />
      <WorkWithExpertsSection />
      <ResearchAreasSection />
      <FAQSection />
    </>
  )
}
export const LandingPage: FC = () => (
  <StandartLayout>
    <LandingPageContent />
  </StandartLayout>
)
