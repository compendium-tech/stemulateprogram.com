import { FC } from "react"
import { StandartLayout } from "@/layout/standard-layout"

const ContactInfoPageContent: FC = () => {
  return (
    <main className="min-h-screen bg-white text-black py-24 px-4 md:px-8 flex flex-col items-center">
      <div className="max-w-5xl mx-auto space-y-8 w-full">
        <p className="font-bold text-3xl sm:text-4xl md:text-5xl font-serif">
          Contact Information
        </p>
        <p className="text-base md:text-xl">
          We're here to help! Please feel free to reach out to us with any
          inquiries.
        </p>
        <p className="text-base md:text-xl">
          Email:{" "}
          <a
            href="mailto:admissions@stemulateprogram.com"
            className="hover:underline text-red-600 hover:text-red-800"
          >
            admissions@stemulateprogram.com
          </a>
          <br />
          Phone number:{" "}
          <a
            href="tel:+77753036077"
            className="hover:underline text-red-600 hover:text-red-800"
          >
            +7 (775) 303-6077
          </a>
        </p>
        <p className="text-base md:text-xl">
          We aim to respond to all inquiries within 24-48 business hours. <br />
        </p>
      </div>
    </main>
  )
}

export const ContactInfoPage: FC = () => (
  <StandartLayout>
    <ContactInfoPageContent />
  </StandartLayout>
)
