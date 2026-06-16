import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Pin, Sparkles, BookOpen, Check } from 'lucide-react';
import BlurText from './shared/BlurText';

interface TiltCardProps {
  children: React.ReactNode;
  className: string;
  initialRotate: number;
}

function TiltCard({ children, className, initialRotate }: TiltCardProps) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize coordinates from -0.5 to 0.5
    const normalizedX = (x / rect.width) - 0.5;
    const normalizedY = (y / rect.height) - 0.5;
    
    setCoords({ x: normalizedX, y: normalizedY });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCoords({ x: 0, y: 0 });
      }}
      animate={{
        rotateX: isHovered ? -coords.y * 14 : 0,
        rotateY: isHovered ? coords.x * 14 : 0,
        rotate: isHovered ? 0 : initialRotate,
        scale: isHovered ? 1.03 : 1,
        y: isHovered ? -8 : 0,
      }}
      transition={{ type: 'spring', stiffness: 280, damping: 18 }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={className}
    >
      <div 
        style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }} 
        className="h-full flex flex-col justify-between"
      >
        {children}
      </div>
    </motion.div>
  );
}

export default function BulletinBoard() {
  const [challengeAccepted, setChallengeAccepted] = useState(false);

  return (
    <section 
      id="bulletin" 
      className="py-24 sm:py-32 px-4 sm:px-8 bg-[#FBF7F0] border-t border-teal/5 relative overflow-hidden select-none"
      style={{ perspective: '1500px' }}
    >
      {/* Background graphic accents */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, var(--color-teal) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-teal/5 filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-orange/5 filter blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto flex flex-col items-center relative z-10">
        
        {/* Header Block */}
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
            className="font-sans text-[15px] sm:text-[16px] leading-[1.6] text-ink-soft max-w-xl mx-auto"
          >
            A mindful space for daily pause, vocabulary alignment, and spontaneous mini-challenges to bring you back to center.
          </BlurText>
        </div>

        {/* 3D wooden/cork board frame wrapper */}
        <div 
          className="w-full bg-[#FAF5EC] border-[14px] sm:border-[18px] border-amber-950/20 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-[inset_0_4px_12px_rgba(0,0,0,0.1),0_24px_64px_-16px_rgba(0,0,0,0.15)] relative"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Subtle cork board texture overlay */}
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none rounded-2xl"
            style={{
              backgroundImage: `radial-gradient(circle, #5c4033 1px, transparent 1px)`,
              backgroundSize: '16px 16px',
            }}
          />

          {/* Board Grid */}
          <div 
            className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 items-stretch relative z-10"
            style={{ transformStyle: 'preserve-3d' }}
          >
            
            {/* CARD 1: THOUGHT OF THE DAY */}
            <TiltCard
              initialRotate={-1.5}
              className="relative bg-[#FFFDEB] border border-orange/10 p-8 sm:p-9 rounded-xl shadow-[0_10px_24px_rgba(243,112,33,0.03),0_2px_4px_rgba(0,0,0,0.01)] flex flex-col justify-between min-h-[380px] group transition-shadow duration-300 hover:shadow-[0_24px_48px_rgba(243,112,33,0.08)] cursor-pointer"
            >
              {/* Red Push Pin (floating in 3D) */}
              <div 
                className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-orange/95 drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] group-hover:scale-110 transition-transform duration-300 z-20"
                style={{ transform: 'translateZ(25px)' }}
              >
                <Pin className="w-7 h-7 fill-current rotate-[25deg]" />
              </div>

              <div style={{ transform: 'translateZ(10px)' }}>
                <div className="flex items-center gap-2 mb-6 font-mono text-[11px] uppercase tracking-wider text-orange font-bold">
                  <Sparkles className="w-4.5 h-4.5 text-orange animate-pulse" />
                  <span>Thought of the Day</span>
                </div>

                <blockquote className="font-serif text-[19px] sm:text-[21px] text-ink leading-relaxed font-normal mb-6">
                  “Your calm mind is the ultimate weapon against your challenges. So, relax.”
                </blockquote>
              </div>

              <div 
                className="border-t border-orange/10 pt-5 mt-auto"
                style={{ transform: 'translateZ(8px)' }}
              >
                <cite className="font-sans font-bold text-xs text-ink uppercase tracking-wider not-italic block mb-1">
                  — Bryant McGill
                </cite>
                <span className="font-sans text-[11.5px] text-ink-soft/80 leading-relaxed block">
                  Take a deep inhalation of ease, hold for three seconds, and let it go.
                </span>
              </div>
            </TiltCard>

            {/* CARD 2: WORD OF THE SECTION */}
            <TiltCard
              initialRotate={1}
              className="relative bg-white border border-teal/10 p-8 sm:p-9 rounded-xl shadow-[0_10px_24px_rgba(43,168,158,0.03),0_2px_4px_rgba(0,0,0,0.01)] flex flex-col justify-between min-h-[380px] group transition-shadow duration-300 hover:shadow-[0_24px_48px_rgba(43,168,158,0.08)] cursor-pointer"
            >
              {/* Teal Push Pin (floating in 3D) */}
              <div 
                className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-teal/95 drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] group-hover:scale-110 transition-transform duration-300 z-20"
                style={{ transform: 'translateZ(25px)' }}
              >
                <Pin className="w-7 h-7 fill-current -rotate-[15deg]" />
              </div>

              <div style={{ transform: 'translateZ(10px)' }}>
                <div className="flex items-center gap-2 mb-6 font-mono text-[11px] uppercase tracking-wider text-teal font-bold">
                  <BookOpen className="w-4.5 h-4.5 text-teal" />
                  <span>Word of the Section</span>
                </div>

                <h3 className="font-serif text-[28px] sm:text-[32px] font-bold text-ink leading-tight mb-1">
                  Sahajta <span className="font-serif font-normal text-teal/80">(सहजता)</span>
                </h3>
                <p className="font-sans text-[11px] tracking-wider text-ink-mute uppercase font-bold mb-4">
                  Phonetic: /sə.hədʒ.t̪aː/
                </p>

                <p className="font-serif italic text-teal/95 text-[14.5px] mb-3 leading-relaxed">
                  “Spontaneous, effortless naturalness.”
                </p>

                <p className="font-sans text-[13px] leading-[1.6] text-ink-soft">
                  The supreme spiritual state of being in constant, unforced flow with existence. Acting from your true nature, completely free of anxiety, pretense, or struggle.
                </p>
              </div>

              <div 
                className="border-t border-teal/5 pt-5 mt-auto"
                style={{ transform: 'translateZ(8px)' }}
              >
                <span className="font-sans text-[11px] text-ink-mute leading-normal block">
                  Brought to you by Sahaj Philosophy.
                </span>
              </div>
            </TiltCard>

            {/* CARD 3: DAILY CHALLENGE */}
            <TiltCard
              initialRotate={-0.5}
              className={`relative p-8 sm:p-9 rounded-xl border transition-all duration-300 min-h-[380px] flex flex-col justify-between group cursor-pointer ${
                challengeAccepted 
                  ? 'bg-teal/[0.02] border-teal/30 shadow-[0_16px_36px_-8px_rgba(43,168,158,0.1)]' 
                  : 'bg-[#FAF8F5] border-teal/5 shadow-[0_10px_24px_rgba(43,168,158,0.03),0_2px_4px_rgba(0,0,0,0.01)] hover:shadow-[0_24px_48px_rgba(43,168,158,0.07)]'
              }`}
            >
              {/* Brass Push Pin (floating in 3D) */}
              <div 
                className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-ink/80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] group-hover:scale-110 transition-transform duration-300 z-20"
                style={{ transform: 'translateZ(25px)' }}
              >
                <Pin className="w-7 h-7 fill-current rotate-[5deg]" />
              </div>

              <div style={{ transform: 'translateZ(10px)' }}>
                <div className="flex items-center gap-2 mb-6 font-mono text-[11px] uppercase tracking-wider text-ink/70 font-bold">
                  <div className={`w-2 h-2 rounded-full ${challengeAccepted ? 'bg-teal animate-ping' : 'bg-orange animate-pulse'}`} />
                  <span>Daily Mindful Challenge</span>
                </div>

                <h3 className="font-serif text-[22px] sm:text-[24px] text-ink font-normal leading-tight mb-3">
                  Digital Detox Hour
                </h3>
                
                <p className="font-sans text-[13.5px] leading-[1.65] text-ink-soft mb-4">
                  Disconnect from all screens (phone, laptop, television) for exactly 1 hour after sunset today. Spend that time walking, writing, or sitting in absolute quiet.
                </p>
              </div>

              <div style={{ transform: 'translateZ(12px)' }}>
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
            </TiltCard>

          </div>
        </div>

      </div>
    </section>
  );
}
