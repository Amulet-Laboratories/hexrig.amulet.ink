import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { effectScope, type EffectScope } from 'vue'
import { useMotion } from '@rig/composables/useMotion'

describe('useMotion', () => {
  let scope: EffectScope
  let warnSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    scope = effectScope()
    // Suppress expected Vue warn for inject() outside setup — composable handles this gracefully
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
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

  afterEach(() => {
    scope.stop()
    warnSpy.mockRestore()
  })

  it('returns duration, durationSlow, easing, prefersReducedMotion', () => {
    scope.run(() => {
      const motion = useMotion()
      expect(motion.duration).toBeDefined()
      expect(motion.durationSlow).toBeDefined()
      expect(motion.easing).toBeDefined()
      expect(motion.prefersReducedMotion).toBeDefined()
    })
  })

  it('provides fallback values when no CSS vars are set', () => {
    scope.run(() => {
      const motion = useMotion()
      expect(motion.duration.value).toBe('200ms')
      expect(motion.durationSlow.value).toBe('500ms')
      expect(motion.easing.value).toBe('cubic-bezier(0.4, 0, 0.2, 1)')
    })
  })

  it('prefersReducedMotion defaults to false', () => {
    scope.run(() => {
      const motion = useMotion()
      expect(motion.prefersReducedMotion.value).toBe(false)
    })
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

    scope.run(() => {
      const motion = useMotion()
      expect(motion.prefersReducedMotion.value).toBe(true)
      expect(motion.duration.value).toBe('0ms')
      expect(motion.durationSlow.value).toBe('0ms')
    })
  })

  it('recomputes duration when MutationObserver fires after a theme attribute change', () => {
    let mutationCallback: MutationObserverCallback | null = null

    vi.stubGlobal(
      'MutationObserver',
      class {
        constructor(cb: MutationObserverCallback) {
          mutationCallback = cb
        }
        observe() {}
        disconnect() {}
      },
    )

    document.documentElement.style.setProperty('--duration-normal', '350ms')

    scope.run(() => {
      const motion = useMotion()
      expect(motion.duration.value).toBe('350ms')

      // Simulate a theme attribute change causing MutationObserver to fire
      document.documentElement.style.setProperty('--duration-normal', '450ms')
      mutationCallback!([], {} as MutationObserver)

      // Computed should now read the updated CSS var
      expect(motion.duration.value).toBe('450ms')
    })

    vi.unstubAllGlobals()
    document.documentElement.style.removeProperty('--duration-normal')
  })
})
