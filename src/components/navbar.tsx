import { FC, useState } from "react"
import { Link } from "react-router-dom"

interface NavItem {
  label: string
  href: string
}

export const Navbar: FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const navItems: NavItem[] = [
    { label: "About Us", href: "/about-us" },
    { label: "Publications", href: "/publications" },
    { label: "Info Session", href: "/info-session" },
    { label: "FAQS", href: "/faqs" },
  ]

  return (
    <header className="relative w-full bg-neutral-900 backdrop-blur-md text-white py-4 px-8 flex justify-between items-center z-50">
      <div className="text-xl font-bold">
        <Link to="/">
          <img src="logo.svg" alt="Logo" />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="text-xl underline-offset-4 hidden md:flex space-x-6">
        {navItems.map((item, i) => (
          <a key={i} href={item.href} className="hover:text-red-500">
            {item.label}
          </a>
        ))}
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden relative">
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
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
        {menuOpen && (
          <ul className="absolute text-xl right-0 top-12 bg-neutral-900 w-48 text-white flex flex-col space-y-3 p-4 rounded-lg border z-50">
            {navItems.map((item, i) => (
              <li key={i}>
                <a
                  href={item.href}
                  className="block hover:text-red-500"
                  onClick={() => setMenuOpen(false)} // auto-close on click
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  )
}
