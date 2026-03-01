/**
 * Hex Engine — Typography Token Generation
 *
 * Computes a modular type scale and rhythm values from an archetype's
 * typography profile. Font stacks are recommendations — users bring their own fonts.
 */

import type { TypographyTokens, TypographyProfile } from './types'

// ---------------------------------------------------------------------------
// Scale computation
// ---------------------------------------------------------------------------

/**
 * Compute a modular scale value.
 * @param base - Base size in rem (1)
 * @param ratio - Modular scale ratio
 * @param step - Steps from base (negative = smaller, positive = larger)
 */
function scaleStep(base: number, ratio: number, step: number): string {
  return `${(base * Math.pow(ratio, step)).toFixed(4)}rem`
}

// ---------------------------------------------------------------------------
// Leading values per profile preference
// ---------------------------------------------------------------------------

const LEADING: Record<'tight' | 'normal' | 'relaxed', [string, string, string]> = {
  tight:   ['1.15', '1.40', '1.60'],
  normal:  ['1.20', '1.50', '1.65'],
  relaxed: ['1.25', '1.60', '1.80'],
}

// ---------------------------------------------------------------------------
// Tracking values
// ---------------------------------------------------------------------------
// trackingTight, trackingNormal, trackingWide

const TRACKING: Record<'tight' | 'normal' | 'relaxed', [string, string, string]> = {
  tight:   ['-0.02em', '0em',    '0.04em'],
  normal:  ['-0.01em', '0em',    '0.05em'],
  relaxed: ['-0.01em', '0em',    '0.06em'],
}

// ---------------------------------------------------------------------------
// Main generator
// ---------------------------------------------------------------------------

export function generateTypography(profile: TypographyProfile): TypographyTokens {
  const { scaleRatio, leading, fontDisplay, fontBody, fontMono, trackingDisplay } = profile
  const base = 1

  const [leadingTight, leadingNormal, leadingRelaxed] = LEADING[leading]
  const [trackingTight, trackingNormal, trackingWide] = TRACKING[leading]

  return {
    fontDisplay,
    fontBody,
    fontMono,

    textXs:   scaleStep(base, scaleRatio, -2),
    textSm:   scaleStep(base, scaleRatio, -1),
    textBase: `${base}rem`,
    textLg:   scaleStep(base, scaleRatio, 1),
    textXl:   scaleStep(base, scaleRatio, 2),
    text2xl:  scaleStep(base, scaleRatio, 3),
    text3xl:  scaleStep(base, scaleRatio, 4),
    text4xl:  scaleStep(base, scaleRatio, 5),

    leadingTight,
    leadingNormal,
    leadingRelaxed,

    trackingTight,
    trackingNormal: trackingDisplay !== '0em' ? trackingDisplay : trackingNormal,
    trackingWide,
  }
}
