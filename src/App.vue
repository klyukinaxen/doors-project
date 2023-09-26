<template>
    <Suspense>
        <div class="d-flex flex-column mx-15">
            <Header />

            <ElTabs
                v-if="authStore.accessToken && authStore.accessTokenDecode"
                v-model="activeMenuItem"
            >
                <ElTabPane
                    v-for="(item, index) in menuItems"
                    :key="index"
                    :label="item.name"
                    :name="item.id"
                    lazy
                >
                    <Calculator v-if="item.id === 'calculator'" />

                    <UserManagement v-else-if="item.id === 'userManagement'" />

                    <ChangeParams v-else-if="item.id === 'changeParams'" />

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
                    label-width="auto"
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
                            show-password
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
import ChangeParams from './components/ChangeParams.vue'

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

    if (authStore.isOwner && calculatorStore.doorParams) {
        items.push({
            id: 'changeParams',
            name: 'Редактирование параметров'
        })
    }

    return items
})

const activeMenuItem = ref('calculator')

function signInHandler() {
    authStore.signIn({ login: authForm.login, password: authForm.password })
}

watch(
    () => authStore.accessTokenDecode?.user_id,
    () => {
        if (authStore.accessTokenDecode) {
            calculatorStore.recieveDoorParams()
        } else {
            activeMenuItem.value = 'calculator'
        }
    }
)
</script>
<!-- is-active -->
<style scoped>
:deep(.el-tabs__item.is-top) {
    color: #fff;
}

:deep(.el-tabs__item.is-top.is-active) {
    color: var(--el-color-primary);
}
</style>
