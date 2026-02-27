<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import HeroSection from './sections/HeroSection.vue'
import ThesisSection from './sections/ThesisSection.vue'
import ThemesSection from './sections/ThemesSection.vue'
import ComponentsSection from './sections/ComponentsSection.vue'
import TokensSection from './sections/TokensSection.vue'
import CredentialsSection from './sections/CredentialsSection.vue'
import FooterSection from './sections/FooterSection.vue'
import FloatingToolbar from './components/FloatingToolbar.vue'

import type { ThemeId } from '@amulet-laboratories/hex'

const activeTheme = ref<ThemeId>('hearth')
const activeMode = ref<'dark' | 'light'>('dark')

const themes: ThemeId[] = [
  'ember',
  'hearth',
  'grove',
  'reef',
  'abyss',
  'cove',
  'linen',
  'keep',
  'slate',
]

/**
 * Apply a state change with a View Transition if supported,
 * giving a brief cross-fade that masks font reflow.
 * Falls back to instant apply.
 */
const withTransition = (fn: () => void) => {
  const doc = document as Document & { startViewTransition?: (cb: () => void) => void }
  if (doc.startViewTransition) {
    doc.startViewTransition(fn)
  } else {
    fn()
  }
}

const setTheme = (t: ThemeId) => {
  if (t === activeTheme.value) return
  withTransition(() => {
    activeTheme.value = t
  })
}

const cycleTheme = () => {
  const idx = themes.indexOf(activeTheme.value)
  setTheme(themes[(idx + 1) % themes.length])
}

const toggleMode = () => {
  withTransition(() => {
    activeMode.value = activeMode.value === 'dark' ? 'light' : 'dark'
  })
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
    class="min-h-screen bg-surface-base text-text-primary font-body"
  >
    <HeroSection
      :theme="activeTheme"
      :mode="activeMode"
      @toggle-mode="toggleMode"
      @select-theme="setTheme"
    />
    <ThesisSection />
    <ThemesSection :active-theme="activeTheme" @select-theme="setTheme" />
    <ComponentsSection :active-theme="activeTheme" />
    <TokensSection :active-theme="activeTheme" />
    <CredentialsSection />
    <FooterSection />
    <FloatingToolbar
      :active-theme="activeTheme"
      :active-mode="activeMode"
      @select-theme="setTheme"
      @toggle-mode="toggleMode"
    />
  </div>
</template>
