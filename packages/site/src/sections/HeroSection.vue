<script setup lang="ts">
import type { ThemeId } from '@amulet-laboratories/hex'

defineProps<{
  theme: ThemeId
  mode: 'dark' | 'light'
}>()

defineEmits<{
  'cycle-theme': []
  'toggle-mode': []
  'select-theme': [theme: ThemeId]
}>()

const themeNames: Record<ThemeId, string> = {
  hearth: 'Hearth',
  abyss: 'Abyss',
  hollow: 'Hollow',
  keep: 'Keep',
  cove: 'Cove',
}

const themeWords: Record<ThemeId, string> = {
  hearth: 'Creation',
  abyss: 'Nothingness',
  hollow: 'Growth',
  keep: 'Construction',
  cove: 'Shelter',
}
</script>

<template>
  <section class="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
    <!-- Grain overlay -->
    <div class="pointer-events-none absolute inset-0 opacity-[0.03]" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E'); background-repeat: repeat; background-size: 256px;" />

    <!-- Accent glow -->
    <div class="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent opacity-[0.04] blur-[200px]" />

    <!-- Nav -->
    <nav class="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-6">
      <div class="font-display text-lg tracking-wide text-text-primary">
        <span class="opacity-60">Amulet</span>
      </div>
      <div class="flex items-center gap-4">
        <button
          class="px-3 py-1.5 text-xs font-mono text-text-muted border border-border-subtle rounded-theme hover:border-border-strong hover:text-text-secondary transition-colors duration-fast"
          @click="$emit('toggle-mode')"
        >
          {{ mode }}
        </button>
        <a
          href="/storybook/"
          class="px-3 py-1.5 text-xs font-mono text-text-muted border border-border-subtle rounded-theme hover:border-accent hover:text-accent transition-colors duration-fast"
        >
          storybook
        </a>
        <a
          href="https://github.com/apassanisi/hexrig.amulet.ink"
          target="_blank"
          rel="noopener"
          class="px-3 py-1.5 text-xs font-mono text-text-muted border border-border-subtle rounded-theme hover:border-border-strong hover:text-text-secondary transition-colors duration-fast"
        >
          github
        </a>
      </div>
    </nav>

    <!-- Center content -->
    <div class="relative text-center max-w-4xl">
      <!-- Mark -->
      <div class="mb-10 flex items-center justify-center gap-3">
        <div class="h-px w-12 bg-border" />
        <span class="text-xs font-mono uppercase tracking-[0.3em] text-text-muted">Hex + Rig</span>
        <div class="h-px w-12 bg-border" />
      </div>

      <!-- Title -->
      <h1 class="font-display text-7xl sm:text-8xl lg:text-9xl leading-[0.9] tracking-tight text-text-primary mb-8">
        A design<br />system that<br />
        <button
          class="text-accent cursor-pointer hover:opacity-80 transition-opacity duration-fast focus:outline-none"
          :title="`Current theme: ${themeNames[theme]}. Press to cycle.`"
          @click="$emit('cycle-theme')"
        >{{ themeWords[theme] === 'Nothingness' ? 'feels' : themeWords[theme] === 'Growth' ? 'grows' : themeWords[theme] === 'Construction' ? 'builds' : themeWords[theme] === 'Shelter' ? 'shelters' : 'creates' }}</button>
      </h1>

      <!-- Subtitle — minimal -->
      <p class="text-text-muted text-lg sm:text-xl max-w-xl mx-auto font-body leading-relaxed">
        Five themes. Two modes. One system.<br />
        <span class="text-text-secondary">Vue 3 components, design tokens, WCAG AAA.</span>
      </p>

      <!-- CTA area — install command -->
      <div class="mt-14 flex items-center justify-center gap-4">
        <div class="inline-flex items-center gap-3 px-5 py-3 bg-surface-raised border border-border-subtle rounded-theme font-mono text-sm text-text-secondary select-all">
          <span class="text-text-muted">$</span>
          <span>pnpm add @amulet-laboratories/hex @amulet-laboratories/rig</span>
        </div>
      </div>

      <!-- Active theme indicator -->
      <div class="mt-16 flex items-center justify-center gap-6">
        <button
          v-for="t in (['hearth', 'abyss', 'hollow', 'keep', 'cove'] as ThemeId[])"
          :key="t"
          class="group relative flex flex-col items-center gap-2 focus:outline-none"
          @click="$emit('select-theme', t)"
        >
          <div
            class="w-2 h-2 rounded-full transition-all duration-normal"
            :class="t === theme ? 'bg-accent scale-125' : 'bg-border-strong hover:bg-text-muted'"
          />
          <span
            class="text-[10px] font-mono uppercase tracking-wider transition-colors duration-fast"
            :class="t === theme ? 'text-accent' : 'text-text-muted opacity-0 group-hover:opacity-100'"
          >{{ t }}</span>
        </button>
      </div>
    </div>

    <!-- Scroll hint -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted">
      <span class="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
      <div class="w-px h-8 bg-gradient-to-b from-border to-transparent" />
    </div>

    <!-- Keyboard hint -->
    <div class="absolute bottom-8 right-8 hidden lg:flex items-center gap-2 text-text-muted text-[10px] font-mono">
      <kbd class="px-1.5 py-0.5 border border-border-subtle rounded text-text-muted">T</kbd>
      <span>theme</span>
      <kbd class="px-1.5 py-0.5 border border-border-subtle rounded text-text-muted ml-2">M</kbd>
      <span>mode</span>
    </div>
  </section>
</template>
