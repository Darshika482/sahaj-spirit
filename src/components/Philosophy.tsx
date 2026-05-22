import { motion } from 'motion/react';
import { fadeInUp, staggerContainer } from '../lib/motion';
import BlurText from './shared/BlurText';
import sahajLogoExplained from '../assets/sahaj logo explained.jpg';


export default function Philosophy() {
  return (
    <section id="philosophy" className="py-24 sm:py-32 px-6 sm:px-12 bg-[#FBF7F0] border-t border-teal/5 relative">
      {/* Dynamic graphic accents */}
      <div className="absolute top-10 right-10 w-48 h-48 rounded-full bg-teal/5 filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-orange/5 filter blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
        {/* Header Block */}
        <div className="w-full text-center max-w-3xl mb-8 sm:mb-12">
          <BlurText
            as="span"
            className="font-sans font-medium text-[12px] uppercase tracking-[0.18em] text-teal block mb-4"
          >
            OUR SOULFUL MANIFESTO
          </BlurText>
          <BlurText
            as="h2"
            duration={1}
            delay={0.05}
            className="font-serif text-[clamp(36px,5vw,64px)] font-normal text-ink leading-[1.1] tracking-tight mb-6"
          >
            A Return to the <span className="italic text-teal">Unforced Blueprints</span> of Your Being
          </BlurText>
          <BlurText
            as="p"
            delay={0.2}
            className="font-sans text-[16px] sm:text-[18px] leading-[1.6] text-ink-soft"
          >
            Founded in 2024, Sahaj Spirit is a secular, spiritual alliance designed specifically for modern youth. We bridge timeless principles and contemporary realities to guide you home.
          </BlurText>
        </div>


        {/* Gallery / Showcases */}
        <motion.div
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="w-full flex flex-col gap-12 sm:gap-16"
        >
          {/* Card 1: Logo Explained */}
          <motion.div
            variants={fadeInUp}
            className="group flex flex-col bg-[#F7F3EC]/50 hover:bg-[#F7F3EC]/80 border border-teal/5 rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-all duration-500 w-full"
          >
            <div>
              <div className="overflow-hidden rounded-xl bg-white border border-teal/5 flex items-center justify-center p-6 sm:p-8 relative w-full">
                <img
                  src={sahajLogoExplained}
                  alt="Sahaj Logo Explained"
                  className="w-full h-auto object-contain transition-transform duration-750 group-hover:scale-[1.01]"
                  draggable={false}
                />
              </div>
              <h4 className="font-serif text-[22px] font-normal text-ink mt-6 mb-2">
                The Sahaj Emblem Explained
              </h4>
              <p className="font-sans text-[15px] leading-[1.6] text-ink-soft">
                A visual guide to the sacred geometry and profound spiritual symbolism integrated into the Sahaj Summit identity.
              </p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
