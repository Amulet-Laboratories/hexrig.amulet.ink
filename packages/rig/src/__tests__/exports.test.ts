import { describe, it, expect } from 'vitest'

describe('rig barrel exports', () => {
  it('exports all 12 components', async () => {
    const mod = await import('@rig/index')
    const componentNames = [
      'RigThemeProvider',
      'RigText',
      'RigButton',
      'RigInput',
      'RigIcon',
      'RigSurface',
      'RigDivider',
      'RigBadge',
      'RigAlert',
      'RigCard',
      'RigDialog',
      'RigToast',
    ]
    for (const name of componentNames) {
      expect(mod).toHaveProperty(name)
    }
  })

  it('exports all 3 composables', async () => {
    const mod = await import('@rig/index')
    expect(mod).toHaveProperty('useTheme')
    expect(mod).toHaveProperty('useMotion')
    expect(mod).toHaveProperty('useToast')
  })
})
