import { ref } from 'vue'
import { defineStore } from 'pinia'
import { apiInstance } from '../api/instance'

export const useAdminStore = defineStore('admin', () => {
    const users = ref([])
    const usersPageCount = ref()

    async function recieveUsers(page = 1) {
        const response = await apiInstance
            .get('/admin/getUsers', {
                params: { page }
            })
            .catch(console.log)
        const data = response?.data.message?.data

        if (data?.users?.length) {
            users.value = data.users
            usersPageCount.value = data.page_count
        }
    }

    async function deleteUser(id) {
        const response = await apiInstance.delete(`/admin/delUser/${id}`).catch(console.log)
        if (response?.data?.status === 'ok') {
            recieveUsers()
        }
    }

    async function createUser(data) {
        const response = await apiInstance.post(`/admin/createUser`, data).catch(console.log)
        if (response?.data?.status === 'ok') {
            recieveUsers()
        }
    }

    async function changeUser(data) {
        const response = await apiInstance.patch(`/admin/changeUser`, data).catch(console.log)
        if (response?.data?.status === 'ok') {
            recieveUsers()
        }
    }

    return { users, usersPageCount, recieveUsers, deleteUser, createUser, changeUser }
})
