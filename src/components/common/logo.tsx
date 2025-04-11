import React from "react"
import { Link } from "react-router-dom"

export const Logo: React.FC = React.memo(() => (
  <Link to="/">
    <img className="p-2" src="logo.svg" alt="logo" />
  </Link>
))
