import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/*
 * ─────────────────────────────────────────────────────────────────────────────
 * PLACEHOLDER CONTENT — swap these 3 objects with real customer reviews
 * once you have them. Fields to update per card:
 *   name       → reviewer's full name
 *   location   → their city/origin (optional)
 *   tag        → what trip they booked, e.g. "Booked: Bali Trip"
 *   quote      → one punchy sentence (keep it short — 1 line at desktop width)
 *   initials   → 2-letter avatar initials
 * ─────────────────────────────────────────────────────────────────────────────
 */
const REVIEWS = [
  {
    name: 'Priya Sharma',
    location: 'Mumbai',
    initials: 'PS',
    stars: 5,
    tag: 'Booked: Bali Honeymoon',
    // PLACEHOLDER — replace with real quote
    quote: 'Every detail was perfect. We didn\'t have to think about a single thing.',
  },
  {
    name: 'Rahul Mehta',
    location: 'Pune',
    initials: 'RM',
    stars: 5,
    tag: 'Booked: Europe Family Tour',
    // PLACEHOLDER — replace with real quote
    quote: 'Travelling to 5 countries with two kids — they made it completely seamless.',
  },
  {
    name: 'Karan Joshi',
    location: 'Delhi',
    initials: 'KJ',
    stars: 5,
    tag: 'Booked: Thailand Solo Trip',
    // PLACEHOLDER — replace with real quote
    quote: 'First-time solo traveller and I had the best experience of my life.',
  },
];

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5 text-[#e38d37]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials({ dynamicContent }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const subtitle = dynamicContent?.subtitle || 'What Travellers Say';
  const title = dynamicContent?.title || 'Real Stories, Real Trips';
  
  const reviewsList = dynamicContent?.reviews || [
    {
      name: 'Priya Sharma',
      location: 'Mumbai',
      initials: 'PS',
      stars: 5,
      tag: 'Booked: Bali Honeymoon',
      quote: 'Every detail was perfect. We didn\'t have to think about a single thing.',
    },
    {
      name: 'Rahul Mehta',
      location: 'Pune',
      initials: 'RM',
      stars: 5,
      tag: 'Booked: Europe Family Tour',
      quote: 'Travelling to 5 countries with two kids — they made it completely seamless.',
    },
    {
      name: 'Karan Joshi',
      location: 'Delhi',
      initials: 'KJ',
      stars: 5,
      tag: 'Booked: Thailand Solo Trip',
      quote: 'First-time solo traveller and I had the best experience of my life.',
    },
  ];

  return (
    <section id="testimonials" className="py-12 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section label */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="text-[#e38d37] text-xs font-bold uppercase tracking-widest mb-2 block">
            {subtitle}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#1c4d6f]">
            {title}
          </h2>
          <p className="text-gray-400 text-xs mt-2">
            ⚠ Placeholder reviews — replace with verified customer testimonials before launch
          </p>
        </motion.div>

        {/* 3 cards — single column mobile, 3-col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {reviewsList.map((r, i) => (
            <motion.article
              key={r.name}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-gray-50 rounded-2xl p-5 sm:p-6
                         border border-gray-100
                         flex flex-col gap-3
                         hover:border-[#e38d37]/40 hover:bg-amber-50/30
                         transition-colors duration-300"
            >
              {/* Stars */}
              <Stars count={r.stars} />

              {/* One-line quote */}
              <p className="text-gray-700 text-sm sm:text-base leading-snug font-medium flex-1">
                "{r.quote}"
              </p>

              {/* Author row */}
              <div className="flex items-center gap-2.5 pt-2 border-t border-gray-200">
                {/* Initials avatar */}
                <div className="w-8 h-8 rounded-full bg-[#1c4d6f] flex items-center justify-center
                                text-white text-xs font-black shrink-0">
                  {r.initials}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-gray-800 text-sm truncate">{r.name}</div>
                  <div className="text-gray-400 text-xs">{r.location}</div>
                </div>
              </div>

              {/* Destination tag */}
              <span className="self-start bg-[#1c4d6f]/8 text-[#1c4d6f] text-xs font-semibold
                               px-3 py-1 rounded-full">
                {r.tag}
              </span>
            </motion.article>
          ))}
        </div>

        {/* Lightweight aggregate trust note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-gray-400 text-xs mt-8"
        >
          ⭐ 4.9 / 5 average · Based on 200+ traveller reviews
          <span className="text-gray-300"> · </span>
          <span className="italic">placeholder number — update once you have real data</span>
        </motion.p>

      </div>
    </section>
  );
}
