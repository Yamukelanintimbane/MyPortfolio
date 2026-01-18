import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
// Removed analytics import to fix build issues

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
  // Analytics tracking is handled through direct imports
  
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolling, setIsScrolling] = useState(false);
  
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
      section.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
      
      setActiveSection(sectionId);
      onSectionChange?.(sectionId);
      
      // Analytics tracking removed to fix build issues
      
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
      setTimeout(() => scrollToSection(hash), 100);
    }
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [location.hash]);

  return (
    <div className="relative">
      {/* Smooth scrolling container */}
      <div className="scroll-smooth">
        <section ref={sections.hero}>
          <Hero onNavigate={scrollToSection} />
        </section>
        
        <section ref={sections.about}>
          <About />
        </section>
        
        <section ref={sections.skills}>
          <Skills />
        </section>
        
        <section ref={sections.projects}>
          <Projects />
        </section>
        
        <section ref={sections.experience}>
          <Experience />
        </section>
        
        <section ref={sections.testimonials}>
          <Testimonials />
        </section>
        
        <section ref={sections.hire}>
          <HireMe />
        </section>
        
        <section ref={sections.contact}>
          <Contact />
        </section>
      </div>

      {/* Floating action buttons for quick navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="fixed bottom-8 right-8 flex flex-col gap-4 z-50"
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

      {/* Scroll progress indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <motion.div
          className="h-full bg-accent-purple"
          style={{
            width: `${(window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100}%`
          }}
          transition={{ type: 'tween', duration: 0.1 }}
        />
      </div>
    </div>
  );
};

export default Home;
