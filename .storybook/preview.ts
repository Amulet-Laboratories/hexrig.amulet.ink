import type { Preview, VueRenderer } from '@storybook/vue3'
import type { DecoratorFunction } from 'storybook/internal/types'
import { h, ref } from 'vue'
import { amuletTheme } from './amulet-theme'

// Import all Hex theme CSS — Environments
import '../packages/hex-origins/dist/themes/hearth.css'
import '../packages/hex-origins/dist/themes/abyss.css'
import '../packages/hex-origins/dist/themes/cove.css'
import '../packages/hex-origins/dist/themes/glyph.css'
import '../packages/hex-origins/dist/themes/ember.css'
// Materials
import '../packages/hex-origins/dist/themes/keep.css'
import '../packages/hex-origins/dist/themes/slate.css'
import '../packages/hex-origins/dist/themes/linen.css'
import '../packages/hex-origins/dist/themes/cairn.css'
import '../packages/hex-origins/dist/themes/grove.css'

// Import Rig base styles (Tailwind)
import '../packages/rig/src/style.css'

/**
 * Module-scope reactive refs for theme globals.
 *
 * Why this pattern?  Storybook 8's Vue 3 renderer (`renderToCanvas`) keeps the
 * Vue app mounted across globals changes — it re-invokes the decorator chain
 * (via `storyFn()`) but *discards* the returned VNode and only patches reactive
 * args.  By writing to these refs as a side-effect of the decorator call, the
 * already-mounted render function picks up the change through Vue reactivity.
 */
const activeTheme = ref('hearth')
const activeScheme = ref('dark')

const withTheme: DecoratorFunction<VueRenderer> = (storyFn, context) => {
  const story = storyFn()

  // ---- side-effect: runs on every decorator invocation (including globals changes) ----
  const theme = context.globals.theme || 'hearth'
  const scheme = context.globals.scheme || 'dark'

  activeTheme.value = theme
  activeScheme.value = scheme

  // Apply to <body> so CSS vars resolve for teleported elements (Dialog, Toast, …)
  document.body.setAttribute('data-theme', theme)
  document.body.setAttribute('data-mode', scheme)
  document.body.style.backgroundColor = 'var(--surface-base)'
  document.body.style.color = 'var(--text-secondary)'
  document.body.style.fontFamily = 'var(--font-body)'
  document.body.style.margin = '0'

  // ---- render function: uses reactive refs so Vue re-renders on changes ----
  return () =>
    h(
      'div',
      {
        'data-theme': activeTheme.value,
        'data-mode': activeScheme.value,
        style: {
          minHeight: '100vh',
          padding: '24px',
          backgroundColor: 'var(--surface-base)',
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-body)',
        },
      },
      [h(story)],
    )
}

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Hex theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'hearth', title: 'Hearth — Creation' },
          { value: 'abyss', title: 'Abyss — Nothingness' },
          { value: 'cove', title: 'Cove — Shelter' },
          { value: 'glyph', title: 'Glyph — Inscription' },
          { value: 'ember', title: 'Ember — Intensity' },
          { value: 'keep', title: 'Keep — Construction' },
          { value: 'slate', title: 'Slate — Nothing' },
          { value: 'linen', title: 'Linen — Precision' },
          { value: 'cairn', title: 'Cairn — Trust' },
          { value: 'grove', title: 'Grove — Approachability' },
        ],
        dynamicTitle: true,
      },
    },
    scheme: {
      description: 'Color scheme',
      toolbar: {
        title: 'Scheme',
        icon: 'mirror',
        items: [
          { value: 'dark', title: 'Dark' },
          { value: 'light', title: 'Light' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'hearth',
    scheme: 'dark',
  },
  decorators: [withTheme],
  parameters: {
    docs: {
      theme: amuletTheme,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: { disable: true },
    layout: 'fullscreen',
  },
}

export default preview
