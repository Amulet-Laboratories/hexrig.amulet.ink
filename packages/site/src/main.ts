import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

// Import all Hex theme CSS
import '@amulet-laboratories/hex/themes/hearth.css'
import '@amulet-laboratories/hex/themes/abyss.css'
import '@amulet-laboratories/hex/themes/hollow.css'
import '@amulet-laboratories/hex/themes/keep.css'
import '@amulet-laboratories/hex/themes/cove.css'

const app = createApp(App)
app.mount('#app')
