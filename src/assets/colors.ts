// colors.ts - Color palette constants

export const colors = {
  // Primary colors
  beige: '#F5F0E6',
  white: '#FFFFFF',
  black: '#0B0B0B',

  // Accent colors
  red: '#E63946',
  aqua: '#4FD1C5',

  // Extended palette
  aquaLight: '#7EEAE0',
  aquaDark: '#38A89D',
  redLight: '#FF6B6B',
  redDark: '#C53030',

  // Neutrals
  gray: {
    100: '#F7FAFC',
    200: '#EDF2F7',
    300: '#E2E8F0',
    400: '#CCCCCC',
    500: '#AAAAAA',
    600: '#888888',
    700: '#666666',
    800: '#333333',
    900: '#000000',
  },

  // Semantic
  success: '#48BB78',
  warning: '#ECC94B',
  error: '#F56565',
  info: '#4299E1',
} as const;

export type ColorKey = keyof typeof colors;
