import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { useAuthStore } from './stores/auth'

import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

const authStore = useAuthStore(pinia)

const accessToken = localStorage.getItem('accessToken')

app.mount('#app')

console.log({ accessToken })
if (accessToken) {
    authStore.accessToken = accessToken
} else {
    authStore.signInModalVisible = true
}
