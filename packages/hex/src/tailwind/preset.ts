/**
 * Hex Tailwind CSS Preset
 *
 * Maps --hex-* CSS custom properties to Tailwind utility classes.
 * Import as `amuletPreset` from `@amulet-laboratories/hex/tailwind`.
 *
 * Usage:
 * ```ts
 * import { amuletPreset } from '@amulet-laboratories/hex/tailwind'
 * export default { presets: [amuletPreset], content: [...] } satisfies Config
 * ```
 *
 * Backward-compat aliases are provided for existing Rig class names
 * (surface.raised, surface.elevated, etc.) so Rig components require no changes.
 * Phase 5d will gradually migrate components to the new token names.
 */

import type { Config } from 'tailwindcss'

export const amuletPreset: Config = {
  content: [],
  theme: {
    extend: {
      colors: {
        /* ── Surface tokens ────────────────────────────────────── */
        surface: {
          // New canonical names
          DEFAULT: 'var(--hex-surface)',
          alt:     'var(--hex-surface-alt)',
          // Backward-compat aliases (Rig Phase 5d migration target)
          base:     'var(--hex-surface)',
          raised:   'var(--hex-surface-alt)',
          elevated: 'var(--hex-surface-alt)',
          sunken:   'var(--hex-surface)',
          overlay:  'var(--hex-surface-alt)',
        },

        /* ── Text tokens ───────────────────────────────────────── */
        text: {
          // New canonical names
          DEFAULT: 'var(--hex-text)',
          muted:   'var(--hex-text-muted)',
          // Backward-compat aliases
          primary:     'var(--hex-text)',
          secondary:   'var(--hex-text-muted)',
          inverse:     'var(--hex-surface)',
          link:        'var(--hex-accent)',
          'on-accent': 'var(--hex-surface)',
        },

        /* ── Border tokens ─────────────────────────────────────── */
        border: {
          DEFAULT: 'var(--hex-border)',
          // Backward-compat aliases (single border token now)
          subtle: 'var(--hex-border)',
          strong: 'var(--hex-border)',
        },

        /* ── Primary / accent tokens ───────────────────────────── */
        primary: {
          DEFAULT: 'var(--hex-primary)',
          hover:   'var(--hex-primary-hover)',
        },
        secondary: 'var(--hex-secondary)',
        accent: {
          DEFAULT:   'var(--hex-accent)',
          hover:     'var(--hex-accent-hover)',
          // Backward-compat aliases
          primary:   'var(--hex-primary)',
          secondary: 'var(--hex-secondary)',
          active:    'var(--hex-accent)',
          muted:     'var(--hex-muted)',
        },

        /* ── Status tokens ─────────────────────────────────────── */
        status: {
          success: 'var(--hex-success)',
          warning: 'var(--hex-warning)',
          error:   'var(--hex-error)',
          info:    'var(--hex-info)',
        },

        /* ── Muted (placeholder/disabled) ──────────────────────── */
        muted: 'var(--hex-muted)',
      },

      /* ── Font families ─────────────────────────────────────────── */
      fontFamily: {
        display: 'var(--hex-font-display)',
        body:    'var(--hex-font-body)',
        mono:    'var(--hex-font-mono)',
        // Backward-compat alias
        sans: 'var(--hex-font-body)',
      },

      /* ── Spacing (hex-N classes) ───────────────────────────────── */
      spacing: {
        'hex-1':  'var(--hex-space-1)',
        'hex-2':  'var(--hex-space-2)',
        'hex-3':  'var(--hex-space-3)',
        'hex-4':  'var(--hex-space-4)',
        'hex-6':  'var(--hex-space-6)',
        'hex-8':  'var(--hex-space-8)',
        'hex-12': 'var(--hex-space-12)',
        'hex-16': 'var(--hex-space-16)',
        // Old naming preserved for gradual migration
        'hex-xs':  'var(--hex-space-2)',
        'hex-sm':  'var(--hex-space-3)',
        'hex-md':  'var(--hex-space-4)',
        'hex-lg':  'var(--hex-space-6)',
        'hex-xl':  'var(--hex-space-8)',
        'hex-2xl': 'var(--hex-space-12)',
        'hex-3xl': 'var(--hex-space-16)',
      },

      /* ── Border radius ─────────────────────────────────────────── */
      borderRadius: {
        DEFAULT:  'var(--hex-radius-md)',
        full:     'var(--hex-radius-full)',
        'hex-sm': 'var(--hex-radius-sm)',
        'hex-md': 'var(--hex-radius-md)',
        'hex-lg': 'var(--hex-radius-lg)',
      },

      /* ── Box shadows ───────────────────────────────────────────── */
      boxShadow: {
        sm:    'var(--hex-shadow-sm)',
        md:    'var(--hex-shadow-md)',
        lg:    'var(--hex-shadow-lg)',
        xl:    'var(--hex-shadow-xl)',
        inner: 'var(--hex-shadow-inner)',
      },

      /* ── Transition durations ──────────────────────────────────── */
      transitionDuration: {
        fast:   'var(--hex-duration-fast)',
        normal: 'var(--hex-duration-normal)',
        slow:   'var(--hex-duration-slow)',
      },

      /* ── Transition timing functions ───────────────────────────── */
      transitionTimingFunction: {
        standard:   'var(--hex-easing-default)',
        entrance:   'var(--hex-easing-enter)',
        exit:       'var(--hex-easing-exit)',
        // Backward-compat alias
        expressive: 'var(--hex-easing-default)',
      },
    },
  },
  plugins: [],
}
