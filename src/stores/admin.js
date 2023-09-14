import { ref } from 'vue'
import { defineStore } from 'pinia'
import { apiInstance } from '../api/instance'

export const useAdminStore = defineStore('admin', () => {
    const users = ref([])

    async function recieveUsers() {
        const response = await apiInstance.get('/admin/getUsers').catch(console.log)
        const message = response?.data.message
        if (message?.data?.length) {
            users.value = message.data
                // TODO: временно до стандартизации со стороны api
                .map((user) => ({
                    ...user,
                    roleId: user.role_id,
                    name: user.im,
                    surname: user.fm
                }))
        }
    }

    async function deleteUser(id) {
        const response = await apiInstance.delete(`/admin/delUser/${id}`).catch(console.log)
        const message = response?.data.message
        if (message?.info === 'success') {
            recieveUsers()
        }
    }

    return { users, recieveUsers, deleteUser }
})
