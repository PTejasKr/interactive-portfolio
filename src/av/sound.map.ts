// sound.map.ts - Sound file mappings and configurations

export interface SoundConfig {
  src: string;
  volume?: number;
  loop?: boolean;
  category: 'ui' | 'mascot' | 'ambient';
}

export const soundMap: Record<string, SoundConfig> = {
  // UI Sounds
  hover: {
    src: '/audio/ui/hover.wav',
    volume: 0.2,
    category: 'ui',
  },
  click: {
    src: '/audio/ui/click.wav',
    volume: 0.3,
    category: 'ui',
  },
  transition: {
    src: '/audio/ui/transition.wav',
    volume: 0.25,
    category: 'ui',
  },

  // Mascot Sounds
  'giggle-soft': {
    src: '/audio/mascot/giggle-soft.wav',
    volume: 0.4,
    category: 'mascot',
  },
  'giggle-big': {
    src: '/audio/mascot/giggle-big.wav',
    volume: 0.5,
    category: 'mascot',
  },
  'idle-breath': {
    src: '/audio/mascot/idle-breath.wav',
    volume: 0.2,
    loop: true,
    category: 'mascot',
  },
  sleepy: {
    src: '/audio/mascot/sleepy.wav',
    volume: 0.3,
    category: 'mascot',
  },

  // Ambient
  'background-loop': {
    src: '/audio/ambient/background-loop.mp3',
    volume: 0.15,
    loop: true,
    category: 'ambient',
  },
};

export function getSoundsByCategory(category: SoundConfig['category']): string[] {
  return Object.entries(soundMap)
    .filter(([_, config]) => config.category === category)
    .map(([key]) => key);
}
