import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import RigText from '../components/RigText.vue'
import RigButton from '../components/RigButton.vue'
import RigInput from '../components/RigInput.vue'
import RigBadge from '../components/RigBadge.vue'
import { useKeyboard } from '../composables/useKeyboard'
import { useClipboard } from '../composables/useClipboard'
import { useLocalStorage } from '../composables/useLocalStorage'
import { useBreakpoint } from '../composables/useBreakpoint'
import { useSort } from '../composables/useSort'
import { useFilter } from '../composables/useFilter'

const meta = {
  title: 'Composables',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj

export const Keyboard: Story = {
  name: 'useKeyboard',
  render: () => ({
    components: { RigText },
    setup() {
      const log = ref<string[]>([])
      const keyboard = useKeyboard()

      const addLog = (msg: string) => {
        log.value = [`${new Date().toLocaleTimeString()} — ${msg}`, ...log.value].slice(0, 10)
      }

      keyboard.register('mod+k', () => addLog('mod+k — Command palette'), {
        description: 'Open command palette',
      })
      keyboard.register('mod+s', () => addLog('mod+s — Save'), {
        description: 'Save document',
      })
      keyboard.register('mod+shift+p', () => addLog('mod+shift+p — Quick actions'), {
        description: 'Quick actions',
      })
      keyboard.register('escape', () => addLog('Escape — Dismiss'), {
        description: 'Dismiss',
        global: true,
      })

      return { log, keyboard }
    },
    template: `
      <div class="space-y-6 max-w-lg">
        <div class="space-y-2">
          <RigText variant="heading">useKeyboard</RigText>
          <RigText color="secondary">
            Global keyboard shortcut registration. Press the shortcuts below to see them fire.
            The <code class="font-mono text-accent text-xs">mod</code> key maps to Cmd on macOS and Ctrl on other platforms.
          </RigText>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">Registered shortcuts</RigText>
          <div class="space-y-1.5">
            <div
              v-for="shortcut in keyboard.shortcuts.value"
              :key="shortcut.keys"
              class="flex items-center justify-between rounded border border-border-subtle px-3 py-2"
            >
              <RigText variant="caption" color="secondary">{{ shortcut.description ?? shortcut.keys }}</RigText>
              <code class="text-xs font-mono text-accent bg-accent-muted px-1.5 py-0.5 rounded">{{ shortcut.keys }}</code>
            </div>
          </div>
        </div>

        <div class="space-y-3">
          <RigText variant="overline" color="accent">Event log</RigText>
          <div class="rounded border border-border-subtle p-3 min-h-[120px] bg-surface-sunken">
            <RigText v-if="log.length === 0" variant="caption" color="muted">Press a shortcut to see it logged here.</RigText>
            <div v-for="(entry, i) in log" :key="i">
              <RigText variant="mono" color="secondary" class="text-xs">{{ entry }}</RigText>
            </div>
          </div>
        </div>

        <RigText variant="caption" color="muted">
          Shortcuts are automatically cleaned up when the component unmounts via onScopeDispose.
          Non-global shortcuts are suppressed when an input, textarea, or contenteditable element is focused.
        </RigText>
      </div>
    `,
  }),
}

export const Clipboard: Story = {
  name: 'useClipboard',
  render: () => ({
    components: { RigText, RigButton },
    setup() {
      const { copy, copied, isSupported } = useClipboard()
      const sampleText = 'pnpm add @amulet-laboratories/rig'
      return { copy, copied, isSupported, sampleText }
    },
    template: `
      <div class="space-y-6 max-w-lg">
        <div class="space-y-2">
          <RigText variant="heading">useClipboard</RigText>
          <RigText color="secondary">Copy text to clipboard with feedback state.</RigText>
        </div>
        <div class="flex items-center gap-3 rounded border border-border-subtle px-3 py-2 bg-surface-sunken">
          <code class="flex-1 text-sm font-mono text-text-primary">{{ sampleText }}</code>
          <RigButton size="sm" variant="outline" @click="copy(sampleText)">
            {{ copied ? 'Copied' : 'Copy' }}
          </RigButton>
        </div>
        <RigText variant="caption" color="muted">
          Supported: {{ isSupported }}. The "copied" state resets after 2 seconds.
        </RigText>
      </div>
    `,
  }),
}

export const LocalStorage: Story = {
  name: 'useLocalStorage',
  render: () => ({
    components: { RigText, RigButton, RigInput },
    setup() {
      const { value, remove } = useLocalStorage('rig-demo-name', 'Amulet')
      return { value, remove }
    },
    template: `
      <div class="space-y-6 max-w-lg">
        <div class="space-y-2">
          <RigText variant="heading">useLocalStorage</RigText>
          <RigText color="secondary">Reactive localStorage with cross-tab sync. The value persists across page reloads.</RigText>
        </div>
        <div class="space-y-3">
          <RigInput v-model="value" label="Stored value" placeholder="Type something..." />
          <RigButton size="sm" variant="outline" tone="danger" @click="remove">Reset to default</RigButton>
        </div>
        <RigText variant="caption" color="muted">
          Key: <code class="font-mono text-accent">rig-demo-name</code>.
          Current value: <code class="font-mono text-accent">{{ value }}</code>
        </RigText>
      </div>
    `,
  }),
}

export const Breakpoint: Story = {
  name: 'useBreakpoint',
  render: () => ({
    components: { RigText, RigBadge },
    setup() {
      const { current, gte, lt } = useBreakpoint()
      return { current, isDesktop: gte('lg'), isMobile: lt('md') }
    },
    template: `
      <div class="space-y-6 max-w-lg">
        <div class="space-y-2">
          <RigText variant="heading">useBreakpoint</RigText>
          <RigText color="secondary">Reactive Tailwind breakpoint tracking. Resize the window to see changes.</RigText>
        </div>
        <div class="space-y-3">
          <div class="flex items-center gap-2">
            <RigText color="secondary">Current breakpoint:</RigText>
            <RigBadge variant="solid" tone="accent">{{ current }}</RigBadge>
          </div>
          <div class="flex items-center gap-2">
            <RigText color="secondary">Desktop (>= lg):</RigText>
            <RigBadge :tone="isDesktop ? 'success' : 'neutral'" variant="soft">{{ isDesktop }}</RigBadge>
          </div>
          <div class="flex items-center gap-2">
            <RigText color="secondary">Mobile (&lt; md):</RigText>
            <RigBadge :tone="isMobile ? 'warning' : 'neutral'" variant="soft">{{ isMobile }}</RigBadge>
          </div>
        </div>
      </div>
    `,
  }),
}

export const Sort: Story = {
  name: 'useSort',
  render: () => ({
    components: { RigText, RigButton },
    setup() {
      const items = ref([
        { name: 'hexrig.amulet.ink', stars: 48 },
        { name: 'codex.amulet.ink', stars: 12 },
        { name: 'salt.amulet.ink', stars: 7 },
        { name: 'rune.amulet.ink', stars: 23 },
        { name: 'amulet.ink', stars: 35 },
      ])
      const { sorted, sortBy, sortDir, toggleSort } = useSort(items, 'name')
      return { sorted, sortBy, sortDir, toggleSort }
    },
    template: `
      <div class="space-y-6 max-w-lg">
        <div class="space-y-2">
          <RigText variant="heading">useSort</RigText>
          <RigText color="secondary">Reactive array sorting by key and direction.</RigText>
        </div>
        <div class="flex gap-2">
          <RigButton size="sm" :variant="sortBy === 'name' ? 'solid' : 'outline'" @click="toggleSort('name')">
            Name {{ sortBy === 'name' ? (sortDir === 'asc' ? '↑' : '↓') : '' }}
          </RigButton>
          <RigButton size="sm" :variant="sortBy === 'stars' ? 'solid' : 'outline'" @click="toggleSort('stars')">
            Stars {{ sortBy === 'stars' ? (sortDir === 'asc' ? '↑' : '↓') : '' }}
          </RigButton>
        </div>
        <div class="space-y-1">
          <div v-for="item in sorted" :key="item.name" class="flex justify-between px-3 py-1.5 rounded border border-border-subtle">
            <RigText variant="caption">{{ item.name }}</RigText>
            <RigText variant="caption" color="muted">{{ item.stars }}</RigText>
          </div>
        </div>
      </div>
    `,
  }),
}

export const Filter: Story = {
  name: 'useFilter',
  render: () => ({
    components: { RigText, RigInput, RigBadge },
    setup() {
      const items = ref([
        { name: 'hexrig.amulet.ink', category: 'software', status: 'active' },
        { name: 'codex.amulet.ink', category: 'software', status: 'wip' },
        { name: 'amulet.ink', category: 'site', status: 'active' },
        { name: 'labs.amulet.ink', category: 'site', status: 'active' },
        { name: 'hotel.amulet.ink', category: 'engagement', status: 'wip' },
        { name: 'tower.amulet.ink', category: 'internal', status: 'wip' },
      ])
      const { filtered, query, activeCount } = useFilter(items, ['name', 'category', 'status'], 150)
      return { filtered, query, activeCount }
    },
    template: `
      <div class="space-y-6 max-w-lg">
        <div class="space-y-2">
          <RigText variant="heading">useFilter</RigText>
          <RigText color="secondary">Reactive array filtering with text search and debounce (150ms).</RigText>
        </div>
        <RigInput v-model="query" label="Search" placeholder="Try 'software', 'active', or 'hotel'..." />
        <RigText variant="caption" color="muted">
          Showing {{ filtered.length }} of 6 items ({{ activeCount }} active filter{{ activeCount !== 1 ? 's' : '' }})
        </RigText>
        <div class="space-y-1">
          <div v-for="item in filtered" :key="item.name" class="flex items-center justify-between px-3 py-1.5 rounded border border-border-subtle">
            <RigText variant="caption">{{ item.name }}</RigText>
            <div class="flex gap-1">
              <RigBadge size="sm" variant="soft" tone="neutral">{{ item.category }}</RigBadge>
              <RigBadge size="sm" variant="soft" :tone="item.status === 'active' ? 'success' : 'warning'">{{ item.status }}</RigBadge>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}
