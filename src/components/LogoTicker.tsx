import sahajLogo from '../assets/hero/logo.png';

const partners: { name: string; sub?: string }[] = [
  { name: 'JITO North Zone' },
  { name: 'JITO Aligarh' },
  { name: 'Sahaj Chapters', sub: 'Flagship Program' },
  { name: 'Youth Summit', sub: '500+ Strong' },
  { name: 'Ahimsa Collective' },
  { name: 'Tirthankara Trust' },
  { name: 'Sahaj Foundation' },
];

function LogoLockup() {
  return (
    <span className="inline-flex items-center gap-3 px-6 py-2 shrink-0">
      <img
        src={sahajLogo}
        alt="Sahaj Spirit"
        draggable={false}
        className="h-8 w-auto opacity-80 select-none"
      />
      <span className="font-serif text-[18px] tracking-tight text-ink/80">
        Sahaj Spirit
      </span>
    </span>
  );
}

function PartnerPill({ name, sub }: { name: string; sub?: string }) {
  return (
    <span className="inline-flex items-center gap-2 px-6 py-2 shrink-0">
      <span className="h-1.5 w-1.5 rounded-full bg-teal/60" />
      <span className="font-sans text-[14px] font-semibold uppercase tracking-[0.18em] text-ink/70 whitespace-nowrap">
        {name}
      </span>
      {sub && (
        <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-ink-mute whitespace-nowrap">
          · {sub}
        </span>
      )}
    </span>
  );
}

function Separator() {
  return (
    <span className="inline-flex items-center px-2 shrink-0">
      <span className="text-teal/40 text-[18px] select-none">✦</span>
    </span>
  );
}

export default function LogoTicker() {
  // Each "row" is rendered twice in a marquee that translates -50% so it loops seamlessly.
  const row = (
    <div className="flex items-center gap-2 shrink-0">
      <LogoLockup />
      <Separator />
      {partners.map((p, i) => (
        <span key={p.name + i} className="inline-flex items-center">
          <PartnerPill name={p.name} sub={p.sub} />
          <Separator />
        </span>
      ))}
    </div>
  );

  return (
    <section
      aria-label="Trusted partners"
      className="relative w-full bg-[#FBF7F0] border-y border-teal/10 py-6 overflow-hidden select-none"
    >
      {/* Soft fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-[#FBF7F0] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-[#FBF7F0] to-transparent" />

      <div className="group flex w-full overflow-hidden">
        <div className="ticker-track flex items-center whitespace-nowrap">
          {row}
          {row}
        </div>
      </div>

      <style>{`
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .ticker-track {
          animation: ticker-scroll 38s linear infinite;
          will-change: transform;
        }
        .group:hover .ticker-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .ticker-track { animation: none; }
        }
      `}</style>
    </section>
  );
}
