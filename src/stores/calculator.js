import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCalculatorStore = defineStore('calculator', () => {
    const doorParams = ref(null)

    async function recieveDoorParams() {
        doorParams.value = (await import('./doorParams.json')).default
    }

    return { doorParams, recieveDoorParams }
})
