import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import RigCheckbox from './RigCheckbox.vue'

const meta = {
  title: 'Components/Checkbox',
  component: RigCheckbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Binary input with label and optional description. Full keyboard support, ARIA checked state, and token-driven focus ring.',
      },
    },
  },
  argTypes: {
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof RigCheckbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { RigCheckbox },
    setup() {
      const checked = ref(false)
      return { args, checked }
    },
    template: '<RigCheckbox v-bind="args" v-model="checked" />',
  }),
  args: {
    label: 'Accept terms and conditions',
  },
}

export const Checked: Story = {
  render: (args) => ({
    components: { RigCheckbox },
    setup() {
      const checked = ref(true)
      return { args, checked }
    },
    template: '<RigCheckbox v-bind="args" v-model="checked" />',
  }),
  args: {
    label: 'Enable notifications',
  },
}

export const WithDescription: Story = {
  render: (args) => ({
    components: { RigCheckbox },
    setup() {
      const checked = ref(false)
      return { args, checked }
    },
    template: '<RigCheckbox v-bind="args" v-model="checked" />',
  }),
  args: {
    label: 'Subscribe to newsletter',
    description: 'Receive occasional updates about new themes and components.',
  },
}

export const WithError: Story = {
  render: (args) => ({
    components: { RigCheckbox },
    setup() {
      const checked = ref(false)
      return { args, checked }
    },
    template: '<RigCheckbox v-bind="args" v-model="checked" />',
  }),
  args: {
    label: 'Accept terms',
    error: 'You must accept the terms to continue.',
  },
}

export const Disabled: Story = {
  render: (args) => ({
    components: { RigCheckbox },
    setup() {
      const checked = ref(false)
      return { args, checked }
    },
    template: '<RigCheckbox v-bind="args" v-model="checked" />',
  }),
  args: {
    label: 'Disabled option',
    disabled: true,
  },
}
