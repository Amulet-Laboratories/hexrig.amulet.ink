import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import RigDialog from './RigDialog.vue'
import RigButton from './RigButton.vue'
import RigText from './RigText.vue'
import RigInput from './RigInput.vue'

const meta = {
  title: 'Components/Dialog',
  component: RigDialog,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Modal overlay with managed focus trapping, Esc-to-close, and backdrop click handling. Three sizes, optional persistent mode, and title/description/footer slots.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    dismissible: { control: 'boolean' },
    persistent: { control: 'boolean' },
  },
} satisfies Meta<typeof RigDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { RigDialog, RigButton, RigText },
    setup() {
      const open = ref(false)
      return { args, open }
    },
    template: `
      <div>
        <RigButton @click="open = true">Open Dialog</RigButton>
        <RigDialog v-model="open" v-bind="args">
          <RigText color="secondary">This is the dialog body content. It supports any components.</RigText>
          <template #footer>
            <RigButton variant="ghost" @click="open = false">Cancel</RigButton>
            <RigButton @click="open = false">Confirm</RigButton>
          </template>
        </RigDialog>
      </div>
    `,
  }),
  args: {
    title: 'Dialog Title',
    description: 'A brief description of what this dialog is about.',
    size: 'md',
    dismissible: true,
  },
}

export const Sizes: Story = {
  render: () => ({
    components: { RigDialog, RigButton, RigText },
    setup() {
      const smOpen = ref(false)
      const mdOpen = ref(false)
      const lgOpen = ref(false)
      return { smOpen, mdOpen, lgOpen }
    },
    template: `
      <div class="flex gap-3">
        <RigButton variant="outline" @click="smOpen = true">Small</RigButton>
        <RigButton variant="outline" @click="mdOpen = true">Medium</RigButton>
        <RigButton variant="outline" @click="lgOpen = true">Large</RigButton>

        <RigDialog v-model="smOpen" title="Small Dialog" size="sm">
          <RigText color="secondary">This is a small dialog.</RigText>
          <template #footer>
            <RigButton size="sm" @click="smOpen = false">Close</RigButton>
          </template>
        </RigDialog>

        <RigDialog v-model="mdOpen" title="Medium Dialog" size="md">
          <RigText color="secondary">This is a medium dialog with more space for content.</RigText>
          <template #footer>
            <RigButton size="sm" variant="ghost" @click="mdOpen = false">Cancel</RigButton>
            <RigButton size="sm" @click="mdOpen = false">Confirm</RigButton>
          </template>
        </RigDialog>

        <RigDialog v-model="lgOpen" title="Large Dialog" size="lg">
          <RigText color="secondary">This is a large dialog suitable for complex forms or content.</RigText>
          <template #footer>
            <RigButton size="sm" variant="ghost" @click="lgOpen = false">Cancel</RigButton>
            <RigButton size="sm" @click="lgOpen = false">Confirm</RigButton>
          </template>
        </RigDialog>
      </div>
    `,
  }),
}

export const WithForm: Story = {
  name: 'Form Dialog',
  render: () => ({
    components: { RigDialog, RigButton, RigText, RigInput },
    setup() {
      const open = ref(false)
      const name = ref('')
      const email = ref('')
      return { open, name, email }
    },
    template: `
      <div>
        <RigButton @click="open = true">Create Account</RigButton>
        <RigDialog v-model="open" title="Create Account" description="Fill in your details to get started.">
          <div class="flex flex-col gap-4">
            <RigInput v-model="name" label="Full name" placeholder="Jane Doe" required />
            <RigInput v-model="email" label="Email" type="email" placeholder="jane@example.com" required />
          </div>
          <template #footer>
            <RigButton variant="ghost" @click="open = false">Cancel</RigButton>
            <RigButton @click="open = false">Create</RigButton>
          </template>
        </RigDialog>
      </div>
    `,
  }),
}

export const Persistent: Story = {
  render: () => ({
    components: { RigDialog, RigButton, RigText },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div>
        <RigButton tone="danger" @click="open = true">Delete</RigButton>
        <RigDialog v-model="open" title="Confirm Deletion" persistent>
          <RigText color="secondary">
            This action cannot be undone. Are you sure you want to delete this item?
          </RigText>
          <template #footer>
            <RigButton variant="ghost" @click="open = false">Cancel</RigButton>
            <RigButton tone="danger" @click="open = false">Delete Forever</RigButton>
          </template>
        </RigDialog>
      </div>
    `,
  }),
}
