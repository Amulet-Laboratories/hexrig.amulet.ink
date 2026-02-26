import type { Meta, StoryObj } from '@storybook/vue3'
import RigSkeleton from './RigSkeleton.vue'

const meta = {
  title: 'Components/Skeleton',
  component: RigSkeleton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Content placeholder shown while data loads. Five shape variants (text, heading, circle, rect, card), configurable line count, and pulsing animation that respects reduced-motion.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'heading', 'circle', 'rect', 'card'],
    },
    lines: { control: { type: 'number', min: 1, max: 10 } },
    animated: { control: 'boolean' },
  },
} satisfies Meta<typeof RigSkeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { RigSkeleton },
    setup: () => ({ args }),
    template: '<RigSkeleton v-bind="args" />',
  }),
  args: {
    variant: 'text',
    lines: 3,
    animated: true,
  },
}

export const Variants: Story = {
  render: () => ({
    components: { RigSkeleton },
    template: `
      <div class="space-y-6 max-w-md">
        <div>
          <p class="text-text-muted font-mono text-xs mb-2">heading</p>
          <RigSkeleton variant="heading" />
        </div>
        <div>
          <p class="text-text-muted font-mono text-xs mb-2">text (3 lines)</p>
          <RigSkeleton variant="text" :lines="3" />
        </div>
        <div>
          <p class="text-text-muted font-mono text-xs mb-2">circle</p>
          <RigSkeleton variant="circle" />
        </div>
        <div>
          <p class="text-text-muted font-mono text-xs mb-2">rect</p>
          <RigSkeleton variant="rect" />
        </div>
        <div>
          <p class="text-text-muted font-mono text-xs mb-2">card</p>
          <RigSkeleton variant="card" />
        </div>
      </div>
    `,
  }),
}

export const CardPlaceholder: Story = {
  render: () => ({
    components: { RigSkeleton },
    template: `
      <div class="max-w-sm bg-surface-raised border border-border-subtle rounded p-4 space-y-4">
        <RigSkeleton variant="rect" />
        <div class="flex items-center gap-3">
          <RigSkeleton variant="circle" />
          <div class="flex-1 space-y-2">
            <RigSkeleton variant="heading" />
            <RigSkeleton variant="text" />
          </div>
        </div>
        <RigSkeleton variant="text" :lines="2" />
      </div>
    `,
  }),
}
