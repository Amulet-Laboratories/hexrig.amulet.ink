import { describe, it, expect, beforeEach } from 'vitest'
import { applyTheme, toggleMode, getThemeState } from '../index'
import { hearth } from '../themes/index'

describe('Runtime helpers', () => {
  let el: HTMLElement

  beforeEach(() => {
    el = document.createElement('div')
  })

  describe('applyTheme', () => {
    it('sets data-theme and data-mode attributes', () => {
      applyTheme(el, hearth, 'dark')
      expect(el.getAttribute('data-theme')).toBe('hearth')
      expect(el.getAttribute('data-mode')).toBe('dark')
    })

    it('works with light mode', () => {
      applyTheme(el, hearth, 'light')
      expect(el.getAttribute('data-mode')).toBe('light')
    })
  })

  describe('toggleMode', () => {
    it('toggles from dark to light', () => {
      el.setAttribute('data-mode', 'dark')
      const result = toggleMode(el)
      expect(result).toBe('light')
      expect(el.getAttribute('data-mode')).toBe('light')
    })

    it('toggles from light to dark', () => {
      el.setAttribute('data-mode', 'light')
      const result = toggleMode(el)
      expect(result).toBe('dark')
      expect(el.getAttribute('data-mode')).toBe('dark')
    })

    it('defaults to dark when no mode is set', () => {
      const result = toggleMode(el)
      expect(result).toBe('dark')
    })

    it('defaults to dark when mode is invalid', () => {
      el.setAttribute('data-mode', 'invalid')
      const result = toggleMode(el)
      expect(result).toBe('dark')
    })
  })

  describe('getThemeState', () => {
    it('returns theme and mode from attributes', () => {
      el.setAttribute('data-theme', 'hearth')
      el.setAttribute('data-mode', 'dark')
      const state = getThemeState(el)
      expect(state.themeId).toBe('hearth')
      expect(state.mode).toBe('dark')
    })

    it('returns null for missing attributes', () => {
      const state = getThemeState(el)
      expect(state.themeId).toBeNull()
      expect(state.mode).toBeNull()
    })

    it('returns null mode for invalid mode value', () => {
      el.setAttribute('data-mode', 'invalid')
      const state = getThemeState(el)
      expect(state.mode).toBeNull()
    })
  })
})
