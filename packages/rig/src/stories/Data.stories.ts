import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import RigText from '../components/RigText.vue'
import RigButton from '../components/RigButton.vue'
import RigBadge from '../components/RigBadge.vue'
import RigStatus from '../components/RigStatus.vue'
import RigTable from '../components/RigTable.vue'

const meta = {
  title: 'Components/Data',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj

export const Table: Story = {
  name: 'RigTable',
  render: () => ({
    components: { RigText, RigButton, RigBadge, RigStatus, RigTable },
    setup() {
      const columns = [
        { key: 'name', label: 'Name', sortable: true },
        { key: 'category', label: 'Category', sortable: true },
        { key: 'status', label: 'Status', sortable: true },
        { key: 'url', label: 'URL' },
      ]

      const rows = [
        {
          id: 's-ink',
          name: 'amulet.ink',
          category: 'site',
          status: 'active',
          url: 'https://amulet.ink',
        },
        {
          id: 's-lab',
          name: 'labs.amulet.ink',
          category: 'site',
          status: 'active',
          url: 'https://labs.amulet.ink',
        },
        {
          id: 'x-hrg',
          name: 'hexrig.amulet.ink',
          category: 'software',
          status: 'active',
          url: 'https://hexrig.amulet.ink',
        },
        {
          id: 'e-htl',
          name: 'hotel.amulet.ink',
          category: 'engagement',
          status: 'wip',
          url: 'https://hotel.amulet.ink',
        },
        {
          id: 'i-twr',
          name: 'tower.amulet.ink',
          category: 'internal',
          status: 'wip',
          url: 'https://tower.amulet.ink',
        },
        {
          id: 's-pub',
          name: 'press.amulet.ink',
          category: 'site',
          status: 'pending',
          url: 'https://press.amulet.ink',
        },
        {
          id: 'x-cod',
          name: 'codex.amulet.ink',
          category: 'software',
          status: 'wip',
          url: 'https://codex.amulet.ink',
        },
      ]

      const sortBy = ref('name')
      const sortDir = ref<'asc' | 'desc'>('asc')

      const sortedRows = ref(rows)

      const handleSort = (key: string) => {
        sortBy.value = key
      }
      const handleSortDir = (dir: 'asc' | 'desc') => {
        sortDir.value = dir
        sortedRows.value = [...rows].sort((a, b) => {
          const av = String((a as Record<string, unknown>)[sortBy.value] ?? '')
          const bv = String((b as Record<string, unknown>)[sortBy.value] ?? '')
          return dir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
        })
      }

      return { columns, sortedRows, sortBy, sortDir, handleSort, handleSortDir }
    },
    template: `
      <div class="space-y-8">
        <div class="space-y-3">
          <RigText variant="overline" color="accent">Sortable table — repo registry</RigText>
          <div class="border border-border-subtle rounded overflow-hidden">
            <RigTable
              :columns="columns"
              :rows="sortedRows"
              row-key="id"
              :sort-by="sortBy"
              :sort-dir="sortDir"
              hoverable
              @update:sort-by="handleSort"
              @update:sort-dir="handleSortDir"
            >
              <template #cell-status="{ value }">
                <RigStatus :status="String(value)" :label="String(value)" size="sm" />
              </template>
              <template #cell-category="{ value }">
                <RigBadge variant="soft" :tone="value === 'software' ? 'accent' : value === 'site' ? 'info' : value === 'engagement' ? 'warning' : 'neutral'" size="sm">{{ value }}</RigBadge>
              </template>
              <template #cell-url="{ value }">
                <span class="text-accent text-xs font-mono">{{ value }}</span>
              </template>
            </RigTable>
          </div>
        </div>
      </div>
    `,
  }),
}

export const TableSelectable: Story = {
  name: 'RigTable — Selectable',
  render: () => ({
    components: { RigText, RigButton, RigTable },
    setup() {
      const columns = [
        { key: 'name', label: 'Name' },
        { key: 'role', label: 'Role' },
        { key: 'email', label: 'Email' },
      ]
      const rows = [
        { id: '1', name: 'Alice Chen', role: 'Engineer', email: 'alice@amulet.ink' },
        { id: '2', name: 'Bob Park', role: 'Designer', email: 'bob@amulet.ink' },
        { id: '3', name: 'Carol Diaz', role: 'PM', email: 'carol@amulet.ink' },
        { id: '4', name: 'Dan Kim', role: 'Engineer', email: 'dan@amulet.ink' },
      ]
      const selected = ref<string[]>([])

      return { columns, rows, selected }
    },
    template: `
      <div class="space-y-4">
        <RigText variant="overline" color="accent">Selectable rows</RigText>
        <RigText variant="caption" color="muted">Selected: {{ selected.length ? selected.join(', ') : 'none' }}</RigText>
        <div class="border border-border-subtle rounded overflow-hidden">
          <RigTable
            :columns="columns"
            :rows="rows"
            selectable
            v-model:selected="selected"
          />
        </div>
      </div>
    `,
  }),
}

export const TableExpandable: Story = {
  name: 'RigTable — Expandable',
  render: () => ({
    components: { RigText, RigTable, RigStatus },
    setup() {
      const columns = [
        { key: 'name', label: 'Repository' },
        { key: 'status', label: 'Status' },
        { key: 'stack', label: 'Stack' },
      ]
      const rows = [
        {
          id: 'x-hrg',
          name: 'hexrig.amulet.ink',
          status: 'active',
          stack: 'Vue 3, Vite, pnpm',
          detail:
            'Design system monorepo. Hex token engine, Rig component library, and documentation site.',
        },
        {
          id: 'x-cod',
          name: 'codex.amulet.ink',
          status: 'wip',
          stack: 'Vue 3, Vite',
          detail: 'Markdown editor with TTRPG preview and PDF export.',
        },
        {
          id: 'x-sal',
          name: 'salt.amulet.ink',
          status: 'wip',
          stack: 'Vue 3, Vite',
          detail: 'Atmospheric mock data library for development and testing.',
        },
      ]

      return { columns, rows }
    },
    template: `
      <div class="space-y-4">
        <RigText variant="overline" color="accent">Expandable rows</RigText>
        <div class="border border-border-subtle rounded overflow-hidden">
          <RigTable :columns="columns" :rows="rows" expandable>
            <template #cell-status="{ value }">
              <RigStatus :status="String(value)" :label="String(value)" size="sm" />
            </template>
            <template #expanded="{ row }">
              <RigText color="secondary" variant="caption">{{ row.detail }}</RigText>
            </template>
          </RigTable>
        </div>
      </div>
    `,
  }),
}

export const TableStates: Story = {
  name: 'RigTable — States',
  render: () => ({
    components: { RigText, RigTable },
    setup() {
      const columns = [
        { key: 'name', label: 'Name' },
        { key: 'value', label: 'Value' },
      ]
      return { columns }
    },
    template: `
      <div class="space-y-8">
        <div class="space-y-3">
          <RigText variant="overline" color="accent">Loading</RigText>
          <div class="border border-border-subtle rounded overflow-hidden">
            <RigTable :columns="columns" :rows="[]" loading />
          </div>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">Empty</RigText>
          <div class="border border-border-subtle rounded overflow-hidden">
            <RigTable
              :columns="columns"
              :rows="[]"
              empty-title="No data available"
              empty-description="Add items to see them listed here."
            />
          </div>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">Striped + compact</RigText>
          <div class="border border-border-subtle rounded overflow-hidden">
            <RigTable
              :columns="[
                { key: 'key', label: 'Token' },
                { key: 'value', label: 'Value' },
              ]"
              :rows="[
                { id: '1', key: 'surface-base', value: '#0f0d0a' },
                { id: '2', key: 'surface-raised', value: '#1a1714' },
                { id: '3', key: 'surface-sunken', value: '#0a0907' },
                { id: '4', key: 'accent', value: '#c9956d' },
                { id: '5', key: 'text-primary', value: '#f5f1ed' },
              ]"
              striped
              compact
            />
          </div>
        </div>
      </div>
    `,
  }),
}
