<script setup lang="ts">
import { watch } from 'vue'
import type { RigThemeProviderProps } from '../types'
import { useTheme, provideTheme } from '../composables/useTheme'

const props = withDefaults(defineProps<RigThemeProviderProps>(), {
  theme: 'hearth',
  mode: 'auto',
})

const themeApi = useTheme({
  theme: props.theme,
  mode: props.mode,
})

// Sync props to state when they change

watch(() => props.theme, (val) => {
  themeApi.setTheme(val)
})

watch(() => props.mode, (val) => {
  if (val === 'auto') {
    // Re-resolve from system preference
    if (typeof window !== 'undefined') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      themeApi.setMode(prefersDark ? 'dark' : 'light')
    }
    return
  }
  themeApi.setMode(val)
})

provideTheme(themeApi)
</script>

<template>
  <div
    :data-theme="themeApi.theme.value"
    :data-mode="themeApi.mode.value"
    class="bg-surface-base text-text-primary font-body"
  >
    <slot />
  </div>
</template>
