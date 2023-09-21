<template>
    <div class="user-management d-flex flex-column justify-content-center">
        <ElButton
            class="mb-16"
            type="success"
            @click="handleCreate"
        >
            Создать пользователя
        </ElButton>

        <ElTable :data="adminStore.users?.[currentPage]">
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
                        @click="adminStore.deleteUser(scope.row.id, currentPage)"
                    >
                        Удалить
                    </ElButton>
                </template>
            </ElTableColumn>
        </ElTable>

        <ElPagination
            v-if="adminStore.usersPageCount > 1"
            v-model:current-page="currentPage"
            background
            layout="prev, pager, next"
            :default-page-size="1"
            :total="adminStore.usersPageCount"
        />

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
</template>

<script setup>
import { ElButton, ElTable, ElTableColumn, ElDialog, ElPagination } from 'element-plus'
import { ref, watch } from 'vue'

import { useAdminStore } from '../stores/admin'
import { useAuthStore, Roles } from '../stores/auth'

import UserAction, { UserActionType } from './UserAction.vue'

const adminStore = useAdminStore()
const authStore = useAuthStore()

const userActionModalState = ref()
const currentPage = ref(1)

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

watch(currentPage, () => {
    if (!adminStore.users[currentPage.value]?.length) {
        adminStore.recieveUsers(currentPage.value)
    }
})

watch(
    () => adminStore.usersPageCount,
    () => {
        if (adminStore.usersPageCount < currentPage.value) {
            currentPage.value = adminStore.usersPageCount
        }
    }
)

if (!adminStore.users[1]?.length) {
    await adminStore.recieveUsers()
}
</script>

<style scoped lang="scss">
.user-management {
    gap: 8px;
}
</style>
