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
                :required="type === UserActionType.CREATE"
                show-password
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
            <ElRadioGroup v-model="userForm.role_id">
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
    role_id: String(Roles.User)
})

async function userFormSubmitHandler() {
    let isSuccessful = false
    if (props.type === UserActionType.CREATE) {
        isSuccessful = !!(await adminStore.createUser({
            login: userForm.login,
            password: userForm.password,
            name: userForm.name,
            surname: userForm.surname,
            role_id: Number(userForm.role_id)
        }))
    } else {
        isSuccessful = !!(await adminStore.changeUser({
            user_id: props.userId,
            name: userForm.name,
            surname: userForm.surname,
            role_id: Number(userForm.role_id),
            password: userForm.password
        }))
    }

    if (isSuccessful === true) {
        emit('close')
    }
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
    userForm.role_id = String(user.role_id)
})
</script>
