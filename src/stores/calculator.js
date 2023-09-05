import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCalculatorStore = defineStore('calculator', () => {
    const doorParams = ref(null)

    async function getDoorParams() {
        doorParams.value = (await import('./doorParams.json')).default
    }

    return { doorParams, getDoorParams }
})
