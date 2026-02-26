import { describe, it, expect } from 'vitest'
import { generateThemeCSS } from '@hex/utils/css'
import { themes, themeIds } from './fixtures/index'
import type { ThemeId } from '@hex/tokens/types'

describe('generateThemeCSS', () => {
  it.each(themeIds)('generates CSS for theme "%s"', (id: ThemeId) => {
    const css = generateThemeCSS(themes[id])
    expect(typeof css).toBe('string')
    expect(css.length).toBeGreaterThan(0)
  })

  it('includes data attribute selectors', () => {
    const css = generateThemeCSS(themes.hearth)
    expect(css).toContain('data-theme="hearth"')
    expect(css).toContain('data-mode="dark"')
    expect(css).toContain('data-mode="light"')
  })

  it('includes unprefixed CSS custom properties', () => {
    const css = generateThemeCSS(themes.hearth)
    expect(css).toContain('--surface-base')
    expect(css).toContain('--text-primary')
    expect(css).toContain('--accent-primary')
    expect(css).toContain('--font-body')
    expect(css).toContain('--duration-normal')
    expect(css).toContain('--easing-default')
  })

  it('includes both dark and light mode blocks', () => {
    const css = generateThemeCSS(themes.hearth)
    const darkMatch = css.match(/data-mode="dark"/g)
    const lightMatch = css.match(/data-mode="light"/g)
    expect(darkMatch).toBeTruthy()
    expect(lightMatch).toBeTruthy()
  })

  it('includes syntax token CSS custom properties', () => {
    const css = generateThemeCSS(themes.hearth)
    expect(css).toContain('--syntax-comment')
    expect(css).toContain('--syntax-keyword')
    expect(css).toContain('--syntax-string')
    expect(css).toContain('--syntax-number')
    expect(css).toContain('--syntax-function')
    expect(css).toContain('--syntax-type')
    expect(css).toContain('--syntax-operator')
    expect(css).toContain('--syntax-punctuation')
    expect(css).toContain('--syntax-storage')
  })

  it('includes terminal CSS custom properties', () => {
    const css = generateThemeCSS(themes.hearth)
    expect(css).toContain('--terminal-black')
    expect(css).toContain('--terminal-red')
    expect(css).toContain('--terminal-green')
    expect(css).toContain('--terminal-blue')
    expect(css).toContain('--terminal-white')
    expect(css).toContain('--terminal-bright-black')
    expect(css).toContain('--terminal-bright-white')
  })

  it.each(themeIds)('theme "%s" light mode has all token groups in CSS', (id: ThemeId) => {
    const css = generateThemeCSS(themes[id])
    // Split at the light block
    const lightBlock = css.split(`data-mode="light"`)[1]
    expect(lightBlock).toBeTruthy()
    expect(lightBlock).toContain('--surface-')
    expect(lightBlock).toContain('--text-')
    expect(lightBlock).toContain('--border-')
    expect(lightBlock).toContain('--accent-')
    expect(lightBlock).toContain('--status-')
    expect(lightBlock).toContain('--focus-')
    expect(lightBlock).toContain('--syntax-')
    expect(lightBlock).toContain('--terminal-')
  })
})
