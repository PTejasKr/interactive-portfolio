// fonts.ts - Font configuration

export const fonts = {
  primary: {
    family: "'Inter', 'Poppins', sans-serif",
    weights: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },

  mono: {
    family: "'JetBrains Mono', monospace",
    weights: {
      regular: 400,
      medium: 500,
    },
  },

  mascot: {
    family: "'Nunito', 'Comic Neue', sans-serif",
    weights: {
      regular: 400,
      semibold: 600,
      bold: 700,
    },
  },
} as const;

export const fontSizes = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
  '6xl': '3.75rem',
} as const;
