import { useState, useCallback } from 'react'
import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import WhyChooseUs from './components/WhyChooseUs'
import About from './components/About'
import HowItWorks from './components/HowItWorks'
import Testimonials from './components/Testimonials'
import ContactForm from './components/ContactForm'
import FloatingButtons from './components/FloatingButtons'
import MobileBottomBar from './components/MobileBottomBar'
import QuoteModal from './components/QuoteModal'
import Footer from './components/Footer'

function App() {
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [prefillDest, setPrefillDest] = useState('')

  const open = useCallback(() => setQuoteOpen(true), [])
  const close = useCallback(() => setQuoteOpen(false), [])

  /**
   * Called by the hero mini-widget:
   * 1. Pre-fills the destination in the full contact form
   * 2. Smooth-scrolls to the contact section
   * If the user typed something, pre-fill it. If empty, just scroll.
   */
  const handleQuickEnquiry = useCallback((destination) => {
    setPrefillDest(destination || '')
    // Small delay so the state update propagates before scrolling
    setTimeout(() => {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }, [])

  return (
    <>
      <Navbar onOpenQuote={open} />

      <main>
        <Hero onOpenQuote={open} onQuickEnquiry={handleQuickEnquiry} />

        {/*
          pt-16 sm:pt-20 clears the hero widget's translate-y-1/2 bleed.
          On mobile the widget doesn't overlap (it's in the hero flow),
          so mobile just gets standard padding via Services' own py-12 class.
        */}
        <div className="pt-16 sm:pt-20">
          <Services />
        </div>

        <WhyChooseUs />
        <About />
        <HowItWorks />
        <Testimonials />
        <ContactForm prefillDest={prefillDest} />
      </main>

      <div className="pb-20 md:pb-0">
        <Footer />
      </div>

      <FloatingButtons />
      <MobileBottomBar onOpenQuote={open} />
      <QuoteModal isOpen={quoteOpen} onClose={close} />
    </>
  )
}

export default App
