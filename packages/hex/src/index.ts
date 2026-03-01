/**
 * @amulet-laboratories/hex
 *
 * DOM integration layer for hex-engine.
 * Applies generated tokens as CSS custom properties on the document root.
 *
 * @example
 * ```ts
 * import { applyTheme } from '@amulet-laboratories/hex'
 *
 * // Simple — named archetype with defaults (night/standard/kinetic)
 * applyTheme('command')
 *
 * // Full control
 * applyTheme({ archetype: 'command', mode: 'night', weight: 'heavy', attitude: 'kinetic' })
 *
 * // Custom archetype
 * applyTheme({ archetype: { key: 'greyline', name: 'Greyline', baseHue: 220, accentHue: 45, chroma: 0.04 } })
 * ```
 */

import { generate, toCustomProperties } from '@amulet-laboratories/hex-engine'
import type {
  ThemeConfig,
  TokenSet,
  ArchetypeKey,
  WeightKey,
  AttitudeKey,
  Mode,
} from '@amulet-laboratories/hex-engine'

// ---------------------------------------------------------------------------
// Re-exports — full engine API available from hex
// ---------------------------------------------------------------------------

export {
  generate,
  audit,
  toCSS,
  toCustomProperties,
  archetypes,
  ARCHETYPES,
  ARCHETYPE_ALIASES,
  weights,
  attitudes,
  WEIGHTS,
  ATTITUDES,
  checkContrast,
  oklchContrastRatio,
  parseOklch,
  formatOklch,
} from '@amulet-laboratories/hex-engine'

export type {
  ThemeConfig,
  TokenSet,
  ArchetypeKey,
  WeightKey,
  AttitudeKey,
  Mode,
  // Backward-compat alias — Rig uses ModeId; new name is Mode
  Mode as ModeId,
  ColorTokens,
  ShadowTokens,
  TypographyTokens,
  SpacingTokens,
  RadiusTokens,
  MotionTokens,
  ArchetypeDefinition,
  CustomArchetype,
  WeightDefinition,
  AttitudeDefinition,
  TypographyProfile,
  ContrastResult,
  AuditResult,
  AuditPair,
} from '@amulet-laboratories/hex-engine'

// ---------------------------------------------------------------------------
// Active theme tracking
// ---------------------------------------------------------------------------

let _activeConfig: ThemeConfig | null = null

// ---------------------------------------------------------------------------
// Config normalization
// ---------------------------------------------------------------------------

function normalizeConfig(
  archetypeOrConfig: ArchetypeKey | ThemeConfig | string,
  mode?: string,
  weight?: string,
  attitude?: string,
): ThemeConfig {
  if (typeof archetypeOrConfig === 'string') {
    return {
      archetype: archetypeOrConfig as ArchetypeKey,
      mode: (mode ?? 'night') as Mode,
      weight: (weight ?? 'standard') as WeightKey,
      attitude: (attitude ?? 'kinetic') as AttitudeKey,
    }
  }
  return archetypeOrConfig as ThemeConfig
}

// ---------------------------------------------------------------------------
// applyTheme — set CSS custom properties on :root
// ---------------------------------------------------------------------------

/**
 * Apply a theme to the document root by setting --hex-* CSS custom properties.
 *
 * @param config - ThemeConfig object or archetype key string
 */
export function applyTheme(config: ThemeConfig): void
/**
 * @param archetype - Named archetype key (e.g. 'command')
 * @param mode - 'day' | 'night' (default: 'night')
 * @param weight - 'light' | 'standard' | 'heavy' (default: 'standard')
 * @param attitude - 'kinetic' | 'tranquil' | 'intimate' | 'luminous' (default: 'kinetic')
 */
export function applyTheme(
  archetype: string,
  mode?: string,
  weight?: string,
  attitude?: string,
): void
export function applyTheme(
  archetypeOrConfig: ArchetypeKey | ThemeConfig | string,
  mode?: string,
  weight?: string,
  attitude?: string,
): void {
  if (typeof document === 'undefined') return

  const config = normalizeConfig(archetypeOrConfig, mode, weight, attitude)
  _activeConfig = config

  const tokens = generate(config)
  const props = toCustomProperties(tokens)
  const root = document.documentElement

  for (const [key, value] of Object.entries(props)) {
    root.style.setProperty(key, value)
  }
}

// ---------------------------------------------------------------------------
// getTokens — SSR-safe token generation (no DOM side effects)
// ---------------------------------------------------------------------------

/**
 * Generate tokens without applying them to the DOM.
 * Safe to use in SSR, build-time scripts, or testing.
 */
export function getTokens(config: ThemeConfig): TokenSet {
  return generate(config)
}

// ---------------------------------------------------------------------------
// getCSS — generate CSS string for SSR injection or static files
// ---------------------------------------------------------------------------

/**
 * Generate a CSS block string for a given selector.
 *
 * @param config - ThemeConfig
 * @param selector - CSS selector (default: ':root')
 *
 * @example
 * ```ts
 * const css = getCSS({ archetype: 'command', mode: 'night' })
 * // → ':root {\n  --hex-surface: oklch(...);\n  ...\n}\n'
 * ```
 */
export function getCSS(config: ThemeConfig, selector: string = ':root'): string {
  const tokens = generate(config)
  const props = toCustomProperties(tokens)
  const lines = Object.entries(props).map(([k, v]) => `  ${k}: ${v};`)
  return `${selector} {\n${lines.join('\n')}\n}\n`
}

// ---------------------------------------------------------------------------
// getActiveArchetype — read last applied config
// ---------------------------------------------------------------------------

/**
 * Returns the ThemeConfig most recently passed to applyTheme(), or null.
 * Useful for Filigree and other systems that need to read the active archetype.
 */
export function getActiveArchetype(): ThemeConfig | null {
  return _activeConfig
}
