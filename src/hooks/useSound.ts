// useSound.ts - Sound playback hook
import { audioManager } from '@/av/audio.manager';
import { useSoundStore } from '@store/sound.store';

export function useSound() {
  const store = useSoundStore.getState();

  return {
    play: (soundKey: string): void => {
      audioManager.play(soundKey);
    },

    stop: (soundKey: string): void => {
      audioManager.stop(soundKey);
    },

    playAmbient: (): void => {
      audioManager.playAmbient();
    },

    stopAmbient: (): void => {
      audioManager.stopAmbient();
    },

    setVolume: (volume: number): void => {
      audioManager.setVolume(volume);
    },

    mute: (): void => {
      audioManager.mute();
    },

    unmute: (): void => {
      audioManager.unmute();
    },

    toggleMute: (): void => {
      audioManager.toggleMute();
    },

    getVolume: (): number => {
      return store.volume;
    },

    isMuted: (): boolean => {
      return store.muted;
    },

    isPlaying: (): boolean => {
      return store.isPlaying;
    },

    // Subscribe to sound state changes
    subscribe: (callback: (state: typeof store) => void): (() => void) => {
      return useSoundStore.subscribe(callback);
    },
  };
}
