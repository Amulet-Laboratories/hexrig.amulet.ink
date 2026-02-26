import { describe, it, expect } from 'vitest'

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
] as const

describe('rig component exports', () => {
  it.each(componentNames)('exports %s as a valid Vue component', async (name) => {
    const mod = await import(`@rig/components/${name}.vue`)
    expect(mod.default).toBeDefined()
    expect(typeof mod.default).toBe('object')
    expect(mod.default).toHaveProperty('__name')
  })
})
