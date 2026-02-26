import type { Meta, StoryObj } from '@storybook/vue3'
import RigAvatar from './RigAvatar.vue'

const meta = {
  title: 'Components/Avatar',
  component: RigAvatar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'User or entity representation with image, initials, or icon fallback. Five sizes (xs–xl), circle or square shape, and accessible alt text.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    shape: {
      control: 'select',
      options: ['circle', 'square'],
    },
    name: { control: 'text' },
    src: { control: 'text' },
  },
} satisfies Meta<typeof RigAvatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { RigAvatar },
    setup: () => ({ args }),
    template: '<RigAvatar v-bind="args" />',
  }),
  args: {
    name: 'Andrew Passanisi',
    size: 'md',
    shape: 'circle',
  },
}

export const Sizes: Story = {
  render: () => ({
    components: { RigAvatar },
    template: `
      <div class="flex items-end gap-4">
        <RigAvatar name="A P" size="xs" />
        <RigAvatar name="A P" size="sm" />
        <RigAvatar name="A P" size="md" />
        <RigAvatar name="A P" size="lg" />
        <RigAvatar name="A P" size="xl" />
      </div>
    `,
  }),
}

export const Shapes: Story = {
  render: () => ({
    components: { RigAvatar },
    template: `
      <div class="flex items-center gap-4">
        <RigAvatar name="Circle" shape="circle" />
        <RigAvatar name="Square" shape="square" />
      </div>
    `,
  }),
}

export const Fallback: Story = {
  render: () => ({
    components: { RigAvatar },
    template: `
      <div class="flex items-center gap-4">
        <RigAvatar name="Andrew Passanisi" />
        <RigAvatar name="Hex" />
        <RigAvatar />
      </div>
    `,
  }),
}
