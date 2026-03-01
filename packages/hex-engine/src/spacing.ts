/**
 * Hex Engine — Spacing Scale Generation
 *
 * Spacing scales with weight:
 * - light:    +25% (airy, spacious)
 * - standard: base (balanced)
 * - heavy:    -25% (compact, dense)
 */

import type { SpacingTokens, WeightKey } from './types'

const WEIGHT_MULT: Record<WeightKey, number> = {
  light: 1.25,
  standard: 1.0,
  heavy: 0.75,
}

export function generateSpacing(weight: WeightKey): SpacingTokens {
  const m = WEIGHT_MULT[weight]

  function px(base: number): string {
    return `${Math.round(base * m)}px`
  }

  return {
    space1:  px(4),
    space2:  px(8),
    space3:  px(12),
    space4:  px(16),
    space6:  px(24),
    space8:  px(32),
    space12: px(48),
    space16: px(64),
  }
}
