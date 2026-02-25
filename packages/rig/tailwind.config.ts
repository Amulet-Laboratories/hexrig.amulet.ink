import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/**/*.{vue,ts}',
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          base: 'var(--surface-base)',
          raised: 'var(--surface-raised)',
          elevated: 'var(--surface-elevated)',
          sunken: 'var(--surface-sunken)',
          overlay: 'var(--surface-overlay)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
          inverse: 'var(--text-inverse)',
          link: 'var(--text-link)',
          'on-accent': 'var(--text-on-accent)',
        },
        border: {
          DEFAULT: 'var(--border-default)',
          subtle: 'var(--border-subtle)',
          strong: 'var(--border-strong)',
        },
        accent: {
          DEFAULT: 'var(--accent-primary)',
          secondary: 'var(--accent-secondary)',
          hover: 'var(--accent-hover)',
          active: 'var(--accent-active)',
          muted: 'var(--accent-muted)',
        },
        status: {
          success: 'var(--status-success)',
          warning: 'var(--status-warning)',
          error: 'var(--status-error)',
          info: 'var(--status-info)',
        },
        focus: {
          ring: 'var(--focus-ring)',
          outline: 'var(--focus-outline)',
        },
      },
      fontFamily: {
        display: 'var(--font-display)',
        body: 'var(--font-body)',
        sans: 'var(--font-sans)',
        mono: 'var(--font-mono)',
      },
      borderRadius: {
        theme: '8px',
      },
      transitionDuration: {
        fast: 'var(--duration-fast)',
        normal: 'var(--duration-normal)',
        slow: 'var(--duration-slow)',
      },
      transitionTimingFunction: {
        standard: 'var(--easing-default)',
        entrance: 'var(--easing-entrance)',
        exit: 'var(--easing-exit)',
      },
    },
  },
  plugins: [],
} satisfies Config
