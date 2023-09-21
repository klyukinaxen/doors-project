import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import jwtDecode from 'jwt-decode'

import { apiInstance } from '../api/instance'

export const Roles = Object.freeze({
    User: 1,
    Admin: 2,
    Owner: 3
})

export const useAuthStore = defineStore('auth', () => {
    const signInModalVisible = ref(false)
    const accessToken = ref('')

    /**
     * @example `{ "user_id": 2, "role_id": 3, "exp": 1694070098}`
     */
    const accessTokenDecode = computed(() => {
        if (!accessToken.value) {
            return undefined
        }

        return jwtDecode(accessToken.value)
    })

    const isUser = computed(() => {
        return accessTokenDecode.value?.role_id === Roles.User
    })

    const isAdmin = computed(() => {
        return accessTokenDecode.value?.role_id === Roles.Admin
    })

    const isOwner = computed(() => {
        return accessTokenDecode.value?.role_id === Roles.Owner
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

    return { accessToken, signInModalVisible, accessTokenDecode, isUser, isAdmin, isOwner, signIn }
})
