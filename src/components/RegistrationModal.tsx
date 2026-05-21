import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SAHAJ_EASE } from '../lib/motion';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    age: '',
    dietary: 'Jain Food',
    terms: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
    if (errors[name]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Please provide your full name';
    if (!formData.email.trim()) newErrors.email = 'Please provide your email address';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    
    if (!formData.phone.trim()) newErrors.phone = 'Please provide your contact phone number';
    if (!formData.city.trim()) newErrors.city = 'Please specify your current city';
    if (!formData.age.trim()) newErrors.age = 'Age is required for planning teams';
    if (!formData.terms) newErrors.terms = 'You must accept the Sahaj guidelines';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Generate ticket ID
    const randomID = `SHJ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketId(randomID);
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      city: '',
      age: '',
      dietary: 'Jain Food',
      terms: false
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop blur with fade anim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (isSubmitted) {
                resetForm();
              }
              onClose();
            }}
            className="absolute inset-0 bg-[#1A1A1A]/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5, ease: SAHAJ_EASE }}
            className="relative bg-[#F7F3EC] w-full max-w-lg rounded-2xl overflow-hidden border border-teal/15 shadow-[0_24px_64px_rgba(26,26,26,0.2)] max-h-[90vh] flex flex-col pointer-events-auto"
          >
            
            {/* Soft decorative color wash */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal via-orange to-teal" />

            {/* Header */}
            <div className="p-6 pb-2 flex justify-between items-center border-b border-teal/10">
              <div className="flex flex-col text-left">
                <span className="font-sans font-bold text-[10px] uppercase tracking-widest text-teal">
                  SAHAJ SUMMIT • 6 NOV 2026
                </span>
                <h3 className="font-serif text-22 text-ink mt-0.5 font-medium leading-none">
                  {isSubmitted ? 'Your Assembly Pass' : 'Secure Your Seat'}
                </h3>
              </div>
              <button
                onClick={() => {
                  if (isSubmitted) resetForm();
                  onClose();
                }}
                className="text-ink hover:text-teal w-8 h-8 rounded-full flex items-center justify-center bg-teal/5 transition-colors cursor-pointer"
                aria-label="Close dialog"
                data-cursor-label="view"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Content wrapper */}
            <div className="overflow-y-auto p-6 flex-1">
              
              {!isSubmitted ? (
                /* --- REGISTRATION FORM --- */
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
                  
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans font-medium text-[12px] uppercase tracking-wider text-ink-soft">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. Priyal Jain"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full bg-[#FBF7F0] border ${errors.name ? 'border-orange' : 'border-teal/20'} focus:border-teal rounded-xl px-4 py-3 font-sans text-[15px] focus:outline-none transition-colors duration-200`}
                    />
                    {errors.name && <span className="text-orange text-xs font-medium">{errors.name}</span>}
                  </div>

                  {/* Dual Grid fields (Phone & Email) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-sans font-medium text-[12px] uppercase tracking-wider text-ink-soft">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full bg-[#FBF7F0] border ${errors.phone ? 'border-orange' : 'border-teal/20'} focus:border-teal rounded-xl px-4 py-3 font-sans text-[15px] focus:outline-none transition-colors duration-200`}
                      />
                      {errors.phone && <span className="text-orange text-xs font-medium">{errors.phone}</span>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-sans font-medium text-[12px] uppercase tracking-wider text-ink-soft">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="e.g. name@domain.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full bg-[#FBF7F0] border ${errors.email ? 'border-orange' : 'border-teal/20'} focus:border-teal rounded-xl px-4 py-3 font-sans text-[15px] focus:outline-none transition-colors duration-200`}
                      />
                      {errors.email && <span className="text-orange text-xs font-medium">{errors.email}</span>}
                    </div>
                  </div>

                  {/* Dual Grid fields (City & Age) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-sans font-medium text-[12px] uppercase tracking-wider text-ink-soft">
                        Current City
                      </label>
                      <input
                        type="text"
                        name="city"
                        placeholder="e.g. Aligarh"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full bg-[#FBF7F0] border ${errors.city ? 'border-orange' : 'border-teal/20'} focus:border-teal rounded-xl px-4 py-3 font-sans text-[15px] focus:outline-none transition-colors duration-200`}
                      />
                      {errors.city && <span className="text-orange text-xs font-medium">{errors.city}</span>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-sans font-medium text-[12px] uppercase tracking-wider text-ink-soft">
                        Age Group
                      </label>
                      <input
                        type="number"
                        name="age"
                        placeholder="Within 15 - 35 preferred"
                        value={formData.age}
                        onChange={handleInputChange}
                        className={`w-full bg-[#FBF7F0] border ${errors.age ? 'border-orange' : 'border-teal/20'} focus:border-teal rounded-xl px-4 py-3 font-sans text-[15px] focus:outline-none transition-colors duration-200`}
                      />
                      {errors.age && <span className="text-orange text-xs font-medium">{errors.age}</span>}
                    </div>
                  </div>

                  {/* Dietary Preferences */}
                  <div className="flex flex-col gap-1.5 pt-1">
                    <label className="font-sans font-medium text-[12px] uppercase tracking-wider text-ink-soft">
                      Dietary preference
                    </label>
                    <select
                      name="dietary"
                      value={formData.dietary}
                      onChange={handleInputChange}
                      className="w-full bg-[#FBF7F0] border border-teal/20 focus:border-teal rounded-xl px-4 py-3 font-sans text-[15px] focus:outline-none transition-colors duration-200"
                    >
                      <option value="Jain Food">Standard Specialized Jain Food (Chauvihar Compliant)</option>
                      <option value="Strictly Satvik">Satvik Vegetarian (No Root Vegetables)</option>
                      <option value="Vegan">Pure Vegan / Other</option>
                    </select>
                  </div>

                  {/* Spiritual guidelines Code checkbox */}
                  <div className="flex flex-col gap-2 pt-2">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="terms"
                        checked={formData.terms}
                        onChange={handleCheckboxChange}
                        className="mt-1 accent-teal h-4 w-4 rounded"
                      />
                      <span className="font-sans text-[13px] leading-relaxed text-ink-soft select-none">
                        I pledge to maintain a spirit of non-violence (Ahimsa), self-discipline, respect, and simplicity during this holy companion walk at the Sahaj Summit.
                      </span>
                    </label>
                    {errors.terms && <span className="text-orange text-xs font-medium">{errors.terms}</span>}
                  </div>

                  {/* CTA Register Submit */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="bg-orange hover:bg-orange-hover text-[#F7F3EC] w-full py-4 rounded-xl font-sans font-bold text-16 mt-3 shadow-[0_8px_20px_-8px_rgba(243,112,33,0.4)] transition-colors cursor-pointer text-center"
                    data-cursor-label="look"
                  >
                    Confirm Registration Account
                  </motion.button>
                </form>
              ) : (
                /* --- PASS GENERATED TICKET SCREEN --- */
                <div className="flex flex-col items-center justify-center p-2 text-center">
                  
                  {/* Confetti particle simulation check icon */}
                  <div className="w-14 h-14 bg-teal/10 rounded-full flex items-center justify-center text-teal mb-6">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  <h4 className="font-serif text-[24px] text-ink font-normal mb-1">
                    Registration Confirmed!
                  </h4>
                  <p className="font-sans text-[14px] text-ink-soft max-w-sm mb-8 leading-relaxed">
                    Welcome to the alliance, {formData.name}. Present this digital pass during departure check-in. Copy saved to {formData.email}.
                  </p>

                  {/* Highly Premium Digital Boarding Ticket Render */}
                  <div className="w-full max-w-sm bg-[#FBF7F0] border-2 border-dashed border-teal/20 rounded-2xl overflow-hidden shadow-md relative filter drop-shadow">
                    
                    {/* Top ticket collar */}
                    <div className="bg-teal text-white p-4 text-left flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase tracking-widest text-[#F7F3EC]/80">MEMBERSHIP SEAT</span>
                        <span className="font-serif text-lg leading-none font-bold">SAHAJ TOUR '26</span>
                      </div>
                      <div className="text-right flex flex-col">
                        <span className="text-[9px] uppercase tracking-widest text-[#F7F3EC]/80">TICKET STATUS</span>
                        <span className="text-xs font-mono font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded">CONFIRMED</span>
                      </div>
                    </div>

                    {/* Mid content block */}
                    <div className="p-5 flex flex-col gap-4 text-left font-sans text-xs text-ink-soft">
                      
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-ink-mute uppercase text-[9px] tracking-wider block">COMPANION / GUEST</span>
                          <span className="text-[14px] font-semibold text-ink leading-tight block mt-0.5">{formData.name}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-ink-mute uppercase text-[9px] tracking-wider block">TICKET ID</span>
                          <span className="text-[14px] font-mono font-semibold text-teal mt-0.5 block">{ticketId}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 border-t border-teal/10 pt-4">
                        <div>
                          <span className="text-ink-mute uppercase text-[9px] tracking-wider block">ROUTE SEGMENT</span>
                          <span className="text-[13px] font-medium text-ink block mt-0.5">{formData.city} ➔ SAHAJ SUMMIT</span>
                        </div>
                        <div>
                          <span className="text-ink-mute uppercase text-[9px] tracking-wider block">DEPARTURE DATE</span>
                          <span className="text-[13px] font-medium text-ink block mt-0.5">06 Nov 2026, 06:00 AM</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 border-t border-teal/10 pt-4 pb-1">
                        <div>
                          <span className="text-ink-mute uppercase text-[9px] tracking-wider block">DIETARY PACK</span>
                          <span className="text-[13px] font-medium text-teal block mt-0.5">{formData.dietary}</span>
                        </div>
                        <div>
                          <span className="text-ink-mute uppercase text-[9px] tracking-wider block">COLLABORATOR</span>
                          <span className="text-[13px] font-medium text-ink block mt-0.5">JITO NORTH ZONE</span>
                        </div>
                      </div>

                    </div>

                    {/* Bottom ticket stub separator */}
                    <div className="relative h-4 flex items-center justify-between pointer-events-none select-none px-1">
                      <div className="w-4 h-4 rounded-full bg-[#F7F3EC] -ml-3 border border-teal/10" />
                      <div className="w-full border-b border-dashed border-teal/25" />
                      <div className="w-4 h-4 rounded-full bg-[#F7F3EC] -mr-3 border border-teal/10" />
                    </div>

                    {/* Barcode representation */}
                    <div className="p-4 pb-5 flex flex-col items-center justify-center bg-[#FBF7F0]">
                      <div className="w-11/12 h-10 flex gap-0.5 items-stretch bg-ink-mute/5 p-1 select-none pointer-events-none">
                        {Array.from({ length: 42 }).map((_, bIdx) => {
                          const w = (bIdx % 3 === 0) ? 'w-1.5' : (bIdx % 5 === 0) ? 'w-[3px]' : 'w-[1px]';
                          const invisible = bIdx === 11 || bIdx === 24 || bIdx === 35;
                          return (
                            <div 
                              key={bIdx} 
                              className={`h-full bg-ink ${w} ${invisible ? 'bg-transparent' : 'opacity-85'}`} 
                            />
                          );
                        })}
                      </div>
                      <span className="font-mono text-[9px] tracking-[0.4em] text-ink-mute mt-2 uppercase select-none">
                        * {ticketId} *
                      </span>
                    </div>

                  </div>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      resetForm();
                      onClose();
                    }}
                    className="bg-teal hover:bg-teal-deep text-white px-7 py-3 rounded-xl font-sans font-semibold text-[14px] mt-8 cursor-pointer"
                  >
                    Done
                  </motion.button>
                </div>
              )}

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
