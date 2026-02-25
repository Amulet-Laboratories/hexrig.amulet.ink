import { describe, it, expect } from 'vitest'
import {
  HEX_THEME_ATTR,
  HEX_MODE_ATTR,
  SURFACE_KEYS,
  TEXT_KEYS,
  BORDER_KEYS,
  ACCENT_KEYS,
  STATUS_KEYS,
  FOCUS_KEYS,
  ELEVATION_KEYS,
  SPACING_KEYS,
  SHAPE_KEYS,
  SYNTAX_TOKEN_KEYS,
  TERMINAL_KEYS,
} from '@hex/index'

describe('hex exports', () => {
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

    expect(ELEVATION_KEYS).toHaveLength(3)
    expect(ELEVATION_KEYS).toContain('sm')
    expect(ELEVATION_KEYS).toContain('md')
    expect(ELEVATION_KEYS).toContain('lg')

    expect(SPACING_KEYS).toHaveLength(7)
    expect(SPACING_KEYS).toContain('xs')
    expect(SPACING_KEYS).toContain('3xl')

    expect(SHAPE_KEYS).toHaveLength(2)
    expect(SHAPE_KEYS).toContain('radius')
    expect(SHAPE_KEYS).toContain('radiusFull')

    expect(TERMINAL_KEYS).toHaveLength(16)
  })

  it('exports syntax token keys array', () => {
    expect(SYNTAX_TOKEN_KEYS).toBeInstanceOf(Array)
    expect(SYNTAX_TOKEN_KEYS).toHaveLength(9)
    expect(SYNTAX_TOKEN_KEYS).toContain('comment')
    expect(SYNTAX_TOKEN_KEYS).toContain('keyword')
  })
})
