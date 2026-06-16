import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LenisProvider from './components/shared/LenisProvider';
import Cursor from './components/shared/Cursor';
import Nav from './components/Nav';
import Hero from './components/Hero/Hero';
import LogoTicker from './components/LogoTicker';
import Philosophy from './components/Philosophy';
import Experiences from './components/Experiences/Experiences';
import BulletinBoard from './components/BulletinBoard';
import Tour from './components/Tour';
import Footer from './components/Footer';
import RegistrationModal from './components/RegistrationModal';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import RefundPage from './pages/RefundPage';
import PricingPage from './pages/PricingPage';
import DeliveryPage from './pages/DeliveryPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePhilosophyScroll = () => {
    const el = document.querySelector('#philosophy');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSummitScroll = () => {
    const el = document.querySelector('#summit');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <LenisProvider>
      <div className="relative min-h-screen bg-[#F7F3EC] text-ink selection:bg-teal/20 selection:text-teal font-sans">
        <Cursor />
        <Nav onRegisterClick={() => setIsModalOpen(true)} />
        <Hero onSummitClick={handleSummitScroll} onPhilosophyClick={handlePhilosophyScroll} />
        <LogoTicker />
        <Philosophy />
        <Experiences onSummitClick={handleSummitScroll} />
        <BulletinBoard />
        <Tour onRegisterClick={() => setIsModalOpen(true)} />
        <Footer />
        <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </LenisProvider>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/refund" element={<RefundPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/delivery" element={<DeliveryPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}
