import { ref } from 'vue'
import { defineStore } from 'pinia'
import { apiInstance } from '../api/instance'
import { useAuthStore } from './auth'

/**
 * st_config
 * stbr_config
 * tr_config
 */
export const doorConstructions = [
    {
        id: 'st',
        name: 'СТ',
        description: `Стандартная конструкция (цельногнутая)\n
        - Открывание - правое/левое  \n
        - Петли шарикоподшипниковые \n
        - Толщина металлического листа конструкции 2 мм.\n
        - Толщина полотна 77 мм  \n
        - Установка наружной панели – нет \n
        - Установка внутренней панели МДФ - 6 мм, 10 мм, 16 мм.  \n    
        - Контуры уплотнителя - 2 шт  \n
        - Порог – стандарт 60 мм.\n
        - Наличники – стандарт 75 мм.\n
        - Наполнение полотна: базальтовая плита + минеральная вата\n
        - Наполнение коробки: минеральная вата`
    },
    {
        id: 'stbr',
        name: 'СТбр',
        description: `Усовершенствованная конструкция (цельногнутая)\n
        - Открывание - правое/левое  \n 
        - Петли БАРК\n     
        - Толщина металлического листа конструкции 2 мм.\n
        - Толщина полотна 77 мм \n       
        - Установка наружной панели 10мм - да   \n   
        - Установка внутренней панели МДФ - 6 мм, 10 мм, 16 мм.\n
        - Контуры уплотнителя - 2 шт \n        
        - Порог - стандарт 60 мм\n   
        - Наличники – стандарт 75 мм\n
        - Наполнение полотна: базальтовая плита + минеральная вата\n
        - Наполнение коробки: минеральная вата`
    },
    {
        id: 'tr',
        name: 'ТР (термо)',
        description: `Конструкция, которая предназначена для проёмов, которые граничат с улицей (цельногнутая,
        предназначена для установки в проем, граница тепло/холод)\n
        - Открывание - правое/левое  \n 
        - Петли БАРК    \n 
        - Толщина металлического листа конструкции 2 мм.\n
        - Толщина полотна 93 мм \n   
        - Установка наружной панели - да\n
        - Установка внутренней панели МДФ - 16 мм.\n      
        - Контуры уплотнителя - 3 шт\n   
        - Порог – стандарт 60 мм\n      
        - Наличники – стандарт 75 мм\n
        - Наполнение полотна: базальтовая плита + минеральная вата\n
        - Наполнение коробки: пеноплекс + термокабель`
    }
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
        // console.log('doorParams', message)
        if (message) {
            doorParams.value = message
        }
    }

    async function recieveTotalPrice(type, data) {
        const response = await apiInstance.post(`door/totalPrice/${String(type).toUpperCase()}`, data).catch(console.log)
        const message = response?.data.message
        return message?.total_price
    }

    async function doorSave(type, data) {
        const response = await apiInstance.post(`door/save/${String(type).toUpperCase()}`, data).catch(console.log)
        const message = response?.data.message
        return message?.id_order
    }

    async function doorSaveFile(orderId) {
        const response = await apiInstance.get(`door/saveFile/${orderId}`, { responseType: 'blob' }).catch(console.log)
        if (response) {
            return response
        }
    }

    return { doorConstructions, doorParams, recieveDoorParams, recieveTotalPrice, doorSave, doorSaveFile }
})
