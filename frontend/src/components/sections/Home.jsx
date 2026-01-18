import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

// Components
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Experience from './Experience';
import Testimonials from './Testimonials';
import HireMe from './HireMe';
import Contact from './Contact';

const Home = ({ onSectionChange }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolling, setIsScrolling] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(80); // Default to 80px (5rem)
  
  // Section refs for smooth scrolling
  const sections = {
    hero: useRef(null),
    about: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    experience: useRef(null),
    testimonials: useRef(null),
    hire: useRef(null),
    contact: useRef(null)
  };

  // Get actual header height on component mount
  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.querySelector('header');
      if (header) {
        const height = header.offsetHeight;
        setHeaderHeight(height);
        console.log('Header height:', height, 'px');
      } else {
        // Fallback to common header heights
        const isMobile = window.innerWidth < 768;
        setHeaderHeight(isMobile ? 64 : 80); // 4rem for mobile, 5rem for desktop
      }
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return;

      const scrollPosition = window.scrollY + 100;
      
      // Determine active section based on scroll position
      const sectionEntries = Object.entries(sections).map(([key, ref]) => ({
        key,
        top: ref.current?.offsetTop || 0,
        height: ref.current?.offsetHeight || 0
      }));

      const active = sectionEntries
        .filter(entry => scrollPosition >= entry.top && scrollPosition < entry.top + entry.height)
        .pop();

      if (active && active.key !== activeSection) {
        setActiveSection(active.key);
        onSectionChange?.(active.key);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection, onSectionChange, isScrolling]);

  const scrollToSection = (sectionId) => {
    setIsScrolling(true);
    
    const section = sections[sectionId];
    if (section && section.current) {
      // Calculate position with header offset
      const sectionTop = section.current.offsetTop - headerHeight + 20; // +20 for a little extra spacing
      
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
      
      setActiveSection(sectionId);
      onSectionChange?.(sectionId);
      
      // Update URL without hash for clean URLs
      navigate(`/${sectionId === 'hero' ? '' : sectionId}`, { replace: true });
    }

    setTimeout(() => setIsScrolling(false), 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const sectionKeys = Object.keys(sections);
      const currentIndex = sectionKeys.indexOf(activeSection);
      const nextIndex = Math.min(currentIndex + 1, sectionKeys.length - 1);
      scrollToSection(sectionKeys[nextIndex]);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const sectionKeys = Object.keys(sections);
      const currentIndex = sectionKeys.indexOf(activeSection);
      const prevIndex = Math.max(currentIndex - 1, 0);
      scrollToSection(sectionKeys[prevIndex]);
    }
  };

  useEffect(() => {
    // Handle initial hash navigation
    const hash = location.hash.replace('#', '');
    if (hash && sections[hash]) {
      setTimeout(() => scrollToSection(hash), 300);
    }
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [location.hash, headerHeight]); // Added headerHeight dependency

  // Calculate scroll progress percentage
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const totalScroll = docHeight - windowHeight;
      const progress = totalScroll > 0 ? (scrollTop / totalScroll) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress(); // Initial call
    
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className="relative" style={{ paddingTop: `${headerHeight}px` }}>
      {/* Smooth scrolling container */}
      <div className="scroll-smooth">
        {/* Add scroll-margin-top to all sections for anchor links */}
        <section 
          ref={sections.hero} 
          className="min-h-screen flex items-center justify-center scroll-mt-20"
          style={{ scrollMarginTop: `${headerHeight + 20}px` }}
        >
          <Hero onNavigate={scrollToSection} />
        </section>
        
        <section 
          ref={sections.about} 
          className="scroll-mt-20"
          style={{ scrollMarginTop: `${headerHeight + 20}px` }}
        >
          <About />
        </section>
        
        <section 
          ref={sections.skills} 
          className="scroll-mt-20"
          style={{ scrollMarginTop: `${headerHeight + 20}px` }}
        >
          <Skills />
        </section>
        
        <section 
          ref={sections.projects} 
          className="scroll-mt-20"
          style={{ scrollMarginTop: `${headerHeight + 20}px` }}
        >
          <Projects />
        </section>
        
        <section 
          ref={sections.experience} 
          className="scroll-mt-20"
          style={{ scrollMarginTop: `${headerHeight + 20}px` }}
        >
          <Experience />
        </section>
        
        <section 
          ref={sections.testimonials} 
          className="scroll-mt-20"
          style={{ scrollMarginTop: `${headerHeight + 20}px` }}
        >
          <Testimonials />
        </section>
        
        <section 
          ref={sections.hire} 
          className="scroll-mt-20"
          style={{ scrollMarginTop: `${headerHeight + 20}px` }}
        >
          <HireMe />
        </section>
        
        <section 
          ref={sections.contact} 
          className="scroll-mt-20"
          style={{ scrollMarginTop: `${headerHeight + 20}px` }}
        >
          <Contact />
        </section>
      </div>

      {/* Floating action buttons for quick navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="fixed bottom-8 right-8 flex flex-col gap-4 z-40"
      >
        <button
          onClick={() => scrollToSection('hire')}
          className="bg-accent-purple text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          aria-label="Get in touch"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.82 0L21 8M4 12h16" />
          </svg>
        </button>
        
        <button
          onClick={() => navigate('/projects')}
          className="bg-accent-cyan text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          aria-label="View projects"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
          </svg>
        </button>
      </motion.div>

      {/* Scroll progress indicator - positioned below header */}
      <motion.div
        className="fixed left-0 right-0 h-1 bg-gray-800 z-50"
        style={{
          top: `${headerHeight}px`,
          transformOrigin: 'left',
          scaleX: scrollProgress / 100,
        }}
        transition={{ type: 'tween', duration: 0.1 }}
      >
        <div className="h-full bg-gradient-to-r from-accent-purple to-accent-cyan w-full" />
      </motion.div>

      {/* Optional: Quick navigation dots */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 hidden lg:flex flex-col gap-3 z-40">
        {Object.keys(sections).map((section) => (
          <button
            key={section}
            onClick={() => scrollToSection(section)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === section 
                ? 'bg-accent-purple scale-125' 
                : 'bg-gray-600 hover:bg-gray-400'
            }`}
            aria-label={`Scroll to ${section}`}
            title={`Go to ${section.charAt(0).toUpperCase() + section.slice(1)}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
