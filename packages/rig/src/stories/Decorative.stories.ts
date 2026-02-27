import type { Meta, StoryObj } from '@storybook/vue3'
import RigText from '../components/RigText.vue'
import RigNoiseGrain from '../components/RigNoiseGrain.vue'
import RigSurface from '../components/RigSurface.vue'

const meta = {
  title: 'Components/Decorative',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj

export const NoiseGrain: Story = {
  name: 'RigNoiseGrain',
  render: () => ({
    components: { RigText, RigNoiseGrain, RigSurface },
    template: `
      <div class="space-y-6">
        <RigText variant="overline" color="accent">RigNoiseGrain — SVG noise texture overlay</RigText>
        <RigText color="secondary" variant="caption">Add as a sibling or child element. Uses position:absolute, pointer-events:none, inset:0.</RigText>

        <div class="space-y-4">
          <div class="space-y-2">
            <RigText variant="caption" color="muted">opacity: 0.02 (default)</RigText>
            <div class="relative h-32 rounded bg-surface-raised border border-border-subtle overflow-hidden">
              <RigNoiseGrain :opacity="0.02" />
              <div class="p-4"><RigText color="secondary">Subtle texture</RigText></div>
            </div>
          </div>

          <div class="space-y-2">
            <RigText variant="caption" color="muted">opacity: 0.06</RigText>
            <div class="relative h-32 rounded bg-surface-raised border border-border-subtle overflow-hidden">
              <RigNoiseGrain :opacity="0.06" />
              <div class="p-4"><RigText color="secondary">Visible texture</RigText></div>
            </div>
          </div>

          <div class="space-y-2">
            <RigText variant="caption" color="muted">blend: soft-light, high frequency</RigText>
            <div class="relative h-32 rounded bg-accent overflow-hidden">
              <RigNoiseGrain :opacity="0.08" blend="soft-light" :frequency="1.2" />
              <div class="p-4"><RigText color="on-accent">On accent surface</RigText></div>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}
