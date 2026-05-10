import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg:       'var(--color-bg)',
        surface:  'var(--color-surface)',
        fg:       'var(--color-fg)',
        muted:    'var(--color-muted)',
        border:   'var(--color-border)',
        accent:   'var(--color-accent)',
        'accent-weak': 'var(--color-accent-weak)',
        night:    'var(--color-night)',
        paper:    'var(--color-paper)',
      },
      fontFamily: {
        display: ['var(--font-display)', '"Iowan Old Style"', 'Georgia', 'serif'],
        body:    ['var(--font-body)', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-mono)', 'ui-monospace', '"IBM Plex Mono"', 'Menlo', 'monospace'],
        hand:    ['var(--font-hand)', 'cursive'],
      },
      borderWidth: {
        '1.5': '1.5px',
      },
    },
  },
  plugins: [],
} satisfies Config;
