/**
 * Hex Engine — Weight and Attitude Modifiers
 */

import type { AttitudeDefinition, AttitudeKey, WeightDefinition, WeightKey } from './types'

export const WEIGHTS: Record<WeightKey, WeightDefinition> = {
  light: {
    key: 'light',
    chromaMultiplier: 0.7,
    lightnessShift: 0.05,
  },
  standard: {
    key: 'standard',
    chromaMultiplier: 1.0,
    lightnessShift: 0,
  },
  heavy: {
    key: 'heavy',
    chromaMultiplier: 1.35,
    lightnessShift: -0.04,
  },
}

export const ATTITUDES: Record<AttitudeKey, AttitudeDefinition> = {
  kinetic: {
    key: 'kinetic',
    chromaShift: 0.05,
    lightnessShift: 0.01,
    hueShift: -8,
  },
  tranquil: {
    key: 'tranquil',
    chromaShift: -0.03,
    lightnessShift: 0.03,
    hueShift: 12,
  },
  intimate: {
    key: 'intimate',
    chromaShift: 0,
    lightnessShift: -0.05,
    hueShift: -5,
  },
  luminous: {
    key: 'luminous',
    chromaShift: 0.04,
    lightnessShift: 0.03,
    hueShift: 18,
  },
}

export const weights: WeightDefinition[] = Object.values(WEIGHTS)
export const attitudes: AttitudeDefinition[] = Object.values(ATTITUDES)
