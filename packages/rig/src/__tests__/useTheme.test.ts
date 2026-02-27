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

  it('defaults to hearth theme', () => {
    const scope = effectScope()
    scope.run(() => {
      const api = useTheme()
      expect(api.theme.value).toBe('hearth')
    })
    scope.stop()
  })

  it('defaults to dark mode when prefers-color-scheme: dark', () => {
    const scope = effectScope()
    scope.run(() => {
      const api = useTheme()
      expect(api.mode.value).toBe('dark')
    })
    scope.stop()
  })

  it('accepts explicit default theme', () => {
    const scope = effectScope()
    scope.run(() => {
      const api = useTheme({ theme: 'abyss' })
      expect(api.theme.value).toBe('abyss')
    })
    scope.stop()
  })

  it('accepts explicit default mode', () => {
    const scope = effectScope()
    scope.run(() => {
      const api = useTheme({ mode: 'light' })
      expect(api.mode.value).toBe('light')
    })
    scope.stop()
  })

  it('setTheme updates theme ref', () => {
    const scope = effectScope()
    scope.run(() => {
      const api = useTheme()
      api.setTheme('cove')
      expect(api.theme.value).toBe('cove')
    })
    scope.stop()
  })

  it('setMode updates mode ref', () => {
    const scope = effectScope()
    scope.run(() => {
      const api = useTheme()
      api.setMode('light')
      expect(api.mode.value).toBe('light')
    })
    scope.stop()
  })

  it('toggleMode toggles between dark and light', () => {
    const scope = effectScope()
    scope.run(() => {
      const api = useTheme({ mode: 'dark' })
      api.toggleMode()
      expect(api.mode.value).toBe('light')
      api.toggleMode()
      expect(api.mode.value).toBe('dark')
    })
    scope.stop()
  })

  it('auto mode resolves to system preference', () => {
    const scope = effectScope()
    scope.run(() => {
      const api = useTheme({ mode: 'auto' })
      // jsdom matchMedia returns dark=true from our mock
      expect(api.mode.value).toBe('dark')
    })
    scope.stop()
  })

  it('resetToAuto re-reads system preference and clears explicit lock', () => {
    const scope = effectScope()
    scope.run(() => {
      const api = useTheme()
      // Explicitly set light mode (locks userExplicitMode)
      api.setMode('light')
      expect(api.mode.value).toBe('light')

      // resetToAuto should restore to system preference (dark per mock)
      api.resetToAuto()
      expect(api.mode.value).toBe('dark')
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
      // Lock to light via explicit set
      api.setMode('light')
      // Simulate OS change — should be ignored while locked
      mqHandler?.({ matches: false })
      expect(api.mode.value).toBe('light')

      // Reset to auto — OS changes now apply again
      api.resetToAuto()
      mqHandler?.({ matches: false })
      expect(api.mode.value).toBe('light')

      mqHandler?.({ matches: true })
      expect(api.mode.value).toBe('dark')
    })
    scope.stop()
  })
})
