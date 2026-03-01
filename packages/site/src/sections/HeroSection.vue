<script setup lang="ts">
import type { ThemeId } from '@amulet-laboratories/hex'
import { ref } from 'vue'

defineProps<{
  theme: ThemeId
}>()

defineEmits<{
  'select-theme': [theme: ThemeId]
}>()

/** Spectrum themes shown as rainbow dots */
const spectrumThemes: ThemeId[] = ['ember', 'hearth', 'grove', 'reef', 'abyss', 'cove']
/** Neutral themes shown after a divider */
const neutralThemes: ThemeId[] = ['linen', 'keep', 'slate']

/**
 * Display accents for the hero dot strip.
 * Abyss uses electric blue here (its actual accent is lime-green, but the
 * display should complete the R-G-Y-C-B-M rainbow).
 */
const displayAccent: Record<string, string> = {
  ember: '#e04030',
  hearth: '#d4a840',
  grove: '#7cba7e',
  reef: '#40c0b8',
  abyss: '#4080f0',
  cove: '#c040a0',
  linen: '#b87040',
  keep: '#90a088',
  slate: '#8090a0',
}

const copied = ref(false)

const copyInstall = async () => {
  await navigator.clipboard.writeText(
    'pnpm add @amulet-laboratories/hex @amulet-laboratories/hex-origins @amulet-laboratories/rig',
  )
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}
</script>

<template>
  <section class="relative min-h-screen flex flex-col overflow-hidden">
    <!-- Grain overlay -->
    <div
      class="pointer-events-none absolute inset-0 opacity-[0.03]"
      style="
        background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E');
        background-repeat: repeat;
        background-size: 256px;
      "
    />

    <!-- Accent glow -->
    <div
      class="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent opacity-[0.04] blur-[200px]"
    />

    <!-- Center content -->
    <div class="relative flex-1 flex flex-col items-center justify-center px-6 text-center">
      <div class="max-w-4xl w-full">
        <!-- Eyebrow -->
        <div class="mb-8 flex items-center justify-center gap-3">
          <div class="h-px w-10 bg-border" />
          <span class="text-[11px] font-mono uppercase tracking-[0.3em] text-text-muted"
            >Design System</span
          >
          <div class="h-px w-10 bg-border" />
        </div>

        <!-- Title -->
        <h1
          class="font-display text-6xl sm:text-7xl lg:text-8xl xl:text-9xl leading-[0.9] tracking-tight text-text-primary mb-6"
        >
          Hex + Rig
        </h1>

        <!-- Subhead -->
        <p
          class="text-text-secondary text-lg sm:text-xl max-w-2xl mx-auto font-body leading-relaxed mb-10"
        >
          Design tokens and Vue&nbsp;3 components for interfaces that feel
          <em class="text-accent not-italic font-medium">considered</em>.<br />
          <span class="text-text-muted"
            >Nine themes. Two modes. Fifty-eight components. WCAG&nbsp;AAA.</span
          >
        </p>

        <!-- Theme strip — primary feature, above the fold -->
        <div class="flex items-center justify-center gap-2 sm:gap-3 mb-10 flex-wrap">
          <!-- Spectrum (rainbow) -->
          <button
            v-for="t in spectrumThemes"
            :key="t"
            class="group relative flex flex-col items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring rounded-lg px-2 py-1"
            @click="$emit('select-theme', t)"
          >
            <div
              class="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-all duration-normal"
              :class="
                t === theme
                  ? 'border-accent scale-110 shadow-md'
                  : 'border-border-subtle hover:border-border-strong'
              "
              :style="{ backgroundColor: displayAccent[t] }"
            />
            <span
              class="text-[10px] font-mono uppercase tracking-wider transition-all duration-fast"
              :class="t === theme ? 'text-accent' : 'text-text-muted'"
              >{{ t }}</span
            >
          </button>

          <!-- Divider between Spectrum and Neutrals -->
          <div class="w-px h-10 bg-border-subtle mx-1 sm:mx-2 self-start mt-1" />

          <!-- Neutrals -->
          <button
            v-for="t in neutralThemes"
            :key="t"
            class="group relative flex flex-col items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring rounded-lg px-2 py-1"
            @click="$emit('select-theme', t)"
          >
            <div
              class="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-all duration-normal"
              :class="
                t === theme
                  ? 'border-accent scale-110 shadow-md'
                  : 'border-border-subtle hover:border-border-strong'
              "
              :style="{ backgroundColor: displayAccent[t] }"
            />
            <span
              class="text-[10px] font-mono uppercase tracking-wider transition-all duration-fast"
              :class="t === theme ? 'text-accent' : 'text-text-muted'"
              >{{ t }}</span
            >
          </button>
        </div>

        <!-- Install command -->
        <button
          class="group inline-flex items-center gap-3 px-5 py-3 bg-surface-raised border border-border-subtle rounded-lg font-mono text-xs sm:text-sm text-text-secondary hover:border-border-strong transition-colors duration-fast cursor-pointer"
          @click="copyInstall"
        >
          <span class="text-text-muted">$</span>
          <span class="select-all"
            >pnpm add @amulet-laboratories/hex @amulet-laboratories/hex-origins
            @amulet-laboratories/rig</span
          >
          <span class="text-text-muted group-hover:text-accent transition-colors text-xs ml-1">{{
            copied ? '✓' : '⎘'
          }}</span>
        </button>

        <!-- CTA buttons -->
        <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/storybook/"
            class="px-5 py-2.5 bg-accent text-text-on-accent text-sm font-sans font-semibold rounded-lg hover:bg-accent-hover transition-colors duration-fast"
          >
            Browse Components
          </a>
          <a
            href="/storybook/?path=/docs/overview-introduction--docs"
            class="px-5 py-2.5 border border-border-subtle text-text-secondary text-sm font-sans font-semibold rounded-lg hover:border-border-strong hover:text-text-primary transition-colors duration-fast"
          >
            Read the Docs
          </a>
        </div>
      </div>
    </div>

    <!-- Bottom bar: scroll hint + keyboard hint -->
    <div class="relative z-10 flex items-center justify-between px-6 sm:px-8 py-5">
      <div class="flex flex-col items-center gap-2 text-text-muted">
        <span class="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
        <div class="w-px h-6 bg-gradient-to-b from-border to-transparent" />
      </div>
      <div class="hidden lg:flex items-center gap-2 text-text-muted text-[10px] font-mono">
        <kbd class="px-1.5 py-0.5 border border-border-subtle rounded">T</kbd>
        <span>theme</span>
        <kbd class="px-1.5 py-0.5 border border-border-subtle rounded ml-2">M</kbd>
        <span>mode</span>
      </div>
    </div>
  </section>
</template>
