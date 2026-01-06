// sound.store.ts - Zustand store for sound state
import { create } from 'zustand';

interface SoundState {
  isPlaying: boolean;
  volume: number;
  muted: boolean;
  lastPlayed: string | null;
  frequencyData: number[];

  // Actions
  setIsPlaying: (playing: boolean) => void;
  setVolume: (volume: number) => void;
  setMuted: (muted: boolean) => void;
  toggleMute: () => void;
  setLastPlayed: (sound: string) => void;
  setFrequencyData: (data: number[]) => void;
  playSound: (soundKey: string) => void;
}

export const useSoundStore = create<SoundState>((set, get) => ({
  isPlaying: false,
  volume: 0.3,
  muted: false,
  lastPlayed: null,
  frequencyData: [],

  setIsPlaying: (playing) => set({ isPlaying: playing }),

  setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)) }),

  setMuted: (muted) => set({ muted }),

  toggleMute: () => set((state) => ({ muted: !state.muted })),

  setLastPlayed: (sound) => set({ lastPlayed: sound }),

  setFrequencyData: (data) => set({ frequencyData: data }),

  playSound: (soundKey) => {
    if (get().muted) return;
    set({ lastPlayed: soundKey });
    // Actual sound playback is handled by AudioManager
  },
}));
