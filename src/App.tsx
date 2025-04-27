import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "./components/ui/tooltip"
import { NotFoundPage } from "./pages/404"
import { LandingPage } from "./pages/landing-page"
import { ApplicationFormPage } from "./pages/application-page"
import { AboutUsPage } from "./pages/about-us-page"
import { PublicationsPage } from "./pages/publications-page"

export const App = () => {
  return (
    <>
      <TooltipProvider delayDuration={50}>
        <Toaster />
        <Router>
          <Routes>
            <Route Component={AboutUsPage} path="/about-us" />
            <Route Component={ApplicationFormPage} path="/apply" />
            <Route Component={PublicationsPage} path="/publications" />
            <Route Component={LandingPage} path="/" />
            <Route Component={NotFoundPage} path="*" />
          </Routes>
        </Router>
      </TooltipProvider>
    </>
  )
}
