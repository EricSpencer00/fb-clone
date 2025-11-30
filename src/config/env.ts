// Environment configuration
const isDev = import.meta.env.DEV;

export const config = {
  apiUrl: isDev 
    ? 'http://127.0.0.1:8787'
    : 'https://gracenook.thebiggydg2019.workers.dev',
};

