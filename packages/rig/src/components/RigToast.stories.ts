import type { Meta, StoryObj } from '@storybook/vue3'
import RigToast from './RigToast.vue'
import RigButton from './RigButton.vue'
import { useToast } from '../composables/useToast'

const meta = {
  title: 'Components/Toast',
  component: RigToast,
  tags: ['autodocs'],
} satisfies Meta<typeof RigToast>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { RigToast, RigButton },
    setup() {
      const toast = useToast()

      const showInfo = () =>
        toast.show({
          title: 'Information',
          description: 'Something noteworthy happened.',
          tone: 'info',
        })
      const showSuccess = () =>
        toast.show({
          title: 'Saved',
          description: 'Your changes have been saved.',
          tone: 'success',
        })
      const showWarning = () =>
        toast.show({
          title: 'Warning',
          description: 'You are approaching the rate limit.',
          tone: 'warning',
        })
      const showError = () =>
        toast.show({
          title: 'Error',
          description: 'Failed to save changes. Please try again.',
          tone: 'error',
        })

      return { showInfo, showSuccess, showWarning, showError }
    },
    template: `
      <div>
        <div class="flex gap-3 flex-wrap">
          <RigButton variant="outline" @click="showInfo">Info Toast</RigButton>
          <RigButton variant="outline" @click="showSuccess">Success Toast</RigButton>
          <RigButton variant="outline" @click="showWarning">Warning Toast</RigButton>
          <RigButton variant="outline" @click="showError">Error Toast</RigButton>
        </div>
        <RigToast />
      </div>
    `,
  }),
}

export const WithAction: Story = {
  name: 'With Action Button',
  render: () => ({
    components: { RigToast, RigButton },
    setup() {
      const toast = useToast()

      const showWithAction = () =>
        toast.show({
          title: 'File deleted',
          description: 'document.pdf has been removed.',
          tone: 'neutral',
          action: {
            label: 'Undo',
            onClick: () => toast.show({ title: 'Restored', tone: 'success' }),
          },
        })

      return { showWithAction }
    },
    template: `
      <div>
        <RigButton @click="showWithAction">Delete File</RigButton>
        <RigToast />
      </div>
    `,
  }),
}

export const Stacking: Story = {
  name: 'Stacked Toasts',
  render: () => ({
    components: { RigToast, RigButton },
    setup() {
      const toast = useToast()
      let count = 0

      const showMany = () => {
        const tones = ['info', 'success', 'warning', 'error', 'neutral'] as const
        for (let i = 0; i < 4; i++) {
          setTimeout(() => {
            count++
            toast.show({
              title: `Notification #${count}`,
              description: 'Toasts stack vertically.',
              tone: tones[count % tones.length],
              dismissible: true,
            })
          }, i * 300)
        }
      }

      const dismissAll = () => toast.dismissAll()

      return { showMany, dismissAll }
    },
    template: `
      <div class="flex gap-3">
        <RigButton @click="showMany">Show 4 Toasts</RigButton>
        <RigButton variant="ghost" @click="dismissAll">Dismiss All</RigButton>
        <RigToast />
      </div>
    `,
  }),
}

export const CustomDuration: Story = {
  name: 'Custom Duration',
  render: () => ({
    components: { RigToast, RigButton },
    setup() {
      const toast = useToast()

      const showShort = () => toast.show({ title: 'Quick flash', tone: 'info', duration: 1500 })
      const showLong = () =>
        toast.show({
          title: 'Persistent notice',
          description: 'This stays visible for 10 seconds.',
          tone: 'warning',
          duration: 10000,
        })

      return { showShort, showLong }
    },
    template: `
      <div class="flex gap-3">
        <RigButton variant="outline" @click="showShort">1.5s Toast</RigButton>
        <RigButton variant="outline" @click="showLong">10s Toast</RigButton>
        <RigToast />
      </div>
    `,
  }),
}
