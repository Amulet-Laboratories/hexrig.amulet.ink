<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

defineProps<{
  activeMode: 'dark' | 'light'
}>()

defineEmits<{
  'toggle-mode': []
}>()

const navLinks = [
  { label: 'Themes', href: '#themes' },
  { label: 'Components', href: '#components' },
  { label: 'Get Started', href: '#get-started' },
]

const visible = ref(false)
const activeSection = ref('')

// Show nav after scrolling past 60% of viewport (same threshold as FloatingToolbar)
const onScroll = () => {
  visible.value = window.scrollY > window.innerHeight * 0.6
}

// Scroll-spy: track which section is in view
const sectionIds = ['themes', 'components', 'get-started', 'credentials']
let observer: IntersectionObserver | null = null

const setupScrollSpy = () => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      }
    },
    { rootMargin: '-20% 0px -60% 0px' },
  )

  for (const id of sectionIds) {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
  setupScrollSpy()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  observer?.disconnect()
})
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-normal ease-standard"
    leave-active-class="transition-all duration-fast ease-exit"
    enter-from-class="-translate-y-full opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="-translate-y-full opacity-0"
  >
    <nav
      v-show="visible"
      class="fixed top-0 left-0 right-0 z-40 bg-surface-base/90 backdrop-blur-lg border-b border-border-subtle"
    >
      <div class="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        <!-- Brand -->
        <div class="font-display text-lg tracking-wide text-text-primary">
          <a href="#" class="hover:text-accent transition-colors duration-fast">Amulet</a>
        </div>

        <!-- Section links -->
        <div class="hidden sm:flex items-center gap-6">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="text-xs font-mono uppercase tracking-[0.15em] transition-colors duration-fast"
            :class="
              activeSection === link.href.slice(1)
                ? 'text-accent'
                : 'text-text-muted hover:text-text-primary'
            "
          >
            {{ link.label }}
          </a>
        </div>

        <!-- Controls -->
        <div class="flex items-center gap-3">
          <button
            class="px-3 py-1.5 text-xs font-mono text-text-muted border border-border-subtle rounded hover:border-border-strong hover:text-text-secondary transition-colors duration-fast"
            @click="$emit('toggle-mode')"
          >
            {{ activeMode }}
          </button>
          <a
            href="/storybook/"
            class="px-3 py-1.5 text-xs font-mono text-text-muted border border-border-subtle rounded hover:border-accent hover:text-accent transition-colors duration-fast"
          >
            storybook
          </a>
          <a
            href="https://github.com/Amulet-Laboratories/hexrig.amulet.ink"
            target="_blank"
            rel="noopener"
            class="hidden sm:inline-flex px-3 py-1.5 text-xs font-mono text-text-muted border border-border-subtle rounded hover:border-border-strong hover:text-text-secondary transition-colors duration-fast"
          >
            github
          </a>
        </div>
      </div>
    </nav>
  </Transition>
</template>
