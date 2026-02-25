import { describe, it, expect } from 'vitest'

describe('rig barrel exports', () => {
  it('exports all 28 components', async () => {
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
      'RigContainer',
      'RigStack',
      'RigGrid',
      'RigSpacer',
      'RigSpinner',
      'RigSkeleton',
      'RigProgress',
      'RigTooltip',
      'RigTabs',
      'RigAccordion',
      'RigBreadcrumb',
      'RigAvatar',
      'RigSelect',
      'RigCheckbox',
      'RigSwitch',
      'RigTag',
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
