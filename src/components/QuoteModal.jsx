import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, AlertCircle } from 'lucide-react';

function validate(fields) {
  const errors = {};
  if (!fields.name.trim()) errors.name = 'Name is required.';
  if (!fields.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (!fields.phone.trim()) {
    errors.phone = 'Phone number is required.';
  } else if (!/^\+?[\d\s\-]{7,15}$/.test(fields.phone)) {
    errors.phone = 'Enter a valid phone number.';
  }
  if (!fields.destination.trim()) errors.destination = 'Tell us where you want to go.';
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
          <AlertCircle size={11} /> {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

const inputClasses = (hasError) =>
  `w-full px-4 py-3.5 rounded-xl border ${
    hasError ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'
  } text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C] transition-all text-base min-h-[48px]`;

export default function QuoteModal({ isOpen, onClose }) {
  const [fields, setFields] = useState({ name: '', email: '', phone: '', destination: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate(fields);
    if (Object.keys(newErrors).length) { setErrors(newErrors); return; }
    setLoading(true);

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
        setErrors({ submit: 'Network error. Please try again.' });
      } finally {
        setLoading(false);
      }
    } else {
      setTimeout(() => {
        console.log('TRAVANOVAX Quote Request (Simulation):', fields);
        setLoading(false);
        setSubmitted(true);
        setFields({ name: '', email: '', phone: '', destination: '' });
      }, 1200);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset after close animation
    setTimeout(() => { setSubmitted(false); setErrors({}); }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Get a Free Quote"
          >
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden">
              {/* Modal header */}
              <div className="bg-gradient-to-r from-[#0B4F6C] to-[#1a7fa8] px-6 pt-6 pb-5">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-white/70 hover:text-white hover:bg-white/10 rounded-full p-1.5 transition-all"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F2A65A] flex items-center justify-center text-lg">
                    ✈️
                  </div>
                  <div>
                    <h2 className="text-white font-bold text-lg leading-tight">Get a Free Quote</h2>
                    <p className="text-white/70 text-xs mt-0.5">We'll respond within 24 hours</p>
                  </div>
                </div>
              </div>

              {/* Modal body */}
              <div className="px-6 py-5">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-8 flex flex-col items-center gap-3"
                    >
                      <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle2 size={30} className="text-green-500" />
                      </div>
                      <h3 className="text-lg font-bold text-[#0B4F6C]">You're all set!</h3>
                      <p className="text-gray-500 text-sm max-w-xs">
                        Our travel expert will reach out within 24 hours with a personalised quote.
                      </p>
                      <button
                        onClick={handleClose}
                        className="mt-2 bg-[#0B4F6C] text-white font-semibold px-6 py-2.5 rounded-xl text-sm hover:bg-[#0a4561] transition-colors"
                      >
                        Close
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
                      className="flex flex-col gap-4"
                    >
                      <div>
                        <label htmlFor="modal-name" className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                          Full Name *
                        </label>
                        <input id="modal-name" name="name" type="text" placeholder="John Smith"
                          value={fields.name} onChange={handleChange} className={inputClasses(errors.name)} />
                        <FieldError message={errors.name} />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label htmlFor="modal-email" className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                            Email *
                          </label>
                          <input id="modal-email" name="email" type="email" placeholder="you@email.com"
                            value={fields.email} onChange={handleChange} className={inputClasses(errors.email)} />
                          <FieldError message={errors.email} />
                        </div>
                        <div>
                          <label htmlFor="modal-phone" className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                            Phone *
                          </label>
                          <input id="modal-phone" name="phone" type="tel" placeholder="+91 98765 43210"
                            value={fields.phone} onChange={handleChange} className={inputClasses(errors.phone)} />
                          <FieldError message={errors.phone} />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="modal-destination" className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                          Where do you want to go? *
                        </label>
                        <textarea id="modal-destination" name="destination" rows={3}
                          placeholder="E.g. Bali in October, honeymoon, ₹1.5L budget..."
                          value={fields.destination} onChange={handleChange}
                          className={`${inputClasses(errors.destination)} resize-none`} />
                        <FieldError message={errors.destination} />
                      </div>

                      {errors.submit && (
                        <div className="text-red-500 text-xs flex items-center gap-1.5 bg-red-50 border border-red-200 p-2.5 rounded-xl">
                          <AlertCircle size={14} className="shrink-0" />
                          <span>{errors.submit}</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={loading}
                        className="mt-1 bg-[#F2A65A] hover:bg-[#e8924a] disabled:opacity-70 text-white font-bold px-6 py-3.5 rounded-xl transition-all hover:shadow-xl hover:shadow-[#F2A65A]/30 flex items-center justify-center gap-2 text-sm"
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
                          <><Send size={15} /> Send My Free Quote Request</>
                        )}
                      </button>
                      <p className="text-center text-gray-400 text-xs">
                        🔒 Your details are safe with us. No spam, ever.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
