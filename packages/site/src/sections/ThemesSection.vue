<script setup lang="ts">
import type { ThemeId } from '@amulet-laboratories/hex'

defineProps<{
  activeTheme: ThemeId
}>()

defineEmits<{
  'select-theme': [theme: ThemeId]
}>()

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
  // Environments
  {
    id: 'hearth',
    name: 'Hearth',
    word: 'Creation',
    series: 'Environments',
    narrative: 'Raw material shaped by heat and intention.',
    accent: '#c9956d',
    display: 'Sorts Mill Goudy',
    body: 'Lora',
  },
  {
    id: 'abyss',
    name: 'Abyss',
    word: 'Nothingness',
    series: 'Environments',
    narrative: 'The space between stars — vast, electric, alive.',
    accent: '#aef66d',
    display: 'League Gothic',
    body: 'Inter',
  },
  {
    id: 'cove',
    name: 'Cove',
    word: 'Shelter',
    series: 'Environments',
    narrative: 'The hidden chamber — warm, intimate, otherworldly.',
    accent: '#d43050',
    display: 'Crimson Pro',
    body: 'Nunito Sans',
  },
  {
    id: 'glyph',
    name: 'Glyph',
    word: 'Inscription',
    series: 'Environments',
    narrative: 'Parchment and ink. Red marginalia in a manuscript.',
    accent: '#c44030',
    display: 'IM Fell English',
    body: 'EB Garamond',
  },
  {
    id: 'ember',
    name: 'Ember',
    word: 'Intensity',
    series: 'Environments',
    narrative: 'Bold reds against the deep black of cooling lava.',
    accent: '#e84820',
    display: 'Bungee',
    body: 'Exo 2',
  },
  // Materials
  {
    id: 'keep',
    name: 'Keep',
    word: 'Construction',
    series: 'Materials',
    narrative: 'Steel and purpose — the raw made precise.',
    accent: '#ff8f2e',
    display: 'IBM Plex Serif',
    body: 'IBM Plex Sans',
  },
  {
    id: 'slate',
    name: 'Slate',
    word: 'Nothing',
    series: 'Materials',
    narrative: 'Monochrome. The theme that disappears.',
    accent: '#6090d0',
    display: 'Sora',
    body: 'Work Sans',
  },
  {
    id: 'linen',
    name: 'Linen',
    word: 'Precision',
    series: 'Materials',
    narrative: 'Off-white with warmth. Not snow — linen.',
    accent: '#5088b8',
    display: 'Manrope',
    body: 'Outfit',
  },
  {
    id: 'cairn',
    name: 'Cairn',
    word: 'Trust',
    series: 'Materials',
    narrative: 'Warm stone. Sun-heated granite with lichen.',
    accent: '#8aaa68',
    display: 'Libre Franklin',
    body: 'Rubik',
  },
  {
    id: 'grove',
    name: 'Grove',
    word: 'Approachability',
    series: 'Materials',
    narrative: 'Soft neutral with sage green. Dappled light.',
    accent: '#7cba7e',
    display: 'Libre Baskerville',
    body: 'Plus Jakarta Sans',
  },
]
</script>

<template>
  <section class="relative py-32 px-6">
    <!-- Section header -->
    <div class="max-w-6xl mx-auto mb-20">
      <div v-reveal class="flex items-center gap-3 mb-6">
        <div class="h-px w-8 bg-accent" />
        <span class="text-xs font-mono uppercase tracking-[0.25em] text-accent">Ten Themes</span>
      </div>
      <h2
        v-reveal
        class="font-display text-4xl sm:text-5xl lg:text-6xl text-text-primary leading-tight mb-4"
      >
        Ten worlds.<br />One system.
      </h2>
      <p v-reveal class="text-text-muted font-body text-lg max-w-xl">
        Each theme is a complete visual language — palette, typography, motion, and personality.
        Click any to see every element on this page respond.
      </p>
    </div>

    <!-- Theme cards -->
    <div v-reveal class="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-5 gap-3">
      <button
        v-for="t in themes"
        :key="t.id"
        class="group relative text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring rounded-theme"
        @click="$emit('select-theme', t.id)"
      >
        <!-- Dark preview -->
        <div
          class="rounded-t-theme transition-transform duration-normal ease-standard"
          :class="t.id === activeTheme ? 'scale-[1.02]' : 'group-hover:scale-[1.01]'"
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
                :class="t.id === activeTheme ? 'w-10' : ''"
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
          :class="t.id === activeTheme ? 'bg-accent scale-150' : 'bg-transparent'"
        />
      </button>
    </div>
  </section>
</template>
