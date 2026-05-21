import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { fadeInUp, staggerContainer } from '../lib/motion';
import BlurText from './shared/BlurText';

interface TourProps {
  onRegisterClick?: () => void;
}

export default function Tour({ onRegisterClick }: TourProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Target: 6 November 2026 (the specified Sahaj Tour date)
    const targetDate = new Date('2026-11-06T08:00:00Z').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const tourFeatures = [
    {
      index: '01',
      title: 'Ancient Heritage Bhraman',
      desc: 'Guided silence walking tour through the Sahaj Summit’s mythological ruins, oldest temples, and calm meditation parks.',
      icon: (
        <svg className="w-5 h-5 transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21v-8a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8M12 2v4M9 6h6M7 12V8a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v4M10 21v-5a2 2 0 0 1 4 0v5" />
        </svg>
      )
    },
    {
      index: '02',
      title: 'Youth Summit Assembly',
      desc: 'Connect with 500+ corporate professionals, students, and thinkers in highly raw modern debates and discussions.',
      icon: (
        <svg className="w-5 h-5 transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    {
      index: '03',
      title: 'Divine Musical Keertan',
      desc: 'An evening of live instrumental fusion and devotional jamming that resonates deep within your soul.',
      icon: (
        <svg className="w-5 h-5 transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 10l12-3M9 14l12-3M9 19c0 1.657-1.79 3-4 3s-4-1.343-4-3 1.79-3 4-3 4 1.343 4 3zm12-3c0 1.657-1.79 3-4 3s-4-1.343-4-3 1.79-3 4-3 4 1.343 4 3z" />
        </svg>
      )
    },
    {
      index: '04',
      title: 'Exquisite Jain Food',
      desc: 'Sophisticated global dishes prepared purely according to traditional Jain spiritual standards.',
      icon: (
        <svg className="w-5 h-5 transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707-.707M12 5a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm-4 7a4 4 0 0 1 8 0H8z" />
        </svg>
      )
    }
  ];

  // Circumference for radius 54 is ~339.3
  const circumference = 339.3;
  const secsRatio = timeLeft.seconds / 60;
  const minsRatio = timeLeft.minutes / 60;
  const hoursRatio = timeLeft.hours / 24;
  const daysRatio = Math.min(timeLeft.days / 365, 1);

  return (
    <section id="tour" className="py-24 sm:py-32 px-6 sm:px-12 bg-[#F7F3EC] border-t border-teal/5 relative overflow-hidden select-none">
      
      {/* Ambient background glow behind title */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-gradient-radial from-teal/5 to-transparent blur-[80px] pointer-events-none" />

      {/* Dynamic Graphic Background Accent lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.02] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <line x1="10%" y1="0" x2="10%" y2="100%" stroke="var(--color-teal)" strokeWidth="1"/>
        <line x1="90%" y1="0" x2="90%" y2="100%" stroke="var(--color-teal)" strokeWidth="1"/>
      </svg>

      <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Collaboration Brand Header */}
        <div className="w-full text-center max-w-4xl mb-16 relative">
          <BlurText
            as="span"
            className="font-sans font-bold text-[11px] sm:text-[12px] uppercase tracking-[0.25em] text-teal block mb-4"
          >
            SAHAJ CHAPTERS • THE FLAGSHIP EVENT
          </BlurText>

          <BlurText
            as="h2"
            mode="words"
            stagger={0.07}
            duration={0.9}
            delay={0.05}
            className="font-serif text-[clamp(42px,6vw,80px)] font-normal text-ink leading-none tracking-tight mb-6 italic text-teal"
            text="Sahaj Summit"
          />

          <BlurText
            as="div"
            delay={0.25}
            className="font-sans text-[12px] sm:text-[13px] tracking-wider text-ink-soft uppercase font-bold flex flex-wrap items-center justify-center gap-2 mt-4"
          >
            <span>In collaboration with</span>
            <span className="inline-flex items-center gap-1.5 text-teal bg-[#FBF7F0] border border-teal/15 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.12em] shadow-[0_4px_12px_rgba(43,168,158,0.04)] hover:border-teal/40 hover:shadow-[0_6px_16px_rgba(43,168,158,0.08)] transition-all duration-300">
              <span className="w-1.5 h-1.5 rounded-full bg-teal" />
              JITO NORTH ZONE
            </span>
            <span className="text-ink-mute font-normal mx-0.5">&</span>
            <span className="inline-flex items-center gap-1.5 text-teal bg-[#FBF7F0] border border-teal/15 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.12em] shadow-[0_4px_12px_rgba(43,168,158,0.04)] hover:border-teal/40 hover:shadow-[0_6px_16px_rgba(43,168,158,0.08)] transition-all duration-300">
              <span className="w-1.5 h-1.5 rounded-full bg-teal" />
              JITO ALIGARH
            </span>
          </BlurText>
        </div>

        {/* Chronograph Watch Dashboard Countdown */}
        <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 justify-items-center mb-20">
          
          {/* Days block */}
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 bg-[#FBF7F0] border border-teal/10 rounded-full flex flex-col items-center justify-center shadow-[0_12px_30px_-8px_rgba(43,168,158,0.06)] hover:border-teal/20 transition-all duration-300 group">
            <svg className="absolute w-full h-full rotate-[-90deg] p-1" viewBox="0 0 120 120">
              {/* Background dial ring */}
              <circle cx="60" cy="60" r="54" fill="transparent" stroke="var(--color-cream)" strokeWidth="3.5" />
              {/* Dynamic progress ring */}
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="transparent"
                stroke="var(--color-teal)"
                strokeWidth="3.5"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - daysRatio * circumference}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            
            {/* Center Info */}
            <div className="flex flex-col items-center justify-center z-10">
              <span className="font-mono text-[28px] sm:text-[32px] font-medium text-ink leading-none">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="font-sans text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.2em] text-[#8B8B8B] mt-2 group-hover:text-teal transition-colors duration-300">
                Days
              </span>
            </div>
          </div>
          
          {/* Hours block */}
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 bg-[#FBF7F0] border border-teal/10 rounded-full flex flex-col items-center justify-center shadow-[0_12px_30px_-8px_rgba(43,168,158,0.06)] hover:border-teal/20 transition-all duration-300 group">
            <svg className="absolute w-full h-full rotate-[-90deg] p-1" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" fill="transparent" stroke="var(--color-cream)" strokeWidth="3.5" />
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="transparent"
                stroke="var(--color-teal)"
                strokeWidth="3.5"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - hoursRatio * circumference}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            
            <div className="flex flex-col items-center justify-center z-10">
              <span className="font-mono text-[28px] sm:text-[32px] font-medium text-ink leading-none">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="font-sans text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.2em] text-[#8B8B8B] mt-2 group-hover:text-teal transition-colors duration-300">
                Hours
              </span>
            </div>
          </div>
          
          {/* Minutes block */}
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 bg-[#FBF7F0] border border-teal/10 rounded-full flex flex-col items-center justify-center shadow-[0_12px_30px_-8px_rgba(43,168,158,0.06)] hover:border-teal/20 transition-all duration-300 group">
            <svg className="absolute w-full h-full rotate-[-90deg] p-1" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" fill="transparent" stroke="var(--color-cream)" strokeWidth="3.5" />
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="transparent"
                stroke="var(--color-teal)"
                strokeWidth="3.5"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - minsRatio * circumference}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            
            <div className="flex flex-col items-center justify-center z-10">
              <span className="font-mono text-[28px] sm:text-[32px] font-medium text-ink leading-none">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="font-sans text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.2em] text-[#8B8B8B] mt-2 group-hover:text-teal transition-colors duration-300">
                Mins
              </span>
            </div>
          </div>
          
          {/* Seconds block */}
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 bg-[#FBF7F0] border border-teal/10 rounded-full flex flex-col items-center justify-center shadow-[0_12px_30px_-8px_rgba(43,168,158,0.06)] hover:border-teal/20 transition-all duration-300 group">
            <svg className="absolute w-full h-full rotate-[-90deg] p-1" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" fill="transparent" stroke="var(--color-cream)" strokeWidth="3.5" />
              {/* Rotating faint sub-ticks */}
              <circle cx="60" cy="60" r="50" fill="transparent" stroke="var(--color-orange)" strokeWidth="0.5" strokeDasharray="2 12" className="opacity-10 animate-spin [animation-duration:30s]" />
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="transparent"
                stroke="var(--color-orange)"
                strokeWidth="3.5"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - secsRatio * circumference}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            
            <div className="flex flex-col items-center justify-center z-10">
              <span className="font-mono text-[28px] sm:text-[32px] font-semibold text-orange leading-none">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="font-sans text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.2em] text-[#8B8B8B] mt-2 group-hover:text-orange transition-colors duration-300">
                Secs
              </span>
            </div>
          </div>

        </div>

        {/* Content detail layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start w-full">
          
          {/* Left: Textured Pilgrimage Ticket Pass (col-span-5) */}
          <div className="col-span-1 lg:col-span-5 bg-[#FCF9F3] p-8 sm:p-10 border-4 border-double border-teal/15 rounded-3xl flex flex-col items-stretch text-left shadow-[0_24px_64px_-24px_rgba(43,168,158,0.18)] relative overflow-visible">
            
            {/* Golden Seal Watermark Stamp */}
            <div className="absolute top-6 right-6 w-14 h-14 rounded-full border border-orange/20 flex items-center justify-center text-center rotate-[15deg] pointer-events-none opacity-[0.35] select-none">
              <div className="w-12 h-12 rounded-full border border-dashed border-orange/20 flex flex-col items-center justify-center p-0.5">
                <span className="font-sans text-[6px] tracking-widest text-orange font-bold uppercase leading-none">SAHAJ</span>
                <span className="font-script text-xs text-orange font-bold leading-tight my-0.5">Summit</span>
                <span className="font-sans text-[5px] tracking-wider text-orange uppercase leading-none">2026</span>
              </div>
            </div>

            {/* Ticket Header Stub */}
            <div className="flex justify-between items-center w-full mb-6 font-mono text-[9px] tracking-[0.25em] text-[#8B8B8B] uppercase border-b border-teal/5 pb-4">
              <span>SUMMIT PASS #2026</span>
              <span className="text-teal font-bold">★ OFFICIAL ADMIT</span>
            </div>

            <div className="flex flex-col items-start text-left">
              <BlurText
                as="h3"
                duration={0.9}
                className="font-serif text-[32px] font-normal text-ink leading-tight mb-4"
              >
                The Ancient Soil
              </BlurText>
              
              <BlurText
                as="p"
                delay={0.1}
                className="font-sans text-[14px] leading-[1.65] text-ink-soft mb-5"
              >
                The Sahaj Summit is not just a destination. It is held on the birthplace of multiple Jain Tirthankaras — where the soil itself vibrates with the memories of massive renunciations, absolute stillness, and ultimate wisdom.
              </BlurText>
              
              <BlurText
                as="p"
                delay={0.2}
                className="font-sans text-[14px] leading-[1.65] text-ink-soft mb-2"
              >
                On <strong>November 6, 2026</strong>, Sahaj Spirit brings together over 500 modern minds to tread this sacred geometry together, unlocking simplicity in a highly complex age.
              </BlurText>
            </div>

            {/* Tear-off Line with Circle Bites */}
            <div className="relative w-full my-8 flex items-center justify-center">
              <div className="absolute left-0 right-0 border-t border-dashed border-teal/20" />
              {/* Tear off instruction text */}
              <span className="relative bg-[#FCF9F3] px-3.5 font-mono text-[8px] tracking-[0.25em] text-[#8B8B8B]/60 uppercase z-10 select-none">
                FOLD & TEAR ALONG THIS LINE
              </span>
              {/* Left Bite */}
              <div className="absolute w-8 h-8 bg-[#F7F3EC] rounded-full -left-[48px] sm:-left-[56px] border border-teal/10 shadow-[inset_-3px_0_6px_rgba(0,0,0,0.02)] z-10" />
              {/* Right Bite */}
              <div className="absolute w-8 h-8 bg-[#F7F3EC] rounded-full -right-[48px] sm:-right-[56px] border border-teal/10 shadow-[inset_3px_0_6px_rgba(0,0,0,0.02)] z-10" />
            </div>

            {/* Ticket Travel Details Stub */}
            <div className="grid grid-cols-2 gap-y-5 gap-x-4 w-full">
              
              {/* DATE */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal/[0.04] flex items-center justify-center text-teal border border-teal/10 shrink-0">
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-[9px] tracking-wider text-[#8B8B8B] uppercase font-bold">Date</span>
                  <span className="font-sans text-xs font-semibold text-ink leading-tight">6 Nov 2026</span>
                </div>
              </div>

              {/* VENUE */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal/[0.04] flex items-center justify-center text-teal border border-teal/10 shrink-0">
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-[9px] tracking-wider text-[#8B8B8B] uppercase font-bold">Venue</span>
                  <span className="font-sans text-xs font-semibold text-ink leading-tight">Sahaj Summit</span>
                </div>
              </div>

              {/* START TIME */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal/[0.04] flex items-center justify-center text-teal border border-teal/10 shrink-0">
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-[9px] tracking-wider text-[#8B8B8B] uppercase font-bold">Time</span>
                  <span className="font-sans text-xs font-semibold text-ink leading-tight">06:00 AM IST</span>
                </div>
              </div>

              {/* HOSTS */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal/[0.04] flex items-center justify-center text-teal border border-teal/10 shrink-0">
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-[9px] tracking-wider text-[#8B8B8B] uppercase font-bold">Hosts</span>
                  <span className="font-sans text-xs font-semibold text-ink leading-tight">JITO Chapters</span>
                </div>
              </div>

            </div>

            {/* Decorative SVG Barcode */}
            <div className="w-full mt-8 flex flex-col items-center gap-2 border-t border-teal/10 pt-6">
              <div className="flex items-center justify-center gap-[2px] h-9 w-full opacity-55">
                <div className="w-[3px] h-full bg-ink" />
                <div className="w-[1px] h-full bg-ink" />
                <div className="w-[1px] h-full bg-ink" />
                <div className="w-[4px] h-full bg-ink" />
                <div className="w-[2px] h-full bg-ink" />
                <div className="w-[1px] h-full bg-ink" />
                <div className="w-[3px] h-full bg-ink" />
                <div className="w-[2px] h-full bg-ink" />
                <div className="w-[1px] h-full bg-ink" />
                <div className="w-[5px] h-full bg-ink" />
                <div className="w-[1px] h-full bg-ink" />
                <div className="w-[2px] h-full bg-ink" />
                <div className="w-[4px] h-full bg-ink" />
                <div className="w-[1px] h-full bg-ink" />
                <div className="w-[3px] h-full bg-ink" />
                <div className="w-[2px] h-full bg-ink" />
                <div className="w-[1px] h-full bg-ink" />
                <div className="w-[5px] h-full bg-ink" />
                <div className="w-[2px] h-full bg-ink" />
                <div className="w-[3px] h-full bg-ink" />
                <div className="w-[1px] h-full bg-ink" />
                <div className="w-[4px] h-full bg-ink" />
              </div>
              <span className="font-mono text-[8px] tracking-[0.35em] text-[#8B8B8B] uppercase">SAHAJSUMMIT-06112026-CONFIRMED</span>
            </div>

            {/* Book Ticket Button with Shimmer sweep */}
            <motion.button
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              onClick={onRegisterClick}
              className="relative overflow-hidden bg-orange text-[#F7F3EC] px-7 py-4 rounded-xl font-sans font-bold text-[13px] tracking-wider uppercase mt-6 w-full flex items-center justify-center gap-2 shadow-[0_10px_24px_-8px_rgba(243,112,33,0.4)] hover:shadow-[0_16px_36px_-8px_rgba(243,112,33,0.5)] transition-all duration-300 cursor-pointer border border-transparent group/btn"
              data-cursor-label="look"
            >
              {/* Shimmer Light element */}
              <motion.div 
                className="absolute inset-0 w-[50%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
                initial={{ left: '-100%' }}
                whileHover={{ left: '150%' }}
                transition={{ duration: 0.85, ease: "easeOut" }}
              />
              <span>Book My Ticket →</span>
            </motion.button>
          </div>

          {/* Right: Feature columns (col-span-7) */}
          <div className="col-span-1 lg:col-span-7 flex flex-col gap-8 w-full text-left">
            <h4 className="font-sans font-bold text-[11px] sm:text-[12px] uppercase tracking-[0.25em] text-teal border-b border-teal/10 pb-4 w-full">
              HIGHLIGHTS OF THE PILGRIMAGE
            </h4>
            
            <motion.div 
              variants={staggerContainer(0.08, 0)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full"
            >
              {tourFeatures.map((feat) => (
                <motion.div
                  key={feat.title}
                  variants={fadeInUp}
                  className="bg-[#FBF7F0]/40 hover:bg-[#FBF7F0]/90 border border-teal/10 hover:border-teal/20 rounded-2xl p-6 sm:p-8 transition-all duration-500 flex flex-col items-start gap-5 relative group shadow-[0_4px_12px_rgba(43,168,158,0.02)] hover:shadow-[0_20px_40px_-10px_rgba(43,168,158,0.08)]"
                >
                  {/* Floating script index number in Caveat font */}
                  <span className="absolute top-4 right-6 font-script text-[36px] font-bold text-teal/10 group-hover:text-teal/20 transition-colors duration-300 select-none">
                    {feat.index}
                  </span>

                  {/* Icon Circle Badge Wrapper */}
                  <div className="w-12 h-12 rounded-xl bg-teal/5 flex items-center justify-center text-teal group-hover:bg-teal group-hover:text-[#F7F3EC] transition-all duration-300 border border-teal/10 group-hover:border-transparent group-hover:scale-105 group-hover:shadow-[0_4px_12px_rgba(43,168,158,0.2)] shrink-0">
                    {feat.icon}
                  </div>
                  
                  <div>
                    <h5 className="font-serif text-[21px] text-ink mb-2 group-hover:text-teal transition-colors duration-300">
                      {feat.title}
                    </h5>
                    <p className="font-sans text-[14px] leading-[1.65] text-ink-soft">
                      {feat.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
