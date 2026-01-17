import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Advanced SEO hook for dynamic meta tags and analytics
 */
export const useSEO = (seoData = {}) => {
  const location = useLocation();

  useEffect(() => {
    // Update page title based on route
    const pageTitle = getPageTitle(location.pathname);
    document.title = seoData.title || pageTitle;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', seoData.description || getPageDescription(location.pathname));
    }

    // Update keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', seoData.keywords || getPageKeywords(location.pathname));
    }

    // Update canonical URL
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', seoData.canonical || `https://yamukelanintimbane.com${location.pathname}`);
    }

    // Track page view for analytics (only once per route change)
    if (!window.__seoPageViewTracked || window.__seoPageViewTracked !== location.pathname) {
      window.__seoPageViewTracked = location.pathname;
      trackPageView(location.pathname, seoData);
    }

    // Update structured data if provided
    if (seoData.schema) {
      updateStructuredData(seoData.schema);
    }

  }, [location.pathname, seoData]);
};

/**
 * Get page title based on route
 */
const getPageTitle = (pathname) => {
  const titles = {
    '/': 'Yamukelani Ntimbane - Full-Stack Web Developer | Portfolio',
    '/about': 'About Yamukelani Ntimbane - Professional Web Developer',
    '/skills': 'Skills & Technologies - Yamukelani Ntimbane',
    '/projects': 'Portfolio Projects - Yamukelani Ntimbane',
    '/experience': 'Experience & Education - Yamukelani Ntimbane',
    '/testimonials': 'Client Testimonials - Yamukelani Ntimbane',
    '/contact': 'Contact - Yamukelani Ntimbane',
    '/hire-me': 'Hire Me - Yamukelani Ntimbane'
  };
  
  return titles[pathname] || 'Yamukelani Ntimbane - Full-Stack Web Developer';
};

/**
 * Get page description based on route
 */
const getPageDescription = (pathname) => {
  const descriptions = {
    '/': 'Professional full-stack web developer specializing in React, Node.js, and modern web technologies. Based in South Africa, delivering high-quality web solutions.',
    '/about': 'Learn about Yamukelani Ntimbane, a passionate full-stack web developer with expertise in modern technologies and a commitment to excellence.',
    '/skills': 'Explore the technical skills and technologies that Yamukelani Ntimbane specializes in, including React, Node.js, and more.',
    '/projects': 'View Yamukelani Ntimbane\'s portfolio of web development projects, showcasing expertise in modern web technologies.',
    '/experience': 'Discover Yamukelani Ntimbane\'s professional experience and educational background in web development.',
    '/testimonials': 'Read testimonials from satisfied clients who have worked with Yamukelani Ntimbane on their web development projects.',
    '/contact': 'Get in touch with Yamukelani Ntimbane for web development projects, consultations, or collaborations.',
    '/hire-me': 'Hire Yamukelani Ntimbane for your next web development project. Get a quote and start your project today.'
  };
  
  return descriptions[pathname] || 'Professional full-stack web developer specializing in modern web technologies.';
};

/**
 * Get page keywords based on route
 */
const getPageKeywords = (pathname) => {
  const keywords = {
    '/': 'Yamukelani Ntimbane, web developer, full-stack developer, React developer, Node.js developer, South Africa developer, portfolio',
    '/about': 'Yamukelani Ntimbane, about, web developer, full-stack, experience, background',
    '/skills': 'Yamukelani Ntimbane, skills, technologies, React, Node.js, JavaScript, TypeScript, web development',
    '/projects': 'Yamukelani Ntimbane, portfolio, projects, web development, React projects, Node.js projects',
    '/experience': 'Yamukelani Ntimbane, experience, education, career, professional background',
    '/testimonials': 'Yamukelani Ntimbane, testimonials, client reviews, feedback, web development services',
    '/contact': 'Yamukelani Ntimbane, contact, email, phone, social media, get in touch',
    '/hire-me': 'Yamukelani Ntimbane, hire, freelance, web development, project quote, services'
  };
  
  return keywords[pathname] || 'Yamukelani Ntimbane, web developer, full-stack developer, portfolio';
};

/**
 * Track page view for analytics
 */
const trackPageView = (pathname, seoData) => {
  // Custom analytics tracking
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'page_view',
      page_path: pathname,
      page_title: seoData.title || document.title,
      page_location: window.location.href
    });
  }

  // Performance monitoring
  if ('performance' in window) {
    setTimeout(() => {
      const navigation = performance.getEntriesByType('navigation')[0];
      const paint = performance.getEntriesByType('paint');
      
      // Track performance metrics
      console.log('Performance Metrics:', {
        loadTime: navigation.loadEventEnd - navigation.navigationStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.navigationStart,
        firstPaint: paint.find(p => p.name === 'first-paint')?.startTime,
        firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime
      });
    }, 0);
  }
};

/**
 * Update structured data dynamically
 */
const updateStructuredData = (schema) => {
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.textContent = JSON.stringify(schema);
  } else {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }
};

/**
 * Generate structured data for specific pages
 */
export const generatePageSchema = (pageType, data = {}) => {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": data.title || "Yamukelani Ntimbane - Portfolio",
    "url": `https://yamukelanintimbane.com${window.location.pathname}`,
    "description": data.description || "Professional web developer portfolio",
    "publisher": {
      "@type": "Person",
      "name": "Yamukelani Ntimbane",
      "url": "https://yamukelanintimbane.com"
    }
  };

  switch (pageType) {
    case 'project':
      return {
        ...baseSchema,
        "@type": "CreativeWork",
        "name": data.projectName,
        "description": data.description,
        "url": data.url,
        "image": data.image,
        "datePublished": data.date,
        "author": {
          "@type": "Person",
          "name": "Yamukelani Ntimbane"
        }
      };
    
    case 'contact':
      return {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact Yamukelani Ntimbane",
        "url": "https://yamukelanintimbane.com/contact",
        "description": "Get in touch with Yamukelani Ntimbane for web development projects",
        "potentialAction": {
          "@type": "ContactAction",
          "name": "Contact",
          "url": "https://yamukelanintimbane.com/contact"
        }
      };

    default:
      return baseSchema;
  }
};

export default useSEO;