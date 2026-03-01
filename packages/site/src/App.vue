<script setup lang="ts">
import { ref, watchEffect, onMounted, onUnmounted } from 'vue'
import { RigToast } from '@amulet-laboratories/rig'
import SiteNav from './components/SiteNav.vue'
import HeroSection from './sections/HeroSection.vue'
import ThesisSection from './sections/ThesisSection.vue'
import ThemesSection from './sections/ThemesSection.vue'
import ComponentsReferenceSection from './sections/ComponentsReferenceSection.vue'
import GettingStartedSection from './sections/GettingStartedSection.vue'
import CredentialsSection from './sections/CredentialsSection.vue'
import FooterSection from './sections/FooterSection.vue'
import FloatingToolbar from './components/FloatingToolbar.vue'

import type { ThemeId } from '@amulet-laboratories/hex'

const activeTheme = ref<ThemeId>('hearth')
const activeMode = ref<'dark' | 'light'>('dark')

// Sync theme/mode to <html> so Teleported content (Dialog, Toast) inherits tokens
watchEffect(() => {
  document.documentElement.dataset.theme = activeTheme.value
  document.documentElement.dataset.mode = activeMode.value
})

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
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-surface-raised focus:px-4 focus:py-2 focus:text-text-primary focus:ring-2 focus:ring-focus-ring"
    >
      Skip to content
    </a>
    <SiteNav :active-mode="activeMode" @toggle-mode="toggleMode" />
    <HeroSection
      :theme="activeTheme"
      @select-theme="setTheme"
    />
    <ThesisSection />
    <ThemesSection id="main-content" :active-theme="activeTheme" @select-theme="setTheme" />
    <ComponentsReferenceSection />
    <GettingStartedSection />
    <CredentialsSection />
    <FooterSection />
    <RigToast />
    <FloatingToolbar
      :active-theme="activeTheme"
      :active-mode="activeMode"
      @select-theme="setTheme"
      @toggle-mode="toggleMode"
    />
  </div>
</template>
