import { motion } from 'motion/react';

export default function Footer() {
  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-[#FBF7F0] border-t border-teal/10 py-16 sm:py-24 px-6 sm:px-12 lg:px-20 relative select-none">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Massive Outlined Typography filling the width */}
        <div className="w-full text-center overflow-hidden mb-16 select-none">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 0.15, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif font-normal text-[clamp(50px,13vw,200px)] text-transparent text-stroke-teal-thick leading-none select-none tracking-wider uppercase font-bold"
          >
            SAHAJ SPIRIT
          </motion.h2>
        </div>

        {/* 3 Columns & Info Info */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16 border-b border-teal/10 pb-16 text-left">
          
          {/* Column 1: Contact */}
          <div className="flex flex-col items-start gap-4">
            <h4 className="font-sans font-bold text-[12px] uppercase tracking-[0.2em] text-teal">
              Contact Organizing Team
            </h4>
            <div className="flex flex-col gap-3 font-sans text-[15px] text-ink-soft">
              <div>
                <span className="font-semibold text-ink block">Sandesh Jain</span>
                <a href="tel:+919837050110" className="hover:text-teal transition-colors">+91 98370 50110</a>
              </div>
              <div>
                <span className="font-semibold text-ink block">Parul Jain</span>
                <a href="tel:+919412271253" className="hover:text-teal transition-colors">+91 94122 71253</a>
              </div>
              <div>
                <span className="font-semibold text-ink block">Sahaj Jain</span>
                <a href="tel:+917017254583" className="hover:text-teal transition-colors">+91 70172 54583</a>
              </div>
            </div>
          </div>

          {/* Column 2: Movement Navigation Links */}
          <div className="flex flex-col items-start gap-4">
            <h4 className="font-sans font-bold text-[12px] uppercase tracking-[0.2em] text-teal">
              The Movement
            </h4>
            <div className="flex flex-col gap-3 font-sans text-[15px] font-medium text-ink-soft">
              <button 
                onClick={() => handleScrollTo('#home')} 
                className="hover:text-teal text-left transition-colors cursor-pointer"
                data-cursor-label="view"
              >
                Home & Base
              </button>
              <button 
                onClick={() => handleScrollTo('#philosophy')} 
                className="hover:text-teal text-left transition-colors cursor-pointer"
                data-cursor-label="view"
              >
                Our Philosophy
              </button>
              <button 
                onClick={() => handleScrollTo('#experiences')} 
                className="hover:text-teal text-left transition-colors cursor-pointer"
                data-cursor-label="view"
              >
                9 Experiences
              </button>
              <button 
                onClick={() => handleScrollTo('#tour')} 
                className="hover:text-teal text-left transition-colors cursor-pointer"
                data-cursor-label="view"
              >
                Sahaj Tour 2026
              </button>
            </div>
          </div>

          {/* Column 3: Social Connectivity */}
          <div className="flex flex-col items-start gap-4">
            <h4 className="font-sans font-bold text-[12px] uppercase tracking-[0.2em] text-teal">
              Connect Globally
            </h4>
            <div className="flex flex-col gap-3 font-sans text-[15px] text-ink-soft">
              <a 
                href="https://instagram.com/sahajspirit" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-teal flex items-center gap-2 transition-colors cursor-pointer"
                data-cursor-label="view"
              >
                Instagram
              </a>
              <a 
                href="https://youtube.com/@sahajspirit" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-teal flex items-center gap-2 transition-colors cursor-pointer"
                data-cursor-label="view"
              >
                YouTube Channel
              </a>
              <a 
                href="mailto:connect@sahajspirit.org" 
                className="hover:text-teal flex items-center gap-2 transition-colors cursor-pointer"
                data-cursor-label="view"
              >
                connect@sahajspirit.org
              </a>
              <p className="text-xs text-ink-mute font-normal mt-2 leading-relaxed">
                Founded with a mission to steer today's youth towards pure awareness, absolute non-violence, and effortless joyful sanity.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center pt-8 text-[12px] font-mono text-ink-mute tracking-widest gap-4">
          <span>
            © 2026 SAHAJ SPIRIT FOUNDATION
          </span>
          <span className="text-center sm:text-right">
            SOULFUL ALLIANCE OF HAPPINESS AND JOY ®
          </span>
        </div>

      </div>
    </footer>
  );
}
