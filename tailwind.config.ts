import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Unified gold system (replaces the old single #c7a35d + the stray blue)
        gold: {
          DEFAULT: '#d4af37',
          bright: '#ffe8a3',
          light: '#f4dd9b',
          dark: '#a97913',
          deep: '#7a560d'
        },
        ink: {
          DEFAULT: '#050505',
          800: '#0c0c0e',
          700: '#141417'
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'ui-serif', 'Georgia', 'serif']
      },
      boxShadow: {
        glow: '0 0 32px rgba(212,175,55,0.28)',
        'glow-sm': '0 0 18px rgba(212,175,55,0.22)',
        card: '0 18px 48px -24px rgba(0,0,0,0.9)'
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(180deg,#ffe8a3 0%,#d4af37 55%,#b8871c 100%)',
        'gold-sheen': 'linear-gradient(120deg,rgba(255,232,163,0) 0%,rgba(255,232,163,0.65) 50%,rgba(255,232,163,0) 100%)'
      },
      keyframes: {
        'reveal-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        'reveal-up': 'reveal-up 0.7s cubic-bezier(0.22,1,0.36,1) both'
      }
    }
  },
  plugins: []
};

export default config;
