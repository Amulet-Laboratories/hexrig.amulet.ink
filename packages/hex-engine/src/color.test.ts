import { describe, it, expect } from 'vitest'
import { oklchToSrgb255, formatOklch } from './color'
import { generateColors } from './color'
import { ARCHETYPES } from './archetypes'
import { WEIGHTS, ATTITUDES } from './modifiers'

describe('oklchToSrgb255', () => {
  it('converts pure white (L=1, C=0) to [255, 255, 255]', () => {
    const [r, g, b] = oklchToSrgb255(1, 0, 0)
    expect(r).toBeCloseTo(255, 0)
    expect(g).toBeCloseTo(255, 0)
    expect(b).toBeCloseTo(255, 0)
  })

  it('converts pure black (L=0, C=0) to [0, 0, 0]', () => {
    const [r, g, b] = oklchToSrgb255(0, 0, 0)
    expect(r).toBe(0)
    expect(g).toBe(0)
    expect(b).toBe(0)
  })

  it('clamps out-of-gamut colors to [0, 255]', () => {
    // Very high chroma may go out of sRGB gamut
    const [r, g, b] = oklchToSrgb255(0.5, 0.4, 150)
    expect(r).toBeGreaterThanOrEqual(0)
    expect(r).toBeLessThanOrEqual(255)
    expect(g).toBeGreaterThanOrEqual(0)
    expect(g).toBeLessThanOrEqual(255)
    expect(b).toBeGreaterThanOrEqual(0)
    expect(b).toBeLessThanOrEqual(255)
  })
})

describe('formatOklch', () => {
  it('formats without alpha', () => {
    const result = formatOklch(0.72, 0.18, 145)
    expect(result).toBe('oklch(0.7200 0.1800 145.00)')
  })

  it('formats with alpha', () => {
    const result = formatOklch(0.04, 0.025, 195, 0.5)
    expect(result).toContain('/ 0.500')
  })

  it('omits alpha when alpha is 1', () => {
    const result = formatOklch(0.5, 0.1, 200, 1.0)
    expect(result).not.toContain('/')
  })
})

describe('generateColors', () => {
  const archetype = ARCHETYPES.command
  const weight = WEIGHTS.standard
  const attitude = ATTITUDES.kinetic

  it('returns all 15 color tokens', () => {
    const tokens = generateColors(archetype, weight, attitude, 'night')
    expect(tokens).toHaveProperty('surface')
    expect(tokens).toHaveProperty('surfaceAlt')
    expect(tokens).toHaveProperty('primary')
    expect(tokens).toHaveProperty('primaryHover')
    expect(tokens).toHaveProperty('secondary')
    expect(tokens).toHaveProperty('accent')
    expect(tokens).toHaveProperty('accentHover')
    expect(tokens).toHaveProperty('text')
    expect(tokens).toHaveProperty('textMuted')
    expect(tokens).toHaveProperty('muted')
    expect(tokens).toHaveProperty('border')
    expect(tokens).toHaveProperty('success')
    expect(tokens).toHaveProperty('warning')
    expect(tokens).toHaveProperty('error')
    expect(tokens).toHaveProperty('info')
  })

  it('all tokens are valid oklch() CSS strings', () => {
    const tokens = generateColors(archetype, weight, attitude, 'night')
    for (const [key, value] of Object.entries(tokens)) {
      expect(value, `${key} should be oklch() string`).toMatch(/^oklch\(/)
    }
  })

  it('night surface is darker than day surface', () => {
    const night = generateColors(archetype, weight, attitude, 'night')
    const day = generateColors(archetype, weight, attitude, 'day')

    // Extract L value from surface string
    const nightL = parseFloat(night.surface.match(/oklch\(([\d.]+)/)![1])
    const dayL = parseFloat(day.surface.match(/oklch\(([\d.]+)/)![1])

    expect(nightL).toBeLessThan(dayL)
  })

  it('night text is lighter than day text', () => {
    const night = generateColors(archetype, weight, attitude, 'night')
    const day = generateColors(archetype, weight, attitude, 'day')

    const nightL = parseFloat(night.text.match(/oklch\(([\d.]+)/)![1])
    const dayL = parseFloat(day.text.match(/oklch\(([\d.]+)/)![1])

    expect(nightL).toBeGreaterThan(dayL)
  })

  it('gallery produces achromatic tokens (C≈0)', () => {
    const gallery = ARCHETYPES.gallery
    const tokens = generateColors(gallery, weight, attitude, 'night')

    // Surface and text should have near-zero chroma
    const surfC = parseFloat(tokens.surface.match(/oklch\([\d.]+\s+([\d.]+)/)![1])
    expect(surfC).toBeLessThan(0.01)
  })

  it('heavy weight produces higher chroma than light weight', () => {
    const heavy = generateColors(archetype, WEIGHTS.heavy, attitude, 'night')
    const light = generateColors(archetype, WEIGHTS.light, attitude, 'night')

    const heavyC = parseFloat(heavy.primary.match(/oklch\([\d.]+\s+([\d.]+)/)![1])
    const lightC = parseFloat(light.primary.match(/oklch\([\d.]+\s+([\d.]+)/)![1])

    expect(heavyC).toBeGreaterThan(lightC)
  })
})
