/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        beige: '#FDFBF7',
        premium: {
          beige: '#FDFBF7',
          brown: '#8D6E63',
          lightBrown: '#D7CCC8',
        },
        accent: {
          primary: '#8D6E63',
          secondary: '#A1887F',
          tertiary: '#D7CCC8',
          aqua: '#4FD1C5',
        },
        dark: '#000000', // Pure Black for high contrast
        charcoal: '#0B0B0B',
        primary: '#000000', // Pure Black for high contrast
        inverse: '#FFFFFF', // Pure White
        secondary: '#333333', // Dark Gray for high contrast
        'inverse-secondary': '#CCCCCC', // Light Gray for high contrast
      },
      textColor: {
        primary: '#000000', // Pure Black for high contrast
        inverse: '#FFFFFF', // Pure White
        secondary: '#333333', // Dark Gray for high contrast
        'inverse-secondary': '#CCCCCC', // Light Gray for high contrast
      },
      fontFamily: {
        primary: ['Inter', 'Poppins', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        mascot: ['Nunito', 'Comic Neue', 'sans-serif'],
        legacy: ['Playfair Display', 'serif'],
        hindi: ['Noto Sans Devanagari', 'sans-serif'],
        jp: ['Noto Sans JP', 'sans-serif'],
      },
    },
    darkMode: 'selector', // Use [data-theme="dark"] attribute
  },
  plugins: [],
};
