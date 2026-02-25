import { describe, it, expect } from 'vitest'
import { amuletPreset } from '@hex/tailwind/index'

describe('amuletPreset', () => {
  it('is a valid Tailwind config object', () => {
    expect(amuletPreset).toBeDefined()
    expect(amuletPreset).toHaveProperty('content')
    expect(amuletPreset).toHaveProperty('theme')
  })

  it('defines surface color tokens', () => {
    const colors = amuletPreset.theme?.extend?.colors as Record<string, Record<string, string>>
    expect(colors.surface).toBeDefined()
    expect(colors.surface.base).toContain('--surface-base')
    expect(colors.surface.raised).toContain('--surface-raised')
    expect(colors.surface.overlay).toContain('--surface-overlay')
  })

  it('defines text color tokens', () => {
    const colors = amuletPreset.theme?.extend?.colors as Record<string, Record<string, string>>
    expect(colors.text).toBeDefined()
    expect(colors.text.primary).toContain('--text-primary')
    expect(colors.text.muted).toContain('--text-muted')
  })

  it('defines status color tokens', () => {
    const colors = amuletPreset.theme?.extend?.colors as Record<string, Record<string, string>>
    expect(colors.status).toBeDefined()
    expect(colors.status.success).toContain('--status-success')
    expect(colors.status.error).toContain('--status-error')
    expect(colors.status.warning).toContain('--status-warning')
    expect(colors.status.info).toContain('--status-info')
  })

  it('defines font families', () => {
    const fonts = amuletPreset.theme?.extend?.fontFamily as Record<string, string[]>
    expect(fonts).toBeDefined()
    expect(fonts.display).toBeDefined()
    expect(fonts.body).toBeDefined()
    expect(fonts.mono).toBeDefined()
  })

  it('defines transition durations from CSS vars', () => {
    const durations = amuletPreset.theme?.extend?.transitionDuration as Record<string, string>
    expect(durations).toBeDefined()
    expect(durations.fast).toContain('--duration-fast')
    expect(durations.normal).toContain('--duration-normal')
    expect(durations.slow).toContain('--duration-slow')
  })

  it('defines border radius tokens', () => {
    const radii = amuletPreset.theme?.extend?.borderRadius as Record<string, string>
    expect(radii).toBeDefined()
    expect(radii.DEFAULT).toContain('--radius')
    expect(radii.full).toContain('--radius-full')
  })

  it('defines spacing tokens', () => {
    const spacing = amuletPreset.theme?.extend?.spacing as Record<string, string>
    expect(spacing).toBeDefined()
    expect(spacing['hex-xs']).toContain('--spacing-xs')
    expect(spacing['hex-3xl']).toContain('--spacing-3xl')
  })

  it('defines box shadow tokens', () => {
    const shadows = amuletPreset.theme?.extend?.boxShadow as Record<string, string>
    expect(shadows).toBeDefined()
    expect(shadows.sm).toContain('--shadow-sm')
    expect(shadows.md).toContain('--shadow-md')
    expect(shadows.lg).toContain('--shadow-lg')
  })

  it('defines expressive easing', () => {
    const easing = amuletPreset.theme?.extend?.transitionTimingFunction as Record<string, string>
    expect(easing).toBeDefined()
    expect(easing.expressive).toContain('--easing-expressive')
  })

  it('has empty content array (consumers define their own)', () => {
    expect(amuletPreset.content).toEqual([])
  })
})
