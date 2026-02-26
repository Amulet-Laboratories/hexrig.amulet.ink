import type { Meta, StoryObj } from '@storybook/vue3'
import RigStack from './RigStack.vue'

const meta = {
  title: 'Components/Stack',
  component: RigStack,
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
    },
    wrap: { control: 'boolean' },
  },
} satisfies Meta<typeof RigStack>

export default meta
type Story = StoryObj<typeof meta>

const swatch =
  'bg-surface-raised border border-border-subtle rounded p-4 text-text-secondary font-mono text-sm'

export const Default: Story = {
  render: (args) => ({
    components: { RigStack },
    setup: () => ({ args, swatch }),
    template: `
      <RigStack v-bind="args">
        <div :class="swatch">First</div>
        <div :class="swatch">Second</div>
        <div :class="swatch">Third</div>
      </RigStack>
    `,
  }),
  args: {
    direction: 'vertical',
    gap: 'md',
  },
}

export const Horizontal: Story = {
  render: () => ({
    components: { RigStack },
    setup: () => ({ swatch }),
    template: `
      <RigStack direction="horizontal" gap="md" align="center">
        <div :class="swatch">Left</div>
        <div :class="swatch">Center</div>
        <div :class="swatch">Right</div>
      </RigStack>
    `,
  }),
}

export const SpaceBetween: Story = {
  render: () => ({
    components: { RigStack },
    setup: () => ({ swatch }),
    template: `
      <RigStack direction="horizontal" justify="between" align="center">
        <div :class="swatch">Brand</div>
        <div :class="swatch">Navigation</div>
      </RigStack>
    `,
  }),
}

export const GapScale: Story = {
  render: () => ({
    components: { RigStack },
    setup: () => ({ swatch }),
    template: `
      <div class="space-y-8">
        <div v-for="gap in ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']" :key="gap">
          <p class="text-text-muted font-mono text-xs mb-2">gap={{ gap }}</p>
          <RigStack direction="horizontal" :gap="gap">
            <div :class="swatch">A</div>
            <div :class="swatch">B</div>
            <div :class="swatch">C</div>
          </RigStack>
        </div>
      </div>
    `,
  }),
}
