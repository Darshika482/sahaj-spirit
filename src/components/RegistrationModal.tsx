import { useState } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SAHAJ_EASE } from '../lib/motion';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'form' | 'summary' | 'processing' | 'confirmed';

interface MainPerson {
  name: string;
  age: string;
  gender: string;
  email: string;
  mobile: string;
}

interface ExtraMember {
  name: string;
  age: string;
  gender: string;
}

interface ConfirmedMember {
  id: string;
  member_id: string;
  name: string;
  age: number;
  gender: string;
}

const GENDER_OPTIONS = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];

const emptyExtra = (): ExtraMember => ({ name: '', age: '', gender: '' });

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
  return <span className="text-orange text-xs font-medium">{msg}</span>;
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-sans font-medium text-[11px] uppercase tracking-wider text-ink/50">{label}</label>
      {children}
      <FieldError msg={error} />
    </div>
  );
}

function TextInput({ error, ...props }: InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
  return (
    <input
      {...props}
      className={`w-full bg-[#FBF7F0] border ${error ? 'border-orange' : 'border-teal/20'} focus:border-teal rounded-xl px-4 py-3 font-sans text-[15px] focus:outline-none transition-colors`}
    />
  );
}

function GenderSelect({ value, onChange, error }: { value: string; onChange: (v: string) => void; error?: string }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className={`w-full bg-[#FBF7F0] border ${error ? 'border-orange' : 'border-teal/20'} focus:border-teal rounded-xl px-4 py-3 font-sans text-[15px] focus:outline-none transition-colors`}
    >
      <option value="">Select</option>
      {GENDER_OPTIONS.map(g => <option key={g} value={g}>{g}</option>)}
    </select>
  );
}

export default function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  const FEE = parseInt(import.meta.env.VITE_REGISTRATION_FEE || '1000', 10);

  const [step, setStep] = useState<Step>('form');
  const [main, setMain] = useState<MainPerson>({ name: '', age: '', gender: '', email: '', mobile: '' });
  const [extras, setExtras] = useState<ExtraMember[]>([]);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmed, setConfirmed] = useState<ConfirmedMember[]>([]);
  const [payError, setPayError] = useState('');

  const totalMembers = 1 + extras.length;

  const reset = () => {
    setStep('form');
    setMain({ name: '', age: '', gender: '', email: '', mobile: '' });
    setExtras([]);
    setTermsAccepted(false);
    setErrors({});
    setConfirmed([]);
    setPayError('');
  };

  const handleClose = () => {
    if (step === 'confirmed') reset();
    onClose();
  };

  // ── Main person field helpers ────────────────────────────────────────────────

  const setMainField = (field: keyof MainPerson, value: string) => {
    setMain(prev => ({ ...prev, [field]: value }));
    setErrors(prev => { const e = { ...prev }; delete e[field]; return e; });
  };

  // ── Extra member helpers ─────────────────────────────────────────────────────

  const setExtraField = (idx: number, field: keyof ExtraMember, value: string) => {
    setExtras(prev => prev.map((m, i) => i === idx ? { ...m, [field]: value } : m));
    setErrors(prev => { const e = { ...prev }; delete e[`x${idx}_${field}`]; return e; });
  };

  const addExtra = () => setExtras(prev => [...prev, emptyExtra()]);
  const removeExtra = (idx: number) => setExtras(prev => prev.filter((_, i) => i !== idx));

  // ── Validation ───────────────────────────────────────────────────────────────

  const validate = (): boolean => {
    const e: Record<string, string> = {};

    if (!main.name.trim()) e.name = 'Name is required';
    if (!main.age.trim()) e.age = 'Age is required';
    else if (isNaN(Number(main.age)) || Number(main.age) < 5 || Number(main.age) > 100)
      e.age = 'Enter a valid age';
    if (!main.gender) e.gender = 'Select a gender';
    if (!main.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(main.email)) e.email = 'Enter a valid email';
    if (!main.mobile.trim()) e.mobile = 'Mobile number is required';
    else if (!/^[6-9]\d{9}$/.test(main.mobile.replace(/\s/g, '')))
      e.mobile = 'Enter a valid 10-digit Indian mobile';

    extras.forEach((m, i) => {
      if (!m.name.trim()) e[`x${i}_name`] = 'Name is required';
      if (!m.age.trim()) e[`x${i}_age`] = 'Age is required';
      else if (isNaN(Number(m.age)) || Number(m.age) < 5 || Number(m.age) > 100)
        e[`x${i}_age`] = 'Enter a valid age';
      if (!m.gender) e[`x${i}_gender`] = 'Select a gender';
    });

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Payment ──────────────────────────────────────────────────────────────────

  const handlePay = async () => {
    if (!termsAccepted) {
      setPayError('You must accept the Sahaj pledge to proceed');
      return;
    }
    setPayError('');
    setStep('processing');

    try {
      await loadRazorpayScript();

      const allMembers = [
        { name: main.name, age: parseInt(main.age, 10), gender: main.gender },
        ...extras.map(m => ({ name: m.name, age: parseInt(m.age, 10), gender: m.gender })),
      ];

      const orderRes = await fetch('/api/registration/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          payerName: main.name,
          payerEmail: main.email,
          payerMobile: main.mobile,
          members: allMembers,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error || 'Failed to create order');

      const rzp = new window.Razorpay({
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Sahaj Spirit Foundation',
        description: `Sahaj Summit 2026 — ${totalMembers} member${totalMembers > 1 ? 's' : ''}`,
        order_id: orderData.orderId,
        prefill: { name: main.name, email: main.email, contact: main.mobile },
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
            const data = await verifyRes.json();
            if (data.success) {
              setConfirmed(data.members);
              setStep('confirmed');
            } else {
              setPayError('Payment verification failed. Contact connect@sahajspirit.org with your transaction ID.');
              setStep('summary');
            }
          } catch {
            setPayError('Error verifying payment. Contact connect@sahajspirit.org');
            setStep('summary');
          }
        },
      });

      rzp.on('payment.failed', () => setStep('summary'));
      rzp.open();
      // Show summary again while the Razorpay popup is open
      setStep('summary');
    } catch (err: any) {
      setPayError(err.message || 'Something went wrong. Please try again.');
      setStep('summary');
    }
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
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal via-orange to-teal" />

            {/* Header */}
            <div className="p-6 pb-4 flex justify-between items-start border-b border-teal/10 mt-1.5">
              <div>
                <span className="font-sans font-bold text-[10px] uppercase tracking-widest text-teal">
                  SAHAJ SUMMIT · 6 SEP 2026
                </span>
                <h3 className="font-serif text-[22px] text-ink mt-0.5 font-medium leading-tight">
                  {step === 'form' ? 'Register for the Summit' :
                   step === 'summary' ? 'Review & Pay' :
                   step === 'processing' ? 'Opening Payment...' :
                   'Booking Confirmed!'}
                </h3>
              </div>
              <button
                onClick={handleClose}
                className="text-ink hover:text-teal w-8 h-8 rounded-full flex items-center justify-center bg-teal/5 transition-colors cursor-pointer flex-shrink-0 mt-0.5"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto p-6 pt-4 flex-1">

              {/* ── FORM ── */}
              {step === 'form' && (
                <div className="flex flex-col gap-6">

                  {/* Main person */}
                  <div>
                    <p className="text-[11px] font-mono uppercase tracking-widest text-teal mb-4">
                      Your Details
                    </p>
                    <div className="flex flex-col gap-3">
                      <Field label="Full Name" error={errors.name}>
                        <TextInput
                          placeholder="e.g. Priyal Jain"
                          value={main.name}
                          onChange={e => setMainField('name', e.target.value)}
                          error={errors.name}
                        />
                      </Field>

                      <div className="grid grid-cols-2 gap-3">
                        <Field label="Age" error={errors.age}>
                          <TextInput
                            type="number"
                            placeholder="e.g. 22"
                            min="5"
                            max="100"
                            value={main.age}
                            onChange={e => setMainField('age', e.target.value)}
                            error={errors.age}
                          />
                        </Field>
                        <Field label="Gender" error={errors.gender}>
                          <GenderSelect
                            value={main.gender}
                            onChange={v => setMainField('gender', v)}
                            error={errors.gender}
                          />
                        </Field>
                      </div>

                      <Field label="Email Address" error={errors.email}>
                        <TextInput
                          type="email"
                          placeholder="e.g. priyal@domain.com"
                          value={main.email}
                          onChange={e => setMainField('email', e.target.value)}
                          error={errors.email}
                        />
                      </Field>

                      <Field label="Mobile Number" error={errors.mobile}>
                        <TextInput
                          type="tel"
                          placeholder="10-digit Indian number"
                          value={main.mobile}
                          onChange={e => setMainField('mobile', e.target.value)}
                          error={errors.mobile}
                        />
                      </Field>
                    </div>
                  </div>

                  {/* Extra members */}
                  {extras.length > 0 && (
                    <div className="flex flex-col gap-3">
                      <p className="text-[11px] font-mono uppercase tracking-widest text-teal">
                        Additional Members
                      </p>
                      {extras.map((m, i) => (
                        <div key={i} className="bg-white/50 border border-teal/10 rounded-2xl p-4 flex flex-col gap-3">
                          <div className="flex justify-between items-center">
                            <span className="text-[11px] font-medium text-ink/50 uppercase tracking-wider">
                              Member {i + 2}
                            </span>
                            <button
                              onClick={() => removeExtra(i)}
                              className="text-[11px] text-ink/35 hover:text-orange transition-colors cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                          <Field label="Full Name" error={errors[`x${i}_name`]}>
                            <TextInput
                              placeholder="e.g. Rahul Shah"
                              value={m.name}
                              onChange={e => setExtraField(i, 'name', e.target.value)}
                              error={errors[`x${i}_name`]}
                            />
                          </Field>
                          <div className="grid grid-cols-2 gap-3">
                            <Field label="Age" error={errors[`x${i}_age`]}>
                              <TextInput
                                type="number"
                                placeholder="e.g. 24"
                                min="5"
                                max="100"
                                value={m.age}
                                onChange={e => setExtraField(i, 'age', e.target.value)}
                                error={errors[`x${i}_age`]}
                              />
                            </Field>
                            <Field label="Gender" error={errors[`x${i}_gender`]}>
                              <GenderSelect
                                value={m.gender}
                                onChange={v => setExtraField(i, 'gender', v)}
                                error={errors[`x${i}_gender`]}
                              />
                            </Field>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={addExtra}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-dashed border-teal/25 text-teal text-[13px] font-medium hover:bg-teal/5 transition-colors cursor-pointer"
                  >
                    <span className="text-lg leading-none">+</span>
                    Add Another Member
                  </button>

                  {/* Fee summary */}
                  <div className="flex justify-between items-center text-[13px] text-ink/50 border-t border-teal/10 pt-4">
                    <span>{totalMembers} member{totalMembers > 1 ? 's' : ''} × ₹{FEE.toLocaleString('en-IN')}</span>
                    <span className="font-mono font-bold text-ink text-[16px]">
                      ₹{(totalMembers * FEE).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { if (validate()) setStep('summary'); }}
                    className="bg-teal text-white w-full py-3.5 rounded-xl font-sans font-bold text-[15px] cursor-pointer hover:bg-teal/90 transition-colors"
                  >
                    Continue
                  </motion.button>
                </div>
              )}

              {/* ── SUMMARY ── */}
              {step === 'summary' && (
                <div className="flex flex-col gap-5">

                  {/* All members */}
                  <div>
                    <p className="text-[11px] font-mono uppercase tracking-widest text-teal mb-3">
                      All Members
                    </p>
                    <div className="flex flex-col gap-2">
                      {[{ name: main.name, age: main.age, gender: main.gender }, ...extras].map((m, i) => (
                        <div key={i} className="flex items-center justify-between bg-white/50 border border-teal/10 rounded-xl px-4 py-3">
                          <div>
                            <p className="font-medium text-[14px] text-ink">
                              {m.name}
                              {i === 0 && <span className="ml-2 text-[10px] text-teal font-mono uppercase tracking-wider">(payer)</span>}
                            </p>
                            <p className="text-[12px] text-ink/40 mt-0.5">{m.gender} · Age {m.age}</p>
                          </div>
                          <span className="font-mono text-[13px] text-ink/40">₹{FEE.toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="bg-teal/[0.04] border border-teal/10 rounded-xl px-4 py-4">
                    <p className="text-[11px] font-mono uppercase tracking-widest text-teal mb-2">Confirmation will be sent to</p>
                    <p className="font-medium text-[14px] text-ink">{main.email}</p>
                    <p className="text-[13px] text-ink/45 mt-0.5">{main.mobile}</p>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center border-t border-teal/10 pt-3">
                    <span className="text-[14px] text-ink/60">
                      {totalMembers} × ₹{FEE.toLocaleString('en-IN')}
                    </span>
                    <span className="font-serif font-black text-[1.6rem] text-ink">
                      ₹{(totalMembers * FEE).toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Pledge */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={e => {
                        setTermsAccepted(e.target.checked);
                        if (e.target.checked) setPayError('');
                      }}
                      className="mt-1 accent-teal h-4 w-4 flex-shrink-0"
                    />
                    <span className="text-[13px] leading-relaxed text-ink/55">
                      I pledge to maintain a spirit of non-violence (Ahimsa), self-discipline, respect,
                      and simplicity at Sahaj Summit 2026. I have read the{' '}
                      <a href="/terms" target="_blank" className="text-teal hover:underline">Terms</a> and{' '}
                      <a href="/refund" target="_blank" className="text-teal hover:underline">Refund Policy</a>{' '}
                      and agree that registrations are non-refundable.
                    </span>
                  </label>

                  {payError && (
                    <div className="bg-orange/5 border border-orange/20 rounded-xl px-4 py-3 text-[13px] text-orange">
                      {payError}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep('form')}
                      className="flex-1 py-3.5 rounded-xl border border-teal/20 text-teal font-bold text-[15px] hover:bg-teal/5 transition-colors cursor-pointer"
                    >
                      Back
                    </button>
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={handlePay}
                      className="flex-[2] bg-orange hover:bg-orange/90 text-white py-3.5 rounded-xl font-sans font-bold text-[15px] cursor-pointer shadow-[0_8px_20px_-8px_rgba(243,112,33,0.4)] transition-colors"
                    >
                      Pay ₹{(totalMembers * FEE).toLocaleString('en-IN')}
                    </motion.button>
                  </div>
                </div>
              )}

              {/* ── PROCESSING ── */}
              {step === 'processing' && (
                <div className="flex flex-col items-center justify-center py-14 gap-4">
                  <div className="w-12 h-12 rounded-full border-2 border-teal border-t-transparent animate-spin" />
                  <p className="text-[15px] text-ink/55">Opening payment gateway...</p>
                </div>
              )}

              {/* ── CONFIRMED ── */}
              {step === 'confirmed' && (
                <div className="flex flex-col items-center gap-5 py-2 text-center">
                  <div className="w-14 h-14 bg-teal/10 rounded-full flex items-center justify-center text-teal">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  <div>
                    <h4 className="font-serif text-[24px] text-ink font-normal">All Set, {main.name.split(' ')[0]}!</h4>
                    <p className="text-[13px] text-ink/45 mt-1.5 leading-relaxed max-w-xs mx-auto">
                      Confirmation sent to <strong>{main.email}</strong>.<br />
                      Present your Member ID at the event.
                    </p>
                  </div>

                  <div className="w-full flex flex-col gap-2">
                    {confirmed.length > 0 ? (
                      confirmed.map(m => (
                        <div key={m.id} className="flex items-center justify-between bg-white/60 border border-teal/15 rounded-xl px-4 py-3 text-left">
                          <div>
                            <p className="font-medium text-[14px] text-ink">{m.name}</p>
                            <p className="text-[12px] text-ink/40 mt-0.5">{m.gender} · Age {m.age}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-mono font-bold text-teal text-[14px]">{m.member_id}</p>
                            <p className="text-[10px] text-ink/30 uppercase tracking-wider mt-0.5">Member ID</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="bg-teal/5 border border-teal/10 rounded-xl px-4 py-4 text-[13px] text-ink/55">
                        Member IDs are being generated and will be sent to your email shortly.
                      </div>
                    )}
                  </div>

                  <div className="bg-[#FBF7F0] border border-teal/10 rounded-xl px-4 py-3 w-full text-left">
                    <p className="text-[11px] text-ink/35 font-mono uppercase tracking-wider mb-1">Event</p>
                    <p className="text-[13px] text-ink/65">Sahaj Summit 2026 · September 6, 2026</p>
                    <p className="text-[13px] text-ink/40 mt-0.5">Sacred Jain Heritage Site, India</p>
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
