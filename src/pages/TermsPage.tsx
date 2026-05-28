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

export default function TermsPage() {
  return (
    <PolicyLayout
      title="Terms & Conditions"
      subtitle="By registering for Sahaj Summit 2026, you agree to the following terms. Please read them carefully before completing your registration."
      lastUpdated="May 2026"
    >
      <Section title="1. About the Event">
        <p>
          Sahaj Summit 2026 is a spiritual retreat organised by Sahaj Spirit Foundation, scheduled for
          <strong> September 6, 2026</strong>, at a sacred Jain heritage site in India. The event brings
          together over 500 participants for nine immersive experiences rooted in Jain philosophy and values.
        </p>
      </Section>

      <Section title="2. Eligibility">
        <p>
          The event is open to all individuals who share values of non-violence, simplicity, and
          self-discipline. While the target age group is 15–35 years, participation is at the sole
          discretion of Sahaj Spirit Foundation. Registration of minors (below 18) must be completed by a
          parent or legal guardian who accepts these terms on their behalf.
        </p>
      </Section>

      <Section title="3. Registration & Payment">
        <ul className="list-disc list-outside ml-5 space-y-2">
          <li>Registration is confirmed only upon successful payment of ₹1,000 per person.</li>
          <li>
            One payer may register multiple members in a single transaction. Each registered member will
            receive a unique Member ID (e.g., SS-2026-XXXX) linked to the payment.
          </li>
          <li>Payments are processed securely via Razorpay. Sahaj Spirit Foundation does not store card details.</li>
          <li>Registrations are non-transferable unless explicitly approved by the organisers.</li>
        </ul>
      </Section>

      <Section title="4. Code of Conduct">
        <p>All participants are expected to uphold the following pledge for the duration of the event:</p>
        <blockquote className="border-l-2 border-teal/30 pl-4 mt-3 text-ink/60 italic">
          "I pledge to maintain a spirit of non-violence (Ahimsa), self-discipline, respect, and
          simplicity during this holy companion walk at the Sahaj Summit."
        </blockquote>
        <p className="mt-3">Specifically, participants must:</p>
        <ul className="list-disc list-outside ml-5 space-y-2 mt-2">
          <li>Refrain from bringing or consuming alcohol, tobacco, non-vegetarian food, or intoxicants.</li>
          <li>Respect the sanctity of the sacred venue and all fellow participants.</li>
          <li>Follow all instructions given by event organisers and volunteers.</li>
          <li>Dress modestly and appropriately for the spiritual setting.</li>
        </ul>
        <p className="mt-3">
          Sahaj Spirit Foundation reserves the right to remove any participant who violates the code of
          conduct, without a refund.
        </p>
      </Section>

      <Section title="5. Photography & Media">
        <p>
          By attending, you grant Sahaj Spirit Foundation a royalty-free, non-exclusive licence to use
          photographs, videos, or audio recordings of you taken at the event for promotional, educational,
          and archival purposes across all media, including social media and the website.
        </p>
      </Section>

      <Section title="6. Event Changes & Cancellation by Organiser">
        <p>
          Sahaj Spirit Foundation reserves the right to modify the event schedule, speakers, activities, or
          venue at any time without prior notice. In the unlikely event that the event is cancelled by the
          organisers, all registered participants will receive a full refund processed within 7–10 working
          days to the original payment method.
        </p>
      </Section>

      <Section title="7. Liability">
        <p>
          Sahaj Spirit Foundation is not liable for any personal injury, loss of property, or other damages
          sustained during the event unless caused by gross negligence of the organisers. Participants attend
          at their own risk and are responsible for their own health, travel, and accommodation arrangements.
        </p>
      </Section>

      <Section title="8. Governing Law">
        <p>
          These terms are governed by the laws of India. Any disputes arising from registration or
          participation in Sahaj Summit 2026 shall be subject to the exclusive jurisdiction of courts in
          India.
        </p>
      </Section>

      <Section title="9. Contact">
        <p>
          For queries regarding these terms, write to us at{' '}
          <a href="mailto:connect@sahajspirit.org" className="text-teal hover:underline">
            connect@sahajspirit.org
          </a>
          .
        </p>
      </Section>
    </PolicyLayout>
  );
}
