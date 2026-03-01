/**
 * @amulet-laboratories/hex-engine
 *
 * Generative design token engine — zero dependencies.
 * Produces complete token sets (color, shadow, typography, spacing, radius, motion)
 * from an archetype + weight + attitude combination.
 *
 * @example
 * ```ts
 * import { generate, toCSS } from '@amulet-laboratories/hex-engine'
 *
 * const tokens = generate({ archetype: 'command', mode: 'night', weight: 'standard', attitude: 'kinetic' })
 * const css = toCSS(tokens)
 * ```
 */

// Core generator
export { generate, audit } from './engine'

// CSS output
export { toCSS, toCustomProperties } from './css'

// Archetype definitions and registry
export { archetypes, ARCHETYPES, ARCHETYPE_ALIASES } from './archetypes'

// Modifier definitions
export { weights, attitudes, WEIGHTS, ATTITUDES } from './modifiers'

// WCAG contrast utilities
export { checkContrast, oklchContrastRatio, parseOklch, relativeLuminance } from './contrast'

// Color utilities (useful for custom generators)
export { formatOklch, oklchToSrgb255 } from './color'

// All public types
export type {
  Mode,
  WeightKey,
  AttitudeKey,
  ArchetypeKey,
  ColorTokens,
  ShadowTokens,
  TypographyTokens,
  SpacingTokens,
  RadiusTokens,
  MotionTokens,
  TokenSet,
  TypographyProfile,
  ArchetypeDefinition,
  CustomArchetype,
  WeightDefinition,
  AttitudeDefinition,
  ThemeConfig,
  ContrastResult,
  AuditPair,
  AuditResult,
} from './types'
