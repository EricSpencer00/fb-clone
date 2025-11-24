/**
 * Environment configuration for GraceNook frontend
 * Provides API endpoints and feature flags based on deployment environment
 */

// @ts-ignore - import.meta.env is available at runtime (Vite)
const isDev = import.meta.env.MODE === 'development';
// @ts-ignore - VITE_API_URL is injected by Vite at build time
const viteApiUrl = import.meta.env.VITE_API_URL;
// @ts-ignore
const viteDebug = import.meta.env.VITE_DEBUG;

const getEnv = () => {
  // Default: use relative /api path (works via Pages Function proxy in production)
  let apiUrl = '/api';
  
  // Override with build-time env var if available (for custom backends)
  if (viteApiUrl) {
    apiUrl = viteApiUrl;
  }
  
  // In development, use localhost proxy or direct Worker URL
  if (isDev) {
    apiUrl = viteApiUrl || 'http://localhost:8788';
  }
  
  return {
    // API configuration
    API_BASE_URL: apiUrl,
    
    // Feature flags
    ENABLE_DEBUG: isDev || viteDebug === 'true',
    
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
  
  // Return base + path as-is. Paths should include /api prefix when needed.
  return `${base}${normalizedPath}`;
};

