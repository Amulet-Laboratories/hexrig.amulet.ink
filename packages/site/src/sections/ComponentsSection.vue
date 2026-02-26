<script setup lang="ts">
import { ref } from 'vue'
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
} from '@amulet-laboratories/rig'

import type { ThemeId } from '@amulet-laboratories/hex'

defineProps<{
  activeTheme: ThemeId
}>()

const inputValue = ref('Amulet')
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
      <h2
        v-reveal
        class="font-display text-4xl sm:text-5xl lg:text-6xl text-text-primary leading-tight mb-4"
      >
        Twenty-eight components.<br />Every piece, considered.
      </h2>
      <p v-reveal class="text-text-muted font-body text-lg max-w-xl">
        Real Rig components below — not mockups. Switch themes above and watch them transform.
      </p>
    </div>

    <div class="max-w-6xl mx-auto space-y-6">
      <!-- Row 1: Buttons -->
      <RigSurface v-reveal elevation="raised" border="subtle" rounded padding="lg">
        <span
          class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted block mb-8"
          >RigButton</span
        >
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

      <!-- Row 2: Card + Input side-by-side -->
      <div v-reveal class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Cards -->
        <RigSurface elevation="raised" border="subtle" rounded padding="lg">
          <span
            class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted block mb-8"
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
                <RigText variant="caption" color="muted" class="mt-1"
                  >Hover me. Press me.</RigText
                >
              </div>
            </RigCard>
          </div>
        </RigSurface>

        <!-- Input -->
        <RigSurface elevation="raised" border="subtle" rounded padding="lg">
          <span
            class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted block mb-8"
            >RigInput</span
          >
          <div class="space-y-5">
            <RigInput
              v-model="inputValue"
              label="Display name"
              description="Your public display name."
            />
            <RigInput label="Email" type="email" placeholder="you@example.com" required />
            <RigInput
              model-value="invalid"
              label="Error state"
              error="This field is required."
            />
          </div>
        </RigSurface>
      </div>

      <!-- Row 3: Alerts + Tabs -->
      <div v-reveal class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Alerts -->
        <RigSurface elevation="raised" border="subtle" rounded padding="lg">
          <span
            class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted block mb-8"
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
          <span
            class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted block mb-8"
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
    </div>

    <!-- See all CTA -->
    <div v-reveal class="max-w-6xl mx-auto mt-12 text-center">
      <a
        href="/storybook/?path=/docs/overview-introduction--docs"
        class="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors font-body text-base"
      >
        See all 28 components in Storybook
        <span class="text-lg">→</span>
      </a>
    </div>
  </section>
</template>
