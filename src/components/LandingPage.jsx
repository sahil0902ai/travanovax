import React, { useState, useCallback } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Services from './Services';
import WhyChooseUs from './WhyChooseUs';
import About from './About';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';
import ContactForm from './ContactForm';
import FloatingButtons from './FloatingButtons';
import MobileBottomBar from './MobileBottomBar';
import QuoteModal from './QuoteModal';
import Footer from './Footer';
import DestinationsGrid from './DestinationsGrid';

export default function LandingPage({ siteContent = {}, prefillDest: parentPrefill = '' }) {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [prefillDest, setPrefillDest] = useState(parentPrefill);

  React.useEffect(() => {
    if (parentPrefill) {
      setPrefillDest(parentPrefill);
    }
  }, [parentPrefill]);

  const open = useCallback(() => setQuoteOpen(true), []);
  const close = useCallback(() => setQuoteOpen(false), []);

  const handleQuickEnquiry = useCallback((destination) => {
    setPrefillDest(destination || '');
    setTimeout(() => {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }, []);

  return (
    <>
      <Navbar onOpenQuote={open} />

      <main>
        <Hero 
          onOpenQuote={open} 
          onQuickEnquiry={handleQuickEnquiry} 
          dynamicContent={siteContent.hero}
        />

        <div className="pt-16 sm:pt-20">
          <Services dynamicContent={siteContent.services} />
        </div>

        <DestinationsGrid />

        <WhyChooseUs dynamicContent={siteContent.whyChooseUs} />
        <About dynamicContent={siteContent.about} />
        <HowItWorks />
        <Testimonials dynamicContent={siteContent.testimonials} />
        <ContactForm prefillDest={prefillDest} />
      </main>

      <div className="pb-20 md:pb-0">
        <Footer />
      </div>

      <FloatingButtons />
      <MobileBottomBar onOpenQuote={open} />
      <QuoteModal isOpen={quoteOpen} onClose={close} />
    </>
  );
}
