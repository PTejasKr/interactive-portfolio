// MascotStates.ts - Emotional state machine for mascot
import { MASCOT } from '@/assets/constants';

export enum MascotState {
  IDLE = 'idle',
  CURIOUS = 'curious',
  HAPPY = 'happy',
  EXCITED = 'excited',
  SLEEPY = 'sleepy',
  TALKING = 'talking',
}

interface StateConfig {
  breathingSpeed: number;
  bounceAmplitude: number;
  eyeSize: number;
  soundKey: string | null;
}

const stateConfigs: Record<MascotState, StateConfig> = {
  [MascotState.IDLE]: {
    breathingSpeed: 1,
    bounceAmplitude: 0.1,
    eyeSize: 1,
    soundKey: 'idle-breath',
  },
  [MascotState.CURIOUS]: {
    breathingSpeed: 1.2,
    bounceAmplitude: 0.15,
    eyeSize: 1.2,
    soundKey: 'curious-blip',
  },
  [MascotState.HAPPY]: {
    breathingSpeed: 1.5,
    bounceAmplitude: 0.2,
    eyeSize: 1.1,
    soundKey: 'giggle-soft',
  },
  [MascotState.EXCITED]: {
    breathingSpeed: 2,
    bounceAmplitude: 0.3,
    eyeSize: 1.3,
    soundKey: 'giggle-big',
  },
  [MascotState.SLEEPY]: {
    breathingSpeed: 0.5,
    bounceAmplitude: 0.05,
    eyeSize: 0.7,
    soundKey: 'sleepy',
  },
  [MascotState.TALKING]: {
    breathingSpeed: 1.3,
    bounceAmplitude: 0.12,
    eyeSize: 1,
    soundKey: null,
  },
};

export class MascotStates {
  private currentState: MascotState = MascotState.IDLE;
  private idleTimer: number = 0;
  private lastInteractionTime: number = Date.now();
  private onStateChange: ((state: MascotState, config: StateConfig) => void) | null = null;

  constructor() {
    this.startIdleCheck();
  }

  setState(state: MascotState): void {
    if (this.currentState === state) return;

    this.currentState = state;
    this.lastInteractionTime = Date.now();

    const config = stateConfigs[state];
    this.onStateChange?.(state, config);

    console.log(`[Mascot] State changed to: ${state}`);
  }

  getState(): MascotState {
    return this.currentState;
  }

  getConfig(): StateConfig {
    return stateConfigs[this.currentState];
  }

  onStateChanged(callback: (state: MascotState, config: StateConfig) => void): void {
    this.onStateChange = callback;
  }

  private startIdleCheck(): void {
    this.idleTimer = window.setInterval(() => {
      const elapsed = Date.now() - this.lastInteractionTime;
      if (elapsed > MASCOT.IDLE_TIMEOUT && this.currentState !== MascotState.SLEEPY) {
        this.setState(MascotState.SLEEPY);
      }
    }, 5000);
  }

  wake(): void {
    if (this.currentState === MascotState.SLEEPY) {
      this.setState(MascotState.IDLE);
    }
  }

  destroy(): void {
    clearInterval(this.idleTimer);
  }
}
