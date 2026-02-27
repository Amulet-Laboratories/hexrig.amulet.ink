import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import RigText from '../components/RigText.vue'
import RigInput from '../components/RigInput.vue'
import RigSelect from '../components/RigSelect.vue'
import RigCheckbox from '../components/RigCheckbox.vue'
import RigSwitch from '../components/RigSwitch.vue'
import RigButton from '../components/RigButton.vue'

const meta = {
  title: 'Components/Inputs',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj

export const Input: Story = {
  name: 'RigInput',
  render: () => ({
    components: { RigText, RigInput, RigButton },
    setup() {
      const name = ref('')
      const email = ref('')
      const password = ref('')
      const search = ref('')
      return { name, email, password, search }
    },
    template: `
      <div class="space-y-8 max-w-md">
        <div class="space-y-3">
          <RigText variant="overline" color="accent">States</RigText>
          <RigInput v-model="name" label="Name" placeholder="Jane Doe" required />
          <RigInput v-model="email" label="Email" type="email" placeholder="jane@example.com" description="We'll never share your email." />
          <RigInput label="With error" placeholder="Enter value" error="This field is required." />
          <RigInput label="Disabled" placeholder="Cannot edit" :disabled="true" />
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">Input types</RigText>
          <RigInput v-model="password" label="Password" type="password" placeholder="••••••••" />
          <RigInput v-model="search" label="Search" type="search" placeholder="Search..." />
          <RigInput label="URL" type="url" placeholder="https://example.com" />
          <RigInput label="Phone" type="tel" placeholder="+1 (555) 000-0000" />
          <RigInput label="Number" type="number" placeholder="0" />
        </div>
      </div>
    `,
  }),
}

export const Select: Story = {
  name: 'RigSelect',
  render: () => ({
    components: { RigText, RigSelect },
    setup() {
      const theme = ref('')
      const plan = ref('pro')
      const options = [
        { value: 'ember', label: 'Ember' },
        { value: 'hearth', label: 'Hearth' },
        { value: 'grove', label: 'Grove' },
        { value: 'reef', label: 'Reef' },
        { value: 'abyss', label: 'Abyss' },
        { value: 'cove', label: 'Cove' },
        { value: 'linen', label: 'Linen' },
        { value: 'keep', label: 'Keep' },
        { value: 'slate', label: 'Slate' },
      ]
      const planOptions = [
        { value: 'free', label: 'Free' },
        { value: 'pro', label: 'Pro' },
        { value: 'enterprise', label: 'Enterprise' },
        { value: 'legacy', label: 'Legacy (deprecated)', disabled: true },
      ]
      return { theme, plan, options, planOptions }
    },
    template: `
      <div class="space-y-6 max-w-md">
        <div class="space-y-3">
          <RigText variant="overline" color="accent">States</RigText>
          <RigSelect v-model="theme" label="Theme" placeholder="Select a theme" :options="options" description="Applies to the entire application." />
          <RigSelect v-model="plan" label="Plan" :options="planOptions" description="Some options are disabled." />
          <RigSelect label="With error" placeholder="Select" :options="options" error="Selection is required." />
          <RigSelect label="Disabled" placeholder="Cannot change" :options="options" :disabled="true" />
        </div>
      </div>
    `,
  }),
}

export const Checkbox: Story = {
  name: 'RigCheckbox',
  render: () => ({
    components: { RigText, RigCheckbox },
    setup() {
      const a = ref(false)
      const b = ref(true)
      const c = ref(false)
      return { a, b, c }
    },
    template: `
      <div class="space-y-6 max-w-md">
        <div class="space-y-3">
          <RigText variant="overline" color="accent">States</RigText>
          <RigCheckbox v-model="a" label="Unchecked" description="Click to check this option." />
          <RigCheckbox v-model="b" label="Checked by default" />
          <RigCheckbox label="With error" error="You must agree to continue." />
          <RigCheckbox label="Disabled unchecked" :disabled="true" />
          <RigCheckbox :model-value="true" label="Disabled checked" :disabled="true" />
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">Agreement example</RigText>
          <RigCheckbox v-model="c" label="I agree to the terms and conditions" description="By checking this box you accept our terms of service and privacy policy." />
        </div>
      </div>
    `,
  }),
}

export const Switch: Story = {
  name: 'RigSwitch',
  render: () => ({
    components: { RigText, RigSwitch },
    setup() {
      const notifications = ref(true)
      const analytics = ref(false)
      const marketing = ref(false)
      return { notifications, analytics, marketing }
    },
    template: `
      <div class="space-y-6 max-w-md">
        <div class="space-y-4">
          <RigText variant="overline" color="accent">States</RigText>
          <RigSwitch v-model="notifications" label="Email notifications" description="Receive email updates about your account activity." />
          <RigSwitch v-model="analytics" label="Analytics" description="Help us improve by sharing usage data." />
          <RigSwitch label="With error" error="This setting cannot be changed." />
          <RigSwitch label="Disabled off" :disabled="true" />
          <RigSwitch :model-value="true" label="Disabled on" :disabled="true" />
        </div>

        <div class="space-y-4">
          <RigText variant="overline" color="accent">Preferences group</RigText>
          <div class="space-y-3 rounded border border-border-subtle p-4">
            <RigText variant="subheading">Notifications</RigText>
            <RigSwitch v-model="notifications" label="Email" />
            <RigSwitch v-model="analytics" label="In-app" />
            <RigSwitch v-model="marketing" label="Marketing" description="Promotional updates and announcements." />
          </div>
        </div>
      </div>
    `,
  }),
}

export const ButtonPlayground: Story = {
  name: 'RigButton — Playground',
  args: {
    tone: 'accent',
    variant: 'solid',
    size: 'md',
    disabled: false,
    loading: false,
  },
  argTypes: {
    tone: { control: 'select', options: ['accent', 'neutral', 'danger'] },
    variant: { control: 'select', options: ['solid', 'outline', 'ghost', 'link'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
  render: (args) => ({
    components: { RigButton },
    setup() {
      return { args }
    },
    template: `<RigButton v-bind="args">Button label</RigButton>`,
  }),
}

export const InputPlayground: Story = {
  name: 'RigInput — Playground',
  args: {
    modelValue: '',
    label: 'Label',
    placeholder: 'Placeholder text',
    type: 'text',
    description: 'Optional helper text.',
    error: '',
    disabled: false,
    required: false,
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'search', 'url', 'tel', 'number'],
    },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  render: (args) => ({
    components: { RigInput },
    setup() {
      return { args }
    },
    template: `<div style="max-width:24rem"><RigInput v-bind="args" /></div>`,
  }),
}

export const Button: Story = {
  name: 'RigButton',
  render: () => ({
    components: { RigText, RigButton },
    template: `
      <div class="space-y-6">
        <div class="space-y-3">
          <RigText variant="overline" color="accent">Variants</RigText>
          <div class="flex flex-wrap gap-3">
            <RigButton variant="solid">Solid</RigButton>
            <RigButton variant="outline">Outline</RigButton>
            <RigButton variant="ghost">Ghost</RigButton>
            <RigButton variant="link">Link</RigButton>
          </div>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">Tones</RigText>
          <div class="flex flex-wrap gap-3">
            <RigButton tone="accent">Accent</RigButton>
            <RigButton tone="neutral">Neutral</RigButton>
            <RigButton tone="danger">Danger</RigButton>
          </div>
          <div class="flex flex-wrap gap-3">
            <RigButton variant="outline" tone="accent">Accent outline</RigButton>
            <RigButton variant="outline" tone="neutral">Neutral outline</RigButton>
            <RigButton variant="outline" tone="danger">Danger outline</RigButton>
          </div>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">Sizes</RigText>
          <div class="flex flex-wrap items-center gap-3">
            <RigButton size="sm">Small</RigButton>
            <RigButton size="md">Medium</RigButton>
            <RigButton size="lg">Large</RigButton>
          </div>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">States</RigText>
          <div class="flex flex-wrap gap-3">
            <RigButton>Default</RigButton>
            <RigButton :disabled="true">Disabled</RigButton>
            <RigButton :loading="true">Loading</RigButton>
          </div>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">As anchor</RigText>
          <div class="flex flex-wrap gap-3">
            <RigButton as="a" href="#" variant="link">External link</RigButton>
            <RigButton as="a" href="#" variant="outline">Anchor button</RigButton>
          </div>
        </div>
      </div>
    `,
  }),
}
