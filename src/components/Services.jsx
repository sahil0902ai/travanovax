import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Package, Plane, Hotel, FileCheck } from 'lucide-react';

const services = [
  {
    icon: Package,
    title: 'Holiday Packages',
    description: 'Thoughtfully designed holidays — honeymoons, family trips, group tours, and solo adventures — built around what matters to you, not a template.',
    color: 'from-[#1c4d6f] to-[#1a7fa8]',
  },
  {
    icon: Plane,
    title: 'Flight Booking',
    description: 'We search, compare, and book the best fares so you never overpay. Domestic, international, multi-city — with flexible options and zero hidden charges.',
    color: 'from-[#e38d37] to-[#f0b87a]',
  },
  {
    icon: Hotel,
    title: 'Hotel & Resort Stays',
    description: 'From cosy boutique guesthouses to five-star beach resorts — handpicked for quality, value, and location, with rates you won\'t find on your own.',
    color: 'from-[#1c4d6f] to-[#1a7fa8]',
  },
  {
    icon: FileCheck,
    title: 'Visa Assistance',
    description: 'Confused about which documents to submit? We guide you through every step — checklists, form filling, appointment booking — so your visa application is stress-free.',
    color: 'from-[#e38d37] to-[#f0b87a]',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: 'easeOut' },
  }),
};

function ServiceCard({ service, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="group bg-white rounded-2xl p-5 sm:p-8 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 flex flex-row sm:flex-col items-start gap-4 sm:gap-5"
    >
      <div
        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon size={26} className="text-white" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-[#1c4d6f] mb-2">{service.title}</h3>
        <p className="text-gray-500 leading-relaxed text-sm">{service.description}</p>
      </div>
      <div className="mt-auto">
        <span className="text-[#e38d37] text-sm font-semibold group-hover:underline cursor-pointer">
          Learn more →
        </span>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' });

  return (
    <section id="services" className="py-12 md:py-24 bg-gray-50/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="text-[#e38d37] text-sm font-bold uppercase tracking-widest mb-3 block">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1c4d6f] mb-4">
            Everything Your Trip Needs
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base sm:text-lg">
            One call, one team, complete peace of mind — we cover it all so you don't have to juggle ten different apps and websites.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
