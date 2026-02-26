import type { Meta, StoryObj } from '@storybook/vue3'
import RigSurface from './RigSurface.vue'
import RigText from './RigText.vue'

const meta = {
  title: 'Components/Surface',
  component: RigSurface,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Semantic background primitive. Four elevation levels (sunken, base, raised, overlay), configurable border and padding, rounded corners, and polymorphic HTML element via `as`.',
      },
    },
  },
  argTypes: {
    elevation: {
      control: 'select',
      options: ['sunken', 'base', 'raised', 'overlay'],
    },
    border: {
      control: 'select',
      options: [false, true, 'subtle', 'default', 'strong'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
    rounded: { control: 'boolean' },
    as: {
      control: 'select',
      options: ['div', 'section', 'article', 'aside', 'main', 'nav', 'header', 'footer'],
    },
  },
} satisfies Meta<typeof RigSurface>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { RigSurface, RigText },
    setup: () => ({ args }),
    template: `
      <RigSurface v-bind="args">
        <RigText>Content on a surface</RigText>
      </RigSurface>
    `,
  }),
  args: {
    elevation: 'raised',
    border: false,
    padding: 'md',
  },
}

export const Elevations: Story = {
  render: () => ({
    components: { RigSurface, RigText },
    template: `
      <div class="flex flex-col gap-4">
        <RigSurface v-for="e in ['sunken', 'base', 'raised', 'overlay']" :key="e" :elevation="e" padding="md" border>
          <RigText variant="caption" color="muted" class="font-mono">{{ e }}</RigText>
          <RigText>Surface content at the {{ e }} elevation.</RigText>
        </RigSurface>
      </div>
    `,
  }),
}

export const BorderVariants: Story = {
  render: () => ({
    components: { RigSurface, RigText },
    template: `
      <div class="flex flex-col gap-4">
        <RigSurface v-for="b in ['subtle', 'default', 'strong']" :key="b" elevation="raised" padding="md" :border="b">
          <RigText variant="caption" color="muted" class="font-mono">border="{{ b }}"</RigText>
        </RigSurface>
      </div>
    `,
  }),
}

export const PaddingScale: Story = {
  render: () => ({
    components: { RigSurface, RigText },
    template: `
      <div class="flex flex-col gap-4">
        <RigSurface v-for="p in ['none', 'sm', 'md', 'lg', 'xl']" :key="p" elevation="raised" :padding="p" border>
          <RigText variant="caption" color="muted" class="font-mono">padding="{{ p }}"</RigText>
        </RigSurface>
      </div>
    `,
  }),
}

export const Nested: Story = {
  render: () => ({
    components: { RigSurface, RigText },
    template: `
      <RigSurface elevation="base" padding="lg" border>
        <RigText variant="heading" class="mb-4">Outer surface</RigText>
        <RigSurface elevation="raised" padding="md" border="subtle">
          <RigText variant="subheading" class="mb-2">Inner surface</RigText>
          <RigSurface elevation="overlay" padding="sm" border>
            <RigText variant="caption" color="muted">Deeply nested</RigText>
          </RigSurface>
        </RigSurface>
      </RigSurface>
    `,
  }),
}
