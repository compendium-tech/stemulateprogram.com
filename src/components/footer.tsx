import { InstagramLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons"
import { MailIcon } from "lucide-react"

interface FooterLink {
  href: string
  icon: JSX.Element
}

export const Footer = () => (
  <footer className="bg-neutral-900 text-white py-8">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="mb-6 md:mb-0">
          <img
            src="/logo.svg"
            alt="STEMulate Logo"
            width={150}
            height={50}
            className="h-12 w-auto"
          />
        </div>
        <div className="flex items-center space-x-6 mb-6 md:mb-0">
          {links.map(({ href, icon }) => (
            <a
              key={href}
              target="_blank"
              href={href}
              className="hover:bg-neutral-700 transition p-2 rounded-xl"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
)

const links: FooterLink[] = [
  {
    href: "https://www.instagram.com/stemulate_program/",
    icon: <InstagramLogoIcon className="w-8 h-8" />,
  },
  {
    href: "https://www.linkedin.com/company/stemulate-program/",
    icon: <LinkedInLogoIcon className="w-8 h-8" />,
  },
  {
    href: "mailto:stemulate.program@gmail.com",
    icon: <MailIcon className="w-8 h-8" />,
  },
]
