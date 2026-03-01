import { describe, it, expect } from 'vitest'
import { parseOklch, checkContrast, oklchContrastRatio, relativeLuminance } from './contrast'

describe('parseOklch', () => {
  it('parses basic oklch string', () => {
    const result = parseOklch('oklch(0.72 0.18 145)')
    expect(result).toEqual([0.72, 0.18, 145])
  })

  it('parses oklch with alpha', () => {
    const result = parseOklch('oklch(0.04 0.025 195 / 0.5)')
    expect(result).not.toBeNull()
    expect(result![0]).toBe(0.04)
  })

  it('returns null for invalid strings', () => {
    expect(parseOklch('rgb(255, 0, 0)')).toBeNull()
    expect(parseOklch('#ff0000')).toBeNull()
    expect(parseOklch('')).toBeNull()
  })
})

describe('relativeLuminance', () => {
  it('white has luminance 1', () => {
    expect(relativeLuminance(255, 255, 255)).toBeCloseTo(1, 3)
  })

  it('black has luminance 0', () => {
    expect(relativeLuminance(0, 0, 0)).toBeCloseTo(0, 3)
  })

  it('luminance is in [0, 1]', () => {
    const l = relativeLuminance(128, 64, 200)
    expect(l).toBeGreaterThanOrEqual(0)
    expect(l).toBeLessThanOrEqual(1)
  })
})

describe('checkContrast', () => {
  it('black on white has maximum contrast (~21)', () => {
    // oklch(0 0 0) ≈ black, oklch(1 0 0) ≈ white
    const result = checkContrast('oklch(0.0000 0.0000 0.00)', 'oklch(1.0000 0.0000 0.00)')
    expect(result.ratio).toBeGreaterThan(20)
    expect(result.aaa).toBe(true)
    expect(result.aa).toBe(true)
  })

  it('similar colors fail AA', () => {
    // Two very similar dark colors
    const result = checkContrast('oklch(0.15 0.01 195)', 'oklch(0.13 0.01 195)')
    expect(result.aa).toBe(false)
    expect(result.aaLarge).toBe(false)
  })

  it('returns ContrastResult with all flags', () => {
    const result = checkContrast('oklch(0.92 0.01 195)', 'oklch(0.09 0.01 195)')
    expect(result).toHaveProperty('ratio')
    expect(result).toHaveProperty('aa')
    expect(result).toHaveProperty('aaLarge')
    expect(result).toHaveProperty('aaa')
    expect(typeof result.ratio).toBe('number')
  })
})

describe('oklchContrastRatio', () => {
  it('returns null for non-oklch strings', () => {
    expect(oklchContrastRatio('#fff', '#000')).toBeNull()
  })

  it('returns ratio ≥ 1', () => {
    const ratio = oklchContrastRatio('oklch(0.92 0.01 195)', 'oklch(0.09 0.01 195)')
    expect(ratio).toBeGreaterThanOrEqual(1)
  })
})
