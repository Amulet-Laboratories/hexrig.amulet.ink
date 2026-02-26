import type { Meta, StoryObj } from '@storybook/vue3'
import RigAlert from './RigAlert.vue'

const meta = {
  title: 'Components/Alert',
  component: RigAlert,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Contextual feedback messages for user actions. Four semantic tones (success, warning, error, info), optional title, dismiss button, and icon slot.',
      },
    },
  },
  argTypes: {
    tone: {
      control: 'select',
      options: ['success', 'warning', 'error', 'info'],
    },
    title: { control: 'text' },
    dismissible: { control: 'boolean' },
    icon: {
      control: 'select',
      options: [true, false],
    },
  },
} satisfies Meta<typeof RigAlert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { RigAlert },
    setup: () => ({ args }),
    template:
      '<RigAlert v-bind="args">This is an informational message about the current state.</RigAlert>',
  }),
  args: {
    tone: 'info',
    title: 'Heads up',
  },
}

export const AllTones: Story = {
  render: () => ({
    components: { RigAlert },
    template: `
      <div class="flex flex-col gap-4 max-w-lg">
        <RigAlert tone="info" title="Information">
          Your account has been updated successfully.
        </RigAlert>
        <RigAlert tone="success" title="Success">
          Changes saved. Your profile is now live.
        </RigAlert>
        <RigAlert tone="warning" title="Warning">
          Your session will expire in 5 minutes. Save your work.
        </RigAlert>
        <RigAlert tone="error" title="Error">
          Failed to process payment. Please check your card details.
        </RigAlert>
      </div>
    `,
  }),
}

export const Dismissible: Story = {
  render: () => ({
    components: { RigAlert },
    template: `
      <div class="flex flex-col gap-4 max-w-lg">
        <RigAlert tone="info" title="Dismissible" dismissible>
          Click the X to dismiss this alert.
        </RigAlert>
        <RigAlert tone="warning" title="Also dismissible" dismissible>
          This one can be dismissed too.
        </RigAlert>
      </div>
    `,
  }),
}

export const WithoutIcon: Story = {
  render: () => ({
    components: { RigAlert },
    template: `
      <RigAlert tone="info" title="No icon" :icon="false" class="max-w-lg">
        Sometimes you don't need an icon.
      </RigAlert>
    `,
  }),
}

export const WithoutTitle: Story = {
  render: () => ({
    components: { RigAlert },
    template: `
      <RigAlert tone="success" class="max-w-lg">
        A simple success message without a title.
      </RigAlert>
    `,
  }),
}

export const LongContent: Story = {
  render: () => ({
    components: { RigAlert },
    template: `
      <RigAlert tone="warning" title="API Rate Limit Approaching" dismissible class="max-w-lg">
        You've used 4,850 of your 5,000 monthly API requests. Consider upgrading to
        a higher tier or optimizing your request patterns to avoid service interruption
        when the limit is reached.
      </RigAlert>
    `,
  }),
}
