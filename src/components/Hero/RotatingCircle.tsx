import { useState } from 'react';
import { motion } from 'motion/react';

const bubbles = [
  {
    id: 'bubble-01',
    angle: 12,
    size: 140,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=400&auto=format&fit=crop',
    alt: 'Sahaj Summit Workshop session',
  },
  {
    id: 'bubble-02',
    angle: 48,
    size: 96,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=400&auto=format&fit=crop',
    alt: 'Youth meditation session at Sahaj Summit',
  },
  {
    id: 'bubble-03',
    angle: 82,
    size: 168,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&auto=format&fit=crop',
    alt: 'Soulful Keertan performance and rhythm jam',
  },
  {
    id: 'bubble-04',
    angle: 120,
    size: 112,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=400&auto=format&fit=crop',
    alt: 'Nukkad Natak high energy road street play',
  },
  {
    id: 'bubble-05',
    angle: 158,
    size: 88,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400&auto=format&fit=crop',
    alt: 'Conscious specialised Jain meal plated cleanly',
  },
  {
    id: 'bubble-06',
    angle: 200,
    size: 152,
    image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=400&auto=format&fit=crop',
    alt: 'Guided pilgrimage at the Sahaj Summit',
  },
  {
    id: 'bubble-07',
    angle: 240,
    size: 104,
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=400&auto=format&fit=crop',
    alt: 'Joyful youth bonding and laughing in nature',
  },
];

export default function RotatingCircle() {
  const [isHovered, setIsHovered] = useState(false);

  const diameter = 1500;
  const radius = diameter / 2;

  return (
    <div className="relative w-full h-full flex items-center">
      {/* CSS Animation declaration */}
      <style>{`
        @keyframes rotateCW {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes rotateCCW {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        .outer-circle-rotate {
          animation: rotateCW 60s linear infinite;
        }
        .inner-bubble-counter-rotate {
          animation: rotateCCW 60s linear infinite;
        }
        .bg-circle-counter {
          animation: rotateCCW 90s linear infinite;
        }
      `}</style>

      {/* Behind the circle faints Concentric SVG ring (60s vs 90s) */}
      <div 
        className="absolute bg-circle-counter pointer-events-none"
        style={{
          width: '1600px',
          height: '1600px',
          left: '-800px',
          top: 'calc(50% - 800px)',
          animationPlayState: isHovered ? 'paused' : 'running',
        }}
      >
        <svg viewBox="0 0 1600 1600" className="w-full h-full opacity-[0.08] text-teal">
          <circle cx="800" cy="800" r="790" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="6, 12" />
        </svg>
      </div>

      {/* Main outer rotating circle wrapper */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          width: `${diameter}px`,
          height: `${diameter}px`,
          left: `-${radius}px`, // Centered off-screen to the left (50% is off)
          top: `calc(50% - ${radius}px)`,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Outer SVG Ring */}
        <div className="absolute inset-0 pointer-events-none">
          <svg viewBox="0 0 1500 1500" className="w-full h-full opacity-40 text-teal">
            <circle cx="750" cy="750" r="748" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
        </div>

        {/* Outer rotating wrapper content */}
        <div
          className="outer-circle-rotate absolute w-full h-full rounded-full"
          style={{
            animationPlayState: isHovered ? 'paused' : 'running',
          }}
        >
          {bubbles.map((bubble) => {
            const angleRad = (bubble.angle * Math.PI) / 180;
            const x = radius + radius * Math.cos(angleRad);
            const y = radius + radius * Math.sin(angleRad);

            return (
              <div
                key={bubble.id}
                className="absolute shadow-[0_12px_40px_-8px_rgba(43,168,158,0.18)]"
                style={{
                  width: `${bubble.size}px`,
                  height: `${bubble.size}px`,
                  left: `${x}px`,
                  top: `${y}px`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {/* Counter rotating bubble content */}
                <div
                  className="inner-bubble-counter-rotate w-full h-full rounded-full overflow-hidden border-2 border-white relative cursor-pointer group pointer-events-auto"
                  style={{
                    animationPlayState: isHovered ? 'paused' : 'running',
                  }}
                  data-cursor-label="look"
                >
                  <img
                    src={bubble.image}
                    alt={bubble.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-115"
                  />
                  {/* Glass tint on hover */}
                  <div className="absolute inset-0 bg-teal/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Center Logo - Sits STATIC in lower-left visible viewport, outside of the large rotating circle */}
      <div 
        className="absolute left-[340px] bottom-[12%] z-20 pointer-events-auto hidden lg:block"
        style={{ width: '180px', height: '180px' }}
      >
        <div className="relative w-full h-full select-none select-none">
          {/* Animated Curved Text */}
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <path
                id="textPath"
                d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
              />
            </defs>
            <text fill="var(--color-teal)" className="font-sans text-[11px] uppercase tracking-[0.2em] font-medium opacity-80 decoration-none fill-teal">
              <textPath href="#textPath" startOffset="0%">
                Soulful Alliance Of Happiness And Joy • Sahaj Spirit •
              </textPath>
            </text>
          </svg>

          {/* Infinity logo centered in the text badge */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-16 h-16 bg-[#F7F3EC] rounded-full flex items-center justify-center shadow-lg border border-teal/15">
              <svg viewBox="0 0 100 100" fill="none" className="w-10 h-10 text-teal">
                <path
                  d="M30 65C30 73.2843 36.7157 80 45 80C51.2721 80 56.5593 76.147 58.7402 70.625M70 35C70 26.7157 63.2843 20 55 20C48.7279 20 43.4407 23.853 41.2598 29.375"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <path
                  d="M58.7402 70.625C59.5638 68.5422 60 66.2735 60 63.9C60 55.6157 53.2843 48.9 45 48.9C36.7157 48.9 30 55.6157 30 63.9C30 66.2735 30.4362 68.5422 31.2598 70.625M41.2598 29.375C40.4362 31.4578 40 33.7265 40 36.1C40 44.3843 46.7157 51.1 55 51.1C63.2843 51.1 70 44.3843 70 36.1C70 33.7265 69.5638 31.4578 68.7402 29.375"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="1 10"
                />
                <path
                  d="M58.7402 70.625C51.6215 59.4565 48.3785 40.5435 41.2598 29.375"
                  stroke="#F37021"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
