<template>
    <div class="change-params d-flex flex-column justify-content-center">
        <ElCollapse
            v-for="(categories, doorType) of params"
            :key="doorType"
        >
            <ElCollapseItem
                :title="doorType"
                :name="doorType"
            >
                <ElCard
                    v-for="(categoryParams, category) of categories"
                    :key="category"
                    class="category"
                >
                    <template #header>
                        {{ t(category) }}
                    </template>

                    <div
                        v-for="(param, paramIndex) in categoryParams"
                        :key="param.id"
                    >
                        <ElDivider v-if="paramIndex !== 0" />

                        <ElForm
                            label-width="auto"
                            :model="param"
                            @submit.prevent="changeParams(doorType, category, param)"
                        >
                            <ElFormItem
                                v-if="Object.hasOwn(param, 'name')"
                                label="Название"
                            >
                                <ElInput v-model="param.name" />
                            </ElFormItem>

                            <ElFormItem
                                v-if="Object.hasOwn(param, 'price')"
                                :label="param.priceLabel || 'Цена'"
                            >
                                <ElInput
                                    v-model="param.price"
                                    type="number"
                                />
                            </ElFormItem>

                            <ElFormItem>
                                <ElButton
                                    type="success"
                                    :icon="Check"
                                    native-type="submit"
                                >
                                    Сохранить
                                </ElButton>
                            </ElFormItem>
                        </ElForm>
                    </div>
                </ElCard>
            </ElCollapseItem>
        </ElCollapse>
    </div>
</template>

<script setup>
import { ElButton, ElCard, ElCollapse, ElCollapseItem, ElDivider, ElForm, ElFormItem, ElInput, ElMessage } from 'element-plus'
import { Check } from '@element-plus/icons-vue'
import { ref } from 'vue'

import { useAdminStore } from '../stores/admin'
import { useCalculatorStore } from '../stores/calculator'
import { t } from '../config/translates'

const adminStore = useAdminStore()
const calculatorStore = useCalculatorStore()

const params = ref({
    ST: {
        inner_panel: calculatorStore.doorParams.st_config.st_inner_panel.map((p) => ({ id: p.id, name: p.param_name, price: p.price })),
        price_default: calculatorStore.doorParams.st_config.st_price_default.map((p) => ({
            id: p.id,
            price: p.price,
            priceLabel: `Высота ${p.height_from}-${p.height_to}`
        })),
        properties: calculatorStore.doorParams.st_config.st_properties.map((p) => ({ id: p.id, name: p.param_name, price: p.price }))
    },
    STBR: {
        inner_panel: calculatorStore.doorParams.stbr_config.stbr_inner_panel.map((p) => ({ id: p.id, name: p.param_name, price: p.price })),
        price_default: calculatorStore.doorParams.stbr_config.stbr_price_default.map((p) => ({
            id: p.id,
            price: p.price,
            priceLabel: `Высота ${p.height_from}-${p.height_to}`
        })),
        properties: calculatorStore.doorParams.stbr_config.stbr_properties.map((p) => ({ id: p.id, name: p.param_name, price: p.price })),
        outside_panel: calculatorStore.doorParams.stbr_config.stbr_outside_panel.map((p) => ({
            id: p.id,
            name: p.param_name,
            price: p.price
        }))
    },
    TR: {
        inner_panel: calculatorStore.doorParams.tr_config.tr_inner_panel.map((p) => ({ id: p.id, name: p.param_name, price: p.price })),
        price_default: calculatorStore.doorParams.tr_config.tr_price_default.map((p) => ({
            id: p.id,
            price: p.price,
            priceLabel: `Высота ${p.height_from}-${p.height_to}`
        })),
        properties: calculatorStore.doorParams.tr_config.tr_properties.map((p) => ({ id: p.id, name: p.param_name, price: p.price })),
        outside_panel_10: calculatorStore.doorParams.tr_config.tr_outside_panel_10.map((p) => ({
            id: p.id,
            name: p.param_name,
            price: p.price
        })),
        outside_panel_9_5: calculatorStore.doorParams.tr_config.tr_outside_panel_9_5.map((p) => ({
            id: p.id,
            name: p.param_name,
            price: p.price
        }))
    },
    general: {
        door_lock: calculatorStore.doorParams.door_lock.map((p) => ({ id: p.id, name: p.name, price: p.price })),
        door_still_cover: calculatorStore.doorParams.door_still_cover.map((p) => ({ id: p.id, name: p.name, price: p.price })),
        door_type: calculatorStore.doorParams.door_type.map((p) => ({ id: p.id, name: p.type_name })),
        film_type: calculatorStore.doorParams.film_type.map((p) => ({ id: p.id, name: p.type_name, price: p.price }))
    }
})

async function changeParams(doorType, category, param) {
    const data = {}
    if (param.name) {
        data.param_name = param.name
    }
    if (param.price) {
        data.new_price = Number(param.price)
    }

    if (await adminStore.changeParams(doorType, category, param.id, data)) {
        ElMessage({
            message: 'Успешно изменено',
            type: 'success'
        })

        calculatorStore.recieveDoorParams()
    }
}
</script>

<style scoped lang="scss">
.change-params {
    .category {
        min-width: 320px;
        flex: 1;
        margin: 8px;
    }

    :deep(.el-collapse-item__content) {
        display: flex;
        flex-wrap: wrap;
    }
}

:deep(.el-collapse-item__content) {
    background: var(--bg-color);
    color: var(--lite);
}

:deep(.el-collapse-item__header) {
    background: var(--bg-color);
    color: var(--lite);
}
</style>
