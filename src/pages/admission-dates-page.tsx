import { StandartLayout } from "@/layout/standard-layout"
import { FC } from "react"

const AdmissionDatesPage: FC = () => {
  return (
    <>
      <main className="min-h-screen bg-white py-8 px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-8"></div>
      </main>
    </>
  )
}

export const ApplicationFormPage: FC = () => (
  <StandartLayout>
    <AdmissionDatesPage />
  </StandartLayout>
)
