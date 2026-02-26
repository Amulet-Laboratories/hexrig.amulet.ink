import { describe, it, expect } from 'vitest'
import { validateTheme } from '@hex/utils/validate'
import { themes, themeIds } from './fixtures/index'
import type { HexTheme, ThemeId } from '@hex/tokens/types'

describe('validateTheme', () => {
  it.each(themeIds)('theme "%s" passes validation', (id: ThemeId) => {
    const result = validateTheme(themes[id])
    expect(result.valid).toBe(true)
    expect(result.errors).toHaveLength(0)
  })

  it('returns validation result shape', () => {
    const result = validateTheme(themes.hearth)
    expect(result).toHaveProperty('valid')
    expect(result).toHaveProperty('errors')
    expect(result).toHaveProperty('warnings')
    expect(Array.isArray(result.errors)).toBe(true)
    expect(Array.isArray(result.warnings)).toBe(true)
  })
})

describe('validateTheme — negative cases', () => {
  function cloneTheme(id: ThemeId): HexTheme {
    return JSON.parse(JSON.stringify(themes[id]))
  }

  it('detects missing surface token', () => {
    const broken = cloneTheme('hearth')
    // @ts-expect-error — intentionally breaking structure
    delete broken.dark.surfaces.base
    const result = validateTheme(broken)
    expect(result.valid).toBe(false)
    expect(
      result.errors.some((e) => e.category === 'missing' && e.token.includes('surfaces.base')),
    ).toBe(true)
  })

  it('detects missing text token', () => {
    const broken = cloneTheme('hearth')
    // @ts-expect-error — intentionally breaking structure
    delete broken.light.text.primary
    const result = validateTheme(broken)
    expect(result.valid).toBe(false)
    expect(
      result.errors.some((e) => e.category === 'missing' && e.token.includes('text.primary')),
    ).toBe(true)
  })

  it('detects invalid color format', () => {
    const broken = cloneTheme('hearth')
    broken.dark.surfaces.base = 'not-a-color'
    const result = validateTheme(broken)
    expect(result.valid).toBe(false)
    expect(result.errors.some((e) => e.category === 'format')).toBe(true)
  })

  it('detects missing syntax token', () => {
    const broken = cloneTheme('hearth')
    // @ts-expect-error — intentionally breaking structure
    delete broken.dark.syntax.comment
    const result = validateTheme(broken)
    expect(result.valid).toBe(false)
    expect(result.errors.some((e) => e.token.includes('syntax.comment'))).toBe(true)
  })

  it('detects missing terminal token', () => {
    const broken = cloneTheme('hearth')
    // @ts-expect-error — intentionally breaking structure
    delete broken.dark.terminal.red
    const result = validateTheme(broken)
    expect(result.valid).toBe(false)
    expect(result.errors.some((e) => e.token.includes('terminal.red'))).toBe(true)
  })

  it('validates formats for syntax and terminal groups', () => {
    const broken = cloneTheme('hearth')
    broken.dark.syntax.keyword = 'invalid'
    broken.dark.terminal.green = 'also-invalid'
    const result = validateTheme(broken)
    expect(result.valid).toBe(false)
    expect(result.errors.filter((e) => e.category === 'format').length).toBeGreaterThanOrEqual(2)
  })
})
