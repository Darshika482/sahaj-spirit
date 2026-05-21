import { motion } from 'motion/react';
import svgPaths from '../../assets/hero/svgPaths';
import bubble1 from '../../assets/hero/bubble-1.png';
import bubble2 from '../../assets/hero/bubble-2.png';
import bubble3 from '../../assets/hero/bubble-3.png';
import bubble4 from '../../assets/hero/bubble-4.png';
import bubble5 from '../../assets/hero/bubble-5.png';
import bubble6 from '../../assets/hero/bubble-6.png';
import bgTexture from '../../assets/hero/bg-texture.png';
import heroBg from '../../assets/hero/hero-bg.png';
import sahajLogo from '../../assets/hero/logo.png';
import { SAHAJ_EASE } from '../../lib/motion';

interface HeroProps {
  onTourClick?: () => void;
  onPhilosophyClick?: () => void;
}

interface TextWordProps {
  text: string;
  color?: string;
  fontWeight?: 'light' | 'black';
}

const wordVariants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(14px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: SAHAJ_EASE },
  },
};

function TextWord({ text, color = '#0a0a0a', fontWeight = 'light' }: TextWordProps) {
  const fontClass =
    fontWeight === 'black'
      ? "font-['Fraunces',sans-serif] font-black"
      : "font-['Fraunces',sans-serif] font-light";

  return (
    <motion.span
      variants={wordVariants}
      className={`${fontClass} inline-block mr-[0.22em]`}
      style={{
        color,
        fontVariationSettings: "'SOFT' 0, 'WONK' 1",
        willChange: 'transform, filter, opacity',
      }}
    >
      {text.trim()}
    </motion.span>
  );
}

function OrbitingCircles() {
  const sources = [
    bubble1,
    bubble2,
    bubble3,
    bubble4,
    bubble5,
    bubble6,
    bubble1,
    bubble3,
    bubble5,
    bubble2,
  ];

  const count = sources.length;
  const orbitRadiusPercent = 44;
  const bubbleSizePercent = 22;

  return (
    <div className="absolute inset-0 animate-[orbit_60s_linear_infinite]">
      {sources.map((src, index) => {
        const angle = (index * 360) / count - 90;
        const rad = (angle * Math.PI) / 180;
        return (
          <div
            key={index}
            className="absolute"
            style={{
              left: `${50 + orbitRadiusPercent * Math.cos(rad)}%`,
              top: `${50 + orbitRadiusPercent * Math.sin(rad)}%`,
              width: `${bubbleSizePercent}%`,
              aspectRatio: '1 / 1',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="h-full w-full animate-[counterRotate_60s_linear_infinite] rounded-full overflow-hidden border-4 border-white/80 shadow-2xl backdrop-blur-sm transition-all duration-500 hover:scale-110 hover:border-[#2bab9c]/60">
              <img alt="" className="h-full w-full object-cover" src={src} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CentralCircle() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="absolute w-[64%] aspect-square animate-pulse rounded-full border-2 border-[#2bab9c]/20" />
      <div className="absolute w-[70%] aspect-square rounded-full border border-[#2bab9c]/10" />

      <div className="relative flex w-[56%] aspect-square items-center justify-center rounded-full border-8 border-white/90 bg-gradient-to-br from-[#FAF8F2] to-[#f5f0e8] shadow-[0_0_80px_rgba(43,171,156,0.15),0_20px_60px_rgba(0,0,0,0.1)]">
        <img
          src={sahajLogo}
          alt="Sahaj Spirit"
          className="relative z-10 w-[78%] h-[78%] object-contain drop-shadow-[0_8px_24px_rgba(43,171,156,0.18)]"
        />
      </div>
    </div>
  );
}

export default function Hero({ onTourClick, onPhilosophyClick }: HeroProps) {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#fdfcfa] via-white to-[#f8f6f3] pt-28 lg:pt-32">
      <div className="absolute inset-0">
        <img
          alt=""
          aria-hidden
          className="h-full w-full object-cover opacity-40"
          src={heroBg}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#fdfcfa]/60 via-[#fdfcfa]/40 to-[#f8f6f3]/80" />
      </div>
      <div className="absolute inset-0 opacity-15 mix-blend-multiply">
        <img
          alt=""
          aria-hidden
          className="h-full w-full object-cover"
          src={bgTexture}
        />
      </div>
      <div className="absolute inset-0 opacity-25">
        <div className="h-full w-full bg-[radial-gradient(circle_at_top_right,rgba(43,171,156,0.12),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(244,127,31,0.12),transparent_45%)]" />
      </div>

      <div className="absolute -left-64 top-20 h-[600px] w-[600px] rounded-full bg-gradient-radial from-[#2bab9c]/15 to-transparent blur-3xl" />
      <div className="absolute -right-64 bottom-20 h-[600px] w-[600px] rounded-full bg-gradient-radial from-[#f47f1f]/15 to-transparent blur-3xl" />

      <div className="relative grid min-h-[calc(100vh-7rem)] items-center gap-10 px-4 pb-16 pt-4 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:px-16 xl:px-20">
        <div className="relative order-2 flex min-h-[360px] items-center justify-center lg:order-1 lg:min-h-[640px]">
          <div className="relative aspect-square w-full max-w-[760px]">
            <CentralCircle />
            <OrbitingCircles />
          </div>
        </div>

        <motion.div
          className="relative z-10 order-1 max-w-2xl space-y-6 sm:space-y-8 lg:order-2"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16, filter: 'blur(10px)' },
              visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: SAHAJ_EASE } },
            }}
            className="inline-flex items-center gap-3 rounded-full border border-[#2bab9c]/20 bg-[#2bab9c]/10 px-4 py-2"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#2bab9c]" />
            <p className="font-['Inter_Tight',sans-serif] text-[11px] font-semibold uppercase tracking-[0.15em] text-[#2bab9c] sm:text-xs">
              A Jain Youth Movement - Since 2024
            </p>
          </motion.div>

          <div className="space-y-3">
            <h1 className="text-[clamp(2.25rem,6.2vw,5.5rem)] leading-[1.05] tracking-tight">
              <div className="mb-2">
                <TextWord text="You " />
                <TextWord text="are " />
                <TextWord text="not " />
                <TextWord text="broken." />
              </div>
              <div className="mb-2">
                <TextWord text="You " color="#5a5a5a" />
                <TextWord text="are " color="#5a5a5a" />
                <TextWord text="just " color="#5a5a5a" />
                <TextWord text="forgetting" color="#5a5a5a" />
              </div>
              <div>
                <TextWord text="who " color="#2bab9c" fontWeight="black" />
                <TextWord text="you " color="#2bab9c" fontWeight="black" />
                <TextWord text="are." color="#2bab9c" fontWeight="black" />
              </div>
            </h1>
          </div>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 18, filter: 'blur(10px)' },
              visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: SAHAJ_EASE } },
            }}
            className="max-w-xl font-['Inter_Tight',sans-serif] text-[clamp(0.95rem,1.2vw,1.15rem)] leading-relaxed text-[#6b6b6b]"
          >
            Somewhere beneath the anxiety, the noise, the pressure - there is a version of you that has always been calm. Always been whole. Always been enough. That is your Sahaj self. And it was never lost.
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 18, filter: 'blur(10px)' },
              visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: SAHAJ_EASE } },
            }}
            className="flex flex-wrap items-center gap-5 pt-4"
          >
            <button
              className="group flex items-center gap-3 rounded-full bg-gradient-to-r from-[#f47f1f] to-[#ff9a3d] px-8 py-4 shadow-xl transition-all duration-300 hover:scale-105 hover:from-[#e67010] hover:to-[#f47f1f] hover:shadow-2xl"
              onClick={onTourClick}
            >
              <span className="font-['Inter_Tight',sans-serif] text-base font-semibold text-white">
                Experience Sahaj Tour '26
              </span>
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 16 16">
                <path d="M3.33333 8H12.6667" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                <path d={svgPaths.p1d405500} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </button>

            <button
              className="group flex items-center gap-2 text-[#2bab9c] transition-colors hover:text-[#1e8a7f]"
              onClick={onPhilosophyClick}
            >
              <span className="border-b-2 border-[#2bab9c] pb-1 font-['Inter_Tight',sans-serif] text-base font-medium group-hover:border-[#1e8a7f]">
                Learn the philosophy
              </span>
              <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-y-1" fill="none" viewBox="0 0 14 14">
                <path d="M7 2.91667V11.0833" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                <path d={svgPaths.p10793100} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @keyframes orbit {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes counterRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
      `}</style>
    </section>
  );
}
