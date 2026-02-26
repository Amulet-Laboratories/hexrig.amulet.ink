import type { Meta, StoryObj } from '@storybook/vue3'
import RigProgress from './RigProgress.vue'

const meta = {
  title: 'Components/Progress',
  component: RigProgress,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    max: { control: 'number' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    tone: {
      control: 'select',
      options: ['accent', 'success', 'warning', 'error', 'info'],
    },
    indeterminate: { control: 'boolean' },
  },
} satisfies Meta<typeof RigProgress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { RigProgress },
    setup: () => ({ args }),
    template: '<RigProgress v-bind="args" />',
  }),
  args: {
    value: 65,
    max: 100,
    size: 'md',
    tone: 'accent',
  },
}

export const Sizes: Story = {
  render: () => ({
    components: { RigProgress },
    template: `
      <div class="space-y-4 max-w-md">
        <div>
          <p class="text-text-muted font-mono text-xs mb-2">sm</p>
          <RigProgress :value="60" size="sm" />
        </div>
        <div>
          <p class="text-text-muted font-mono text-xs mb-2">md</p>
          <RigProgress :value="60" size="md" />
        </div>
        <div>
          <p class="text-text-muted font-mono text-xs mb-2">lg</p>
          <RigProgress :value="60" size="lg" />
        </div>
      </div>
    `,
  }),
}

export const Tones: Story = {
  render: () => ({
    components: { RigProgress },
    template: `
      <div class="space-y-4 max-w-md">
        <RigProgress :value="80" tone="accent" />
        <RigProgress :value="100" tone="success" />
        <RigProgress :value="60" tone="warning" />
        <RigProgress :value="30" tone="error" />
        <RigProgress :value="45" tone="info" />
      </div>
    `,
  }),
}

export const Indeterminate: Story = {
  render: () => ({
    components: { RigProgress },
    template: '<RigProgress indeterminate />',
  }),
}
