<template>
    <div class="d-flex flex-column justify-content-center">
        <div class="d-flex flex-column">
            <ElButton
                class="mb-16"
                type="success"
                @click="handleCreate"
            >
                Создать пользователя
            </ElButton>

            <ElTable :data="adminStore.users">
                <ElTableColumn label="id">
                    <template #default="scope">
                        {{ scope.row.id }}
                    </template>
                </ElTableColumn>

                <ElTableColumn label="Имя">
                    <template #default="scope">
                        {{ scope.row.name }}
                    </template>
                </ElTableColumn>

                <ElTableColumn label="Фамилия">
                    <template #default="scope">
                        {{ scope.row.surname }}
                    </template>
                </ElTableColumn>

                <ElTableColumn
                    v-if="authStore.isOwner"
                    label="Роль"
                >
                    <template #default="scope">
                        {{ scope.row.role_id === Roles.Admin ? 'Админ' : 'Пользователь' }}
                    </template>
                </ElTableColumn>

                <ElTableColumn label="Действия">
                    <template #default="scope">
                        <ElButton
                            size="small"
                            @click="handleEdit(scope.$index, scope.row)"
                        >
                            Редактировать
                        </ElButton>

                        <ElButton
                            size="small"
                            type="danger"
                            @click="adminStore.deleteUser(scope.row.id)"
                        >
                            Удалить
                        </ElButton>
                    </template>
                </ElTableColumn>
            </ElTable>

            <pre>usersPageCount={{ adminStore.usersPageCount }}</pre>

            <ElDialog
                :model-value="userActionModalState?.visible"
                center
                destroy-on-close
                @close="userActionModalState = null"
            >
                <UserAction
                    :user-id="userActionModalState?.userId"
                    :type="userActionModalState?.type"
                    @close="userActionModalState = null"
                />
            </ElDialog>
        </div>
    </div>
</template>

<script setup>
import { ElButton, ElTable, ElTableColumn, ElDialog } from 'element-plus'
import { ref } from 'vue'

import { useAdminStore } from '../stores/admin'
import { useAuthStore, Roles } from '../stores/auth'

import UserAction, { UserActionType } from './UserAction.vue'

const adminStore = useAdminStore()
const authStore = useAuthStore()

const userActionModalState = ref()

const handleCreate = () => {
    userActionModalState.value = {
        visible: true,
        type: UserActionType.CREATE
    }
}

const handleEdit = (_index, row) => {
    userActionModalState.value = {
        visible: true,
        userId: row.id,
        type: UserActionType.EDIT
    }
}

if (!adminStore.users.length) {
    await adminStore.recieveUsers()
}
</script>

<style scoped lang="scss"></style>
