<script setup lang="ts">
defineProps<{
  activeTheme: string
}>()

const tokenGroups = [
  {
    label: 'Surface',
    tokens: [
      { name: '--surface-base', class: 'bg-surface-base' },
      { name: '--surface-raised', class: 'bg-surface-raised' },
      { name: '--surface-elevated', class: 'bg-surface-elevated' },
      { name: '--surface-sunken', class: 'bg-surface-sunken' },
      { name: '--surface-overlay', class: 'bg-surface-overlay' },
    ],
  },
  {
    label: 'Accent',
    tokens: [
      { name: '--accent-primary', class: 'bg-accent' },
      { name: '--accent-secondary', class: 'bg-accent-secondary' },
      { name: '--accent-hover', class: 'bg-accent-hover' },
      { name: '--accent-active', class: 'bg-accent-active' },
      { name: '--accent-muted', class: 'bg-accent-muted' },
    ],
  },
  {
    label: 'Text',
    tokens: [
      { name: '--text-primary', class: 'bg-text-primary' },
      { name: '--text-secondary', class: 'bg-text-secondary' },
      { name: '--text-muted', class: 'bg-text-muted' },
      { name: '--text-link', class: 'bg-text-link' },
      { name: '--text-on-accent', class: 'bg-text-on-accent' },
    ],
  },
  {
    label: 'Status',
    tokens: [
      { name: '--status-success', class: 'bg-status-success' },
      { name: '--status-warning', class: 'bg-status-warning' },
      { name: '--status-error', class: 'bg-status-error' },
      { name: '--status-info', class: 'bg-status-info' },
    ],
  },
  {
    label: 'Border',
    tokens: [
      { name: '--border-default', class: 'bg-border' },
      { name: '--border-subtle', class: 'bg-border-subtle' },
      { name: '--border-strong', class: 'bg-border-strong' },
    ],
  },
  {
    label: 'Focus',
    tokens: [
      { name: '--focus-ring', class: 'bg-focus-ring' },
    ],
  },
]

const motionTokens = [
  { label: 'Fast', var: '--duration-fast', example: '120ms' },
  { label: 'Normal', var: '--duration-normal', example: '200ms' },
  { label: 'Slow', var: '--duration-slow', example: '350ms' },
]
</script>

<template>
  <section class="relative py-32 px-6">
    <div class="max-w-6xl mx-auto">
      <!-- Section header -->
      <div class="flex items-center gap-3 mb-6">
        <div class="h-px w-8 bg-accent" />
        <span class="text-xs font-mono uppercase tracking-[0.25em] text-accent">Tokens</span>
      </div>
      <h2 class="font-display text-4xl sm:text-5xl lg:text-6xl text-text-primary leading-tight mb-4">
        Every color,<br />named.
      </h2>
      <p class="text-text-muted font-body text-lg mb-20 max-w-xl">
        Switch themes above. Watch every token respond.
      </p>

      <!-- Color swatches grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        <div
          v-for="group in tokenGroups"
          :key="group.label"
          class="bg-surface-raised border border-border-subtle rounded-theme p-6"
        >
          <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted block mb-4">
            {{ group.label }}
          </span>
          <div class="space-y-2">
            <div
              v-for="token in group.tokens"
              :key="token.name"
              class="flex items-center gap-3 group"
            >
              <div
                :class="[token.class, 'w-8 h-8 rounded-md border border-border-subtle shrink-0 transition-colors duration-normal']"
              />
              <span class="font-mono text-xs text-text-muted group-hover:text-text-secondary transition-colors truncate">
                {{ token.name }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Motion tokens -->
      <div class="bg-surface-raised border border-border-subtle rounded-theme p-8 sm:p-10 mb-6">
        <div class="flex items-center gap-2 mb-8">
          <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted">Motion</span>
        </div>
        <div class="space-y-4">
          <div
            v-for="m in motionTokens"
            :key="m.var"
            class="flex items-center gap-4"
          >
            <span class="w-16 text-sm font-body text-text-secondary">{{ m.label }}</span>
            <div class="flex-1 h-2 bg-surface-sunken rounded-full overflow-hidden">
              <div
                class="h-full bg-accent rounded-full motion-bar"
                :style="{
                  '--bar-duration': `var(${m.var})`,
                }"
              />
            </div>
            <span class="font-mono text-xs text-text-muted w-16 text-right">{{ m.var }}</span>
          </div>
        </div>
      </div>

      <!-- Typography preview -->
      <div class="bg-surface-raised border border-border-subtle rounded-theme p-8 sm:p-10">
        <div class="flex items-center gap-2 mb-8">
          <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted">Typography</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div class="space-y-4">
            <div>
              <span class="block text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted mb-1">--font-display</span>
              <span class="font-display text-3xl text-text-primary">Gesamtkunstwerk</span>
            </div>
            <div>
              <span class="block text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted mb-1">--font-body</span>
              <span class="font-body text-lg text-text-primary">The total work of art — where every element serves the whole.</span>
            </div>
          </div>
          <div class="space-y-4">
            <div>
              <span class="block text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted mb-1">--font-mono</span>
              <span class="font-mono text-base text-accent">pnpm add @amulet-laboratories/hex</span>
            </div>
            <div class="pt-2">
              <span class="block text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted mb-3">Scale</span>
              <div class="space-y-1.5">
                <p class="font-display text-4xl text-text-primary leading-none">Aa</p>
                <p class="font-body text-2xl text-text-primary leading-none">Aa</p>
                <p class="font-body text-base text-text-secondary leading-none">Aa</p>
                <p class="font-body text-sm text-text-muted leading-none">Aa</p>
                <p class="font-mono text-xs text-text-muted leading-none">Aa</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.motion-bar {
  animation: motion-sweep 2s ease-in-out infinite;
  animation-duration: calc(var(--bar-duration, 200ms) * 8);
}

@keyframes motion-sweep {
  0%, 100% { width: 0%; }
  50% { width: 100%; }
}
</style>
