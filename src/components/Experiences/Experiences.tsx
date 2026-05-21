import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { experiences } from './experienceData';
import ExperiencePanel from './ExperiencePanel';
import CyclingImage from './CyclingImage';
import BlurText from '../shared/BlurText';
import { SAHAJ_EASE } from '../../lib/motion';

interface ExperiencesProps {
  onTourClick?: () => void;
}

export default function Experiences({ onTourClick }: ExperiencesProps) {
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
      <section id="experiences" className="bg-[#F7F3EC] py-20 px-4 sm:px-6 flex flex-col gap-12">
        {/* Mobile Intro */}
        <div className="w-full text-center py-10 border-b border-teal/10">
          <div className="w-12 h-[1px] bg-teal mx-auto mb-4" />
          <BlurText
            as="h2"
            mode="words"
            stagger={0.06}
            duration={0.8}
            className="font-serif text-[32px] sm:text-[40px] text-ink leading-tight font-normal mb-6"
            text="Nine ways to come home to yourself."
          />
          <BlurText
            as="p"
            delay={0.2}
            className="font-sans text-[15px] text-ink-soft max-w-md mx-auto"
          >
            Explore the key immersive components that structure the Soulful Alliance of Happiness and Joy.
          </BlurText>
        </div>

        {/* Mobile Experience List */}
        <div className="flex flex-col gap-16">
          {experiences.map((item) => (
            <div key={item.id} className="flex flex-col gap-6 bg-[#FBF7F0]/60 p-6 rounded-2xl border border-teal/5">
              {/* Image (cycles every 1.5s, paused on hover) */}
              <CyclingImage
                images={item.images}
                alt={item.alt}
                intervalMs={1500}
                className="w-full aspect-[4/3] rounded-xl shadow-md"
              />

              {/* Text Meta */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-script text-[22px] text-teal leading-none">
                    {item.script}
                  </span>
                  <span className="font-mono text-[12px] text-teal border border-teal/20 px-2.5 py-0.5 rounded-full">
                    {item.id}
                  </span>
                </div>

                <h3 className="font-serif text-[28px] text-ink font-normal mb-2 leading-tight">
                  {item.title}
                </h3>

                <p className="font-serif italic text-[16px] text-ink-soft mb-3 border-l-2 border-teal/20 pl-3 leading-relaxed">
                  “{item.tagline}”
                </p>

                <p className="font-sans text-[14px] leading-relaxed text-ink-soft mb-6">
                  {item.body}
                </p>

                {/* CTA */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={onTourClick}
                  className="group bg-orange hover:bg-orange-hover text-[#F7F3EC] px-6 py-3 rounded-full font-sans font-medium text-[14px] inline-flex items-center gap-2 shadow-[0_8px_20px_-8px_rgba(243,112,33,0.5)] transition-colors duration-300"
                >
                  <span>Experience this at Sahaj Tour</span>
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </motion.button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Outro Card */}
        <div className="w-full text-center py-16 bg-cream-warm rounded-2xl border border-teal/10 mt-8 flex flex-col items-center px-4">
          <h4 className="font-serif italic text-[24px] sm:text-[30px] text-ink leading-snug mb-8 max-w-sm">
            And every one of these waits for you at the Sahaj Summit.
          </h4>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onTourClick}
            className="bg-orange hover:bg-orange-hover text-[#F7F3EC] px-6 py-3.5 rounded-full font-sans font-medium text-[14px] shadow-lg flex items-center gap-2"
          >
            See Sahaj Tour 2026
            <span className="inline-block">→</span>
          </motion.button>
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
      style={{ height: '1100vh' }} // 100vh per transition + entry + exit
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
                <div className="w-16 h-[1.5px] bg-teal mb-6" />
                <h2 className="font-serif font-normal text-[clamp(44px,5.5vw,76px)] text-ink leading-tight max-w-4xl tracking-tight mb-8">
                  Nine ways to come home <span className="italic text-teal">to yourself.</span>
                </h2>
                <p className="font-sans text-[17px] text-ink-soft max-w-lg leading-relaxed mb-6">
                  Every Sahaj assembly hosts 9 signature experiences loaded with deep traditional wisdom, delivered with contemporary vibration.
                </p>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  className="text-teal/50 font-sans text-xs uppercase tracking-widest mt-8 flex flex-col items-center gap-2"
                >
                  <span>SCROLL DOWN</span>
                  <svg className="w-5 h-5 text-teal/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 13l-7 7-7-7m14-6l-7 7-7-7" />
                  </svg>
                </motion.div>
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
                  onTourClick={onTourClick}
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
                <div className="w-16 h-[1.5px] bg-teal mb-6" />
                <h2 className="font-serif font-normal italic text-[clamp(40px,5vw,68px)] text-ink leading-tight max-w-4xl tracking-tight mb-10">
                  “And every one of these waits for you at the Sahaj Summit.”
                </h2>
                
                <p className="font-sans text-[16px] text-ink-soft max-w-xl leading-relaxed mb-10">
                  Join hundreds of youth on 6 Sep 2026 for a sacred journey of companionship, exploration, delicious Specialized Jain Food, and ancient temple walkathons.
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onTourClick}
                  className="bg-orange hover:bg-orange-hover text-[#F7F3EC] px-8 py-4.5 rounded-full font-sans font-medium text-16 flex items-center gap-2 shadow-[0_12px_28px_-8px_rgba(243,112,33,0.5)] transition-all duration-300 pointer-events-auto cursor-pointer"
                  data-cursor-label="look"
                >
                  <span>See Sahaj Tour 2026</span>
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
