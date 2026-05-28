import PolicyLayout from '../components/PolicyLayout';

export default function ContactPage() {
  const team = [
    { name: 'Sandesh Jain', phone: '+91 98370 50110', link: 'tel:+919837050110' },
    { name: 'Parul Jain', phone: '+91 94122 71253', link: 'tel:+919412271253' },
    { name: 'Sahaj Jain', phone: '+91 70172 54583', link: 'tel:+917017254583' },
  ];

  return (
    <PolicyLayout
      title="Contact Us"
      subtitle="Reach the Sahaj Spirit organising team for registration queries, payment issues, or any event-related questions."
      lastUpdated="May 2026"
    >
      {/* Email */}
      <div className="mt-10">
        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-teal mb-4">
          Email Us
        </p>
        <a
          href="mailto:connect@sahajspirit.org"
          className="group flex items-center gap-4 p-5 rounded-2xl bg-white/60 border border-teal/15 hover:border-teal/30 hover:bg-teal/[0.04] transition-all duration-300 max-w-sm"
        >
          <div className="w-11 h-11 rounded-full bg-teal/10 border border-teal/20 flex items-center justify-center text-teal flex-shrink-0">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-[15px] text-ink group-hover:text-teal transition-colors">
              connect@sahajspirit.org
            </p>
            <p className="text-[12px] text-ink/45 mt-0.5">We typically respond within 24 hours</p>
          </div>
        </a>
      </div>

      {/* Phone */}
      <div className="mt-10">
        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-teal mb-4">
          Call the Organising Team
        </p>
        <div className="flex flex-col gap-3 max-w-sm">
          {team.map((contact) => (
            <a
              key={contact.name}
              href={contact.link}
              className="group flex items-center justify-between p-4 rounded-2xl bg-white/60 border border-teal/15 hover:border-teal/30 hover:bg-teal/[0.04] transition-all duration-300"
            >
              <div>
                <p className="font-semibold text-[15px] text-ink group-hover:text-teal transition-colors">
                  {contact.name}
                </p>
                <p className="font-mono text-[12px] text-ink/50 mt-0.5">{contact.phone}</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-teal/10 border border-teal/20 flex items-center justify-center text-teal group-hover:bg-teal group-hover:text-white transition-all duration-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M6.62 10.79a15.15 15.15 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Address */}
      <div className="mt-10">
        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-teal mb-4">
          Event Location & Operating Address
        </p>
        <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/60 border border-teal/15 max-w-sm">
          <div className="w-11 h-11 rounded-full bg-teal/10 border border-teal/20 flex items-center justify-center text-teal flex-shrink-0 mt-0.5">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-[15px] text-ink">Sahaj Summit 2026</p>
            <p className="text-[14px] text-ink/55 mt-1 leading-relaxed">
              Sacred Jain Heritage Site<br />
              Birthplace of Jain Tirthankaras<br />
              India
            </p>
            <p className="text-[12px] text-ink/40 mt-2">September 6, 2026</p>
          </div>
        </div>
        <p className="text-[13px] text-ink/50 mt-3 leading-relaxed max-w-sm">
          Detailed venue address and travel guidance will be shared with confirmed registrants
          by August 23, 2026.
        </p>
      </div>

      {/* Social */}
      <div className="mt-10">
        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-teal mb-4">
          Follow the Movement
        </p>
        <div className="flex items-center gap-3">
          <a
            href="https://instagram.com/sahajspirit"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/60 border border-teal/15 hover:border-teal/30 text-[14px] font-medium text-ink/70 hover:text-teal transition-all duration-300"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            Instagram
          </a>
          <a
            href="https://youtube.com/@sahajspirit"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/60 border border-teal/15 hover:border-teal/30 text-[14px] font-medium text-ink/70 hover:text-teal transition-all duration-300"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.108C19.53 3.5 12 3.5 12 3.5s-7.53 0-9.388.555A3.003 3.003 0 00.502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.003 3.003 0 002.11 2.108C4.47 20.5 12 20.5 12 20.5s7.53 0 9.388-.555a3.003 3.003 0 002.11-2.108C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            YouTube
          </a>
        </div>
      </div>
    </PolicyLayout>
  );
}
