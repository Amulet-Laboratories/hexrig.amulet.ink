import { addons } from '@storybook/manager-api'
import { amuletTheme } from './amulet-theme'

addons.setConfig({
  theme: amuletTheme,
  sidebar: {
    showRoots: true,
    collapsedRoots: ['components'],
    renderLabel: (item) => item.name,
  },
  toolbar: {
    title: { hidden: false },
  },
})
