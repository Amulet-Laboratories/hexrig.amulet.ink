import type { Meta, StoryObj } from '@storybook/vue3'
import RigText from '../components/RigText.vue'
import RigButton from '../components/RigButton.vue'
import RigInput from '../components/RigInput.vue'
import RigSurface from '../components/RigSurface.vue'
import RigCard from '../components/RigCard.vue'
import RigBadge from '../components/RigBadge.vue'
import RigAlert from '../components/RigAlert.vue'
import RigDivider from '../components/RigDivider.vue'
import RigThemeProvider from '../components/RigThemeProvider.vue'

const meta = {
  title: 'Showcase/Editor Preview',
} satisfies Meta

export default meta
type Story = StoryObj

export const EditorPreview: Story = {
  name: 'Editor Layout',
  render: () => ({
    components: {
      RigText, RigButton, RigInput, RigSurface, RigCard,
      RigBadge, RigAlert, RigDivider, RigThemeProvider,
    },
    template: `
      <div class="space-y-6">
        <RigText variant="display" class="mb-1">Editor Preview</RigText>
        <RigText color="secondary" class="mb-6">
          A mock code editor layout demonstrating how Hex syntax tokens and Rig components
          work together. Switch themes to see how each palette transforms the experience.
        </RigText>

        <!-- Editor chrome -->
        <RigSurface elevation="raised" padding="none" border class="overflow-hidden">
          <!-- Title bar -->
          <div class="flex items-center justify-between px-4 py-2 border-b border-border-subtle bg-surface-sunken">
            <div class="flex items-center gap-2">
              <div class="flex gap-1.5">
                <span class="w-3 h-3 rounded-full bg-status-error" />
                <span class="w-3 h-3 rounded-full bg-status-warning" />
                <span class="w-3 h-3 rounded-full bg-status-success" />
              </div>
              <RigText variant="caption" color="muted" class="ml-2">main.ts — hexrig</RigText>
            </div>
            <div class="flex items-center gap-2">
              <RigBadge tone="success" size="sm" dot>main</RigBadge>
              <RigBadge tone="neutral" size="sm" variant="outline">TypeScript</RigBadge>
            </div>
          </div>

          <!-- Editor body -->
          <div class="flex">
            <!-- Sidebar -->
            <div class="w-48 border-r border-border-subtle bg-surface-sunken p-3 space-y-2">
              <RigText variant="overline" color="muted" class="mb-2">Explorer</RigText>
              <div class="space-y-0.5">
                <div class="px-2 py-1 rounded text-sm text-text-muted hover:bg-surface-base cursor-pointer">📁 src</div>
                <div class="px-2 py-1 rounded text-sm text-text-muted hover:bg-surface-base cursor-pointer ml-3">📁 components</div>
                <div class="px-2 py-1 rounded text-sm text-accent bg-accent-muted cursor-pointer ml-6">📄 main.ts</div>
                <div class="px-2 py-1 rounded text-sm text-text-muted hover:bg-surface-base cursor-pointer ml-3">📁 utils</div>
                <div class="px-2 py-1 rounded text-sm text-text-muted hover:bg-surface-base cursor-pointer">📁 tests</div>
                <div class="px-2 py-1 rounded text-sm text-text-muted hover:bg-surface-base cursor-pointer">📄 package.json</div>
              </div>
            </div>

            <!-- Code area -->
            <div class="flex-1 p-4 font-mono text-sm leading-relaxed bg-surface-base min-h-[320px]">
              <div class="flex">
                <div class="w-8 text-right pr-3 select-none">
                  <div v-for="n in 14" :key="n" class="text-text-muted/40">{{ n }}</div>
                </div>
                <div class="flex-1">
                  <div><span class="text-status-info">import</span> <span class="text-text-primary">{'{'} createApp {'}'}</span> <span class="text-status-info">from</span> <span class="text-status-success">'vue'</span></div>
                  <div><span class="text-status-info">import</span> <span class="text-text-primary">{'{'} applyTheme {'}'}</span> <span class="text-status-info">from</span> <span class="text-status-success">'@amulet-laboratories/hex'</span></div>
                  <div><span class="text-status-info">import</span> <span class="text-text-primary">App</span> <span class="text-status-info">from</span> <span class="text-status-success">'./App.vue'</span></div>
                  <div class="text-text-muted">// empty line</div>
                  <div><span class="text-status-warning">const</span> <span class="text-text-link">app</span> <span class="text-text-primary">=</span> <span class="text-accent">createApp</span><span class="text-text-primary">(App)</span></div>
                  <div class="text-text-muted">// empty line</div>
                  <div><span class="text-text-muted">// Apply the Hearth theme by default</span></div>
                  <div><span class="text-accent">applyTheme</span><span class="text-text-primary">(</span><span class="text-status-success">'hearth'</span><span class="text-text-primary">,</span> <span class="text-status-success">'dark'</span><span class="text-text-primary">)</span></div>
                  <div class="text-text-muted">// empty line</div>
                  <div><span class="text-text-link">app</span><span class="text-text-primary">.</span><span class="text-accent">mount</span><span class="text-text-primary">(</span><span class="text-status-success">'#app'</span><span class="text-text-primary">)</span></div>
                  <div class="text-text-muted">// empty line</div>
                  <div><span class="text-status-info">export</span> <span class="text-status-warning">type</span> <span class="text-text-primary">{'{'} </span><span class="text-accent">HexTheme</span><span class="text-text-primary"> {'}'}</span> <span class="text-status-info">from</span> <span class="text-status-success">'@amulet-laboratories/hex'</span></div>
                  <div class="text-text-muted">// empty line</div>
                  <div><span class="text-text-muted">// End of file</span></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Status bar -->
          <div class="flex items-center justify-between px-4 py-1 border-t border-border-subtle bg-accent text-text-on-accent text-xs">
            <div class="flex items-center gap-3">
              <span>main</span>
              <span>0 errors</span>
              <span>0 warnings</span>
            </div>
            <div class="flex items-center gap-3">
              <span>UTF-8</span>
              <span>TypeScript</span>
              <span>Ln 10, Col 1</span>
            </div>
          </div>
        </RigSurface>
      </div>
    `,
  }),
}
