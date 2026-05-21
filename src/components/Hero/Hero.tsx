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

interface HeroProps {
  onTourClick?: () => void;
  onPhilosophyClick?: () => void;
}

interface TextWordProps {
  text: string;
  color?: string;
  fontWeight?: 'light' | 'black';
}

function TextWord({ text, color = '#0a0a0a', fontWeight = 'light' }: TextWordProps) {
  const fontClass =
    fontWeight === 'black'
      ? "font-['Fraunces',sans-serif] font-black"
      : "font-['Fraunces',sans-serif] font-light";

  return (
    <span
      className={`${fontClass} inline-block`}
      style={{
        color,
        fontVariationSettings: "'SOFT' 0, 'WONK' 1",
      }}
    >
      {text}
    </span>
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
  const orbitRadiusPercent = 42;
  const bubbleSize = 120;

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
              width: `${bubbleSize}px`,
              height: `${bubbleSize}px`,
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
      <div className="absolute w-[88%] aspect-square animate-pulse rounded-full border-2 border-[#2bab9c]/20" />
      <div className="absolute w-[94%] aspect-square rounded-full border border-[#2bab9c]/10" />

      <div className="relative flex w-[82%] aspect-square items-center justify-center rounded-full border-8 border-white/90 bg-gradient-to-br from-[#FAF8F2] to-[#f5f0e8] shadow-[0_0_80px_rgba(43,171,156,0.15),0_20px_60px_rgba(0,0,0,0.1)]">
        <img
          src={sahajLogo}
          alt="Sahaj Spirit"
          className="relative z-10 w-[72%] h-[72%] object-contain drop-shadow-[0_8px_24px_rgba(43,171,156,0.18)]"
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

      <div className="relative grid min-h-[calc(100vh-7rem)] items-center gap-12 px-4 pb-16 pt-4 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-20">
        <div className="relative order-2 flex min-h-[420px] items-center justify-center lg:order-1 lg:min-h-[700px]">
          <div className="relative aspect-square w-full max-w-[680px]">
            <CentralCircle />
            <OrbitingCircles />
          </div>
        </div>

        <div className="relative z-10 order-1 max-w-2xl space-y-8 lg:order-2">
          <div className="inline-flex items-center gap-3 rounded-full border border-[#2bab9c]/20 bg-[#2bab9c]/10 px-4 py-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#2bab9c]" />
            <p className="font-['Inter_Tight',sans-serif] text-xs font-semibold uppercase tracking-[0.15em] text-[#2bab9c]">
              A Jain Youth Movement - Since 2024
            </p>
          </div>

          <div className="space-y-3">
            <h1 className="text-5xl leading-[1.1] tracking-tight md:text-6xl lg:text-8xl">
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

          <p className="max-w-xl font-['Inter_Tight',sans-serif] text-lg leading-relaxed text-[#6b6b6b] md:text-xl">
            Somewhere beneath the anxiety, the noise, the pressure - there is a version of you that has always been calm. Always been whole. Always been enough. That is your Sahaj self. And it was never lost.
          </p>

          <div className="flex flex-wrap items-center gap-5 pt-4">
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
          </div>
        </div>
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
