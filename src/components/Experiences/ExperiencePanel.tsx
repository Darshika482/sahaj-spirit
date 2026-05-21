import { motion, AnimatePresence } from 'motion/react';
import { ExperienceItem } from './experienceData';
import { SAHAJ_EASE } from '../../lib/motion';

interface ExperiencePanelProps {
  item: ExperienceItem;
  index: number;
  total: number;
}

export default function ExperiencePanel({ item, index, total }: ExperiencePanelProps) {
  const formattedIndex = item.id;

  // Variants according to guidelines
  const numberVariants = {
    initial: { y: 60, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.6, ease: SAHAJ_EASE } 
    },
    exit: { 
      y: -60, 
      opacity: 0, 
      transition: { duration: 0.4, ease: SAHAJ_EASE } 
    }
  };

  const textVariants = {
    initial: { y: 40, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.6, delay: 0.1, ease: SAHAJ_EASE } 
    },
    exit: { 
      y: -40, 
      opacity: 0, 
      transition: { duration: 0.5, ease: SAHAJ_EASE } 
    }
  };

  const imageVariants = {
    initial: { opacity: 0, scale: 1.05 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.7, delay: 0.15, ease: SAHAJ_EASE } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.96, 
      transition: { duration: 0.5, ease: SAHAJ_EASE } 
    }
  };

  const progressPercent = ((index + 1) / total) * 100;

  return (
    <div className="w-full h-full flex items-center justify-center p-4 sm:p-8 lg:p-16">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        
        {/* Left Column: Huge Index Marker (col-span-5) */}
        <div className="col-span-1 lg:col-span-5 flex flex-col justify-center items-center lg:items-start text-center lg:text-left relative h-[140px] sm:h-[180px] lg:h-auto select-none overflow-hidden py-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={`num-${item.id}`}
              variants={numberVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col items-center lg:items-start"
            >
              {/* Massive outlined index */}
              <div className="font-serif font-normal text-[clamp(140px,18vw,280px)] text-transparent text-stroke-teal leading-none tracking-tight select-none">
                {formattedIndex}
              </div>
              
              <div className="flex items-center gap-3 mt-4 lg:mt-2">
                <span className="w-8 h-[1.5px] bg-teal" />
                <span className="font-sans font-medium text-[11px] uppercase tracking-[0.2em] text-teal">
                  AN EXPERIENCE
                </span>
                <span className="w-2 h-[1.5px] bg-teal" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: Experience Details & Image (col-span-7) */}
        <div className="col-span-1 lg:col-span-7 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Text block (col-span-7) */}
          <div className="col-span-1 md:col-span-7 flex flex-col justify-center text-left order-2 md:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${item.id}`}
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col"
              >
                {/* Hindi/Sanskrit Transliteration above title in Caveat */}
                <span className="font-script text-[28px] text-teal leading-none mb-1">
                  {item.script}
                </span>

                {/* Experience Name */}
                <h3 className="font-serif text-[clamp(36px,4.5vw,56px)] font-normal text-ink leading-tight mb-4 tracking-tight">
                  {item.title}
                </h3>

                {/* One-line poetic descriptor */}
                <p className="font-serif italic text-[19px] sm:text-[21px] leading-relaxed text-ink-soft mb-4 border-l-2 border-teal/20 pl-4">
                  “{item.tagline}”
                </p>

                {/* 3-line body description */}
                <p className="font-sans text-[15px] sm:text-[16px] leading-[1.6] text-ink-soft mb-8">
                  {item.body}
                </p>

                {/* Progress Indicator at the bottom of the column */}
                <div className="mt-4 flex flex-col gap-2">
                  <div className="flex justify-between items-center text-[12px] font-mono text-ink-mute tracking-widest uppercase">
                    <span>PROGRESS</span>
                    <span>{formattedIndex} / {String(total).padStart(2, '0')}</span>
                  </div>
                  {/* Progress bar container */}
                  <div className="w-full h-[3px] bg-teal/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-teal"
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Large Hero Image (col-span-5) */}
          <div className="col-span-1 md:col-span-5 order-1 md:order-2 flex justify-center">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_20px_48px_-12px_rgba(43,168,158,0.22)] border border-teal/5 bg-[#FBF7F0]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={`img-${item.id}`}
                  variants={imageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  src={item.image}
                  alt={item.alt}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              {/* Soft overlay vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
