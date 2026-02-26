import type { Meta, StoryObj } from '@storybook/vue3'
import RigSpinner from './RigSpinner.vue'

const meta = {
  title: 'Components/Spinner',
  component: RigSpinner,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    tone: {
      control: 'select',
      options: ['accent', 'current', 'muted'],
    },
    label: { control: 'text' },
  },
} satisfies Meta<typeof RigSpinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { RigSpinner },
    setup: () => ({ args }),
    template: '<RigSpinner v-bind="args" />',
  }),
  args: {
    size: 'md',
    tone: 'accent',
  },
}

export const Sizes: Story = {
  render: () => ({
    components: { RigSpinner },
    template: `
      <div class="flex items-center gap-6">
        <RigSpinner size="xs" />
        <RigSpinner size="sm" />
        <RigSpinner size="md" />
        <RigSpinner size="lg" />
        <RigSpinner size="xl" />
      </div>
    `,
  }),
}

export const Tones: Story = {
  render: () => ({
    components: { RigSpinner },
    template: `
      <div class="flex items-center gap-6">
        <RigSpinner tone="accent" />
        <RigSpinner tone="muted" />
        <span class="text-status-error"><RigSpinner tone="current" /></span>
      </div>
    `,
  }),
}

export const InlineWithText: Story = {
  render: () => ({
    components: { RigSpinner },
    template: `
      <div class="flex items-center gap-2 text-text-secondary font-body">
        <RigSpinner size="sm" tone="current" />
        <span>Loading results</span>
      </div>
    `,
  }),
}
