import type { Meta, StoryObj } from '@storybook/vue3'
import RigThemeProvider from './RigThemeProvider.vue'
import RigText from './RigText.vue'
import RigButton from './RigButton.vue'
import RigSurface from './RigSurface.vue'

const meta = {
  title: 'Components/ThemeProvider',
  component: RigThemeProvider,
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['hearth', 'abyss', 'hollow', 'keep', 'cove'],
    },
    mode: {
      control: 'select',
      options: ['dark', 'light', 'auto'],
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
          <RigText color="secondary" class="mb-4">This content uses the {{ args.theme }} theme in {{ args.mode }} mode.</RigText>
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
    theme: 'hearth',
    mode: 'dark',
  },
}

export const SideBySide: Story = {
  name: 'Side by Side Comparison',
  render: () => ({
    components: { RigThemeProvider, RigText, RigButton, RigSurface },
    template: `
      <div class="grid grid-cols-2 gap-4">
        <RigThemeProvider v-for="theme in ['hearth', 'abyss', 'hollow', 'keep', 'cove']" :key="theme" :theme="theme" mode="dark">
          <RigSurface elevation="raised" padding="md" border>
            <RigText variant="overline" color="muted" class="mb-1">{{ theme }}</RigText>
            <RigText variant="heading" class="mb-3">Heading</RigText>
            <RigText color="secondary" class="mb-3">Body text renders in the theme's palette.</RigText>
            <RigButton size="sm">Action</RigButton>
          </RigSurface>
        </RigThemeProvider>
      </div>
    `,
  }),
}

export const ModeToggle: Story = {
  name: 'Dark vs Light',
  render: () => ({
    components: { RigThemeProvider, RigText, RigButton, RigSurface },
    template: `
      <div class="grid grid-cols-2 gap-4">
        <RigThemeProvider theme="hearth" mode="dark">
          <RigSurface elevation="raised" padding="md" border>
            <RigText variant="overline" color="muted" class="mb-1">Dark</RigText>
            <RigText variant="heading" class="mb-3">Hearth Dark</RigText>
            <RigText color="secondary" class="mb-3">The hearth at night.</RigText>
            <div class="flex gap-2">
              <RigButton size="sm">Action</RigButton>
              <RigButton size="sm" variant="outline">Outline</RigButton>
            </div>
          </RigSurface>
        </RigThemeProvider>
        <RigThemeProvider theme="hearth" mode="light">
          <RigSurface elevation="raised" padding="md" border>
            <RigText variant="overline" color="muted" class="mb-1">Light</RigText>
            <RigText variant="heading" class="mb-3">Hearth Light</RigText>
            <RigText color="secondary" class="mb-3">The hearth in daylight.</RigText>
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
