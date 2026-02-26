import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import RigSwitch from './RigSwitch.vue'

const meta = {
  title: 'Components/Switch',
  component: RigSwitch,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof RigSwitch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { RigSwitch },
    setup() {
      const enabled = ref(false)
      return { args, enabled }
    },
    template: '<RigSwitch v-bind="args" v-model="enabled" />',
  }),
  args: {
    label: 'Dark mode',
  },
}

export const Enabled: Story = {
  render: (args) => ({
    components: { RigSwitch },
    setup() {
      const enabled = ref(true)
      return { args, enabled }
    },
    template: '<RigSwitch v-bind="args" v-model="enabled" />',
  }),
  args: {
    label: 'Notifications',
  },
}

export const WithDescription: Story = {
  render: (args) => ({
    components: { RigSwitch },
    setup() {
      const enabled = ref(false)
      return { args, enabled }
    },
    template: '<RigSwitch v-bind="args" v-model="enabled" />',
  }),
  args: {
    label: 'Reduce motion',
    description: 'Minimize animations and transitions throughout the interface.',
  },
}

export const Disabled: Story = {
  render: (args) => ({
    components: { RigSwitch },
    setup() {
      const enabled = ref(false)
      return { args, enabled }
    },
    template: '<RigSwitch v-bind="args" v-model="enabled" />',
  }),
  args: {
    label: 'Unavailable feature',
    disabled: true,
  },
}
