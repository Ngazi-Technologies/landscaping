import { useEffect } from 'react'
import { initSmoothScroll, ScrollTrigger } from './lib/motion'
import { Nav } from './sections/Nav'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Services } from './sections/Services'
import { Process } from './sections/Process'
import { Portfolio } from './sections/Portfolio'
import { WhyUs } from './sections/WhyUs'
import { Testimonials } from './sections/Testimonials'
import { FinalCta } from './sections/FinalCta'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'
import { MobileCta } from './sections/MobileCta'
import { StructuredData } from './components/StructuredData'

export default function App() {
  useEffect(() => {
    const stop = initSmoothScroll()
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    return stop
  }, [])

  return (
    <>
      <StructuredData />
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <Process />
        <Portfolio />
        <WhyUs />
        <Testimonials />
        <FinalCta />
        <Contact />
      </main>
      <Footer />
      <MobileCta />
    </>
  )
}
