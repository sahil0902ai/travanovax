import React from 'react';
import { motion } from 'framer-motion';

export default function MobileBottomBar({ onOpenQuote }) {
  return (
    <motion.div
      // hidden on md+ — only shows on mobile
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.6, type: 'spring', stiffness: 260, damping: 28 }}
    >
      {/* Soft gradient fade above the bar — prevents hard cut */}
      <div className="h-3 bg-gradient-to-t from-black/15 to-transparent pointer-events-none" />

      <div
        className="bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-2xl shadow-black/20"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="flex items-center gap-2.5 px-3 py-2.5">
          {/* Call icon shortcut */}
          <a
            href="tel:+919999999999"
            aria-label="Call TRAVANOVAX"
            className="flex-none w-12 h-12 bg-[#1c4d6f]/10 active:bg-[#1c4d6f]/20 rounded-xl flex flex-col items-center justify-center text-[#1c4d6f] transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.07 6.07l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17z"/>
            </svg>
            <span className="text-[9px] font-bold mt-0.5 leading-none">Call</span>
          </a>

          {/* WhatsApp icon shortcut */}
          <a
            href="https://wa.me/919999999999?text=Hi%20TRAVANOVAX%2C%20I%27d%20like%20to%20plan%20a%20trip!"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp TRAVANOVAX"
            className="flex-none w-12 h-12 bg-[#25D366]/10 active:bg-[#25D366]/20 rounded-xl flex flex-col items-center justify-center text-[#25D366] transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span className="text-[9px] font-bold mt-0.5 leading-none">WhatsApp</span>
          </a>

          {/* Primary enquiry button — fills remaining space */}
          <button
            onClick={onOpenQuote}
            className="flex-1 bg-[#e38d37] active:bg-[#d17e2e] text-white font-bold py-3.5 rounded-xl text-sm transition-colors shadow-lg shadow-[#e38d37]/25 flex items-center justify-center gap-2 min-h-[48px]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
            Send Free Enquiry
          </button>
        </div>
      </div>
    </motion.div>
  );
}
