// particles.config.ts - Particle system configuration

export const particlesConfig = {
  count: 120,

  // Size range
  minSize: 2,
  maxSize: 6,

  // Movement
  baseSpeed: 0.5,
  maxSpeed: 2,

  // Cursor interaction
  repulsionRadius: 100,
  repulsionStrength: 0.5,

  // Sound reactivity
  soundReactivity: {
    enabled: true,
    scaleMultiplier: 2,
    speedMultiplier: 1.5,
    opacityRange: [0.3, 0.8],
  },

  // Colors - Floating Brown Dots
  colors: {
    primary: 'rgba(141, 110, 99, 0.6)', // #8D6E63
    secondary: 'rgba(215, 204, 200, 0.6)', // #D7CCC8
    accent: 'rgba(161, 136, 127, 0.6)', // #A1887F
  },

  // Performance
  maxParticlesOnMobile: 25,
  enableOnReducedMotion: false,
} as const;
