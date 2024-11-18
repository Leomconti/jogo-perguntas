import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar/Navbar'
import { Features } from './components/Features/Features'
import { Grid } from './components/Grid'
import { Contact } from './components/Contact'
import { HowItWorks } from './components/HowItWorks'

export default function Home() {
  return (
    <div className="relative min-h-screen" id="started">
      <Navbar />
      <Grid />
      <main className="mx-auto flex w-full max-w-[1300px] flex-col gap-20 px-4 md:px-6 lg:gap-32">
        <Hero />
        <HowItWorks />
        <Features />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
