import { useState } from 'react';
import LenisProvider from './components/shared/LenisProvider';
import Cursor from './components/shared/Cursor';
import Nav from './components/Nav';
import Hero from './components/Hero/Hero';
import LogoTicker from './components/LogoTicker';
import Philosophy from './components/Philosophy';
import Experiences from './components/Experiences/Experiences';
import Tour from './components/Tour';
import Footer from './components/Footer';
import RegistrationModal from './components/RegistrationModal';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRegisterOpen = () => {
    setIsModalOpen(true);
  };

  const handlePhilosophyScroll = () => {
    const el = document.querySelector('#philosophy');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSummitScroll = () => {
    const el = document.querySelector('#summit');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <LenisProvider>
      <div className="relative min-h-screen bg-[#F7F3EC] text-ink selection:bg-teal/20 selection:text-teal font-sans">
        {/* Magnet Custom Cursor */}
        <Cursor />

        {/* Glass floating pill Nav */}
        <Nav onRegisterClick={handleRegisterOpen} />

        {/* Hero Section centerpiece with dual-rotating clockwise-counter orb bubbles */}
        <Hero 
          onSummitClick={handleSummitScroll} 
          onPhilosophyClick={handlePhilosophyScroll} 
        />

        {/* Marquee ticker of brand + partner logos */}
        <LogoTicker />

        {/* Philosophy details block describing Samyakta, Sahajta, Samyama */}
        <Philosophy />

        {/* The Nine Immersive Experiences scrolling pins or responsive stacked sheets */}
        <Experiences onSummitClick={handleSummitScroll} />

        {/* The Sahaj tour details containing JITO sponsorships & Countdown ticks */}
        <Tour onRegisterClick={handleRegisterOpen} />

        {/* Outlined brand title footer displaying managing team phone keys */}
        <Footer />

        {/* Interactive Booking pass generator */}
        <RegistrationModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      </div>
    </LenisProvider>
  );
}
