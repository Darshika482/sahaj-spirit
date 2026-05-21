import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import sahajLogo from '../assets/hero/logo.png';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Philosophy', href: '#philosophy' },
  { name: 'Experiences', href: '#experiences' },
  { name: 'Sahaj Tour', href: '#tour' },
  { name: 'Contact', href: '#contact' }
];

interface NavProps {
  onRegisterClick?: () => void;
}

function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="w-5 h-3.5 flex flex-col justify-between items-center relative">
      <motion.span
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 6 : 0,
        }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="w-full h-[2px] bg-teal rounded-full origin-center"
      />
      <motion.span
        animate={{
          opacity: isOpen ? 0 : 1,
        }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="w-full h-[2px] bg-teal rounded-full"
      />
      <motion.span
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? -6 : 0,
        }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="w-full h-[2px] bg-teal rounded-full origin-center"
      />
    </div>
  );
}

export default function Nav({ onRegisterClick }: NavProps) {
  const [activeLink, setActiveLink] = useState('Home');
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLinkClick = (name: string, href: string) => {
    setActiveLink(name);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-6xl z-40 px-4">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-16 bg-[#F7F3EC]/70 backdrop-blur-md rounded-full px-4 sm:px-6 flex items-center justify-between border border-[#2BA89E]/10 shadow-[0_12px_32px_-12px_rgba(43,168,158,0.1)]"
        id="navbar"
      >
        {/* Left: Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('Home', '#home');
          }}
          className="flex items-center gap-2.5 cursor-pointer"
          data-cursor-label="view"
        >
          <img
            src={sahajLogo}
            alt="Sahaj Spirit"
            className="h-10 w-auto select-none"
            draggable={false}
          />
        </a>

        {/* Center: Desktop links */}
        <div className="hidden md:flex items-center gap-1.5 bg-[#FBF7F0]/40 px-2.5 py-1.5 rounded-full border border-teal/5">
          {navLinks.map((link) => {
            const isSelected = activeLink === link.name;
            const isHovered = hoveredLink === link.name;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.name, link.href);
                }}
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
                className={`relative px-4 py-2 font-sans font-medium text-[14px] transition-colors duration-300 rounded-full ${
                  isSelected ? 'text-teal font-semibold' : 'text-ink-soft hover:text-ink'
                }`}
                data-cursor-label="view"
              >
                {/* Active Underline */}
                {isSelected && (
                  <motion.div
                    layoutId="navUnderline"
                    className="absolute inset-0 bg-teal/10 border border-teal/20 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {/* Hover Neon Laser Outline Tracker */}
                {isHovered && !isSelected && (
                  <motion.div
                    layoutId="navHoverPill"
                    className="absolute inset-0 bg-transparent border border-[#2BA89E]/50 rounded-full shadow-[0_0_12px_rgba(43,168,158,0.35),inset_0_0_6px_rgba(43,168,158,0.15)]"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </div>

        {/* Right: CTA Pill & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRegisterClick}
            className="bg-orange hover:bg-orange-hover text-[#F7F3EC] px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-sans font-medium text-[12px] sm:text-[14px] flex items-center gap-1.5 shadow-[0_8px_20px_-8px_rgba(243,112,33,0.4)] transition-colors duration-300 pointer-events-auto cursor-pointer"
            data-cursor-label="orange"
          >
            <span>Register</span>
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.button>

          {/* Mobile Menu Toggle Button */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-full border border-teal/10 hover:border-teal/20 flex items-center justify-center bg-[#FBF7F0]/40 backdrop-blur-sm cursor-pointer select-none transition-colors duration-300 pointer-events-auto"
            aria-label="Toggle mobile menu"
            data-cursor-label="view"
          >
            <HamburgerIcon isOpen={isMobileMenuOpen} />
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Dropdown Menu Card */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[calc(100%+0.5rem)] left-4 right-4 bg-[#F7F3EC]/95 backdrop-blur-xl rounded-3xl p-6 border border-teal/15 shadow-[0_24px_48px_-12px_rgba(43,168,158,0.22)] flex flex-col gap-4 md:hidden z-30"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link, idx) => {
                const isSelected = activeLink === link.name;
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04, duration: 0.3 }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.name, link.href);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-between px-5 py-3 rounded-2xl font-sans font-medium text-[15px] transition-all duration-300 ${
                      isSelected
                        ? 'bg-teal/10 text-teal font-semibold border-l-4 border-teal'
                        : 'text-ink-soft hover:bg-teal/5 hover:text-ink border-l-4 border-transparent'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isSelected && (
                      <svg
                        className="w-4 h-4 text-teal"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
