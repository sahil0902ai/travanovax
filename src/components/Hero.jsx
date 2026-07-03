import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, MapPin, ChevronRight } from 'lucide-react';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2070&q=80';

// ─── Two headline options — choose one before launch ─────────────────────────
// OPTION A (aspirational, emotional — works well for honeymooners & families)
const HEADLINE_A = (
  <>
    The World Is Waiting —<br />
    <span className="text-[#F2A65A]">Let's Plan Your Trip.</span>
  </>
);

// OPTION B (problem-solving, trust-first — works for first-timers & busy professionals)
const HEADLINE_B = (
  <>
    Trip Planning That<br />
    <span className="text-[#F2A65A]">Actually Feels Easy.</span>
  </>
);

// ← TOGGLE THIS to switch between options A and B
const ACTIVE_HEADLINE = HEADLINE_B;

// ─── Mini Quote Widget ─────────────────────────────────────────────────────────
function QuoteWidget({ onQuickEnquiry }) {
  const [dest, setDest] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onQuickEnquiry(dest.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-2xl shadow-black/25 p-3 sm:p-4
                 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
    >
      <div className="flex items-center gap-2.5 flex-1 border border-gray-200 rounded-xl
                      px-4 py-3 bg-gray-50/60 focus-within:border-[#0B4F6C]/40
                      focus-within:ring-2 focus-within:ring-[#0B4F6C]/15 transition-all">
        <MapPin size={18} className="text-[#F2A65A] shrink-0" />
        <input
          type="text"
          value={dest}
          onChange={(e) => setDest(e.target.value)}
          placeholder="Where's the dream destination? Bali, Paris, Kashmir…"
          className="flex-1 bg-transparent text-gray-800 placeholder-gray-400
                     text-base outline-none min-w-0"
          aria-label="Destination"
        />
      </div>
      <button
        type="submit"
        className="group bg-[#F2A65A] hover:bg-[#e8924a] active:bg-[#d4823e]
                   text-white font-bold px-6 py-3.5 rounded-xl
                   transition-all duration-200 hover:shadow-lg hover:shadow-[#F2A65A]/40
                   flex items-center justify-center gap-2
                   whitespace-nowrap min-h-[48px] shrink-0 text-sm sm:text-base"
      >
        Get Free Quote
        <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
      </button>
    </form>
  );
}

// ─── Hero Section ──────────────────────────────────────────────────────────────
export default function Hero({ onOpenQuote, onQuickEnquiry }) {
  return (
    <section
      id="hero"
      className="relative overflow-visible min-h-[85vh] sm:min-h-screen
                 flex items-center justify-center pb-28 sm:pb-36"
    >
      {/* Clipped background layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-top sm:bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
          role="img"
          aria-label="A traveller standing at a stunning mountain viewpoint"
        />
        <div className="absolute inset-0 bg-gradient-to-b
                        from-[#0B4F6C]/65 via-[#0B4F6C]/40 to-[#071a24]/92" />
        <div className="hidden sm:block absolute top-1/4 left-0 w-64 h-64
                        rounded-full bg-[#F2A65A]/10 blur-3xl" />
        <div className="hidden sm:block absolute bottom-1/3 right-0 w-72 h-72
                        rounded-full bg-[#0B4F6C]/30 blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center w-full max-w-5xl mx-auto
                      px-5 sm:px-8 pt-20 sm:pt-24 md:pt-28 pb-14 sm:pb-20">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-[#F2A65A]/20 border border-[#F2A65A]/40
                           text-[#F2A65A] text-xs font-bold px-4 py-1.5 rounded-full
                           mb-4 sm:mb-5 tracking-widest uppercase">
            ✈ Crafting Journeys Since 2020
          </span>
        </motion.div>

        {/* Headline — switchable between Option A and B */}
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.12 }}
          className="font-black text-white
                     text-[2rem] leading-[1.15]
                     sm:text-5xl sm:leading-tight
                     lg:text-7xl lg:leading-tight
                     mb-3 sm:mb-5"
          style={{ textShadow: '0 2px 30px rgba(0,0,0,0.45)' }}
        >
          {ACTIVE_HEADLINE}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.25 }}
          className="text-white/80 max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed px-2 sm:px-0"
        >
          {/* Mobile — condensed to 2 lines max */}
          <span className="sm:hidden text-sm">
            Flights, hotels, visas, and personalised itineraries — handled for you, start to finish.
          </span>
          {/* Desktop — full version */}
          <span className="hidden sm:inline text-xl">
            From that first spark of "Where should we go?" to the moment you land back home —
            we take care of every detail so you can simply show up and enjoy the journey.
          </span>
        </motion.p>

        {/* Mobile CTA (widget handles desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.38 }}
          className="sm:hidden flex flex-col gap-3 mb-8"
        >
          <button
            onClick={onOpenQuote}
            className="w-full bg-[#F2A65A] active:bg-[#e8924a] text-white font-bold
                       px-8 py-4 rounded-2xl text-base min-h-[52px]
                       flex items-center justify-center gap-2"
          >
            Get a Free Quote
            <ChevronRight size={18} />
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-6 sm:gap-12 mt-0 sm:mt-4 mb-4 sm:mb-0"
        >
          {[
            { value: '500+', label: 'Happy Travellers' },
            { value: '50+', label: 'Destinations' },
            { value: '5★', label: 'Rated Service' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-xl sm:text-3xl font-black text-[#F2A65A]">{stat.value}</div>
              <div className="text-[10px] sm:text-sm text-white/70 mt-0.5 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Mini quote widget — overlaps hero bottom */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2
                   z-20 w-full max-w-3xl px-4"
      >
        <div className="hidden sm:flex items-center gap-2 mb-2 px-1">
          <span className="text-white/80 text-xs font-semibold tracking-wide uppercase">
            📍 Quick Enquiry
          </span>
          <div className="flex-1 h-px bg-white/20" />
          <span className="text-white/50 text-xs">or</span>
          <button
            onClick={onOpenQuote}
            className="text-[#F2A65A] text-xs font-semibold hover:underline"
          >
            open full form ↗
          </button>
        </div>
        <QuoteWidget onQuickEnquiry={onQuickEnquiry} />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="hidden sm:flex absolute bottom-8 right-8
                   text-white/50 flex-col items-center gap-1 pointer-events-none"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <ArrowDown size={14} />
      </motion.div>
    </section>
  );
}
