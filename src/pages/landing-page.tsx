import { FC } from "react"
import { StandartLayout } from "@/layout/navbar"
import { LandingHero } from "@/components/landing/hero"
import { WhyResearch } from "@/components/landing/why-research"
import { WorkWithExperts } from "@/components/landing/work-with-experts"
import { ResearchAreas } from "@/components/landing/research-areas"

const LandingPageContent: FC = () => {
  return (
    <>
      <LandingHero />
      <WhyResearch />
      <WorkWithExperts />
      <ResearchAreas />
    </>
  )
}
export const LandingPage = () => (
  <StandartLayout Component={LandingPageContent} />
)
