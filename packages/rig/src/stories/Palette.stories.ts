import type { Meta, StoryObj } from '@storybook/vue3'
import RigText from '../components/RigText.vue'
import RigSurface from '../components/RigSurface.vue'

const meta = {
  title: 'Showcase/Palette',
} satisfies Meta

export default meta
type Story = StoryObj

// All semantic color tokens to display
const surfaceTokens = [
  { name: 'surface-base', var: '--surface-base' },
  { name: 'surface-raised', var: '--surface-raised' },
  { name: 'surface-elevated', var: '--surface-elevated' },
  { name: 'surface-sunken', var: '--surface-sunken' },
  { name: 'surface-overlay', var: '--surface-overlay' },
]

const textTokens = [
  { name: 'text-primary', var: '--text-primary' },
  { name: 'text-secondary', var: '--text-secondary' },
  { name: 'text-muted', var: '--text-muted' },
  { name: 'text-inverse', var: '--text-inverse' },
  { name: 'text-link', var: '--text-link' },
  { name: 'text-on-accent', var: '--text-on-accent' },
]

const borderTokens = [
  { name: 'border-default', var: '--border-default' },
  { name: 'border-subtle', var: '--border-subtle' },
  { name: 'border-strong', var: '--border-strong' },
]

const accentTokens = [
  { name: 'accent-primary', var: '--accent-primary' },
  { name: 'accent-secondary', var: '--accent-secondary' },
  { name: 'accent-hover', var: '--accent-hover' },
  { name: 'accent-active', var: '--accent-active' },
  { name: 'accent-muted', var: '--accent-muted' },
]

const statusTokens = [
  { name: 'status-success', var: '--status-success' },
  { name: 'status-warning', var: '--status-warning' },
  { name: 'status-error', var: '--status-error' },
  { name: 'status-info', var: '--status-info' },
]

const focusTokens = [
  { name: 'focus-ring', var: '--focus-ring' },
  { name: 'focus-outline', var: '--focus-outline' },
]

export const ColorPalette: Story = {
  render: () => ({
    components: { RigText, RigSurface },
    setup() {
      return {
        sections: [
          { title: 'Surfaces', tokens: surfaceTokens },
          { title: 'Text', tokens: textTokens },
          { title: 'Borders', tokens: borderTokens },
          { title: 'Accent', tokens: accentTokens },
          { title: 'Status', tokens: statusTokens },
          { title: 'Focus', tokens: focusTokens },
        ],
      }
    },
    template: `
      <div class="space-y-8">
        <RigText variant="display" class="mb-2">Color Palette</RigText>
        <RigText color="secondary" class="mb-6">
          All semantic color tokens from the active Hex theme. Switch themes and modes
          using the toolbar above to compare palettes.
        </RigText>

        <div v-for="section in sections" :key="section.title" class="space-y-3">
          <RigText variant="overline" color="accent">{{ section.title }}</RigText>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            <div v-for="token in section.tokens" :key="token.name">
              <div
                class="h-16 rounded-theme border border-border-subtle mb-2"
                :style="{ backgroundColor: 'var(' + token.var + ')' }"
              />
              <RigText variant="caption" class="font-mono">{{ token.name }}</RigText>
              <RigText variant="caption" color="muted" class="font-mono text-xs">{{ token.var }}</RigText>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}
