import type { Meta, StoryObj } from '@storybook/vue3'

const meta = {
  title: 'Overview/Introduction',
  parameters: {
    layout: 'padded',
    docs: { toc: true },
  },
} satisfies Meta

export default meta
type Story = StoryObj

export const Introduction: Story = {
  render: () => ({
    template: `
      <div class="max-w-3xl mx-auto space-y-10 font-body text-text-secondary leading-relaxed">

        <!-- Hero -->
        <header class="space-y-4">
          <p class="uppercase tracking-[0.25em] text-xs font-sans text-accent font-semibold">Amulet Design System</p>
          <h1 class="font-display text-4xl md:text-5xl text-text-primary leading-tight">
            Hex &plus; Rig
          </h1>
          <p class="text-lg max-w-xl">
            A design token engine and Vue&nbsp;3 component library.
            One system — from color palette to production&nbsp;UI.
          </p>
        </header>

        <!-- Packages -->
        <section class="space-y-4">
          <h2 class="font-display text-2xl text-text-primary">Packages</h2>
          <div class="grid gap-4 sm:grid-cols-3">
            <div class="rounded-lg border border-border-subtle bg-surface-raised p-4 space-y-1">
              <p class="font-mono text-sm text-accent">@amulet-laboratories/hex</p>
              <p class="text-sm text-text-muted">Core token engine — types, validation, CSS &amp; VS&nbsp;Code theme generation.</p>
            </div>
            <div class="rounded-lg border border-border-subtle bg-surface-raised p-4 space-y-1">
              <p class="font-mono text-sm text-accent">@amulet-laboratories/hex-origins</p>
               <p class="text-sm text-text-muted">Nine curated themes in spectral order — dark &amp; light modes.</p>
            </div>
            <div class="rounded-lg border border-border-subtle bg-surface-raised p-4 space-y-1">
              <p class="font-mono text-sm text-accent">@amulet-laboratories/rig</p>
              <p class="text-sm text-text-muted">28 Vue&nbsp;3 components — WCAG&nbsp;AAA, token-driven, fully typed.</p>
            </div>
          </div>
        </section>

        <!-- Principles -->
        <section class="space-y-4">
          <h2 class="font-display text-2xl text-text-primary">Design Principles</h2>
          <dl class="space-y-4">
            <div>
              <dt class="font-sans font-semibold text-text-primary">Token-first</dt>
              <dd class="text-sm">Every visual decision is a CSS custom property. Components never hard-code colors, spacing, or motion.</dd>
            </div>
            <div>
              <dt class="font-sans font-semibold text-text-primary">Accessible by default</dt>
              <dd class="text-sm">WCAG 2.1 Level AAA — 7:1 contrast, keyboard navigation, focus trapping, reduced-motion support.</dd>
            </div>
            <div>
              <dt class="font-sans font-semibold text-text-primary">Theme-agnostic rendering</dt>
              <dd class="text-sm">Components reference semantic tokens, not palette values. Switch themes at runtime without rebuilding.</dd>
            </div>
            <div>
              <dt class="font-sans font-semibold text-text-primary">Composable architecture</dt>
              <dd class="text-sm">Small, focused components. Combine them freely — no opinionated page layouts or grids imposed.</dd>
            </div>
          </dl>
        </section>

        <!-- Themes -->
        <section class="space-y-4">
          <h2 class="font-display text-2xl text-text-primary">Themes</h2>
           <p>Nine themes in spectral order, each with dark and light modes. Use the toolbar above to switch.</p>
          <div class="grid gap-3 sm:grid-cols-5">
            <div v-for="t in themes" :key="t.id" class="rounded-lg border border-border-subtle bg-surface-raised p-3 text-center space-y-1">
              <div
                class="w-8 h-8 rounded-full mx-auto border border-border-default"
                :style="{ backgroundColor: t.accent }"
              />
              <p class="font-sans font-semibold text-sm text-text-primary capitalize">{{ t.id }}</p>
              <p class="text-xs text-text-muted">{{ t.subtitle }}</p>
            </div>
          </div>
        </section>

        <!-- Component Count -->
        <section class="space-y-4">
          <h2 class="font-display text-2xl text-text-primary">Component Inventory</h2>
          <p>28 components across six categories.</p>
          <div class="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            <div v-for="cat in categories" :key="cat.label" class="rounded-lg border border-border-subtle bg-surface-raised p-3 space-y-1">
              <p class="font-sans font-semibold text-sm text-text-primary">{{ cat.label }}</p>
              <p class="text-xs text-text-muted font-mono">{{ cat.items.join(', ') }}</p>
            </div>
          </div>
        </section>

        <!-- Links -->
        <section class="space-y-3 pb-8">
          <h2 class="font-display text-2xl text-text-primary">Resources</h2>
          <ul class="space-y-1 text-sm">
            <li><a href="https://github.com/Amulet-Laboratories/hexrig.amulet.ink" target="_blank" rel="noopener" class="text-text-link underline hover:text-accent-hover">GitHub Repository</a></li>
            <li><a href="https://hexrig.amulet.ink" target="_blank" rel="noopener" class="text-text-link underline hover:text-accent-hover">Project Website</a></li>
            <li><a href="https://github.com/orgs/Amulet-Laboratories/packages" target="_blank" rel="noopener" class="text-text-link underline hover:text-accent-hover">GitHub Packages</a></li>
          </ul>
        </section>

      </div>
    `,
    setup() {
      const themes = [
        { id: 'ember', subtitle: 'Intensity', accent: '#e04030' },
        { id: 'hearth', subtitle: 'Creation', accent: '#d4a840' },
        { id: 'grove', subtitle: 'Approachability', accent: '#7cba7e' },
        { id: 'reef', subtitle: 'Clarity', accent: '#40c0b8' },
        { id: 'abyss', subtitle: 'Nothingness', accent: '#aef66d' },
        { id: 'cove', subtitle: 'Shelter', accent: '#c040a0' },
        { id: 'linen', subtitle: 'Precision', accent: '#b87040' },
        { id: 'keep', subtitle: 'Construction', accent: '#90a088' },
        { id: 'slate', subtitle: 'Nothing', accent: '#8090a0' },
      ]
      const categories = [
        { label: 'General', items: ['Button', 'Icon', 'Text', 'Badge', 'Tag', 'Avatar'] },
        {
          label: 'Layout',
          items: ['Surface', 'Card', 'Container', 'Grid', 'Stack', 'Spacer', 'Divider'],
        },
        { label: 'Form', items: ['Input', 'Select', 'Checkbox', 'Switch'] },
        { label: 'Navigation', items: ['Tabs', 'Breadcrumb', 'Accordion'] },
        {
          label: 'Feedback',
          items: ['Alert', 'Dialog', 'Toast', 'Progress', 'Spinner', 'Skeleton', 'Tooltip'],
        },
        { label: 'Theming', items: ['ThemeProvider'] },
      ]
      return { themes, categories }
    },
  }),
}
