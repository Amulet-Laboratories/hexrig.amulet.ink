import type { Meta, StoryObj } from '@storybook/vue3'
import RigIcon from './RigIcon.vue'

const meta = {
  title: 'Components/Icon',
  component: RigIcon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Iconify icon name (e.g. `lucide:star`, `mdi:home`, `ph:heart`)',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: 'select',
      options: [
        'current',
        'primary',
        'secondary',
        'muted',
        'accent',
        'success',
        'warning',
        'error',
        'info',
      ],
    },
  },
} satisfies Meta<typeof RigIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { RigIcon },
    setup: () => ({ args }),
    template: `<RigIcon v-bind="args" />`,
  }),
  args: {
    name: 'lucide:star',
    size: 'md',
    color: 'current',
  },
}

export const Sizes: Story = {
  args: { name: 'lucide:star' },
  render: () => ({
    components: { RigIcon },
    template: `
      <div class="flex items-end gap-4">
        <div v-for="size in ['xs', 'sm', 'md', 'lg', 'xl']" :key="size" class="flex flex-col items-center gap-1">
          <RigIcon name="lucide:star" :size="size" />
          <span class="text-xs text-text-muted font-mono">{{ size }}</span>
        </div>
      </div>
    `,
  }),
}

export const Colors: Story = {
  args: { name: 'lucide:circle' },
  render: () => ({
    components: { RigIcon },
    template: `
      <div class="flex items-center gap-4">
        <div v-for="color in ['primary', 'secondary', 'muted', 'accent', 'success', 'warning', 'error', 'info']" :key="color" class="flex flex-col items-center gap-1">
          <RigIcon name="lucide:circle" size="lg" :color="color" />
          <span class="text-xs text-text-muted font-mono">{{ color }}</span>
        </div>
      </div>
    `,
  }),
}

export const WithLabel: Story = {
  args: { name: 'lucide:alert-triangle' },
  render: () => ({
    components: { RigIcon },
    template: `<RigIcon name="lucide:alert-triangle" size="lg" color="error" :decorative="false" label="Error alert" />`,
  }),
}

export const IconSets: Story = {
  args: { name: 'lucide:home' },
  render: () => ({
    components: { RigIcon },
    template: `
      <div class="flex flex-col gap-6">
        <div>
          <p class="text-sm text-text-muted mb-2 font-mono">Lucide</p>
          <div class="flex items-center gap-3">
            <RigIcon name="lucide:home" size="lg" />
            <RigIcon name="lucide:settings" size="lg" />
            <RigIcon name="lucide:user" size="lg" />
            <RigIcon name="lucide:search" size="lg" />
            <RigIcon name="lucide:bell" size="lg" />
            <RigIcon name="lucide:heart" size="lg" />
          </div>
        </div>
        <div>
          <p class="text-sm text-text-muted mb-2 font-mono">Material Design Icons</p>
          <div class="flex items-center gap-3">
            <RigIcon name="mdi:home" size="lg" />
            <RigIcon name="mdi:cog" size="lg" />
            <RigIcon name="mdi:account" size="lg" />
            <RigIcon name="mdi:magnify" size="lg" />
            <RigIcon name="mdi:bell" size="lg" />
            <RigIcon name="mdi:heart" size="lg" />
          </div>
        </div>
        <div>
          <p class="text-sm text-text-muted mb-2 font-mono">Phosphor</p>
          <div class="flex items-center gap-3">
            <RigIcon name="ph:house" size="lg" />
            <RigIcon name="ph:gear" size="lg" />
            <RigIcon name="ph:user" size="lg" />
            <RigIcon name="ph:magnifying-glass" size="lg" />
            <RigIcon name="ph:bell" size="lg" />
            <RigIcon name="ph:heart" size="lg" />
          </div>
        </div>
      </div>
    `,
  }),
}
