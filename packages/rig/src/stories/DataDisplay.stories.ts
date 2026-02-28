import type { Meta, StoryObj } from '@storybook/vue3'
import RigText from '../components/RigText.vue'
import RigStat from '../components/RigStat.vue'
import RigMetadata from '../components/RigMetadata.vue'
import RigList from '../components/RigList.vue'
import RigTimeline from '../components/RigTimeline.vue'

const meta = {
  title: 'Components/Data Display',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj

export const Stat: Story = {
  name: 'RigStat',
  render: () => ({
    components: { RigText, RigStat },
    template: `
      <div class="space-y-8">
        <RigText variant="overline" color="accent">Stats</RigText>
        <div class="grid grid-cols-3 gap-6">
          <RigStat label="Repositories" :value="22" trend="up" trend-label="+3" description="Active repos across all categories" />
          <RigStat label="Components" :value="48" trend="up" trend-label="+8" icon="mdi:puzzle-outline" />
          <RigStat label="Test Coverage" value="72%" trend="flat" trend-label="0%" />
        </div>
        <div class="grid grid-cols-2 gap-6">
          <RigStat label="Deploy Failures" :value="0" trend="down" trend-label="-2" size="lg" />
          <RigStat label="Open PRs" :value="5" size="sm" />
        </div>
      </div>
    `,
  }),
}

export const Metadata: Story = {
  name: 'RigMetadata',
  render: () => ({
    components: { RigText, RigMetadata },
    setup() {
      const items = [
        { label: 'Package', value: '@amulet-laboratories/rig' },
        { label: 'Version', value: '2.1.0', type: 'badge' as const, tone: 'accent' as const },
        { label: 'Status', value: 'Active', type: 'status' as const, tone: 'success' as const },
        { label: 'License', value: 'MIT' },
        { label: 'Registry', value: 'GitHub Packages', type: 'link' as const, href: 'https://npm.pkg.github.com' },
        { label: 'Components', value: 48 },
      ]
      return { items }
    },
    template: `
      <div class="space-y-8">
        <div class="space-y-3">
          <RigText variant="overline" color="accent">2-column grid (default)</RigText>
          <RigMetadata :items="items" />
        </div>
        <div class="space-y-3">
          <RigText variant="overline" color="accent">3-column with separators</RigText>
          <RigMetadata :items="items" :columns="3" separator />
        </div>
        <div class="space-y-3">
          <RigText variant="overline" color="accent">Horizontal orientation</RigText>
          <RigMetadata :items="items.slice(0, 3)" :columns="1" orientation="horizontal" />
        </div>
      </div>
    `,
  }),
}

export const List: Story = {
  name: 'RigList',
  render: () => ({
    components: { RigText, RigList },
    setup() {
      const items = [
        { id: 'x-hrg', label: 'hexrig.amulet.ink', description: 'Design system monorepo', icon: 'mdi:puzzle-outline', meta: 'active' },
        { id: 'x-cod', label: 'codex.amulet.ink', description: 'Markdown editor with TTRPG preview', icon: 'mdi:book-open-outline', meta: 'wip' },
        { id: 'x-sal', label: 'salt.amulet.ink', description: 'Atmospheric mock data library', icon: 'mdi:flask-outline', meta: 'wip' },
        { id: 'x-run', label: 'rune.amulet.ink', description: 'Deterministic SVG glyph generator', icon: 'mdi:draw', meta: 'wip' },
        { id: 'x-vrd', label: 'vrd.amulet.ink', description: 'Wireless VR session manager', icon: 'mdi:virtual-reality', meta: 'wip' },
      ]
      return { items }
    },
    template: `
      <div class="space-y-8 max-w-md">
        <div class="space-y-3">
          <RigText variant="overline" color="accent">Default list</RigText>
          <div class="border border-border-subtle rounded overflow-hidden">
            <RigList :items="items" hoverable />
          </div>
        </div>
        <div class="space-y-3">
          <RigText variant="overline" color="accent">Compact (sm) without dividers</RigText>
          <RigList :items="items.slice(0, 3)" size="sm" :divided="false" />
        </div>
      </div>
    `,
  }),
}

export const Timeline: Story = {
  name: 'RigTimeline',
  render: () => ({
    components: { RigText, RigTimeline },
    setup() {
      const items = [
        { id: '1', label: 'Project created', description: 'Initial repository scaffolded', timestamp: 'Jan 15, 2026', tone: 'accent' as const },
        { id: '2', label: 'v1.0.0 released', description: 'First stable release to GitHub Packages', timestamp: 'Feb 1, 2026', tone: 'success' as const },
        { id: '3', label: 'Breaking changes identified', description: 'useTheme API renamed, brand components removed', timestamp: 'Feb 20, 2026', tone: 'warning' as const },
        { id: '4', label: 'v2.0.0 published', description: 'Major version with token engine rewrite', timestamp: 'Feb 27, 2026', tone: 'success' as const },
        { id: '5', label: 'Tier 2 build started', timestamp: 'Feb 28, 2026', tone: 'info' as const },
      ]
      return { items }
    },
    template: `
      <div class="space-y-8">
        <div class="space-y-3">
          <RigText variant="overline" color="accent">Vertical timeline</RigText>
          <RigTimeline :items="items" />
        </div>
        <div class="space-y-3">
          <RigText variant="overline" color="accent">Horizontal timeline</RigText>
          <RigTimeline :items="items.slice(0, 3)" orientation="horizontal" />
        </div>
      </div>
    `,
  }),
}
