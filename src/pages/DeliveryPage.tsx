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

export default function DeliveryPage() {
  return (
    <PolicyLayout
      title="Delivery & Confirmation Policy"
      subtitle="Sahaj Summit 2026 is a live in-person event. There are no physical goods shipped. This policy explains how your registration confirmation and Member IDs are delivered."
      lastUpdated="May 2026"
    >
      <div className="mt-8 p-5 rounded-2xl bg-teal/5 border border-teal/15">
        <p className="text-[15px] text-ink/75 leading-relaxed">
          All registrations are for attendance at a <strong>physical event</strong> (Sahaj Summit 2026,
          September 6, 2026). No physical goods, merchandise, or tickets are shipped.
          All confirmations are delivered digitally.
        </p>
      </div>

      <Section title="1. Registration Confirmation">
        <p>
          Upon successful payment, a registration confirmation will be sent to the email address
          provided by the payer. This confirmation will include:
        </p>
        <ul className="list-disc list-outside ml-5 space-y-2 mt-2">
          <li>Unique Member ID(s) for each registered participant (format: SS-2026-XXXX)</li>
          <li>Summary of all registered members (name, age, gender)</li>
          <li>Event date, time, and venue details</li>
          <li>Razorpay transaction reference number</li>
        </ul>
      </Section>

      <Section title="2. Delivery Timeline">
        <p>
          Confirmation emails are delivered digitally within{' '}
          <strong>2–4 hours of successful payment</strong>. In most cases, delivery is near-instant
          (within minutes).
        </p>
        <p>
          In rare cases involving payment gateway delays or server issues, delivery may take up to{' '}
          <strong>24 hours (maximum)</strong>.
        </p>
      </Section>

      <Section title="3. No Physical Shipping">
        <p>
          Sahaj Spirit Foundation does not ship any physical items as part of the registration process.
          There are no physical tickets, passes, or merchandise included in the registration fee.
          Entry to the event will be managed via digital Member IDs and on-site verification.
        </p>
      </Section>

      <Section title="4. What to Do If You Don't Receive Confirmation">
        <p>
          If you have not received your confirmation email within 24 hours of payment, please:
        </p>
        <ul className="list-disc list-outside ml-5 space-y-2 mt-2">
          <li>Check your spam / junk folder</li>
          <li>
            Email us at{' '}
            <a href="mailto:connect@sahajspirit.org" className="text-teal hover:underline">
              connect@sahajspirit.org
            </a>{' '}
            with your registered mobile number and Razorpay transaction ID
          </li>
          <li>
            Call{' '}
            <a href="tel:+919837050110" className="text-teal hover:underline">
              +91 98370 50110
            </a>{' '}
            (Sandesh Jain)
          </li>
        </ul>
      </Section>

      <Section title="5. Event Venue & On-Site Delivery">
        <p>
          The Sahaj Summit 2026 is held at a sacred Jain heritage site in India. Further venue details,
          travel guidance, and on-site schedule will be shared with all confirmed registrants via email
          at least <strong>14 days before the event</strong> (by August 23, 2026).
        </p>
      </Section>
    </PolicyLayout>
  );
}
