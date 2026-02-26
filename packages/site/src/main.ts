import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

// Import all Origins theme CSS — Environments
import '@amulet-laboratories/hex-origins/themes/hearth.css'
import '@amulet-laboratories/hex-origins/themes/abyss.css'
import '@amulet-laboratories/hex-origins/themes/cove.css'
import '@amulet-laboratories/hex-origins/themes/glyph.css'
import '@amulet-laboratories/hex-origins/themes/ember.css'
// Materials
import '@amulet-laboratories/hex-origins/themes/keep.css'
import '@amulet-laboratories/hex-origins/themes/slate.css'
import '@amulet-laboratories/hex-origins/themes/linen.css'
import '@amulet-laboratories/hex-origins/themes/cairn.css'
import '@amulet-laboratories/hex-origins/themes/grove.css'

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
  mounted(el: HTMLElement) {
    el.classList.add('reveal')
    observer.observe(el)
  },
  unmounted(el: HTMLElement) {
    observer.unobserve(el)
  },
})

app.mount('#app')
