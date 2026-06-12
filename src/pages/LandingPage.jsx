import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Projects from '../components/sections/Projects';
import WhyHireMe from '../components/sections/WhyHireMe'; 
import Contact from '../components/sections/Contact';
import PageTransition from '../components/layout/PageTransition';

const LandingPage = () => {
  const location = useLocation();

  // Gradient mouse effect (from main.js setupGradientMouse)
  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let gradientX = 0, gradientY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const updateGradient = () => {
      gradientX += (mouseX - gradientX) * 0.1;
      gradientY += (mouseY - gradientY) * 0.1;
      document.documentElement.style.setProperty('--mouse-x', gradientX + 'px');
      document.documentElement.style.setProperty('--mouse-y', gradientY + 'px');
      requestAnimationFrame(updateGradient);
    };

    document.addEventListener('mousemove', handleMouseMove);
    updateGradient();

    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Hero /></PageTransition>} />
        <Route path="/about" element={
          <PageTransition>
            <About />
            <WhyHireMe />
          </PageTransition>
        } />
        <Route path="/skills" element={<PageTransition><Skills /></PageTransition>} />
        <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

export default LandingPage;