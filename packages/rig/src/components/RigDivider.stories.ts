import type { Meta, StoryObj } from '@storybook/vue3'
import RigDivider from './RigDivider.vue'
import RigText from './RigText.vue'

const meta = {
  title: 'Components/Divider',
  component: RigDivider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Visual separator for content sections. Horizontal or vertical orientation, three border strengths (subtle, default, strong), and optional inline label slot.',
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: 'select',
      options: ['subtle', 'default', 'strong'],
    },
    label: { control: 'text' },
  },
} satisfies Meta<typeof RigDivider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { RigDivider },
    setup: () => ({ args }),
    template: '<RigDivider v-bind="args" />',
  }),
  args: {
    orientation: 'horizontal',
    variant: 'default',
  },
}

export const Variants: Story = {
  render: () => ({
    components: { RigDivider, RigText },
    template: `
      <div class="flex flex-col gap-6">
        <div>
          <RigText variant="caption" color="muted" class="mb-2 font-mono">subtle</RigText>
          <RigDivider variant="subtle" />
        </div>
        <div>
          <RigText variant="caption" color="muted" class="mb-2 font-mono">default</RigText>
          <RigDivider variant="default" />
        </div>
        <div>
          <RigText variant="caption" color="muted" class="mb-2 font-mono">strong</RigText>
          <RigDivider variant="strong" />
        </div>
      </div>
    `,
  }),
}

export const WithLabel: Story = {
  render: () => ({
    components: { RigDivider },
    template: '<RigDivider label="Section Break" />',
  }),
}

export const Vertical: Story = {
  render: () => ({
    components: { RigDivider, RigText },
    template: `
      <div class="flex items-center gap-4 h-12">
        <RigText>Left</RigText>
        <RigDivider orientation="vertical" />
        <RigText>Center</RigText>
        <RigDivider orientation="vertical" variant="strong" />
        <RigText>Right</RigText>
      </div>
    `,
  }),
}

export const InContext: Story = {
  name: 'In Context',
  render: () => ({
    components: { RigDivider, RigText },
    template: `
      <div class="max-w-md">
        <RigText variant="heading" class="mb-2">Settings</RigText>
        <RigText color="secondary">Configure your account preferences below.</RigText>
        <RigDivider class="my-4" />
        <RigText variant="subheading" class="mb-2">Profile</RigText>
        <RigText color="secondary">Name, avatar, and bio.</RigText>
        <RigDivider label="Advanced" class="my-4" />
        <RigText variant="subheading" class="mb-2">Security</RigText>
        <RigText color="secondary">Two-factor authentication and sessions.</RigText>
      </div>
    `,
  }),
}
