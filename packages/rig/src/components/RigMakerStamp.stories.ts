import type { Meta, StoryObj } from '@storybook/vue3'
import RigMakerStamp from './RigMakerStamp.vue'

const meta = {
  title: 'Components/MakerStamp',
  component: RigMakerStamp,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          "The Amulet maker's mark. Inline SVG using currentColor for theme-aware rendering. The architectural thread that ties all rooms together.",
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'range', min: 8, max: 80, step: 2 },
      description: 'Mark size in pixels',
    },
    href: {
      control: 'text',
      description: 'When provided, wraps the mark in an anchor tag',
    },
  },
} satisfies Meta<typeof RigMakerStamp>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: 20,
  },
}

export const Small: Story = {
  args: {
    size: 12,
  },
  parameters: {
    docs: {
      description: { story: 'Compact stamp for inline usage in footers.' },
    },
  },
}

export const Large: Story = {
  args: {
    size: 48,
  },
  parameters: {
    docs: {
      description: { story: 'Larger mark for hero or about sections.' },
    },
  },
}

export const LinkedToHome: Story = {
  args: {
    size: 20,
    href: 'https://amulet.ink',
  },
  parameters: {
    docs: {
      description: { story: 'Wrapped in an anchor — the way home from any room.' },
    },
  },
}

export const FooterContext: Story = {
  render: (args) => ({
    components: { RigMakerStamp },
    setup() {
      return { args }
    },
    template: `
      <footer class="border-t border-border-subtle px-6 py-8">
        <div class="flex items-center justify-center gap-3">
          <RigMakerStamp v-bind="args" />
          <a href="https://amulet.ink" class="text-xs text-text-muted tracking-wide font-body">amulet.ink</a>
        </div>
      </footer>
    `,
  }),
  args: {
    size: 16,
    href: 'https://amulet.ink',
  },
  parameters: {
    docs: {
      description: {
        story: 'The stamp in its natural habitat — the footer, paired with the way-home link.',
      },
    },
  },
}
