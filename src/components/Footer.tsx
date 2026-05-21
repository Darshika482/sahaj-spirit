import { motion } from 'motion/react';
import BlurText from './shared/BlurText';
import sahajSummit from '../assets/hero/sahaj sumit.png';

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

        {/* Branding: summit collage alongside outlined wordmark */}
        <div className="mb-16 grid w-full grid-cols-1 items-center gap-8 overflow-hidden select-none lg:grid-cols-[minmax(0,280px)_1fr] lg:gap-12 xl:grid-cols-[minmax(0,320px)_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 32, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-[280px] lg:mx-0 lg:max-w-none"
          >
            <img
              src={sahajSummit}
              alt="Sahaj Summit — youth performances, speakers, and live music"
              className="h-auto w-full max-h-[420px] object-contain object-center"
              draggable={false}
            />
          </motion.div>

          <div className="w-full text-center lg:text-left">
            <motion.h2
              initial={{ opacity: 0, y: 40, filter: 'blur(18px)' }}
              whileInView={{ opacity: 0.15, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
              className="font-serif font-normal text-[clamp(50px,13vw,200px)] text-transparent text-stroke-teal-thick leading-none select-none tracking-wider uppercase font-bold"
            >
              SAHAJ SPIRIT
            </motion.h2>
          </div>
        </div>

        {/* 3 Columns & Info Info */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16 border-b border-teal/10 pb-16 text-left">

          {/* Column 1: Contact */}
          <div className="flex flex-col items-start gap-4">
            <BlurText
              as="h4"
              className="font-sans font-bold text-[12px] uppercase tracking-[0.2em] text-teal"
            >
              Contact Organizing Team
            </BlurText>
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
            <BlurText
              as="h4"
              delay={0.1}
              className="font-sans font-bold text-[12px] uppercase tracking-[0.2em] text-teal"
            >
              The Movement
            </BlurText>
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
            <BlurText
              as="h4"
              delay={0.2}
              className="font-sans font-bold text-[12px] uppercase tracking-[0.2em] text-teal"
            >
              Connect Globally
            </BlurText>
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
