import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

// Apply default theme — command archetype, night mode
import { applyTheme } from '@amulet-laboratories/hex'
applyTheme({ archetype: 'command', mode: 'night', weight: 'standard', attitude: 'kinetic' })

const app = createApp(App)

// v-reveal directive — adds .is-visible when element enters viewport
const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    }
  },
  { threshold: 0.15 },
)

app.directive('reveal', {
  mounted(el: HTMLElement, binding) {
    el.classList.add(binding.arg === 'scale' ? 'reveal-scale' : 'reveal')
    observer.observe(el)
  },
  unmounted(el: HTMLElement) {
    observer.unobserve(el)
  },
})

app.mount('#app')
