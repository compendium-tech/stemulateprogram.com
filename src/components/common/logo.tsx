import { Link } from "react-router-dom"

export const Logo: React.FC = () => (
  <Link to="/">
    <img className="p-2" src="logo.svg" alt="logo" />
  </Link>
)
