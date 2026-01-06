// ui.store.ts - Zustand store for UI state
import { create } from 'zustand';

interface UIState {
  isMenuOpen: boolean;
  currentSection: string;
  reducedMotion: boolean;
  isLoading: boolean;
  activeModal: string | null;
  theme: 'light' | 'dark';

  // Actions
  toggleMenu: () => void;
  setMenuOpen: (open: boolean) => void;
  setCurrentSection: (section: string) => void;
  setReducedMotion: (reduced: boolean) => void;
  setLoading: (loading: boolean) => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMenuOpen: false,
  currentSection: 'landing',
  reducedMotion: false,
  isLoading: true,
  activeModal: null,
  theme: 'light',

  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  setMenuOpen: (open) => set({ isMenuOpen: open }),
  setCurrentSection: (section) => set({ currentSection: section }),
  setReducedMotion: (reduced) => set({ reducedMotion: reduced }),
  setLoading: (loading) => set({ isLoading: loading }),
  openModal: (modalId) => set({ activeModal: modalId }),
  closeModal: () => set({ activeModal: null }),
  setTheme: (theme) => set({ theme }),
}));

// Initialize reduced motion preference
if (typeof window !== 'undefined') {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  useUIStore.getState().setReducedMotion(mediaQuery.matches);

  mediaQuery.addEventListener('change', (e) => {
    useUIStore.getState().setReducedMotion(e.matches);
  });
}
