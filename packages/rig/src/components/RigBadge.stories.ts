import type { Meta, StoryObj } from '@storybook/vue3'
import RigBadge from './RigBadge.vue'

const meta = {
  title: 'Components/Badge',
  component: RigBadge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Small status descriptor. Three visual variants (solid, soft, outline), six semantic tones, optional dot indicator, and removable mode.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'soft', 'outline'],
    },
    tone: {
      control: 'select',
      options: ['accent', 'success', 'warning', 'error', 'info', 'neutral'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    dot: { control: 'boolean' },
    removable: { control: 'boolean' },
  },
} satisfies Meta<typeof RigBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { RigBadge },
    setup: () => ({ args }),
    template: '<RigBadge v-bind="args">Badge</RigBadge>',
  }),
  args: {
    variant: 'soft',
    tone: 'accent',
    size: 'md',
  },
}

export const Variants: Story = {
  render: () => ({
    components: { RigBadge },
    template: `
      <div class="flex items-center gap-3">
        <RigBadge variant="solid">Solid</RigBadge>
        <RigBadge variant="soft">Soft</RigBadge>
        <RigBadge variant="outline">Outline</RigBadge>
      </div>
    `,
  }),
}

export const Tones: Story = {
  render: () => ({
    components: { RigBadge },
    template: `
      <div class="space-y-4">
        <div v-for="variant in ['solid', 'soft', 'outline']" :key="variant">
          <p class="text-text-muted text-sm font-mono mb-2 uppercase tracking-widest">{{ variant }}</p>
          <div class="flex items-center gap-2 flex-wrap">
            <RigBadge v-for="tone in ['accent', 'success', 'warning', 'error', 'info', 'neutral']" :key="tone" :variant="variant" :tone="tone">{{ tone }}</RigBadge>
          </div>
        </div>
      </div>
    `,
  }),
}

export const WithDot: Story = {
  render: () => ({
    components: { RigBadge },
    template: `
      <div class="flex items-center gap-3">
        <RigBadge dot tone="success">Online</RigBadge>
        <RigBadge dot tone="warning">Away</RigBadge>
        <RigBadge dot tone="error">Offline</RigBadge>
        <RigBadge dot tone="neutral">Unknown</RigBadge>
      </div>
    `,
  }),
}

export const Removable: Story = {
  render: () => ({
    components: { RigBadge },
    template: `
      <div class="flex items-center gap-2">
        <RigBadge removable tone="accent">Vue</RigBadge>
        <RigBadge removable tone="info">TypeScript</RigBadge>
        <RigBadge removable tone="success">Tailwind</RigBadge>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { RigBadge },
    template: `
      <div class="flex items-center gap-3">
        <RigBadge size="sm">Small</RigBadge>
        <RigBadge size="md">Medium</RigBadge>
      </div>
    `,
  }),
}
