import type { Meta, StoryObj } from '@storybook/vue3'
import RigText from './RigText.vue'

const meta = {
  title: 'Primitives/Text',
  component: RigText,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['display', 'heading', 'subheading', 'body', 'caption', 'overline', 'mono'],
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'muted',
        'accent',
        'inverse',
        'on-accent',
        'success',
        'warning',
        'error',
        'info',
      ],
    },
    weight: {
      control: 'select',
      options: [undefined, 'light', 'normal', 'medium', 'semibold', 'bold'],
    },
    align: {
      control: 'select',
      options: [undefined, 'left', 'center', 'right'],
    },
    as: {
      control: 'select',
      options: ['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'label', 'code', 'pre'],
    },
    truncate: { control: 'boolean' },
  },
} satisfies Meta<typeof RigText>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { RigText },
    setup: () => ({ args }),
    template: '<RigText v-bind="args">The quick brown fox jumps over the lazy dog.</RigText>',
  }),
  args: {
    variant: 'body',
    color: 'primary',
  },
}

export const AllVariants: Story = {
  render: () => ({
    components: { RigText },
    template: `
      <div class="flex flex-col gap-4">
        <RigText variant="display">Display — Large headlines</RigText>
        <RigText variant="heading">Heading — Section titles</RigText>
        <RigText variant="subheading">Subheading — Subsection context</RigText>
        <RigText variant="body">Body — Primary reading text for paragraphs and content.</RigText>
        <RigText variant="caption">Caption — Secondary smaller text</RigText>
        <RigText variant="overline">Overline — Category labels</RigText>
        <RigText variant="mono">Mono — Code and technical values</RigText>
      </div>
    `,
  }),
}

export const AllColors: Story = {
  render: () => ({
    components: { RigText },
    template: `
      <div class="flex flex-col gap-2">
        <RigText color="primary">Primary text</RigText>
        <RigText color="secondary">Secondary text</RigText>
        <RigText color="muted">Muted text</RigText>
        <RigText color="accent">Accent text</RigText>
        <div class="bg-accent p-2 rounded inline-block">
          <RigText color="on-accent">On-accent text</RigText>
        </div>
        <RigText color="success">Success text</RigText>
        <RigText color="warning">Warning text</RigText>
        <RigText color="error">Error text</RigText>
        <RigText color="info">Info text</RigText>
      </div>
    `,
  }),
}

export const Weights: Story = {
  render: () => ({
    components: { RigText },
    template: `
      <div class="flex flex-col gap-2">
        <RigText weight="light">Light weight</RigText>
        <RigText weight="normal">Normal weight</RigText>
        <RigText weight="medium">Medium weight</RigText>
        <RigText weight="semibold">Semibold weight</RigText>
        <RigText weight="bold">Bold weight</RigText>
      </div>
    `,
  }),
}

export const Truncated: Story = {
  render: () => ({
    components: { RigText },
    template: `
      <div class="w-64">
        <RigText truncate>This is a very long text that should be truncated when it exceeds the container width.</RigText>
      </div>
    `,
  }),
}
