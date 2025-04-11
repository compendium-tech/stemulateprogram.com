import { useState } from "react"
import { Logo } from "./logo"
import { Link } from "react-router-dom"

interface NavItem {
  label: string
  href: string
}

const navItems: NavItem[] = [
  { label: "About Us", href: "/about-us" },
  { label: "Publications", href: "/publications" },
  { label: "Info Session", href: "/info-session" },
]

export const Navbar: React.FC = () => {
  const [isMobileNavMenuOpen, setIsMobileNavMenuOpen] = useState<boolean>(false)

  return (
    <header className="relative w-full bg-neutral-900 backdrop-blur-md text-white py-4 px-8 flex justify-between items-center z-50">
      <div className="text-xl font-bold">
        <Logo />
      </div>

      {/* Desktop Navigation */}
      <nav className="text-xl underline-offset-4 hidden md:flex space-x-6">
        {navItems.map((item, i) => (
          <Link key={i} to={item.href} className="hover:text-red-500">
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden relative">
        <button
          onClick={() => setIsMobileNavMenuOpen((prev) => !prev)}
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMobileNavMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Mobile Menu List */}
        <div
          className={`absolute text-xl rounded-xl right-0 top-12 bg-neutral-900/90 backdrop-blur-md w-48 text-white flex flex-col space-y-3 p-4 rounded-lg border z-50 transform transition-all duration-300 ease-in-out origin-top-right ${
            isMobileNavMenuOpen
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          {[
            {
              label: "Home",
              href: "/",
            },
          ]
            .concat(navItems)
            .map((item, i) => (
              <Link
                key={i}
                to={item.href}
                className="block hover:text-red-500"
                onClick={() => setIsMobileNavMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
        </div>
      </div>
    </header>
  )
}
