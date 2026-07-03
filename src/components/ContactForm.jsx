import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

function validate(fields) {
  const errors = {};
  if (!fields.name.trim()) errors.name = 'Name is required.';
  if (!fields.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!fields.phone.trim()) {
    errors.phone = 'Phone number is required.';
  } else if (!/^\+?[\d\s\-]{7,15}$/.test(fields.phone)) {
    errors.phone = 'Please enter a valid phone number.';
  }
  if (!fields.destination.trim()) errors.destination = 'Please tell us where you want to go.';
  return errors;
}

function FieldError({ message }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="text-red-500 text-xs mt-1 flex items-center gap-1"
        >
          <AlertCircle size={12} />
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

const inputClasses = (hasError) =>
  `w-full px-4 py-3.5 rounded-xl border ${
    hasError ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'
  } text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1c4d6f]/30 focus:border-[#1c4d6f] transition-all text-base min-h-[48px]`;

export default function ContactForm({ prefillDest = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [fields, setFields] = useState({ name: '', email: '', phone: '', destination: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Sync pre-filled destination from hero quick-enquiry widget
  useEffect(() => {
    if (prefillDest) {
      setFields((prev) => ({ ...prev, destination: prefillDest }));
      setErrors((prev) => ({ ...prev, destination: undefined }));
    }
  }, [prefillDest]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate(fields);
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);

    // 1. If live mode, save the lead to Supabase via native REST API call to keep bundle small!
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      try {
        await fetch(`${supabaseUrl}/rest/v1/leads`, {
          method: 'POST',
          headers: {
            'apikey': supabaseAnonKey,
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            name: fields.name,
            email: fields.email,
            phone: fields.phone,
            destination: fields.destination,
            created_at: new Date().toISOString()
          })
        });
      } catch (err) {
        console.error('Database connection error logging lead:', err);
      }
    } else {
      // Demo Mode: save locally to simulated leads list so they show up in Leads Tab
      const savedLeadsRaw = localStorage.getItem('travanovax_simulated_leads');
      const savedLeads = savedLeadsRaw ? JSON.parse(savedLeadsRaw) : [
        { timestamp: '2026-07-03 10:24', name: 'Arjun Verma', email: 'arjun.verma@gmail.com', phone: '+91 98234 56789', destination: 'Switzerland Family Getaway (June, 8 days)' },
        { timestamp: '2026-07-02 18:41', name: 'Neha Gupta', email: 'neha.g@outlook.com', phone: '+91 99112 23344', destination: 'Maldives Honeymoon Resort, water villa (Oct, 5 days)' },
        { timestamp: '2026-07-01 14:12', name: 'Vikram Malhotra', email: 'vikram.m@corporates.in', phone: '+91 98100 98100', destination: 'Kashmir Trekking Trip with friends (Aug, 7 days)' }
      ];
      
      const newLead = {
        timestamp: new Date().toLocaleString(),
        name: fields.name,
        email: fields.email,
        phone: fields.phone,
        destination: fields.destination
      };
      localStorage.setItem('travanovax_simulated_leads', JSON.stringify([newLead, ...savedLeads]));
    }

    const formspreeUrl = import.meta.env.VITE_FORMSPREE_URL;

    if (formspreeUrl) {
      try {
        const response = await fetch(formspreeUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(fields),
        });

        if (response.ok) {
          setSubmitted(true);
          setFields({ name: '', email: '', phone: '', destination: '' });
        } else {
          const data = await response.json();
          setErrors({ submit: data.error || 'Something went wrong. Please try again.' });
        }
      } catch (err) {
        setErrors({ submit: 'Network error. Please check your connection and try again.' });
      } finally {
        setLoading(false);
      }
    } else {
      // Simulated async submit fallback for local testing
      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
        setFields({ name: '', email: '', phone: '', destination: '' });
      }, 1200);
    }
  };

  return (
    <section id="contact" className="py-12 md:py-24 bg-gray-50/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[#e38d37] text-sm font-bold uppercase tracking-widest mb-3 block">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1c4d6f] mb-4">
            Let's Plan Your Trip
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base sm:text-lg">
            Fill out the form below and we'll get back to you within 24 hours with a personalised quote.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="max-w-lg mx-auto"
        >
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-5 sm:p-10">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-8 flex flex-col items-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 size={36} className="text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1c4d6f]">Inquiry Sent!</h3>
                  <p className="text-gray-500 text-sm max-w-xs">
                    Thanks for reaching out! Our team will contact you within 24 hours to craft your perfect trip.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 text-[#e38d37] font-semibold text-sm hover:underline"
                  >
                    Submit another inquiry
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="flex flex-col gap-5"
                >
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Smith"
                      value={fields.name}
                      onChange={handleChange}
                      className={inputClasses(errors.name)}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    <FieldError message={errors.name} />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@email.com"
                      value={fields.email}
                      onChange={handleChange}
                      className={inputClasses(errors.email)}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    <FieldError message={errors.email} />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={fields.phone}
                      onChange={handleChange}
                      className={inputClasses(errors.phone)}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                    />
                    <FieldError message={errors.phone} />
                  </div>

                  {/* Destination */}
                  <div>
                    <label htmlFor="destination" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Where Do You Want to Go? <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="destination"
                      name="destination"
                      rows={4}
                      placeholder="E.g. Bali in October for 10 days, honeymoon trip, budget ₹1.5L..."
                      value={fields.destination}
                      onChange={handleChange}
                      className={`${inputClasses(errors.destination)} resize-none`}
                      aria-describedby={errors.destination ? 'destination-error' : undefined}
                    />
                    <FieldError message={errors.destination} />
                  </div>

                  {errors.submit && (
                    <div className="text-red-500 text-sm flex items-center gap-1.5 bg-red-50 border border-red-200 p-3 rounded-xl">
                      <AlertCircle size={16} className="shrink-0" />
                      <span>{errors.submit}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 bg-[#1c4d6f] hover:bg-[#163f5b] disabled:opacity-70 text-white font-bold px-6 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Inquiry
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
