import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import RigText from '../components/RigText.vue'
import RigTree from '../components/RigTree.vue'
import RigSplit from '../components/RigSplit.vue'
import RigFooter from '../components/RigFooter.vue'

const meta = {
  title: 'Components/Structure',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj

export const Tree: Story = {
  name: 'RigTree',
  render: () => ({
    components: { RigText, RigTree },
    setup() {
      const nodes = [
        {
          id: 'sites',
          label: 'Sites',
          icon: 'mdi:web',
          children: [
            { id: 's-ink', label: 'amulet.ink' },
            { id: 's-lab', label: 'labs.amulet.ink' },
            { id: 's-pub', label: 'press.amulet.ink' },
          ],
        },
        {
          id: 'software',
          label: 'Software',
          icon: 'mdi:package-variant-closed',
          children: [
            { id: 'x-hrg', label: 'hexrig.amulet.ink' },
            { id: 'x-cod', label: 'codex.amulet.ink' },
            {
              id: 'x-tools',
              label: 'Tools',
              children: [
                { id: 'x-sal', label: 'salt.amulet.ink' },
                { id: 'x-run', label: 'rune.amulet.ink' },
              ],
            },
          ],
        },
        {
          id: 'engagements',
          label: 'Engagements',
          icon: 'mdi:briefcase-outline',
          children: [
            { id: 'e-htl', label: 'hotel.amulet.ink' },
            { id: 'e-cfe', label: 'coffee.amulet.ink' },
          ],
        },
      ]

      const selected = ref('')
      const expanded = ref(['sites', 'software'])

      return { nodes, selected, expanded }
    },
    template: `
      <div class="space-y-4 max-w-sm">
        <RigText variant="overline" color="accent">Repo tree</RigText>
        <div class="border border-border-subtle rounded p-2">
          <RigTree
            :nodes="nodes"
            v-model:selected="selected"
            v-model:expanded="expanded"
            selectable
          />
        </div>
        <RigText variant="caption" color="muted">Selected: {{ selected || 'none' }}</RigText>
      </div>
    `,
  }),
}

export const Split: Story = {
  name: 'RigSplit',
  parameters: { layout: 'fullscreen' },
  render: () => ({
    components: { RigText, RigSplit },
    template: `
      <div class="h-[400px]">
        <RigSplit :initial-size="280" :min-size="150" :max-size="500">
          <template #first>
            <div class="p-4 h-full bg-surface-sunken">
              <RigText variant="overline" color="accent">Sidebar panel</RigText>
              <RigText color="secondary" class="mt-2">
                Drag the handle to resize. Double-click to reset.
              </RigText>
            </div>
          </template>
          <template #second>
            <div class="p-4 h-full">
              <RigText variant="overline" color="accent">Main content</RigText>
              <RigText color="secondary" class="mt-2">
                This panel fills the remaining space.
              </RigText>
            </div>
          </template>
        </RigSplit>
      </div>
    `,
  }),
}

export const SplitVertical: Story = {
  name: 'RigSplit — Vertical',
  parameters: { layout: 'fullscreen' },
  render: () => ({
    components: { RigText, RigSplit },
    template: `
      <div class="h-[400px]">
        <RigSplit orientation="vertical" :initial-size="200" :min-size="100" :max-size="300">
          <template #first>
            <div class="p-4 bg-surface-sunken h-full">
              <RigText variant="overline" color="accent">Top panel</RigText>
            </div>
          </template>
          <template #second>
            <div class="p-4 h-full">
              <RigText variant="overline" color="accent">Bottom panel</RigText>
            </div>
          </template>
        </RigSplit>
      </div>
    `,
  }),
}

export const Footer: Story = {
  name: 'RigFooter',
  render: () => ({
    components: { RigText, RigFooter },
    template: `
      <div class="space-y-6">
        <div>
          <RigText variant="overline" color="accent">Default footer (bordered)</RigText>
          <RigFooter>
            <div class="flex items-center justify-between">
              <RigText variant="caption" color="muted">Amulet Laboratories</RigText>
              <RigText variant="caption" color="muted">v2.1.0</RigText>
            </div>
          </RigFooter>
        </div>
        <div>
          <RigText variant="overline" color="accent">Footer without border</RigText>
          <RigFooter :bordered="false">
            <RigText variant="caption" color="muted" align="center">Built with Hexrig</RigText>
          </RigFooter>
        </div>
      </div>
    `,
  }),
}
