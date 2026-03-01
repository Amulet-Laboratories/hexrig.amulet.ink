/**
 * Hex Engine — Motion & Easing Token Generation
 *
 * Motion derived from attitude:
 * - kinetic:  fast, snappy — quick feedback, decisive
 * - tranquil: slow, eased — measured, deliberate
 * - intimate: medium, smooth — personal, unhurried
 * - luminous: medium, bouncy — energetic, expressive
 */

import type { MotionTokens, AttitudeKey } from './types'

const MOTION_PROFILES: Record<AttitudeKey, MotionTokens> = {
  kinetic: {
    durationFast:   '100ms',
    durationNormal: '200ms',
    durationSlow:   '400ms',
    easingDefault: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    easingEnter:   'cubic-bezier(0.00, 0.00, 0.20, 1.00)',
    easingExit:    'cubic-bezier(0.40, 0.00, 1.00, 1.00)',
  },
  tranquil: {
    durationFast:   '200ms',
    durationNormal: '400ms',
    durationSlow:   '700ms',
    easingDefault: 'cubic-bezier(0.40, 0.00, 0.60, 1.00)',
    easingEnter:   'cubic-bezier(0.00, 0.00, 0.40, 1.00)',
    easingExit:    'cubic-bezier(0.60, 0.00, 1.00, 1.00)',
  },
  intimate: {
    durationFast:   '150ms',
    durationNormal: '250ms',
    durationSlow:   '500ms',
    easingDefault: 'cubic-bezier(0.25, 0.10, 0.25, 1.00)',
    easingEnter:   'cubic-bezier(0.00, 0.00, 0.25, 1.00)',
    easingExit:    'cubic-bezier(0.75, 0.00, 1.00, 1.00)',
  },
  luminous: {
    durationFast:   '150ms',
    durationNormal: '300ms',
    durationSlow:   '600ms',
    easingDefault: 'cubic-bezier(0.34, 1.56, 0.64, 1.00)',
    easingEnter:   'cubic-bezier(0.34, 1.56, 0.64, 1.00)',
    easingExit:    'cubic-bezier(0.40, 0.00, 0.60, 1.00)',
  },
}

export function generateMotion(attitude: AttitudeKey): MotionTokens {
  return MOTION_PROFILES[attitude]
}
