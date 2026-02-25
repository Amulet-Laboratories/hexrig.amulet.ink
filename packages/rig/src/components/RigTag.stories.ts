import type { Meta, StoryObj } from '@storybook/vue3'
import RigTag from './RigTag.vue'

const meta = {
  title: 'Form/Tag',
  component: RigTag,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'soft', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    removable: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof RigTag>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Hearth',
  },
}

export const Variants: Story = {
  render: () => ({
    components: { RigTag },
    template: `
      <div class="flex items-center gap-3">
        <RigTag label="Solid" variant="solid" />
        <RigTag label="Soft" variant="soft" />
        <RigTag label="Outline" variant="outline" />
      </div>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { RigTag },
    template: `
      <div class="flex items-center gap-3">
        <RigTag label="Small" size="sm" />
        <RigTag label="Medium" size="md" />
        <RigTag label="Large" size="lg" />
      </div>
    `,
  }),
}

export const Removable: Story = {
  args: {
    label: 'Removable',
    removable: true,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    removable: true,
    disabled: true,
  },
}
