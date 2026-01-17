import { useState, useEffect } from 'react';
import { initAnalytics } from './utils/analytics';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MobileProvider } from './contexts/MobileContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { HelmetProvider } from 'react-helmet-async';

// Components
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import LoadingSpinner from './components/ui/LoadingSpinner';
import ErrorBoundary from './components/ui/ErrorBoundary';
import SeoMeta from './components/seo/SeoMeta';

// Pages
import Home from './components/sections/Home';
import HireMe from './components/sections/HireMe';
import ProjectPage from './components/sections/ProjectPage';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import TestConnection from './components/TestConnection';

// SEO Hook
import useSEO from './hooks/UseSEO';

// Analytics and Performance
import { trackPageView, trackPerformance } from './utils/analytics';

function AppContent() {
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState('home');
  const location = useLocation();

  // SEO configuration for different routes
  const getSEOData = (pathname) => {
    const seoConfig = {
      '/': {
        title: "Yamukelani Ntimbane - Full-Stack Web Developer | Portfolio",
        description: "Professional full-stack web developer specializing in React, Node.js, and modern web technologies. Based in South Africa, delivering high-quality web solutions.",
        keywords: "Yamukelani Ntimbane, web developer, full-stack developer, React developer, Node.js developer, South Africa developer, portfolio",
        schema: {
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Yamukelani Ntimbane",
          "url": "https://yamukelanintimbane.com",
          "image": "https://yamukelanintimbane.com/images/profile/Yamdev.jpg",
          "sameAs": [
            "https://www.linkedin.com/in/yamukelani-ntimbane",
            "https://github.com/yamukelani-ntimbane",
            "https://twitter.com/yamukelani_dev"
          ],
          "jobTitle": "Full-Stack Web Developer",
          "worksFor": {
            "@type": "Organization",
            "name": "Freelance"
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Johannesburg",
            "addressRegion": "Gauteng",
            "addressCountry": "ZA"
          },
          "knowsAbout": [
            "React.js", "Node.js", "JavaScript", "TypeScript", "MongoDB", 
            "Express.js", "Tailwind CSS", "Vite", "Framer Motion"
          ],
          "award": "Dean's List for 3 consecutive years"
        }
      },
      '/about': {
        title: "About Yamukelani Ntimbane - Professional Web Developer",
        description: "Learn about Yamukelani Ntimbane, a passionate full-stack web developer with expertise in modern technologies and a commitment to excellence.",
        keywords: "Yamukelani Ntimbane, about, web developer, full-stack, experience, background"
      },
      '/skills': {
        title: "Skills & Technologies - Yamukelani Ntimbane",
        description: "Explore the technical skills and technologies that Yamukelani Ntimbane specializes in, including React, Node.js, and more.",
        keywords: "Yamukelani Ntimbane, skills, technologies, React, Node.js, JavaScript, TypeScript, web development"
      },
      '/projects': {
        title: "Portfolio Projects - Yamukelani Ntimbane",
        description: "View Yamukelani Ntimbane's portfolio of web development projects, showcasing expertise in modern web technologies.",
        keywords: "Yamukelani Ntimbane, portfolio, projects, web development, React projects, Node.js projects",
        schema: {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Portfolio Projects - Yamukelani Ntimbane",
          "description": "Collection of web development projects showcasing expertise in modern technologies.",
          "url": "https://yamukelanintimbane.com/projects",
          "mainEntity": {
            "@type": "ItemList",
            "name": "Web Development Projects",
            "description": "Professional web development projects"
          }
        }
      },
      '/experience': {
        title: "Experience & Education - Yamukelani Ntimbane",
        description: "Discover Yamukelani Ntimbane's professional experience and educational background in web development.",
        keywords: "Yamukelani Ntimbane, experience, education, career, professional background"
      },
      '/testimonials': {
        title: "Client Testimonials - Yamukelani Ntimbane",
        description: "Read testimonials from satisfied clients who have worked with Yamukelani Ntimbane on their web development projects.",
        keywords: "Yamukelani Ntimbane, testimonials, client reviews, feedback, web development services"
      },
      '/contact': {
        title: "Contact - Yamukelani Ntimbane",
        description: "Get in touch with Yamukelani Ntimbane for web development projects, consultations, or collaborations.",
        keywords: "Yamukelani Ntimbane, contact, email, phone, social media, get in touch"
      },
      '/hire-me': {
        title: "Hire Me - Yamukelani Ntimbane",
        description: "Hire Yamukelani Ntimbane for your next web development project. Get a quote and start your project today.",
        keywords: "Yamukelani Ntimbane, hire, freelance, web development, project quote, services"
      }
    };

    return seoConfig[pathname] || seoConfig['/'];
  };

  // Initialize SEO
  const seoData = getSEOData(location.pathname);
  useSEO(seoData);

  useEffect(() => {
    // Initialize analytics
    initAnalytics();

    // Simulate loading time for assets
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Track page view
    trackPageView(location.pathname);

    // Track performance metrics
    trackPerformance();

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {/* SEO Meta Tags */}
      <SeoMeta {...seoData} />
      
      <div className="min-h-screen bg-dark-500">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <>
              <Navigation currentSection={currentSection} />
              <Home onSectionChange={setCurrentSection} />
              <Footer />
            </>
          } />
          
          {/* Hire Route */}
          <Route path="/hire" element={
            <>
              <Navigation currentSection="hire" />
              <HireMe onSectionChange={() => {}} />
              <Footer />
            </>
          } />
          
          {/* Projects Route */}
          <Route path="/projects" element={
            <>
              <Navigation currentSection="projects" />
              <ProjectPage />
              <Footer />
            </>
          } />
          <Route path="/projects/:projectId" element={
            <>
              <Navigation currentSection="projects" />
              <ProjectPage />
              <Footer />
            </>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          
          {/* Test Route */}
          <Route path="/test-connection" element={<TestConnection />} />
          
          {/* 404 Route */}
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-4">404 - Page Not Found</h1>
                <p className="text-gray-400 mb-8">The page you're looking for doesn't exist.</p>
                <a href="/" className="text-accent-purple hover:underline">
                  Return to Home
                </a>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider>
          <AuthProvider>
            <MobileProvider>
              <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <AppContent />
              </Router>
            </MobileProvider>
          </AuthProvider>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;