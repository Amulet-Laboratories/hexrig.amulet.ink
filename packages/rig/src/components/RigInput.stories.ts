import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import RigInput from './RigInput.vue'

const meta = {
  title: 'Components/Input',
  component: RigInput,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search', 'url', 'tel'],
    },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
} satisfies Meta<typeof RigInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { RigInput },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<RigInput v-bind="args" v-model="value" />',
  }),
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    type: 'email',
  },
}

export const WithDescription: Story = {
  render: (args) => ({
    components: { RigInput },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<RigInput v-bind="args" v-model="value" />',
  }),
  args: {
    label: 'Username',
    description: 'Must be 3-20 characters. Letters, numbers, and underscores only.',
    placeholder: 'amulet_user',
  },
}

export const WithError: Story = {
  render: (args) => ({
    components: { RigInput },
    setup() {
      const value = ref('bad@')
      return { args, value }
    },
    template: '<RigInput v-bind="args" v-model="value" />',
  }),
  args: {
    label: 'Email',
    error: 'Please enter a valid email address.',
    type: 'email',
  },
}

export const Required: Story = {
  render: (args) => ({
    components: { RigInput },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<RigInput v-bind="args" v-model="value" />',
  }),
  args: {
    label: 'Full name',
    required: true,
    placeholder: 'Jane Doe',
  },
}

export const Disabled: Story = {
  render: (args) => ({
    components: { RigInput },
    setup() {
      const value = ref('Cannot edit this')
      return { args, value }
    },
    template: '<RigInput v-bind="args" v-model="value" />',
  }),
  args: {
    label: 'Locked field',
    disabled: true,
  },
}

export const AllStates: Story = {
  name: 'All States',
  render: () => ({
    components: { RigInput },
    setup() {
      const v1 = ref('')
      const v2 = ref('')
      const v3 = ref('bad@')
      const v4 = ref('Locked')
      return { v1, v2, v3, v4 }
    },
    template: `
      <div class="flex flex-col gap-6 max-w-sm">
        <RigInput v-model="v1" label="Default" placeholder="Type here..." />
        <RigInput v-model="v2" label="With description" description="Helper text goes here." placeholder="Type here..." />
        <RigInput v-model="v3" label="With error" error="Something went wrong." />
        <RigInput v-model="v4" label="Disabled" disabled />
      </div>
    `,
  }),
}
