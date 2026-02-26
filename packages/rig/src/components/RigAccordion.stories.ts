import type { Meta, StoryObj } from '@storybook/vue3'
import RigAccordion from './RigAccordion.vue'

const meta = {
  title: 'Navigation/Accordion',
  component: RigAccordion,
  tags: ['autodocs'],
  argTypes: {
    multiple: { control: 'boolean' },
  },
} satisfies Meta<typeof RigAccordion>

export default meta
type Story = StoryObj<typeof meta>

const items = [
  {
    value: 'what',
    label: 'What is Hex?',
    content:
      'Hex is a design token engine that generates CSS custom properties, Tailwind presets, and VS Code themes from a single source of truth.',
  },
  {
    value: 'themes',
    label: 'How do themes work?',
    content:
      'Each theme defines color palettes for dark and light modes, along with typography, motion, spacing, and shape tokens. Themes are grouped into collections.',
  },
  {
    value: 'install',
    label: 'How do I install it?',
    content:
      'Install via pnpm: pnpm add @amulet-laboratories/hex @amulet-laboratories/hex-origins @amulet-laboratories/rig',
  },
]

export const Default: Story = {
  render: (args) => ({
    components: { RigAccordion },
    setup: () => ({ args }),
    template: '<RigAccordion v-bind="args" />',
  }),
  args: {
    items,
    multiple: false,
  },
}

export const Multiple: Story = {
  render: (args) => ({
    components: { RigAccordion },
    setup: () => ({ args }),
    template: '<RigAccordion v-bind="args" />',
  }),
  args: {
    items,
    multiple: true,
    defaultOpen: ['what'],
  },
}

export const WithDisabled: Story = {
  render: (args) => ({
    components: { RigAccordion },
    setup: () => ({ args }),
    template: '<RigAccordion v-bind="args" />',
  }),
  args: {
    items: [
      ...items,
      {
        value: 'advanced',
        label: 'Advanced configuration',
        content: 'Coming soon.',
        disabled: true,
      },
    ],
  },
}
