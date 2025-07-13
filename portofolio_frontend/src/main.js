import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'

const app = createApp(App)
app.use(router)

// Global error handler
app.config.errorHandler = (err, instance, info) => {
  console.error('❌ Vue Error:', err);
  console.error('Info:', info);
}

app.mount('#app')
