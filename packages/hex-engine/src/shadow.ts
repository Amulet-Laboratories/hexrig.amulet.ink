/**
 * Hex Engine — Shadow Generation
 *
 * Shadows are tinted with the archetype's primary hue at very low lightness.
 * Opacity and spread scale with mode (night = more opaque) and weight.
 */

import type { ShadowTokens, Mode, WeightKey } from './types'

/**
 * Generate 4 shadow tokens from the primary hue, surface lightness, mode, and weight.
 *
 * @param primaryHue - The resolved base hue (after attitude shift) for tinting
 * @param mode - day or night
 * @param weight - light / standard / heavy
 */
export function generateShadows(
  primaryHue: number,
  mode: Mode,
  weight: WeightKey,
): ShadowTokens {
  const isNight = mode === 'night'

  // Shadow color: very dark, slightly tinted
  // Night mode: near-black shadows feel natural against dark surfaces
  // Day mode: semi-transparent warm shadows against light surfaces
  const shadowL = isNight ? 0.04 : 0.08
  const shadowC = 0.025
  const h = primaryHue.toFixed(2)

  // Base opacity scales with mode and weight
  const baseOpacity = isNight ? 0.45 : 0.10
  const weightMult: Record<WeightKey, number> = {
    light: 0.65,
    standard: 1.0,
    heavy: 1.60,
  }
  const mult = weightMult[weight]

  // Individual shadow opacities, capped at 0.90
  function op(factor: number): string {
    return Math.min(baseOpacity * mult * factor, 0.9).toFixed(3)
  }

  const sc = `oklch(${shadowL.toFixed(4)} ${shadowC.toFixed(4)} ${h}`

  return {
    shadowSm:
      `0 1px 2px 0 ${sc} / ${op(0.80)})`,

    shadowMd:
      `0 4px 6px -1px ${sc} / ${op(1.00)}), ` +
      `0 2px 4px -2px ${sc} / ${op(0.65)})`,

    shadowLg:
      `0 10px 15px -3px ${sc} / ${op(1.20)}), ` +
      `0 4px 6px -4px ${sc} / ${op(0.70)})`,

    shadowXl:
      `0 20px 25px -5px ${sc} / ${op(1.50)}), ` +
      `0 8px 10px -6px ${sc} / ${op(0.80)})`,

    shadowInner:
      `inset 0 2px 4px 0 ${sc} / ${op(0.55)})`,
  }
}
