import type { Preview, VueRenderer } from '@storybook/vue3'
import type { DecoratorFunction } from 'storybook/internal/types'
import { h } from 'vue'

// Import all Hex theme CSS
import '../packages/hex/dist/themes/hearth.css'
import '../packages/hex/dist/themes/abyss.css'
import '../packages/hex/dist/themes/hollow.css'
import '../packages/hex/dist/themes/keep.css'
import '../packages/hex/dist/themes/cove.css'

// Import Rig base styles (Tailwind)
import '../packages/rig/src/style.css'

/**
 * Decorator that applies Hex theme + scheme to both the document body
 * (ensures CSS vars resolve globally, including for teleported elements)
 * and a wrapper div (scopes the story visually).
 *
 * Reads context.globals lazily inside the render function so Vue re-renders
 * pick up toolbar changes even without a full decorator re-invocation.
 */
const withTheme: DecoratorFunction<VueRenderer> = (storyFn, context) => {
  const story = storyFn()

  return () => {
    const theme = context.globals.theme || 'hearth'
    const scheme = context.globals.scheme || 'dark'

    // Apply to document body so CSS vars resolve everywhere in the iframe,
    // including teleported/portal'd components (Dialog, Toast, etc.)
    document.body.setAttribute('data-theme', theme)
    document.body.setAttribute('data-mode', scheme)
    document.body.style.backgroundColor = 'var(--surface-base)'
    document.body.style.color = 'var(--text-secondary)'
    document.body.style.fontFamily = 'var(--font-body)'
    document.body.style.margin = '0'

    return h(
      'div',
      {
        'data-theme': theme,
        'data-mode': scheme,
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
          { value: 'hollow', title: 'Hollow — Growth' },
          { value: 'keep', title: 'Keep — Construction' },
          { value: 'cove', title: 'Cove — Shelter' },
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
