<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import {
  RigButton,
  RigCard,
  RigInput,
  RigAlert,
  RigTabs,
  RigTooltip,
  RigText,
  RigDivider,
  RigBadge,
  RigSurface,
  RigAvatar,
  RigTag,
  RigSelect,
  RigCheckbox,
  RigSwitch,
  RigAccordion,
  RigBreadcrumb,
  RigProgress,
  RigSpinner,
  RigSkeleton,
  RigDialog,
  useToast,
  RigStatus,
  RigRadio,
  RigStat,
  RigTable,
  RigMetadata,
  RigList,
  RigTimeline,
  RigTree,
  RigSplit,
  RigHeader,
  RigFooter,
  RigPanel,
  RigEmpty,
  RigConfirm,
  RigSidebar,
  RigSidebarSection,
  RigSidebarItem,
  RigPage,
  RigIcon,
  RigStack,
  RigGrid,
} from '@amulet-laboratories/rig'

import type { ThemeId } from '@amulet-laboratories/hex'

defineProps<{
  activeTheme: ThemeId
}>()

// --- Existing state ---
const inputValue = ref('Amulet')
const activeTab = ref('overview')

// --- Tags (removable demo) ---
const tags = ref(['Design System', 'WCAG AAA', 'Accessible', 'Vue 3'])
const removeTag = (label: string) => {
  tags.value = tags.value.filter((t) => t !== label)
}

// --- Form controls ---
const selectedFont = ref('crimson')
const notifyChecked = ref(true)
const analyticsChecked = ref(false)
const darkModeEnabled = ref(true)
const reducedMotion = ref(false)

// --- Dialog ---
const dialogOpen = ref(false)
const confirmDialogOpen = ref(false)

// --- Toast ---
const { show } = useToast()

const showToast = (tone: 'success' | 'warning' | 'error' | 'info') => {
  const messages = {
    success: { title: 'Component rendered', description: 'All tokens applied correctly.' },
    warning: { title: 'Approaching limit', description: 'Rate limit resets in 60 seconds.' },
    error: { title: 'Build failed', description: 'Check the console for details.' },
    info: { title: 'v2.0.0 available', description: 'Hex + Rig has a new release.' },
  }
  show({ tone, ...messages[tone] })
}

// --- Radio ---
const radioValue = ref('hearth')

// --- Table ---
const tableSortBy = ref('name')
const tableSortDir = ref<'asc' | 'desc'>('asc')

// --- Tree ---
const treeSelected = ref('')
const treeExpanded = ref(['sites', 'software'])

// --- Confirm dialog ---
const confirmOpen = ref(false)

// --- Sidebar ---
const sidebarCollapsed = ref(false)

// --- Animated progress ---
const progressValue = ref(0)
let progressTimer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  progressTimer = setInterval(() => {
    progressValue.value = progressValue.value >= 100 ? 0 : progressValue.value + 1
  }, 80)
})

onUnmounted(() => {
  if (progressTimer) clearInterval(progressTimer)
})
</script>

<template>
  <section class="relative py-32 px-6">
    <!-- Section header -->
    <div class="max-w-6xl mx-auto mb-20">
      <div v-reveal class="flex items-center gap-3 mb-6">
        <div class="h-px w-8 bg-accent" />
        <span class="text-xs font-mono uppercase tracking-[0.25em] text-accent">Components</span>
      </div>
      <h2
        v-reveal
        class="font-display text-4xl sm:text-5xl lg:text-6xl text-text-primary leading-tight mb-4"
      >
        Forty-eight components.<br />Every piece, considered.
      </h2>
      <p v-reveal class="text-text-muted font-body text-lg max-w-xl">
        Real Rig components below — not mockups. Switch themes above and watch them transform.
      </p>
    </div>

    <div class="max-w-6xl mx-auto space-y-6 reveal-stagger">
      <!-- ================================================================ -->
      <!-- ROW 1: Buttons                                                   -->
      <!-- ================================================================ -->
      <RigSurface
        v-reveal:scale
        elevation="raised"
        border="subtle"
        rounded
        padding="lg"
        class="panel-lift"
      >
        <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted block mb-8"
          >RigButton</span
        >
        <div class="flex flex-wrap items-center gap-4">
          <RigButton variant="solid" tone="accent">Primary</RigButton>
          <RigButton variant="outline" tone="accent">Outline</RigButton>
          <RigButton variant="ghost" tone="accent">Ghost</RigButton>
          <RigButton variant="link" tone="accent">Link</RigButton>
          <RigButton variant="solid" tone="neutral">Neutral</RigButton>
          <RigButton variant="solid" tone="danger">Danger</RigButton>
          <RigButton variant="solid" tone="accent" loading>Loading</RigButton>
          <RigButton variant="solid" tone="accent" size="sm">Small</RigButton>
          <RigButton variant="solid" tone="accent" size="lg">Large</RigButton>
        </div>
      </RigSurface>

      <!-- ================================================================ -->
      <!-- ROW 2: Card + Input                                              -->
      <!-- ================================================================ -->
      <div v-reveal:scale class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Cards -->
        <RigSurface elevation="raised" border="subtle" rounded padding="lg" class="panel-lift">
          <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted block mb-8"
            >RigCard</span
          >
          <div class="space-y-4">
            <RigCard elevation="flat">
              <div class="px-4 pt-4 pb-2 border-b border-border-subtle">
                <RigText variant="body" weight="semibold">Flat</RigText>
              </div>
              <div class="p-4">
                <RigText variant="caption" color="secondary"
                  >No elevation. Grounded in the surface.</RigText
                >
              </div>
            </RigCard>
            <RigCard elevation="raised">
              <div class="px-4 pt-4 pb-2 border-b border-border-subtle">
                <RigText variant="body" weight="semibold">Raised</RigText>
              </div>
              <div class="p-4">
                <RigText variant="caption" color="secondary"
                  >Lifted from the surface. Default state.</RigText
                >
              </div>
            </RigCard>
            <RigCard elevation="prominent" interactive aria-label="Interactive card">
              <div class="p-4">
                <RigText variant="body" weight="semibold">Interactive</RigText>
                <RigText variant="caption" color="muted" class="mt-1">Hover me. Press me.</RigText>
              </div>
            </RigCard>
          </div>
        </RigSurface>

        <!-- Input -->
        <RigSurface elevation="raised" border="subtle" rounded padding="lg" class="panel-lift">
          <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted block mb-8"
            >RigInput</span
          >
          <div class="space-y-5">
            <RigInput
              v-model="inputValue"
              label="Display name"
              description="Your public display name."
            />
            <RigInput label="Email" type="email" placeholder="you@example.com" required />
            <RigInput model-value="invalid" label="Error state" error="This field is required." />
          </div>
        </RigSurface>
      </div>

      <!-- ================================================================ -->
      <!-- ROW 3: Avatar + Tag + Text                                       -->
      <!-- ================================================================ -->
      <div v-reveal:scale class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Avatar + Tag -->
        <RigSurface elevation="raised" border="subtle" rounded padding="lg" class="panel-lift">
          <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted block mb-8"
            >RigAvatar · RigTag</span
          >
          <div class="space-y-6">
            <!-- Avatars -->
            <div>
              <RigText variant="caption" color="muted" class="mb-3"
                >Initials, sizes, shapes</RigText
              >
              <div class="flex items-end gap-4">
                <RigAvatar name="Anthony Passanisi" size="xl" />
                <RigAvatar name="Amulet Labs" size="lg" />
                <RigAvatar name="Hex" size="md" />
                <RigAvatar name="Rig" size="sm" />
                <RigAvatar name="X" size="xs" />
                <RigAvatar name="Square" size="md" shape="square" />
              </div>
            </div>
            <RigDivider />
            <!-- Tags -->
            <div>
              <RigText variant="caption" color="muted" class="mb-3"
                >Removable, interactive chips</RigText
              >
              <div class="flex flex-wrap gap-2">
                <RigTag
                  v-for="tag in tags"
                  :key="tag"
                  :label="tag"
                  variant="soft"
                  removable
                  @remove="removeTag(tag)"
                />
                <RigTag label="Outline" variant="outline" />
                <RigTag label="Solid" variant="solid" />
                <RigTag label="Disabled" variant="soft" disabled />
              </div>
            </div>
          </div>
        </RigSurface>

        <!-- Text variants -->
        <RigSurface elevation="raised" border="subtle" rounded padding="lg" class="panel-lift">
          <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted block mb-8"
            >RigText</span
          >
          <div class="space-y-2">
            <RigText variant="display">Display</RigText>
            <RigText variant="heading">Heading</RigText>
            <RigText variant="subheading">Subheading</RigText>
            <RigText variant="body">Body — the default prose variant.</RigText>
            <RigText variant="caption" color="secondary">Caption, secondary color</RigText>
            <RigText variant="overline">Overline</RigText>
            <RigText variant="mono">monospace variant</RigText>
            <RigDivider class="my-2" />
            <div class="flex flex-wrap gap-3">
              <RigText variant="caption" color="accent">accent</RigText>
              <RigText variant="caption" color="success">success</RigText>
              <RigText variant="caption" color="warning">warning</RigText>
              <RigText variant="caption" color="error">error</RigText>
              <RigText variant="caption" color="info">info</RigText>
              <RigText variant="caption" color="muted">muted</RigText>
            </div>
          </div>
        </RigSurface>
      </div>

      <!-- ================================================================ -->
      <!-- ROW 4: Select + Checkbox + Switch                                -->
      <!-- ================================================================ -->
      <RigSurface
        v-reveal:scale
        elevation="raised"
        border="subtle"
        rounded
        padding="lg"
        class="panel-lift"
      >
        <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted block mb-8"
          >RigSelect · RigCheckbox · RigSwitch</span
        >
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Select -->
          <div class="space-y-5">
            <RigSelect
              v-model="selectedFont"
              label="Display font"
              description="Sets the heading typeface."
              :options="[
                { value: 'crimson', label: 'Crimson Text' },
                { value: 'courier', label: 'Courier Prime' },
                { value: 'inter', label: 'Inter' },
                { value: 'system', label: 'System default' },
              ]"
            />
            <RigSelect
              label="Status"
              placeholder="Choose status"
              :options="[
                { value: 'draft', label: 'Draft' },
                { value: 'review', label: 'In review' },
                { value: 'published', label: 'Published' },
                { value: 'archived', label: 'Archived', disabled: true },
              ]"
            />
          </div>

          <!-- Checkboxes -->
          <div class="space-y-4">
            <RigCheckbox
              v-model="notifyChecked"
              label="Email notifications"
              description="Receive updates about new releases."
            />
            <RigCheckbox
              v-model="analyticsChecked"
              label="Usage analytics"
              description="Help improve the design system."
            />
            <RigCheckbox :model-value="false" label="Disabled option" disabled />
          </div>

          <!-- Switches -->
          <div class="space-y-4">
            <RigSwitch v-model="darkModeEnabled" label="Dark mode" />
            <RigSwitch
              v-model="reducedMotion"
              label="Reduce motion"
              description="Minimizes animation across the interface."
            />
            <RigSwitch :model-value="true" label="Always on" disabled />
          </div>
        </div>
      </RigSurface>

      <!-- ================================================================ -->
      <!-- ROW 5: Alerts + Tabs / Badge / Tooltip                           -->
      <!-- ================================================================ -->
      <div v-reveal:scale class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Alerts -->
        <RigSurface elevation="raised" border="subtle" rounded padding="lg" class="panel-lift">
          <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted block mb-8"
            >RigAlert</span
          >
          <div class="space-y-3">
            <RigAlert tone="success" title="Changes saved" />
            <RigAlert tone="warning" title="Approaching rate limit" />
            <RigAlert tone="error" title="Deployment failed" />
            <RigAlert tone="info" title="New version available" />
          </div>
        </RigSurface>

        <!-- Tabs + Badges + Tooltip -->
        <RigSurface elevation="raised" border="subtle" rounded padding="lg" class="panel-lift">
          <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted block mb-8"
            >RigTabs · RigBadge · RigTooltip</span
          >
          <div class="space-y-6">
            <div>
              <RigTabs
                v-model="activeTab"
                :tabs="[
                  { value: 'overview', label: 'Overview' },
                  { value: 'tokens', label: 'Tokens' },
                  { value: 'usage', label: 'Usage' },
                ]"
              />
              <RigSurface elevation="base" border="subtle" rounded padding="md" class="mt-3">
                <RigText variant="caption" color="muted">
                  {{
                    activeTab === 'overview'
                      ? 'Design system overview and getting started.'
                      : activeTab === 'tokens'
                        ? 'All token namespaces and CSS custom properties.'
                        : 'Installation and usage in your project.'
                  }}
                </RigText>
              </RigSurface>
            </div>

            <RigDivider />

            <div class="flex flex-wrap gap-2">
              <RigBadge variant="soft" tone="accent">Default</RigBadge>
              <RigBadge variant="soft" tone="success" dot>Live</RigBadge>
              <RigBadge variant="soft" tone="warning">Pending</RigBadge>
              <RigBadge variant="outline" tone="error">Failed</RigBadge>
              <RigBadge variant="outline" tone="neutral">Draft</RigBadge>
            </div>

            <div class="flex gap-3">
              <RigTooltip content="Top tooltip" placement="top">
                <RigButton variant="outline" tone="neutral" size="sm">Hover me</RigButton>
              </RigTooltip>
              <RigTooltip content="Rich tooltips with placement control" placement="bottom">
                <RigButton variant="ghost" tone="accent" size="sm">Or me</RigButton>
              </RigTooltip>
            </div>
          </div>
        </RigSurface>
      </div>

      <!-- ================================================================ -->
      <!-- ROW 6: Accordion + Breadcrumb                                    -->
      <!-- ================================================================ -->
      <div v-reveal:scale class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Accordion -->
        <RigSurface elevation="raised" border="subtle" rounded padding="lg" class="panel-lift">
          <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted block mb-8"
            >RigAccordion</span
          >
          <RigAccordion
            :items="[
              {
                value: 'hex',
                label: 'What is the Hex token engine?',
                content:
                  'Design tokens as CSS custom properties — surfaces, text, borders, accents, status, focus, motion, and typography. One import, every token.',
              },
              {
                value: 'origins',
                label: 'How do the nine themes differ?',
                content:
                  'Each theme is a complete visual language: palette, typography scale, and personality. Six spectral hues and three neutrals, each with dark and light modes.',
              },
              {
                value: 'polymorphic',
                label: 'Are components polymorphic?',
                content:
                  'Yes. Most components accept an as prop — render as div, article, section, a, or router-link depending on your semantic needs.',
              },
            ]"
            :default-open="['hex']"
          />
        </RigSurface>

        <!-- Breadcrumb -->
        <RigSurface elevation="raised" border="subtle" rounded padding="lg" class="panel-lift">
          <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted block mb-8"
            >RigBreadcrumb</span
          >
          <div class="space-y-6">
            <div>
              <RigText variant="caption" color="muted" class="mb-3">Default separator</RigText>
              <RigBreadcrumb
                :items="[
                  { label: 'Design System', href: '#' },
                  { label: 'Components', href: '#' },
                  { label: 'Navigation' },
                ]"
              />
            </div>
            <RigDivider />
            <div>
              <RigText variant="caption" color="muted" class="mb-3">Custom separator</RigText>
              <RigBreadcrumb
                separator=">"
                :items="[
                  { label: 'Hex', href: '#' },
                  { label: 'Origins', href: '#' },
                  { label: 'Hearth', href: '#' },
                  { label: 'Dark' },
                ]"
              />
            </div>
            <RigDivider />
            <div>
              <RigText variant="caption" color="muted" class="mb-3">Deep path</RigText>
              <RigBreadcrumb
                :items="[
                  { label: 'App', href: '#' },
                  { label: 'Settings', href: '#' },
                  { label: 'Appearance', href: '#' },
                  { label: 'Theme', href: '#' },
                  { label: 'Hearth' },
                ]"
              />
            </div>
          </div>
        </RigSurface>
      </div>

      <!-- ================================================================ -->
      <!-- ROW 7: Progress + Spinner + Skeleton                             -->
      <!-- ================================================================ -->
      <RigSurface
        v-reveal:scale
        elevation="raised"
        border="subtle"
        rounded
        padding="lg"
        class="panel-lift"
      >
        <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted block mb-8"
          >RigProgress · RigSpinner · RigSkeleton</span
        >
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Progress -->
          <div class="space-y-4">
            <div>
              <div class="flex items-center justify-between mb-2">
                <RigText variant="caption" color="muted">Animated</RigText>
                <RigText variant="mono" color="accent" class="text-xs"
                  >{{ progressValue }}%</RigText
                >
              </div>
              <RigProgress :value="progressValue" tone="accent" size="md" />
            </div>
            <RigProgress :value="100" tone="success" size="sm" label="Complete" />
            <RigProgress :value="40" tone="warning" size="lg" />
            <RigProgress :indeterminate="true" size="md" label="Loading data" />
          </div>

          <!-- Spinners -->
          <div class="space-y-4">
            <RigText variant="caption" color="muted" class="mb-2">Sizes and tones</RigText>
            <div class="flex items-end gap-5">
              <RigSpinner size="xs" />
              <RigSpinner size="sm" />
              <RigSpinner size="md" />
              <RigSpinner size="lg" tone="muted" />
              <RigSpinner size="xl" tone="current" />
            </div>
          </div>

          <!-- Skeletons -->
          <div class="space-y-4">
            <RigText variant="caption" color="muted" class="mb-2">Content placeholders</RigText>
            <RigSkeleton variant="heading" />
            <RigSkeleton variant="text" :lines="3" />
            <div class="flex gap-3 items-start">
              <RigSkeleton variant="circle" />
              <div class="flex-1 space-y-2">
                <RigSkeleton variant="text" />
                <RigSkeleton variant="text" />
              </div>
            </div>
          </div>
        </div>
      </RigSurface>

      <!-- ================================================================ -->
      <!-- ROW 8: Dialog + Toast (interactive)                              -->
      <!-- ================================================================ -->
      <div v-reveal:scale class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Dialog -->
        <RigSurface elevation="raised" border="subtle" rounded padding="lg" class="panel-lift">
          <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted block mb-8"
            >RigDialog</span
          >
          <RigText variant="caption" color="muted" class="mb-4">
            Teleported modal with focus trap, scroll lock, ESC dismiss, and ARIA attributes.
          </RigText>
          <div class="flex flex-wrap gap-3">
            <RigButton variant="outline" tone="accent" @click="dialogOpen = true"
              >Open dialog</RigButton
            >
            <RigButton variant="ghost" tone="neutral" @click="confirmDialogOpen = true"
              >Confirmation</RigButton
            >
          </div>
        </RigSurface>

        <!-- Toast -->
        <RigSurface elevation="raised" border="subtle" rounded padding="lg" class="panel-lift">
          <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted block mb-8"
            >RigToast</span
          >
          <RigText variant="caption" color="muted" class="mb-4">
            Notification queue with auto-dismiss. Composable-driven — call show() from anywhere.
          </RigText>
          <div class="flex flex-wrap gap-3">
            <RigButton variant="solid" tone="accent" size="sm" @click="showToast('success')"
              >Success</RigButton
            >
            <RigButton variant="outline" tone="neutral" size="sm" @click="showToast('warning')"
              >Warning</RigButton
            >
            <RigButton variant="outline" tone="danger" size="sm" @click="showToast('error')"
              >Error</RigButton
            >
            <RigButton variant="ghost" tone="neutral" size="sm" @click="showToast('info')"
              >Info</RigButton
            >
          </div>
        </RigSurface>
      </div>

      <!-- ================================================================ -->
      <!-- ROW 9: Status + Radio                                            -->
      <!-- ================================================================ -->
      <div v-reveal:scale class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Status -->
        <RigSurface elevation="raised" border="subtle" rounded padding="lg" class="panel-lift">
          <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted block mb-8"
            >RigStatus</span
          >
          <div class="space-y-4">
            <RigText variant="caption" color="muted" class="mb-3"
              >System state indicators with pulse animation</RigText
            >
            <div class="space-y-3">
              <div class="flex items-center gap-6">
                <RigStatus status="healthy" label="Healthy" />
                <RigStatus status="active" label="Active" pulse />
                <RigStatus status="warning" label="Warning" />
              </div>
              <div class="flex items-center gap-6">
                <RigStatus status="critical" label="Critical" pulse />
                <RigStatus status="pending" label="Pending" />
                <RigStatus status="archived" label="Archived" />
              </div>
              <div class="flex items-center gap-6">
                <RigStatus status="wip" label="WIP" />
                <RigStatus status="info" label="Info" />
                <RigStatus status="neutral" label="Neutral" />
              </div>
            </div>
            <RigDivider />
            <div class="flex items-end gap-4">
              <RigStatus status="active" label="Small" size="sm" />
              <RigStatus status="active" label="Medium" size="md" />
              <RigStatus status="active" label="Large" size="lg" />
            </div>
          </div>
        </RigSurface>

        <!-- Radio -->
        <RigSurface elevation="raised" border="subtle" rounded padding="lg" class="panel-lift">
          <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted block mb-8"
            >RigRadio</span
          >
          <div class="space-y-6">
            <RigRadio
              v-model="radioValue"
              name="theme-pick"
              label="Select a theme"
              :options="[
                { value: 'hearth', label: 'Hearth' },
                { value: 'abyss', label: 'Abyss' },
                { value: 'ember', label: 'Ember' },
                { value: 'grove', label: 'Grove' },
              ]"
              description="Themes define the entire visual language."
            />
            <RigDivider />
            <RigRadio
              model-value="a"
              name="horizontal-demo"
              label="Horizontal layout"
              orientation="horizontal"
              :options="[
                { value: 'a', label: 'Option A' },
                { value: 'b', label: 'Option B' },
                { value: 'c', label: 'Option C', disabled: true },
              ]"
            />
          </div>
        </RigSurface>
      </div>

      <!-- ================================================================ -->
      <!-- ROW 10: Stat                                                     -->
      <!-- ================================================================ -->
      <RigSurface
        v-reveal:scale
        elevation="raised"
        border="subtle"
        rounded
        padding="lg"
        class="panel-lift"
      >
        <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted block mb-8"
          >RigStat</span
        >
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <RigStat label="Components" :value="48" icon="mdi:puzzle" trend="up" trend-label="+19" />
          <RigStat
            label="Tests"
            :value="699"
            icon="mdi:check-circle"
            trend="up"
            trend-label="+227"
          />
          <RigStat label="Themes" :value="9" icon="mdi:palette" trend="flat" />
          <RigStat
            label="Composables"
            :value="9"
            icon="mdi:function-variant"
            trend="up"
            trend-label="+5"
          />
        </div>
      </RigSurface>

      <!-- ================================================================ -->
      <!-- ROW 11: Table                                                    -->
      <!-- ================================================================ -->
      <RigSurface
        v-reveal:scale
        elevation="raised"
        border="subtle"
        rounded
        padding="lg"
        class="panel-lift"
      >
        <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted block mb-8"
          >RigTable</span
        >
        <RigTable
          :columns="[
            { key: 'name', label: 'Repository', sortable: true },
            { key: 'category', label: 'Category' },
            { key: 'status', label: 'Status' },
            { key: 'version', label: 'Version', align: 'right' },
          ]"
          :rows="[
            {
              id: '1',
              name: 'hexrig.amulet.ink',
              category: 'software',
              status: 'active',
              version: '2.2.0',
            },
            {
              id: '2',
              name: 'codex.amulet.ink',
              category: 'software',
              status: 'wip',
              version: '0.3.0',
            },
            {
              id: '3',
              name: 'salt.amulet.ink',
              category: 'software',
              status: 'wip',
              version: '0.1.0',
            },
            {
              id: '4',
              name: 'rune.amulet.ink',
              category: 'software',
              status: 'wip',
              version: '0.2.0',
            },
            { id: '5', name: 'amulet.ink', category: 'sites', status: 'active', version: '1.0.0' },
          ]"
          :sort-by="tableSortBy"
          :sort-dir="tableSortDir"
          hoverable
          striped
          compact
          @update:sort-by="tableSortBy = $event"
          @update:sort-dir="tableSortDir = $event"
        />
      </RigSurface>

      <!-- ================================================================ -->
      <!-- ROW 12: Metadata + List                                          -->
      <!-- ================================================================ -->
      <div v-reveal:scale class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Metadata -->
        <RigSurface elevation="raised" border="subtle" rounded padding="lg" class="panel-lift">
          <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted block mb-8"
            >RigMetadata</span
          >
          <RigMetadata
            :items="[
              { label: 'Package', value: '@amulet-laboratories/rig' },
              { label: 'Version', value: '2.2.0', type: 'badge', tone: 'accent' },
              { label: 'Status', value: 'active', type: 'status', tone: 'success' },
              { label: 'License', value: 'MIT' },
              { label: 'Components', value: '48' },
              { label: 'Docs', value: 'hexrig.amulet.ink', type: 'link', href: '/' },
            ]"
            :columns="2"
            separator
          />
        </RigSurface>

        <!-- List -->
        <RigSurface elevation="raised" border="subtle" rounded padding="lg" class="panel-lift">
          <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted block mb-8"
            >RigList</span
          >
          <RigList
            :items="[
              {
                id: '1',
                label: 'Design Tokens',
                description: 'CSS custom properties for every primitive',
                icon: 'mdi:palette',
              },
              {
                id: '2',
                label: 'Components',
                description: '48 accessible Vue 3 components',
                icon: 'mdi:puzzle',
              },
              { id: '3', label: 'Themes', description: '9 themes, 18 variants', icon: 'mdi:brush' },
              {
                id: '4',
                label: 'Composables',
                description: '9 reactive utility functions',
                icon: 'mdi:function-variant',
              },
            ]"
            hoverable
            divided
          />
        </RigSurface>
      </div>

      <!-- ================================================================ -->
      <!-- ROW 13: Timeline + Tree                                          -->
      <!-- ================================================================ -->
      <div v-reveal:scale class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Timeline -->
        <RigSurface elevation="raised" border="subtle" rounded padding="lg" class="panel-lift">
          <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted block mb-8"
            >RigTimeline</span
          >
          <RigTimeline
            :items="[
              {
                id: '1',
                label: 'v1.0.0',
                description: 'Initial release — 33 components',
                tone: 'neutral',
                timestamp: 'Feb 20',
              },
              {
                id: '2',
                label: 'v2.0.0',
                description: 'Token overhaul, brand split',
                tone: 'success',
                timestamp: 'Feb 27',
              },
              {
                id: '3',
                label: 'v2.1.0',
                description: 'Component transitions',
                tone: 'success',
                timestamp: 'Feb 27',
              },
              {
                id: '4',
                label: 'v2.2.0',
                description: '48 components, 9 composables',
                tone: 'accent',
                timestamp: 'Feb 28',
              },
            ]"
          />
        </RigSurface>

        <!-- Tree -->
        <RigSurface elevation="raised" border="subtle" rounded padding="lg" class="panel-lift">
          <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted block mb-8"
            >RigTree</span
          >
          <RigTree
            :nodes="[
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
                ],
              },
            ]"
            v-model:selected="treeSelected"
            v-model:expanded="treeExpanded"
            selectable
          />
          <RigText variant="caption" color="muted" class="mt-3"
            >Selected: {{ treeSelected || 'none' }}</RigText
          >
        </RigSurface>
      </div>

      <!-- ================================================================ -->
      <!-- ROW 14: Panel + Empty + Confirm                                  -->
      <!-- ================================================================ -->
      <div v-reveal:scale class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Panel -->
        <RigSurface elevation="raised" border="subtle" rounded padding="lg" class="panel-lift">
          <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted block mb-8"
            >RigPanel</span
          >
          <RigPanel title="Collapsible section" description="Click to toggle" collapsible bordered>
            <RigText variant="caption" color="secondary">
              Panel content with smooth expand/collapse transition.
            </RigText>
          </RigPanel>
        </RigSurface>

        <!-- Empty -->
        <RigSurface elevation="raised" border="subtle" rounded padding="lg" class="panel-lift">
          <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted block mb-8"
            >RigEmpty</span
          >
          <RigEmpty
            icon="mdi:inbox-outline"
            title="No results"
            description="Try adjusting your filters."
            action-label="Reset filters"
          />
        </RigSurface>

        <!-- Confirm -->
        <RigSurface elevation="raised" border="subtle" rounded padding="lg" class="panel-lift">
          <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted block mb-8"
            >RigConfirm</span
          >
          <RigText variant="caption" color="muted" class="mb-4">
            Preconfigured confirmation dialog with tone-matched actions.
          </RigText>
          <div class="flex flex-wrap gap-3">
            <RigButton variant="outline" tone="danger" size="sm" @click="confirmOpen = true"
              >Delete item</RigButton
            >
          </div>
        </RigSurface>
      </div>

      <!-- ================================================================ -->
      <!-- ROW 15: Split                                                    -->
      <!-- ================================================================ -->
      <RigSurface
        v-reveal:scale
        elevation="raised"
        border="subtle"
        rounded
        padding="lg"
        class="panel-lift"
      >
        <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted block mb-8"
          >RigSplit</span
        >
        <div class="h-[200px] border border-border-subtle rounded overflow-hidden">
          <RigSplit :initial-size="240" :min-size="120" :max-size="400">
            <template #first>
              <div class="p-4 h-full bg-surface-sunken">
                <RigText variant="overline" color="accent">Sidebar</RigText>
                <RigText variant="caption" color="muted" class="mt-2"
                  >Drag the handle to resize.</RigText
                >
              </div>
            </template>
            <template #second>
              <div class="p-4 h-full">
                <RigText variant="overline" color="accent">Content</RigText>
                <RigText variant="caption" color="muted" class="mt-2"
                  >Double-click handle to reset.</RigText
                >
              </div>
            </template>
          </RigSplit>
        </div>
      </RigSurface>

      <!-- ================================================================ -->
      <!-- ROW 16: App Layout                                               -->
      <!-- ================================================================ -->
      <RigSurface
        v-reveal:scale
        elevation="raised"
        border="subtle"
        rounded
        padding="lg"
        class="panel-lift"
      >
        <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted block mb-8"
          >RigAppShell · RigHeader · RigSidebar · RigPage · RigFooter</span
        >
        <div
          class="h-[320px] flex flex-col border border-border-subtle rounded overflow-hidden bg-surface-base"
        >
          <RigHeader title="Tower" bordered>
            <template #trailing>
              <RigButton
                size="sm"
                variant="ghost"
                tone="neutral"
                @click="sidebarCollapsed = !sidebarCollapsed"
              >
                {{ sidebarCollapsed ? 'Expand' : 'Collapse' }}
              </RigButton>
            </template>
          </RigHeader>
          <div class="flex flex-1 min-h-0">
            <RigSidebar
              :collapsed="sidebarCollapsed"
              :width="160"
              :collapsed-width="48"
              bordered
              @update:collapsed="sidebarCollapsed = $event"
            >
              <RigSidebarSection title="Navigation">
                <RigSidebarItem icon="mdi:view-dashboard" label="Dashboard" active />
                <RigSidebarItem icon="mdi:chart-bar" label="Analytics" />
                <RigSidebarItem icon="mdi:cog" label="Settings" />
              </RigSidebarSection>
            </RigSidebar>
            <RigPage
              title="Dashboard"
              description="System overview"
              max-width="full"
              class="flex-1"
            >
              <RigText variant="caption" color="muted"
                >RigPage wraps page-level content with title, description, and optional
                actions.</RigText
              >
            </RigPage>
          </div>
          <RigFooter bordered>
            <div class="flex items-center justify-between">
              <RigText variant="caption" color="muted">Amulet Laboratories</RigText>
              <RigText variant="caption" color="muted">v2.2.0</RigText>
            </div>
          </RigFooter>
        </div>
      </RigSurface>
    </div>

    <!-- Row 17: Layout Primitives & Icon -->
    <div v-reveal class="grid gap-4 mb-8">
      <RigSurface class="panel-lift">
        <RigText variant="heading" class="mb-6">Layout Primitives</RigText>

        <!-- RigIcon showcase -->
        <div class="mb-8">
          <RigText variant="subheading" class="mb-3">RigIcon — Sizes & Colors</RigText>
          <div class="flex flex-wrap items-center gap-4">
            <div class="flex flex-col items-center gap-1">
              <RigIcon name="mdi:star" size="xs" />
              <RigText variant="caption" color="muted">xs</RigText>
            </div>
            <div class="flex flex-col items-center gap-1">
              <RigIcon name="mdi:star" size="sm" />
              <RigText variant="caption" color="muted">sm</RigText>
            </div>
            <div class="flex flex-col items-center gap-1">
              <RigIcon name="mdi:star" size="md" />
              <RigText variant="caption" color="muted">md</RigText>
            </div>
            <div class="flex flex-col items-center gap-1">
              <RigIcon name="mdi:star" size="lg" />
              <RigText variant="caption" color="muted">lg</RigText>
            </div>
            <div class="flex flex-col items-center gap-1">
              <RigIcon name="mdi:star" size="xl" />
              <RigText variant="caption" color="muted">xl</RigText>
            </div>
            <div class="h-12 border-l border-border-subtle mx-2" />
            <div class="flex flex-col items-center gap-1">
              <RigIcon name="mdi:star" color="accent" />
              <RigText variant="caption" color="muted">accent</RigText>
            </div>
            <div class="flex flex-col items-center gap-1">
              <RigIcon name="mdi:star" color="success" />
              <RigText variant="caption" color="muted">success</RigText>
            </div>
            <div class="flex flex-col items-center gap-1">
              <RigIcon name="mdi:star" color="warning" />
              <RigText variant="caption" color="muted">warning</RigText>
            </div>
            <div class="flex flex-col items-center gap-1">
              <RigIcon name="mdi:star" color="error" />
              <RigText variant="caption" color="muted">error</RigText>
            </div>
          </div>
        </div>

        <!-- RigSurface elevations -->
        <div class="mb-8">
          <RigText variant="subheading" class="mb-3">RigSurface — Elevations</RigText>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <RigSurface
              elevation="sunken"
              padding="md"
              class="h-24 flex items-center justify-center"
            >
              <RigText variant="caption" color="muted">sunken</RigText>
            </RigSurface>
            <RigSurface elevation="base" padding="md" class="h-24 flex items-center justify-center">
              <RigText variant="caption" color="muted">base</RigText>
            </RigSurface>
            <RigSurface
              elevation="raised"
              padding="md"
              class="h-24 flex items-center justify-center"
            >
              <RigText variant="caption" color="muted">raised</RigText>
            </RigSurface>
            <RigSurface
              elevation="overlay"
              padding="md"
              class="h-24 flex items-center justify-center"
            >
              <RigText variant="caption" color="muted">overlay</RigText>
            </RigSurface>
          </div>
        </div>

        <!-- RigDivider variants -->
        <div class="mb-8">
          <RigText variant="subheading" class="mb-3">RigDivider — Variants</RigText>
          <div class="space-y-4">
            <RigDivider variant="default" />
            <RigDivider variant="subtle" />
            <RigDivider label="With Label" />
          </div>
        </div>

        <!-- RigStack layout -->
        <div class="mb-8">
          <RigText variant="subheading" class="mb-3">RigStack — Direction & Spacing</RigText>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <RigText variant="caption" color="muted" class="mb-2 block">Horizontal</RigText>
              <RigStack direction="horizontal" gap="md">
                <div class="h-12 w-12 bg-accent rounded" />
                <div class="h-12 w-12 bg-accent-muted rounded" />
                <div class="h-12 w-12 bg-accent-muted/50 rounded" />
              </RigStack>
            </div>
            <div>
              <RigText variant="caption" color="muted" class="mb-2 block">Vertical</RigText>
              <RigStack direction="vertical" gap="md">
                <div class="h-8 bg-accent rounded" />
                <div class="h-8 bg-accent-muted rounded" />
                <div class="h-8 bg-accent-muted/50 rounded" />
              </RigStack>
            </div>
          </div>
        </div>

        <!-- RigGrid cols -->
        <div class="mb-8">
          <RigText variant="subheading" class="mb-3">RigGrid — Columns</RigText>
          <div class="space-y-4">
            <div>
              <RigText variant="caption" color="muted" class="mb-2 block">2 columns</RigText>
              <RigGrid :cols="2" gap="md">
                <div class="h-16 bg-accent-muted rounded" />
                <div class="h-16 bg-accent-muted rounded" />
              </RigGrid>
            </div>
            <div>
              <RigText variant="caption" color="muted" class="mb-2 block">3 columns</RigText>
              <RigGrid :cols="3" gap="md">
                <div class="h-16 bg-accent-muted rounded" />
                <div class="h-16 bg-accent-muted rounded" />
                <div class="h-16 bg-accent-muted rounded" />
              </RigGrid>
            </div>
          </div>
        </div>

        <!-- RigContainer sizes -->
        <div class="mb-8">
          <RigText variant="subheading" class="mb-3">RigContainer — Size Variants</RigText>
          <div class="border-l-2 border-accent space-y-2 pl-4">
            <RigText variant="caption" color="muted">
              Constrains content width: sm (max-w-2xl) | md (max-w-5xl) | lg (max-w-7xl) | full
            </RigText>
            <RigText variant="caption" color="muted">
              Useful wrapper for page sections and consistent horizontal spacing.
            </RigText>
          </div>
        </div>

        <!-- RigSpacer note -->
        <div class="mb-8">
          <RigText variant="subheading" class="mb-3"
            >RigSpacer — Vertical & Horizontal Spacing</RigText
          >
          <div class="flex items-center gap-2">
            <div class="h-6 bg-accent-muted/50 rounded w-full" />
            <RigText variant="caption" color="muted">Spacer (md)</RigText>
            <div class="h-6 bg-accent-muted/50 rounded w-full" />
          </div>
        </div>

        <!-- RigAppShell reference -->
        <div class="bg-surface-raised border border-border-subtle rounded-lg p-4">
          <RigText variant="subheading" class="mb-2">RigAppShell — Orchestrator</RigText>
          <RigText variant="caption" color="muted">
            Composes Header, Sidebar, Page, and Footer into a complete app layout. See Row 16 above
            for a live example.
          </RigText>
        </div>
      </RigSurface>
    </div>

    <!-- Dialogs (teleported to body) -->
    <RigDialog v-model="dialogOpen" title="Component confirmed" size="md">
      <p class="text-text-secondary text-sm leading-relaxed">
        RigDialog supports three sizes (sm, md, lg), dismissible and persistent modes, an optional
        footer slot, and full ARIA labelling. It traps focus and restores it on close.
      </p>
      <template #footer>
        <RigButton variant="ghost" tone="neutral" @click="dialogOpen = false">Cancel</RigButton>
        <RigButton variant="solid" tone="accent" @click="dialogOpen = false">Confirm</RigButton>
      </template>
    </RigDialog>

    <RigDialog
      v-model="confirmDialogOpen"
      title="Delete component?"
      size="sm"
      :dismissible="false"
      :persistent="true"
    >
      <p class="text-text-secondary text-sm leading-relaxed">
        This dialog is persistent — clicking the backdrop does nothing. Only explicit buttons
        dismiss it.
      </p>
      <template #footer>
        <RigButton variant="ghost" tone="neutral" @click="confirmDialogOpen = false"
          >Cancel</RigButton
        >
        <RigButton variant="solid" tone="danger" @click="confirmDialogOpen = false"
          >Delete</RigButton
        >
      </template>
    </RigDialog>

    <RigConfirm
      v-model="confirmOpen"
      title="Delete this item?"
      description="This action cannot be undone. The item and all associated data will be permanently removed."
      confirm-label="Delete"
      cancel-label="Keep"
      tone="danger"
    />

    <!-- See all CTA -->
    <div v-reveal class="max-w-6xl mx-auto mt-12 text-center">
      <a
        href="/storybook/?path=/docs/overview-introduction--docs"
        class="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors font-body text-base"
      >
        See all 56 components in Storybook
        <span class="text-lg">&rarr;</span>
      </a>
    </div>
  </section>
</template>
