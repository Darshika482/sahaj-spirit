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

export default function Nav({ onRegisterClick }: NavProps) {
  const [activeLink, setActiveLink] = useState('Home');
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

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

        {/* Right: CTA Pill */}
        <div className="flex items-center gap-3">
          {/* Simple Mobile Menu Toggler */}
          <div className="md:hidden flex items-center pr-1">
            <select
              value={activeLink}
              onChange={(e) => {
                const link = navLinks.find(l => l.name === e.target.value);
                if (link) handleLinkClick(link.name, link.href);
              }}
              className="bg-transparent border border-teal/20 text-ink-soft text-xs rounded-full px-2 py-1 font-sans focus:outline-none focus:ring-1 focus:ring-teal"
            >
              {navLinks.map((link) => (
                <option key={link.name} value={link.name} className="bg-cream text-ink">
                  {link.name}
                </option>
              ))}
            </select>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRegisterClick}
            className="bg-orange hover:bg-orange-hover text-[#F7F3EC] px-5 py-2.5 rounded-full font-sans font-medium text-[13px] sm:text-[14px] flex items-center gap-1.5 shadow-[0_8px_20px_-8px_rgba(243,112,33,0.4)] transition-colors duration-300 pointer-events-auto"
            data-cursor-label="orange"
          >
            Register
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.button>
        </div>
      </motion.nav>
    </div>
  );
}
