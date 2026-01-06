// useMascotState.ts - Mascot state management hook
import { useMascotStore, MascotMood } from '@store/mascot.store';

export function useMascotState() {
  const store = useMascotStore;

  return {
    getMood: (): MascotMood => {
      return store.getState().mood;
    },

    setMood: (mood: MascotMood): void => {
      store.getState().setMood(mood);
    },

    isSpeaking: (): boolean => {
      return store.getState().isSpeaking;
    },

    speak: (message: string): void => {
      store.getState().addToDialogue(message);
      store.getState().setIsSpeaking(true);
    },

    stopSpeaking: (): void => {
      store.getState().setIsSpeaking(false);
    },

    getDialogueQueue: (): string[] => {
      return store.getState().dialogueQueue;
    },

    clearDialogue: (): void => {
      store.getState().clearDialogue();
    },

    // Trigger specific emotions
    makeHappy: (): void => {
      store.getState().setMood('happy');
      setTimeout(() => store.getState().setMood('neutral'), 3000);
    },

    makeExcited: (): void => {
      store.getState().setMood('excited');
      setTimeout(() => store.getState().setMood('neutral'), 2000);
    },

    makeSleepy: (): void => {
      store.getState().setMood('sleepy');
    },

    wake: (): void => {
      store.getState().setMood('neutral');
    },

    // Subscribe to state changes
    subscribe: (callback: (state: ReturnType<typeof store.getState>) => void): (() => void) => {
      return store.subscribe(callback);
    },
  };
}
