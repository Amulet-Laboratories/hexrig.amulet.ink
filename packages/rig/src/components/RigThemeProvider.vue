<script setup lang="ts">
import { watch, ref } from 'vue'
import type { RigThemeProviderProps } from '../types'
import { useTheme, provideTheme } from '../composables/useTheme'

const props = withDefaults(defineProps<RigThemeProviderProps>(), {
  theme: 'hearth',
  mode: 'auto',
  as: 'div',
})

const themeApi = useTheme({
  theme: props.theme,
  mode: props.mode,
})

const providerEl = ref<HTMLElement | null>(null)

// Sync props to state when they change

watch(
  () => props.theme,
  (val) => {
    themeApi.setTheme(val)
  },
)

watch(
  () => props.mode,
  (val) => {
    if (val === 'auto') {
      // Reset to OS preference without locking out future system changes
      themeApi.resetToAuto()
      return
    }
    themeApi.setMode(val)
  },
)

// Dev-only: warn if the theme CSS has not been imported (no tokens resolve)
if (import.meta.env.DEV) {
  watch(
    themeApi.theme,
    (id) => {
      if (!providerEl.value) return
      const token = getComputedStyle(providerEl.value).getPropertyValue('--surface-base').trim()
      if (!token) {
        console.warn(
          `[Rig] Theme "${id}" has no loaded CSS. ` +
            `Import its stylesheet: import '@amulet-laboratories/hex-origins/themes/${id}.css'`,
        )
      }
    },
    { flush: 'post' },
  )
}

provideTheme(themeApi)
</script>

<template>
  <component
    :is="as"
    ref="providerEl"
    :data-theme="themeApi.theme.value"
    :data-mode="themeApi.mode.value"
    class="bg-surface-base text-text-primary font-body"
  >
    <slot />
  </component>
</template>
