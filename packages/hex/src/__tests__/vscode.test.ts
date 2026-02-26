import { describe, it, expect } from 'vitest'
import { generateVSCodeTheme } from '@hex/utils/vscode'
import { themes } from './fixtures/index'

describe('generateVSCodeTheme', () => {
  it('produces a valid VSCode theme object for dark scheme', () => {
    const result = generateVSCodeTheme(themes.hearth, 'dark')
    expect(result).toHaveProperty('$schema')
    expect(result).toHaveProperty('name')
    expect(result).toHaveProperty('type', 'dark')
    expect(result).toHaveProperty('colors')
    expect(result).toHaveProperty('tokenColors')
    expect(result).toHaveProperty('semanticHighlighting', true)
  })

  it('produces a valid VSCode theme object for light scheme', () => {
    const result = generateVSCodeTheme(themes.hearth, 'light')
    expect(result.type).toBe('light')
  })

  it('maps colors to VSCode editor keys', () => {
    const result = generateVSCodeTheme(themes.hearth, 'dark')
    expect(result.colors).toHaveProperty('editor.background')
    expect(result.colors).toHaveProperty('editor.foreground')
  })

  it('maps syntax tokens to tokenColors', () => {
    const result = generateVSCodeTheme(themes.hearth, 'dark')
    expect(Array.isArray(result.tokenColors)).toBe(true)
    expect(result.tokenColors.length).toBeGreaterThan(0)
    expect(result.tokenColors[0]).toHaveProperty('scope')
    expect(result.tokenColors[0]).toHaveProperty('settings')
  })
})
