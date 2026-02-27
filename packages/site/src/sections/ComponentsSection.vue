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
        Twenty-nine components.<br />Every piece, considered.
      </h2>
      <p v-reveal class="text-text-muted font-body text-lg max-w-xl">
        Real Rig components below — not mockups. Switch themes above and watch them transform.
      </p>
    </div>

    <div class="max-w-6xl mx-auto space-y-6">
      <!-- ================================================================ -->
      <!-- ROW 1: Buttons                                                   -->
      <!-- ================================================================ -->
      <RigSurface v-reveal elevation="raised" border="subtle" rounded padding="lg">
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
      <div v-reveal class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Cards -->
        <RigSurface elevation="raised" border="subtle" rounded padding="lg">
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
        <RigSurface elevation="raised" border="subtle" rounded padding="lg">
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
      <div v-reveal class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Avatar + Tag -->
        <RigSurface elevation="raised" border="subtle" rounded padding="lg">
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
        <RigSurface elevation="raised" border="subtle" rounded padding="lg">
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
      <RigSurface v-reveal elevation="raised" border="subtle" rounded padding="lg">
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
      <div v-reveal class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Alerts -->
        <RigSurface elevation="raised" border="subtle" rounded padding="lg">
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
        <RigSurface elevation="raised" border="subtle" rounded padding="lg">
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
      <div v-reveal class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Accordion -->
        <RigSurface elevation="raised" border="subtle" rounded padding="lg">
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
        <RigSurface elevation="raised" border="subtle" rounded padding="lg">
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
      <RigSurface v-reveal elevation="raised" border="subtle" rounded padding="lg">
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
      <div v-reveal class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Dialog -->
        <RigSurface elevation="raised" border="subtle" rounded padding="lg">
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
        <RigSurface elevation="raised" border="subtle" rounded padding="lg">
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

    <!-- See all CTA -->
    <div v-reveal class="max-w-6xl mx-auto mt-12 text-center">
      <a
        href="/storybook/?path=/docs/overview-introduction--docs"
        class="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors font-body text-base"
      >
        See all 29 components in Storybook
        <span class="text-lg">&rarr;</span>
      </a>
    </div>
  </section>
</template>
