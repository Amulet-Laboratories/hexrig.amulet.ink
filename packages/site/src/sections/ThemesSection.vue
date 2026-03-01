<script setup lang="ts">
import type { ThemeId } from '@amulet-laboratories/hex'
import { ref, watch, computed } from 'vue'
import {
  RigButton, RigBadge, RigInput, RigAlert, RigDivider,
} from '@amulet-laboratories/rig'

const props = defineProps<{ activeTheme: ThemeId }>()
const emit = defineEmits<{ 'select-theme': [theme: ThemeId] }>()

const themes: {
  id: ThemeId
  name: string
  word: string
  series: string
  narrative: string
  accent: string
  display: string
  body: string
}[] = [
  // Spectrum (Red → Gold → Green → Cyan → Blue → Purple)
  {
    id: 'ember',
    name: 'Ember',
    word: 'Intensity',
    series: 'Spectrum',
    narrative: 'Crimson against char — the loudest theme.',
    accent: '#e04030',
    display: 'Bungee',
    body: 'Exo 2',
  },
  {
    id: 'hearth',
    name: 'Hearth',
    word: 'Creation',
    series: 'Spectrum',
    narrative: 'Amber light, golden purpose — warm and deliberate.',
    accent: '#d4a840',
    display: 'Sorts Mill Goudy',
    body: 'Lora',
  },
  {
    id: 'grove',
    name: 'Grove',
    word: 'Approachability',
    series: 'Spectrum',
    narrative: 'Green light through leaves. Dappled and friendly.',
    accent: '#7cba7e',
    display: 'Libre Baskerville',
    body: 'Plus Jakarta Sans',
  },
  {
    id: 'reef',
    name: 'Reef',
    word: 'Clarity',
    series: 'Spectrum',
    narrative: 'Shallow water over white sand — cool precision.',
    accent: '#40c0b8',
    display: 'DM Sans',
    body: 'Libre Franklin',
  },
  {
    id: 'abyss',
    name: 'Abyss',
    word: 'Nothingness',
    series: 'Spectrum',
    narrative: 'The space between stars — vast, electric, alive.',
    accent: '#4080f0',
    display: 'League Gothic',
    body: 'Lexend',
  },
  {
    id: 'cove',
    name: 'Cove',
    word: 'Shelter',
    series: 'Spectrum',
    narrative: 'The hidden chamber — warm, intimate, otherworldly.',
    accent: '#c040a0',
    display: 'Crimson Pro',
    body: 'Nunito Sans',
  },
  // Neutrals (Warm → Pure → Cool)
  {
    id: 'linen',
    name: 'Linen',
    word: 'Precision',
    series: 'Neutral',
    narrative: 'Off-white with warmth. Not snow — linen.',
    accent: '#b87040',
    display: 'Manrope',
    body: 'Outfit',
  },
  {
    id: 'keep',
    name: 'Keep',
    word: 'Construction',
    series: 'Neutral',
    narrative: 'Steel and purpose — the raw made precise.',
    accent: '#90a088',
    display: 'IBM Plex Serif',
    body: 'IBM Plex Sans',
  },
  {
    id: 'slate',
    name: 'Slate',
    word: 'Nothing',
    series: 'Neutral',
    narrative: 'Cool monochrome. The theme that disappears.',
    accent: '#8090a0',
    display: 'Sora',
    body: 'Work Sans',
  },
]

const spectrumThemes = computed(() => themes.filter((t) => t.series === 'Spectrum'))
const neutralThemes = computed(() => themes.filter((t) => t.series === 'Neutral'))

// Theme preview state
const previewTheme = ref<ThemeId>(props.activeTheme)
const previewMode = ref<'dark' | 'light'>('dark')
const hoveredTheme = ref<ThemeId | null>(null)

// Sync preview when global theme changes (keyboard T, hero dots)
watch(() => props.activeTheme, (t) => {
  previewTheme.value = t
})

// The theme shown in the large preview: hovered theme while hovering, else the clicked theme
const currentPreview = computed(() => hoveredTheme.value ?? previewTheme.value)
const currentPreviewData = computed(() => themes.find(t => t.id === currentPreview.value)!)

// Card interactions
const onCardEnter = (id: ThemeId) => {
  hoveredTheme.value = id
}
const onCardLeave = () => {
  hoveredTheme.value = null
}
const applyTheme = (id: ThemeId) => {
  previewTheme.value = id
  emit('select-theme', id)
}
</script>

<template>
  <section class="relative py-32 px-6">
    <!-- Section header -->
    <div class="max-w-6xl mx-auto mb-20">
      <div v-reveal class="flex items-center gap-3 mb-6">
        <div class="h-px w-8 bg-accent" />
        <span class="text-xs font-mono uppercase tracking-[0.25em] text-accent">Nine Themes</span>
      </div>
      <h2
        v-reveal
        class="font-display text-4xl sm:text-5xl lg:text-6xl text-text-primary leading-tight mb-4"
      >
        Nine worlds.<br />One system.
      </h2>
      <p v-reveal class="text-text-muted font-body text-lg max-w-xl">
        Each theme is a complete visual language — palette, typography, motion, and personality.
        Hover to preview in isolation. Click to apply sitewide.
      </p>
    </div>

    <!-- Spectrum themes (rainbow: Red → Gold → Green → Cyan → Blue → Purple) -->
    <div class="max-w-6xl mx-auto">
      <div v-reveal class="flex items-center gap-3 mb-4">
        <span class="text-[10px] font-mono uppercase tracking-[0.25em] text-text-muted"
          >Spectrum</span
        >
        <div class="h-px flex-1 bg-border-subtle" />
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <button
          v-for="t in spectrumThemes"
          :key="t.id"
          class="group relative text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring rounded-theme"
          @mouseenter="onCardEnter(t.id)"
          @mouseleave="onCardLeave"
          @click="applyTheme(t.id)"
        >
          <!-- Dark preview -->
          <div
            class="rounded-t-theme transition-transform duration-normal ease-standard"
            :class="t.id === previewTheme ? 'scale-[1.02]' : 'group-hover:scale-[1.01]'"
            :data-theme="t.id"
            data-mode="dark"
          >
            <div
              class="h-56 sm:h-64 w-full rounded-t-theme bg-surface-base border border-border-subtle p-4 flex flex-col justify-between"
            >
              <!-- Mini UI vignette -->
              <div class="space-y-2">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full" :style="{ backgroundColor: t.accent }" />
                  <div class="h-1.5 w-16 rounded-full bg-text-muted opacity-30" />
                </div>
                <div class="h-1.5 w-full rounded-full bg-text-muted opacity-15" />
                <div class="h-1.5 w-3/4 rounded-full bg-text-muted opacity-15" />
                <div class="mt-3 flex gap-1.5">
                  <div
                    class="h-5 w-14 rounded text-[8px] flex items-center justify-center text-text-on-accent font-mono"
                    :style="{ backgroundColor: t.accent }"
                  >
                    button
                  </div>
                  <div
                    class="h-5 w-14 rounded border border-border-subtle text-[8px] flex items-center justify-center text-text-muted font-mono"
                  >
                    ghost
                  </div>
                </div>
              </div>

              <!-- Theme identity -->
              <div>
                <div
                  class="w-6 h-1 rounded-full mb-3 transition-all duration-normal"
                  :style="{ backgroundColor: t.accent }"
                  :class="t.id === previewTheme ? 'w-10' : ''"
                />
                <div class="font-display text-lg" :style="{ color: t.accent }">{{ t.name }}</div>
                <div class="text-[10px] text-text-muted mt-0.5 font-mono uppercase tracking-wider">
                  {{ t.word }}
                </div>
              </div>
            </div>
          </div>

          <!-- Light preview -->
          <div class="rounded-b-theme" :data-theme="t.id" data-mode="light">
            <div
              class="h-20 sm:h-24 w-full rounded-b-theme bg-surface-base border border-t-0 border-border-subtle p-4 flex flex-col justify-between"
            >
              <div class="text-xs text-text-muted font-body leading-snug line-clamp-2">
                {{ t.narrative }}
              </div>
              <div class="text-[9px] font-mono text-text-muted opacity-60 mt-1">
                {{ t.display }} · {{ t.body }}
              </div>
            </div>
          </div>

          <!-- Selection indicator -->
          <div
            class="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all duration-normal"
            :class="t.id === previewTheme ? 'bg-accent scale-150' : 'bg-transparent'"
          />
        </button>
      </div>
    </div>

    <!-- Neutrals (Warm → Pure → Cool) -->
    <div class="max-w-6xl mx-auto mt-12">
      <div v-reveal class="flex items-center gap-3 mb-4">
        <span class="text-[10px] font-mono uppercase tracking-[0.25em] text-text-muted"
          >Neutrals</span
        >
        <div class="h-px flex-1 bg-border-subtle" />
      </div>
      <div class="grid grid-cols-3 gap-3 max-w-3xl">
        <button
          v-for="t in neutralThemes"
          :key="t.id"
          class="group relative text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring rounded-theme"
          @mouseenter="onCardEnter(t.id)"
          @mouseleave="onCardLeave"
          @click="applyTheme(t.id)"
        >
          <!-- Dark preview -->
          <div
            class="rounded-t-theme transition-transform duration-normal ease-standard"
            :class="t.id === previewTheme ? 'scale-[1.02]' : 'group-hover:scale-[1.01]'"
            :data-theme="t.id"
            data-mode="dark"
          >
            <div
              class="h-56 sm:h-64 w-full rounded-t-theme bg-surface-base border border-border-subtle p-4 flex flex-col justify-between"
            >
              <!-- Mini UI vignette -->
              <div class="space-y-2">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full" :style="{ backgroundColor: t.accent }" />
                  <div class="h-1.5 w-16 rounded-full bg-text-muted opacity-30" />
                </div>
                <div class="h-1.5 w-full rounded-full bg-text-muted opacity-15" />
                <div class="h-1.5 w-3/4 rounded-full bg-text-muted opacity-15" />
                <div class="mt-3 flex gap-1.5">
                  <div
                    class="h-5 w-14 rounded text-[8px] flex items-center justify-center text-text-on-accent font-mono"
                    :style="{ backgroundColor: t.accent }"
                  >
                    button
                  </div>
                  <div
                    class="h-5 w-14 rounded border border-border-subtle text-[8px] flex items-center justify-center text-text-muted font-mono"
                  >
                    ghost
                  </div>
                </div>
              </div>

              <!-- Theme identity -->
              <div>
                <div
                  class="w-6 h-1 rounded-full mb-3 transition-all duration-normal"
                  :style="{ backgroundColor: t.accent }"
                  :class="t.id === previewTheme ? 'w-10' : ''"
                />
                <div class="font-display text-lg" :style="{ color: t.accent }">{{ t.name }}</div>
                <div class="text-[10px] text-text-muted mt-0.5 font-mono uppercase tracking-wider">
                  {{ t.word }}
                </div>
              </div>
            </div>
          </div>

          <!-- Light preview -->
          <div class="rounded-b-theme" :data-theme="t.id" data-mode="light">
            <div
              class="h-20 sm:h-24 w-full rounded-b-theme bg-surface-base border border-t-0 border-border-subtle p-4 flex flex-col justify-between"
            >
              <div class="text-xs text-text-muted font-body leading-snug line-clamp-2">
                {{ t.narrative }}
              </div>
              <div class="text-[9px] font-mono text-text-muted opacity-60 mt-1">
                {{ t.display }} · {{ t.body }}
              </div>
            </div>
          </div>

          <!-- Selection indicator -->
          <div
            class="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all duration-normal"
            :class="t.id === previewTheme ? 'bg-accent scale-150' : 'bg-transparent'"
          />
        </button>
      </div>
    </div>

    <!-- Theme Preview Panel -->
    <div class="max-w-6xl mx-auto mt-20">
      <div v-reveal class="flex items-center gap-3 mb-6">
        <span class="text-[10px] font-mono uppercase tracking-[0.25em] text-text-muted">Live Preview</span>
        <div class="h-px flex-1 bg-border-subtle" />
      </div>

      <div
        :data-theme="currentPreview"
        :data-mode="previewMode"
        class="rounded-theme border border-border-subtle overflow-hidden bg-surface-base"
      >
        <!-- Preview header: identity + mode toggle -->
        <div class="flex items-start justify-between p-6 border-b border-border-subtle gap-6">
          <div>
            <div
              class="font-display text-4xl sm:text-5xl leading-tight mb-1"
              :style="{ color: currentPreviewData.accent }"
            >
              {{ currentPreviewData.name }}
            </div>
            <div class="text-xs font-mono uppercase tracking-[0.2em] text-text-muted mb-2">
              {{ currentPreviewData.word }} · {{ currentPreviewData.series }}
            </div>
            <p class="text-sm text-text-secondary font-body max-w-xs">
              {{ currentPreviewData.narrative }}
            </p>
          </div>
          <div class="flex-shrink-0 flex gap-2">
            <button
              class="px-3 py-1.5 text-xs font-mono rounded border transition-colors duration-fast"
              :class="previewMode === 'dark'
                ? 'bg-accent text-text-on-accent border-accent'
                : 'border-border-subtle text-text-muted hover:border-border-strong hover:text-text-primary'"
              @click="previewMode = 'dark'"
            >dark</button>
            <button
              class="px-3 py-1.5 text-xs font-mono rounded border transition-colors duration-fast"
              :class="previewMode === 'light'
                ? 'bg-accent text-text-on-accent border-accent'
                : 'border-border-subtle text-text-muted hover:border-border-strong hover:text-text-primary'"
              @click="previewMode = 'light'"
            >light</button>
          </div>
        </div>

        <!-- Typography + palette row -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-0 border-b border-border-subtle">
          <!-- Typography -->
          <div class="p-6 border-b sm:border-b-0 sm:border-r border-border-subtle">
            <div class="text-[10px] font-mono uppercase tracking-[0.25em] text-text-muted mb-4">
              Typography
            </div>
            <div class="space-y-3">
              <div>
                <div class="text-[9px] font-mono text-text-muted uppercase tracking-widest mb-1">Display</div>
                <div class="font-display text-2xl text-text-primary">{{ currentPreviewData.display }}</div>
              </div>
              <div>
                <div class="text-[9px] font-mono text-text-muted uppercase tracking-widest mb-1">Body</div>
                <div class="font-body text-base text-text-primary">{{ currentPreviewData.body }}</div>
              </div>
            </div>
          </div>

          <!-- Color tokens -->
          <div class="p-6">
            <div class="text-[10px] font-mono uppercase tracking-[0.25em] text-text-muted mb-4">
              Color tokens
            </div>
            <div class="space-y-3">
              <div class="flex items-center gap-2 flex-wrap">
                <div class="w-6 h-6 rounded-full bg-accent" title="accent" />
                <div class="w-6 h-6 rounded-full bg-accent-muted" title="accent-muted" />
                <div class="w-6 h-6 rounded-full bg-surface-raised border border-border-subtle" title="surface-raised" />
                <div class="w-6 h-6 rounded-full bg-surface-sunken border border-border-subtle" title="surface-sunken" />
                <div class="w-px h-5 bg-border-subtle mx-1" />
                <div class="w-6 h-6 rounded-full bg-status-success" title="success" />
                <div class="w-6 h-6 rounded-full bg-status-warning" title="warning" />
                <div class="w-6 h-6 rounded-full bg-status-error" title="error" />
                <div class="w-6 h-6 rounded-full bg-status-info" title="info" />
              </div>
              <div class="flex gap-2">
                <RigBadge variant="solid" tone="accent">accent</RigBadge>
                <RigBadge variant="soft" tone="success">success</RigBadge>
                <RigBadge variant="soft" tone="warning">warning</RigBadge>
                <RigBadge variant="soft" tone="error">error</RigBadge>
              </div>
            </div>
          </div>
        </div>

        <!-- Live components -->
        <div class="p-6 space-y-6">
          <div class="text-[10px] font-mono uppercase tracking-[0.25em] text-text-muted">
            Components
          </div>

          <!-- Button matrix -->
          <div class="space-y-2">
            <div class="flex flex-wrap gap-2">
              <RigButton variant="solid" tone="accent" size="sm">Primary</RigButton>
              <RigButton variant="outline" tone="accent" size="sm">Outline</RigButton>
              <RigButton variant="ghost" tone="accent" size="sm">Ghost</RigButton>
              <RigButton variant="link" tone="accent" size="sm">Link</RigButton>
              <RigButton variant="solid" tone="neutral" size="sm">Neutral</RigButton>
              <RigButton variant="solid" tone="danger" size="sm">Danger</RigButton>
              <RigButton variant="solid" tone="accent" size="sm" loading>Loading</RigButton>
              <RigButton variant="solid" tone="accent" size="sm" disabled>Disabled</RigButton>
            </div>
          </div>

          <RigDivider variant="subtle" />

          <!-- Form + alerts -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="space-y-4">
              <RigInput
                label="Display name"
                placeholder="Your name here"
                description="Used across all interfaces."
              />
              <RigInput
                label="Email"
                type="email"
                placeholder="you@example.com"
              />
            </div>
            <div class="space-y-3">
              <RigAlert
                tone="info"
                title="Theme preview"
                description="These components use this theme's complete token set."
              />
              <RigAlert
                tone="success"
                title="WCAG AAA"
                description="Every color combination meets the highest contrast standard."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
