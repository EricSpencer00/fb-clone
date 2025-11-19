/**
 * Environment configuration for GraceNook frontend
 * Provides API endpoints and feature flags based on deployment environment
 */

const getEnv = () => {
  const isDev = import.meta.env.MODE === 'development';
  
  return {
    // API configuration
    API_BASE_URL: isDev 
      ? import.meta.env.VITE_API_URL || 'http://localhost:8788'
      : (window.__ENV__?.API_URL || 'https://api.gracenook.workers.dev'),
    
    // Feature flags
    ENABLE_DEBUG: isDev || import.meta.env.VITE_DEBUG === 'true',
    
    // Deployment info
    DEPLOYMENT_ENV: isDev ? 'development' : 'production',
    DEPLOYMENT_URL: typeof window !== 'undefined' 
      ? window.location.origin 
      : 'https://gracenook.pages.dev',
  };
};

export const env = getEnv();

// Utility to construct API URLs
export const getApiUrl = (path: string): string => {
  const base = env.API_BASE_URL.replace(/\/$/, ''); // Remove trailing slash
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalizedPath}`;
};
