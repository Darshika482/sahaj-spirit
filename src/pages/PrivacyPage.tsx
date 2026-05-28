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

export default function PrivacyPage() {
  return (
    <PolicyLayout
      title="Privacy Policy"
      subtitle="Sahaj Spirit Foundation respects your privacy. This policy explains what personal data we collect, why we collect it, and how it is used and protected."
      lastUpdated="May 2026"
    >
      <Section title="1. Who We Are">
        <p>
          Sahaj Spirit Foundation ("we", "us", "our") is the organiser of Sahaj Summit 2026. Our primary
          contact for privacy matters is{' '}
          <a href="mailto:connect@sahajspirit.org" className="text-teal hover:underline">
            connect@sahajspirit.org
          </a>
          .
        </p>
      </Section>

      <Section title="2. Data We Collect">
        <p>During the registration process, we collect the following personal information:</p>
        <ul className="list-disc list-outside ml-5 space-y-2 mt-2">
          <li><strong>Identity data:</strong> Full name, age, gender</li>
          <li><strong>Contact data:</strong> Email address, mobile number</li>
          <li><strong>Payment data:</strong> Transaction details processed via Razorpay (we do not store card numbers or CVV)</li>
          <li><strong>Dietary preferences:</strong> Food accommodation choice selected during registration</li>
        </ul>
        <p className="mt-3">
          We also collect anonymised usage data (page views, device type) via standard analytics to improve
          our website. This data does not personally identify you.
        </p>
      </Section>

      <Section title="3. How We Use Your Data">
        <ul className="list-disc list-outside ml-5 space-y-2">
          <li>To process your registration and generate your Member ID(s)</li>
          <li>To send registration confirmation and event information to your email</li>
          <li>To organise dietary and logistical arrangements for the event</li>
          <li>To communicate important updates about Sahaj Summit 2026</li>
          <li>To respond to queries or complaints</li>
        </ul>
        <p className="mt-3">
          We do not use your data for unsolicited marketing, and we do not sell your data to any third party.
        </p>
      </Section>

      <Section title="4. Data Sharing">
        <p>Your personal data may be shared with the following parties, strictly for the purposes above:</p>
        <ul className="list-disc list-outside ml-5 space-y-2 mt-2">
          <li>
            <strong>Razorpay Software Private Limited</strong> — our payment processing partner, to securely
            process your registration fee. Razorpay's privacy policy governs how they handle your payment
            data.
          </li>
          <li>
            <strong>Organising team members</strong> — Sandesh Jain, Parul Jain, and Sahaj Jain, for
            event coordination and member management.
          </li>
          <li>
            <strong>JITO North Zone / JITO Aligarh</strong> — collaborating partner organisations, only for
            logistical coordination.
          </li>
        </ul>
        <p className="mt-3">
          We will disclose your data to law enforcement or regulatory bodies only when required to do so by
          applicable law.
        </p>
      </Section>

      <Section title="5. Data Retention">
        <p>
          We retain your registration data for a period of 2 years after the event for record-keeping and
          legal compliance purposes. After this period, data is securely deleted.
        </p>
      </Section>

      <Section title="6. Your Rights">
        <p>You have the right to:</p>
        <ul className="list-disc list-outside ml-5 space-y-2 mt-2">
          <li>Request access to the personal data we hold about you</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your data (subject to legal retention requirements)</li>
        </ul>
        <p className="mt-3">
          To exercise any of these rights, email us at{' '}
          <a href="mailto:connect@sahajspirit.org" className="text-teal hover:underline">
            connect@sahajspirit.org
          </a>
          .
        </p>
      </Section>

      <Section title="7. Data Security">
        <p>
          We use industry-standard security measures including encrypted connections (HTTPS) and
          access controls to protect your personal data. Payment transactions are fully encrypted and
          handled by Razorpay, which is PCI-DSS compliant.
        </p>
      </Section>

      <Section title="8. Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. The updated version will be published on this
          page with a revised "Last updated" date. Continued use of this website after changes constitutes
          acceptance of the updated policy.
        </p>
      </Section>

      <Section title="9. Contact">
        <p>
          For any privacy-related queries, contact us at{' '}
          <a href="mailto:connect@sahajspirit.org" className="text-teal hover:underline">
            connect@sahajspirit.org
          </a>
          .
        </p>
      </Section>
    </PolicyLayout>
  );
}
