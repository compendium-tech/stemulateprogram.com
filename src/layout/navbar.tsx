import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

export const StandartNavbarLayout: React.FC<{ Component: React.FC<any> }> = ({
  Component,
}) => {
  return (
    <div>
      <Navbar />
      <Component />
      <Footer />
    </div>
  )
}
