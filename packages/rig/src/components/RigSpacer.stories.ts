import type { Meta, StoryObj } from '@storybook/vue3'
import RigSpacer from './RigSpacer.vue'

const meta = {
  title: 'Components/Spacer',
  component: RigSpacer,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
    },
    axis: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
  },
} satisfies Meta<typeof RigSpacer>

export default meta
type Story = StoryObj<typeof meta>

const block =
  'bg-surface-raised border border-border-subtle rounded p-4 text-text-secondary font-mono text-sm'

export const Default: Story = {
  render: (args) => ({
    components: { RigSpacer },
    setup: () => ({ args, block }),
    template: `
      <div>
        <div :class="block">Above</div>
        <RigSpacer v-bind="args" />
        <div :class="block">Below</div>
      </div>
    `,
  }),
  args: {
    size: 'md',
    axis: 'vertical',
  },
}

export const Horizontal: Story = {
  render: () => ({
    components: { RigSpacer },
    setup: () => ({ block }),
    template: `
      <div class="flex items-center">
        <div :class="block">Left</div>
        <RigSpacer size="lg" axis="horizontal" />
        <div :class="block">Right</div>
      </div>
    `,
  }),
}

export const SizeScale: Story = {
  render: () => ({
    components: { RigSpacer },
    setup: () => ({ block }),
    template: `
      <div>
        <div v-for="size in ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']" :key="size">
          <p class="text-text-muted font-mono text-xs mb-1">size={{ size }}</p>
          <div class="flex items-center">
            <div :class="block">A</div>
            <RigSpacer :size="size" axis="horizontal" />
            <div :class="block">B</div>
          </div>
          <RigSpacer size="md" />
        </div>
      </div>
    `,
  }),
}
