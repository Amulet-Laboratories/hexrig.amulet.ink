import type { Meta, StoryObj } from '@storybook/vue3'
import RigText from '../components/RigText.vue'
import RigDivider from '../components/RigDivider.vue'

const meta = {
  title: 'Showcase/Typography',
} satisfies Meta

export default meta
type Story = StoryObj

export const TypeScale: Story = {
  name: 'Type Scale',
  render: () => ({
    components: { RigText, RigDivider },
    template: `
      <div class="space-y-8">
        <RigText variant="display" class="mb-2">Typography</RigText>
        <RigText color="secondary" class="mb-6">
          The type scale uses heading and body font families from Hex tokens.
          Switch themes to compare how different typefaces affect the hierarchy.
        </RigText>

        <RigDivider label="Variants" />

        <div class="space-y-6">
          <div v-for="v in ['display', 'heading', 'subheading', 'body', 'caption', 'overline', 'mono']" :key="v">
            <RigText variant="caption" color="muted" class="font-mono mb-1">{{ v }}</RigText>
            <RigText :variant="v">
              The quick brown fox jumps over the lazy dog
            </RigText>
          </div>
        </div>

        <RigDivider label="Colors" />

        <div class="space-y-3">
          <div v-for="c in ['primary', 'secondary', 'muted', 'accent', 'success', 'warning', 'error', 'info']" :key="c" class="flex items-center gap-4">
            <span class="w-24 text-right">
              <RigText variant="mono" color="muted" class="text-xs">{{ c }}</RigText>
            </span>
            <RigText :color="c">The quick brown fox jumps over the lazy dog</RigText>
          </div>
        </div>

        <RigDivider label="Weights" />

        <div class="space-y-3">
          <div v-for="w in ['light', 'normal', 'medium', 'semibold', 'bold']" :key="w" class="flex items-center gap-4">
            <span class="w-24 text-right">
              <RigText variant="mono" color="muted" class="text-xs">{{ w }}</RigText>
            </span>
            <RigText variant="heading" :weight="w">Heading in {{ w }} weight</RigText>
          </div>
        </div>

        <RigDivider label="Alignment" />

        <div class="space-y-4 max-w-lg">
          <RigText align="left">Left-aligned text paragraph.</RigText>
          <RigText align="center">Center-aligned text paragraph.</RigText>
          <RigText align="right">Right-aligned text paragraph.</RigText>
        </div>

        <RigDivider label="Semantic Elements" />

        <div class="space-y-4 max-w-lg">
          <RigText as="h1" variant="display">h1 — Display</RigText>
          <RigText as="h2" variant="heading">h2 — Heading</RigText>
          <RigText as="h3" variant="subheading">h3 — Subheading</RigText>
          <RigText as="p" variant="body">p — Body paragraph with longer text to demonstrate line height and readability across different themes and font stacks.</RigText>
          <RigText as="code" variant="mono">code — Monospaced inline element</RigText>
          <RigText as="label" variant="caption" weight="medium">label — Form label caption</RigText>
        </div>
      </div>
    `,
  }),
}
