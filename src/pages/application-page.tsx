import ApplicationForm from "@/components/application/application-form"
import ProgramInfo from "@/components/application/program-info"
import { StandartLayout } from "@/layout/navbar"

const ApplicationFormPageContent = () => {
  return (
    <>
      <main className="min-h-screen bg-white py-8 px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <ProgramInfo />
          <ApplicationForm />
        </div>
      </main>
    </>
  )
}

export const ApplicationFormPage = () => {
  return <StandartLayout Component={ApplicationFormPageContent} />
}
