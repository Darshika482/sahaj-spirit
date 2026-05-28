import { useState } from 'react';
import type { InputHTMLAttributes, SelectHTMLAttributes } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SAHAJ_EASE } from '../lib/motion';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'members' | 'payer' | 'summary' | 'processing' | 'confirmed';

interface MemberForm {
  name: string;
  gender: string;
  age: string;
  dietary: string;
}

interface ConfirmedMember {
  id: string;
  member_id: string;
  name: string;
  gender: string;
  age: number;
  dietary: string;
}

const DIETARY_OPTIONS = [
  { value: 'Jain Food', label: 'Standard Jain Food (Chauvihar Compliant)' },
  { value: 'Strictly Satvik', label: 'Strictly Satvik (No Root Vegetables)' },
  { value: 'Vegan', label: 'Pure Vegan / Other' },
];

const GENDER_OPTIONS = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];

const emptyMember = (): MemberForm => ({
  name: '', gender: '', age: '', dietary: 'Jain Food',
});

declare global {
  interface Window { Razorpay: any; }
}

function loadRazorpayScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) return resolve();
    const s = document.createElement('script');
    s.src = 'https://checkout.razorpay.com/v1/checkout.js';
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('Failed to load Razorpay'));
    document.head.appendChild(s);
  });
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <span className="text-orange text-xs font-medium mt-0.5">{msg}</span>;
}

function Input({ label, error, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-sans font-medium text-[11px] uppercase tracking-wider text-ink/50">{label}</label>
      <input
        {...props}
        className={`w-full bg-[#FBF7F0] border ${error ? 'border-orange' : 'border-teal/20'} focus:border-teal rounded-xl px-4 py-3 font-sans text-[15px] focus:outline-none transition-colors`}
      />
      <FieldError msg={error} />
    </div>
  );
}

function Select({ label, error, children, ...props }: SelectHTMLAttributes<HTMLSelectElement> & { label: string; error?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-sans font-medium text-[11px] uppercase tracking-wider text-ink/50">{label}</label>
      <select
        {...props}
        className={`w-full bg-[#FBF7F0] border ${error ? 'border-orange' : 'border-teal/20'} focus:border-teal rounded-xl px-4 py-3 font-sans text-[15px] focus:outline-none transition-colors`}
      >
        {children}
      </select>
      <FieldError msg={error} />
    </div>
  );
}

export default function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  const [step, setStep] = useState<Step>('members');
  const [members, setMembers] = useState<MemberForm[]>([emptyMember()]);
  const [payer, setPayer] = useState({ name: '', email: '', mobile: '' });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmed, setConfirmed] = useState<ConfirmedMember[]>([]);
  const [payerName, setPayerName] = useState('');

  const FEE = parseInt(import.meta.env.VITE_REGISTRATION_FEE || '1000', 10);

  const reset = () => {
    setStep('members');
    setMembers([emptyMember()]);
    setPayer({ name: '', email: '', mobile: '' });
    setTermsAccepted(false);
    setErrors({});
    setConfirmed([]);
  };

  const handleClose = () => {
    if (step === 'confirmed') reset();
    onClose();
  };

  // ── Step 1: Members ─────────────────────────────────────────────────────────

  const updateMember = (idx: number, field: keyof MemberForm, value: string) => {
    setMembers(prev => prev.map((m, i) => i === idx ? { ...m, [field]: value } : m));
    setErrors(prev => { const e = { ...prev }; delete e[`m${idx}_${field}`]; return e; });
  };

  const addMember = () => setMembers(prev => [...prev, emptyMember()]);

  const removeMember = (idx: number) => {
    if (members.length === 1) return;
    setMembers(prev => prev.filter((_, i) => i !== idx));
  };

  const validateMembers = () => {
    const e: Record<string, string> = {};
    members.forEach((m, i) => {
      if (!m.name.trim()) e[`m${i}_name`] = 'Name is required';
      if (!m.gender) e[`m${i}_gender`] = 'Select a gender';
      if (!m.age.trim()) e[`m${i}_age`] = 'Age is required';
      else if (isNaN(Number(m.age)) || Number(m.age) < 5 || Number(m.age) > 100)
        e[`m${i}_age`] = 'Enter a valid age';
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Step 2: Payer ────────────────────────────────────────────────────────────

  const updatePayer = (field: keyof typeof payer, value: string) => {
    setPayer(prev => ({ ...prev, [field]: value }));
    setErrors(prev => { const e = { ...prev }; delete e[`p_${String(field)}`]; return e; });
  };

  const validatePayer = () => {
    const e: Record<string, string> = {};
    if (!payer.name.trim()) e.p_name = 'Your name is required';
    if (!payer.email.trim()) e.p_email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(payer.email)) e.p_email = 'Enter a valid email';
    if (!payer.mobile.trim()) e.p_mobile = 'Mobile number is required';
    else if (!/^[6-9]\d{9}$/.test(payer.mobile.replace(/\s/g, '')))
      e.p_mobile = 'Enter a valid 10-digit Indian mobile number';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Step 3: Pay ──────────────────────────────────────────────────────────────

  const handlePay = async () => {
    if (!termsAccepted) {
      setErrors({ terms: 'You must accept the Sahaj pledge to proceed' });
      return;
    }
    setErrors({});
    setStep('processing');

    try {
      await loadRazorpayScript();

      const orderRes = await fetch('/api/registration/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          payerName: payer.name,
          payerEmail: payer.email,
          payerMobile: payer.mobile,
          members: members.map(m => ({ ...m, age: parseInt(m.age, 10) })),
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error || 'Failed to create order');

      const rzp = new window.Razorpay({
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Sahaj Spirit Foundation',
        description: `Sahaj Summit 2026 — ${members.length} member${members.length > 1 ? 's' : ''}`,
        order_id: orderData.orderId,
        prefill: { name: payer.name, email: payer.email, contact: payer.mobile },
        theme: { color: '#2BA89E' },
        modal: { backdropclose: false },
        handler: async (response: any) => {
          try {
            const verifyRes = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                registrationId: orderData.registrationId,
              }),
            });
            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              setPayerName(payer.name);
              setConfirmed(verifyData.members);
              setStep('confirmed');
            } else {
              alert('Payment verification failed. Please contact connect@sahajspirit.org with your transaction ID.');
              setStep('summary');
            }
          } catch {
            alert('Error verifying payment. Please contact connect@sahajspirit.org');
            setStep('summary');
          }
        },
      });

      rzp.on('payment.failed', () => {
        setStep('summary');
      });

      rzp.open();
      setStep('summary');
    } catch (err: any) {
      setStep('summary');
      setErrors({ pay: err.message || 'Something went wrong. Please try again.' });
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────────

  const titles: Record<Step, string> = {
    members: "Who's Coming?",
    payer: 'Your Contact Details',
    summary: 'Review & Pay',
    processing: 'Processing...',
    confirmed: 'Booking Confirmed!',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-[#1A1A1A]/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5, ease: SAHAJ_EASE }}
            className="relative bg-[#F7F3EC] w-full max-w-lg rounded-2xl overflow-hidden border border-teal/15 shadow-[0_24px_64px_rgba(26,26,26,0.2)] max-h-[90vh] flex flex-col pointer-events-auto show-system-cursor"
          >
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal via-orange to-teal" />

            {/* Header */}
            <div className="p-6 pb-4 flex justify-between items-start border-b border-teal/10 mt-1.5">
              <div>
                <span className="font-sans font-bold text-[10px] uppercase tracking-widest text-teal">
                  SAHAJ SUMMIT • 6 SEP 2026
                </span>
                <h3 className="font-serif text-[22px] text-ink mt-0.5 font-medium leading-tight">
                  {titles[step]}
                </h3>
              </div>
              <button
                onClick={handleClose}
                className="text-ink hover:text-teal w-8 h-8 rounded-full flex items-center justify-center bg-teal/5 transition-colors cursor-pointer flex-shrink-0 mt-0.5"
              >
                ✕
              </button>
            </div>

            {/* Step progress bar (not on processing/confirmed) */}
            {(step === 'members' || step === 'payer' || step === 'summary') && (
              <div className="flex px-6 py-3 gap-2">
                {(['members', 'payer', 'summary'] as const).map((s, i) => (
                  <div key={s} className={`h-0.5 flex-1 rounded-full transition-colors duration-300 ${
                    i <= ['members', 'payer', 'summary'].indexOf(step) ? 'bg-teal' : 'bg-teal/15'
                  }`} />
                ))}
              </div>
            )}

            {/* Scrollable content */}
            <div className="overflow-y-auto p-6 pt-3 flex-1">

              {/* ── STEP 1: Members ── */}
              {step === 'members' && (
                <div className="flex flex-col gap-4">
                  <p className="text-[13px] text-ink/55 leading-relaxed">
                    Add every person attending. Each person is ₹{FEE.toLocaleString('en-IN')}.
                  </p>

                  {members.map((m, idx) => (
                    <div key={idx} className="bg-white/50 border border-teal/10 rounded-2xl p-4 flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <span className="font-sans font-bold text-[11px] uppercase tracking-widest text-teal">
                          Member {idx + 1}
                        </span>
                        {members.length > 1 && (
                          <button
                            onClick={() => removeMember(idx)}
                            className="text-[11px] text-ink/40 hover:text-orange transition-colors cursor-pointer"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <Input
                        label="Full Name"
                        placeholder="e.g. Priyal Jain"
                        value={m.name}
                        onChange={e => updateMember(idx, 'name', e.target.value)}
                        error={errors[`m${idx}_name`]}
                      />

                      <div className="grid grid-cols-2 gap-3">
                        <Select
                          label="Gender"
                          value={m.gender}
                          onChange={e => updateMember(idx, 'gender', e.target.value)}
                          error={errors[`m${idx}_gender`]}
                        >
                          <option value="">Select</option>
                          {GENDER_OPTIONS.map(g => <option key={g} value={g}>{g}</option>)}
                        </Select>
                        <Input
                          label="Age"
                          type="number"
                          placeholder="e.g. 22"
                          min="5"
                          max="100"
                          value={m.age}
                          onChange={e => updateMember(idx, 'age', e.target.value)}
                          error={errors[`m${idx}_age`]}
                        />
                      </div>

                      <Select
                        label="Dietary Preference"
                        value={m.dietary}
                        onChange={e => updateMember(idx, 'dietary', e.target.value)}
                      >
                        {DIETARY_OPTIONS.map(d => (
                          <option key={d.value} value={d.value}>{d.label}</option>
                        ))}
                      </Select>
                    </div>
                  ))}

                  <button
                    onClick={addMember}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-dashed border-teal/30 text-teal text-[13px] font-medium hover:bg-teal/5 transition-colors cursor-pointer"
                  >
                    <span className="text-lg leading-none">+</span> Add Another Member
                  </button>

                  <div className="flex justify-between items-center pt-2 text-[13px] text-ink/60">
                    <span>{members.length} member{members.length > 1 ? 's' : ''}</span>
                    <span className="font-mono font-bold text-ink">
                      ₹{(members.length * FEE).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { if (validateMembers()) setStep('payer'); }}
                    className="bg-teal text-white w-full py-3.5 rounded-xl font-sans font-bold text-[15px] mt-1 cursor-pointer hover:bg-teal/90 transition-colors"
                  >
                    Continue
                  </motion.button>
                </div>
              )}

              {/* ── STEP 2: Payer ── */}
              {step === 'payer' && (
                <div className="flex flex-col gap-4">
                  <p className="text-[13px] text-ink/55 leading-relaxed">
                    The person completing payment. Confirmation will be sent to this email.
                  </p>

                  <Input
                    label="Your Full Name"
                    placeholder="e.g. Rahul Shah"
                    value={payer.name}
                    onChange={e => updatePayer('name', e.target.value)}
                    error={errors.p_name}
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="e.g. rahul@domain.com"
                    value={payer.email}
                    onChange={e => updatePayer('email', e.target.value)}
                    error={errors.p_email}
                  />
                  <Input
                    label="Mobile Number"
                    type="tel"
                    placeholder="10-digit Indian number"
                    value={payer.mobile}
                    onChange={e => updatePayer('mobile', e.target.value)}
                    error={errors.p_mobile}
                  />

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setStep('members')}
                      className="flex-1 py-3.5 rounded-xl border border-teal/20 text-teal font-bold text-[15px] hover:bg-teal/5 transition-colors cursor-pointer"
                    >
                      Back
                    </button>
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={() => { if (validatePayer()) setStep('summary'); }}
                      className="flex-[2] bg-teal text-white py-3.5 rounded-xl font-sans font-bold text-[15px] cursor-pointer hover:bg-teal/90 transition-colors"
                    >
                      Review Order
                    </motion.button>
                  </div>
                </div>
              )}

              {/* ── STEP 3: Summary ── */}
              {step === 'summary' && (
                <div className="flex flex-col gap-5">
                  {/* Members summary */}
                  <div>
                    <p className="text-[11px] font-mono uppercase tracking-widest text-teal mb-3">
                      Registered Members
                    </p>
                    <div className="flex flex-col gap-2">
                      {members.map((m, i) => (
                        <div key={i} className="flex items-center justify-between bg-white/50 border border-teal/10 rounded-xl px-4 py-3">
                          <div>
                            <p className="font-medium text-[14px] text-ink">{m.name}</p>
                            <p className="text-[12px] text-ink/45 mt-0.5">{m.gender} · Age {m.age} · {m.dietary}</p>
                          </div>
                          <span className="font-mono text-[13px] text-ink/50">₹{FEE.toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payer summary */}
                  <div className="bg-teal/[0.04] border border-teal/10 rounded-xl px-4 py-4">
                    <p className="text-[11px] font-mono uppercase tracking-widest text-teal mb-2">Payment By</p>
                    <p className="font-medium text-[14px] text-ink">{payer.name}</p>
                    <p className="text-[13px] text-ink/50 mt-0.5">{payer.email} · {payer.mobile}</p>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center border-t border-teal/10 pt-4">
                    <span className="font-medium text-[15px] text-ink">
                      {members.length} × ₹{FEE.toLocaleString('en-IN')}
                    </span>
                    <span className="font-serif font-black text-[1.5rem] text-ink">
                      ₹{(members.length * FEE).toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Pledge */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={e => {
                        setTermsAccepted(e.target.checked);
                        if (e.target.checked) setErrors(prev => { const x = {...prev}; delete x.terms; return x; });
                      }}
                      className="mt-1 accent-teal h-4 w-4 flex-shrink-0"
                    />
                    <span className="text-[13px] leading-relaxed text-ink/60">
                      I pledge to maintain a spirit of non-violence (Ahimsa), self-discipline,
                      respect, and simplicity at Sahaj Summit 2026. I have read the{' '}
                      <a href="/terms" target="_blank" className="text-teal hover:underline">Terms</a>,{' '}
                      <a href="/refund" target="_blank" className="text-teal hover:underline">Refund Policy</a>,
                      and agree that all registrations are non-refundable.
                    </span>
                  </label>
                  {errors.terms && <FieldError msg={errors.terms} />}
                  {errors.pay && (
                    <div className="bg-orange/5 border border-orange/20 rounded-xl px-4 py-3 text-[13px] text-orange">
                      {errors.pay}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep('payer')}
                      className="flex-1 py-3.5 rounded-xl border border-teal/20 text-teal font-bold text-[15px] hover:bg-teal/5 transition-colors cursor-pointer"
                    >
                      Back
                    </button>
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={handlePay}
                      className="flex-[2] bg-orange hover:bg-orange/90 text-white py-3.5 rounded-xl font-sans font-bold text-[15px] cursor-pointer shadow-[0_8px_20px_-8px_rgba(243,112,33,0.4)] transition-colors"
                    >
                      Pay ₹{(members.length * FEE).toLocaleString('en-IN')}
                    </motion.button>
                  </div>
                </div>
              )}

              {/* ── STEP 4: Processing ── */}
              {step === 'processing' && (
                <div className="flex flex-col items-center justify-center py-12 gap-4">
                  <div className="w-12 h-12 rounded-full border-2 border-teal border-t-transparent animate-spin" />
                  <p className="text-[15px] text-ink/60">Opening payment gateway...</p>
                </div>
              )}

              {/* ── STEP 5: Confirmed ── */}
              {step === 'confirmed' && (
                <div className="flex flex-col items-center gap-6 py-2 text-center">
                  <div className="w-14 h-14 bg-teal/10 rounded-full flex items-center justify-center text-teal">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  <div>
                    <h4 className="font-serif text-[24px] text-ink font-normal">Booking Confirmed!</h4>
                    <p className="text-[13px] text-ink/50 mt-2 leading-relaxed max-w-xs mx-auto">
                      Welcome, {payerName}. Confirmation sent to <strong>{payer.email}</strong>.
                      Present your Member ID at the event.
                    </p>
                  </div>

                  <div className="w-full flex flex-col gap-2">
                    {confirmed.length > 0 ? confirmed.map((m) => (
                      <div key={m.id} className="flex items-center justify-between bg-white/60 border border-teal/15 rounded-xl px-4 py-3 text-left">
                        <div>
                          <p className="font-medium text-[14px] text-ink">{m.name}</p>
                          <p className="text-[12px] text-ink/45 mt-0.5">{m.gender} · Age {m.age}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-mono font-bold text-teal text-[14px]">{m.member_id}</p>
                          <p className="text-[10px] text-ink/35 uppercase tracking-wider mt-0.5">Member ID</p>
                        </div>
                      </div>
                    )) : (
                      <div className="bg-teal/5 border border-teal/15 rounded-xl px-4 py-4 text-[13px] text-ink/60">
                        Your Member IDs are being generated and will be emailed to you shortly.
                      </div>
                    )}
                  </div>

                  <div className="bg-[#FBF7F0] border border-teal/10 rounded-xl px-4 py-3 w-full text-left">
                    <p className="text-[11px] text-ink/40 font-mono uppercase tracking-wider mb-1">Event Details</p>
                    <p className="text-[13px] text-ink/70">Sahaj Summit 2026 · September 6, 2026</p>
                    <p className="text-[13px] text-ink/50 mt-0.5">Sacred Jain Heritage Site, India</p>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { reset(); onClose(); }}
                    className="bg-teal text-white px-8 py-3 rounded-xl font-sans font-semibold text-[14px] cursor-pointer w-full"
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
