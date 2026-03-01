/**
 * Hex Engine — CSS Output Utilities
 *
 * Converts a TokenSet to CSS custom properties with --hex-* prefix.
 * Also provides a toCSS() helper for generating complete CSS blocks.
 */

import type { TokenSet } from './types'

// ---------------------------------------------------------------------------
// Property name mapping
// ---------------------------------------------------------------------------

/**
 * Maps TokenSet keys to CSS custom property names.
 * All properties use the --hex-* prefix.
 */
const PROPERTY_MAP: Partial<Record<keyof TokenSet, string>> = {
  // Color
  surface:        '--hex-surface',
  surfaceAlt:     '--hex-surface-alt',
  primary:        '--hex-primary',
  primaryHover:   '--hex-primary-hover',
  secondary:      '--hex-secondary',
  accent:         '--hex-accent',
  accentHover:    '--hex-accent-hover',
  text:           '--hex-text',
  textMuted:      '--hex-text-muted',
  muted:          '--hex-muted',
  border:         '--hex-border',
  success:        '--hex-success',
  warning:        '--hex-warning',
  error:          '--hex-error',
  info:           '--hex-info',

  // Shadow
  shadowSm:       '--hex-shadow-sm',
  shadowMd:       '--hex-shadow-md',
  shadowLg:       '--hex-shadow-lg',
  shadowXl:       '--hex-shadow-xl',
  shadowInner:    '--hex-shadow-inner',

  // Typography — fonts
  fontDisplay:    '--hex-font-display',
  fontBody:       '--hex-font-body',
  fontMono:       '--hex-font-mono',

  // Typography — scale
  textXs:         '--hex-text-xs',
  textSm:         '--hex-text-sm',
  textBase:       '--hex-text-base',
  textLg:         '--hex-text-lg',
  textXl:         '--hex-text-xl',
  text2xl:        '--hex-text-2xl',
  text3xl:        '--hex-text-3xl',
  text4xl:        '--hex-text-4xl',

  // Typography — rhythm
  leadingTight:   '--hex-leading-tight',
  leadingNormal:  '--hex-leading-normal',
  leadingRelaxed: '--hex-leading-relaxed',
  trackingTight:  '--hex-tracking-tight',
  trackingNormal: '--hex-tracking-normal',
  trackingWide:   '--hex-tracking-wide',

  // Spacing
  space1:   '--hex-space-1',
  space2:   '--hex-space-2',
  space3:   '--hex-space-3',
  space4:   '--hex-space-4',
  space6:   '--hex-space-6',
  space8:   '--hex-space-8',
  space12:  '--hex-space-12',
  space16:  '--hex-space-16',

  // Radius
  radiusSm:   '--hex-radius-sm',
  radiusMd:   '--hex-radius-md',
  radiusLg:   '--hex-radius-lg',
  radiusFull: '--hex-radius-full',

  // Motion
  durationFast:   '--hex-duration-fast',
  durationNormal: '--hex-duration-normal',
  durationSlow:   '--hex-duration-slow',
  easingDefault:  '--hex-easing-default',
  easingEnter:    '--hex-easing-enter',
  easingExit:     '--hex-easing-exit',
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Convert a TokenSet to a flat Record of CSS custom property declarations.
 * Metadata keys (archetype, mode, weight, attitude) are excluded.
 *
 * @returns Record<'--hex-*', value>
 */
export function toCustomProperties(tokens: TokenSet): Record<string, string> {
  const props: Record<string, string> = {}
  for (const [key, cssVar] of Object.entries(PROPERTY_MAP)) {
    const value = tokens[key as keyof TokenSet]
    if (typeof value === 'string') {
      props[cssVar] = value
    }
  }
  return props
}

/**
 * Generate a CSS block string for a given selector.
 *
 * @param tokens - Output of generate()
 * @param selector - CSS selector, defaults to ':root'
 * @returns Complete CSS block, e.g. `:root { --hex-surface: oklch(...); ... }`
 */
export function toCSS(tokens: TokenSet, selector: string = ':root'): string {
  const props = toCustomProperties(tokens)
  const lines = Object.entries(props).map(([k, v]) => `  ${k}: ${v};`)
  return `${selector} {\n${lines.join('\n')}\n}\n`
}
