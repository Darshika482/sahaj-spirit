import { motion } from 'motion/react';
import { fadeInUp, staggerContainer } from '../lib/motion';
import BlurText from './shared/BlurText';
import comicPanel1 from '../assets/comic_panel_1.png';
import comicPanel2 from '../assets/comic_panel_2.png';
import comicPanel3 from '../assets/comic_panel_3.png';
import comicPanel4 from '../assets/comic_panel_4.png';
import contentData from '../data/content.json';

const IMAGE_MAP: Record<string, string> = {
  'comicPanel1': comicPanel1,
  'comicPanel2': comicPanel2,
  'comicPanel3': comicPanel3,
  'comicPanel4': comicPanel4,
  '/src/assets/comic_panel_1.png': comicPanel1,
  '/src/assets/comic_panel_2.png': comicPanel2,
  '/src/assets/comic_panel_3.png': comicPanel3,
  '/src/assets/comic_panel_4.png': comicPanel4,
};

const comicPanels = contentData.comic.map(panel => ({
  ...panel,
  image: IMAGE_MAP[panel.image] || panel.image
}));

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
            blur={0}
            className="font-sans text-[16px] sm:text-[18px] leading-[1.7] text-ink/80 antialiased"
          >
            Founded in 2024, Sahaj Spirit is a secular, spiritual alliance designed specifically for modern youth. We bridge timeless principles and contemporary realities to guide you home.
          </BlurText>
        </div>


        {/* Comic Section Header */}
        <div className="w-full text-center max-w-2xl mb-10 mt-8">
          <BlurText
            as="h3"
            className="font-serif text-[28px] font-normal text-ink mb-3"
          >
            The Sahaj Comic
          </BlurText>
          <BlurText
            as="p"
            blur={0}
            className="font-sans text-[16px] sm:text-[17px] leading-[1.7] text-ink/80 antialiased"
          >
            A visual story of leaving the chaos behind to rediscover the unforced rhythm of your being.
          </BlurText>
        </div>

        {/* 4-Image Grid Comic Panel */}
        <motion.div
          variants={staggerContainer(0.1, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {comicPanels.map((panel, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="group flex flex-col bg-white hover:bg-[#FBF7F0]/60 border border-teal/5 rounded-2xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:shadow-[0_16px_40px_rgba(43,168,158,0.06)] transition-all duration-500"
            >
              <div className="overflow-hidden rounded-xl bg-white border border-teal/5 aspect-square flex items-center justify-center relative w-full mb-4">
                <img
                  src={panel.image}
                  alt={panel.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  draggable={false}
                />
                <span className="absolute top-3 left-3 bg-teal/90 text-white font-mono text-[10px] px-2.5 py-0.5 rounded-full z-10 shadow-sm">
                  PANEL {idx + 1}
                </span>
              </div>
              <h4 className="font-serif text-[18px] font-normal text-ink mb-1.5 leading-snug">
                {panel.title}
              </h4>
              <p className="font-sans text-[15px] sm:text-[16px] leading-[1.65] text-ink/80 antialiased flex-grow">
                {panel.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
