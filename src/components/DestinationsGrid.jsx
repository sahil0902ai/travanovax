import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';

const DESTINATIONS = [
  {
    slug: 'bali',
    title: 'Bali Tropical Escapes',
    description: 'Private pool villas, scenic Ubud temples, and pristine Nusa Penida beach cruises.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80',
    duration: '6 Days / 5 Nights',
    price: '₹45,000 onwards'
  },
  {
    slug: 'europe',
    title: 'European Grandeur Tour',
    description: 'Paris Eiffel excursion, Swiss Alps cable cars, and romantic Venice Gondola canals.',
    image: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=600&q=80',
    duration: '10 Days / 9 Nights',
    price: '₹1,85,000 onwards'
  },
  {
    slug: 'switzerland',
    title: 'Swiss Alpine Luxury',
    description: 'Scenic Swiss Pass trains, alpine peaks, and private watches atelier craft tours.',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80',
    duration: '8 Days / 7 Nights',
    price: '₹2,20,000 onwards'
  }
];

export default function DestinationsGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const handleNavigate = (slug, e) => {
    e.preventDefault();
    window.history.pushState({}, '', `/destinations/${slug}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <section id="destinations" className="py-12 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="text-[#e38d37] text-sm font-bold uppercase tracking-widest mb-3 block">
            Featured Escapes
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1c4d6f] mb-4">
            Curated International Packages
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base sm:text-lg">
            Handpicked itineraries optimized for Indian travelers. Visas, hotels, and local transit handled.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {DESTINATIONS.map((dest, i) => (
            <motion.div
              key={dest.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6, ease: 'easeOut' }}
              className="group bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100 flex flex-col hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* Image Banner */}
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c4d6f]/30 to-transparent" />
                <div className="absolute top-4 left-4 bg-[#e38d37] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                  Popular
                </div>
              </div>

              {/* Text Body */}
              <div className="p-6 sm:p-8 flex flex-col flex-1 gap-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
                  <Calendar size={14} className="text-[#e38d37]" />
                  {dest.duration}
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-[#1c4d6f] mb-2">{dest.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{dest.description}</p>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Budget Est.</span>
                    <span className="text-[#1c4d6f] font-black text-sm">{dest.price}</span>
                  </div>
                  <a
                    href={`/destinations/${dest.slug}`}
                    onClick={(e) => handleNavigate(dest.slug, e)}
                    className="flex items-center gap-1.5 bg-[#1c4d6f]/10 group-hover:bg-[#e38d37] text-[#1c4d6f] group-hover:text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all duration-300 shadow hover:shadow-lg"
                  >
                    View Details
                    <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
