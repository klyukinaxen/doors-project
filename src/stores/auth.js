import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import jwtDecode from 'jwt-decode'

import { apiInstance } from '../api/instance'

export const useAuthStore = defineStore('auth', () => {
    const signInModalVisible = ref(false)
    const accessToken = ref('')

    const accessTokenDecode = computed(() => {
        if (!accessToken.value) {
            return undefined
        }

        return jwtDecode(accessToken.value)
    })

    async function signIn({ login, password }) {
        const response = await apiInstance
            .post('/auth/sign-in', {
                login,
                password
            })
            .catch(console.log)
        const accessToken = response?.data.message.AccessToken
        if (accessToken) {
            this.accessToken = accessToken

            localStorage.setItem('accessToken', accessToken)

            this.signInModalVisible = false
        }
    }

    return { accessToken, signInModalVisible, accessTokenDecode, signIn }
})
