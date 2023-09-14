<template>
    <!-- <pre>{{ { userId, type } }}</pre> -->
    <ElForm
        :model="userForm"
        @submit.prevent="userFormSubmitHandler"
    >
        <ElFormItem
            v-if="type === UserActionType.CREATE"
            label="Логин"
        >
            <ElInput
                v-model="userForm.login"
                name="login"
                required
            />
        </ElFormItem>

        <ElFormItem label="Пароль">
            <ElInput
                v-model="userForm.password"
                name="password"
                required
            />
        </ElFormItem>

        <ElFormItem label="Имя">
            <ElInput
                v-model="userForm.name"
                name="name"
                required
            />
        </ElFormItem>

        <ElFormItem label="Фамилия">
            <ElInput
                v-model="userForm.surname"
                name="surname"
                required
            />
        </ElFormItem>

        <ElFormItem
            v-if="authStore.isOwner"
            label="Роль"
        >
            <ElRadioGroup v-model="userForm.roleId">
                <ElRadioButton :label="String(Roles.User)">Пользователь</ElRadioButton>
                <ElRadioButton :label="String(Roles.Admin)">Админ</ElRadioButton>
            </ElRadioGroup>
        </ElFormItem>

        <ElFormItem>
            <ElButton
                type="primary"
                native-type="submit"
            >
                Сохранить
            </ElButton>
        </ElFormItem>
    </ElForm>
</template>

<script>
export const UserActionType = Object.freeze({
    CREATE: 'create',
    EDIT: 'edit'
})
</script>

<script setup>
import { ElButton, ElForm, ElFormItem, ElInput, ElRadioButton, ElRadioGroup } from 'element-plus'
import { onMounted, reactive } from 'vue'

import { useAdminStore } from '../stores/admin'
import { Roles, useAuthStore } from '../stores/auth'

const props = defineProps({
    // eslint-disable-next-line vue/require-default-prop
    userId: {
        type: Number,
        required: false
    },
    type: UserActionType.EDIT
})

const emit = defineEmits(['close'])

const adminStore = useAdminStore()
const authStore = useAuthStore()

const userForm = reactive({
    login: '',
    password: '',
    name: '',
    surname: '',
    roleId: String(Roles.User)
})

function userFormSubmitHandler() {
    console.log('userForm', userForm)

    emit('close')
}

onMounted(() => {
    if (!props.userId) {
        return
    }

    const user = adminStore.users.find((user) => user.id === props.userId)
    if (!user) {
        return
    }

    userForm.password = user.password
    userForm.name = user.name
    userForm.surname = user.surname
    userForm.roleId = String(user.roleId)
})
</script>
