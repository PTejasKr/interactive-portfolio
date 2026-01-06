// useReducedMotion.ts - Detect and respect reduced motion preferences

let prefersReducedMotion: boolean = false;
let listeners: Set<(reduced: boolean) => void> = new Set();

function init(): void {
  if (typeof window === 'undefined') return;

  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  prefersReducedMotion = mediaQuery.matches;

  mediaQuery.addEventListener('change', (e) => {
    prefersReducedMotion = e.matches;
    listeners.forEach((listener) => listener(prefersReducedMotion));
  });
}

init();

export function useReducedMotion() {
  return {
    // Check if user prefers reduced motion
    prefersReduced: (): boolean => {
      return prefersReducedMotion;
    },

    // Subscribe to changes
    subscribe: (callback: (reduced: boolean) => void): (() => void) => {
      listeners.add(callback);
      return () => listeners.delete(callback);
    },

    // Get animation duration based on preference
    getAnimationDuration: (normalDuration: number): number => {
      return prefersReducedMotion ? 0 : normalDuration;
    },

    // Get animation config based on preference
    getAnimationConfig: <T extends object>(normalConfig: T, reducedConfig: T): T => {
      return prefersReducedMotion ? reducedConfig : normalConfig;
    },

    // Should animate?
    shouldAnimate: (): boolean => {
      return !prefersReducedMotion;
    },

    // Conditional animation wrapper
    animate: (animateFn: () => void, fallbackFn?: () => void): void => {
      if (prefersReducedMotion) {
        fallbackFn?.();
      } else {
        animateFn();
      }
    },
  };
}
