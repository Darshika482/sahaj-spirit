import PolicyLayout from '../components/PolicyLayout';

export default function PricingPage() {
  return (
    <PolicyLayout
      title="Pricing"
      subtitle="Clear, transparent pricing for Sahaj Summit 2026. One price, everything included."
      lastUpdated="May 2026"
    >
      {/* Main price card */}
      <div className="mt-10 rounded-3xl border border-teal/20 bg-white/60 backdrop-blur-sm overflow-hidden">
        <div className="px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-teal/10">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-teal mb-2">
              Registration Fee
            </p>
            <h2 className="font-serif font-black text-[3rem] text-ink leading-none">
              ₹1,000
            </h2>
            <p className="text-[14px] text-ink/50 mt-1 font-mono">per person</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 border border-teal/20">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            <span className="text-[12px] font-medium text-teal">Registrations Open</span>
          </div>
        </div>

        <div className="px-8 py-8">
          <p className="text-[12px] font-mono uppercase tracking-[0.15em] text-ink/40 mb-5">
            What's Included
          </p>
          <ul className="space-y-3">
            {[
              'Access to all 9 immersive spiritual experiences',
              'Specialized Jain food (Chauvihar compliant, Satvik options available)',
              'Ancient temple walkathons on sacred Jain heritage grounds',
              'Live music, speaker sessions, and community gatherings',
              'Unique Member ID (SS-2026-XXXX) as your digital summit pass',
              'Digital registration confirmation sent to your email',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-[15px] text-ink/70">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Group registrations */}
      <div className="mt-8 rounded-2xl border border-teal/10 bg-teal/[0.03] px-7 py-7">
        <h3 className="font-serif font-bold text-[1.05rem] text-ink mb-3">Group Registrations</h3>
        <p className="text-[15px] text-ink/65 leading-relaxed">
          One person can register multiple participants in a single transaction. The total amount
          charged will be <strong>₹1,000 × number of members</strong>. Each member will receive their
          own unique Member ID (linked to the primary payer's contact details). There are no group
          discounts at this time.
        </p>
      </div>

      {/* Payment method */}
      <div className="mt-6 rounded-2xl border border-teal/10 bg-teal/[0.03] px-7 py-7">
        <h3 className="font-serif font-bold text-[1.05rem] text-ink mb-3">Payment Methods</h3>
        <p className="text-[15px] text-ink/65 leading-relaxed mb-4">
          Payments are processed securely via <strong>Razorpay</strong>. The following methods are accepted:
        </p>
        <ul className="list-disc list-outside ml-5 space-y-2 text-[15px] text-ink/65">
          <li>UPI (PhonePe, Google Pay, Paytm, BHIM, etc.)</li>
          <li>Debit cards and credit cards (Visa, Mastercard, RuPay)</li>
          <li>Net banking (all major Indian banks)</li>
          <li>Wallets (Paytm, Mobikwik, etc.)</li>
        </ul>
      </div>

      {/* GST note */}
      <div className="mt-6 rounded-2xl border border-orange/15 bg-orange/[0.03] px-7 py-6">
        <p className="text-[14px] text-ink/60 leading-relaxed">
          <strong>Note:</strong> The listed price of ₹1,000 per person is the final all-inclusive
          amount. There are no hidden charges, booking fees, or service surcharges.
        </p>
      </div>

      <div className="mt-10 text-[15px] text-ink/60 leading-relaxed">
        <p>
          For any pricing queries, contact us at{' '}
          <a href="mailto:connect@sahajspirit.org" className="text-teal hover:underline">
            connect@sahajspirit.org
          </a>
          .
        </p>
      </div>
    </PolicyLayout>
  );
}
