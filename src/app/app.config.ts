// app.config.ts - Application configuration

export const appConfig = {
  name: 'Interactive Portfolio',
  version: '1.0.0',
  author: 'Matrix Agent',

  // Feature flags
  features: {
    audio: true,
    particles: true,
    mascot: true,
    customCursor: true,
    analytics: true,
  },

  // Performance settings
  performance: {
    maxParticles: 100,
    targetFPS: 60,
    enableOnMobile: true,
    reducedMotionFallback: true,
  },

  // API endpoints
  api: {
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
    supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
    githubToken: import.meta.env.VITE_GITHUB_TOKEN || '',
  },
};
