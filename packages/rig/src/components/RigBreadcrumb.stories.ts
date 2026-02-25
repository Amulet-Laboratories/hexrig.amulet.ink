import type { Meta, StoryObj } from '@storybook/vue3'
import RigBreadcrumb from './RigBreadcrumb.vue'

const meta = {
  title: 'Navigation/Breadcrumb',
  component: RigBreadcrumb,
  tags: ['autodocs'],
  argTypes: {
    separator: { control: 'text' },
  },
} satisfies Meta<typeof RigBreadcrumb>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { RigBreadcrumb },
    setup: () => ({ args }),
    template: '<RigBreadcrumb v-bind="args" />',
  }),
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Components', href: '/components' },
      { label: 'Breadcrumb' },
    ],
  },
}

export const CustomSeparator: Story = {
  render: (args) => ({
    components: { RigBreadcrumb },
    setup: () => ({ args }),
    template: '<RigBreadcrumb v-bind="args" />',
  }),
  args: {
    items: [
      { label: 'Docs', href: '/docs' },
      { label: 'Tokens', href: '/docs/tokens' },
      { label: 'Colors' },
    ],
    separator: '›',
  },
}

export const LongPath: Story = {
  render: (args) => ({
    components: { RigBreadcrumb },
    setup: () => ({ args }),
    template: '<RigBreadcrumb v-bind="args" />',
  }),
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Documentation', href: '/docs' },
      { label: 'Design Tokens', href: '/docs/tokens' },
      { label: 'Color System', href: '/docs/tokens/color' },
      { label: 'Surface' },
    ],
  },
}
