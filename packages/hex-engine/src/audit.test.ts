/**
 * 192 Combination Contrast Audit
 *
 * 8 archetypes × 2 modes × 3 weights × 4 attitudes = 192 combinations.
 * Every combination must pass WCAG AA for text on surface (4.5:1).
 * UI elements (primary, accent) must pass WCAG AA large (3.0:1).
 */

import { describe, it, expect } from 'vitest'
import { generate } from './engine'
import { checkContrast } from './contrast'
import type { ArchetypeKey, Mode, WeightKey, AttitudeKey } from './types'

const ARCHETYPES: ArchetypeKey[] = [
  'command', 'ledger', 'journal', 'market',
  'gallery', 'signal', 'stage', 'guide',
]
const MODES: Mode[] = ['day', 'night']
const WEIGHTS: WeightKey[] = ['light', 'standard', 'heavy']
const ATTITUDES: AttitudeKey[] = ['kinetic', 'tranquil', 'intimate', 'luminous']

describe('contrast audit — 192 combinations', () => {
  for (const archetype of ARCHETYPES) {
    for (const mode of MODES) {
      for (const weight of WEIGHTS) {
        for (const attitude of ATTITUDES) {
          const label = `${archetype}/${mode}/${weight}/${attitude}`

          it(`${label} — text on surface WCAG AA (4.5:1)`, () => {
            const tokens = generate({ archetype, mode, weight, attitude })
            const result = checkContrast(tokens.text, tokens.surface)
            expect(
              result.ratio,
              `text on surface contrast ${result.ratio.toFixed(2)}:1 < 4.5:1`,
            ).toBeGreaterThanOrEqual(4.5)
          })

          it(`${label} — text on surfaceAlt WCAG AA (4.5:1)`, () => {
            const tokens = generate({ archetype, mode, weight, attitude })
            const result = checkContrast(tokens.text, tokens.surfaceAlt)
            expect(
              result.ratio,
              `text on surfaceAlt contrast ${result.ratio.toFixed(2)}:1 < 4.5:1`,
            ).toBeGreaterThanOrEqual(4.5)
          })

          it(`${label} — primary on surface WCAG AA large (3.0:1)`, () => {
            const tokens = generate({ archetype, mode, weight, attitude })
            const result = checkContrast(tokens.primary, tokens.surface)
            expect(
              result.ratio,
              `primary on surface contrast ${result.ratio.toFixed(2)}:1 < 3.0:1`,
            ).toBeGreaterThanOrEqual(3.0)
          })
        }
      }
    }
  }
})

describe('generate() — smoke tests', () => {
  it('returns metadata matching input config', () => {
    const tokens = generate({ archetype: 'command', mode: 'night', weight: 'heavy', attitude: 'kinetic' })
    expect(tokens.archetype).toBe('command')
    expect(tokens.mode).toBe('night')
    expect(tokens.weight).toBe('heavy')
    expect(tokens.attitude).toBe('kinetic')
  })

  it('returns full TokenSet with all expected keys', () => {
    const tokens = generate({ archetype: 'ledger', mode: 'day' })
    // Color
    expect(tokens.surface).toBeDefined()
    expect(tokens.primary).toBeDefined()
    expect(tokens.accent).toBeDefined()
    expect(tokens.text).toBeDefined()
    expect(tokens.success).toBeDefined()
    // Shadow
    expect(tokens.shadowSm).toBeDefined()
    expect(tokens.shadowXl).toBeDefined()
    // Typography
    expect(tokens.fontDisplay).toBeDefined()
    expect(tokens.textBase).toBe('1rem')
    expect(tokens.leadingNormal).toBeDefined()
    // Spacing
    expect(tokens.space4).toBeDefined()
    expect(tokens.space16).toBeDefined()
    // Radius
    expect(tokens.radiusMd).toBeDefined()
    expect(tokens.radiusFull).toBe('9999px')
    // Motion
    expect(tokens.durationNormal).toBeDefined()
    expect(tokens.easingDefault).toBeDefined()
  })

  it('resolves old archetype aliases', () => {
    const via_alias = generate({ archetype: 'reef' as ArchetypeKey })
    const direct = generate({ archetype: 'command' })
    expect(via_alias.archetype).toBe('command')
    expect(via_alias.surface).toBe(direct.surface)
  })

  it('throws for unknown archetype', () => {
    expect(() => generate({ archetype: 'unknown' as ArchetypeKey })).toThrow()
  })

  it('accepts custom archetype object', () => {
    const tokens = generate({
      archetype: {
        key: 'greyline',
        name: 'Greyline',
        baseHue: 220,
        accentHue: 45,
        chroma: 0.04,
        typography: 'ledger',
      },
      mode: 'night',
    })
    expect(tokens.archetype).toBe('greyline')
    expect(tokens.fontDisplay).toContain('Serif')
  })
})
