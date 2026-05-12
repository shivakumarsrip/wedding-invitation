/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Hero } from './components/Hero.tsx';
import { Navbar } from './components/Navbar.tsx';
import { CoupleIntro } from './components/CoupleIntro.tsx';
import { Timeline } from './components/Timeline.tsx';
import { Events } from './components/Events.tsx';
import { Countdown } from './components/Countdown.tsx';
import { Gallery } from './components/Gallery.tsx';
import { Venue } from './components/Venue.tsx';
import { RSVP } from './components/RSVP.tsx';
import { Footer } from './components/Footer.tsx';
import { PetalBackground } from './components/PetalBackground.tsx';
import { motion, useScroll, useSpring } from 'motion/react';
import { AdminDashboard } from './pages/AdminDashboard.tsx';

function WeddingSite() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-royal-gold z-[100] origin-left"
        style={{ scaleX }}
      />

      <PetalBackground />
      <Navbar />
      
      <main>
        <Hero />
        <CoupleIntro />
        <Countdown />
        <Events />
        <Timeline />
        <Gallery />
        <Venue />
        <RSVP />
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WeddingSite />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
