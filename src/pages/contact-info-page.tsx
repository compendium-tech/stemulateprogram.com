import { FC } from "react"
import { StandartLayout } from "@/layout/standard-layout"

const ContactInfoPageContent: FC = () => {
  return (
    <main className="min-h-screen bg-white text-black py-24 px-4 md:px-8 flex flex-col items-center">
      <div className="max-w-5xl mx-auto space-y-8 w-full">
        <p className="font-bold text-3xl sm:text-4xl md:text-5xl font-serif">
          Contact Information
        </p>
        <p className="text-lg md:text-xl">
          <b>
            We're here to help! Please feel free to reach out to us with any
            inquiries.
          </b>
        </p>
        <p className="text-lg md:text-xl">
          Email address:{" "}
          <a
            href="mailto:admissions@stemulateprogram.com"
            className="hover:underline text-red-600 hover:text-red-800"
          >
            admissions@stemulateprogram.com
          </a>
          ,{" "}
          <a
            href="mailto:stemulate.program@gmail.com"
            className="hover:underline text-red-600 hover:text-red-800"
          >
            stemulate.program@gmail.com
          </a>
          . <br />
          Phone number:{" "}
          <a
            href="tel:+77753036077"
            className="hover:underline text-red-600 hover:text-red-800"
          >
            +7 (775) 303-6077
          </a>
          .
        </p>
        <p className="text-lg md:text-xl">
          We aim to respond to all inquiries within 24-48 business hours. <br />
          Our operating hours are: Monday - Friday, 9:00 AM - 5:00 PM (Eastern
          Time).
        </p>
        <img src="logo2.svg" className="w-48" />
      </div>
    </main>
  )
}

export const ContactInfoPage: FC = () => (
  <StandartLayout>
    <ContactInfoPageContent />
  </StandartLayout>
)
