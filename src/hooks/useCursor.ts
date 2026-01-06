// useCursor.ts - Custom cursor state hook

interface CursorState {
  x: number;
  y: number;
  isHovering: boolean;
  isClicking: boolean;
  cursorType: 'default' | 'pointer' | 'text' | 'grab';
}

let state: CursorState = {
  x: 0,
  y: 0,
  isHovering: false,
  isClicking: false,
  cursorType: 'default',
};

const listeners: Set<(state: CursorState) => void> = new Set();

function notify(): void {
  listeners.forEach((listener) => listener(state));
}

export function useCursor() {
  return {
    getState: () => state,

    subscribe: (listener: (state: CursorState) => void): (() => void) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },

    setPosition: (x: number, y: number): void => {
      state = { ...state, x, y };
      notify();
    },

    setHovering: (isHovering: boolean): void => {
      state = { ...state, isHovering };
      notify();
    },

    setClicking: (isClicking: boolean): void => {
      state = { ...state, isClicking };
      notify();
    },

    setCursorType: (cursorType: CursorState['cursorType']): void => {
      state = { ...state, cursorType };
      notify();
    },

    init: (): void => {
      document.addEventListener('mousemove', (e) => {
        state = { ...state, x: e.clientX, y: e.clientY };
        notify();
      });

      document.addEventListener('mousedown', () => {
        state = { ...state, isClicking: true };
        notify();
      });

      document.addEventListener('mouseup', () => {
        state = { ...state, isClicking: false };
        notify();
      });
    },
  };
}
