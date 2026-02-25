import { describe, it, expect } from 'vitest'
import {
  themes,
  themeIds,
  hearth,
  abyss,
  hollow,
  keep,
  cove,
  HEX_THEME_ATTR,
  HEX_MODE_ATTR,
  SURFACE_KEYS,
  TEXT_KEYS,
  BORDER_KEYS,
  ACCENT_KEYS,
  STATUS_KEYS,
  FOCUS_KEYS,
  SYNTAX_TOKEN_KEYS,
  TERMINAL_KEYS,
} from '@hex/index'

describe('hex exports', () => {
  it('exports all five theme objects', () => {
    expect(hearth).toBeDefined()
    expect(abyss).toBeDefined()
    expect(hollow).toBeDefined()
    expect(keep).toBeDefined()
    expect(cove).toBeDefined()
  })

  it('exports themes registry with all theme ids', () => {
    expect(themes).toBeDefined()
    expect(themeIds).toEqual(expect.arrayContaining(['hearth', 'abyss', 'hollow', 'keep', 'cove']))
    expect(themeIds).toHaveLength(5)
  })

  it('exports correct constants', () => {
    expect(HEX_THEME_ATTR).toBe('data-theme')
    expect(HEX_MODE_ATTR).toBe('data-mode')
  })

  it('exports token key arrays', () => {
    expect(SURFACE_KEYS).toBeInstanceOf(Array)
    expect(SURFACE_KEYS).toHaveLength(5)
    expect(SURFACE_KEYS).toContain('base')
    expect(SURFACE_KEYS).toContain('elevated')

    expect(TEXT_KEYS).toBeInstanceOf(Array)
    expect(TEXT_KEYS).toHaveLength(6)
    expect(TEXT_KEYS).toContain('primary')
    expect(TEXT_KEYS).toContain('onAccent')

    expect(BORDER_KEYS).toHaveLength(3)
    expect(ACCENT_KEYS).toHaveLength(5)
    expect(STATUS_KEYS).toHaveLength(4)
    expect(FOCUS_KEYS).toHaveLength(2)
    expect(FOCUS_KEYS).toContain('ring')
    expect(FOCUS_KEYS).toContain('outline')

    expect(TERMINAL_KEYS).toHaveLength(16)
  })

  it('exports syntax token keys array', () => {
    expect(SYNTAX_TOKEN_KEYS).toBeInstanceOf(Array)
    expect(SYNTAX_TOKEN_KEYS).toHaveLength(9)
    expect(SYNTAX_TOKEN_KEYS).toContain('comment')
    expect(SYNTAX_TOKEN_KEYS).toContain('keyword')
  })
})
