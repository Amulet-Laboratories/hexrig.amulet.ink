/**
 * Hex Engine — Border Radius Generation
 *
 * Radius derived from attitude:
 * - kinetic:  sharp, functional
 * - tranquil: soft, rounded
 * - intimate: slightly rounded, warm
 * - luminous: soft, airy
 */

import type { RadiusTokens, AttitudeKey } from './types'

const RADIUS_VALUES: Record<AttitudeKey, { sm: number; md: number; lg: number }> = {
  kinetic:  { sm: 2,  md: 4,  lg: 8  },
  tranquil: { sm: 6,  md: 12, lg: 20 },
  intimate: { sm: 4,  md: 6,  lg: 10 },
  luminous: { sm: 4,  md: 8,  lg: 14 },
}

export function generateRadius(attitude: AttitudeKey): RadiusTokens {
  const r = RADIUS_VALUES[attitude]
  return {
    radiusSm:   `${r.sm}px`,
    radiusMd:   `${r.md}px`,
    radiusLg:   `${r.lg}px`,
    radiusFull: '9999px',
  }
}
