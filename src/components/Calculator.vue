<template>
    <div>
        <pre>doorParams={{ calculatorStore.doorParams }}</pre>
    </div>
</template>

<script setup>
import { useCalculatorStore } from '../stores/calculator'

const calculatorStore = useCalculatorStore()
calculatorStore.recieveDoorParams()
</script>
