import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://portfolio-backend-rl8w.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token and logging
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('portfolio-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`📤 API Request: ${config.method.toUpperCase()} ${config.baseURL}${config.url}`);
    if (config.data) {
      console.log('📤 Request Data:', config.data);
    }
    return config;
  },
  (error) => {
    console.error('📤 API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and logging
api.interceptors.response.use(
  (response) => {
    console.log(`📥 API Response: ${response.config.method.toUpperCase()} ${response.config.baseURL}${response.config.url}`);
    console.log('📥 Response Data:', response.data);
    return response;
  },
  (error) => {
    console.error('📥 API Response Error:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      localStorage.removeItem('portfolio-token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// ==================== PUBLIC ENDPOINTS ====================

// Projects API
export const projectsAPI = {
  getAll: (params = {}) => api.get('/projects', { params }),
  getById: (id) => api.get(`/projects/${id}`),
  trackView: (id) => api.post(`/projects/${id}/view`),
  getImage: (id) => api.get(`/projects/${id}/image`),
};

// Contact API
export const contactAPI = {
  submit: (data) => api.post('/contact', data),
};

// Hire Requests API
export const hireAPI = {
  submit: (data) => api.post('/hire', data),
};

// Testimonials API
export const testimonialsAPI = {
  getAll: () => api.get('/testimonials'),
};

// Analytics API (Public tracking)
export const analyticsAPI = {
  track: (data) => api.post('/analytics/track', data),
};

// Skills API
export const skillsAPI = {
  getAll: () => api.get('/skills'),
};

// Experience API
export const experienceAPI = {
  getAll: () => api.get('/experience'),
  getCurrent: () => api.get('/experience/current'),
  getLevels: () => api.get('/experience/levels'),
  getTimeline: () => api.get('/experience/timeline'),
  updateLevels: (levels) => api.put('/experience/levels', { levels }),
};

// ==================== ADMIN ENDPOINTS ====================

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
};

// Admin Projects API
export const adminProjectsAPI = {
  getAll: (params = {}) => api.get('/admin/projects', { params }),
  create: (data) => api.post('/admin/projects', data),
  update: (id, data) => api.put(`/admin/projects/${id}`, data),
  delete: (id) => api.delete(`/admin/projects/${id}`),
  uploadImage: (id, formData) => api.post(`/admin/projects/${id}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

// Admin Contacts API - ADD THIS
export const adminContactsAPI = {
  getAll: (params = {}) => api.get('/admin/contacts', { params }),
  getById: (id) => api.get(`/admin/contacts/${id}`),
  update: (id, data) => api.put(`/admin/contacts/${id}`, data),
  delete: (id) => api.delete(`/admin/contacts/${id}`),
  reply: (id, data) => api.post(`/admin/contacts/${id}/reply`, data),
};

// Admin Hire Requests API - ADD THIS
export const adminHireAPI = {
  getAll: (params = {}) => api.get('/admin/hire-requests', { params }),
  getById: (id) => api.get(`/admin/hire-requests/${id}`),
  update: (id, data) => api.put(`/admin/hire-requests/${id}`, data),
  delete: (id) => api.delete(`/admin/hire-requests/${id}`),
  respond: (id, data) => api.post(`/admin/hire-requests/${id}/respond`, data),
};

// Admin Analytics API - ADD THIS
export const adminAnalyticsAPI = {
  getDashboard: (params = {}) => api.get('/admin/analytics', { params }),
  getOverview: () => api.get('/admin/analytics/overview'),
  getPageViews: (params = {}) => api.get('/admin/analytics/page-views', { params }),
  getProjectViews: (params = {}) => api.get('/admin/analytics/project-views', { params }),
  getTrafficSources: () => api.get('/admin/analytics/traffic-sources'),
  getGeoData: () => api.get('/admin/analytics/geo-data'),
  getTimeline: (params = {}) => api.get('/admin/analytics/timeline', { params }),
};

// Admin Testimonials API - ADD THIS
export const adminTestimonialsAPI = {
  getAll: (params = {}) => api.get('/admin/testimonials', { params }),
  create: (data) => api.post('/admin/testimonials', data),
  update: (id, data) => api.put(`/admin/testimonials/${id}`, data),
  delete: (id) => api.delete(`/admin/testimonials/${id}`),
  approve: (id) => api.put(`/admin/testimonials/${id}/approve`),
  toggleFeature: (id) => api.put(`/admin/testimonials/${id}/feature`),
};

// Admin Settings API - ADD THIS
export const adminSettingsAPI = {
  get: () => api.get('/admin/settings'),
  update: (data) => api.put('/admin/settings', data),
  uploadLogo: (formData) => api.post('/admin/settings/upload-logo', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

// Health Check
export const healthAPI = {
  check: () => api.get('/health'),
};
