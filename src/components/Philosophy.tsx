import { motion } from 'motion/react';
import { fadeInUp, staggerContainer } from '../lib/motion';

const philosophyPillars = [
  {
    title: 'Effortlessness',
    hindi: 'सहजता',
    description: 'Stop fighting yourself. Modern life teaches you to constantly push, stress, and perform. Sahajta is the art of effortless alignment — letting go of psychological resistance to let your natural joy, calm, and intelligence breathe.',
  },
  {
    title: 'Awareness',
    hindi: 'सम्यक्त्व',
    description: 'A quiet, unshakeable presence. Inspired by Mahavira’s pure perspective, we translate ancient Jain mindfulness into the speed of absolute modernity. It is not about escaping your Monday mornings, but meeting them fully awake.',
  },
  {
    title: 'Compassion',
    hindi: 'संयम',
    description: 'Loving everything that breathes. Living with active non-violence (Ahimsa) and intentional simplicity. When we trim away the clutter of consumerism and validation-seeking, we discover we are already whole on our own.',
  },
];

export default function Philosophy() {
  return (
    <section id="philosophy" className="py-24 sm:py-32 px-6 sm:px-12 bg-[#FBF7F0] border-t border-teal/5 relative">
      {/* Dynamic graphic accents */}
      <div className="absolute top-10 right-10 w-48 h-48 rounded-full bg-teal/5 filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-orange/5 filter blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
        {/* Header Block */}
        <div className="w-full text-center max-w-3xl mb-16 sm:mb-24">
          <span className="font-sans font-medium text-[12px] uppercase tracking-[0.18em] text-teal block mb-4">
            OUR SOULFUL MANIFESTO
          </span>
          <h2 className="font-serif text-[clamp(36px,5vw,64px)] font-normal text-ink leading-[1.1] tracking-tight mb-6">
            A Return to the <span className="italic text-teal">Unforced Blueprints</span> of Your Being
          </h2>
          <p className="font-sans text-[16px] sm:text-[18px] leading-[1.6] text-ink-soft">
            Founded in 2024, Sahaj Spirit is a secular, spiritual alliance designed specifically for modern youth. We bridge timeless principles and contemporary realities to guide you home.
          </p>
        </div>

        {/* Pillars Grid */}
        <motion.div 
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
        >
          {philosophyPillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              variants={fadeInUp}
              className="bg-[#F7F3EC]/50 hover:bg-[#F7F3EC]/80 border border-teal/5 rounded-2xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-all duration-500 flex flex-col items-start text-left relative group overflow-hidden"
            >
              <div className="absolute -right-4 -top-4 font-serif text-[100px] text-teal/5 font-bold group-hover:scale-110 group-hover:text-teal/8 select-none transition-all duration-750">
                {idx + 1}
              </div>

              {/* Hindi Transliteration Label */}
              <span className="font-script text-[32px] text-teal leading-none mb-2">
                {pillar.hindi}
              </span>

              {/* Title */}
              <h3 className="font-serif text-[26px] font-normal text-ink leading-tight mb-4 group-hover:text-teal transition-colors duration-300">
                {pillar.title}
              </h3>

              {/* Description */}
              <p className="font-sans text-[15px] sm:text-[16px] leading-[1.6] text-ink-soft relative z-10">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
