import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const FAQ = () => {
  return (
    <>
      <section className="px-5 md:px-14 bg-neutral-900 text-white">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>
                <p className="text-lg md:text-2xl">{faq.question}</p>
              </AccordionTrigger>
              <AccordionContent>
                <p className="md:text-xl">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </>
  )
}

export const faqs = [
  {
    question: "Who can apply?",
    answer: `The program is open to high school and undergraduate students
             interested in STEM, economics, and social sciences.`,
  },
  {
    question: "What’s the program duration?",
    answer: `The program lasts for 2 months, with additional support available for publication and presentation.`,
  },
  {
    question: "How much does it cost?",
    answer: `The program fee is $1500. Financial aid is available for the most competitive applicants.`,
  },
  {
    question: "How do I apply?",
    answer: `Submit your application through our online portal and complete an interview.`,
  },
  {
    question: "What is the workload like for students?",
    answer: `The program is designed to be rigorous but manageable, with weekly mentor
             check-ins and independent research assignments. Students typically dedicate
             8-10 hours per week to research and related activities. Flexible scheduling
             ensures participants can balance STEMulate with other commitments.`,
  },
]
