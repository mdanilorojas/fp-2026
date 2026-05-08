import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        paper: 'var(--color-paper)',
        gold: 'var(--color-gold)',
        'warm-orange': 'var(--color-warm-orange)',
        coral: 'var(--color-coral)',
        'deep-brown': 'var(--color-deep-brown)',
        cacao: 'var(--color-cacao)',
        leaf: 'var(--color-leaf)',
        'valley-green': 'var(--color-valley-green)',
        sky: 'var(--color-sky)',
        night: 'var(--color-night)',
        candle: 'var(--color-candle)',
        'muted-text': 'var(--color-muted-text)',
        'cushion-cream': 'var(--color-cushion-cream)',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        hand: ['var(--font-caveat)', 'cursive'],
      },
    },
  },
  plugins: [],
} satisfies Config;
