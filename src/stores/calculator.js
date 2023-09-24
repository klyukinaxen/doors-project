import { ref } from 'vue'
import { defineStore } from 'pinia'
import { apiInstance } from '../api/instance'
import { useAuthStore } from './auth'

/**
 * st_config
 * stbr_config
 * tr_config
 */
const doorConstructions = [
    {
        id: 'st',
        name: 'Стандарт',
        description: `Стандартная конструкция на двух «шарикоподшипниковых» петлях, без возможности установить МДФ панель снаружи.\n\n- Толщина листа 2мм\n- 2 контура уплотнения`
    },
    {
        id: 'stbr',
        name: 'Петли барк',
        description: `Усовершенствованная конструкция на двух петлях «Барк» с возможностью выбора расширенных характеристик.\n\n- толщина листа 2мм\n- 2 контура уплотнения\n- есть возможность установить панель снаружи`
    },
    { id: 'tr', name: 'Терморазрыв', description: `Конструкция, которая предназначена для проёмов, которые граничат с улицей.` }
]

export const useCalculatorStore = defineStore('calculator', () => {
    const authStore = useAuthStore()

    const doorParams = ref(null)

    async function recieveDoorParams() {
        if (!authStore.accessToken) {
            return
        }

        const response = await apiInstance.get('/door/params').catch(console.log)
        const message = response?.data.message
        console.log('doorParams', message)
        if (message) {
            doorParams.value = message
        }
    }

    async function recieveDoorParams() {
        if (!authStore.accessToken) {
            return
        }

        const response = await apiInstance.get('/door/params').catch(console.log)
        const message = response?.data.message
        console.log('doorParams', message)
        if (message) {
            doorParams.value = message
        }
    }

    async function recieveTotalPrice(type, data) {
        if (!authStore.accessToken) {
            return
        }

        const response = await apiInstance.post(`door/totalPrice/${String(type).toUpperCase()}`, data).catch(console.log)
        const message = response?.data.message
        return message?.total_price
    }

    async function recieveDoorParams() {
        if (!authStore.accessToken) {
            return
        }

        const response = await apiInstance.get('/door/params').catch(console.log)
        const message = response?.data.message
        console.log('doorParams', message)
        if (message) {
            doorParams.value = message
        }
    }

    async function sendForm(data) {
        console.log(data);
    }

    return { doorConstructions, doorParams, recieveDoorParams, recieveTotalPrice }
})
