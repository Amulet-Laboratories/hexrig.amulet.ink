/**
 * Hex Engine — WCAG Contrast Utilities
 *
 * Parses CSS oklch() strings, converts to sRGB, and computes WCAG contrast ratios.
 */

import { oklchToSrgb255 } from './color'
import type { ContrastResult } from './types'

// ---------------------------------------------------------------------------
// OKLCH CSS string parser
// ---------------------------------------------------------------------------

/**
 * Parse a CSS oklch() string to [L, C, H] values.
 * Handles: oklch(0.72 0.18 145) and oklch(0.72 0.18 145 / 0.5)
 * Returns null if the string cannot be parsed.
 */
export function parseOklch(css: string): [number, number, number] | null {
  const match = css.match(
    /oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*[\d.]+)?\s*\)/,
  )
  if (!match) return null
  return [parseFloat(match[1]), parseFloat(match[2]), parseFloat(match[3])]
}

// ---------------------------------------------------------------------------
// sRGB luminance
// ---------------------------------------------------------------------------

/**
 * Convert a single sRGB channel [0–255] to linear light.
 */
function srgbChannelToLinear(c: number): number {
  const v = c / 255
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
}

/**
 * Compute WCAG relative luminance from sRGB [0–255] values.
 * Per WCAG 2.1 §1.4.3 success criterion.
 */
export function relativeLuminance(r: number, g: number, b: number): number {
  return (
    0.2126 * srgbChannelToLinear(r) +
    0.7152 * srgbChannelToLinear(g) +
    0.0722 * srgbChannelToLinear(b)
  )
}

/**
 * Compute WCAG contrast ratio from two relative luminance values.
 * Always returns ≥ 1 (lighter / darker).
 */
export function contrastRatioFromLuminance(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

// ---------------------------------------------------------------------------
// High-level helpers
// ---------------------------------------------------------------------------

/**
 * Compute the WCAG contrast ratio between two CSS oklch() strings.
 * Returns the raw ratio (1.0–21.0) or null if either color cannot be parsed.
 */
export function oklchContrastRatio(fg: string, bg: string): number | null {
  const fgVals = parseOklch(fg)
  const bgVals = parseOklch(bg)
  if (!fgVals || !bgVals) return null

  const [fr, fg2, fb] = oklchToSrgb255(...fgVals)
  const [br, bg2, bb] = oklchToSrgb255(...bgVals)

  const l1 = relativeLuminance(fr, fg2, fb)
  const l2 = relativeLuminance(br, bg2, bb)
  return contrastRatioFromLuminance(l1, l2)
}

/**
 * Full contrast result with WCAG tier flags.
 */
export function checkContrast(fg: string, bg: string): ContrastResult {
  const ratio = oklchContrastRatio(fg, bg) ?? 1
  return {
    ratio,
    aa: ratio >= 4.5,
    aaLarge: ratio >= 3.0,
    aaa: ratio >= 7.0,
  }
}
