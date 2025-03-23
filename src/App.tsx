import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"
import { LoadingBarContainer } from "react-top-loading-bar"
import { TooltipProvider } from "./components/ui/tooltip"
import NotFoundPage from "./pages/404"
import { LandingPage } from "./pages/landing-page"
import { ApplicationFormPage } from "./pages/application-page"
import { AboutUsPage } from "./pages/about-us-page"

export const App = () => {
  return (
    <>
      <LoadingBarContainer>
        <TooltipProvider delayDuration={50}>
          <Toaster />
          <Router>
            <Routes>
              <Route Component={AboutUsPage} path="/about-us" />
              <Route Component={ApplicationFormPage} path="/apply" />
              <Route Component={LandingPage} path="/" />
              <Route Component={NotFoundPage} path="*" />
            </Routes>
          </Router>
        </TooltipProvider>
      </LoadingBarContainer>
    </>
  )
}
