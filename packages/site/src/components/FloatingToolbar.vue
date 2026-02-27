<script setup lang="ts">
import type { ThemeId } from '@amulet-laboratories/hex'
import { ref, onMounted, onUnmounted } from 'vue'

defineProps<{
  activeTheme: ThemeId
  activeMode: 'dark' | 'light'
}>()

defineEmits<{
  'select-theme': [theme: ThemeId]
  'toggle-mode': []
}>()

/** Spectrum themes shown as rainbow dots */
const spectrumThemes: ThemeId[] = ['ember', 'hearth', 'grove', 'reef', 'abyss', 'cove']
/** Neutral themes shown after a divider */
const neutralThemes: ThemeId[] = ['linen', 'keep', 'slate']

/**
 * Display accents for the toolbar dots.
 * Abyss uses electric blue (its actual accent is lime-green, but the
 * display completes the R-G-Y-C-B-M rainbow).
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

/** Show the toolbar only after scrolling past the hero theme strip */
const visible = ref(false)

const onScroll = () => {
  visible.value = window.scrollY > window.innerHeight * 0.6
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-normal ease-standard"
    leave-active-class="transition-all duration-fast ease-exit"
    enter-from-class="translate-y-4 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-4 opacity-0"
  >
    <div
      v-show="visible"
      class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-surface-raised/90 backdrop-blur-lg border border-border-subtle rounded-full shadow-lg"
    >
      <!-- Spectrum dots -->
      <button
        v-for="t in spectrumThemes"
        :key="t"
        :title="t"
        class="focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring rounded-full p-0.5"
        @click="$emit('select-theme', t)"
      >
        <div
          class="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 transition-all duration-fast"
          :class="
            t === activeTheme
              ? 'border-accent scale-125 shadow-sm'
              : 'border-transparent hover:border-border-strong opacity-80 hover:opacity-100'
          "
          :style="{ backgroundColor: displayAccent[t] }"
        />
      </button>

      <!-- Divider -->
      <div class="w-px h-4 bg-border-subtle mx-0.5" />

      <!-- Neutral dots -->
      <button
        v-for="t in neutralThemes"
        :key="t"
        :title="t"
        class="focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring rounded-full p-0.5"
        @click="$emit('select-theme', t)"
      >
        <div
          class="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 transition-all duration-fast"
          :class="
            t === activeTheme
              ? 'border-accent scale-125 shadow-sm'
              : 'border-transparent hover:border-border-strong opacity-80 hover:opacity-100'
          "
          :style="{ backgroundColor: displayAccent[t] }"
        />
      </button>

      <!-- Mode divider -->
      <div class="w-px h-4 bg-border-subtle mx-0.5" />

      <!-- Light/Dark toggle -->
      <button
        class="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full text-text-muted hover:text-text-primary hover:bg-surface-elevated transition-[color,background-color] duration-fast focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
        :title="`Switch to ${activeMode === 'dark' ? 'light' : 'dark'} mode`"
        @click="$emit('toggle-mode')"
      >
        <Transition
          mode="out-in"
          enter-active-class="transition-[opacity,transform] duration-fast ease-entrance"
          enter-from-class="opacity-0 rotate-[-90deg] scale-50"
          enter-to-class="opacity-100 rotate-0 scale-100"
          leave-active-class="transition-[opacity,transform] duration-fast ease-exit"
          leave-from-class="opacity-100 rotate-0 scale-100"
          leave-to-class="opacity-0 rotate-90 scale-50"
        >
          <!-- Sun icon (shown in dark mode → click to go light) -->
          <svg
            v-if="activeMode === 'dark'"
            key="sun"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-4 h-4"
          >
            <path
              d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.06 1.06l1.06 1.06z"
            />
          </svg>
          <!-- Moon icon (shown in light mode → click to go dark) -->
          <svg
            v-else
            key="moon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-4 h-4"
          >
            <path
              fill-rule="evenodd"
              d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z"
              clip-rule="evenodd"
            />
          </svg>
        </Transition>
      </button>
    </div>
  </Transition>
</template>
