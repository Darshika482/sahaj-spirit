import { motion } from 'motion/react';
import { SAHAJ_EASE } from '../../lib/motion';
import { REGISTRATION_URL } from '../shared/RegisterButton';

interface HeroContentProps {
  onPhilosophyClick?: () => void;
}

export default function HeroContent({ onPhilosophyClick }: HeroContentProps) {
  const headlinePart1 = "You are not broken.".split(" ");
  const headlinePart2 = "You are just forgetting".split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.4,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: SAHAJ_EASE,
      },
    },
  };

  const italicVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 1.1, // Slight extra delay to animate after others
        duration: 1.0,
        ease: SAHAJ_EASE,
      },
    },
  };

  const itemFadeInUp = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: SAHAJ_EASE,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-start text-left max-w-[640px] z-10"
    >
      {/* Headline */}
      <h1 className="font-serif text-[clamp(44px,6.5vw,96px)] leading-[1.05] tracking-[-0.02em] text-ink font-normal mb-8">
        <span className="block overflow-hidden pb-1">
          {headlinePart1.map((word, idx) => (
            <motion.span
              key={`w1-${idx}`}
              variants={wordVariants}
              className="inline-block mr-3"
            >
              {word}
            </motion.span>
          ))}
        </span>
        <span className="block overflow-hidden pb-1">
          {headlinePart2.map((word, idx) => (
            <motion.span
              key={`w2-${idx}`}
              variants={wordVariants}
              className="inline-block mr-3"
            >
              {word}
            </motion.span>
          ))}
        </span>
        <motion.span
          variants={italicVariants}
          className="block italic text-teal mt-2"
        >
          who you are.*
        </motion.span>
      </h1>

      {/* Body */}
      <motion.p
        variants={itemFadeInUp}
        className="font-sans font-normal text-[16px] sm:text-[18px] leading-[1.7] text-ink/80 mb-10 max-w-[540px] antialiased"
      >
        Beneath the noise, your calm Sahaj self was never lost.
      </motion.p>

      {/* CTAs */}
      <motion.div
        variants={itemFadeInUp}
        className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 w-full"
      >
        {/* Primary CTA — Register */}
        <motion.a
          href={REGISTRATION_URL}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="group relative bg-orange hover:bg-orange-hover text-[#F7F3EC] px-8 py-4.5 rounded-full font-sans font-medium text-16 flex items-center gap-2 shadow-[0_8px_24px_-8px_rgba(243,112,33,0.4)] transition-all duration-300 pointer-events-auto cursor-pointer"
          data-cursor-label="register"
        >
          <span>Register for Sahaj Summit '26</span>
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="inline-block"
          >
            →
          </motion.span>
        </motion.a>

        {/* Secondary CTA */}
        <button
          onClick={onPhilosophyClick}
          className="group font-sans font-semibold text-[15px] text-teal hover:text-teal-deep flex items-center gap-1.5 py-2 relative cursor-pointer"
          data-cursor-label="view"
        >
          <span>Learn the philosophy</span>
          <span className="transition-transform duration-300 group-hover:translate-y-1">↓</span>
          {/* Custom Drawn Underline that animates width 0 to 100% on hover from left */}
          <span className="absolute bottom-1.5 left-0 w-0 h-[1.5px] bg-teal group-hover:w-full transition-all duration-300" />
        </button>
      </motion.div>
    </motion.div>
  );
}
