import type { ReactNode } from 'react';
import PolicyLayout from '../components/PolicyLayout';

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-10">
      <h2 className="font-serif font-bold text-[1.2rem] text-ink mb-3 pb-2 border-b border-teal/10">
        {title}
      </h2>
      <div className="text-[15px] text-ink/70 leading-relaxed space-y-3">
        {children}
      </div>
    </div>
  );
}

export default function RefundPage() {
  return (
    <PolicyLayout
      title="Refunds & Cancellations"
      subtitle="Please review our refund and cancellation policy carefully before completing your registration for Sahaj Summit 2026."
      lastUpdated="May 2026"
    >
      <div className="mt-8 p-5 rounded-2xl bg-orange/5 border border-orange/20">
        <p className="text-[15px] font-medium text-ink/80 leading-relaxed">
          <strong>Important:</strong> All registrations for Sahaj Summit 2026 are final and
          non-refundable once payment is successfully processed, except in the circumstances
          outlined below.
        </p>
      </div>

      <Section title="1. No-Refund Policy">
        <p>
          Due to the nature of the event — a limited-capacity spiritual retreat with pre-arranged
          food, logistics, and venue bookings — registration fees of <strong>₹1,000 per person</strong>{' '}
          are non-refundable once payment is made.
        </p>
        <p>
          This applies to all registrations regardless of the reason for cancellation by the
          participant, including personal emergencies, travel issues, or change of plans.
        </p>
      </Section>

      <Section title="2. Event Cancellation by Organiser">
        <p>
          In the unlikely event that Sahaj Summit 2026 is cancelled, postponed, or significantly
          altered by Sahaj Spirit Foundation due to reasons beyond our control (including natural
          disasters, government restrictions, or force majeure), all registered participants will be
          entitled to:
        </p>
        <ul className="list-disc list-outside ml-5 space-y-2 mt-2">
          <li>
            <strong>Full refund</strong> of the registration fee paid, credited to the original payment
            method used at the time of registration.
          </li>
          <li>
            Refunds will be processed within <strong>7–10 working days</strong> from the date of the
            official cancellation announcement.
          </li>
        </ul>
      </Section>

      <Section title="3. Duplicate / Erroneous Payments">
        <p>
          If you have been charged more than once for the same registration due to a technical error,
          please contact us immediately. We will investigate and process a refund for the duplicate
          charge within <strong>5–7 working days</strong>.
        </p>
      </Section>

      <Section title="4. How to Raise a Refund Request">
        <p>For eligible refund cases, write to us at:</p>
        <ul className="list-disc list-outside ml-5 space-y-2 mt-2">
          <li>
            Email:{' '}
            <a href="mailto:connect@sahajspirit.org" className="text-teal hover:underline">
              connect@sahajspirit.org
            </a>
          </li>
          <li>Phone: <a href="tel:+919837050110" className="text-teal hover:underline">+91 98370 50110</a> (Sandesh Jain)</li>
        </ul>
        <p className="mt-3">
          Please include your registered email address, mobile number, Razorpay transaction ID, and the
          reason for your refund request.
        </p>
      </Section>

      <Section title="5. Processing Timeline">
        <p>
          Once a refund is approved, the amount will be credited back to the original payment source
          (bank account, UPI, card) within <strong>5–10 working days</strong>, depending on your bank
          or payment provider.
        </p>
      </Section>
    </PolicyLayout>
  );
}
