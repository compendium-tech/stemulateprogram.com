import { StandartLayout } from "@/layout/standard-layout"
import { FC } from "react"
import { Link } from "react-router-dom"

interface Publication {
  name: string
  student: string
  pdfLink?: string
  presentationLink?: string
}

const publications: Publication[] = [
  {
    name: `Explainable AI in Healthcare: Interpreting Machine Learning’s
Dementia Classification On Imbalanced Multi-Domain Clinical Data.`,
    student: "Tuan Anh Ngo",
    pdfLink: "/papers/Paper_TuanAnhNgo.pdf",
    presentationLink: "/presentations/Presentation_TuanAnhNgo.pptx",
  },
  {
    name: `How can dynamic pricing models be successfully implemented into
digital marketplaces to benefit SMEs in Kazakhstan?`,
    student: "Safiyakhon Zulfikarova",
    pdfLink: "/papers/Paper_Safiyakhon_Zulfikarova.pdf",
    presentationLink: undefined,
  },
  {
    name: `Hosting the Olympics: a comparative study of developed and
developing economies.`,
    student: "Yesseniya Zhumagatova",
    pdfLink: "/papers/Paper_Yesseniya_Zhumagatova.pdf",
    presentationLink: "/presentations/Presentation_Yesseniya_Zhumagatova.pdf",
  },
  {
    name: "Relevance and impact of neurography in Kazakhstan.",
    student: "Alsana",
    pdfLink: "/papers/Paper_Alsana.pdf",
    presentationLink: "/presentations/Presentation_Alsana.pptx",
  },
  {
    name: `Do the changes in human microbiome affect the development of autoimmune
diseases and can the study of these changes fundamentally alter treatment protocols
and approaches to autoimmune diseases?`,
    student: "Amina Smak",
    pdfLink: "/papers/Paper_Amina_Smak.pdf",
    presentationLink: "/presentations/Presentation_Amina_Smak.pdf",
  },
  {
    name: `Why does Kazakhstan have a more developed startup ecosystem
than Kyrgyzstan, although both share a similar Soviet past?`,
    student: "Amir Bushumbayev",
    pdfLink: "/papers/Paper_Amir_Bushumbayev.pdf",
    presentationLink: "/presentations/Presentation_Amir_Bushumbayev.pdf",
  },
  {
    name: `Why is Kazakhstani education system in public schools not as
successful in promoting creativity compared to specialized/private schools?`,
    student: "Aruzhan Olzhabay",
    pdfLink: "/papers/Paper_Aruzhan_Olzhabay.pdf",
    presentationLink: "/presentations/Presentation_Aruzhan_Olzhabay.pdf",
  },
  {
    name: `How do migraines affect the brain and our cognitive skills?`,
    student: "Bolat Leila",
    pdfLink: "/papers/Paper_Bolat_Leila.pdf",
    presentationLink: "/presentations/Presentation_Bolat_Leila.pdf",
  },
]

const PublicationsPageContent: FC = () => (
  <main className="min-h-screen bg-white text-black py-24 px-4 md:px-8 flex-col items-center">
    <div className="max-w-5xl mx-auto space-y-8">
      <p className="font-bold text-2xl sm:text-4xl md:text-5xl">Publications</p>
      <p className="text-xl sm:text-2xl">
        <b>Research made by our students</b>.
      </p>
      <hr />
      <ul className="space-y-8">
        {publications.map((pub, index) => (
          <li key={index} className="md:text-xl">
            <b>Paper name: </b> {pub.name} <br />
            <b>Student name: </b> {pub.student} <br />
            <b>Links: </b>
            {pub.pdfLink && (
              <a
                href={pub.pdfLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 hover:underline"
              >
                &lt;research paper&gt;
              </a>
            )}{" "}
            {pub.presentationLink && (
              <a
                href={pub.presentationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 hover:underline"
              >
                &lt;presentation&gt;
              </a>
            )}
          </li>
        ))}
      </ul>
      <hr />
      <p className="text-lg md:text-xl">
        Here every student can get published their research paper and
        presentation. If you want to get published, please contact us.
      </p>
      <p className="text-lg md:text-xl">
        Haven't applied yet?{" "}
        <Link to="/apply" className="underline">
          Apply now!
        </Link>
      </p>
    </div>
  </main>
)

export const PublicationsPage: FC = () => (
  <StandartLayout>
    <PublicationsPageContent />
  </StandartLayout>
)
