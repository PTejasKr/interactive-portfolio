// SoundReactiveParticles.ts - Particles that respond to audio frequency
import { ParticleField } from './ParticleField';
import { useSoundStore } from '@store/sound.store';

export class SoundReactiveParticles extends ParticleField {
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private dataArray: Uint8Array | null = null;
  private unsubscribe: (() => void) | null = null;

  override init(): void {
    super.init();
    this.setupAudioAnalysis();
    console.log('[SoundReactiveParticles] Initialized');
  }

  private setupAudioAnalysis(): void {
    // Subscribe to sound store for audio data
    this.unsubscribe = useSoundStore.subscribe((state) => {
      if (state.frequencyData) {
        this.updateFromFrequency(state.frequencyData);
      }
    });
  }

  private updateFromFrequency(frequencyData: number[]): void {
    // Calculate average amplitude from bass frequencies
    const bassRange = frequencyData.slice(0, 10);
    const avgBass = bassRange.reduce((a, b) => a + b, 0) / bassRange.length / 255;

    // Scale particles
    this.setReactivity(avgBass);
  }

  connectToAudio(audioElement: HTMLAudioElement): void {
    this.audioContext = new AudioContext();
    const source = this.audioContext.createMediaElementSource(audioElement);

    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 256;
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);

    source.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);

    this.analyzeAudio();
  }

  private analyzeAudio(): void {
    if (!this.analyser || !this.dataArray) return;

    requestAnimationFrame(() => this.analyzeAudio());

    this.analyser.getByteFrequencyData(this.dataArray as any);

    const avgFrequency = Array.from(this.dataArray).reduce((a, b) => a + b, 0) / this.dataArray.length / 255;
    this.setReactivity(avgFrequency * 2);
  }

  override destroy(): void {
    super.destroy();
    this.unsubscribe?.();
    this.audioContext?.close();
  }
}
