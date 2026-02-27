import type { Meta, StoryObj } from '@storybook/vue3'
import RigOrnament from './RigOrnament.vue'

const meta = {
  title: 'Components/Ornament',
  component: RigOrnament,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Scroll-driven SVG line-drawing ornament. Each motif family generates a distinct procedural path vocabulary. Draws itself on scroll via IntersectionObserver + strokeDashoffset animation. Respects prefers-reduced-motion.',
      },
    },
  },
  argTypes: {
    motif: {
      control: 'select',
      options: [
        'geological',
        'technical',
        'typographic',
        'toolmarks',
        'waveform',
        'organic',
        'minimal',
      ],
      description: 'Motif family — determines the procedural path vocabulary',
    },
    color: {
      control: 'color',
      description: 'Stroke color. Defaults to currentColor.',
    },
    animated: {
      control: 'boolean',
      description: 'Enable scroll-triggered draw animation',
    },
    strokeWidth: {
      control: { type: 'range', min: 0.5, max: 4, step: 0.5 },
      description: 'SVG stroke width',
    },
    width: {
      control: { type: 'range', min: 200, max: 1200, step: 100 },
      description: 'SVG viewBox width',
    },
    height: {
      control: { type: 'range', min: 20, max: 120, step: 10 },
      description: 'SVG viewBox height',
    },
    seed: {
      control: { type: 'number' },
      description: 'PRNG seed for reproducible paths',
    },
  },
} satisfies Meta<typeof RigOrnament>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    motif: 'minimal',
    animated: true,
    strokeWidth: 1.5,
    width: 800,
    height: 60,
  },
}

export const Geological: Story = {
  args: {
    motif: 'geological',
    color: '#f9b0a2',
    animated: true,
    strokeWidth: 1.5,
  },
  parameters: {
    docs: {
      description: {
        story: 'Cove / Entrance — ridgelines, strata, cave formations. Smooth, flowing stroke.',
      },
    },
  },
}

export const Technical: Story = {
  args: {
    motif: 'technical',
    color: '#40c0b8',
    animated: true,
    strokeWidth: 1.5,
  },
  parameters: {
    docs: {
      description: {
        story: 'Reef / Labs — clean geometric forms, circuit traces, measurement marks.',
      },
    },
  },
}

export const Typographic: Story = {
  args: {
    motif: 'typographic',
    color: '#d4a840',
    animated: true,
    strokeWidth: 1.5,
  },
  parameters: {
    docs: {
      description: {
        story: 'Hearth / Press — illuminated letter fragments, pilcrow ornaments, rule lines.',
      },
    },
  },
}

export const Toolmarks: Story = {
  args: {
    motif: 'toolmarks',
    color: '#e04030',
    animated: true,
    strokeWidth: 2,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Ember / Workshop — slightly uneven strokes, cross-hatching. Deliberate imperfection.',
      },
    },
  },
}

export const Waveform: Story = {
  args: {
    motif: 'waveform',
    color: '#aef66d',
    animated: true,
    strokeWidth: 1,
  },
  parameters: {
    docs: {
      description: {
        story: 'Abyss / Studio — sine curves, spectral lines. Electric green on navy.',
      },
    },
  },
}

export const Organic: Story = {
  args: {
    motif: 'organic',
    color: '#7cba7e',
    animated: true,
    strokeWidth: 1.5,
  },
  parameters: {
    docs: {
      description: {
        story: 'Grove / Interactive — branching lines, leaf veins, connecting nodes.',
      },
    },
  },
}

export const AllMotifs: Story = {
  render: () => ({
    components: { RigOrnament },
    template: `
      <div class="space-y-8 p-4">
        <div v-for="motif in ['geological', 'technical', 'typographic', 'toolmarks', 'waveform', 'organic', 'minimal']" :key="motif">
          <p class="text-sm text-text-muted font-mono mb-2">{{ motif }}</p>
          <RigOrnament :motif="motif" :animated="false" />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'All seven motif families rendered side by side, static (no animation).',
      },
    },
  },
}

export const Static: Story = {
  args: {
    motif: 'geological',
    animated: false,
    strokeWidth: 1.5,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Static rendering — no scroll animation. Used in 404 pages and reduced-motion contexts.',
      },
    },
  },
}
