import { Footer } from "@/components/common/footer"
import { Navbar } from "@/components/common/navbar"

export const StandartLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
