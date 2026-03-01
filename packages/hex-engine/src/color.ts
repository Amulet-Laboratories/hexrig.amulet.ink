/**
 * Hex Engine — OKLCH Color Generation
 *
 * All generated colors are output as CSS oklch() strings.
 * sRGB conversion is provided separately (contrast.ts) for WCAG checking.
 *
 * References:
 *   https://www.w3.org/TR/css-color-4/#the-oklch-notation
 *   https://bottosson.github.io/posts/oklab/
 */

import type { ColorTokens, ArchetypeDefinition, WeightDefinition, AttitudeDefinition, Mode } from './types'

// ---------------------------------------------------------------------------
// Math helpers
// ---------------------------------------------------------------------------

/** Clamp a value to [0, 1] */
function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v))
}

/** Normalize hue to [0, 360) */
function normalizeHue(h: number): number {
  return ((h % 360) + 360) % 360
}

// ---------------------------------------------------------------------------
// OKLCH → sRGB conversion (for internal contrast checking only)
// ---------------------------------------------------------------------------

/** OKLCH → OKLab (polar to Cartesian) */
function oklchToOklab(l: number, c: number, h: number): [number, number, number] {
  const hRad = (h * Math.PI) / 180
  return [l, c * Math.cos(hRad), c * Math.sin(hRad)]
}

/** OKLab → linear sRGB */
function oklabToLinearSrgb(L: number, a: number, b: number): [number, number, number] {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b

  const l = l_ * l_ * l_
  const m = m_ * m_ * m_
  const s = s_ * s_ * s_

  return [
    +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s,
  ]
}

/** Linear sRGB → gamma-encoded sRGB */
function linearToSrgb(c: number): number {
  if (c <= 0.0031308) return 12.92 * c
  return 1.055 * Math.pow(Math.abs(c), 1 / 2.4) - 0.055
}

/**
 * Convert OKLCH to sRGB [0–255] with gamut clamping.
 * Used only for WCAG contrast checking — CSS output uses raw oklch().
 */
export function oklchToSrgb255(l: number, c: number, h: number): [number, number, number] {
  const [La, a, b] = oklchToOklab(l, c, h)
  const [r, g, bl] = oklabToLinearSrgb(La, a, b)
  return [
    Math.round(clamp01(linearToSrgb(r)) * 255),
    Math.round(clamp01(linearToSrgb(g)) * 255),
    Math.round(clamp01(linearToSrgb(bl)) * 255),
  ]
}

// ---------------------------------------------------------------------------
// CSS formatting
// ---------------------------------------------------------------------------

/**
 * Format OKLCH values as a CSS oklch() string.
 * Precision: L=4 decimals, C=4 decimals, H=2 decimals.
 */
export function formatOklch(l: number, c: number, h: number, alpha?: number): string {
  const lStr = l.toFixed(4)
  const cStr = c.toFixed(4)
  const hStr = h.toFixed(2)
  if (alpha !== undefined && alpha < 0.9999) {
    return `oklch(${lStr} ${cStr} ${hStr} / ${alpha.toFixed(3)})`
  }
  return `oklch(${lStr} ${cStr} ${hStr})`
}

// ---------------------------------------------------------------------------
// Color generation
// ---------------------------------------------------------------------------

/**
 * Generate all 15 color tokens from resolved archetype + modifiers + mode.
 *
 * The algorithm:
 * 1. Apply attitude hue shift to both base and accent hues
 * 2. Compute final chroma: (archetype.chroma + att.chromaShift) × weight.chromaMultiplier
 * 3. Combined lightness shift for primary: weight.lShift + att.lShift
 * 4. Surface and primary lightness from archetype per-mode values
 * 5. Derive all 15 tokens from these resolved parameters
 */
export function generateColors(
  archetype: ArchetypeDefinition,
  weight: WeightDefinition,
  attitude: AttitudeDefinition,
  mode: Mode,
): ColorTokens {
  const isNight = mode === 'night'

  // Apply attitude hue shift
  const baseHue = normalizeHue(archetype.baseHue + attitude.hueShift)
  const accentHue = normalizeHue(archetype.accentHue + attitude.hueShift)

  // Final chroma (never negative)
  const chroma = Math.max(0, (archetype.chroma + attitude.chromaShift) * weight.chromaMultiplier)

  // Combined lightness shift for primary
  const lShift = weight.lightnessShift + attitude.lightnessShift

  // Surface lightness from archetype definition
  const surfL = isNight ? archetype.surfL.n : archetype.surfL.d

  // Primary lightness: archetype base ± combined shift
  // In night mode, more lightness = brighter on dark background (desired)
  // In day mode, less lightness = darker on light background (desired)
  const primL = clamp01(isNight
    ? (archetype.primL.n + lShift)
    : (archetype.primL.d - lShift))

  // --- Surface tokens ---
  // Very low chroma — background should be subtle, just a hint of hue
  const surfChroma = chroma * 0.12
  const surface = formatOklch(surfL, surfChroma, baseHue)

  const surfAltL = isNight
    ? clamp01(surfL + 0.045)
    : clamp01(surfL - 0.030)
  const surfaceAlt = formatOklch(surfAltL, surfChroma, baseHue)

  // --- Primary tokens ---
  const primary = formatOklch(primL, chroma, baseHue)

  const primHoverL = isNight
    ? clamp01(primL + 0.08)
    : clamp01(primL - 0.08)
  const primaryHover = formatOklch(primHoverL, chroma, baseHue)

  // Secondary: muted brand — lower chroma, shifted lightness
  const secL = isNight
    ? clamp01(primL - 0.14)
    : clamp01(primL + 0.10)
  const secondary = formatOklch(secL, chroma * 0.60, baseHue)

  // --- Accent tokens (different hue) ---
  // Gallery has chroma=0, so accent equals surface in lightness but achromatic
  const accentChroma = Math.min(chroma * 1.20, 0.32)
  const accentL = isNight ? 0.70 : 0.40
  const accent = formatOklch(accentL, accentChroma, accentHue)

  const accentHoverL = isNight ? 0.78 : 0.33
  const accentHover = formatOklch(accentHoverL, accentChroma, accentHue)

  // --- Text tokens ---
  // Near-monochromatic — just enough chroma to feel warm/cool, not fully gray
  const textChroma = Math.min(chroma * 0.04, 0.012)
  const text = formatOklch(isNight ? 0.92 : 0.12, textChroma, baseHue)
  const textMuted = formatOklch(isNight ? 0.62 : 0.48, textChroma, baseHue)
  const muted = formatOklch(isNight ? 0.38 : 0.72, textChroma, baseHue)

  // --- Border ---
  const borderChroma = Math.min(chroma * 0.18, 0.035)
  const border = formatOklch(isNight ? 0.27 : 0.78, borderChroma, baseHue)

  // --- Semantic status colors (fixed hues, mode-adjusted lightness) ---
  // These are universal across all archetypes
  const success = formatOklch(isNight ? 0.72 : 0.40, 0.18, 145)
  const warning = formatOklch(isNight ? 0.80 : 0.48, 0.17, 85)
  const error = formatOklch(isNight ? 0.65 : 0.42, 0.22, 25)
  const info = formatOklch(isNight ? 0.72 : 0.42, 0.15, 230)

  return {
    surface,
    surfaceAlt,
    primary,
    primaryHover,
    secondary,
    accent,
    accentHover,
    text,
    textMuted,
    muted,
    border,
    success,
    warning,
    error,
    info,
  }
}
