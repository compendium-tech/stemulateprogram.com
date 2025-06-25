import { InstagramLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons"
import { FC } from "react"
import { Link } from "react-router-dom"

interface FooterLink {
  href: string
  icon: JSX.Element
}

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
    href: "https://t.me/stemulate",
    icon: (
      <>
        <svg
          className="w-8 h-8 text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 333334 333334"
          shape-rendering="geometricPrecision"
          text-rendering="geometricPrecision"
          image-rendering="optimizeQuality"
          fill-rule="evenodd"
          clip-rule="evenodd"
        >
          <path
            fill="#ffffff"
            d="M166667 0c92048 0 166667 74619 166667 166667s-74619 166667-166667 166667S0 258715 0 166667 74619 0 166667 0zm80219 91205l-29735 149919s-4158 10396-15594 5404l-68410-53854s76104-68409 79222-71320c3119-2911 2079-3534 2079-3534 207-3535-5614 0-5614 0l-100846 64043-42002-14140s-6446-2288-7069-7277c-624-4992 7277-7694 7277-7694l166970-65498s13722-6030 13722 3951zm-87637 122889l-27141 24745s-2122 1609-4443 601l5197-45965 26387 20619z"
          />
        </svg>
      </>
    ),
  },
]

const companyLinks = [
  { name: "About Us", href: "/about-us" },
  { name: "Contact Info", href: "/contact-info" },
  { name: "Privacy Policy", href: "/privacy-policy" },
]

export const Footer: FC = () => (
  <footer className="bg-neutral-900 text-white">
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between py-8 px-8">
        <div className="mb-6 md:mb-0">
          <Link to="/">
            <img className="p-2" src="logo.svg" alt="logo" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-16 gap-y-4 mb-6 md:mb-0">
          {companyLinks.map(({ name, href }) => (
            <Link
              key={name}
              to={href}
              className="hover:text-neutral-300 transition font-serif text-lg"
            >
              {name}
            </Link>
          ))}
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
      <div className="text-center py-4 text-gray-400 md:text-sm text-xs">
        &copy; 2025 STEMulate Research Program. All rights reserved.
      </div>
    </div>
  </footer>
)
