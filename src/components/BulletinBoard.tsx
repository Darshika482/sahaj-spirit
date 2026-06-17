import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Pin, Sparkles, BookOpen, Check } from 'lucide-react';
import BlurText from './shared/BlurText';
import corkTexture from '../assets/cork_texture.png';
import { useSiteContent } from '../lib/useSiteContent';

export default function BulletinBoard() {
  const { bulletin } = useSiteContent();
  const [challengeAccepted, setChallengeAccepted] = useState(false);

  return (
    <section 
      id="bulletin" 
      className="py-24 sm:py-32 px-6 sm:px-12 bg-[#FBF7F0] border-t border-teal/5 relative overflow-hidden select-none"
    >
      {/* Decorative background grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, var(--color-teal) 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
      />
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-teal/5 filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-orange/5 filter blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto flex flex-col items-center relative z-10">
        
        {/* Header block */}
        <div className="w-full text-center max-w-3xl mb-16">
          <BlurText
            as="span"
            className="font-sans font-medium text-[12px] uppercase tracking-[0.25em] text-teal block mb-3"
          >
            DAILY REFLECTIONS
          </BlurText>
          <BlurText
            as="h2"
            duration={1}
            delay={0.05}
            className="font-serif text-[clamp(36px,5vw,60px)] font-normal text-ink leading-[1.1] tracking-tight mb-5"
          >
            Sahaj <span className="italic text-teal">Bulletin Board</span>
          </BlurText>
          <BlurText
            as="p"
            delay={0.2}
            blur={0}
            className="font-sans text-[16px] sm:text-[17px] leading-[1.7] text-ink/80 max-w-xl mx-auto antialiased"
          >
            A mindful space for daily pause, vocabulary alignment, and spontaneous mini-challenges to bring you back to center.
          </BlurText>
        </div>

        {/* Physical wood-framed cork board */}
        <div 
          className="w-full border-[16px] border-[#4E342E] rounded-3xl shadow-[inset_0_6px_15px_rgba(0,0,0,0.6),0_20px_50px_rgba(0,0,0,0.35)] relative p-8 sm:p-12 overflow-hidden"
          style={{ 
            backgroundImage: `url(${corkTexture})`, 
            backgroundRepeat: 'repeat'
          }}
        >
          {/* Subtly dark shadow vignette inside the cork board */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-black/25 pointer-events-none" />

          {/* Board grid for cards */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 items-stretch relative z-10">
          
          {/* CARD 1: THOUGHT OF THE DAY (Yellow sticky note style) */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: -2 }}
            whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
            viewport={{ once: true, margin: '-100px' }}
            whileHover={{ scale: 1.025, rotate: 0, y: -8, zIndex: 10 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="relative bg-[#FFFEEB] border border-orange/10 p-8 sm:p-9 rounded-xl shadow-[0_12px_28px_rgba(243,112,33,0.04),0_2px_4px_rgba(0,0,0,0.01)] flex flex-col justify-between min-h-[380px] group transition-shadow duration-300 hover:shadow-[0_24px_48px_rgba(243,112,33,0.08)] cursor-pointer"
          >
            {/* Red Push Pin */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-orange/95 drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] group-hover:scale-110 transition-transform duration-300">
              <Pin className="w-7 h-7 fill-current rotate-[25deg]" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-6 font-mono text-[11px] uppercase tracking-wider text-orange font-bold">
                <Sparkles className="w-4.5 h-4.5 text-orange animate-pulse" />
                <span>Thought of the Day</span>
              </div>

              <blockquote className="font-serif text-[19px] sm:text-[21px] text-ink leading-relaxed font-normal mb-6">
                {bulletin.thought.quote}
              </blockquote>
            </div>

            <div className="border-t border-orange/10 pt-5 mt-auto">
              <cite className="font-sans font-bold text-xs text-ink uppercase tracking-wider not-italic block mb-1">
                — {bulletin.thought.author}
              </cite>
              <span className="font-sans text-[13px] text-ink/70 leading-relaxed block">
                {bulletin.thought.tip}
              </span>
            </div>
          </motion.div>

          {/* CARD 2: WORD OF THE SECTION (Polaroid / Document style) */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: 1.5 }}
            whileInView={{ opacity: 1, y: 0, rotate: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            whileHover={{ scale: 1.025, rotate: 0, y: -8, zIndex: 10 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="relative bg-white border border-teal/10 p-8 sm:p-9 rounded-xl shadow-[0_12px_28px_rgba(43,168,158,0.04),0_2px_4px_rgba(0,0,0,0.01)] flex flex-col justify-between min-h-[380px] group transition-shadow duration-300 hover:shadow-[0_24px_48px_rgba(43,168,158,0.08)] cursor-pointer"
          >
            {/* Teal Push Pin */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-teal/95 drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] group-hover:scale-110 transition-transform duration-300">
              <Pin className="w-7 h-7 fill-current -rotate-[15deg]" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-6 font-mono text-[11px] uppercase tracking-wider text-teal font-bold">
                <BookOpen className="w-4.5 h-4.5 text-teal" />
                <span>Word of the Section</span>
              </div>

              <h3 className="font-serif text-[28px] sm:text-[32px] font-bold text-ink leading-tight mb-1">
                {bulletin.word.word} <span className="font-serif font-normal text-teal/80">({bulletin.word.sanskrit})</span>
              </h3>
              <p className="font-sans text-[11px] tracking-wider text-ink-mute uppercase font-bold mb-4">
                Phonetic: {bulletin.word.phonetic}
              </p>

              <p className="font-serif italic text-teal/95 text-[15px] sm:text-[16px] mb-4 leading-relaxed">
                “{bulletin.word.translation}”
              </p>

              <p className="font-sans text-[15px] sm:text-[16px] leading-[1.7] text-ink/80 antialiased">
                {bulletin.word.meaning}
              </p>
            </div>

            <div className="border-t border-teal/5 pt-5 mt-auto">
              <span className="font-sans text-[13px] text-ink/65 leading-normal block">
                Brought to you by Sahaj Philosophy.
              </span>
            </div>
          </motion.div>

          {/* CARD 3: DAILY CHALLENGE (Interactive notebook sheet style) */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: -0.5 }}
            whileInView={{ opacity: 1, y: 0, rotate: -0.5 }}
            viewport={{ once: true, margin: '-100px' }}
            whileHover={{ scale: 1.025, rotate: 0, y: -8, zIndex: 10 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className={`relative p-8 sm:p-9 rounded-xl border transition-all duration-300 min-h-[380px] flex flex-col justify-between group cursor-pointer ${
              challengeAccepted 
                ? 'bg-[#EAF6F5] border-teal/30 shadow-[0_16px_36px_-8px_rgba(43,168,158,0.1)]' 
                : 'bg-[#FAF8F5] border-teal/5 shadow-[0_12px_28px_rgba(43,168,158,0.03),0_2px_4px_rgba(0,0,0,0.01)] hover:shadow-[0_24px_48px_rgba(43,168,158,0.07)]'
            }`}
          >
            {/* Brass Push Pin */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-ink/80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] group-hover:scale-110 transition-transform duration-300">
              <Pin className="w-7 h-7 fill-current rotate-[5deg]" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-6 font-mono text-[11px] uppercase tracking-wider text-ink/70 font-bold">
                <div className={`w-2 h-2 rounded-full ${challengeAccepted ? 'bg-teal animate-ping' : 'bg-orange animate-pulse'}`} />
                <span>Daily Mindful Challenge</span>
              </div>

              <h3 className="font-serif text-[22px] sm:text-[24px] text-ink font-normal leading-tight mb-3">
                {bulletin.challenge.title}
              </h3>
              
              <p className="font-sans text-[15px] sm:text-[16px] leading-[1.7] text-ink/80 mb-4 antialiased">
                {bulletin.challenge.desc}
              </p>
            </div>

            <div className="mt-auto">
              <AnimatePresence mode="wait">
                {challengeAccepted ? (
                  <motion.div
                    key="completed"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setChallengeAccepted(false);
                    }}
                    className="w-full py-3.5 px-4 bg-teal hover:bg-teal-deep text-white rounded-xl font-sans font-bold text-[12.5px] uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_8px_20px_-6px_rgba(43,168,158,0.4)] transition-all duration-300 cursor-pointer pointer-events-auto"
                  >
                    <Check className="w-4 h-4 stroke-[3px]" />
                    <span>Challenge Accepted!</span>
                  </motion.div>
                ) : (
                  <motion.button
                    key="accept"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setChallengeAccepted(true);
                    }}
                    className="w-full py-3.5 px-4 bg-orange hover:bg-orange-hover text-[#F7F3EC] rounded-xl font-sans font-bold text-[12.5px] uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[0_8px_20px_-8px_rgba(243,112,33,0.4)] transition-all duration-300 cursor-pointer pointer-events-auto border border-transparent"
                  >
                    <span>Accept Challenge</span>
                    <span>→</span>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
        </div>

      </div>
    </section>
  );
}
