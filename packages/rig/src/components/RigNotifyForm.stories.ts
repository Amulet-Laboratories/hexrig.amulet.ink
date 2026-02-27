import type { Meta, StoryObj } from '@storybook/vue3'
import RigNotifyForm from './RigNotifyForm.vue'

const meta = {
  title: 'Components/NotifyForm',
  component: RigNotifyForm,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Email subscription form for coming-soon imprint sites. Handles Netlify form POST, shows thank-you state on success. Theme-aware via semantic tokens.',
      },
    },
  },
  argTypes: {
    formName: {
      control: 'text',
      description: 'Netlify form name identifier',
    },
    contactEmail: {
      control: 'text',
      description: 'Contact email displayed below form',
    },
    submitLabel: {
      control: 'text',
      description: 'Submit button label',
    },
    thankYouMessage: {
      control: 'text',
      description: 'Message shown after submission',
    },
  },
} satisfies Meta<typeof RigNotifyForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    formName: 'press-notify',
    contactEmail: 'press@amulet.ink',
  },
}

export const CustomLabels: Story = {
  args: {
    formName: 'workshop-notify',
    contactEmail: 'workshop@amulet.ink',
    submitLabel: 'Keep me posted',
    thankYouMessage: 'On the list. We will reach out when the workshop opens.',
  },
  parameters: {
    docs: {
      description: { story: 'Custom submit label and thank-you message.' },
    },
  },
}

export const InContext: Story = {
  render: (args) => ({
    components: { RigNotifyForm },
    setup() {
      return { args }
    },
    template: `
      <div class="max-w-xl mx-auto py-12 px-6">
        <h2 class="text-2xl font-display text-accent mb-2">Workshop</h2>
        <p class="text-text-secondary font-body mb-8">The workshop is being set up. Sawdust soon.</p>
        <RigNotifyForm v-bind="args" />
      </div>
    `,
  }),
  args: {
    formName: 'workshop-notify',
    contactEmail: 'workshop@amulet.ink',
  },
  parameters: {
    docs: {
      description: {
        story: 'The form in context — as it would appear on a coming-soon placeholder page.',
      },
    },
  },
}
