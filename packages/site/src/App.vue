<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import HeroSection from './sections/HeroSection.vue'
import ThemesSection from './sections/ThemesSection.vue'
import ComponentsSection from './sections/ComponentsSection.vue'
import TokensSection from './sections/TokensSection.vue'
import FooterSection from './sections/FooterSection.vue'

import type { ThemeId } from '@amulet-laboratories/hex'

const activeTheme = ref<ThemeId>('hearth')
const activeMode = ref<'dark' | 'light'>('dark')

const themes: ThemeId[] = ['hearth', 'abyss', 'hollow', 'keep', 'cove']

const cycleTheme = () => {
  const idx = themes.indexOf(activeTheme.value)
  activeTheme.value = themes[(idx + 1) % themes.length]
}

const toggleMode = () => {
  activeMode.value = activeMode.value === 'dark' ? 'light' : 'dark'
}

// Keyboard shortcut: T to cycle theme, M to toggle mode
const onKeydown = (e: KeyboardEvent) => {
  if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
  if (e.key === 't' || e.key === 'T') cycleTheme()
  if (e.key === 'm' || e.key === 'M') toggleMode()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div
    :data-theme="activeTheme"
    :data-mode="activeMode"
    class="min-h-screen bg-surface-base text-text-primary font-body transition-colors duration-slow ease-standard"
  >
    <HeroSection
      :theme="activeTheme"
      :mode="activeMode"
      @cycle-theme="cycleTheme"
      @toggle-mode="toggleMode"
      @select-theme="(t: ThemeId) => (activeTheme = t)"
    />
    <ThemesSection :active-theme="activeTheme" @select-theme="(t: ThemeId) => (activeTheme = t)" />
    <ComponentsSection :active-theme="activeTheme" />
    <TokensSection :active-theme="activeTheme" />
    <FooterSection />
  </div>
</template>
