// mascot.store.ts - Zustand store for mascot state
import { create } from 'zustand';

export type MascotMood = 'neutral' | 'happy' | 'sad' | 'excited' | 'sleepy' | 'curious';

interface MascotState {
  mood: MascotMood;
  isSpeaking: boolean;
  dialogueQueue: string[];
  lastInteractionTime: number;
  eyePosition: { x: number; y: number };

  // Actions
  setMood: (mood: MascotMood) => void;
  setIsSpeaking: (speaking: boolean) => void;
  addToDialogue: (message: string) => void;
  shiftDialogue: () => string | undefined;
  clearDialogue: () => void;
  updateInteractionTime: () => void;
  setEyePosition: (x: number, y: number) => void;
}

export const useMascotStore = create<MascotState>((set, get) => ({
  mood: 'neutral',
  isSpeaking: false,
  dialogueQueue: [],
  lastInteractionTime: Date.now(),
  eyePosition: { x: 0, y: 0 },

  setMood: (mood) => {
    set({ mood });
    get().updateInteractionTime();
  },

  setIsSpeaking: (speaking) => set({ isSpeaking: speaking }),

  addToDialogue: (message) =>
    set((state) => ({
      dialogueQueue: [...state.dialogueQueue, message],
    })),

  shiftDialogue: () => {
    const queue = get().dialogueQueue;
    if (queue.length === 0) return undefined;
    const [first, ...rest] = queue;
    set({ dialogueQueue: rest });
    return first;
  },

  clearDialogue: () => set({ dialogueQueue: [] }),

  updateInteractionTime: () => set({ lastInteractionTime: Date.now() }),

  setEyePosition: (x, y) => set({ eyePosition: { x, y } }),
}));
