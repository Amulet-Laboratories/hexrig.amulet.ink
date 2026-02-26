import type { Meta, StoryObj } from '@storybook/vue3'
import RigTooltip from './RigTooltip.vue'

const meta = {
  title: 'Components/Tooltip',
  component: RigTooltip,
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text' },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    delay: { control: 'number' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof RigTooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { RigTooltip },
    setup: () => ({ args }),
    template: `
      <div class="flex items-center justify-center py-16">
        <RigTooltip v-bind="args">
          <button class="px-4 py-2 bg-surface-raised border border-border rounded text-text-primary font-body text-sm">
            Hover me
          </button>
        </RigTooltip>
      </div>
    `,
  }),
  args: {
    content: 'Helpful information',
    placement: 'top',
  },
}

export const Placements: Story = {
  render: (args) => ({
    components: { RigTooltip },
    setup: () => ({ args }),
    template: `
      <div class="flex items-center justify-center gap-4 py-16">
        <RigTooltip v-bind="args" placement="top">
          <button class="px-3 py-1.5 bg-surface-raised border border-border rounded text-text-secondary font-mono text-xs">top</button>
        </RigTooltip>
        <RigTooltip v-bind="args" placement="bottom">
          <button class="px-3 py-1.5 bg-surface-raised border border-border rounded text-text-secondary font-mono text-xs">bottom</button>
        </RigTooltip>
        <RigTooltip v-bind="args" placement="left">
          <button class="px-3 py-1.5 bg-surface-raised border border-border rounded text-text-secondary font-mono text-xs">left</button>
        </RigTooltip>
        <RigTooltip v-bind="args" placement="right">
          <button class="px-3 py-1.5 bg-surface-raised border border-border rounded text-text-secondary font-mono text-xs">right</button>
        </RigTooltip>
      </div>
    `,
  }),
  args: {
    content: 'Tooltip text',
  },
}
