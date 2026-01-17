/**
 * Advanced Analytics and Performance Monitoring
 */

// Google Analytics initialization
export const initGA = () => {
  // Google Analytics is not configured for this project
  // This function is kept for future implementation
  console.log('Google Analytics initialization skipped - not configured');
};

// Track page views
export const trackPageView = (pathname, pageTitle = document.title) => {
  // Custom analytics
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'page_view',
      page_path: pathname,
      page_title: pageTitle,
      page_location: window.location.href,
      timestamp: Date.now()
    });
  }

  // Performance tracking
  trackPerformance();
};

// Track performance metrics
let performanceSent = false;
let performanceTimeout;

export const trackPerformance = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // Clear any existing timeout
    if (performanceTimeout) {
      clearTimeout(performanceTimeout);
    }

    // Debounce performance tracking to avoid too many requests
    performanceTimeout = setTimeout(() => {
      // Only send performance data once per page load
      if (performanceSent) return;
      performanceSent = true;

      const navigation = performance.getEntriesByType('navigation')[0];
      const paint = performance.getEntriesByType('paint');
      const resources = performance.getEntriesByType('resource');

      // Calculate metrics with proper fallbacks to prevent NaN
      const navigationStart = navigation ? navigation.navigationStart : 0;
      const loadEventEnd = navigation ? navigation.loadEventEnd : 0;
      const domContentLoadedEventEnd = navigation ? navigation.domContentLoadedEventEnd : 0;
      
      const metrics = {
        // Core Web Vitals with proper fallbacks
        loadTime: navigation && loadEventEnd > 0 && navigationStart > 0
          ? loadEventEnd - navigationStart
          : 0,
        domContentLoaded: navigation && domContentLoadedEventEnd > 0 && navigationStart > 0
          ? domContentLoadedEventEnd - navigationStart
          : 0,
        firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
        firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
        
        // Resource loading
        totalResources: resources ? resources.length : 0,
        totalTransferSize: resources ? resources.reduce((total, resource) => total + (resource.transferSize || 0), 0) : 0,
        totalDecodedBodySize: resources ? resources.reduce((total, resource) => total + (resource.decodedBodySize || 0), 0) : 0,
        
        // Memory usage (if available)
        memoryUsage: performance.memory ? {
          usedJSHeapSize: performance.memory.usedJSHeapSize || 0,
          totalJSHeapSize: performance.memory.totalJSHeapSize || 0,
          jsHeapSizeLimit: performance.memory.jsHeapSizeLimit || 0
        } : null
      };

      // Send performance data
      sendPerformanceData(metrics);
      
      // Log performance to console in development
      if (process.env.NODE_ENV === 'development') {
        console.group('📊 Performance Metrics');
        console.log('Load Time:', `${metrics.loadTime.toFixed(2)}ms`);
        console.log('DOM Content Loaded:', `${metrics.domContentLoaded.toFixed(2)}ms`);
        console.log('First Paint:', `${metrics.firstPaint.toFixed(2)}ms`);
        console.log('First Contentful Paint:', `${metrics.firstContentfulPaint.toFixed(2)}ms`);
        console.log('Total Resources:', metrics.totalResources);
        console.groupEnd();
      }
    }, 1000); // Wait 1 second after page load to send performance data
  }
};

// Track user interactions
export const trackEvent = (eventName, eventData = {}) => {
  // Google Analytics
  if (window.gtag) {
    window.gtag('event', eventName, eventData);
  }

  // Custom analytics
  if (window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventData,
      timestamp: Date.now()
    });
  }

  // Send to backend analytics
  sendAnalyticsEvent(eventName, eventData);
};

// Track form submissions
export const trackFormSubmission = (formType, formData = {}) => {
  trackEvent('form_submission', {
    form_type: formType,
    ...formData
  });
};

// Track scroll depth
export const trackScrollDepth = () => {
  let maxScroll = 0;
  
  const handleScroll = () => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
    );
    
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
      
      // Track specific scroll milestones
      if (scrollPercent >= 25 && scrollPercent < 50) {
        trackEvent('scroll_depth', { depth: '25%' });
      } else if (scrollPercent >= 50 && scrollPercent < 75) {
        trackEvent('scroll_depth', { depth: '50%' });
      } else if (scrollPercent >= 75 && scrollPercent < 90) {
        trackEvent('scroll_depth', { depth: '75%' });
      } else if (scrollPercent >= 90) {
        trackEvent('scroll_depth', { depth: '90%' });
      }
    }
  };

  window.addEventListener('scroll', handleScroll);
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

// Track user engagement
export const trackEngagement = () => {
  let startTime = Date.now();
  let isActive = true;
  let totalActiveTime = 0;

  const handleActivity = () => {
    if (!isActive) {
      isActive = true;
      startTime = Date.now();
    }
    
    // Reset inactivity timer
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      if (isActive) {
        isActive = false;
        totalActiveTime += Date.now() - startTime;
      }
    }, 30000); // 30 seconds of inactivity
  };

  let inactivityTimer = setTimeout(() => {
    isActive = false;
    totalActiveTime += Date.now() - startTime;
  }, 30000);

  // Track mouse movements, clicks, keypresses
  ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'].forEach(event => {
    window.addEventListener(event, handleActivity, { passive: true });
  });

  // Track session end
  window.addEventListener('beforeunload', () => {
    if (isActive) {
      totalActiveTime += Date.now() - startTime;
    }
    
    trackEvent('session_end', {
      total_active_time: totalActiveTime,
      total_session_time: Date.now() - startTime
    });
  });

  return () => {
    clearTimeout(inactivityTimer);
    ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'].forEach(event => {
      window.removeEventListener(event, handleActivity);
    });
  };
};

// Throttle function to limit API calls
const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
};

// Send performance data to backend
const sendPerformanceData = throttle(async (metrics) => {
  try {
    const response = await fetch('/api/analytics/performance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 'performance',
        data: metrics,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        url: window.location.href
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    if (process.env.NODE_ENV === 'development') {
      console.log('Performance data sent successfully:', result);
    }
  } catch (error) {
    console.warn('Failed to send performance data:', error);
    // Fallback: store in localStorage for retry
    try {
      const stored = JSON.parse(localStorage.getItem('performanceQueue') || '[]');
      stored.push({
        metrics,
        timestamp: Date.now(),
        url: window.location.href
      });
      localStorage.setItem('performanceQueue', JSON.stringify(stored));
    } catch (storageError) {
      console.warn('Failed to store performance data for retry:', storageError);
    }
  }
}, 5000); // Throttle to 1 request per 5 seconds

// Send analytics event to backend
const sendAnalyticsEvent = throttle(async (eventName, eventData) => {
  try {
    const response = await fetch('/api/analytics/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 'event',
        eventName,
        data: eventData,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        url: window.location.href
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics event sent successfully:', result);
    }
  } catch (error) {
    console.warn('Failed to send analytics event:', error);
    // Fallback: store in localStorage for retry
    try {
      const stored = JSON.parse(localStorage.getItem('eventQueue') || '[]');
      stored.push({
        eventName,
        eventData,
        timestamp: Date.now(),
        url: window.location.href
      });
      localStorage.setItem('eventQueue', JSON.stringify(stored));
    } catch (storageError) {
      console.warn('Failed to store event data for retry:', storageError);
    }
  }
}, 1000); // Throttle to 1 request per second

// SEO-specific tracking
export const trackSEOMetrics = throttle(() => {
  // Track meta tag presence
  const metaTags = {
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.getAttribute('content'),
    keywords: document.querySelector('meta[name="keywords"]')?.getAttribute('content'),
    canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
    ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute('content'),
    ogDescription: document.querySelector('meta[property="og:description"]')?.getAttribute('content'),
    twitterCard: document.querySelector('meta[name="twitter:card"]')?.getAttribute('content')
  };

  // Track structured data
  const structuredData = document.querySelector('script[type="application/ld+json"]');
  const hasStructuredData = !!structuredData;

  trackEvent('seo_audit', {
    ...metaTags,
    hasStructuredData,
    structuredDataContent: structuredData?.textContent || null
  });
}, 10000); // Throttle to 1 request per 10 seconds

// Retry failed analytics data
export const retryFailedAnalytics = async () => {
  try {
    // Retry performance data
    const performanceQueue = JSON.parse(localStorage.getItem('performanceQueue') || '[]');
    if (performanceQueue.length > 0) {
      for (const item of performanceQueue) {
        try {
          await sendPerformanceData(item.metrics);
        } catch (error) {
          console.warn('Retry failed for performance data:', error);
        }
      }
      localStorage.removeItem('performanceQueue');
    }

    // Retry event data
    const eventQueue = JSON.parse(localStorage.getItem('eventQueue') || '[]');
    if (eventQueue.length > 0) {
      for (const item of eventQueue) {
        try {
          await sendAnalyticsEvent(item.eventName, item.eventData);
        } catch (error) {
          console.warn('Retry failed for event data:', error);
        }
      }
      localStorage.removeItem('eventQueue');
    }
  } catch (error) {
    console.warn('Failed to retry analytics:', error);
  }
};

// Initialize all analytics
export const initAnalytics = () => {
  // Initialize Google Analytics
  initGA();
  
  // Track initial page view
  trackPageView(window.location.pathname);
  
  // Track SEO metrics
  trackSEOMetrics();
  
  // Track scroll depth
  trackScrollDepth();
  
  // Track engagement
  trackEngagement();
  
  // Retry any failed analytics data
  retryFailedAnalytics();
};

export default {
  initAnalytics,
  trackPageView,
  trackPerformance,
  trackEvent,
  trackFormSubmission,
  trackScrollDepth,
  trackEngagement,
  trackSEOMetrics,
  retryFailedAnalytics
};