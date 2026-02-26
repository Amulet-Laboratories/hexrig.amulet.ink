import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import RigSelect from './RigSelect.vue'

const meta = {
  title: 'Components/Select',
  component: RigSelect,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Dropdown selection input with label, description, and error support. Typed options array, placeholder, disabled and required states, and full ARIA labeling.',
      },
    },
  },
  argTypes: {
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
} satisfies Meta<typeof RigSelect>

export default meta
type Story = StoryObj<typeof meta>

const sampleOptions = [
  { value: 'hearth', label: 'Hearth' },
  { value: 'abyss', label: 'Abyss' },
  { value: 'hollow', label: 'Hollow' },
  { value: 'keep', label: 'Keep' },
  { value: 'cove', label: 'Cove' },
]

export const Default: Story = {
  render: (args) => ({
    components: { RigSelect },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<RigSelect v-bind="args" v-model="value" />',
  }),
  args: {
    label: 'Theme',
    placeholder: 'Choose a theme',
    options: sampleOptions,
  },
}

export const WithDescription: Story = {
  render: (args) => ({
    components: { RigSelect },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<RigSelect v-bind="args" v-model="value" />',
  }),
  args: {
    label: 'Collection',
    description: 'Select the theme collection to preview.',
    placeholder: 'Select collection',
    options: sampleOptions,
  },
}

export const WithError: Story = {
  render: (args) => ({
    components: { RigSelect },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<RigSelect v-bind="args" v-model="value" />',
  }),
  args: {
    label: 'Theme',
    error: 'Please select a theme.',
    placeholder: 'Choose a theme',
    options: sampleOptions,
  },
}

export const Disabled: Story = {
  render: (args) => ({
    components: { RigSelect },
    setup() {
      const value = ref('hearth')
      return { args, value }
    },
    template: '<RigSelect v-bind="args" v-model="value" />',
  }),
  args: {
    label: 'Theme',
    options: sampleOptions,
    disabled: true,
  },
}
