import { describe, it, expect, beforeEach } from 'vitest'
import { useMotion } from '@rig/composables/useMotion'

describe('useMotion', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string) => ({
        matches: query === '(prefers-reduced-motion: reduce)' ? false : false,
        media: query,
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }),
    })
  })

  it('returns duration, durationSlow, easing, prefersReducedMotion', () => {
    const motion = useMotion()
    expect(motion.duration).toBeDefined()
    expect(motion.durationSlow).toBeDefined()
    expect(motion.easing).toBeDefined()
    expect(motion.prefersReducedMotion).toBeDefined()
  })

  it('provides fallback values when no CSS vars are set', () => {
    const motion = useMotion()
    expect(motion.duration.value).toBe('200ms')
    expect(motion.durationSlow.value).toBe('500ms')
    expect(motion.easing.value).toBe('cubic-bezier(0.4, 0, 0.2, 1)')
  })

  it('prefersReducedMotion defaults to false', () => {
    const motion = useMotion()
    expect(motion.prefersReducedMotion.value).toBe(false)
  })

  it('returns 0ms durations when reduced motion is preferred', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }),
    })

    const motion = useMotion()
    expect(motion.prefersReducedMotion.value).toBe(true)
    expect(motion.duration.value).toBe('0ms')
    expect(motion.durationSlow.value).toBe('0ms')
  })
})
