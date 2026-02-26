import type { Meta, StoryObj } from '@storybook/vue3'
import RigTabs from './RigTabs.vue'

const meta = {
  title: 'Components/Tabs',
  component: RigTabs,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['underline', 'pill'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof RigTabs>

export default meta
type Story = StoryObj<typeof meta>

const tabs = [
  { value: 'overview', label: 'Overview' },
  { value: 'tokens', label: 'Tokens' },
  { value: 'components', label: 'Components' },
]

export const Default: Story = {
  render: (args) => ({
    components: { RigTabs },
    setup: () => ({ args }),
    template: `
      <RigTabs v-bind="args">
        <template #overview>
          <p class="text-text-secondary font-body">Overview content goes here.</p>
        </template>
        <template #tokens>
          <p class="text-text-secondary font-body">Token documentation.</p>
        </template>
        <template #components>
          <p class="text-text-secondary font-body">Component catalog.</p>
        </template>
      </RigTabs>
    `,
  }),
  args: {
    modelValue: 'overview',
    tabs,
    label: 'Documentation',
    variant: 'underline',
    size: 'md',
  },
}

export const Pill: Story = {
  render: (args) => ({
    components: { RigTabs },
    setup: () => ({ args }),
    template: `
      <RigTabs v-bind="args">
        <template #overview>
          <p class="text-text-secondary font-body">Overview panel.</p>
        </template>
        <template #tokens>
          <p class="text-text-secondary font-body">Tokens panel.</p>
        </template>
        <template #components>
          <p class="text-text-secondary font-body">Components panel.</p>
        </template>
      </RigTabs>
    `,
  }),
  args: {
    modelValue: 'overview',
    tabs,
    label: 'Documentation',
    variant: 'pill',
  },
}

export const WithDisabled: Story = {
  render: (args) => ({
    components: { RigTabs },
    setup: () => ({ args }),
    template: `
      <RigTabs v-bind="args">
        <template #overview>
          <p class="text-text-secondary font-body">Overview content.</p>
        </template>
        <template #tokens>
          <p class="text-text-secondary font-body">Token docs.</p>
        </template>
        <template #components>
          <p class="text-text-secondary font-body">Coming soon.</p>
        </template>
      </RigTabs>
    `,
  }),
  args: {
    modelValue: 'overview',
    tabs: [
      { value: 'overview', label: 'Overview' },
      { value: 'tokens', label: 'Tokens' },
      { value: 'components', label: 'Components', disabled: true },
    ],
    label: 'Documentation',
  },
}
