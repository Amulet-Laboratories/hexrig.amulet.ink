import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

// Import all Origins theme CSS
import '@amulet-laboratories/hex-origins/themes/hearth.css'
import '@amulet-laboratories/hex-origins/themes/abyss.css'
import '@amulet-laboratories/hex-origins/themes/hollow.css'
import '@amulet-laboratories/hex-origins/themes/keep.css'
import '@amulet-laboratories/hex-origins/themes/cove.css'

const app = createApp(App)
app.mount('#app')
