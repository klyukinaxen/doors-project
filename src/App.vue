<template>
    <Suspense>
        <div class="d-flex flex-column mx-15">
            <Header />

            <ElTabs v-model="activeMenuItem">
                <ElTabPane
                    v-for="(item, index) in menuItems"
                    :key="index"
                    :label="item.name"
                    :name="item.id"
                    lazy
                >
                    <Calculator v-if="item.id === 'calculator'" />

                    <UserManagement v-else-if="item.id === 'userManagement'" />

                    <div v-else>{{ item.name }}</div>
                </ElTabPane>
            </ElTabs>

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
                            required
                        />
                    </ElFormItem>

                    <ElFormItem label="Пароль">
                        <ElInput
                            v-model="authForm.password"
                            name="password"
                            required
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

<script setup>
import { reactive, ref, computed, watch } from 'vue'
import { ElDialog, ElButton, ElInput, ElForm, ElFormItem, ElTabs, ElTabPane } from 'element-plus'

import Header from './components/Header.vue'
import Calculator from './components/Calculator.vue'
import UserManagement from './components/UserManagement.vue'

import { useAuthStore } from './stores/auth'
import { useCalculatorStore } from './stores/calculator'

const authStore = useAuthStore()
const calculatorStore = useCalculatorStore()

const authForm = reactive({
    login: '',
    password: ''
})

const menuItems = computed(() => {
    const items = []

    if (calculatorStore.doorParams) {
        items.push({
            id: 'calculator',
            name: 'Конфигуратор дверей'
        })
    }

    if (authStore.isAdmin || authStore.isOwner) {
        items.push({
            id: 'userManagement',
            name: 'Пользователи'
        })
    }

    return items
})

const activeMenuItem = ref('calculator')

function signInHandler() {
    authStore.signIn({ login: authForm.login, password: authForm.password })
}

console.log('accessTokenDecode', authStore.accessTokenDecode)

watch(
    () => authStore.accessToken,
    () => {
        calculatorStore.recieveDoorParams()
    }
)
</script>
