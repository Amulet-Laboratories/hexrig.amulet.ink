/**
 * Hex Engine — generate() Orchestrator
 *
 * One function call → one complete token set.
 * Resolves archetype (named or custom), applies weight + attitude modifiers,
 * and delegates to each sub-generator.
 */

import type {
  ThemeConfig,
  TokenSet,
  ArchetypeDefinition,
  ArchetypeKey,
  AttitudeKey,
  WeightKey,
  Mode,
  AuditResult,
} from './types'
import { ARCHETYPES, ARCHETYPE_ALIASES } from './archetypes'
import { WEIGHTS, ATTITUDES } from './modifiers'
import { generateColors } from './color'
import { generateShadows } from './shadow'
import { generateTypography } from './typography'
import { generateSpacing } from './spacing'
import { generateRadius } from './radius'
import { generateMotion } from './motion'
import { checkContrast } from './contrast'

// ---------------------------------------------------------------------------
// Archetype resolution
// ---------------------------------------------------------------------------

/**
 * Resolve an archetype from a key, alias, or custom definition.
 * Custom archetypes can borrow typography from a named archetype.
 */
function resolveArchetype(input: ThemeConfig['archetype']): ArchetypeDefinition {
  if (typeof input === 'string') {
    // Try direct key lookup
    const direct = ARCHETYPES[input as ArchetypeKey]
    if (direct) return direct

    // Try alias (old names)
    const aliasKey = ARCHETYPE_ALIASES[input]
    if (aliasKey) return ARCHETYPES[aliasKey]

    throw new Error(
      `[hex-engine] Unknown archetype: "${input}". ` +
      `Valid: ${Object.keys(ARCHETYPES).join(', ')}`,
    )
  }

  // Custom archetype object
  const {
    key,
    name,
    baseHue,
    accentHue,
    chroma,
    surfL = { d: 0.97, n: 0.09 },
    primL = { d: 0.42, n: 0.68 },
    typography,
  } = input

  // Resolve typography: borrow from named archetype or use provided profile
  let resolvedTypography: ArchetypeDefinition['typography']
  if (!typography) {
    resolvedTypography = ARCHETYPES.command.typography
  } else if (typeof typography === 'string') {
    const source = ARCHETYPES[typography as ArchetypeKey]
    if (!source) {
      throw new Error(`[hex-engine] Unknown typography source archetype: "${typography}"`)
    }
    resolvedTypography = source.typography
  } else {
    resolvedTypography = typography
  }

  return { key, name, baseHue, accentHue, chroma, surfL, primL, typography: resolvedTypography }
}

// ---------------------------------------------------------------------------
// Main generator
// ---------------------------------------------------------------------------

/**
 * Generate a complete token set from a ThemeConfig.
 *
 * @example
 * ```ts
 * const tokens = generate({ archetype: 'command', mode: 'night', weight: 'standard', attitude: 'kinetic' })
 * ```
 */
export function generate(config: ThemeConfig): TokenSet {
  const mode: Mode = config.mode ?? 'night'
  const weightKey: WeightKey = config.weight ?? 'standard'
  const attitudeKey: AttitudeKey = config.attitude ?? 'kinetic'

  const archetype = resolveArchetype(config.archetype)
  const weight = WEIGHTS[weightKey]
  const attitude = ATTITUDES[attitudeKey]

  // Resolve final hue for shadow tinting (after attitude shift)
  const resolvedBaseHue = ((archetype.baseHue + attitude.hueShift) % 360 + 360) % 360

  const colors = generateColors(archetype, weight, attitude, mode)
  const shadows = generateShadows(resolvedBaseHue, mode, weightKey)
  const typography = generateTypography(archetype.typography)
  const spacing = generateSpacing(weightKey)
  const radius = generateRadius(attitudeKey)
  const motion = generateMotion(attitudeKey)

  return {
    archetype: archetype.key,
    mode,
    weight: weightKey,
    attitude: attitudeKey,
    ...colors,
    ...shadows,
    ...typography,
    ...spacing,
    ...radius,
    ...motion,
  }
}

// ---------------------------------------------------------------------------
// Audit — run all 192 combinations
// ---------------------------------------------------------------------------

/**
 * Run a contrast audit for a single theme config.
 * Checks the critical text/surface and primary/surface pairs.
 */
export function audit(config: ThemeConfig): AuditResult {
  const tokens = generate(config)

  const pairs = [
    {
      name: 'text on surface',
      foreground: tokens.text,
      background: tokens.surface,
      contrast: checkContrast(tokens.text, tokens.surface),
      pass: false,
    },
    {
      name: 'text on surfaceAlt',
      foreground: tokens.text,
      background: tokens.surfaceAlt,
      contrast: checkContrast(tokens.text, tokens.surfaceAlt),
      pass: false,
    },
    {
      name: 'primary on surface',
      foreground: tokens.primary,
      background: tokens.surface,
      contrast: checkContrast(tokens.primary, tokens.surface),
      pass: false,
    },
    {
      name: 'accent on surface',
      foreground: tokens.accent,
      background: tokens.surface,
      contrast: checkContrast(tokens.accent, tokens.surface),
      pass: false,
    },
  ]

  // Populate pass flags: text needs AA (4.5), UI elements need AA large (3.0)
  const [textSurf, textAlt, primSurf, accSurf] = pairs
  textSurf.pass = textSurf.contrast.aa
  textAlt.pass = textAlt.contrast.aa
  primSurf.pass = primSurf.contrast.aaLarge
  accSurf.pass = accSurf.contrast.aaLarge

  return {
    config,
    pairs,
    passing: pairs.every((p) => p.pass),
  }
}
