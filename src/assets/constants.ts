// constants.ts - Application-wide constants

export const ANIMATION = {
  DURATION: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
    VERY_SLOW: 1000,
  },
  EASING: {
    DEFAULT: 'ease-out',
    BOUNCE: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    SMOOTH: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

export const MASCOT = {
  STATES: {
    IDLE: 'idle',
    CURIOUS: 'curious',
    HAPPY: 'happy',
    EXCITED: 'excited',
    SLEEPY: 'sleepy',
  },
  IDLE_TIMEOUT: 60000, // 60 seconds before sleepy
  EYE_FOLLOW_SPEED: 0.1,
  BLINK_INTERVAL: 4000,
} as const;

export const AUDIO = {
  DEFAULT_VOLUME: 0.3,
  MAX_VOLUME: 0.6,
  FADE_DURATION: 500,
} as const;

export const PARTICLES = {
  COUNT: 50,
  MIN_SIZE: 2,
  MAX_SIZE: 6,
  SPEED: 0.5,
  REPULSION_RADIUS: 100,
  REPULSION_STRENGTH: 0.5,
} as const;

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;
