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
import sahajSummitCollage from '../../assets/hero/sahaj-summit-collage.png';
import { SAHAJ_EASE } from '../../lib/motion';

interface HeroProps {
  onTourClick?: () => void;
  onPhilosophyClick?: () => void;
}

interface TextWordProps {
  text: string;
  color?: string;
  fontWeight?: 'light' | 'bold' | 'black';
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
  const weightClass =
    fontWeight === 'black'
      ? 'font-black'
      : fontWeight === 'bold'
      ? 'font-bold'
      : 'font-light';
  const fontClass = `font-['Fraunces',sans-serif] ${weightClass}`;

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

// bubble3 = crowd/audience shot, bubble6 = main speaker close-up (1.2× size).
const ORBIT_BUBBLES: { src: string; emphasis?: boolean }[] = [
  { src: bubble1 },
  { src: bubble2 },
  { src: bubble3, emphasis: true },
  { src: bubble4 },
  { src: bubble5 },
  { src: bubble6, emphasis: true },
  { src: bubble1 },
  { src: bubble3, emphasis: true },
  { src: bubble5 },
  { src: bubble2 },
];

const ORBIT_RADIUS_PERCENT = 44;
const BUBBLE_BASE_SIZE_PERCENT = 22;
const BUBBLE_EMPHASIS_SIZE_PERCENT = BUBBLE_BASE_SIZE_PERCENT * 1.2;

function ConnectionWeb() {
  const count = ORBIT_BUBBLES.length;

  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {/* Orbit rings + radial spokes sit behind the center logo disc */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] aspect-square rounded-full border border-teal/10" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[64%] aspect-square animate-pulse rounded-full border-2 border-teal/20" />

      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full animate-[orbit_60s_linear_infinite] text-teal"
        style={{ opacity: 0.2 }}
      >
        {ORBIT_BUBBLES.map((_, index) => {
          const angle = (index * 360) / count - 90;
          const rad = (angle * Math.PI) / 180;
          const x = 50 + ORBIT_RADIUS_PERCENT * Math.cos(rad);
          const y = 50 + ORBIT_RADIUS_PERCENT * Math.sin(rad);
          return (
            <line
              key={index}
              x1="50"
              y1="50"
              x2={x}
              y2={y}
              stroke="currentColor"
              strokeWidth="0.25"
              strokeLinecap="round"
            />
          );
        })}
      </svg>
    </div>
  );
}

function OrbitingCircles() {
  const count = ORBIT_BUBBLES.length;

  return (
    <div className="pointer-events-none absolute inset-0 z-[1]">
      <div className="absolute inset-0 animate-[orbit_60s_linear_infinite]">
        {ORBIT_BUBBLES.map(({ src, emphasis }, index) => {
          const angle = (index * 360) / count - 90;
          const rad = (angle * Math.PI) / 180;
          const sizePercent = emphasis ? BUBBLE_EMPHASIS_SIZE_PERCENT : BUBBLE_BASE_SIZE_PERCENT;
          return (
            <div
              key={index}
              className="pointer-events-auto absolute"
              style={{
                left: `${50 + ORBIT_RADIUS_PERCENT * Math.cos(rad)}%`,
                top: `${50 + ORBIT_RADIUS_PERCENT * Math.sin(rad)}%`,
                width: `${sizePercent}%`,
                aspectRatio: '1 / 1',
                transform: 'translate(-50%, -50%)',
                zIndex: emphasis ? 2 : 1,
              }}
            >
              <div className="h-full w-full animate-[counterRotate_60s_linear_infinite] rounded-full overflow-hidden border-4 border-white/80 shadow-2xl backdrop-blur-sm transition-all duration-500 hover:scale-110 hover:border-teal/60">
                <img alt="" className="h-full w-full object-cover" src={src} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CentralCircle() {
  // The logo PNG bakes together the S mark, the SAHAJ SPIRIT wordmark and the
  // outer "SOULFUL ALLIANCE OF HAPPINESS AND JOY" curved text. To dim ONLY the
  // outer text ring (to 0.45) while keeping the inner S + wordmark at full
  // opacity, render the logo twice:
  //   • Base layer at opacity 0.45 (shows through as the dimmed outer ring)
  //   • Top layer at full opacity, masked to a tighter inner disc so only
  //     the central S + wordmark is visible and overlays the base layer.
  const innerMask =
    'radial-gradient(circle at 50% 50%, #000 0%, #000 58%, transparent 70%)';

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
      <div className="relative flex w-[56%] aspect-square items-center justify-center rounded-full border-8 border-white/90 bg-gradient-to-br from-[#FAF8F2] to-[#f5f0e8] shadow-[0_0_80px_rgba(43,168,158,0.15),0_20px_60px_rgba(0,0,0,0.1)]">
        <img
          src={sahajLogo}
          alt=""
          aria-hidden
          className="absolute inset-0 m-auto w-[78%] h-[78%] object-contain"
          style={{ opacity: 0.45 }}
        />
        <img
          src={sahajLogo}
          alt="Sahaj Spirit"
          className="relative z-10 w-[78%] h-[78%] object-contain drop-shadow-[0_8px_24px_rgba(29,158,117,0.18)]"
          style={{
            WebkitMaskImage: innerMask,
            maskImage: innerMask,
          }}
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

      <div className="absolute -left-64 top-20 h-[600px] w-[600px] rounded-full bg-gradient-radial from-[#1D9E75]/15 to-transparent blur-3xl" />
      <div className="absolute -right-64 bottom-20 h-[600px] w-[600px] rounded-full bg-gradient-radial from-[#f47f1f]/15 to-transparent blur-3xl" />

      {/* Teal flow lines — quiet, breathing background structure. Opacity-only pulse, paths do not move. */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full hero-flow-pulse"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <g stroke="#1D9E75" strokeWidth="1.25" strokeLinecap="round" fill="none">
          <path d="M -40 320 C 240 220, 520 460, 820 360 S 1320 240, 1520 320" />
          <path d="M -40 420 C 260 340, 540 560, 860 460 S 1340 340, 1520 420" />
          <path d="M -40 560 C 240 480, 520 700, 820 600 S 1320 480, 1520 560" />
          <path d="M -40 680 C 260 600, 540 800, 860 720 S 1340 600, 1520 680" />
        </g>
      </svg>

      <div className="relative grid min-h-[calc(100vh-7rem)] items-center gap-10 px-4 pb-12 pt-4 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:px-16 xl:px-20">
        <div className="relative order-2 flex min-h-[360px] items-center justify-center overflow-visible lg:order-1 lg:min-h-[640px]">
          {/* Sahaj Summit youth collage — sits beside the orbit sphere on the left */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: SAHAJ_EASE, delay: 0.35 }}
            className="pointer-events-none absolute bottom-4 left-0 z-0 w-[min(200px,42vw)] sm:bottom-6 sm:w-[min(220px,36vw)] lg:bottom-8 lg:w-[min(240px,20vw)] lg:-left-4 xl:-left-8"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-[0_20px_50px_-16px_rgba(0,0,0,0.18)]">
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[32%] bg-gradient-to-b from-[#fdfcfa] via-[#fdfcfa]/90 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[12%] bg-gradient-to-t from-[#f8f6f3] to-transparent" />
              <img
                src={sahajSummitCollage}
                alt=""
                className="block h-auto w-full"
                draggable={false}
              />
            </div>
          </motion.div>

          {/* Sphere wrapper:                                                                  */}
          {/*   • aspect-square keeps it perfectly round                                        */}
          {/*   • max-w 680px is ~10% smaller than the prior 760px                              */}
          {/*   • viewport-height cap prevents the sphere + emphasis bubbles (which extend      */}
          {/*     ~13% beyond the orbit) from cropping below the fold on shorter screens.      */}
          {/*     16rem reserves room for navbar, section padding, and bubble overflow.        */}
          <div
            className="relative z-[1] aspect-square w-full"
            style={{ maxWidth: 'min(680px, calc(100vh - 16rem))' }}
          >
            <ConnectionWeb />
            <OrbitingCircles />
            <CentralCircle />
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
            className="space-y-2"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-teal/20 bg-teal/10 px-4 py-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-teal" />
              <p className="font-['Inter_Tight',sans-serif] text-[11px] font-semibold uppercase tracking-[0.15em] text-teal sm:text-xs">
                A Jain Youth Movement - Since 2024
              </p>
            </div>
            <p
              className="font-['Inter_Tight',sans-serif] text-[13px] text-[#3a3a3a]"
              style={{ opacity: 0.6 }}
            >
              10,000+ youth  ·  across India
            </p>
          </motion.div>

          <div>
            {/* Three-line cascading statement, all lines share the same font size. */}
            {/* L1 lands hardest (near-black, bold), L2 recedes (muted dark @ 0.75), */}
            {/* L3 is the teal payoff. Font cap tuned so the longest line ("You are */}
            {/* just forgetting", 22 chars) holds on a single line at every width. */}
            <h1 className="text-[clamp(2rem,4.8vw,4.25rem)] leading-[1.08] tracking-tight">
              <div className="whitespace-nowrap">
                <TextWord text="You " color="#1a1a1a" fontWeight="bold" />
                <TextWord text="are " color="#1a1a1a" fontWeight="bold" />
                <TextWord text="not " color="#1a1a1a" fontWeight="bold" />
                <TextWord text="broken." color="#1a1a1a" fontWeight="bold" />
              </div>
              <div className="whitespace-nowrap" style={{ opacity: 0.75 }}>
                <TextWord text="You " color="#4a4a4a" />
                <TextWord text="are " color="#4a4a4a" />
                <TextWord text="just " color="#4a4a4a" />
                <TextWord text="forgetting" color="#4a4a4a" />
              </div>
              <div className="whitespace-nowrap">
                <TextWord text="who " color="var(--color-teal)" fontWeight="bold" />
                <TextWord text="you " color="var(--color-teal)" fontWeight="bold" />
                <TextWord text="are." color="var(--color-teal)" fontWeight="bold" />
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
              className="group flex items-center gap-2 text-teal/80 transition-colors duration-300 hover:text-teal"
              onClick={onPhilosophyClick}
            >
              {/* At rest: no underline. On hover: underline appears at 0.5 opacity, color #1D9E75. */}
              <span className="relative pb-1 font-['Inter_Tight',sans-serif] text-base font-medium">
                Learn the philosophy
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] bg-teal opacity-0 transition-opacity duration-300 group-hover:opacity-50"
                />
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

        @keyframes heroFlowPulse {
          0%, 100% { opacity: 0.08; }
          50%      { opacity: 0.14; }
        }

        .hero-flow-pulse {
          opacity: 0.11;
          animation: heroFlowPulse 6s ease-in-out infinite;
          will-change: opacity;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-flow-pulse {
            animation: none;
            opacity: 0.11;
          }
        }
      `}</style>
    </section>
  );
}
