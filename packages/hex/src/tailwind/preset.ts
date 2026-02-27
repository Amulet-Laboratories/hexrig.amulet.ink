/**
 * Hex Tailwind CSS Preset
 *
 * Maps Hex CSS custom properties to Tailwind utility classes.
 * Import as `amuletPreset` from `@amulet-laboratories/hex/tailwind`.
 *
 * Usage:
 * ```ts
 * import { amuletPreset } from '@amulet-laboratories/hex/tailwind'
 * export default { presets: [amuletPreset], content: [...] } satisfies Config
 * ```
 *
 * Theme tokens will expand over time — this preset is the single source
 * of truth for the CSS-variable-to-Tailwind mapping. Adding a token here
 * propagates it to every consumer automatically.
 */

import type { Config } from 'tailwindcss'

export const amuletPreset: Config = {
  content: [],
  theme: {
    extend: {
      colors: {
        /* ── Semantic tokens (CSS custom properties) ───────────── */
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
      spacing: {
        'hex-xs': 'var(--spacing-xs)',
        'hex-sm': 'var(--spacing-sm)',
        'hex-md': 'var(--spacing-md)',
        'hex-lg': 'var(--spacing-lg)',
        'hex-xl': 'var(--spacing-xl)',
        'hex-2xl': 'var(--spacing-2xl)',
        'hex-3xl': 'var(--spacing-3xl)',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        full: 'var(--radius-full)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
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
        expressive: 'var(--easing-expressive)',
      },
    },
  },
  plugins: [],
}
