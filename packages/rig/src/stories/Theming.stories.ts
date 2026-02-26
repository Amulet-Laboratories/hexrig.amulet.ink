import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'Overview/Theming',
  parameters: {
    layout: 'padded',
    docs: { toc: true },
  },
} satisfies Meta

export default meta
type Story = StoryObj

export const Theming: Story = {
  name: 'Theming Guide',
  render: () => ({
    template: `
      <div class="max-w-3xl mx-auto space-y-10 font-body text-text-secondary leading-relaxed">

        <header class="space-y-3">
          <p class="uppercase tracking-[0.25em] text-xs font-sans text-accent font-semibold">Guide</p>
          <h1 class="font-display text-4xl text-text-primary">Theming</h1>
          <p>How Hex design tokens drive every visual surface — and how to switch, extend, or create themes.</p>
        </header>

        <!-- How it works -->
        <section class="space-y-4">
          <h2 class="font-display text-2xl text-text-primary">How It Works</h2>
          <ol class="list-decimal list-inside space-y-2 text-sm">
            <li><strong class="text-text-primary">JSON source</strong> — Each theme × mode is defined as a JSON file mapping VS&nbsp;Code color keys to hex values.</li>
            <li><strong class="text-text-primary">CSS generation</strong> — Hex transforms JSON into CSS custom properties scoped to <code class="text-accent font-mono text-xs">[data-theme][data-mode]</code> selectors.</li>
            <li><strong class="text-text-primary">Tailwind mapping</strong> — Rig's Tailwind config maps CSS vars to utility classes (<code class="text-accent font-mono text-xs">bg-surface-base</code>, <code class="text-accent font-mono text-xs">text-text-primary</code>, etc.).</li>
            <li><strong class="text-text-primary">Component rendering</strong> — Rig components reference only semantic tokens, never raw palette values.</li>
          </ol>
        </section>

        <!-- Themes -->
        <section class="space-y-4">
          <h2 class="font-display text-2xl text-text-primary">Available Themes</h2>
          <p class="text-sm">Each theme ships as a standalone CSS file. Import only the ones you need.</p>

          <div class="space-y-3">
            <div v-for="t in themes" :key="t.id" class="flex items-start gap-4 rounded-lg border border-border-subtle bg-surface-raised p-4">
              <div
                class="w-10 h-10 rounded-full shrink-0 border border-border-default"
                :style="{ backgroundColor: t.accent }"
              />
              <div class="space-y-1">
                <p class="font-sans font-semibold text-text-primary capitalize">
                  {{ t.id }}
                  <span class="text-text-muted font-normal"> — {{ t.subtitle }}</span>
                </p>
                <p class="text-sm text-text-muted">{{ t.description }}</p>
                <code class="text-xs font-mono text-accent">@amulet-laboratories/hex-origins/themes/{{ t.id }}.css</code>
              </div>
            </div>
          </div>
        </section>

        <!-- Token Namespaces -->
        <section class="space-y-4">
          <h2 class="font-display text-2xl text-text-primary">Token Namespaces</h2>
          <p class="text-sm">Hex organises tokens into semantic namespaces. Components reference these — never raw hex codes.</p>

          <div class="overflow-x-auto">
            <table class="w-full text-sm border-collapse">
              <thead>
                <tr class="border-b border-border-default">
                  <th class="text-left py-2 pr-4 font-sans font-semibold text-text-primary">Namespace</th>
                  <th class="text-left py-2 pr-4 font-sans font-semibold text-text-primary">Tokens</th>
                  <th class="text-left py-2 font-sans font-semibold text-text-primary">Tailwind Prefix</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="ns in namespaces" :key="ns.name" class="border-b border-border-subtle">
                  <td class="py-2 pr-4 font-mono text-accent text-xs">{{ ns.name }}</td>
                  <td class="py-2 pr-4 text-text-muted">{{ ns.tokens }}</td>
                  <td class="py-2 font-mono text-xs text-text-muted">{{ ns.prefix }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Switching Themes -->
        <section class="space-y-4">
          <h2 class="font-display text-2xl text-text-primary">Switching at Runtime</h2>

          <div class="space-y-2">
            <p class="text-sm font-sans font-semibold text-text-primary">Data attributes</p>
            <p class="text-sm">Themes activate via two HTML attributes on any ancestor element:</p>
            <pre class="bg-surface-raised border border-border-subtle rounded-lg p-4 text-sm font-mono overflow-x-auto text-text-primary"><code>&lt;div data-theme="abyss" data-mode="light"&gt;
  &lt;!-- everything inside resolves abyss-light tokens --&gt;
&lt;/div&gt;</code></pre>
          </div>

          <div class="space-y-2">
            <p class="text-sm font-sans font-semibold text-text-primary">Hex runtime helpers</p>
            <pre class="bg-surface-raised border border-border-subtle rounded-lg p-4 text-sm font-mono overflow-x-auto text-text-primary"><code>import { applyTheme, toggleMode } from '@amulet-laboratories/hex'

applyTheme(document.documentElement, 'grove', 'dark')
toggleMode(document.documentElement)  // dark ↔ light</code></pre>
          </div>

          <div class="space-y-2">
            <p class="text-sm font-sans font-semibold text-text-primary">RigThemeProvider component</p>
            <pre class="bg-surface-raised border border-border-subtle rounded-lg p-4 text-sm font-mono overflow-x-auto text-text-primary"><code>&lt;RigThemeProvider theme="keep" mode="dark"&gt;
  &lt;RigCard&gt;This card uses the Keep dark palette.&lt;/RigCard&gt;
&lt;/RigThemeProvider&gt;</code></pre>
          </div>

          <div class="space-y-2">
            <p class="text-sm font-sans font-semibold text-text-primary">useTheme composable</p>
            <pre class="bg-surface-raised border border-border-subtle rounded-lg p-4 text-sm font-mono overflow-x-auto text-text-primary"><code>const { theme, scheme, setTheme, setScheme, toggleScheme } = useTheme()

setTheme('cove')
toggleScheme()  // reactive — any bound UI re-renders</code></pre>
          </div>
        </section>

        <!-- Motion -->
        <section class="space-y-4">
          <h2 class="font-display text-2xl text-text-primary">Motion &amp; Reduced Motion</h2>
          <p class="text-sm">Each theme defines three durations and four easings. The <code class="text-accent font-mono text-xs">useMotion()</code> composable exposes reactive values and automatically respects <code class="text-accent font-mono text-xs">prefers-reduced-motion</code>.</p>

          <div class="overflow-x-auto">
            <table class="w-full text-sm border-collapse">
              <thead>
                <tr class="border-b border-border-default">
                  <th class="text-left py-2 pr-4 font-sans font-semibold text-text-primary">Token</th>
                  <th class="text-left py-2 pr-4 font-sans font-semibold text-text-primary">CSS Variable</th>
                  <th class="text-left py-2 font-sans font-semibold text-text-primary">Tailwind Class</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="m in motionTokens" :key="m.token" class="border-b border-border-subtle">
                  <td class="py-2 pr-4 text-text-primary">{{ m.token }}</td>
                  <td class="py-2 pr-4 font-mono text-xs text-text-muted">{{ m.css }}</td>
                  <td class="py-2 font-mono text-xs text-accent">{{ m.tw }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Typography -->
        <section class="space-y-4 pb-8">
          <h2 class="font-display text-2xl text-text-primary">Typography Tokens</h2>
          <p class="text-sm">Each theme declares four font stacks. These are exposed as both CSS variables and Tailwind <code class="text-accent font-mono text-xs">font-*</code> utilities.</p>
          <div class="overflow-x-auto">
            <table class="w-full text-sm border-collapse">
              <thead>
                <tr class="border-b border-border-default">
                  <th class="text-left py-2 pr-4 font-sans font-semibold text-text-primary">Token</th>
                  <th class="text-left py-2 pr-4 font-sans font-semibold text-text-primary">CSS Variable</th>
                  <th class="text-left py-2 pr-4 font-sans font-semibold text-text-primary">Tailwind</th>
                  <th class="text-left py-2 font-sans font-semibold text-text-primary">Hearth Default</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="f in fontTokens" :key="f.token" class="border-b border-border-subtle">
                  <td class="py-2 pr-4 text-text-primary">{{ f.token }}</td>
                  <td class="py-2 pr-4 font-mono text-xs text-text-muted">{{ f.css }}</td>
                  <td class="py-2 pr-4 font-mono text-xs text-accent">{{ f.tw }}</td>
                  <td class="py-2 text-xs text-text-muted" :style="{ fontFamily: f.family }">{{ f.sample }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </div>
    `,
    setup() {
      const themes = [
        {
          id: 'ember',
          subtitle: 'Intensity',
          accent: '#e04030',
          description: 'Crimson against char — loud, unapologetic.',
        },
        {
          id: 'hearth',
          subtitle: 'Creation',
          accent: '#d4a840',
          description: 'Raw material shaped by heat and intention — amber, warm, deliberate.',
        },
        {
          id: 'grove',
          subtitle: 'Approachability',
          accent: '#7cba7e',
          description: 'Green light through leaves — the friendly theme.',
        },
        {
          id: 'reef',
          subtitle: 'Clarity',
          accent: '#40c0b8',
          description: 'Shallow water over white sand — cool precision.',
        },
        {
          id: 'abyss',
          subtitle: 'Nothingness',
          accent: '#aef66d',
          description: 'The void before form — cool, expansive, electric.',
        },
        {
          id: 'cove',
          subtitle: 'Shelter',
          accent: '#c040a0',
          description: 'Safe harbour — sheltered, coastal, vivid.',
        },
        {
          id: 'linen',
          subtitle: 'Precision',
          accent: '#b87040',
          description: 'Off-white with warmth — the editorial default.',
        },
        {
          id: 'keep',
          subtitle: 'Construction',
          accent: '#90a088',
          description: 'Structure given purpose — solid, geometric, industrial.',
        },
        {
          id: 'slate',
          subtitle: 'Nothing',
          accent: '#8090a0',
          description: 'Cool monochrome — disappears so the content can exist.',
        },
      ]
      const namespaces = [
        {
          name: 'surface',
          tokens: 'base, raised, elevated, sunken, overlay',
          prefix: 'bg-surface-*',
        },
        {
          name: 'text',
          tokens: 'primary, secondary, muted, inverse, link, on-accent',
          prefix: 'text-text-*',
        },
        { name: 'border', tokens: 'default, subtle, strong', prefix: 'border-border-*' },
        {
          name: 'accent',
          tokens: 'primary, secondary, hover, active, muted',
          prefix: 'bg-accent-*',
        },
        { name: 'status', tokens: 'success, warning, error, info', prefix: 'bg-status-*' },
        { name: 'focus', tokens: 'ring, outline', prefix: 'ring-focus-*' },
        { name: 'syntax', tokens: 'comment, keyword, string, number, function, …', prefix: '—' },
        { name: 'terminal', tokens: 'ANSI color mappings', prefix: '—' },
      ]
      const motionTokens = [
        { token: 'Fast', css: '--duration-fast', tw: 'duration-fast' },
        { token: 'Normal', css: '--duration-normal', tw: 'duration-normal' },
        { token: 'Slow', css: '--duration-slow', tw: 'duration-slow' },
        { token: 'Default easing', css: '--easing-default', tw: 'ease-standard' },
        { token: 'Entrance easing', css: '--easing-entrance', tw: 'ease-entrance' },
        { token: 'Exit easing', css: '--easing-exit', tw: 'ease-exit' },
      ]
      const fontTokens = [
        {
          token: 'Display',
          css: '--font-display',
          tw: 'font-display',
          sample: 'Sorts Mill Goudy',
          family: 'var(--font-display)',
        },
        {
          token: 'Body',
          css: '--font-body',
          tw: 'font-body',
          sample: 'Lora',
          family: 'var(--font-body)',
        },
        {
          token: 'Sans',
          css: '--font-sans',
          tw: 'font-sans',
          sample: 'Source Sans 3',
          family: 'var(--font-sans)',
        },
        {
          token: 'Mono',
          css: '--font-mono',
          tw: 'font-mono',
          sample: 'Source Code Pro',
          family: 'var(--font-mono)',
        },
      ]
      return { themes, namespaces, motionTokens, fontTokens }
    },
  }),
}
