import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { useAuthStore } from './stores/auth'

import 'element-plus/dist/index.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

const authStore = useAuthStore(pinia)

const accessToken = localStorage.getItem('accessToken')

app.mount('#app')

if (accessToken) {
    authStore.accessToken = accessToken
} else {
    authStore.signInModalVisible = true
}

console.log('accessTokenDecode', authStore.accessTokenDecode)
