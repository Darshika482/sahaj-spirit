import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { fadeInUp, staggerContainer } from '../lib/motion';

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
      title: 'Ancient Heritage Bhraman',
      desc: 'Guided silence walking tour through the Sahaj Summit’s mythological ruins, oldest temples, and calm meditation parks.',
      num: 'I'
    },
    {
      title: 'Youth Summit Assembly',
      desc: 'Connect with 500+ corporate professionals, students, and thinkers in highly raw modern debates and discussions.',
      num: 'II'
    },
    {
      title: 'Divine Musical Keertan',
      desc: 'An evening of live instrumental fusion and devotional jamming that resonates deep within your soul.',
      num: 'III'
    },
    {
      title: 'Exquisite specialized Jain Food',
      desc: 'Sophisticated global dishes prepared purely according to traditional Jain spiritual standards.',
      num: 'IV'
    }
  ];

  return (
    <section id="tour" className="py-24 sm:py-32 px-6 sm:px-12 bg-[#F7F3EC] border-t border-teal/5 relative overflow-hidden select-none">
      
      {/* Dynamic Graphic Background Accent lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.02] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <line x1="10%" y1="0" x2="10%" y2="100%" stroke="var(--color-teal)" strokeWidth="1"/>
        <line x1="90%" y1="0" x2="90%" y2="100%" stroke="var(--color-teal)" strokeWidth="1"/>
      </svg>

      <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Collaboration Brand Header */}
        <div className="w-full text-center max-w-4xl mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-sans font-medium text-[11px] sm:text-[12px] uppercase tracking-[0.2em] text-teal block mb-4"
          >
            SAHAJ CHAPTERS • THE FLAGSHIP EVENT
          </motion.span>
          
          <h2 className="font-serif text-[clamp(40px,5.5vw,72px)] font-normal text-ink leading-none tracking-tight mb-4">
            <span className="italic text-teal">Sahaj Summit</span>
          </h2>
          
          <p className="font-sans text-[15px] sm:text-[16px] tracking-wide text-ink-soft uppercase font-semibold flex flex-wrap items-center justify-center gap-1.5 mt-2">
            <span>In collaboration with</span>
            <span className="text-teal border border-teal/20 px-2.5 py-0.5 rounded-full text-xs">JITO North Zone</span>
            <span>&</span>
            <span className="text-teal border border-teal/20 px-2.5 py-0.5 rounded-full text-xs">JITO Aligarh</span>
          </p>
        </div>

        {/* Big Countdown Timer - JetBrains Mono vibe */}
        <div className="w-full max-w-3xl bg-[#FBF7F0] border border-teal/10 rounded-2xl p-6 sm:p-10 mb-16 text-center shadow-[0_12px_36px_-12px_rgba(43,168,158,0.1)]">
          <span className="font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-teal opacity-70 block mb-6">
            COUNTDOWN TO DEPARTURE • 6 NOV 2026
          </span>
          
          <div className="grid grid-cols-4 gap-2 sm:gap-6 items-center">
            
            {/* Days block */}
            <div className="flex flex-col">
              <span className="font-mono text-[clamp(28px,6vw,64px)] font-medium text-ink leading-none">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="font-sans text-[11px] uppercase tracking-widest text-[#8B8B8B] mt-2">Days</span>
            </div>
            
            {/* Hours block */}
            <div className="flex flex-col">
              <span className="font-mono text-[clamp(28px,6vw,64px)] font-medium text-ink leading-none">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="font-sans text-[11px] uppercase tracking-widest text-[#8B8B8B] mt-2">Hours</span>
            </div>
            
            {/* Minutes block */}
            <div className="flex flex-col">
              <span className="font-mono text-[clamp(28px,6vw,64px)] font-medium text-ink leading-none">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="font-sans text-[11px] uppercase tracking-widest text-[#8B8B8B] mt-2">Mins</span>
            </div>
            
            {/* Seconds block */}
            <div className="flex flex-col">
              <span className="font-mono text-[clamp(28px,6vw,64px)] font-medium text-teal leading-none">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="font-sans text-[11px] uppercase tracking-widest text-[#8B8B8B] mt-2">Secs</span>
            </div>

          </div>
        </div>

        {/* Content detail layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start w-full">
          
          {/* Left: Beautiful Context Detail Card (col-span-5) */}
          <div className="col-span-1 lg:col-span-5 bg-[#FBF7F0]/80 p-8 sm:p-10 border border-teal/5 rounded-2xl flex flex-col items-start text-left shadow-lg">
            <h3 className="font-serif text-[32px] font-normal text-ink leading-tight mb-4">
              The Ancient Soil
            </h3>
            <p className="font-sans text-[15px] sm:text-[16px] leading-[1.6] text-ink-soft mb-6">
              The Sahaj Summit is not just a destination. It is held on the birthplace of multiple Jain Tirthankaras — where the soil itself vibrates with the memories of massive renunciations, absolute stillness, and ultimate wisdom.
            </p>
            <p className="font-sans text-[15px] sm:text-[16px] leading-[1.6] text-ink-soft mb-8">
              On <strong>November 6, 2026</strong>, Sahaj Spirit brings together over 500 modern minds to tread this sacred geometry together, unlocking simplicity in a highly complex age.
            </p>

            {/* Travel Details bullets */}
            <div className="flex flex-col gap-3 font-sans text-xs uppercase tracking-widest text-teal font-medium w-full border-t border-teal/10 pt-6">
              <div className="flex justify-between">
                <span>DATE:</span>
                <span className="text-ink">6 NOVEMBER 2026</span>
              </div>
              <div className="flex justify-between">
                <span>VENUE:</span>
                <span className="text-ink">SAHAJ SUMMIT</span>
              </div>
              <div className="flex justify-between">
                <span>START TIME:</span>
                <span className="text-ink">06:00 AM IST</span>
              </div>
              <div className="flex justify-between">
                <span>COLLABORATOR:</span>
                <span className="text-ink">JITO NORTH & ALIGARH</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onRegisterClick}
              className="bg-orange hover:bg-orange-hover text-[#F7F3EC] px-7 py-4 rounded-full font-sans font-medium text-[14px] mt-8 w-full flex items-center justify-center gap-1.5 shadow-[0_8px_20px_-8px_rgba(243,112,33,0.4)] cursor-pointer"
              data-cursor-label="look"
            >
              Book My Ticket →
            </motion.button>
          </div>

          {/* Right: Feature columns (col-span-7) */}
          <div className="col-span-1 lg:col-span-7 flex flex-col gap-6 w-full text-left">
            <h4 className="font-sans font-bold text-[12px] uppercase tracking-[0.2em] text-teal mb-2">
              HIGHLIGHTS OF THE PILGRIMAGE
            </h4>
            
            <motion.div 
              variants={staggerContainer(0.08, 0)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {tourFeatures.map((feat) => (
                <motion.div
                  key={feat.title}
                  variants={fadeInUp}
                  className="bg-[#FBF7F0]/40 hover:bg-[#FBF7F0]/80 border border-teal/5 rounded-xl p-6 transition-all duration-300 flex flex-col items-start gap-4 relative group"
                >
                  <div className="w-8 h-8 rounded-full bg-teal/5 flex items-center justify-center text-teal font-serif font-bold text-xs select-none">
                    {feat.num}
                  </div>
                  <div>
                    <h5 className="font-serif text-[20px] text-ink mb-2 group-hover:text-teal transition-colors duration-300">
                      {feat.title}
                    </h5>
                    <p className="font-sans text-[14px] leading-relaxed text-ink-soft">
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
