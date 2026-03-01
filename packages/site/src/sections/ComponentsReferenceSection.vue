<script setup lang="ts">
import { ref, computed } from 'vue'
import { RigInput, RigBadge, RigDivider } from '@amulet-laboratories/rig'

// Component metadata grouped by category
const componentCategories = [
  {
    name: 'Primitives',
    description: 'Fundamental building blocks',
    components: [
      { name: 'RigText', description: 'Typography and text rendering', props: ['variant', 'size', 'color', 'as'] },
      { name: 'RigIcon', description: '32+ icon set with configurable size/color', props: ['icon', 'size', 'color'] },
      { name: 'RigBadge', description: 'Status descriptor with variants and tones', props: ['variant', 'tone', 'size', 'dot', 'removable'] },
      { name: 'RigTag', description: 'Removable label/tag component', props: ['tone', 'removable'] },
      { name: 'RigAvatar', description: 'User avatar with initials fallback', props: ['src', 'alt', 'initials', 'size'] },
      { name: 'RigDivider', description: 'Visual separator with variants', props: ['variant', 'as'] },
    ],
  },
  {
    name: 'Forms',
    description: 'Input and form components',
    components: [
      { name: 'RigInput', description: 'Text input with validation states', props: ['type', 'disabled', 'readonly', 'required', 'invalid', 'description'] },
      { name: 'RigSelect', description: 'Dropdown selection component', props: ['modelValue', 'disabled', 'invalid', 'multiple'] },
      { name: 'RigCheckbox', description: 'Checkbox with label and description', props: ['modelValue', 'disabled', 'indeterminate'] },
      { name: 'RigSwitch', description: 'Toggle switch component', props: ['modelValue', 'disabled'] },
      { name: 'RigRadio', description: 'Radio button group', props: ['modelValue', 'options', 'disabled', 'orientation'] },
    ],
  },
  {
    name: 'Feedback',
    description: 'Alerts, dialogs, and feedback',
    components: [
      { name: 'RigAlert', description: 'Alert message with tone and optional title', props: ['tone', 'title', 'description', 'dismissible'] },
      { name: 'RigDialog', description: 'Modal with focus trap and scroll lock', props: ['modelValue', 'title', 'size', 'dismissible', 'persistent'] },
      { name: 'RigToast', description: 'Toast notification composable', props: ['tone', 'title', 'duration'] },
      { name: 'RigProgress', description: 'Progress bar with percentage', props: ['value', 'max', 'indeterminate'] },
      { name: 'RigSpinner', description: 'Loading spinner animation', props: ['size', 'tone'] },
      { name: 'RigSkeleton', description: 'Content skeleton placeholder', props: ['lines', 'variant'] },
      { name: 'RigTooltip', description: 'Tooltip with positioning (CSS-based)', props: ['content', 'side', 'delay'] },
    ],
  },
  {
    name: 'Layout',
    description: 'Layout and spacing components',
    components: [
      { name: 'RigSurface', description: 'Surface/card base with elevation', props: ['elevation', 'border', 'rounded', 'padding'] },
      { name: 'RigCard', description: 'Content card with optional interaction', props: ['interactive', 'elevated', 'ariaLabel'] },
      { name: 'RigContainer', description: 'Max-width container', props: ['as', 'maxWidth'] },
      { name: 'RigStack', description: 'Flex stack (row/column)', props: ['axis', 'gap', 'align', 'justify'] },
      { name: 'RigGrid', description: 'CSS grid wrapper', props: ['cols', 'gap', 'rows'] },
      { name: 'RigSpacer', description: 'Fixed spacing element', props: ['axis', 'size'] },
    ],
  },
  {
    name: 'Navigation',
    description: 'Navigation and menu components',
    components: [
      { name: 'RigTabs', description: 'Tab interface with keyboard navigation', props: ['activeTab', 'tabs', 'variant'] },
      { name: 'RigAccordion', description: 'Collapsible accordion sections', props: ['items', 'allowMultiple'] },
      { name: 'RigBreadcrumb', description: 'Breadcrumb trail navigation', props: ['items'] },
      { name: 'RigNavbar', description: 'Responsive navigation bar', props: ['logo', 'items', 'mobileOpen'] },
    ],
  },
  {
    name: 'Data Display',
    description: 'Tables, lists, and data views',
    components: [
      { name: 'RigTable', description: 'Data table with sorting/selection', props: ['columns', 'rows', 'sortBy', 'selectable', 'expandable'] },
      { name: 'RigTree', description: 'Hierarchical tree with keyboard nav', props: ['nodes', 'selected', 'expanded', 'selectable'] },
      { name: 'RigList', description: 'Semantic list with icons/metadata', props: ['items', 'variant'] },
      { name: 'RigTimeline', description: 'Timeline visualization', props: ['events', 'variant'] },
      { name: 'RigMetadata', description: 'Structured metadata display', props: ['items'] },
      { name: 'RigStat', description: 'Statistic with trend', props: ['label', 'value', 'trend', 'icon'] },
    ],
  },
  {
    name: 'Application',
    description: 'Full-page and layout components',
    components: [
      { name: 'RigAppShell', description: 'Full-page layout with sidebar', props: ['sidebarCollapsed', 'sidebarWidth'] },
      { name: 'RigPage', description: 'Page wrapper with max-width', props: ['as', 'maxWidth'] },
      { name: 'RigHeader', description: 'Sticky header bar', props: ['height', 'sticky'] },
      { name: 'RigFooter', description: 'Page footer section', props: ['borderTop'] },
      { name: 'RigPanel', description: 'Collapsible panel', props: ['title', 'collapsible', 'defaultOpen'] },
      { name: 'RigSidebar', description: 'Collapsible sidebar navigation', props: ['width', 'collapsed'] },
      { name: 'RigStatusBar', description: 'VS Code-style status bar', props: ['height'] },
    ],
  },
  {
    name: 'Client Site',
    description: 'Pre-built site components',
    components: [
      { name: 'RigHero', description: 'Hero section with headline/CTA', props: ['title', 'subtitle', 'image'] },
      { name: 'RigCardGrid', description: 'Responsive card grid layout', props: ['cols', 'gap'] },
      { name: 'RigContactForm', description: 'Contact form with validation', props: ['onSubmit'] },
      { name: 'RigTestimonial', description: 'Testimonial card with rating', props: ['quote', 'author', 'rating'] },
      { name: 'RigGallery', description: 'Image gallery with lightbox', props: ['images', 'cols', 'lightbox'] },
      { name: 'RigPricingTable', description: 'Pricing information display', props: ['plans', 'layout'] },
      { name: 'RigHoursDisplay', description: 'Business hours display', props: ['hours'] },
    ],
  },
]

const searchQuery = ref('')

const filteredCategories = computed(() => {
  if (!searchQuery.value) return componentCategories

  const query = searchQuery.value.toLowerCase()
  return componentCategories
    .map((cat) => ({
      ...cat,
      components: cat.components.filter(
        (comp) =>
          comp.name.toLowerCase().includes(query) ||
          comp.description.toLowerCase().includes(query),
      ),
    }))
    .filter((cat) => cat.components.length > 0)
})

const totalComponents = computed(() =>
  componentCategories.reduce((sum, cat) => sum + cat.components.length, 0),
)
</script>

<template>
  <section id="components" class="relative py-32 px-6">
    <!-- Section header -->
    <div class="max-w-6xl mx-auto mb-20">
      <div v-reveal class="flex items-center gap-3 mb-6">
        <div class="h-px w-8 bg-accent" />
        <span class="text-xs font-mono uppercase tracking-[0.25em] text-accent">Component Library</span>
      </div>
      <h2
        v-reveal
        class="font-display text-4xl sm:text-5xl lg:text-6xl text-text-primary leading-tight mb-4"
      >
        {{ totalComponents }} components.<br />Every use case covered.
      </h2>
      <p v-reveal class="text-text-muted font-body text-lg max-w-xl">
        Browse all components by category. Each is fully accessible, theme-aware, and production-ready.
      </p>
    </div>

    <!-- Search -->
    <div class="max-w-6xl mx-auto mb-12">
      <RigInput
        v-model="searchQuery"
        placeholder="Search components..."
        description="Type a component name or description"
      />
    </div>

    <!-- Components by category -->
    <div class="max-w-6xl mx-auto space-y-12">
      <div v-for="category in filteredCategories" :key="category.name" v-reveal>
        <!-- Category header -->
        <div class="mb-6">
          <h3 class="font-display text-2xl sm:text-3xl text-text-primary mb-2">{{ category.name }}</h3>
          <p class="text-text-secondary font-body">{{ category.description }}</p>
        </div>

        <!-- Components grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="comp in category.components"
            :key="comp.name"
            class="p-4 rounded-theme border border-border-subtle bg-surface-base hover:border-border-strong transition-colors duration-fast"
          >
            <!-- Component name -->
            <div class="flex items-start justify-between mb-2">
              <div class="font-display text-lg text-text-primary font-mono">{{ comp.name }}</div>
              <RigBadge variant="soft" size="sm">{{ comp.props.length }} props</RigBadge>
            </div>

            <!-- Description -->
            <p class="text-sm text-text-secondary font-body mb-3">{{ comp.description }}</p>

            <!-- Props list -->
            <div class="space-y-1">
              <div class="text-[10px] font-mono uppercase tracking-widest text-text-muted mb-2">
                Common Props
              </div>
              <div class="flex flex-wrap gap-1">
                <RigBadge v-for="prop in comp.props.slice(0, 3)" :key="prop" variant="outline" size="sm">
                  {{ prop }}
                </RigBadge>
                <RigBadge v-if="comp.props.length > 3" variant="outline" size="sm">
                  +{{ comp.props.length - 3 }}
                </RigBadge>
              </div>
            </div>

            <!-- Link to storybook -->
            <div class="mt-4 pt-3 border-t border-border-subtle">
              <a
                :href="`/storybook/?path=/docs/components-${comp.name.toLowerCase().slice(3)}--docs`"
                target="_blank"
                rel="noopener"
                class="text-xs font-mono text-accent hover:text-accent-hover transition-colors"
              >
                View in Storybook →
              </a>
            </div>
          </div>
        </div>

        <RigDivider variant="subtle" class="mt-12" />
      </div>
    </div>

    <!-- Composables section -->
    <div class="max-w-6xl mx-auto mt-12" v-reveal>
      <h3 class="font-display text-2xl sm:text-3xl text-text-primary mb-4">Composables</h3>
      <p class="text-text-secondary font-body mb-6">
        Reusable logic and state management for common patterns.
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="comp in [
            { name: 'useTheme', description: 'Access and switch themes' },
            { name: 'useToast', description: 'Show toast notifications' },
            { name: 'useKeyboard', description: 'Keyboard event handling' },
            { name: 'useClipboard', description: 'Copy to clipboard' },
            { name: 'useLocalStorage', description: 'Persistent state' },
            { name: 'useBreakpoint', description: 'Responsive breakpoint detection' },
            { name: 'useFilter', description: 'Array filtering with search' },
            { name: 'useSort', description: 'Array sorting' },
            { name: 'useMotion', description: 'Animation timing' },
          ]"
          :key="comp.name"
          class="p-4 rounded-theme border border-border-subtle bg-surface-base"
        >
          <div class="font-display text-lg text-text-primary font-mono mb-1">{{ comp.name }}</div>
          <p class="text-sm text-text-secondary font-body">{{ comp.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
