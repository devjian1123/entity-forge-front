import App from '@/App.vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
