import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'Overview/Getting Started',
  parameters: {
    layout: 'padded',
    docs: { toc: true },
  },
} satisfies Meta

export default meta
type Story = StoryObj

export const GettingStarted: Story = {
  name: 'Getting Started',
  render: () => ({
    template: `
      <div class="max-w-3xl mx-auto space-y-10 font-body text-text-secondary leading-relaxed">

        <header class="space-y-3">
          <p class="uppercase tracking-[0.25em] text-xs font-sans text-accent font-semibold">Guide</p>
          <h1 class="font-display text-4xl text-text-primary">Getting Started</h1>
          <p>Install, configure, and render your first Rig component in under five&nbsp;minutes.</p>
        </header>

        <!-- Prerequisites -->
        <section class="space-y-3">
          <h2 class="font-display text-2xl text-text-primary">Prerequisites</h2>
          <ul class="list-disc list-inside space-y-1 text-sm">
            <li>Node.js ≥ 22</li>
            <li>pnpm (or npm / yarn)</li>
            <li>Vue 3.5+</li>
            <li>Tailwind CSS 3.4+ (Rig components use Tailwind utility classes)</li>
          </ul>
        </section>

        <!-- Installation -->
        <section class="space-y-4">
          <h2 class="font-display text-2xl text-text-primary">Installation</h2>

          <div class="space-y-2">
            <p class="text-sm font-sans font-semibold text-text-primary">1 &mdash; Install packages</p>
            <pre class="bg-surface-raised border border-border-subtle rounded-lg p-4 text-sm font-mono overflow-x-auto text-text-primary"><code>pnpm add @amulet-laboratories/hex @amulet-laboratories/hex-origins @amulet-laboratories/rig</code></pre>
          </div>

          <div class="space-y-2">
            <p class="text-sm font-sans font-semibold text-text-primary">2 &mdash; Import theme CSS &amp; component styles</p>
            <pre class="bg-surface-raised border border-border-subtle rounded-lg p-4 text-sm font-mono overflow-x-auto text-text-primary"><code>// main.ts
import '@amulet-laboratories/hex-origins/themes/hearth.css'
import '@amulet-laboratories/rig/style.css'</code></pre>
            <p class="text-xs text-text-muted">Import as many theme CSS files as your app needs. Each is &lt; 4 KB.</p>
          </div>

          <div class="space-y-2">
            <p class="text-sm font-sans font-semibold text-text-primary">3 &mdash; Set theme attributes on the root element</p>
            <pre class="bg-surface-raised border border-border-subtle rounded-lg p-4 text-sm font-mono overflow-x-auto text-text-primary"><code>&lt;!-- index.html --&gt;
&lt;html data-theme="hearth" data-mode="dark"&gt;</code></pre>
            <p class="text-xs text-text-muted">Or use <code class="text-accent font-mono text-xs">RigThemeProvider</code> to scope a theme to part of the tree.</p>
          </div>

          <div class="space-y-2">
            <p class="text-sm font-sans font-semibold text-text-primary">4 &mdash; Use components</p>
            <pre class="bg-surface-raised border border-border-subtle rounded-lg p-4 text-sm font-mono overflow-x-auto text-text-primary"><code>&lt;script setup lang="ts"&gt;
import { RigButton, RigCard, RigText } from '@amulet-laboratories/rig'
&lt;/script&gt;

&lt;template&gt;
  &lt;RigCard elevation="raised"&gt;
    &lt;RigText variant="heading"&gt;Hello, world&lt;/RigText&gt;
    &lt;RigButton&gt;Get started&lt;/RigButton&gt;
  &lt;/RigCard&gt;
&lt;/template&gt;</code></pre>
          </div>
        </section>

        <!-- Tailwind Integration -->
        <section class="space-y-4">
          <h2 class="font-display text-2xl text-text-primary">Tailwind Integration</h2>
          <p class="text-sm">Rig distributes its own Tailwind config. Extend it so utility classes resolve the same design-token CSS variables the components use.</p>
          <pre class="bg-surface-raised border border-border-subtle rounded-lg p-4 text-sm font-mono overflow-x-auto text-text-primary"><code>// tailwind.config.ts
import rigConfig from '@amulet-laboratories/rig/tailwind.config'
import type { Config } from 'tailwindcss'

export default {
  presets: [rigConfig],
  content: ['./src/**/*.{vue,ts}'],
} satisfies Config</code></pre>
          <p class="text-sm">This gives you classes like <code class="text-accent font-mono text-xs">bg-surface-raised</code>, <code class="text-accent font-mono text-xs">text-text-primary</code>, <code class="text-accent font-mono text-xs">border-border-subtle</code>, <code class="text-accent font-mono text-xs">duration-fast</code>, and <code class="text-accent font-mono text-xs">ease-standard</code>.</p>
        </section>

        <!-- Runtime Helpers -->
        <section class="space-y-4">
          <h2 class="font-display text-2xl text-text-primary">Runtime Helpers</h2>
          <p class="text-sm">Hex exports helpers for programmatic theme control.</p>
          <pre class="bg-surface-raised border border-border-subtle rounded-lg p-4 text-sm font-mono overflow-x-auto text-text-primary"><code>import { applyTheme, toggleMode, getThemeState } from '@amulet-laboratories/hex'

// Apply a theme
applyTheme(document.documentElement, 'abyss', 'dark')

// Toggle dark ↔ light
toggleMode(document.documentElement)

// Read the current state
const { theme, mode } = getThemeState(document.documentElement)</code></pre>
        </section>

        <!-- Composables -->
        <section class="space-y-4">
          <h2 class="font-display text-2xl text-text-primary">Vue Composables</h2>
          <p class="text-sm">Rig provides reactive composables for theme, motion, and toast state.</p>
          <pre class="bg-surface-raised border border-border-subtle rounded-lg p-4 text-sm font-mono overflow-x-auto text-text-primary"><code>import { useTheme, useMotion, useToast } from '@amulet-laboratories/rig'

// In a component setup()
const { theme, scheme, setTheme, toggleScheme } = useTheme()
const { duration, prefersReducedMotion } = useMotion()
const { show, dismiss, toasts } = useToast()</code></pre>
        </section>

        <!-- What's Next -->
        <section class="space-y-3 pb-8">
          <h2 class="font-display text-2xl text-text-primary">What's Next</h2>
          <ul class="list-disc list-inside space-y-1 text-sm">
            <li>Browse individual <strong class="text-text-primary">Component</strong> stories in the sidebar for interactive playgrounds.</li>
            <li>Read the <strong class="text-text-primary">Theming</strong> guide to learn about tokens, modes, and custom themes.</li>
            <li>Check the <strong class="text-text-primary">Showcase</strong> section for full-page compositions.</li>
          </ul>
        </section>

      </div>
    `,
  }),
}
