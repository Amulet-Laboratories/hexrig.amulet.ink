import { describe, it, expect } from 'vitest'

describe('rig barrel exports', () => {
  it('exports all 56 components', async () => {
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
      'RigNoiseGrain',
      // Tier 1 — Tower baseline
      'RigStatus',
      'RigEmpty',
      'RigConfirm',
      'RigHeader',
      'RigPage',
      'RigPanel',
      'RigSidebar',
      'RigSidebarSection',
      'RigSidebarItem',
      'RigAppShell',
      'RigTable',
      // Tier 2 — Tower full experience
      'RigRadio',
      'RigStat',
      'RigMetadata',
      'RigList',
      'RigTimeline',
      'RigTree',
      'RigSplit',
      'RigFooter',
      // Tier 3 — Client engagement site components
      'RigNavbar',
      'RigHero',
      'RigCardGrid',
      'RigContactForm',
      'RigTestimonial',
      'RigHoursDisplay',
      'RigPricingTable',
      'RigGallery',
    ]
    for (const name of componentNames) {
      expect(mod).toHaveProperty(name)
    }
  })

  it('exports all 9 composables', async () => {
    const mod = await import('@rig/index')
    expect(mod).toHaveProperty('useTheme')
    expect(mod).toHaveProperty('useMotion')
    expect(mod).toHaveProperty('useToast')
    expect(mod).toHaveProperty('useKeyboard')
    expect(mod).toHaveProperty('useClipboard')
    expect(mod).toHaveProperty('useLocalStorage')
    expect(mod).toHaveProperty('useBreakpoint')
    expect(mod).toHaveProperty('useSort')
    expect(mod).toHaveProperty('useFilter')
  })
})
