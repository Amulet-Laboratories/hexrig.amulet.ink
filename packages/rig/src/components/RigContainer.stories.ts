import type { Meta, StoryObj } from '@storybook/vue3'
import RigContainer from './RigContainer.vue'

const meta = {
  title: 'Layout/Container',
  component: RigContainer,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full'],
    },
    as: {
      control: 'select',
      options: ['div', 'section', 'article', 'main'],
    },
    center: { control: 'boolean' },
    padding: { control: 'boolean' },
  },
} satisfies Meta<typeof RigContainer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { RigContainer },
    setup: () => ({ args }),
    template: `
      <RigContainer v-bind="args">
        <div class="bg-surface-raised border border-border-subtle rounded p-6 text-text-secondary font-body">
          Content constrained to <code class="font-mono text-accent">max-w-5xl</code> with horizontal padding.
        </div>
      </RigContainer>
    `,
  }),
  args: {
    size: 'md',
    center: true,
    padding: true,
  },
}

export const Sizes: Story = {
  render: () => ({
    components: { RigContainer },
    template: `
      <div class="space-y-6">
        <RigContainer size="sm">
          <div class="bg-surface-raised border border-border-subtle rounded p-4 text-text-secondary font-body text-sm">
            <code class="font-mono text-accent">sm</code> — max-w-2xl
          </div>
        </RigContainer>
        <RigContainer size="md">
          <div class="bg-surface-raised border border-border-subtle rounded p-4 text-text-secondary font-body text-sm">
            <code class="font-mono text-accent">md</code> — max-w-5xl (default)
          </div>
        </RigContainer>
        <RigContainer size="lg">
          <div class="bg-surface-raised border border-border-subtle rounded p-4 text-text-secondary font-body text-sm">
            <code class="font-mono text-accent">lg</code> — max-w-7xl
          </div>
        </RigContainer>
        <RigContainer size="full">
          <div class="bg-surface-raised border border-border-subtle rounded p-4 text-text-secondary font-body text-sm">
            <code class="font-mono text-accent">full</code> — max-w-full
          </div>
        </RigContainer>
      </div>
    `,
  }),
}
