<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {
  RigButton, RigInput, RigAlert, RigDivider,
} from '@amulet-laboratories/rig'
import { useHexEngine, generateRecommendedThemes, applyThemeCSS } from '../composables/useHexEngine'
import type { RecommendedTheme } from '../composables/useHexEngine'

const {
  selectedArchetype,
  selectedWeight,
  selectedAttitude,
  selectedMode,
  currentTheme,
  currentArchetype,
  archetypes,
  weights,
  attitudes,
  modes,
} = useHexEngine()

// Apply CSS whenever theme builder selection changes
watch(
  () => ({ selectedArchetype, selectedWeight, selectedAttitude, selectedMode }),
  () => {
    applyThemeCSS({
      archetype: selectedArchetype.value,
      weight: selectedWeight.value,
      attitude: selectedAttitude.value,
      mode: selectedMode.value,
    })
  },
  { immediate: true, deep: true },
)

const recommendedThemes = computed(() => generateRecommendedThemes())

// Preview state
const previewTheme = ref<RecommendedTheme | null>(null)
const hoveredTheme = ref<string | null>(null)

const currentPreview = computed(() => {
  if (hoveredTheme.value) {
    return recommendedThemes.value.find(t => t.id === hoveredTheme.value)
  }
  return previewTheme.value ?? recommendedThemes.value[0]
})

const onCardEnter = (id: string) => {
  hoveredTheme.value = id
}
const onCardLeave = () => {
  hoveredTheme.value = null
}
const applyTheme = (theme: RecommendedTheme) => {
  previewTheme.value = theme
}
</script>

<template>
  <section class="relative py-32 px-6">
    <!-- Section header -->
    <div class="max-w-6xl mx-auto mb-20">
      <div v-reveal class="flex items-center gap-3 mb-6">
        <div class="h-px w-8 bg-accent" />
        <span class="text-xs font-mono uppercase tracking-[0.25em] text-accent">Theme System</span>
      </div>
      <h2
        v-reveal
        class="font-display text-4xl sm:text-5xl lg:text-6xl text-text-primary leading-tight mb-4"
      >
        Generative design tokens.<br />Infinite combinations.
      </h2>
      <p v-reveal class="text-text-muted font-body text-lg max-w-xl">
        Eight archetypes × three weights × four attitudes × two modes = 192 complete theme systems.
        Built with hex-engine for precision and control.
      </p>
    </div>

    <!-- Recommended themes showcase -->
    <div class="max-w-6xl mx-auto">
      <div v-reveal class="flex items-center gap-3 mb-4">
        <span class="text-[10px] font-mono uppercase tracking-[0.25em] text-text-muted">Recommended</span>
        <div class="h-px flex-1 bg-border-subtle" />
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-20">
        <button
          v-for="t in recommendedThemes"
          :key="t.id"
          class="group relative text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring rounded-theme"
          @mouseenter="onCardEnter(t.id)"
          @mouseleave="onCardLeave"
          @click="applyTheme(t)"
        >
          <!-- Dark preview -->
          <div
            class="rounded-t-theme transition-transform duration-normal ease-standard"
            :class="currentPreview?.id === t.id ? 'scale-[1.02]' : 'group-hover:scale-[1.01]'"
            :data-theme="`${t.archetype}-${t.weight}-${t.attitude}`"
            :data-mode="t.mode"
          >
            <div
              class="h-40 sm:h-48 w-full rounded-t-theme bg-surface-base border border-border-subtle p-4 flex flex-col justify-between"
            >
              <div class="space-y-2">
                <div class="flex items-center gap-2">
                  <div
                    class="w-2 h-2 rounded-full"
                    :style="{ backgroundColor: t.tokens?.accent || '#888' }"
                  />
                  <div class="h-1.5 w-16 rounded-full bg-text-muted opacity-30" />
                </div>
                <div class="h-1.5 w-full rounded-full bg-text-muted opacity-15" />
              </div>

              <div>
                <div
                  class="w-6 h-1 rounded-full mb-3 transition-all duration-normal"
                  :style="{ backgroundColor: t.tokens?.accent || '#888' }"
                  :class="currentPreview?.id === t.id ? 'w-10' : ''"
                />
                <div class="font-display text-lg" :style="{ color: t.tokens?.accent || '#888' }">
                  {{ t.name }}
                </div>
                <div class="text-[9px] text-text-muted mt-0.5 font-mono uppercase tracking-wider">
                  {{ t.attitude }}
                </div>
              </div>
            </div>
          </div>

          <!-- Light preview -->
          <div class="rounded-b-theme" :data-theme="`${t.archetype}-${t.weight}-${t.attitude}`" data-mode="day">
            <div
              class="h-16 sm:h-20 w-full rounded-b-theme bg-surface-base border border-t-0 border-border-subtle p-4 flex items-start"
            >
              <div class="text-[10px] text-text-muted font-body leading-tight line-clamp-2">
                {{ t.narrative }}
              </div>
            </div>
          </div>

          <!-- Selection indicator -->
          <div
            class="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all duration-normal"
            :class="currentPreview?.id === t.id ? 'bg-accent scale-150' : 'bg-transparent'"
          />
        </button>
      </div>
    </div>

    <!-- Theme Builder -->
    <div class="max-w-6xl mx-auto mt-20">
      <div v-reveal class="flex items-center gap-3 mb-6">
        <span class="text-[10px] font-mono uppercase tracking-[0.25em] text-text-muted">Theme Builder</span>
        <div class="h-px flex-1 bg-border-subtle" />
      </div>

      <!-- Axis selectors -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div>
          <label class="text-[10px] font-mono uppercase tracking-wider text-text-muted block mb-2">
            Archetype
          </label>
          <select
            v-model="selectedArchetype"
            class="w-full px-3 py-2 text-sm bg-surface-base border border-border-subtle rounded text-text-primary focus:outline-none focus:border-accent"
          >
            <option v-for="a in archetypes" :key="a.key" :value="a.key">
              {{ a.name }}
            </option>
          </select>
        </div>
        <div>
          <label class="text-[10px] font-mono uppercase tracking-wider text-text-muted block mb-2">
            Weight
          </label>
          <select
            v-model="selectedWeight"
            class="w-full px-3 py-2 text-sm bg-surface-base border border-border-subtle rounded text-text-primary focus:outline-none focus:border-accent"
          >
            <option v-for="w in weights" :key="w" :value="w">
              {{ w }}
            </option>
          </select>
        </div>
        <div>
          <label class="text-[10px] font-mono uppercase tracking-wider text-text-muted block mb-2">
            Attitude
          </label>
          <select
            v-model="selectedAttitude"
            class="w-full px-3 py-2 text-sm bg-surface-base border border-border-subtle rounded text-text-primary focus:outline-none focus:border-accent"
          >
            <option v-for="a in attitudes" :key="a" :value="a">
              {{ a }}
            </option>
          </select>
        </div>
        <div>
          <label class="text-[10px] font-mono uppercase tracking-wider text-text-muted block mb-2">
            Mode
          </label>
          <select
            v-model="selectedMode"
            class="w-full px-3 py-2 text-sm bg-surface-base border border-border-subtle rounded text-text-primary focus:outline-none focus:border-accent"
          >
            <option v-for="m in modes" :key="m" :value="m">
              {{ m }}
            </option>
          </select>
        </div>
      </div>

      <!-- Live preview -->
      <div
        id="hex-theme-builder"
        class="rounded-theme border border-border-subtle overflow-hidden bg-surface-base"
      >
        <!-- Preview header -->
        <div class="p-6 border-b border-border-subtle">
          <div class="mb-4">
            <div class="font-display text-3xl sm:text-4xl leading-tight text-text-primary mb-2">
              {{ currentArchetype?.name }}
            </div>
            <div class="text-xs font-mono uppercase tracking-widest text-text-muted">
              {{ selectedWeight }} · {{ selectedAttitude }} · {{ selectedMode }}
            </div>
          </div>
          <p class="text-sm text-text-secondary font-body max-w-2xl">
            {{ currentArchetype?.key }} archetype with
            <span class="font-mono">{{ selectedWeight }}</span> weight and
            <span class="font-mono">{{ selectedAttitude }}</span> attitude in
            <span class="font-mono">{{ selectedMode }}</span> mode.
          </p>
        </div>

        <!-- Typography + palette -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-0 border-b border-border-subtle">
          <!-- Typography -->
          <div class="p-6 border-b sm:border-b-0 sm:border-r border-border-subtle">
            <div class="text-[10px] font-mono uppercase tracking-[0.25em] text-text-muted mb-4">
              Typography
            </div>
            <div class="space-y-3">
              <div>
                <div class="text-[9px] font-mono text-text-muted uppercase tracking-widest mb-1">Display</div>
                <div class="font-display text-2xl text-text-primary">{{ currentArchetype?.typography.fontDisplay.split(',')[0] }}</div>
              </div>
              <div>
                <div class="text-[9px] font-mono text-text-muted uppercase tracking-widest mb-1">Body</div>
                <div class="font-body text-base text-text-primary">{{ currentArchetype?.typography.fontBody.split(',')[0] }}</div>
              </div>
            </div>
          </div>

          <!-- Color tokens -->
          <div class="p-6">
            <div class="text-[10px] font-mono uppercase tracking-[0.25em] text-text-muted mb-4">
              Generated tokens
            </div>
            <div class="space-y-2 text-sm font-mono">
              <div class="flex justify-between">
                <span class="text-text-muted">accent</span>
                <span class="text-text-primary" :style="{ color: currentTheme?.accent }">{{ currentTheme?.accent }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-text-muted">primary</span>
                <span class="text-text-primary" :style="{ color: currentTheme?.primary }">{{ currentTheme?.primary }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-text-muted">success</span>
                <span class="text-text-primary" :style="{ color: currentTheme?.success }">{{ currentTheme?.success }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Live components -->
        <div class="p-6 space-y-6">
          <div class="text-[10px] font-mono uppercase tracking-[0.25em] text-text-muted">
            Components
          </div>

          <div class="flex flex-wrap gap-2">
            <RigButton variant="solid" tone="accent" size="sm">Primary</RigButton>
            <RigButton variant="outline" tone="accent" size="sm">Outline</RigButton>
            <RigButton variant="ghost" tone="accent" size="sm">Ghost</RigButton>
            <RigButton variant="solid" tone="neutral" size="sm">Neutral</RigButton>
            <RigButton variant="solid" tone="danger" size="sm">Danger</RigButton>
          </div>

          <RigDivider variant="subtle" />

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="space-y-4">
              <RigInput
                label="Display name"
                placeholder="Your name here"
              />
            </div>
            <div class="space-y-3">
              <RigAlert
                tone="success"
                title="192 combinations"
                description="8 archetypes × 3 weights × 4 attitudes × 2 modes."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
