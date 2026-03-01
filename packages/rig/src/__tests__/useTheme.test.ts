import { describe, it, expect, beforeEach, vi } from 'vitest'
import { effectScope } from 'vue'
import { useTheme } from '@rig/composables/useTheme'

describe('useTheme', () => {
  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    // Reset media query match for each test
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string) => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }),
    })
  })

  it('returns theme, mode, setTheme, setMode, toggleMode, resetToAuto', () => {
    const scope = effectScope()
    scope.run(() => {
      const api = useTheme()
      expect(api.theme).toBeDefined()
      expect(api.mode).toBeDefined()
      expect(typeof api.setTheme).toBe('function')
      expect(typeof api.setMode).toBe('function')
      expect(typeof api.toggleMode).toBe('function')
      expect(typeof api.resetToAuto).toBe('function')
    })
    scope.stop()
  })

  it('defaults to command theme', () => {
    const scope = effectScope()
    scope.run(() => {
      const api = useTheme()
      expect(api.theme.value).toBe('command')
    })
    scope.stop()
  })

  it('defaults to night mode when prefers-color-scheme: dark', () => {
    const scope = effectScope()
    scope.run(() => {
      const api = useTheme()
      expect(api.mode.value).toBe('night')
    })
    scope.stop()
  })

  it('accepts explicit default theme', () => {
    const scope = effectScope()
    scope.run(() => {
      const api = useTheme({ theme: 'ledger' })
      expect(api.theme.value).toBe('ledger')
    })
    scope.stop()
  })

  it('accepts explicit default mode', () => {
    const scope = effectScope()
    scope.run(() => {
      const api = useTheme({ mode: 'day' })
      expect(api.mode.value).toBe('day')
    })
    scope.stop()
  })

  it('setTheme updates theme ref', () => {
    const scope = effectScope()
    scope.run(() => {
      const api = useTheme()
      api.setTheme('stage')
      expect(api.theme.value).toBe('stage')
    })
    scope.stop()
  })

  it('setMode updates mode ref', () => {
    const scope = effectScope()
    scope.run(() => {
      const api = useTheme()
      api.setMode('day')
      expect(api.mode.value).toBe('day')
    })
    scope.stop()
  })

  it('toggleMode toggles between night and day', () => {
    const scope = effectScope()
    scope.run(() => {
      const api = useTheme({ mode: 'night' })
      api.toggleMode()
      expect(api.mode.value).toBe('day')
      api.toggleMode()
      expect(api.mode.value).toBe('night')
    })
    scope.stop()
  })

  it('auto mode resolves to system preference', () => {
    const scope = effectScope()
    scope.run(() => {
      const api = useTheme({ mode: 'auto' })
      // jsdom matchMedia returns dark=true from our mock → night
      expect(api.mode.value).toBe('night')
    })
    scope.stop()
  })

  it('resetToAuto re-reads system preference and clears explicit lock', () => {
    const scope = effectScope()
    scope.run(() => {
      const api = useTheme()
      // Explicitly set day mode (locks userExplicitMode)
      api.setMode('day')
      expect(api.mode.value).toBe('day')

      // resetToAuto should restore to system preference (night per mock)
      api.resetToAuto()
      expect(api.mode.value).toBe('night')
    })
    scope.stop()
  })

  it('resetToAuto allows subsequent OS preference changes to apply', () => {
    const scope = effectScope()
    let mqHandler: ((e: Partial<MediaQueryListEvent>) => void) | null = null

    // Override matchMedia to capture the event listener
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string) => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addEventListener: (_: string, handler: (e: Partial<MediaQueryListEvent>) => void) => {
          if (query === '(prefers-color-scheme: dark)') mqHandler = handler
        },
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }),
    })

    scope.run(() => {
      const api = useTheme()
      // Lock to day via explicit set
      api.setMode('day')
      // Simulate OS change — should be ignored while locked
      mqHandler?.({ matches: false })
      expect(api.mode.value).toBe('day')

      // Reset to auto — OS changes now apply again
      api.resetToAuto()
      mqHandler?.({ matches: false })
      expect(api.mode.value).toBe('day')

      mqHandler?.({ matches: true })
      expect(api.mode.value).toBe('night')
    })
    scope.stop()
  })
})
