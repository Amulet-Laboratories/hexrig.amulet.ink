import { describe, it, expect, beforeEach } from 'vitest'
import { useTheme } from '@rig/composables/useTheme'

describe('useTheme', () => {
  beforeEach(() => {
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

  it('returns theme, mode, setTheme, setMode, toggleMode', () => {
    const api = useTheme()
    expect(api.theme).toBeDefined()
    expect(api.mode).toBeDefined()
    expect(typeof api.setTheme).toBe('function')
    expect(typeof api.setMode).toBe('function')
    expect(typeof api.toggleMode).toBe('function')
  })

  it('defaults to hearth theme', () => {
    const api = useTheme()
    expect(api.theme.value).toBe('hearth')
  })

  it('defaults to dark mode when prefers-color-scheme: dark', () => {
    const api = useTheme()
    expect(api.mode.value).toBe('dark')
  })

  it('accepts explicit default theme', () => {
    const api = useTheme({ theme: 'abyss' })
    expect(api.theme.value).toBe('abyss')
  })

  it('accepts explicit default mode', () => {
    const api = useTheme({ mode: 'light' })
    expect(api.mode.value).toBe('light')
  })

  it('setTheme updates theme ref', () => {
    const api = useTheme()
    api.setTheme('cove')
    expect(api.theme.value).toBe('cove')
  })

  it('setMode updates mode ref', () => {
    const api = useTheme()
    api.setMode('light')
    expect(api.mode.value).toBe('light')
  })

  it('toggleMode toggles between dark and light', () => {
    const api = useTheme({ mode: 'dark' })
    api.toggleMode()
    expect(api.mode.value).toBe('light')
    api.toggleMode()
    expect(api.mode.value).toBe('dark')
  })

  it('auto mode resolves to system preference', () => {
    const api = useTheme({ mode: 'auto' })
    // jsdom matchMedia returns dark=true from our mock
    expect(api.mode.value).toBe('dark')
  })
})
