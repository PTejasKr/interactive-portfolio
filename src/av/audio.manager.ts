// audio.manager.ts - Central audio management with Howler.js
import { Howl, Howler } from 'howler';
import { soundMap } from './sound.map';
import { avConfig } from './av.config';
import { useSoundStore } from '@store/sound.store';

export class AudioManager {
  private sounds: Map<string, Howl> = new Map();
  private ambientLoop: Howl | null = null;
  private isInitialized: boolean = false;
  private isMuted: boolean = false;

  async init(): Promise<void> {
    if (this.isInitialized) return;

    // Check for reduced motion/sound preferences
    if (this.shouldDisableAudio()) {
      console.log('[AudioManager] Audio disabled due to user preferences');
      return;
    }

    // Preload all sounds
    await this.preloadSounds();

    // Setup ambient loop
    this.setupAmbientLoop();

    // Setup global volume
    Howler.volume(avConfig.defaultVolume);

    this.isInitialized = true;
    console.log('[AudioManager] Initialized');
  }

  private shouldDisableAudio(): boolean {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return reducedMotion;
  }

  private async preloadSounds(): Promise<void> {
    const loadPromises = Object.entries(soundMap).map(([key, config]) => {
      return new Promise<void>((resolve) => {
        const sound = new Howl({
          src: [config.src],
          volume: config.volume || avConfig.defaultVolume,
          preload: true,
          onload: () => resolve(),
          onloaderror: () => {
            console.warn(`[AudioManager] Failed to load: ${key}`);
            resolve();
          },
        });
        this.sounds.set(key, sound);
      });
    });

    await Promise.all(loadPromises);
  }

  private setupAmbientLoop(): void {
    this.ambientLoop = new Howl({
      src: ['/audio/ambient/background-loop.mp3'],
      volume: avConfig.ambientVolume,
      loop: true,
      preload: true,
    });
  }

  play(soundKey: string): void {
    if (this.isMuted) return;

    const sound = this.sounds.get(soundKey);
    if (sound) {
      sound.play();
      useSoundStore.getState().setLastPlayed(soundKey);
    }
  }

  stop(soundKey: string): void {
    const sound = this.sounds.get(soundKey);
    if (sound) {
      sound.stop();
    }
  }

  playAmbient(): void {
    if (this.isMuted || !this.ambientLoop) return;
    this.ambientLoop.play();
    useSoundStore.getState().setIsPlaying(true);
  }

  stopAmbient(): void {
    this.ambientLoop?.stop();
    useSoundStore.getState().setIsPlaying(false);
  }

  setVolume(volume: number): void {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    Howler.volume(clampedVolume);
    useSoundStore.getState().setVolume(clampedVolume);
  }

  mute(): void {
    this.isMuted = true;
    Howler.mute(true);
    useSoundStore.getState().setMuted(true);
  }

  unmute(): void {
    this.isMuted = false;
    Howler.mute(false);
    useSoundStore.getState().setMuted(false);
  }

  toggleMute(): void {
    if (this.isMuted) {
      this.unmute();
    } else {
      this.mute();
    }
  }

  getAnalyserData(): Uint8Array | null {
    // Would integrate with Web Audio API for frequency data
    return null;
  }

  destroy(): void {
    this.sounds.forEach((sound) => sound.unload());
    this.ambientLoop?.unload();
    this.sounds.clear();
  }
}

// Singleton instance
export const audioManager = new AudioManager();
