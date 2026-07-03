import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Clock, BadgeDollarSign, Handshake } from 'lucide-react';

/*
 * A contrasting dark-band section between Services and About.
 * Uses bold stat numbers anchored by an icon — mirrors the
 * "Why Choose Us" band pattern used by established travel sites
 * to visually break page rhythm and build trust at a glance.
 */

const stats = [
  {
    icon: Users,
    number: '500+',
    label: 'Happy Travellers',
    sub: '100% personalised itineraries',
    color: 'text-[#e38d37]',
    bg: 'bg-[#e38d37]/15',
  },
  {
    icon: Clock,
    number: '24/7',
    label: 'Dedicated Support',
    sub: 'Before, during & after your trip',
    color: 'text-sky-300',
    bg: 'bg-sky-400/15',
  },
  {
    icon: BadgeDollarSign,
    number: '100%',
    label: 'Transparent Pricing',
    sub: 'No hidden fees, ever',
    color: 'text-emerald-300',
    bg: 'bg-emerald-400/15',
  },
  {
    icon: Handshake,
    number: '50+',
    label: 'Verified Local Partners',
    sub: 'Handpicked on-ground experts',
    color: 'text-purple-300',
    bg: 'bg-purple-400/15',
  },
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      id="why-us"
      className="bg-[#0d3347] relative overflow-hidden py-14 sm:py-20"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />
      {/* Decorative blobs */}
      <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-[#e38d37]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-sky-400/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section label */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="text-[#e38d37] text-xs font-bold uppercase tracking-widest mb-3 block">
            Why Choose Us
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
            Trusted by Travellers.{' '}
            <span className="text-[#e38d37]">Built on Results.</span>
          </h2>
        </motion.div>

        {/* Stats grid — 2-col on mobile, 4-col on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative bg-white/5 hover:bg-white/10
                           border border-white/10 hover:border-white/20
                           rounded-2xl p-5 sm:p-6
                           text-center flex flex-col items-center gap-3
                           transition-all duration-300 cursor-default
                           hover:-translate-y-1"
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl ${stat.bg}
                                flex items-center justify-center
                                group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={22} className={stat.color} />
                </div>

                {/* Big stat number */}
                <div className={`text-3xl sm:text-4xl font-black ${stat.color} leading-none`}>
                  {stat.number}
                </div>

                {/* Label */}
                <div className="text-white font-bold text-sm sm:text-base leading-tight">
                  {stat.label}
                </div>

                {/* Sub-label */}
                <div className="text-white/50 text-xs leading-snug">
                  {stat.sub}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Trust tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-white/40 text-xs sm:text-sm mt-8 sm:mt-10"
        >
          Numbers updated as of 2026 · All reviews are from verified customers
        </motion.p>
      </div>
    </section>
  );
}
