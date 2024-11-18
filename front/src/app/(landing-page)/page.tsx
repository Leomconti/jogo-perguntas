import { PricingPage } from '@/components/pricing-page/pricingPage'
import { UseCases } from './components/UseCases/UseCases'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar/Navbar'
import { PreFooter } from './components/PreFooter'
import { Features } from './components/Features/Features'
import { Contact } from './components/Contact'
import { Grid } from './components/Grid'
import { Reviews } from './components/Reviews/Reviews'

export default function Home() {
  return (
    <div className="min-[1348]:px-0 relative min-h-screen" id="started">
      <Navbar />
      <Grid />
      <main className="min-[1348]:px-0 mx-auto flex w-full max-w-[1300px] flex-col gap-20 px-4 md:px-6 lg:gap-32">
        <Hero />
        <UseCases />
        <Contact />
        <Features />
        <Reviews />
        <PricingPage title free />
        <PreFooter />
      </main>
      <Footer />
    </div>
  )
}
