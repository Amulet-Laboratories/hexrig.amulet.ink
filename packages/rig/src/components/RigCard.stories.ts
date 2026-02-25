import type { Meta, StoryObj } from '@storybook/vue3'
import RigCard from './RigCard.vue'
import RigText from './RigText.vue'
import RigButton from './RigButton.vue'
import RigBadge from './RigBadge.vue'

const meta = {
  title: 'Composites/Card',
  component: RigCard,
  tags: ['autodocs'],
  argTypes: {
    elevation: {
      control: 'select',
      options: ['flat', 'raised', 'prominent'],
    },
    interactive: { control: 'boolean' },
    as: {
      control: 'select',
      options: ['div', 'article', 'a'],
    },
  },
} satisfies Meta<typeof RigCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { RigCard, RigText },
    setup: () => ({ args }),
    template: `
      <RigCard v-bind="args" class="max-w-sm">
        <RigText variant="heading" class="mb-2">Card Title</RigText>
        <RigText color="secondary">This is the card body content. It can contain any components or text.</RigText>
      </RigCard>
    `,
  }),
  args: {
    elevation: 'raised',
  },
}

export const Elevations: Story = {
  render: () => ({
    components: { RigCard, RigText },
    template: `
      <div class="flex gap-4">
        <RigCard v-for="e in ['flat', 'raised', 'prominent']" :key="e" :elevation="e" class="flex-1">
          <RigText variant="overline" color="muted" class="mb-1 font-mono">{{ e }}</RigText>
          <RigText color="secondary">Card content at this elevation level.</RigText>
        </RigCard>
      </div>
    `,
  }),
}

export const WithHeaderAndFooter: Story = {
  name: 'Header & Footer',
  render: () => ({
    components: { RigCard, RigText, RigButton, RigBadge },
    template: `
      <RigCard class="max-w-sm">
        <template #header>
          <div class="flex items-center justify-between">
            <RigText variant="subheading">Project</RigText>
            <RigBadge tone="success" dot>Active</RigBadge>
          </div>
        </template>

        <RigText color="secondary">
          A design system that bridges token definitions with Vue 3 components,
          creating a cohesive visual language across applications.
        </RigText>

        <template #footer>
          <div class="flex gap-2">
            <RigButton size="sm" variant="outline">Details</RigButton>
            <RigButton size="sm">Open</RigButton>
          </div>
        </template>
      </RigCard>
    `,
  }),
}

export const Interactive: Story = {
  render: () => ({
    components: { RigCard, RigText, RigBadge },
    template: `
      <div class="flex gap-4">
        <RigCard v-for="i in 3" :key="i" interactive class="flex-1 cursor-pointer">
          <RigBadge size="sm" tone="neutral" variant="outline" class="mb-3">Category {{ i }}</RigBadge>
          <RigText variant="subheading" class="mb-1">Interactive Card {{ i }}</RigText>
          <RigText color="muted" variant="caption">Hover to see the shadow lift effect.</RigText>
        </RigCard>
      </div>
    `,
  }),
}

export const ContentShowcase: Story = {
  name: 'Content Showcase',
  render: () => ({
    components: { RigCard, RigText, RigButton, RigBadge },
    template: `
      <div class="grid grid-cols-2 gap-4 max-w-2xl">
        <RigCard>
          <div class="flex items-center gap-2 mb-3">
            <div class="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
              <span class="text-text-on-accent font-bold">A</span>
            </div>
            <div>
              <RigText variant="body" weight="semibold">Amulet Labs</RigText>
              <RigText variant="caption" color="muted">@amuletlabs</RigText>
            </div>
          </div>
          <RigText color="secondary">Building tools for developers who care about craft.</RigText>
        </RigCard>

        <RigCard elevation="prominent">
          <RigText variant="overline" color="accent" class="mb-2">Featured</RigText>
          <RigText variant="heading" class="mb-2">Hex + Rig</RigText>
          <RigText color="secondary" class="mb-4">A Gesamtkunstwerk design system.</RigText>
          <RigButton size="sm">Learn More</RigButton>
        </RigCard>
      </div>
    `,
  }),
}
