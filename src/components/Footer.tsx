import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import BlurText from './shared/BlurText';
import sahajSummit from '../assets/hero/sahaj sumit.png';

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Map scroll progress to horizontal translations (constant direction, converging in the middle)
  const xLeft = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);
  const xRight = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);
  
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
              whileInView={{ opacity: 0.35, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full text-center"
            >
              <h2 className="font-serif font-black text-[clamp(72px,16vw,240px)] text-transparent bg-clip-text bg-gradient-to-r from-teal/15 via-orange/12 to-teal/15 text-stroke-teal-thick leading-[0.85] select-none tracking-wider uppercase">
                SAHAJ
              </h2>
            </motion.div>
            
            <motion.div
              style={{ x: xRight }}
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
              whileInView={{ opacity: 0.35, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
              className="w-full text-center"
            >
              <h2 className="font-serif font-black text-[clamp(72px,16vw,240px)] text-transparent bg-clip-text bg-gradient-to-r from-teal/15 via-orange/12 to-teal/15 text-stroke-teal-thick leading-[0.85] select-none tracking-wider uppercase">
                SPIRIT
              </h2>
            </motion.div>
          </div>

          {/* Glassmorphic anchoring circle */}
          <motion.div
            style={{ y: yImage }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            className="absolute z-5 w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] rounded-full bg-white/20 backdrop-blur-md border border-white/40 shadow-[0_32px_64px_-16px_rgba(43,168,158,0.12)] pointer-events-none"
          />

          {/* Foreground Layer: Center Collage Image with Multi-Axis Depth Parallax */}
          <motion.div
            style={{ y: yImage }}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="relative z-10 w-full max-w-[280px] sm:max-w-[340px] flex justify-center"
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
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 border-b border-teal/10 pb-16 text-left">

          {/* Column 1: Contact */}
          <div className="flex flex-col items-start gap-4 md:pr-12">
            <BlurText
              as="h4"
              className="font-sans font-bold text-[12px] uppercase tracking-[0.2em] text-teal"
            >
              Contact Organizing Team
            </BlurText>
            <div className="flex flex-col gap-4 w-full mt-2">
              {[
                { name: 'Sandesh Jain', phone: '+91 98370 50110', link: 'tel:+919837050110' },
                { name: 'Parul Jain', phone: '+91 94122 71253', link: 'tel:+919412271253' },
                { name: 'Sahaj Jain', phone: '+91 70172 54583', link: 'tel:+917017254583' },
              ].map((contact, i) => (
                <a
                  key={i}
                  href={contact.link}
                  className="group flex items-center justify-between p-3 rounded-2xl bg-teal/[0.03] hover:bg-teal/10 border border-teal/10 hover:border-teal/20 transition-all duration-300 w-full max-w-[280px]"
                  data-cursor-label="call"
                >
                  <div className="flex flex-col">
                    <span className="font-sans font-bold text-[14px] text-ink group-hover:text-teal transition-colors">
                      {contact.name}
                    </span>
                    <span className="font-mono text-[12px] text-ink-soft">
                      {contact.phone}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-teal shadow-sm group-hover:bg-teal group-hover:text-white transition-all duration-300">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M6.62 10.79a15.15 15.15 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Movement Navigation Links */}
          <div className="flex flex-col items-start gap-4 md:border-l md:border-teal/10 md:px-12">
            <BlurText
              as="h4"
              delay={0.1}
              className="font-sans font-bold text-[12px] uppercase tracking-[0.2em] text-teal"
            >
              The Movement
            </BlurText>
            <div className="flex flex-col gap-3.5 font-sans text-[15px] font-medium text-ink-soft w-full mt-2">
              {[
                { label: 'Home & Base', target: '#home' },
                { label: 'Our Philosophy', target: '#philosophy' },
                { label: '9 Experiences', target: '#experiences' },
                { label: 'Sahaj Summit 2026', target: '#summit' },
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={() => handleScrollTo(item.target)}
                  className="group flex items-center gap-2 hover:text-teal text-left transition-all duration-300 cursor-pointer w-fit"
                  data-cursor-label="view"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-teal scale-0 group-hover:scale-100 transition-transform duration-300" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Social Connectivity */}
          <div className="flex flex-col items-start gap-4 md:border-l md:border-teal/10 md:pl-12">
            <BlurText
              as="h4"
              delay={0.2}
              className="font-sans font-bold text-[12px] uppercase tracking-[0.2em] text-teal"
            >
              Connect Globally
            </BlurText>
            <div className="flex flex-col gap-6 w-full mt-2">
              {/* Social Button Grid */}
              <div className="flex items-center gap-3">
                {[
                  {
                    label: 'Instagram',
                    url: 'https://instagram.com/sahajspirit',
                    svg: (
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                      </svg>
                    )
                  },
                  {
                    label: 'YouTube',
                    url: 'https://youtube.com/@sahajspirit',
                    svg: (
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.108C19.53 3.5 12 3.5 12 3.5s-7.53 0-9.388.555A3.003 3.003 0 00.502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.003 3.003 0 002.11 2.108C4.47 20.5 12 20.5 12 20.5s7.53 0 9.388-.555a3.003 3.003 0 002.11-2.108C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    )
                  },
                  {
                    label: 'Email',
                    url: 'mailto:connect@sahajspirit.org',
                    svg: (
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                    )
                  }
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.url}
                    target={social.url.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-full bg-teal/[0.03] hover:bg-teal hover:text-white border border-teal/15 hover:border-teal text-teal flex items-center justify-center shadow-sm hover:shadow-[0_8px_20px_rgba(43,168,158,0.2)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                    data-cursor-label="view"
                  >
                    {social.svg}
                  </a>
                ))}
              </div>

              <p className="text-xs text-ink-mute font-normal leading-relaxed max-w-[280px]">
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
          <div className="flex flex-wrap justify-center sm:justify-end items-center gap-x-5 gap-y-2">
            <Link to="/terms" className="hover:text-teal transition-colors duration-200">TERMS</Link>
            <Link to="/privacy" className="hover:text-teal transition-colors duration-200">PRIVACY</Link>
            <Link to="/refund" className="hover:text-teal transition-colors duration-200">REFUNDS</Link>
            <Link to="/pricing" className="hover:text-teal transition-colors duration-200">PRICING</Link>
            <Link to="/delivery" className="hover:text-teal transition-colors duration-200">DELIVERY</Link>
            <Link to="/contact" className="hover:text-teal transition-colors duration-200">CONTACT</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
