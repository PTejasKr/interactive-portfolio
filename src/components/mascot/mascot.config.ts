// mascot.config.ts - Mascot configuration

export const mascotConfig = {
  // Size of mascot container
  size: 200,

  // Fur particle settings
  furParticleCount: 500,
  furLength: 0.15,
  furDensity: 0.8,

  // Animation settings
  idleFloatSpeed: 0.001,
  idleFloatAmplitude: 0.1,
  breathingSpeed: 0.002,
  breathingAmplitude: 0.02,

  // Eye settings
  eyeFollowSpeed: 0.1,
  eyeMaxRotation: { x: 0.1, y: 0.15 },
  blinkDuration: 100,
  blinkInterval: { min: 3000, max: 6000 },

  // Belly interaction
  bellyBounceScale: 1.2,
  bellyBounceDuration: 150,
  rippleDuration: 800,

  // Colors
  colors: {
    body: '#FFFFFF',
    eyes: '#0B0B0B',
    belly: '#4FD1C5',
    shadow: '#000000',
    fur: '#FFFFFF',
  },

  // State timeouts
  sleepyTimeout: 60000,
  happyDuration: 3000,
  excitedDuration: 2000,

  // Speech bubble
  speechBubble: {
    maxWidth: 200,
    padding: 12,
    borderRadius: 16,
    typewriterSpeed: 30,
    defaultDuration: 4000,
  },
} as const;
