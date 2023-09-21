import { ref } from 'vue'
import { defineStore } from 'pinia'

import { apiInstance } from '../api/instance'

export const useAdminStore = defineStore('admin', () => {
    const users = ref({
        1: []
    })
    const usersPageCount = ref(1)

    async function recieveUsers(page = 1) {
        const response = await apiInstance
            .get('/admin/getUsers', {
                params: { page }
            })
            .catch(console.log)
        const data = response?.data.message?.data

        if (data) {
            users.value[page] = data.users || []
            usersPageCount.value = data.page_count || 1
        }
    }

    async function deleteUser(id, page = 1) {
        const response = await apiInstance.delete(`/admin/delUser/${id}`).catch(console.log)
        if (response?.data?.status === 'ok') {
            recieveUsers(page)
        }
    }

    async function createUser(data) {
        const response = await apiInstance.post(`/admin/createUser`, data).catch(console.log)
        if (response?.data?.status === 'ok') {
            recieveUsers()
            return true
        }
    }

    async function changeUser(data) {
        const response = await apiInstance.patch(`/admin/changeUser`, data).catch(console.log)
        if (response?.data?.status === 'ok') {
            recieveUsers()
            return true
        }
    }

    return { users, usersPageCount, recieveUsers, deleteUser, createUser, changeUser }
})
