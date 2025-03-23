import { InstagramLogoIcon } from "@radix-ui/react-icons"
import { CircleUser, Facebook } from "lucide-react"

export const Footer = () => (
  <footer className="bg-neutral-900 text-white py-8">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="mb-6 md:mb-0">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-pVFvSEIVKfofXHbLgntRWi2TkXXKFk.svg"
            alt="STEMulate Logo"
            width={150}
            height={50}
            className="h-12 w-auto"
          />
        </div>
        <div className="flex items-center space-x-6 mb-6 md:mb-0">
          <a
            target="_blank"
            href="https://www.instagram.com/stemulate_program/"
            className="hover:text-red-500 transition-colors"
          >
            <InstagramLogoIcon className="h-6 w-6" />
            <span className="sr-only">Instagram</span>
          </a>
          <a href="#" className="hover:text-red-500 transition-colors">
            <CircleUser className="h-6 w-6" />
            <span className="sr-only">Tumblr</span>
          </a>
          <a href="#" className="hover:text-red-500 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 8v8"></path>
              <path d="M8 12h8"></path>
            </svg>
            <span className="sr-only">Pinterest</span>
          </a>
          <a href="#" className="hover:text-red-500 transition-colors">
            <Facebook className="h-6 w-6" />
            <span className="sr-only">Facebook</span>
          </a>
        </div>
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
          <a
            href="mailto:stemulate.program@gmail.com"
            target="_blank"
            className="hover:text-red-500 transition-colors"
          >
            stemulate.program@gmail.com
          </a>
        </div>
      </div>
    </div>
  </footer>
)
