import type { Meta, StoryObj } from '@storybook/vue3'
import RigButton from './RigButton.vue'

const meta = {
  title: 'Components/Button',
  component: RigButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Primary interactive element. Four variants (solid, outline, ghost, link), three tones (accent, neutral, danger), three sizes, loading state, and polymorphic `as` prop.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost', 'link'],
    },
    tone: {
      control: 'select',
      options: ['accent', 'neutral', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
} satisfies Meta<typeof RigButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { RigButton },
    setup: () => ({ args }),
    template: '<RigButton v-bind="args">Button</RigButton>',
  }),
  args: {
    variant: 'solid',
    tone: 'accent',
    size: 'md',
  },
}

export const Variants: Story = {
  render: () => ({
    components: { RigButton },
    template: `
      <div class="flex items-center gap-4">
        <RigButton variant="solid">Solid</RigButton>
        <RigButton variant="outline">Outline</RigButton>
        <RigButton variant="ghost">Ghost</RigButton>
        <RigButton variant="link">Link</RigButton>
      </div>
    `,
  }),
}

export const Tones: Story = {
  render: () => ({
    components: { RigButton },
    template: `
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-4">
          <RigButton tone="accent" variant="solid">Accent</RigButton>
          <RigButton tone="neutral" variant="solid">Neutral</RigButton>
          <RigButton tone="danger" variant="solid">Danger</RigButton>
        </div>
        <div class="flex items-center gap-4">
          <RigButton tone="accent" variant="outline">Accent</RigButton>
          <RigButton tone="neutral" variant="outline">Neutral</RigButton>
          <RigButton tone="danger" variant="outline">Danger</RigButton>
        </div>
        <div class="flex items-center gap-4">
          <RigButton tone="accent" variant="ghost">Accent</RigButton>
          <RigButton tone="neutral" variant="ghost">Neutral</RigButton>
          <RigButton tone="danger" variant="ghost">Danger</RigButton>
        </div>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { RigButton },
    template: `
      <div class="flex items-center gap-4">
        <RigButton size="sm">Small</RigButton>
        <RigButton size="md">Medium</RigButton>
        <RigButton size="lg">Large</RigButton>
      </div>
    `,
  }),
}

export const States: Story = {
  render: () => ({
    components: { RigButton },
    template: `
      <div class="flex items-center gap-4">
        <RigButton>Default</RigButton>
        <RigButton disabled>Disabled</RigButton>
        <RigButton loading>Loading</RigButton>
      </div>
    `,
  }),
}

export const FullMatrix: Story = {
  name: 'Full Variant × Tone Matrix',
  render: () => ({
    components: { RigButton },
    template: `
      <div class="space-y-6">
        <div v-for="variant in ['solid', 'outline', 'ghost', 'link']" :key="variant">
          <p class="text-text-muted text-sm mb-2 font-mono uppercase tracking-widest">{{ variant }}</p>
          <div class="flex items-center gap-3">
            <RigButton :variant="variant" tone="accent">Accent</RigButton>
            <RigButton :variant="variant" tone="neutral">Neutral</RigButton>
            <RigButton :variant="variant" tone="danger">Danger</RigButton>
          </div>
        </div>
      </div>
    `,
  }),
}
