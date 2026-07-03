import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

const PHONE_NUMBER = '+91 99999 99999';
const PHONE_HREF = 'tel:+919999999999';
const WHATSAPP_HREF = 'https://wa.me/919999999999?text=Hi%20TRAVANOVAX%2C%20I%27d%20like%20to%20plan%20a%20trip!';

export default function Navbar({ onOpenQuote }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0B4F6C]/97 backdrop-blur-md shadow-lg'
          : 'bg-[#0B4F6C]/85 backdrop-blur-sm'
      }`}
    >
      {/* Desktop-only top contact bar */}
      <div className="hidden md:block border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-end gap-6 py-1.5">
            <a
              href={PHONE_HREF}
              className="flex items-center gap-1.5 text-white/80 hover:text-[#F2A65A] text-xs font-medium transition-colors"
            >
              <Phone size={12} />
              {PHONE_NUMBER}
            </a>
            <span className="text-white/30 text-xs">|</span>
            <span className="text-white/55 text-xs">
              Mon–Sat, 9AM–7PM IST
            </span>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#25D366] hover:text-green-400 text-xs font-medium transition-colors"
            >
              <MessageCircle size={12} />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Main nav row — shrinks on mobile scroll */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? 'h-12 md:h-14' : 'h-14 md:h-16'
          }`}
        >
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNav(e, '#hero')}
            className="flex items-center shrink-0"
          >
            <span className={`text-[#F2A65A] font-black tracking-tight transition-all duration-300 ${scrolled ? 'text-lg' : 'text-xl'}`}>
              TRAVANO
            </span>
            <span className={`text-white font-black tracking-tight transition-all duration-300 ${scrolled ? 'text-lg' : 'text-xl'}`}>
              VAX
            </span>
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className="text-white/85 hover:text-[#F2A65A] font-medium transition-colors text-sm tracking-wide"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={onOpenQuote}
              className="ml-2 bg-[#F2A65A] hover:bg-[#e8924a] text-white font-bold px-5 py-2.5 rounded-xl transition-all hover:shadow-lg hover:shadow-[#F2A65A]/30 hover:-translate-y-0.5 text-sm min-h-[44px]"
            >
              Get a Free Quote
            </button>
          </div>

          {/* Mobile right cluster: phone + WA + Quote pill + hamburger */}
          <div className="md:hidden flex items-center gap-1.5">
            {/* Phone — always tappable */}
            <a
              href={PHONE_HREF}
              aria-label="Call us"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-white/80 hover:text-[#F2A65A] transition-colors rounded-lg"
            >
              <Phone size={19} />
            </a>
            {/* WhatsApp — always tappable */}
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp us"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[#25D366] transition-colors rounded-lg"
            >
              <MessageCircle size={19} />
            </a>
            {/* Quote pill — always visible, opens popup */}
            <button
              onClick={onOpenQuote}
              aria-label="Get a free quote"
              className="bg-[#F2A65A] hover:bg-[#e8924a] text-white font-bold text-xs px-3 py-1.5 rounded-lg transition-colors min-h-[36px] leading-none"
            >
              Quote
            </button>
            {/* Hamburger */}
            <button
              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-white rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="md:hidden bg-[#0a3f58]/99 backdrop-blur-md border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-3 pb-5 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNav(e, link.href)}
                  className="text-white/90 hover:text-[#F2A65A] font-medium py-3 text-base transition-colors border-b border-white/5 flex items-center justify-between"
                >
                  {link.label}
                  <span className="text-white/30 text-sm">›</span>
                </a>
              ))}
              <button
                onClick={() => { setMobileOpen(false); onOpenQuote(); }}
                className="mt-3 bg-[#F2A65A] hover:bg-[#e8924a] text-white font-bold py-3.5 rounded-xl text-center transition-colors text-sm min-h-[48px]"
              >
                Get a Free Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
