<script setup lang="ts">
import { watch } from 'vue'
import type { RigThemeProviderProps } from '../types'
import { useTheme, provideTheme } from '../composables/useTheme'

const props = withDefaults(defineProps<RigThemeProviderProps>(), {
  theme: 'hearth',
  scheme: 'auto',
})

const themeApi = useTheme({
  theme: props.theme,
  scheme: props.scheme,
})

// Sync props to state when they change

watch(() => props.theme, (val) => {
  themeApi.setTheme(val)
})

watch(() => props.scheme, (val) => {
  if (val === 'auto') {
    // Re-resolve from system preference
    if (typeof window !== 'undefined') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      themeApi.setScheme(prefersDark ? 'dark' : 'light')
    }
    return
  }
  themeApi.setScheme(val)
})

provideTheme(themeApi)
</script>

<template>
  <div
    :data-theme="themeApi.theme.value"
    :data-mode="themeApi.scheme.value"
    class="bg-surface-base text-text-primary font-body"
  >
    <slot />
  </div>
</template>
