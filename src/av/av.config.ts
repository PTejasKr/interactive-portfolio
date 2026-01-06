// av.config.ts - Audio-Visual system configuration

export const avConfig = {
  // Volume levels
  defaultVolume: 0.3,
  maxVolume: 0.6,
  ambientVolume: 0.15,
  uiVolume: 0.2,
  mascotVolume: 0.4,

  // Fade durations (ms)
  fadeDuration: 500,
  crossfadeDuration: 1000,

  // Audio analysis
  fftSize: 256,
  smoothingTimeConstant: 0.8,

  // Visual sync settings
  beatThreshold: 0.7,
  reactivityMultiplier: 2,

  // Particle reactions
  particles: {
    sizeMultiplier: 1.5,
    speedMultiplier: 1.2,
    opacityMultiplier: 1.3,
  },

  // Mascot reactions
  mascot: {
    scaleOnBeat: 1.05,
    bounceAmplitude: 0.15,
  },

  // Performance
  updateInterval: 16, // ~60fps
  maxCallbacksPerFrame: 10,

  // User preferences
  respectReducedMotion: true,
  respectPrefersReducedData: true,
} as const;
