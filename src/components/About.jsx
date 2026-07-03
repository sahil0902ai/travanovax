import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2, Globe, Heart, Sparkles } from 'lucide-react';

const ABOUT_IMAGE =
  'https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=900&q=80';

const highlights = [
  { icon: Globe, text: 'Custom International & Domestic Escapes' },
  { icon: Heart, text: 'Bespoke, Human-First Travel Design' },
  { icon: Sparkles, text: '100% Honest Pricing, Zero Hidden Fees' },
  { icon: CheckCircle2, text: 'Complete Visas, Flights & Stays Handled' },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="py-12 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Image side */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img
                src={ABOUT_IMAGE}
                alt="Couple exploring a scenic destination, embodying the TRAVANOVAX travel experience"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-[#F2A65A] text-white rounded-2xl p-5 shadow-xl hidden sm:flex flex-col items-center">
              <span className="text-3xl font-black leading-none">500+</span>
              <span className="text-xs font-semibold opacity-90 mt-1 text-center">Happy<br/>Travellers</span>
            </div>
            {/* Decorative blob */}
            <div className="absolute -top-8 -left-8 w-40 h-40 rounded-full bg-[#0B4F6C]/10 blur-2xl -z-10" />
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          >
            <span className="text-[#F2A65A] text-sm font-bold uppercase tracking-widest mb-3 block">
              Our Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B4F6C] mb-6 leading-tight">
              Crafting Travel Experiences<br />
              <span className="text-[#F2A65A]">That Stay With You Forever</span>
            </h2>
            <div className="space-y-4 text-gray-600 text-base leading-relaxed mb-8">
              <p>
                TRAVANOVAX was founded to solve a simple challenge: turning travel planning from a chore into a joy. We believe a holiday should be an inspiring escape, not an endless checklist of bookings, hotel reviews, and visa applications.
              </p>
              <p>
                Whether you dream of watch-buying trips in Switzerland, romantic beach retreats in the Maldives, family tours through Europe, or exploring hidden corners of Kashmir and Kerala, we tailor every single itinerary to fit your unique pace and travel style.
              </p>
              <p>
                From coordinating complex visa appointments to booking boutique stays and 24/7 on-trip assistance, our team handles all the details behind the scenes. You simply choose the destination, pack your bags, and live the experience.
              </p>
            </div>

            {/* Highlight list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {highlights.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                  <div className="w-8 h-8 rounded-lg bg-[#0B4F6C]/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-[#0B4F6C]" />
                  </div>
                  {text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
