import { describe, it, expect } from 'vitest'
import { themes, themeIds } from '../themes/index'
import { validateTheme } from '@amulet-laboratories/hex'
import type { OriginsThemeId } from '../themes/index'

describe('hex-origins: all themes pass validation', () => {
  it.each(themeIds)('theme "%s" passes validateTheme', (id: OriginsThemeId) => {
    const result = validateTheme(themes[id])
    expect(result.valid).toBe(true)
    expect(result.errors).toHaveLength(0)
  })
})

describe('hex-origins: collection integrity', () => {
  it('exports 9 themes', () => {
    expect(themeIds).toHaveLength(9)
    expect(Object.keys(themes)).toHaveLength(9)
  })

  it('themeIds matches themes keys', () => {
    for (const id of themeIds) {
      expect(themes).toHaveProperty(id)
    }
  })

  it.each(themeIds)('theme "%s" id matches registry key', (id: OriginsThemeId) => {
    expect(themes[id].id).toBe(id)
  })

  it.each(themeIds)('theme "%s" has name and narrative', (id: OriginsThemeId) => {
    expect(themes[id].name).toBeTruthy()
    expect(themes[id].narrative).toBeTruthy()
  })

  it.each(themeIds)('theme "%s" has both dark and light modes', (id: OriginsThemeId) => {
    expect(themes[id].dark).toBeDefined()
    expect(themes[id].light).toBeDefined()
  })

  it.each(themeIds)('theme "%s" has 4 font slots', (id: OriginsThemeId) => {
    const { fonts } = themes[id]
    expect(fonts.display.family).toBeTruthy()
    expect(fonts.body.family).toBeTruthy()
    expect(fonts.sans.family).toBeTruthy()
    expect(fonts.mono.family).toBeTruthy()
  })
})
