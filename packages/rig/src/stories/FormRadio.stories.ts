import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import RigText from '../components/RigText.vue'
import RigRadio from '../components/RigRadio.vue'

const meta = {
  title: 'Components/Forms/Radio',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj

export const Vertical: Story = {
  name: 'Vertical',
  render: () => ({
    components: { RigText, RigRadio },
    setup() {
      const value = ref('')
      const options = [
        { value: 'hearth', label: 'Hearth' },
        { value: 'abyss', label: 'Abyss' },
        { value: 'ember', label: 'Ember' },
        { value: 'grove', label: 'Grove' },
      ]
      return { value, options }
    },
    template: `
      <div class="space-y-4 max-w-sm">
        <RigRadio
          v-model="value"
          name="theme-vertical"
          label="Choose a theme"
          :options="options"
          description="Select the theme for your workspace."
        />
        <RigText variant="caption" color="muted">Selected: {{ value || 'none' }}</RigText>
      </div>
    `,
  }),
}

export const Horizontal: Story = {
  name: 'Horizontal',
  render: () => ({
    components: { RigText, RigRadio },
    setup() {
      const value = ref('md')
      const options = [
        { value: 'sm', label: 'Small' },
        { value: 'md', label: 'Medium' },
        { value: 'lg', label: 'Large' },
      ]
      return { value, options }
    },
    template: `
      <div class="space-y-4">
        <RigRadio
          v-model="value"
          name="size-horizontal"
          label="Size"
          :options="options"
          orientation="horizontal"
        />
        <RigText variant="caption" color="muted">Selected: {{ value }}</RigText>
      </div>
    `,
  }),
}

export const Disabled: Story = {
  name: 'Disabled',
  render: () => ({
    components: { RigRadio },
    setup() {
      const options = [
        { value: 'a', label: 'Option A' },
        { value: 'b', label: 'Option B' },
        { value: 'c', label: 'Option C' },
      ]
      return { options }
    },
    template: `
      <RigRadio
        name="disabled-demo"
        label="Disabled group"
        :options="options"
        model-value="b"
        disabled
      />
    `,
  }),
}

export const WithError: Story = {
  name: 'With Error',
  render: () => ({
    components: { RigRadio },
    setup() {
      const options = [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ]
      return { options }
    },
    template: `
      <RigRadio
        name="error-demo"
        label="Do you agree to the terms?"
        :options="options"
        error="You must select an option."
      />
    `,
  }),
}

export const Preselected: Story = {
  name: 'Preselected',
  render: () => ({
    components: { RigText, RigRadio },
    setup() {
      const value = ref('monthly')
      const options = [
        { value: 'monthly', label: 'Monthly' },
        { value: 'yearly', label: 'Yearly' },
        { value: 'lifetime', label: 'Lifetime', disabled: true },
      ]
      return { value, options }
    },
    template: `
      <div class="space-y-4 max-w-sm">
        <RigRadio
          v-model="value"
          name="billing"
          label="Billing cycle"
          :options="options"
          description="Lifetime option is currently unavailable."
        />
        <RigText variant="caption" color="muted">Selected: {{ value }}</RigText>
      </div>
    `,
  }),
}
