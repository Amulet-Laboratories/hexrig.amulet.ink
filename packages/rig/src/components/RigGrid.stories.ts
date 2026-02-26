import type { Meta, StoryObj } from '@storybook/vue3'
import RigGrid from './RigGrid.vue'

const meta = {
  title: 'Layout/Grid',
  component: RigGrid,
  tags: ['autodocs'],
  argTypes: {
    cols: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
    },
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
    },
  },
} satisfies Meta<typeof RigGrid>

export default meta
type Story = StoryObj<typeof meta>

const cell =
  'bg-surface-raised border border-border-subtle rounded p-4 text-text-secondary font-mono text-sm text-center'

export const Default: Story = {
  render: (args) => ({
    components: { RigGrid },
    setup: () => ({ args, cell }),
    template: `
      <RigGrid v-bind="args">
        <div :class="cell">1</div>
        <div :class="cell">2</div>
        <div :class="cell">3</div>
        <div :class="cell">4</div>
        <div :class="cell">5</div>
        <div :class="cell">6</div>
      </RigGrid>
    `,
  }),
  args: {
    cols: 3,
    gap: 'md',
  },
}

export const TwoColumns: Story = {
  render: () => ({
    components: { RigGrid },
    setup: () => ({ cell }),
    template: `
      <RigGrid :cols="2" gap="lg">
        <div :class="cell">Sidebar</div>
        <div :class="cell">Main content</div>
      </RigGrid>
    `,
  }),
}

export const FourColumns: Story = {
  render: () => ({
    components: { RigGrid },
    setup: () => ({ cell }),
    template: `
      <RigGrid :cols="4" gap="md">
        <div v-for="n in 8" :key="n" :class="cell">{{ n }}</div>
      </RigGrid>
    `,
  }),
}
