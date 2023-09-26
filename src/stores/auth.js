import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import jwtDecode from 'jwt-decode'

import { apiInstance } from '../api/instance'
import { useCalculatorStore } from './calculator'
import { useAdminStore } from './admin'

export const Roles = Object.freeze({
    User: 1,
    Admin: 2,
    Owner: 3
})

export const useAuthStore = defineStore('auth', () => {
    const calculatorStore = useCalculatorStore()
    const adminStore = useAdminStore()

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

    const signIn = async ({ login, password }) => {
        const response = await apiInstance
            .post('/auth/sign-in', {
                login,
                password
            })
            .catch(console.log)
        const _accessToken = response?.data.message.AccessToken
        if (_accessToken) {
            accessToken.value = _accessToken

            localStorage.setItem('accessToken', _accessToken)

            signInModalVisible.value = false
        }
    }

    const signOut = () => {
        localStorage.removeItem('accessToken')

        accessToken.value = ''
        signInModalVisible.value = true

        calculatorStore.$patch({ doorParams: null })
        adminStore.$patch({
            users: { 1: [] },
            usersPageCount: 1
        })
    }

    return { accessToken, signInModalVisible, accessTokenDecode, isUser, isAdmin, isOwner, signIn, signOut }
})
