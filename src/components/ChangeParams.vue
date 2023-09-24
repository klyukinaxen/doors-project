<template>
    <div class="change-params d-flex flex-column justify-content-center">
        <div
            v-for="(categories, doorType) of params"
            :key="doorType"
        >
            <template v-if="doorType === 'general'">
                <div
                    v-for="(categoryParams, category) of categories"
                    :key="category"
                >
                    <ElCard class="my-8">
                        <template #header>
                            {{ category }}
                        </template>

                        <div
                            v-for="param in categoryParams"
                            :key="param.id"
                        >
                            <pre>{{ param.name }}</pre>
                            <pre>{{ param.price }}</pre>
                        </div>
                    </ElCard>
                </div>
            </template>

            <template v-else>
                <pre>{{ doorType }}</pre>
                <pre>{{ categories }}</pre>
            </template>
        </div>
    </div>
</template>

<script setup>
import { ElCard } from 'element-plus'

import { useAdminStore } from '../stores/admin'
import { useCalculatorStore } from '../stores/calculator'

const adminStore = useAdminStore()
const calculatorStore = useCalculatorStore()

const params = {
    // doorType
    ST: {},
    STBR: {},
    TR: {},
    general: {
        door_lock: calculatorStore.doorParams.door_lock.map((p) => ({ id: p.id, name: p.name, price: p.price })),
        door_still_cover: calculatorStore.doorParams.door_still_cover.map((p) => ({ id: p.id, name: p.name, price: p.price })),
        door_type: calculatorStore.doorParams.door_type.map((p) => ({ id: p.id, name: p.type_name })),
        film_type: calculatorStore.doorParams.film_type.map((p) => ({ id: p.id, name: p.type_name, price: p.price }))
    }
}
</script>

<style scoped lang="scss"></style>
