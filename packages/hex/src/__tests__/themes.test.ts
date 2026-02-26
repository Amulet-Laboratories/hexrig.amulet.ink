import { describe, it, expect } from 'vitest'
import { themes, themeIds } from './fixtures/index'
import type { HexTheme, ThemeId } from '@hex/tokens/types'

describe('theme data integrity', () => {
  it.each(themeIds)('theme "%s" has required metadata', (id: ThemeId) => {
    const theme: HexTheme = themes[id]
    expect(theme.id).toBe(id)
    expect(theme.name).toBeTruthy()
    expect(theme.narrative).toBeTruthy()
  })

  it.each(themeIds)('theme "%s" has both dark and light modes', (id: ThemeId) => {
    const theme = themes[id]
    expect(theme.dark).toBeDefined()
    expect(theme.light).toBeDefined()
  })

  it.each(themeIds)('theme "%s" has font definitions', (id: ThemeId) => {
    const theme = themes[id]
    expect(theme.fonts.display).toBeDefined()
    expect(theme.fonts.display.family).toBeTruthy()
    expect(theme.fonts.body).toBeDefined()
    expect(theme.fonts.body.family).toBeTruthy()
    expect(theme.fonts.sans).toBeDefined()
    expect(theme.fonts.sans.family).toBeTruthy()
    expect(theme.fonts.mono).toBeDefined()
    expect(theme.fonts.mono.family).toBeTruthy()
  })

  it.each(themeIds)('theme "%s" has motion tokens', (id: ThemeId) => {
    const theme = themes[id]
    expect(theme.motion).toBeDefined()
    expect(theme.motion.duration.fast).toBeDefined()
    expect(theme.motion.duration.normal).toBeDefined()
    expect(theme.motion.duration.slow).toBeDefined()
    expect(theme.motion.easing.default).toBeDefined()
    expect(theme.motion.easing.entrance).toBeDefined()
    expect(theme.motion.easing.exit).toBeDefined()
  })

  it.each(themeIds)('theme "%s" dark mode has all surface tokens', (id: ThemeId) => {
    const surfaces = themes[id].dark.surfaces
    expect(surfaces.base).toBeTruthy()
    expect(surfaces.raised).toBeTruthy()
    expect(surfaces.elevated).toBeTruthy()
    expect(surfaces.sunken).toBeTruthy()
    expect(surfaces.overlay).toBeTruthy()
  })

  it.each(themeIds)('theme "%s" dark mode has all text tokens', (id: ThemeId) => {
    const text = themes[id].dark.text
    expect(text.primary).toBeTruthy()
    expect(text.secondary).toBeTruthy()
    expect(text.muted).toBeTruthy()
    expect(text.inverse).toBeTruthy()
    expect(text.link).toBeTruthy()
    expect(text.onAccent).toBeTruthy()
  })

  it.each(themeIds)('theme "%s" dark mode has all 9 syntax tokens', (id: ThemeId) => {
    const syntax = themes[id].dark.syntax
    expect(Object.keys(syntax).length).toBeGreaterThanOrEqual(9)
    expect(syntax.comment).toBeTruthy()
    expect(syntax.keyword).toBeTruthy()
    expect(syntax.string).toBeTruthy()
  })

  it.each(themeIds)('theme "%s" dark mode has all 16 terminal colors', (id: ThemeId) => {
    const terminal = themes[id].dark.terminal
    expect(Object.keys(terminal).length).toBe(16)
    expect(terminal.black).toBeTruthy()
    expect(terminal.red).toBeTruthy()
    expect(terminal.green).toBeTruthy()
    expect(terminal.blue).toBeTruthy()
    expect(terminal.brightWhite).toBeTruthy()
  })
})

describe('theme data integrity — light mode', () => {
  it.each(themeIds)('theme "%s" light mode has all surface tokens', (id: ThemeId) => {
    const surfaces = themes[id].light.surfaces
    expect(surfaces.base).toBeTruthy()
    expect(surfaces.raised).toBeTruthy()
    expect(surfaces.elevated).toBeTruthy()
    expect(surfaces.sunken).toBeTruthy()
    expect(surfaces.overlay).toBeTruthy()
  })

  it.each(themeIds)('theme "%s" light mode has all text tokens', (id: ThemeId) => {
    const text = themes[id].light.text
    expect(text.primary).toBeTruthy()
    expect(text.secondary).toBeTruthy()
    expect(text.muted).toBeTruthy()
    expect(text.inverse).toBeTruthy()
    expect(text.link).toBeTruthy()
    expect(text.onAccent).toBeTruthy()
  })

  it.each(themeIds)('theme "%s" light mode has all border tokens', (id: ThemeId) => {
    const borders = themes[id].light.borders
    expect(borders.default).toBeTruthy()
    expect(borders.subtle).toBeTruthy()
    expect(borders.strong).toBeTruthy()
  })

  it.each(themeIds)('theme "%s" light mode has all accent tokens', (id: ThemeId) => {
    const accents = themes[id].light.accents
    expect(accents.primary).toBeTruthy()
    expect(accents.secondary).toBeTruthy()
    expect(accents.hover).toBeTruthy()
    expect(accents.active).toBeTruthy()
    expect(accents.muted).toBeTruthy()
  })

  it.each(themeIds)('theme "%s" light mode has all status tokens', (id: ThemeId) => {
    const status = themes[id].light.status
    expect(status.success).toBeTruthy()
    expect(status.warning).toBeTruthy()
    expect(status.error).toBeTruthy()
    expect(status.info).toBeTruthy()
  })

  it.each(themeIds)('theme "%s" light mode has all 9 syntax tokens', (id: ThemeId) => {
    const syntax = themes[id].light.syntax
    expect(Object.keys(syntax).length).toBeGreaterThanOrEqual(9)
    expect(syntax.comment).toBeTruthy()
    expect(syntax.keyword).toBeTruthy()
    expect(syntax.string).toBeTruthy()
    expect(syntax.function).toBeTruthy()
    expect(syntax.type).toBeTruthy()
  })

  it.each(themeIds)('theme "%s" light mode has all 16 terminal colors', (id: ThemeId) => {
    const terminal = themes[id].light.terminal
    expect(Object.keys(terminal).length).toBe(16)
    expect(terminal.black).toBeTruthy()
    expect(terminal.white).toBeTruthy()
    expect(terminal.brightBlack).toBeTruthy()
    expect(terminal.brightWhite).toBeTruthy()
  })
})

describe('hex color casing consistency', () => {
  it.each(themeIds)('theme "%s" uses lowercase hex colors', (id: ThemeId) => {
    const theme = themes[id]
    const json = JSON.stringify(theme)
    const hexValues = json.match(/#[0-9a-fA-F]{3,8}/g) ?? []
    for (const hex of hexValues) {
      expect(hex).toBe(hex.toLowerCase())
    }
  })
})
