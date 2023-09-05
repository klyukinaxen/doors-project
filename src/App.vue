<script setup>
import { ref } from 'vue'
import { ElDialog, ElButton, ElInput } from 'element-plus'

import Header from './components/Header.vue'
import Calculator from './components/Calculator.vue'

import { useAuthStore } from './stores/auth'
import { useCalculatorStore } from './stores/calculator'

const authStore = useAuthStore()
const calculatorStore = useCalculatorStore()

const login = ref('')
const password = ref('')

function signInHandler() {
    authStore.signIn({ login: login.value, password: password.value })
}

console.log('accessTokenDecode', authStore.accessTokenDecode)
</script>

<template>
    <Suspense>
        <div class="d-flex flex-column mx-15">
            <Header />

            <Calculator />

            <ElDialog
                v-model="authStore.signInModalVisible"
                title="Авторизация"
                center
            >
                <!--
                    "login": "test"
                    "password": "123456"
                -->
                <form @submit.prevent="signInHandler">
                    <ElInput
                        v-model="login"
                        placeholder="Логин"
                        class="mb-8"
                        name="login"
                    />
                    <ElInput
                        v-model="password"
                        placeholder="Пароль"
                        class="mb-8"
                        name="password"
                    />

                    <ElButton
                        type="primary"
                        native-type="submit"
                    >
                        Войти
                    </ElButton>
                </form>
            </ElDialog>
        </div>
    </Suspense>
</template>
