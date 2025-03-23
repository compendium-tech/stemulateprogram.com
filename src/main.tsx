import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { App } from "./App.tsx"
import "./index.css"
import TimeAgo from "javascript-time-ago"
import ru from "javascript-time-ago/locale/ru"

TimeAgo.addDefaultLocale(ru)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
