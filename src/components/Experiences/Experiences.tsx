import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ExperiencePanel from './ExperiencePanel';
import CyclingImage from './CyclingImage';
import BlurText from '../shared/BlurText';
import { SAHAJ_EASE } from '../../lib/motion';
import { useSiteContent } from '../../lib/useSiteContent';

interface ExperiencesProps {
  onSummitClick?: () => void;
}

function SiddhaJiIcon({ className = "w-10 h-10 text-teal/80" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 150 150"
      className={`${className} fill-current select-none`}
    >
      <path d="m12.1 120.5c3.8 5.2 11.3 14.6 20.8 18.7 1.6 0.5 2.6 1.2 3.7 1.8 2.5 1.5 5.6 2.5 8 3.1 9.1 2.7 13.8 4.5 29.3 4.9 12.2 0.1 25.3-1.5 34.9-5.7 11-4.8 19.1-12.4 29.1-28.2-3.3 4-11.4 11.2-17.5 15.3-2.8 1.7-6.2 3.6-11.2 5-4.2 1.4-8.6 2.7-13.7 3.5-6.5 0.9-14.4 1.6-22.8 1.6-13.4-0.3-22.7-1-37.7-5.9-2.6-0.5-5.7-2.1-8.7-3.9-3.2-1.9-6.5-4-8.9-5.5-3.9-2.6-3.9-3-5.3-4.7z"/>
      <path d="m126.8 110.7c-0.6-1.9-2.4-4.8-5.1-6.1-2-0.8-3.6-0.9-5-1.1-2.3-0.5-4.2-1.3-9-2-2.7-0.3-7.1-0.6-8.9-1.3l-3.4-1.4c3.8-2.1 6.7-4.2 9.2-5.8 2.1-1.2 3.8-3.3 5.6-5.8 1.5-2 1.2-4.9 0.8-6.5-0.6-4.3-1.6-8.8-2.3-14.6-1-7.5-4.1-16.8-6.7-22.2-0.9-1.6-2.2-2.1-3.4-3.1-1.6-1-2.4-1.3-4.3-2-3.9-1.4-5.6-1.6-10.9-2-1.3-0.2-2.9-0.6-4.4-1.1-0.4-0.2-0.9-5.6-0.4-6.3 1-1.2 1.5-2.2 1.9-3.9 0.4 1.7 2 1.3 2.2-0.6 0.9-2.7 2.4-6.4 2.5-8.7-0.1-1.7-1.5-1.9-2.9-0.4-0.2-0.6-0.4-1.9-0.4-3.2-0.5-5-2.9-10-6.3-10.7-1.3-0.4-5.6-1.1-8.5-0.4-1.1 0-2.1-0.1-3.1 0.4-3.5 1.3-7.4 6.2-7.3 14.3v0.9c-1.3-0.9-3.2-1.4-3 0.7 0.3 1.8 1.4 3.2 2.3 5.4 0.9 1.9 1.6 4.9 2.6 5 0.5 0 0.8-0.8 1.1-1.8 0.4 1.2 1.3 2.5 1.8 3.3 0.2 3.9 0.1 6.2-1.1 6.8-0.8 0.3-1.3 0.3-3 0.6-3.7 0.5-5 1.1-8.3 2.3-1.7 0.5-3.7 1.4-6.5 2.6-2.7 1.2-3.7 3.5-4.7 6.6-2.8 8.2-6 24.4-6.3 33 0 1.9 0.5 3.6 1 4.6 1.4 3.3 3.8 5.6 6.3 6.8 2.8 1.5 5.1 3.2 10.7 5.4 0.5 0.3 1.3 0.6 1.3 0.9-0.8 1.3-4.5 2.4-7.4 4.1-2.1 0.5-2.9-0.2-8.4 1.7-2.7 0.9-5.2 2-8.4 3.7-1.8 1-2.8 2.2-4.1 4.2-1.2 2-1.5 4.2-0.6 6.2 0.9 2.9 2.1 4.9 5.6 6.9 5.4 2.7 10.3 2.9 16.5 2.1 7.8-0.8 12.8-1.8 20.4-3.7 5.6-1.3 8.2-3.1 10-3.4 1.4-0.1 2.4 0.3 4.2 0.6 2.8 0.7 4.8 0.8 8 1.2 4.8 0.7 15.4 1.6 21.2 1.8 2.8 0 8-0.1 10.2-0.6 3.3-0.6 4.6-1.5 7.4-4.6 1.1-1.1 1.6-3.1 2-4.5 0.2-0.9 0.2-2.8-0.7-4.3zm-74.3-21.3c-1.3-0.6-1.9-2-3.1-3-1.7-1.6-3.8-3-6.2-4.2-0.2-1.3 0.9-5.3 1.5-7.2 1-3.5 1.9-8.9 2.7-9.9 0.6-0.2 3.2 4.1 3.6 6 0.5 1.8 1.7 3.4 2.2 5.9 0.8 4.2 0.4 12.7-0.7 12.4zm48-7.9c-1.1 1.5-4.4 3.9-6.5 6.4l-1.1 1.5c-1.3-1.5-2.3-5-2.3-9.4 0-2.1 0.3-4.6 1-6.5l3.9-10c0.5-0.5 1.1 4.1 2.2 7.1 1.4 4.9 3.3 10.3 2.8 10.9z"/>
    </svg>
  );
}

function UnderlineSvg() {
  return (
    <svg
      className="absolute left-0 bottom-[-10px] sm:bottom-[-12px] w-full h-[10px] sm:h-[12px] text-orange/80 pointer-events-none"
      viewBox="0 0 200 12"
      fill="none"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M 4 8 C 60 2, 140 2, 196 8 C 140 6, 60 6, 4 8"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
      />
    </svg>
  );
}

function PremiumIconOrnament() {
  return (
    <div className="relative flex items-center justify-center mb-6 mt-2">
      {/* Outer spinning dashed circle border */}
      <motion.div
        className="absolute w-20 h-20 rounded-full border border-dashed border-teal/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Outer ring with gradient glow pulsing */}
      <motion.div
        className="absolute w-16 h-16 rounded-full bg-teal/5 blur-md"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orbiting orange sparkle dot */}
      <div className="absolute w-20 h-20 pointer-events-none">
        <motion.div
          className="absolute w-2.5 h-2.5 rounded-full bg-orange shadow-[0_0_8px_var(--color-orange)]"
          style={{
            top: 0,
            left: 'calc(50% - 5px)',
            transformOrigin: '5px 40px', // radius is 40px (half of 80px)
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Inner solid ring */}
      <div className="w-14 h-14 rounded-full bg-[#FBF7F0] border border-teal/15 flex items-center justify-center relative shadow-sm">
        {/* Floating icon */}
        <motion.div
          animate={{ y: [-3, 3, -3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <SiddhaJiIcon className="w-8 h-8 text-teal" />
        </motion.div>
      </div>
    </div>
  );
}

export default function Experiences({ onSummitClick }: ExperiencesProps) {
  const { experiences } = useSiteContent();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check responsiveness on mount & resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update current scroll step for desktop pinning
  useEffect(() => {
    if (isMobile) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const scrollTop = -rect.top;
      // Scrollable distance inside the stickiness
      const scrollableHeight = rect.height - window.innerHeight;

      if (rect.top > 0) {
        setCurrentStep(0);
        return;
      }

      const fraction = Math.max(0, Math.min(1, scrollTop / scrollableHeight));
      // Map fraction to 11 steps (0 is Intro, 1-9 is Experiences, 10 is Outro)
      // Dividing by 11 discrete chunks
      const step = Math.min(10, Math.floor(fraction * 11));
      setCurrentStep(step);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once at start
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  // Scroll smoothly to a specific step
  const scrollToStep = (step: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const scrollableHeight = rect.height - window.innerHeight;
    
    // Each step spans roughly 1/11th of scrollableHeight
    const stepHeight = scrollableHeight / 11;
    // Aim for the center-to-upper portion of that step segment
    const targetScroll = containerTop + (step * stepHeight) + (stepHeight * 0.1);

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  };

  const handleNext = () => {
    if (currentStep < 10) {
      scrollToStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      scrollToStep(currentStep - 1);
    }
  };

  // --- MOBILE LAYOUT: Full-bleed vertical scroll of cards ---
  if (isMobile) {
    return (
      <section 
        id="experiences" 
        className="py-20 bg-[#F7F3EC] flex flex-col gap-12"
      >
        {/* Mobile Intro */}
        <div className="w-full text-center py-12 border-b border-teal/10 flex flex-col items-center px-4 sm:px-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-teal/70 mb-3 block">
            The Signature Paths
          </span>
          <PremiumIconOrnament />
          <BlurText
            as="h2"
            mode="fade"
            duration={0.9}
            className="font-serif text-[32px] sm:text-[40px] text-ink leading-[1.2] font-normal mb-8 max-w-md px-2"
          >
            Nine ways to come home{' '}
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-teal to-teal-deep italic font-serif">
              to yourself.
              <UnderlineSvg />
            </span>
          </BlurText>
          <BlurText
            as="p"
            delay={0.2}
            blur={0}
            className="font-sans text-[16px] sm:text-[17px] text-ink/80 max-w-md mx-auto mt-2 leading-[1.7] antialiased"
          >
            Every Sahaj assembly hosts 9 signature experiences loaded with deep traditional wisdom, delivered with contemporary vibration.
          </BlurText>
        </div>

        {/* Mobile Experience Horizontal Scroll List */}
        <div className="flex flex-row overflow-x-auto gap-6 px-4 sm:px-6 pb-8 snap-x snap-mandatory scrollbar-none items-stretch w-full">
          {experiences.map((item) => (
            <div 
              key={item.id} 
              className="flex flex-col bg-white rounded-2xl border border-teal/10 shadow-sm overflow-hidden w-[85vw] max-w-[310px] shrink-0 snap-center"
            >
              {/* Image Section on Top */}
              <div className="w-full aspect-[4/3] relative overflow-hidden">
                <CyclingImage
                  images={item.images}
                  alt={item.alt}
                  intervalMs={1500}
                  className="absolute inset-0 w-full h-full"
                />
              </div>

              {/* Text Details Block Below */}
              <div className="p-5 flex flex-col justify-between flex-grow bg-[#FBF7F0]/30 border-t border-teal/5">
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="font-script text-[20px] text-teal leading-none">
                      {item.script}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-teal/70">
                      NO. {item.id}
                    </span>
                  </div>

                  <h3 className="font-serif text-[22px] text-ink font-normal mb-1.5 leading-tight">
                    {item.title}
                  </h3>

                  <p className="font-serif italic text-[15px] sm:text-[16px] text-ink/75 mb-3 border-l-2 border-teal/25 pl-3 leading-relaxed">
                    “{item.tagline}”
                  </p>

                  <p className="font-sans text-[15px] sm:text-[16px] leading-[1.7] text-ink/80 mb-6 antialiased">
                    {item.body}
                  </p>
                </div>

                {/* Compact Action Button */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={onSummitClick}
                  className="w-full bg-orange hover:bg-orange-hover text-[#F7F3EC] py-2.5 rounded-full font-sans font-medium text-[13px] flex items-center justify-center gap-1.5 shadow-[0_6px_16px_-6px_rgba(243,112,33,0.5)] transition-colors duration-300"
                >
                  <span>Book Experience</span>
                  <span className="inline-block">→</span>
                </motion.button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Outro Card */}
        <div className="px-4 sm:px-6 w-full">
          <div className="w-full text-center py-12 bg-cream-warm rounded-2xl border border-teal/10 flex flex-col items-center px-4">
            <h4 className="font-serif italic text-[22px] sm:text-[26px] text-ink leading-snug mb-6 max-w-sm">
              And every one of these waits for you at the Sahaj Summit.
            </h4>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={onSummitClick}
              className="bg-orange hover:bg-orange-hover text-[#F7F3EC] px-6 py-3 rounded-full font-sans font-medium text-[13px] shadow-md flex items-center gap-2"
            >
              See Sahaj Summit 2026
              <span className="inline-block">→</span>
            </motion.button>
          </div>
        </div>
      </section>
    );
  }

  // --- DESKTOP LAYOUT: Sticky Scroll experience (1100vh total scroll depth) ---
  return (
    <section 
      ref={containerRef}
      id="experiences" 
      className="relative w-full bg-[#F7F3EC]"
      style={{ height: '1100vh' }}
    >
      {/* Sticky Sub-wrapper */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-center select-none bg-gradient-to-b from-[#F7F3EC] via-[#FBF7F0] to-[#F7F3EC]">
        
        {/* Subtle decorative grid background for layout elegance */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, var(--color-teal) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Keyboard and accessible side controls */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-30 pointer-events-auto">
          {/* Previous Link */}
          <motion.button
            onClick={handlePrev}
            disabled={currentStep === 0}
            whileHover={currentStep > 0 ? { scale: 1.1, backgroundColor: 'rgba(43, 168, 158, 0.1)' } : {}}
            whileTap={{ scale: 0.9 }}
            className={`w-12 h-12 rounded-full border border-teal/20 flex items-center justify-center transition-opacity duration-300 bg-cream/50 cursor-pointer ${
              currentStep === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
            }`}
            title="Scroll to previous experience"
            data-cursor-label="view"
          >
            <svg className="w-5 h-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </motion.button>

          {/* Dots representation for quick jumps */}
          <div className="flex flex-col gap-2.5 py-2">
            {Array.from({ length: 11 }).map((_, stepIdx) => {
              let titleText = 'Intro';
              if (stepIdx > 0 && stepIdx <= 9) {
                titleText = experiences[stepIdx - 1].title;
              } else if (stepIdx === 10) {
                titleText = 'Outro';
              }

              return (
                <button
                  key={stepIdx}
                  onClick={() => scrollToStep(stepIdx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 relative group cursor-pointer`}
                  title={`Go to: ${titleText}`}
                >
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ${
                    currentStep === stepIdx ? 'w-3 h-3 bg-teal' : 'w-1.5 h-1.5 bg-teal/30 group-hover:w-2 group-hover:h-2 group-hover:bg-teal/60'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Next Link */}
          <motion.button
            onClick={handleNext}
            disabled={currentStep === 10}
            whileHover={currentStep < 10 ? { scale: 1.1, backgroundColor: 'rgba(43, 168, 158, 0.1)' } : {}}
            whileTap={{ scale: 0.9 }}
            className={`w-12 h-12 rounded-full border border-teal/20 flex items-center justify-center transition-opacity duration-300 bg-cream/50 cursor-pointer ${
              currentStep === 10 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
            }`}
            title="Scroll to next experience"
            data-cursor-label="view"
          >
            <svg className="w-5 h-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </motion.button>
        </div>

        {/* Dynamic Display Panel based on scroll step */}
        <div className="w-full h-full relative z-10 flex items-center justify-center">
          <AnimatePresence mode="wait">
            
            {/* Step 0: INTRO PANEL */}
            {currentStep === 0 && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8, ease: SAHAJ_EASE }}
                className="flex flex-col items-center justify-center text-center px-4"
              >
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-teal/70 mb-3 block animate-pulse">
                  The Signature Paths
                </span>
                <PremiumIconOrnament />
                <h2 className="font-serif font-normal text-[clamp(44px,5.5vw,76px)] text-ink leading-tight max-w-4xl tracking-tight mb-10">
                  Nine ways to come home{' '}
                  <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-teal to-teal-deep italic font-serif pb-2">
                    to yourself.
                    <UnderlineSvg />
                  </span>
                </h2>
                <p className="font-sans text-[17px] sm:text-[18px] text-ink/80 max-w-xl leading-[1.7] mb-10 antialiased">
                  Every Sahaj assembly hosts 9 signature experiences loaded with deep traditional wisdom, delivered with contemporary vibration.
                </p>
                <div className="mt-4 flex flex-col items-center gap-3">
                  <span className="text-teal/60 font-sans text-xs uppercase tracking-[0.25em] font-medium">
                    Scroll to explore
                  </span>
                  <div className="w-[1.5px] h-16 bg-teal/10 relative overflow-hidden rounded-full">
                    <motion.div
                      className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-transparent via-teal to-transparent"
                      animate={{
                        y: [-32, 64],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.8,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 1 to 9: EXPERIENCE PANELS */}
            {currentStep >= 1 && currentStep <= 9 && (
              <motion.div
                key={`panel-step-${currentStep}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full flex items-center"
              >
                <ExperiencePanel
                  item={experiences[currentStep - 1]}
                  index={currentStep - 1}
                  total={experiences.length}
                  onSummitClick={onSummitClick}
                />
              </motion.div>
            )}

            {/* Step 10: OUTRO PANEL */}
            {currentStep === 10 && (
              <motion.div
                key="outro"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8, ease: SAHAJ_EASE }}
                className="flex flex-col items-center justify-center text-center px-4"
              >
                <SiddhaJiIcon className="w-10 h-10 text-teal mb-6" />
                <h2 className="font-serif font-normal italic text-[clamp(40px,5vw,68px)] text-ink leading-tight max-w-4xl tracking-tight mb-10">
                  “And every one of these waits for you at the Sahaj Summit.”
                </h2>
                
                <p className="font-sans text-[16px] sm:text-[17px] text-ink/80 max-w-xl leading-[1.7] mb-10 antialiased">
                  Join hundreds of youth on 6 Sep 2026 for a sacred journey of companionship, exploration, delicious Specialized Jain Food, and ancient temple walkathons.
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onSummitClick}
                  className="bg-orange hover:bg-orange-hover text-[#F7F3EC] px-8 py-4.5 rounded-full font-sans font-medium text-16 flex items-center gap-2 shadow-[0_12px_28px_-8px_rgba(243,112,33,0.5)] transition-all duration-300 pointer-events-auto cursor-pointer"
                  data-cursor-label="look"
                >
                  <span>See Sahaj Summit 2026</span>
                  <span className="inline-block">→</span>
                </motion.button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
