import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageSquare, MapPin, Ticket } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Tell Us Where You Want to Go',
    description:
      'Share your dream destination, travel dates, budget, and preferences — we listen to every detail.',
  },
  {
    number: '02',
    icon: MapPin,
    title: 'We Design Your Perfect Itinerary',
    description:
      'Our travel experts craft a personalised trip plan with flights, stays, and activities tailored just for you.',
  },
  {
    number: '03',
    icon: Ticket,
    title: 'You Book & Travel',
    description:
      'Confirm your trip, let us handle the paperwork, and show up ready to create unforgettable memories.',
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="how-it-works" className="py-12 md:py-24 bg-gradient-to-br from-[#0B4F6C] to-[#073a52] relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#F2A65A]/10 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#F2A65A] text-sm font-bold uppercase tracking-widest mb-3 block">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Planning Your Trip in{' '}
            <span className="text-[#F2A65A]">3 Simple Steps</span>
          </h2>
          <p className="text-white/70 max-w-xl mx-auto text-base sm:text-lg">
            Getting started is easier than you think. We take care of everything.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-16 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-0.5 bg-gradient-to-r from-[#F2A65A]/30 via-[#F2A65A]/60 to-[#F2A65A]/30" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="flex flex-col items-center text-center relative"
              >
                {/* Arrow between steps (mobile) */}
                {i < steps.length - 1 && (
                  <div className="md:hidden flex justify-center my-4 text-[#F2A65A]/60 text-2xl">↓</div>
                )}

                {/* Step circle */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#F2A65A] flex items-center justify-center shadow-lg shadow-[#F2A65A]/30 z-10 relative">
                    <Icon size={28} className="text-white" />
                  </div>
                  <div className="absolute -top-2 -right-3 bg-white text-[#0B4F6C] text-xs font-black w-7 h-7 rounded-full flex items-center justify-center shadow-md">
                    {step.number.replace('0', '')}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-3 leading-snug">{step.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed max-w-xs">{step.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#F2A65A] hover:bg-[#e8924a] text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#F2A65A]/30 hover:-translate-y-1"
          >
            Start Planning Today
          </button>
        </motion.div>
      </div>
    </section>
  );
}
