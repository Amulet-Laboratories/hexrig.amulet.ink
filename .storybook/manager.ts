import { addons } from '@storybook/manager-api'

addons.setConfig({
  sidebar: {
    showRoots: true,
    collapsedRoots: ['components'],
  },
  toolbar: {
    title: { hidden: false },
  },
})
