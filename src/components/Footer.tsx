import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import BlurText from './shared/BlurText';
import sahajSummit from '../assets/hero/sahaj sumit.png';

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Map scroll progress to horizontal translations for text (opposite directions)
  const xLeft = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const xRight = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);
  
  // Multi-axis parallax: vertical translation for foreground image
  const yImage = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-[#FBF7F0] border-t border-teal/10 py-16 sm:py-24 px-6 sm:px-12 lg:px-20 relative select-none">
      {/* Mobile-Only Ambient Glow (Spans 100% width of the mobile viewport, hidden on desktop) */}
      <div 
        style={{ backgroundImage: 'radial-gradient(ellipse at center, rgba(43, 168, 158, 0.16) 0%, rgba(243, 112, 33, 0.08) 60%, transparent 100%)' }}
        className="absolute left-0 right-0 top-0 h-[480px] md:hidden blur-[60px] pointer-events-none z-0 select-none w-full" 
      />

      <div className="w-full max-w-7xl mx-auto flex flex-col items-center">

        {/* Branding: Cinematic layered showcase */}
        <div 
          ref={containerRef}
          className="relative w-full min-h-[380px] sm:min-h-[480px] flex items-center justify-center mb-20 overflow-hidden select-none"
        >
          {/* Ambient Lighting Background Glows (Multi-tonal & Ultra-soft, hidden on mobile) */}
          <div className="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none z-0 select-none">
            {/* Teal Glow (Offset Top-Left) */}
            <div 
              style={{ backgroundImage: 'radial-gradient(circle, rgba(43, 168, 158, 0.12) 0%, transparent 70%)' }}
              className="absolute w-[360px] h-[360px] sm:w-[580px] sm:h-[580px] rounded-full blur-[100px] -translate-x-12 -translate-y-8" 
            />
            {/* Orange Glow (Offset Bottom-Right) */}
            <div 
              style={{ backgroundImage: 'radial-gradient(circle, rgba(243, 112, 33, 0.08) 0%, transparent 70%)' }}
              className="absolute w-[360px] h-[360px] sm:w-[580px] sm:h-[580px] rounded-full blur-[100px] translate-x-12 translate-y-8" 
            />
          </div>

          {/* Background Layer: Giant Outlined Text with Scroll-Driven Parallax */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0 gap-2">
            <motion.div
              style={{ x: xLeft }}
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
              whileInView={{ opacity: 0.15, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full text-center"
            >
              <h2 className="font-serif font-black text-[clamp(72px,16vw,240px)] text-transparent text-stroke-teal-thick leading-[0.85] select-none tracking-wider uppercase">
                SAHAJ
              </h2>
            </motion.div>
            
            <motion.div
              style={{ x: xRight }}
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
              whileInView={{ opacity: 0.15, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
              className="w-full text-center"
            >
              <h2 className="font-serif font-black text-[clamp(72px,16vw,240px)] text-transparent text-stroke-teal-thick leading-[0.85] select-none tracking-wider uppercase">
                SPIRIT
              </h2>
            </motion.div>
          </div>

          {/* Foreground Layer: Center Collage Image with Multi-Axis Depth Parallax */}
          <motion.div
            style={{ y: yImage }}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="relative z-10 w-full max-w-[280px] sm:max-w-[340px] drop-shadow-[0_25px_60px_rgba(43,168,158,0.25)] flex justify-center"
          >
            <img
              src={sahajSummit}
              alt="Sahaj Summit — youth performances, speakers, and live music"
              className="h-auto w-full max-h-[440px] object-contain object-center select-none pointer-events-none"
              draggable={false}
            />
          </motion.div>
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
