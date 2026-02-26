<script setup lang="ts">
import { ref } from 'vue'
import {
  RigButton,
  RigCard,
  RigInput,
  RigAlert,
  RigBadge,
  RigText,
  RigDivider,
  RigSwitch,
  RigCheckbox,
  RigProgress,
  RigTabs,
  RigAvatar,
  RigTag,
  RigSpinner,
  RigTooltip,
  RigSurface,
} from '@amulet-laboratories/rig'

import type { ThemeId } from '@amulet-laboratories/hex'

defineProps<{
  activeTheme: ThemeId
}>()

const inputValue = ref('Amulet')
const emailValue = ref('')
const errorValue = ref('invalid')
const switchValue = ref(true)
const checkValue = ref(true)
const progressValue = ref(68)
const activeTab = ref('overview')
</script>

<template>
  <section class="relative py-32 px-6">
    <!-- Section header -->
    <div class="max-w-6xl mx-auto mb-20">
      <div v-reveal class="flex items-center gap-3 mb-6">
        <div class="h-px w-8 bg-accent" />
        <span class="text-xs font-mono uppercase tracking-[0.25em] text-accent">Components</span>
      </div>
      <h2 v-reveal class="font-display text-4xl sm:text-5xl lg:text-6xl text-text-primary leading-tight">
        Every piece,<br />considered.
      </h2>
      <p v-reveal class="text-text-muted font-body text-lg mt-4 max-w-xl">
        28 components. Real Rig components below — not mockups.
      </p>
    </div>

    <div class="max-w-6xl mx-auto space-y-6">

      <!-- Row 1: Buttons -->
      <RigSurface v-reveal elevation="raised" border="subtle" rounded padding="lg">
        <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted block mb-8">RigButton</span>
        <div class="flex flex-wrap items-center gap-4">
          <RigButton variant="solid" tone="accent">Primary</RigButton>
          <RigButton variant="outline" tone="accent">Outline</RigButton>
          <RigButton variant="ghost" tone="accent">Ghost</RigButton>
          <RigButton variant="solid" tone="neutral">Neutral</RigButton>
          <RigButton variant="solid" tone="danger">Danger</RigButton>
          <RigButton variant="solid" tone="accent" loading>Loading</RigButton>
          <RigButton variant="solid" tone="accent" size="sm">Small</RigButton>
          <RigButton variant="solid" tone="accent" size="lg">Large</RigButton>
        </div>
      </RigSurface>

      <!-- Row 2: Cards + Inputs -->
      <div v-reveal class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Cards -->
        <RigSurface elevation="raised" border="subtle" rounded padding="lg">
          <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted block mb-8">RigCard</span>
          <div class="space-y-4">
            <RigCard elevation="flat">
              <div class="px-4 pt-4 pb-2 border-b border-border-subtle">
                <RigText variant="body" weight="semibold">Flat</RigText>
              </div>
              <div class="p-4">
                <RigText variant="caption" color="secondary">No elevation. Grounded in the surface.</RigText>
              </div>
            </RigCard>
            <RigCard elevation="raised">
              <div class="px-4 pt-4 pb-2 border-b border-border-subtle">
                <RigText variant="body" weight="semibold">Raised</RigText>
              </div>
              <div class="p-4">
                <RigText variant="caption" color="secondary">Lifted from the surface. Default state.</RigText>
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

        <!-- Inputs -->
        <RigSurface elevation="raised" border="subtle" rounded padding="lg">
          <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted block mb-8">RigInput</span>
          <div class="space-y-5">
            <RigInput
              v-model="inputValue"
              label="Display name"
              description="Your public display name."
            />
            <RigInput
              v-model="emailValue"
              label="Email"
              type="email"
              placeholder="you@example.com"
              required
            />
            <RigInput
              v-model="errorValue"
              label="Error state"
              error="This field is required."
            />
          </div>
        </RigSurface>
      </div>

      <!-- Row 3: Alerts + Badges/Tags/Typography -->
      <div v-reveal class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Alerts -->
        <RigSurface elevation="raised" border="subtle" rounded padding="lg">
          <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted block mb-8">RigAlert</span>
          <div class="space-y-3">
            <RigAlert tone="success" title="Changes saved" />
            <RigAlert tone="warning" title="Approaching rate limit" />
            <RigAlert tone="error" title="Deployment failed" />
            <RigAlert tone="info" title="New version available" />
          </div>
        </RigSurface>

        <!-- Badges, Tags, Typography -->
        <RigSurface elevation="raised" border="subtle" rounded padding="lg">
          <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted block mb-8">RigBadge · RigTag · RigText</span>
          <div class="space-y-6">
            <div class="flex flex-wrap gap-2">
              <RigBadge variant="soft" tone="accent">Default</RigBadge>
              <RigBadge variant="soft" tone="success" dot>Live</RigBadge>
              <RigBadge variant="soft" tone="warning">Pending</RigBadge>
              <RigBadge variant="outline" tone="error">Failed</RigBadge>
              <RigBadge variant="outline" tone="neutral">Draft</RigBadge>
            </div>

            <div class="flex flex-wrap gap-2">
              <RigTag label="Vue 3" variant="soft" />
              <RigTag label="TypeScript" variant="soft" />
              <RigTag label="Tailwind" variant="soft" />
              <RigTag label="WCAG AAA" variant="outline" />
              <RigTag label="Removable" variant="soft" removable />
            </div>

            <RigDivider label="Typography" />

            <div class="space-y-3">
              <RigText variant="display" as="p">Display text</RigText>
              <RigText variant="heading" as="p">Heading text</RigText>
              <RigText variant="body" color="secondary">Body text — secondary color for sustained reading.</RigText>
              <RigText variant="caption" color="muted">Caption text — muted, contextual.</RigText>
              <RigText variant="mono" color="accent">const theme = 'hearth'</RigText>
            </div>
          </div>
        </RigSurface>
      </div>

      <!-- Row 4: Controls + Feedback -->
      <div v-reveal class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Controls -->
        <RigSurface elevation="raised" border="subtle" rounded padding="lg">
          <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted block mb-8">Controls</span>
          <div class="space-y-6">
            <RigSwitch v-model="switchValue" label="Enable notifications" description="Receive alerts when deployments complete." />
            <RigCheckbox v-model="checkValue" label="Accept terms" description="You agree to the terms of service." />

            <RigDivider />

            <div>
              <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted block mb-4">RigTabs</span>
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
                  {{ activeTab === 'overview' ? 'Design system overview and getting started.' : activeTab === 'tokens' ? 'All token namespaces and CSS custom properties.' : 'Installation and usage in your project.' }}
                </RigText>
              </RigSurface>
            </div>
          </div>
        </RigSurface>

        <!-- Feedback -->
        <RigSurface elevation="raised" border="subtle" rounded padding="lg">
          <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted block mb-8">Feedback</span>
          <div class="space-y-6">
            <div>
              <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted block mb-3">RigProgress</span>
              <div class="space-y-3">
                <RigProgress :value="progressValue" label="Build progress" />
                <RigProgress :value="85" tone="success" label="Tests passing" />
                <RigProgress indeterminate tone="accent" label="Deploying..." />
              </div>
            </div>

            <RigDivider />

            <div>
              <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted block mb-3">RigSpinner · RigAvatar</span>
              <div class="flex items-center gap-6">
                <div class="flex items-center gap-3">
                  <RigSpinner size="sm" />
                  <RigSpinner size="md" />
                  <RigSpinner size="lg" />
                </div>
                <RigDivider orientation="vertical" class="h-10" />
                <div class="flex items-center gap-3">
                  <RigAvatar name="Amulet Labs" size="sm" />
                  <RigAvatar name="Hex Origins" size="md" />
                  <RigTooltip content="No image — falls back to initials">
                    <RigAvatar name="Rig Components" size="lg" />
                  </RigTooltip>
                </div>
              </div>
            </div>

            <RigDivider />

            <div>
              <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted block mb-3">RigTooltip</span>
              <div class="flex gap-3">
                <RigTooltip content="Top tooltip" placement="top">
                  <RigButton variant="outline" tone="neutral" size="sm">Top</RigButton>
                </RigTooltip>
                <RigTooltip content="Bottom tooltip" placement="bottom">
                  <RigButton variant="outline" tone="neutral" size="sm">Bottom</RigButton>
                </RigTooltip>
                <RigTooltip content="Left tooltip" placement="left">
                  <RigButton variant="outline" tone="neutral" size="sm">Left</RigButton>
                </RigTooltip>
                <RigTooltip content="Right tooltip" placement="right">
                  <RigButton variant="outline" tone="neutral" size="sm">Right</RigButton>
                </RigTooltip>
              </div>
            </div>
          </div>
        </RigSurface>
      </div>

    </div>
  </section>
</template>
