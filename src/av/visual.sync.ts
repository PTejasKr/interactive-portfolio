// visual.sync.ts - Synchronize visuals with audio
import { useSoundStore } from '@store/sound.store';

export class VisualSync {
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private dataArray: Uint8Array | null = null;
  private animationId: number = 0;
  private callbacks: Set<(data: number[]) => void> = new Set();

  init(audioElement?: HTMLAudioElement): void {
    this.audioContext = new AudioContext();
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 256;
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);

    if (audioElement) {
      const source = this.audioContext.createMediaElementSource(audioElement);
      source.connect(this.analyser);
      this.analyser.connect(this.audioContext.destination);
    }

    this.startAnalysis();
  }

  private startAnalysis(): void {
    const analyze = () => {
      this.animationId = requestAnimationFrame(analyze);

      if (!this.analyser || !this.dataArray) return;

      this.analyser.getByteFrequencyData(this.dataArray as any);
      const data = Array.from(this.dataArray);

      // Update store
      useSoundStore.getState().setFrequencyData(data);

      // Notify callbacks
      this.callbacks.forEach((cb) => cb(data));
    };

    analyze();
  }

  onFrequencyUpdate(callback: (data: number[]) => void): () => void {
    this.callbacks.add(callback);
    return () => this.callbacks.delete(callback);
  }

  getBassLevel(): number {
    if (!this.dataArray) return 0;
    const bassRange = Array.from(this.dataArray).slice(0, 10);
    return bassRange.reduce((a, b) => a + b, 0) / bassRange.length / 255;
  }

  getMidLevel(): number {
    if (!this.dataArray) return 0;
    const midRange = Array.from(this.dataArray).slice(10, 50);
    return midRange.reduce((a, b) => a + b, 0) / midRange.length / 255;
  }

  getHighLevel(): number {
    if (!this.dataArray) return 0;
    const highRange = Array.from(this.dataArray).slice(50);
    return highRange.reduce((a, b) => a + b, 0) / highRange.length / 255;
  }

  detectBeat(threshold: number = 0.7): boolean {
    return this.getBassLevel() > threshold;
  }

  pause(): void {
    cancelAnimationFrame(this.animationId);
  }

  resume(): void {
    this.startAnalysis();
  }

  destroy(): void {
    this.pause();
    this.audioContext?.close();
    this.callbacks.clear();
  }
}

export const visualSync = new VisualSync();
