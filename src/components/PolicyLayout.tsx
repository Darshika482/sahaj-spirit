import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  title: string;
  subtitle: string;
  lastUpdated: string;
  children: ReactNode;
}

export default function PolicyLayout({ title, subtitle, lastUpdated, children }: Props) {
  return (
    <div className="min-h-screen bg-[#F7F3EC] font-sans">
      <header className="border-b border-teal/10 bg-[#F7F3EC]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-[13px] font-medium text-teal hover:text-teal/70 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Sahaj Spirit
          </Link>
          <span className="font-serif font-bold text-[11px] uppercase tracking-[0.2em] text-ink/50">
            SAHAJ SPIRIT FOUNDATION
          </span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 pt-14 pb-8">
        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-teal mb-4">
          Last updated: {lastUpdated}
        </p>
        <h1 className="font-serif font-black text-[clamp(2rem,6vw,3.25rem)] text-ink leading-tight">
          {title}
        </h1>
        <p className="mt-3 text-[15px] text-ink/60 leading-relaxed max-w-2xl">
          {subtitle}
        </p>
        <div className="mt-8 h-px bg-teal/12" />
      </div>

      <main className="max-w-4xl mx-auto px-6 pb-24 prose-policy">
        {children}
      </main>

      <footer className="border-t border-teal/10 py-8 bg-[#F7F3EC]">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center text-[11px] font-mono text-ink/40 tracking-widest gap-3">
          <span>© 2026 SAHAJ SPIRIT FOUNDATION</span>
          <div className="flex items-center gap-4">
            <Link to="/terms" className="hover:text-teal transition-colors">Terms</Link>
            <Link to="/privacy" className="hover:text-teal transition-colors">Privacy</Link>
            <Link to="/refund" className="hover:text-teal transition-colors">Refunds</Link>
            <Link to="/contact" className="hover:text-teal transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
