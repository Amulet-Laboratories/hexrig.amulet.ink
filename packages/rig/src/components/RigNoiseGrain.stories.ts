import type { Meta, StoryObj } from '@storybook/vue3'
import RigNoiseGrain from './RigNoiseGrain.vue'

const meta = {
  title: 'Components/NoiseGrain',
  component: RigNoiseGrain,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Full-viewport SVG noise grain overlay. Provides physical texture — the sense of material beneath pixels. Applied as a fixed overlay with configurable opacity, frequency, and blend mode.',
      },
    },
  },
  argTypes: {
    opacity: {
      control: { type: 'range', min: 0, max: 0.1, step: 0.005 },
      description: 'Grain opacity (0–1)',
    },
    frequency: {
      control: { type: 'range', min: 0.3, max: 2.0, step: 0.1 },
      description: 'feTurbulence base frequency. Higher = finer grain.',
    },
    blend: {
      control: 'select',
      options: ['overlay', 'soft-light', 'multiply'],
      description: 'CSS mix-blend-mode',
    },
  },
} satisfies Meta<typeof RigNoiseGrain>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    opacity: 0.02,
    frequency: 0.7,
    blend: 'overlay',
  },
}

export const Parchment: Story = {
  args: {
    opacity: 0.02,
    frequency: 0.5,
    blend: 'overlay',
  },
  parameters: {
    docs: {
      description: { story: 'Hearth / Press — coarse, warm grain. Parchment.' },
    },
  },
}

export const TechnicalPaper: Story = {
  args: {
    opacity: 0.035,
    frequency: 0.9,
    blend: 'overlay',
  },
  parameters: {
    docs: {
      description: { story: 'Reef / Labs — fine, cool grain. Technical paper.' },
    },
  },
}

export const Sandpaper: Story = {
  args: {
    opacity: 0.04,
    frequency: 1.2,
    blend: 'overlay',
  },
  parameters: {
    docs: {
      description: {
        story: 'Ember / Workshop — dense, rough grain. Sandpaper. The most visible grain.',
      },
    },
  },
}

export const FilmGrain: Story = {
  args: {
    opacity: 0.02,
    frequency: 0.6,
    blend: 'overlay',
  },
  parameters: {
    docs: {
      description: { story: 'Abyss / Studio — fine, cool grain. Film grain on dark water.' },
    },
  },
}

export const MuseumWall: Story = {
  args: {
    opacity: 0.015,
    frequency: 0.8,
    blend: 'overlay',
  },
  parameters: {
    docs: {
      description: {
        story: 'Keep / Portfolio — minimal. The work is the texture; the frame disappears.',
      },
    },
  },
}

export const NearlyInvisible: Story = {
  args: {
    opacity: 0.01,
    frequency: 1.0,
    blend: 'overlay',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Slate / Software — nearly invisible. Just enough that the background is not a void.',
      },
    },
  },
}
