import { useEffect, useCallback } from 'react';
import { analyticsAPI } from '../utils/api';

export const useAnalytics = () => {
  const trackPageView = useCallback(async (page, projectId = null) => {
    try {
      await analyticsAPI.track({
        page,
        projectId,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        referrer: document.referrer,
      });
    } catch (error) {
      console.error('Analytics tracking failed:', error);
    }
  }, []);

  const trackEvent = useCallback(async (type, element, data = {}) => {
    try {
      await analyticsAPI.track({
        page: window.location.pathname,
        action: { type, element, data },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Event tracking failed:', error);
    }
  }, []);

  return { trackPageView, trackEvent };
};