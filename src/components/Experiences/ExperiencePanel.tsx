import { motion, AnimatePresence } from 'motion/react';
import { ExperienceItem } from './experienceData';
import { SAHAJ_EASE } from '../../lib/motion';
import CyclingImage from './CyclingImage';

interface ExperiencePanelProps {
  item: ExperienceItem;
  index: number;
  total: number;
  onSummitClick?: () => void;
}

export default function ExperiencePanel({ item, onSummitClick }: ExperiencePanelProps) {

  // Variants according to guidelines
  const numberVariants = {
    initial: { y: 40, opacity: 0, filter: 'blur(10px)' },
    animate: {
      y: 0,
      opacity: 0.06, // target opacity for background text-stroke-teal
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: SAHAJ_EASE },
    },
    exit: {
      y: -40,
      opacity: 0,
      filter: 'blur(8px)',
      transition: { duration: 0.4, ease: SAHAJ_EASE },
    },
  };

  const textVariants = {
    initial: { y: 30, opacity: 0, filter: 'blur(8px)' },
    animate: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.8, delay: 0.05, ease: SAHAJ_EASE },
    },
    exit: {
      y: -30,
      opacity: 0,
      filter: 'blur(6px)',
      transition: { duration: 0.4, ease: SAHAJ_EASE },
    },
  };

  const imageVariants = {
    initial: { opacity: 0, scale: 1.03, filter: 'blur(4px)' },
    animate: { 
      opacity: 1, 
      scale: 1, 
      filter: 'blur(0px)',
      transition: { duration: 0.8, delay: 0.1, ease: SAHAJ_EASE } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.97, 
      filter: 'blur(4px)',
      transition: { duration: 0.4, ease: SAHAJ_EASE } 
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-6 sm:p-12 lg:p-20 relative select-none">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        
        {/* Left Column: Text & Backdrop Number (col-span-7) */}
        <div className="col-span-1 lg:col-span-7 relative flex flex-col justify-center text-left min-h-[380px] lg:min-h-[460px] py-4">
          
          {/* Giant background number overlay */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`num-${item.id}`}
              variants={numberVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute -left-12 lg:-left-20 -top-16 lg:-top-24 pointer-events-none select-none z-0"
            >
              <div className="font-serif font-normal text-[clamp(180px,25vw,360px)] text-transparent text-stroke-teal leading-none tracking-tight select-none">
                {item.id}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Text details (relative z-10 to sit above absolute backdrop) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${item.id}`}
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative z-10 flex flex-col"
            >
              {/* Sanskrit/Hindi Transliteration & Index Label */}
              <div className="flex items-center gap-3.5 mb-2.5">
                <span className="font-script text-[32px] text-teal leading-none">
                  {item.script}
                </span>
                <span className="w-1.5 h-[1.5px] bg-teal/40" />
                <span className="font-sans font-semibold text-[11px] uppercase tracking-[0.25em] text-teal/80">
                  Experience {item.id}
                </span>
              </div>

              {/* Experience Title */}
              <h3 className="font-serif text-[clamp(40px,4.8vw,64px)] font-normal text-ink leading-[1.1] mb-5 tracking-tight">
                {item.title}
              </h3>

              {/* Poetic tagline descriptor */}
              <p className="font-serif italic text-[18px] sm:text-[22px] leading-relaxed text-ink/75 mb-5 border-l-2 border-teal/25 pl-5">
                “{item.tagline}”
              </p>

              {/* Body description */}
              <p className="font-sans text-[16px] sm:text-[17px] leading-[1.75] text-ink/80 mb-8 max-w-xl antialiased">
                {item.body}
              </p>

              {/* CTA Button */}
              <div className="mt-2 flex flex-wrap items-center gap-5">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onSummitClick}
                  className="group bg-orange hover:bg-orange-hover text-[#F7F3EC] px-7 py-3.5 rounded-full font-sans font-medium text-[15px] flex items-center gap-2.5 shadow-[0_10px_28px_-10px_rgba(243,112,33,0.55)] hover:shadow-[0_15px_32px_-8px_rgba(243,112,33,0.65)] transition-all duration-300 cursor-pointer pointer-events-auto"
                  data-cursor-label="look"
                >
                  <span>Experience this at Sahaj Summit</span>
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: Hero Image Showcase (col-span-5) */}
        <div className="col-span-1 lg:col-span-5 flex justify-center relative z-10 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={`img-wrap-${item.id}`}
              variants={imageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_32px_64px_-16px_rgba(43,168,158,0.25)] border border-teal/10 bg-[#FBF7F0] group cursor-pointer"
            >
              <CyclingImage
                images={item.images}
                alt={item.alt}
                className="absolute inset-0 w-full h-full"
                imgClassName="transition-transform duration-700 ease-out group-hover:scale-105"
              />
              
              {/* Vignette shadow overlay inside card */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none transition-opacity duration-500 group-hover:from-black/35" />
              
              {/* Subtle inner reflection highlight */}
              <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none" />
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
