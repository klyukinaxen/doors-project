<template>
    <div class="d-flex flex-column justify-content-center">
        <div class="d-flex flex-column">
            <ElButton
                class="mb-16"
                type="success"
                @click="console.log"
            >
                Создать пользователя
            </ElButton>

            <ElTable :data="adminStore.users">
                <ElTableColumn label="id">
                    <template #default="scope">
                        {{ scope.row.id }}
                    </template>
                </ElTableColumn>

                <ElTableColumn label="im">
                    <template #default="scope">
                        {{ scope.row.im }}
                    </template>
                </ElTableColumn>

                <ElTableColumn label="fm">
                    <template #default="scope">
                        {{ scope.row.fm }}
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

            <!-- <pre>adminStore.users={{ adminStore.users }}</pre> -->
        </div>
    </div>
</template>

<script setup>
import { ElButton, ElTable, ElTableColumn } from 'element-plus'

import { useAdminStore } from '../stores/admin'
import { useAuthStore, Roles } from '../stores/auth'

const adminStore = useAdminStore()
const authStore = useAuthStore()

const handleEdit = (index, row) => {
    console.log('handleEdit', index, row)
}

if (!adminStore.users.length) {
    await adminStore.recieveUsers()
}
</script>

<style scoped lang="scss"></style>
