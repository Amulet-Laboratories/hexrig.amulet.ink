import type { Meta, StoryObj } from '@storybook/vue3'
import RigThemeProvider from './RigThemeProvider.vue'
import RigText from './RigText.vue'
import RigButton from './RigButton.vue'
import RigSurface from './RigSurface.vue'

const meta = {
  title: 'Components/ThemeProvider',
  component: RigThemeProvider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Scoped theme wrapper that sets `data-theme` and `data-mode` attributes on a container element. Enables mixing themes within a single page — nest providers for split-theme layouts.',
      },
    },
  },
  argTypes: {
    theme: {
      control: 'select',
      options: ['command', 'ledger', 'journal', 'market', 'gallery', 'signal', 'stage', 'guide'],
    },
    mode: {
      control: 'select',
      options: ['night', 'day', 'auto'],
    },
  },
} satisfies Meta<typeof RigThemeProvider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { RigThemeProvider, RigText, RigButton, RigSurface },
    setup: () => ({ args }),
    template: `
      <RigThemeProvider v-bind="args">
        <RigSurface elevation="raised" padding="lg" border>
          <RigText variant="heading" class="mb-2">Theme Preview</RigText>
          <RigText color="secondary" class="mb-4">This content uses the {{ args.theme }} archetype in {{ args.mode }} mode.</RigText>
          <div class="flex gap-3">
            <RigButton>Primary Action</RigButton>
            <RigButton variant="outline">Secondary</RigButton>
            <RigButton variant="ghost">Ghost</RigButton>
          </div>
        </RigSurface>
      </RigThemeProvider>
    `,
  }),
  args: {
    theme: 'command',
    mode: 'night',
  },
}

export const SideBySide: Story = {
  name: 'All Archetypes',
  render: () => ({
    components: { RigThemeProvider, RigText, RigButton, RigSurface },
    template: `
      <div class="grid grid-cols-2 gap-4">
         <RigThemeProvider v-for="theme in ['command', 'ledger', 'journal', 'market', 'gallery', 'signal', 'stage', 'guide']" :key="theme" :theme="theme" mode="night">
          <RigSurface elevation="raised" padding="md" border>
            <RigText variant="overline" color="muted" class="mb-1">{{ theme }}</RigText>
            <RigText variant="heading" class="mb-3">Heading</RigText>
            <RigText color="secondary" class="mb-3">Body text renders in the archetype's palette.</RigText>
            <RigButton size="sm">Action</RigButton>
          </RigSurface>
        </RigThemeProvider>
      </div>
    `,
  }),
}

export const ModeToggle: Story = {
  name: 'Night vs Day',
  render: () => ({
    components: { RigThemeProvider, RigText, RigButton, RigSurface },
    template: `
      <div class="grid grid-cols-2 gap-4">
        <RigThemeProvider theme="command" mode="night">
          <RigSurface elevation="raised" padding="md" border>
            <RigText variant="overline" color="muted" class="mb-1">Night</RigText>
            <RigText variant="heading" class="mb-3">Command Night</RigText>
            <RigText color="secondary" class="mb-3">Dark background, light content.</RigText>
            <div class="flex gap-2">
              <RigButton size="sm">Action</RigButton>
              <RigButton size="sm" variant="outline">Outline</RigButton>
            </div>
          </RigSurface>
        </RigThemeProvider>
        <RigThemeProvider theme="command" mode="day">
          <RigSurface elevation="raised" padding="md" border>
            <RigText variant="overline" color="muted" class="mb-1">Day</RigText>
            <RigText variant="heading" class="mb-3">Command Day</RigText>
            <RigText color="secondary" class="mb-3">Light background, dark content.</RigText>
            <div class="flex gap-2">
              <RigButton size="sm">Action</RigButton>
              <RigButton size="sm" variant="outline">Outline</RigButton>
            </div>
          </RigSurface>
        </RigThemeProvider>
      </div>
    `,
  }),
}
