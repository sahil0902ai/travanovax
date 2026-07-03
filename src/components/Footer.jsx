import React from 'react';

/* ─── Brand constants ─────────────────────────────────────────────────────── */
const PHONE = '+91 99999 99999';
const PHONE_HREF = 'tel:+919999999999';
const EMAIL = 'hello@travanovax.com';
const EMAIL_HREF = 'mailto:hello@travanovax.com';
const WHATSAPP_HREF = 'https://wa.me/919999999999?text=Hi%20TRAVANOVAX!';
// PLACEHOLDER — replace with real address before launch
const ADDRESS = '123, Travel House, MG Road\nMumbai — 400001, Maharashtra';

/* ─── Navigation links ────────────────────────────────────────────────────── */
const quickLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Why Choose Us', href: '#why-us' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact Us', href: '#contact' },
];

/* ─── Social icons (inline SVG — lucide-react doesn't export FB/IG) ──────── */
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);

const socials = [
  { Icon: InstagramIcon, label: 'Instagram', href: 'https://instagram.com' },
  { Icon: FacebookIcon, label: 'Facebook', href: 'https://facebook.com' },
  { Icon: WhatsAppIcon, label: 'WhatsApp', href: WHATSAPP_HREF },
  { Icon: YoutubeIcon, label: 'YouTube', href: 'https://youtube.com' },
];

/* ─── Helper ──────────────────────────────────────────────────────────────── */
function scrollTo(e, href) {
  if (!href.startsWith('#')) return;
  e.preventDefault();
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
}

/* ═══════════════════════════════════════════════════════════════════════════ */
export default function Footer() {
  return (
    <footer className="bg-[#071a24] text-white" aria-label="Site footer">

      {/* ── 3-column main footer ────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">

          {/* ── Column 1: Brand ─────────────────────────────────────────── */}
          <div className="flex flex-col gap-4">
            {/* Logo */}
            <a href="#hero" onClick={(e) => scrollTo(e, '#hero')} className="inline-flex items-center">
              <span className="text-[#F2A65A] text-2xl font-black tracking-tight">TRAVANO</span>
              <span className="text-white text-2xl font-black tracking-tight">VAX</span>
            </a>

            {/* Tagline */}
            <p className="text-white/55 text-sm leading-relaxed max-w-[220px]">
              Making travel simple, personal, and stress-free — one adventure at a time.
            </p>

            {/* Placeholder address — replace before launch */}
            <address className="not-italic text-white/40 text-xs leading-relaxed whitespace-pre-line">
              {/* PLACEHOLDER address — update with real office address */}
              {ADDRESS}
            </address>

            {/* Social icons */}
            <div className="flex gap-2 mt-1">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/8 hover:bg-[#F2A65A]
                             flex items-center justify-center text-white
                             transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* ── Column 2: Quick Links ────────────────────────────────────── */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#F2A65A] mb-5">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    onClick={(e) => scrollTo(e, href)}
                    className="text-white/55 hover:text-white text-sm
                               transition-colors duration-200
                               flex items-center gap-1.5 group"
                  >
                    <span className="text-[#F2A65A]/0 group-hover:text-[#F2A65A]
                                     transition-colors text-xs leading-none">›</span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 3: Contact ────────────────────────────────────────── */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#F2A65A] mb-5">
              Get In Touch
            </h3>
            <ul className="flex flex-col gap-4 text-sm">

              {/* Phone */}
              <li className="flex items-start gap-3">
                <span className="text-base shrink-0 mt-0.5">📞</span>
                <div>
                  <a href={PHONE_HREF}
                    className="text-white/80 hover:text-white transition-colors font-medium">
                    {PHONE}
                  </a>
                  <div className="text-white/35 text-xs mt-0.5">Mon–Sat, 9AM–7PM IST</div>
                </div>
              </li>

              {/* Email */}
              <li className="flex items-start gap-3">
                <span className="text-base shrink-0 mt-0.5">✉️</span>
                <a href={EMAIL_HREF}
                  className="text-white/80 hover:text-white transition-colors font-medium">
                  {EMAIL}
                </a>
              </li>

              {/* WhatsApp */}
              <li className="flex items-start gap-3">
                <span className="text-base shrink-0 mt-0.5">💬</span>
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] hover:text-green-400 transition-colors font-medium"
                >
                  Chat on WhatsApp
                </a>
              </li>

            </ul>

            {/* WhatsApp CTA button */}
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6
                         bg-[#25D366] hover:bg-[#1ebe57] text-white
                         text-sm font-semibold px-4 py-2.5 rounded-xl
                         transition-all hover:shadow-lg hover:shadow-green-400/20"
            >
              <WhatsAppIcon />
              Chat Now
            </a>
          </div>

        </div>
      </div>

      {/* ── Bottom bar: copyright + legal links ─────────────────────────── */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4
                        flex flex-col sm:flex-row items-center justify-between gap-3
                        text-xs text-white/30">

          <p>© {new Date().getFullYear()} TRAVANOVAX. All rights reserved.</p>

          {/*
           * PLACEHOLDER legal links — these are non-functional for now.
           * Replace href="#" with real policy page URLs before launch.
           */}
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white/60 transition-colors">
              Privacy Policy
            </a>
            <span className="text-white/15">·</span>
            <a href="#" className="hover:text-white/60 transition-colors">
              Terms &amp; Conditions
            </a>
            <span className="text-white/15">·</span>
            <a href="#" className="hover:text-white/60 transition-colors">
              Cancellation Policy
            </a>
          </div>

        </div>
      </div>

    </footer>
  );
}
