<script setup>
import { reactive } from 'vue'
import { ElDialog, ElButton, ElInput, ElForm, ElFormItem } from 'element-plus'

import Header from './components/Header.vue'
import Calculator from './components/Calculator.vue'

import { useAuthStore } from './stores/auth'
import { useCalculatorStore } from './stores/calculator'

const authStore = useAuthStore()
const calculatorStore = useCalculatorStore()

const authForm = reactive({
    login: '',
    password: ''
})

function signInHandler() {
    authStore.signIn({ login: authForm.login, password: authForm.password })
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
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                :show-close="false"
            >
                <!--
                    "login": "test"
                    "password": "123456"
                -->
                <ElForm
                    :model="authForm"
                    @submit.prevent="signInHandler"
                >
                    <ElFormItem label="Логин">
                        <ElInput
                            v-model="authForm.login"
                            name="login"
                        />
                    </ElFormItem>

                    <ElFormItem label="Пароль">
                        <ElInput
                            v-model="authForm.password"
                            name="password"
                        />
                    </ElFormItem>

                    <ElFormItem>
                        <ElButton
                            type="primary"
                            native-type="submit"
                        >
                            Войти
                        </ElButton>
                    </ElFormItem>
                </ElForm>
            </ElDialog>
        </div>
    </Suspense>
</template>
