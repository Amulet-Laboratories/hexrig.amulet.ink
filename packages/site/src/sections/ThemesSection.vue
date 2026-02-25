<script setup lang="ts">
import type { ThemeId } from '@amulet-laboratories/hex'

defineProps<{
  activeTheme: ThemeId
}>()

defineEmits<{
  'select-theme': [theme: ThemeId]
}>()

const themes: { id: ThemeId; name: string; word: string; narrative: string; accent: string }[] = [
  { id: 'hearth', name: 'Hearth', word: 'Creation', narrative: 'Raw material shaped by heat and intention.', accent: '#c9956d' },
  { id: 'abyss', name: 'Abyss', word: 'Nothingness', narrative: 'The space between stars — vast, electric, alive.', accent: '#aef66d' },
  { id: 'hollow', name: 'Hollow', word: 'Growth', narrative: 'Life pushing through stone, roots finding water.', accent: '#40b8a0' },
  { id: 'keep', name: 'Keep', word: 'Construction', narrative: 'Steel and purpose — the raw made precise.', accent: '#ff8f2e' },
  { id: 'cove', name: 'Cove', word: 'Shelter', narrative: 'The hidden chamber — warm, intimate, otherworldly.', accent: '#d43050' },
]
</script>

<template>
  <section class="relative py-32 px-6">
    <!-- Section header -->
    <div class="max-w-6xl mx-auto mb-20">
      <div class="flex items-center gap-3 mb-6">
        <div class="h-px w-8 bg-accent" />
        <span class="text-xs font-mono uppercase tracking-[0.25em] text-accent">Five Themes</span>
      </div>
      <h2 class="font-display text-4xl sm:text-5xl lg:text-6xl text-text-primary leading-tight">
        One journey.<br />Five places.
      </h2>
    </div>

    <!-- Theme cards -->
    <div class="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-5 gap-3">
      <button
        v-for="t in themes"
        :key="t.id"
        class="group relative text-left focus:outline-none"
        @click="$emit('select-theme', t.id)"
      >
        <!-- Color strip -->
        <div
          class="h-32 sm:h-48 rounded-t-theme transition-transform duration-normal ease-standard"
          :class="t.id === activeTheme ? 'scale-[1.02]' : 'group-hover:scale-[1.01]'"
          :data-theme="t.id"
          data-mode="dark"
        >
          <div class="h-full w-full rounded-t-theme bg-surface-base border border-border-subtle p-4 flex flex-col justify-end">
            <div
              class="w-6 h-1 rounded-full mb-3 transition-all duration-normal"
              :style="{ backgroundColor: t.accent }"
              :class="t.id === activeTheme ? 'w-10' : ''"
            />
            <div class="font-display text-lg" :style="{ color: t.accent }">{{ t.name }}</div>
            <div class="text-xs text-text-muted mt-0.5 font-mono uppercase tracking-wider">{{ t.word }}</div>
          </div>
        </div>

        <!-- Light mode preview underneath -->
        <div
          class="h-16 sm:h-20 rounded-b-theme"
          :data-theme="t.id"
          data-mode="light"
        >
          <div class="h-full w-full rounded-b-theme bg-surface-base border border-t-0 border-border-subtle p-4 flex items-center">
            <div class="text-xs text-text-muted font-body leading-snug line-clamp-2">
              {{ t.narrative }}
            </div>
          </div>
        </div>

        <!-- Selection indicator -->
        <div
          class="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full transition-all duration-normal"
          :class="t.id === activeTheme ? 'bg-accent scale-150' : 'bg-transparent'"
        />
      </button>
    </div>
  </section>
</template>
