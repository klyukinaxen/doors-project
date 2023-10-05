<template>
    <div
        v-if="calculatorStore.doorParams"
        class="d-flex flex-column justify-content-center"
    >
        <div class="d-flex flex-column">
            <span class="upper-case fs-16 ls-2 mb-40 ml-20"> Выберите тип двери </span>

            <!-- DOOR TYPE -->
            <div class="d-flex align-items-baseline justify-content-around w-100 primary-bg py-30">
                <div
                    v-for="doorType in calculatorStore.doorParams.door_type"
                    :key="doorType.id"
                    class="door-type"
                >
                    <img
                        :src="`../assets/icons/door-${doorType.id}.svg`"
                        alt=""
                    />

                    <ElButton
                        class="button-door"
                        :class="{ active: door_type === doorType.id }"
                        @click="changeDoorType(doorType.id)"
                    >
                        {{ doorType.type_name }}
                    </ElButton>
                </div>
            </div>

            <!-- DOOR OPEN TYPE -->
            <span class="upper-case fs-16 ls-2 my-45"> укажите размер и способ открывания: </span>

            <div class="d-flex justify-content-around w-100 primary-bg py-30">
                <div
                    v-if="door_type === 1"
                    :class="'d-flex'"
                >
                    <ElSlider
                        v-model="doorSizeHeight"
                        class="row-reverse"
                        vertical
                        :min="DOOR_SIZE.MIN_SINGLE_DOOR_HEIGHT"
                        :max="2550"
                        :step="DOOR_SIZE_STEP"
                        height="230px"
                        show-input
                        size="small"
                        @change="validate"
                    />

                    <div class="door-1-range">
                        <ElSlider
                            v-model="doorSizeWidth"
                            :min="DOOR_SIZE.MIN_SINGLE_DOOR_WIDTH"
                            :max="1080"
                            :step="DOOR_SIZE_STEP"
                            show-input
                            size="small"
                            @change="validate"
                        />

                        <img
                            class="door-1"
                            src="../assets/icons/door-1.0.svg"
                            alt=""
                        />
                    </div>
                </div>

                <div class="d-flex flex-column">
                    <span class="fs-18 fw-600 ls-2 upper-case"> открывание двери </span>

                    <ElRadioGroup
                        v-model="doorOpenType"
                        class="d-flex flex-column radio-group"
                    >
                        <!-- TODO: v-for -->
                        <ElRadio
                            label="1"
                            size="large"
                            class="my-30"
                            border
                        >
                            Правое
                        </ElRadio>

                        <ElRadio
                            label="2"
                            size="large"
                            border
                        >
                            Левое
                        </ElRadio>
                    </ElRadioGroup>
                </div>

                <div
                    v-if="door_type !== 1"
                    :class="'d-flex'"
                >
                    <ElSlider
                        v-model="doorSizeHeight"
                        class="row-reverse range-2"
                        vertical
                        :min="DOOR_SIZE.MIN_DOUBLE_DOOR_HEIGHT"
                        :max="2550"
                        :step="DOOR_SIZE_STEP"
                        height="280px"
                        show-input
                        size="small"
                        @change="validate"
                    />

                    <div class="door-2-range">
                        <ElSlider
                            v-model="doorSizeWidth"
                            :min="DOOR_SIZE.MIN_DOUBLE_DOOR_WIDTH"
                            :max="1600"
                            :step="DOOR_SIZE_STEP"
                            show-input
                            size="small"
                            class="mb-10 ml-15"
                            @change="validate"
                        />

                        <img
                            class="door-2"
                            src="../assets/icons/door-2.0.svg"
                            alt=""
                        />
                    </div>
                </div>
            </div>

            <!-- DOOR TYPE CONSTRUCTION -->
            <span class="upper-case fs-16 ls-2 my-45"> Выберите конструкцию дверей: </span>

            <div class="container-3 d-flex justify-content-around w-100 primary-bg py-30">
                <!-- TODO: v-for -->
                <div class="door-type">
                    <img
                        src="../assets/icons/door-standart.svg"
                        alt=""
                    />

                    <ElButton
                        class="button-door"
                        :class="{ active: typeOfConstruction === 'st' }"
                        @click="selectConstruction('st')"
                    >
                        {{ doorConstructions[0].name }}
                    </ElButton>

                    <span class="fs-14 ls-2 mw-300 pre-line fw-300">
                        {{ doorConstructions[0].description }}
                    </span>
                </div>

                <div class="door-type">
                    <img
                        src="../assets/icons/door-bark.svg"
                        alt=""
                    />

                    <ElButton
                        class="button-door"
                        :class="{ active: typeOfConstruction === 'stbr' }"
                        @click="selectConstruction('stbr')"
                    >
                        {{ doorConstructions[1].name }}
                    </ElButton>

                    <span class="fs-14 ls-2 mw-300 pre-line fw-300">
                        {{ doorConstructions[1].description }}
                    </span>
                </div>

                <div class="door-type">
                    <img
                        src="../assets/icons/door-thermo.svg"
                        alt=""
                    />

                    <ElButton
                        class="button-door"
                        :class="{ active: typeOfConstruction === 'tr' }"
                        @click="selectConstruction('tr')"
                    >
                        {{ doorConstructions[2].name }}
                    </ElButton>

                    <span class="fs-14 ls-2 fw-300 mw-300 pre-line">
                        {{ doorConstructions[2].description }}
                    </span>
                </div>
            </div>

            <!-- DOOR PROPERTIES -->
            <span class="upper-case fs-16 ls-2 my-45"> выберите дополнительные параметры: </span>

            <div v-if="typeOfConstruction !== ''">
                <div class="container-4 d-grid justify-content-center w-100 primary-bg py-30">
                    <div class="d-flex flex-column align-items-center justify-content-start mr-20">
                        <span class="upper-case fs-16 ls-2 fw-600">{{ typeOfConstructionTitle }}</span>

                        <img
                            :src="constructionImage"
                            alt=""
                            class="p-50 pr-80 pt-20"
                        />
                    </div>

                    <div>
                        <!-- PROPERTIES: INSIDE PANEL -->

                        <ElCheckbox
                            v-model="isInnerPanel"
                            label="Внутренняя панель"
                            size="large"
                            class="mw-250 my-30"
                            border
                        />

                        <div
                            v-if="isInnerPanel"
                            class="dropdowns d-grid grid-3 mb-20"
                        >
                            <div class="d-flex flex-column">
                                <span class="upper-case mb-15 fs-12"> внутренняя панель </span>

                                <ElSelect
                                    v-model="inner_panel"
                                    value-key="id"
                                    class="m-2 mw-250"
                                    placeholder="Выберите:"
                                    size="large"
                                >
                                    <template
                                        v-for="item in selectedConstruction[`${typeOfConstruction}_inner_panel`]"
                                        :key="item.id"
                                    >
                                        <!-- TODO: Тут наверно более правильно будет проверять на item.id_properties === false, ну и у ElInput соответственно на true  -->
                                        <ElOption
                                            v-if="item.id !== 1 && item.id !== 2"
                                            :key="item.id"
                                            :label="item.param_name"
                                            :value="item"
                                        />
                                    </template>
                                </ElSelect>
                            </div>

                            <template
                                v-for="item in selectedConstruction[`${typeOfConstruction}_inner_panel`]"
                                :key="item.id"
                            >
                                <div
                                    v-if="item.id === 2 || item.id === 1"
                                    class="d-flex flex-column"
                                >
                                    <span class="upper-case mb-15 fs-12"> {{ item.param_name }} </span>

                                    <ElInput
                                        v-model="construction_inner_color[item.id]"
                                        class="mw-250"
                                        size="large"
                                        placeholder="Введите id"
                                    />
                                </div>
                            </template>

                            <div
                                v-if="isInnerPanelInFilm"
                                class="d-flex flex-column"
                            >
                                <span class="upper-case mb-15 fs-12"> тип пленки внутренней панели </span>

                                <ElSelect
                                    v-model="film_type_inner"
                                    class="m-2 mw-250"
                                    placeholder="Выберите"
                                    size="large"
                                >
                                    <template
                                        v-for="item in calculatorStore.doorParams.film_type"
                                        :key="item.id"
                                    >
                                        <ElOption
                                            v-if="item.id === 1 || (door_type === 1 && item.id === 2) || (door_type !== 1 && item.id === 3)"
                                            :label="`${item.type_name}:  ${item.price}₽`"
                                            :value="item.id"
                                            :aria-label="`Цена: ${item.price}`"
                                        />
                                    </template>
                                </ElSelect>
                            </div>
                        </div>

                        <!-- PROPERTIES: OUTSIDE PANEL -->

                        <div :class="typeOfConstruction !== 'st' ? 'line' : ''"></div>

                        <ElCheckbox
                            v-if="typeOfConstruction === 'stbr' || typeOfConstruction === 'tr'"
                            v-model="isOutsidePanel"
                            label="Внешняя панель"
                            size="large"
                            class="mw-250 my-10"
                            border
                        />

                        <div
                            v-if="typeOfConstruction === 'tr' && isOutsidePanel"
                            class="d-grid grid-3 w-100"
                        >
                            <ElRadioGroup
                                v-model="tr_type_panel"
                                class="d-flex flex-column radio-group"
                            >
                                <ElRadio
                                    label="tr_outside_panel_9_5"
                                    size="large"
                                    class="my-30 mw-260"
                                    border
                                >
                                    Панель снаружи 9.5мм<br />
                                    корабельная фанера
                                </ElRadio>

                                <ElRadio
                                    label="tr_outside_panel_10"
                                    size="large"
                                    class="mw-260"
                                    border
                                >
                                    Панель снаружи 10мм мдф
                                </ElRadio>
                            </ElRadioGroup>

                            <template
                                v-for="item in selectedConstruction[`${tr_type_panel}`]"
                                :key="item.id"
                            >
                                <div
                                    v-if="item.id === 3"
                                    class="d-flex align-items-center ml-30"
                                >
                                    <ElCheckbox
                                        v-model="tr_type.checked"
                                        :label="item.param_name"
                                        class="mw-250"
                                        size="large"
                                        border
                                        @change="
                                            () => {
                                                if (tr_type.checked) tr_type.id = item.id
                                            }
                                        "
                                    />
                                </div>
                            </template>

                            <div class="d-flex flex-column w-100">
                                <template
                                    v-for="item in selectedConstruction[`${tr_type_panel}`]"
                                    :key="item.id"
                                >
                                    <div
                                        v-if="item.id === 1 || item.id === 2"
                                        class="d-flex flex-column mt-10"
                                    >
                                        <span class="upper-case mb-15 fs-12"> {{ item.param_name }} </span>

                                        <ElInput
                                            v-model="tr_type_items[item.id]"
                                            class="mw-250"
                                            size="large"
                                            placeholder="Введите id"
                                        />
                                    </div>
                                </template>
                            </div>
                        </div>

                        <div
                            v-if="isOutsidePanel"
                            class="outside_panel dropdowns d-grid grid-3 my-20"
                        >
                            <div
                                v-if="typeOfConstruction === 'stbr'"
                                class="d-flex flex-column"
                            >
                                <span class="upper-case mb-15 fs-12"> внешняя панель </span>

                                <ElSelect
                                    v-if="typeOfConstruction !== 'tr'"
                                    v-model="outside_panel"
                                    value-key="id"
                                    class="m-2 mw-250"
                                    placeholder="Выберите:"
                                    size="large"
                                >
                                    <template
                                        v-for="item in selectedConstruction[`${typeOfConstruction}_outside_panel`]"
                                        :key="item.id"
                                    >
                                        <ElOption
                                            v-if="item.id !== 1 && item.id !== 2"
                                            :label="item.param_name"
                                            :value="item.id"
                                        />
                                    </template>
                                </ElSelect>

                                <ElSelect
                                    v-else
                                    v-model="outside_panel"
                                    value-key="id"
                                    class="m-2 mw-250"
                                    placeholder="Select"
                                    size="large"
                                >
                                    <template
                                        v-for="item in selectedConstruction[`${tr_type_panel}`]"
                                        :key="item.id"
                                    >
                                        <ElOption
                                            v-if="item.id !== 1 && item.id !== 2"
                                            :label="item.param_name"
                                            :value="item.id"
                                        />
                                    </template>
                                </ElSelect>
                            </div>

                            <template
                                v-for="item in selectedConstruction[`${typeOfConstruction}_outside_panel`]"
                                :key="item.id"
                            >
                                <div
                                    v-if="item.id === 2 || item.id === 1"
                                    class="d-flex flex-column"
                                >
                                    <span class="upper-case mb-15 fs-12"> {{ item.param_name }} </span>

                                    <ElInput
                                        v-model="construction_color[item.id]"
                                        class="mw-250"
                                        size="large"
                                        placeholder="Введите id"
                                    />
                                </div>
                            </template>

                            <div
                                v-if="isOutsidePanelInFilm"
                                class="d-flex flex-column"
                            >
                                <span class="upper-case mb-15 fs-12"> тип пленки внешней панели </span>

                                <ElSelect
                                    v-model="film_type_outside"
                                    class="m-2 mw-250"
                                    placeholder="Выберите"
                                    size="large"
                                >
                                    <template
                                        v-for="item in calculatorStore.doorParams.film_type"
                                        :key="item.id"
                                    >
                                        <ElOption
                                            v-if="item.id === 1 || (door_type === 1 && item.id === 2) || (door_type !== 1 && item.id === 3)"
                                            :label="`${item.type_name}:  ${item.price}₽`"
                                            :value="item.id"
                                        />
                                    </template>
                                </ElSelect>
                            </div>
                        </div>

                        <div class="line"></div>

                        <!-- PROPERTIES: PANELS -->
                        <div class="d-grid input-properties">
                            <template
                                v-for="property in selectedConstruction[`${typeOfConstruction}_properties`]"
                                :key="property.id"
                            >
                                <div
                                    v-if="property.id === 1"
                                    class="d-flex flex-column mt-5"
                                >
                                    <span class="upper-case mb-5 fs-12 mt-10"> {{ property.param_name }} </span>

                                    <ElInput
                                        v-model="properties[property.id]"
                                        class="mw-250"
                                        size="large"
                                        placeholder="Введите id"
                                    />
                                </div>
                            </template>
                        </div>

                        <!-- PROPERTIES: CHECKBOXES -->
                        <div class="checkboxes mt-30">
                            <template
                                v-for="property in selectedConstruction[`${typeOfConstruction}_properties`]"
                                :key="property.id"
                            >
                                <ElCheckbox
                                    v-if="
                                        property.id !== 1 &&
                                        property.id !== 2 &&
                                        property.id !== 15 &&
                                        property.id !== 14 &&
                                        property.id !== 12 &&
                                        property.id !== 13
                                    "
                                    v-model="propertiesConditions[property.id]"
                                    :label="`${property.param_name}: \n ${property.price} ₽`"
                                    size="large"
                                    class="mw-250"
                                    border
                                    :disabled="
                                        ((['st', 'stbr'].includes(typeOfConstruction) && inner_panel?.id === INNER_PANEL_6MM_FILM_ID) ||
                                            typeOfConstruction === 'tr') &&
                                        property.id === PROPERTIES_CONCEALED_MDF_MOUNTING_ID
                                    "
                                />
                            </template>
                        </div>

                        <!-- PROPERTIES: LOCKS AND COVER -->
                        <div class="d-grid locks mt-20">
                            <div
                                v-if="propertiesConditions['7']"
                                class="d-flex flex-column"
                            >
                                <span class="upper-case mb-15 fs-12"> ID ручки</span>

                                <ElInput
                                    v-model="properties['7']"
                                    class="mw-250"
                                    size="large"
                                    placeholder="Введите id"
                                />
                            </div>

                            <div class="d-flex flex-column">
                                <span class="upper-case mb-15 fs-12"> Накладки </span>

                                <template
                                    v-for="property in selectedConstruction[`${typeOfConstruction}_properties`]"
                                    :key="property.id"
                                >
                                    <ElSelect
                                        v-if="property.id === 13"
                                        v-model="properties[property.id]"
                                        class="m-2 mw-250"
                                        placeholder="Выберите:"
                                        size="large"
                                        border
                                    >
                                        <ElOption
                                            v-for="item in calculatorStore.doorParams.door_still_cover"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id"
                                        />
                                    </ElSelect>
                                </template>
                            </div>

                            <div class="d-flex flex-column">
                                <span class="upper-case mb-15 fs-12"> Замки </span>

                                <template
                                    v-for="property in selectedConstruction[`${typeOfConstruction}_properties`]"
                                    :key="property.id"
                                >
                                    <ElSelect
                                        v-if="property.id === 12"
                                        v-model="properties[property.id]"
                                        class="m-2 mw-250"
                                        placeholder="Выберите:"
                                        size="large"
                                    >
                                        <ElOption
                                            v-for="item in calculatorStore.doorParams.door_lock"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id"
                                        />
                                    </ElSelect>
                                </template>
                            </div>
                        </div>

                        <div class="d-flex flex-column mt-20">
                            <span class="upper-case mb-15 fs-12">Добавить комментарий:</span>

                            <ElInput
                                v-model="comment"
                                maxlength="1000"
                                placeholder="Введите комментарий"
                                show-word-limit
                                type="textarea"
                            />
                        </div>
                    </div>
                </div>

                <div class="w-100 d-flex align-items-center justify-content-center flex-column">
                    <button
                        class="upper-case count fs-16 ls-2 my-45 mw-270 fw-600"
                        @click="recieveTotalPrice"
                    >
                        рассчитать стоимость
                    </button>

                    <button
                        class="upper-case count fs-16 ls-2 my-45 mw-270 fw-600"
                        @click="doorSave"
                    >
                        Сохранить параметры
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useCalculatorStore, doorConstructions } from '../stores/calculator'
import { ElButton, ElRadioGroup, ElRadio, ElSlider, ElOption, ElSelect, ElInput, ElCheckbox, ElMessageBox, ElMessage } from 'element-plus'
import { computed, ref, watch } from 'vue'
import { saveAs } from 'file-saver'
import { DOOR_SIZE_STEP, INNER_PANEL_6MM_FILM_ID, PROPERTIES_CONCEALED_MDF_MOUNTING_ID, DOOR_SIZE } from '../config/constants'

const calculatorStore = useCalculatorStore()

const door_type = ref(calculatorStore.doorParams.door_type[0].id)

const doorOpenType = ref('1')

const doorSizeWidth = ref(180)
const doorSizeHeight = ref(550)

const typeOfConstruction = ref('') //tr-stbr-st

const typeOfConstructionTitle = computed(() => {
    if (typeOfConstruction.value === 'st') {
        return 'СТ'
    } else if (typeOfConstruction.value === 'stbr') {
        return 'СТБР'
    } else {
        return 'ТР'
    }
})

const selectedConstruction = computed(() => {
    return calculatorStore.doorParams[`${typeOfConstruction.value}_config`]
})

const constructionImage = computed(() => {
    if (door_type.value === 1) {
        return '../assets/icons/door-1.svg'
    } else {
        return '../assets/icons/door-2.svg'
    }
})

const isInnerPanelInFilm = computed(() => {
    return inner_panel.value?.param_name.startsWith('В плёнке')
})

const isOutsidePanelInFilm = computed(() => {
    return outside_panel.value === 3
})

const inner_panel = ref()
const outside_panel = ref()

const isInnerPanel = ref(false)
const isOutsidePanel = ref(false)

const properties = ref({})
const propertiesConditions = ref({})

const film_type_inner = ref()
const film_type_outside = ref()

const construction_color = ref({})
const construction_inner_color = ref({})

const tr_type_panel = ref('')
const tr_type = ref({})
const tr_type_items = ref({})

const comment = ref('')

const reset = () => {
    inner_panel.value = undefined
    outside_panel.value = undefined

    isInnerPanel.value = false
    isOutsidePanel.value = false

    for (const key in properties.value) {
        if (Object.hasOwnProperty.call(properties.value, key)) {
            properties.value[key] = undefined
        }
    }

    for (const key in propertiesConditions.value) {
        if (Object.hasOwnProperty.call(propertiesConditions.value, key)) {
            propertiesConditions.value[key] = false
        }
    }

    film_type_inner.value = undefined
    film_type_outside.value = undefined

    construction_color.value = {}
    construction_inner_color.value = {}

    tr_type_panel.value = ''
    tr_type.value = {}
    tr_type_items.value = {}
}

const innerPanelReset = () => {
    inner_panel.value = undefined
    construction_inner_color.value = {}
    film_type_inner.value = undefined
}

const outsidePanelReset = () => {
    outside_panel.value = undefined
    film_type_outside.value = undefined

    tr_type_panel.value = ''
    tr_type.value = {}
    tr_type_items.value = {}
    construction_color.value = {}
}

watch(door_type, () => {
    if (door_type.value === 1) {
        doorSizeWidth.value = DOOR_SIZE.MIN_SINGLE_DOOR_WIDTH
    } else {
        doorSizeWidth.value = DOOR_SIZE.MIN_DOUBLE_DOOR_WIDTH
    }
})

watch(isInnerPanel, (newValue, oldValue) => {
    if (oldValue === true && newValue === false) {
        innerPanelReset()
    }
})

watch(isOutsidePanel, (newValue, oldValue) => {
    if (oldValue === true && newValue === false) {
        outsidePanelReset()
    }
})

const changeDoorType = (event) => {
    door_type.value = event

    reset()
}

const selectConstruction = (type) => {
    typeOfConstruction.value = type

    reset()

    // Выбираем 'Скрытое крепление мдф' по умолчанию для TR
    if (typeOfConstruction.value === 'tr') {
        const construction = selectedConstruction.value[`${typeOfConstruction.value}_properties`].find(
            (c) => c.id === PROPERTIES_CONCEALED_MDF_MOUNTING_ID
        )
        if (construction) {
            propertiesConditions.value[PROPERTIES_CONCEALED_MDF_MOUNTING_ID] = true
        }
    }
}

const innerPanelOnChange = () => {
    if (['st', 'stbr'].includes(typeOfConstruction.value) && inner_panel.value?.id === INNER_PANEL_6MM_FILM_ID) {
        propertiesConditions.value[PROPERTIES_CONCEALED_MDF_MOUNTING_ID] = false
    }

    if (isInnerPanelInFilm.value) {
        film_type_inner.value = 1
    } else {
        film_type_inner.value = undefined
    }
}

watch(inner_panel, innerPanelOnChange)

const outsidePanelOnChange = () => {
    if (isOutsidePanelInFilm.value) {
        film_type_outside.value = 1
    } else {
        film_type_outside.value = undefined
    }
}

watch(outside_panel, outsidePanelOnChange)

const getFormData = () => {
    const mergedProperties = { ...propertiesConditions.value, ...properties.value }

    let data = {}
    data = {
        door_type_id: {
            id: door_type.value
        }
    }
    data.door_opening_id = { id: Number(doorOpenType.value) }
    console.log(data.door_opening_id)
    if (typeOfConstruction.value === 'tr') {
        data.tr_properties_ids = []

        for (const key in mergedProperties) {
            const element = mergedProperties[key]
            if (typeof element === 'boolean') {
                if (element) {
                    data.tr_properties_ids.push({ id: Number(key) })
                }
            } else if (element !== undefined) {
                data.tr_properties_ids.push({ id: Number(key), id_properties: String(element) })
            }
        }

        data.tr_inner_panel_ids = []

        if (inner_panel.value && film_type_inner.value) {
            data.tr_inner_panel_ids.push({ id: inner_panel.value.id, id_properties: String(film_type_inner.value) })
        } else if (inner_panel.value) {
            data.tr_inner_panel_ids.push({ id: inner_panel.value.id })
        }

        for (const key in construction_inner_color.value) {
            const element = construction_inner_color.value[key]
            if (element) {
                data.tr_inner_panel_ids.push({ id: Number(key), id_properties: String(element) })
            }
        }

        if (tr_type_panel.value === 'tr_outside_panel_9_5') {
            data.tr_outside_panel_9_5_ids = []
            if (tr_type.value.checked) {
                data.tr_outside_panel_9_5_ids.push({ id: tr_type.value.id })
            }

            for (const key in tr_type_items.value) {
                const element = tr_type_items.value[key]
                if (element) {
                    data.tr_outside_panel_9_5_ids.push({ id: Number(key), id_properties: String(element) })
                }
            }
        }

        if (tr_type_panel.value === 'tr_outside_panel_10') {
            data.tr_outside_panel_10_ids = []
            if (tr_type.value.checked) {
                data.tr_outside_panel_10_ids.push({ id: tr_type.value.id })
            }

            for (const key in tr_type_items.value) {
                const element = tr_type_items.value[key]
                if (element) {
                    data.tr_outside_panel_10_ids.push({ id: Number(key), id_properties: String(element) })
                }
            }
        }

        data.price_default = { width: doorSizeWidth.value, height: doorSizeHeight.value }
    }

    // STBR
    else if (typeOfConstruction.value === 'stbr') {
        data.stbr_properties_ids = []

        for (const key in mergedProperties) {
            const element = mergedProperties[key]
            if (typeof element === 'boolean') {
                if (element) {
                    data.stbr_properties_ids.push({ id: Number(key) })
                }
            } else {
                if (element !== undefined) {
                    data.stbr_properties_ids.push({ id: Number(key), id_properties: String(element) })
                }
            }
        }

        data.stbr_inner_panel_ids = []
        data.stbr_outside_panel_ids = []

        if (outside_panel.value && film_type_outside.value) {
            data.stbr_outside_panel_ids.push({ id: Number(outside_panel.value), id_properties: String(film_type_outside.value) })
        } else if (outside_panel.value) {
            data.stbr_outside_panel_ids.push({ id: Number(outside_panel.value) })
        }

        for (const key in construction_color.value) {
            const element = construction_color.value[key]
            if (element) {
                data.stbr_outside_panel_ids.push({ id: Number(key), id_properties: String(element) })
            }
        }

        if (inner_panel.value && film_type_inner.value) {
            data.stbr_inner_panel_ids.push({ id: inner_panel.value.id, id_properties: String(film_type_inner.value) })
        } else if (inner_panel.value) {
            data.stbr_inner_panel_ids.push({ id: inner_panel.value.id })
        }

        for (const key in construction_inner_color.value) {
            const element = construction_inner_color.value[key]
            if (element) {
                data.stbr_inner_panel_ids.push({ id: Number(key), id_properties: String(element) })
            }
        }

        data.price_default = { width: doorSizeWidth.value, height: doorSizeHeight.value }
    }

    // ST
    else {
        data.st_properties_ids = []

        for (const key in mergedProperties) {
            const element = mergedProperties[key]
            if (typeof element === 'boolean') {
                if (element) {
                    data.st_properties_ids.push({ id: Number(key) })
                }
            } else {
                if (element !== undefined) {
                    data.st_properties_ids.push({ id: Number(key), id_properties: String(element) })
                }
            }
        }

        data.st_inner_panel_ids = []

        if (inner_panel.value && film_type_inner.value) {
            data.st_inner_panel_ids.push({ id: inner_panel.value.id, id_properties: String(film_type_inner.value) })
        } else if (inner_panel.value) {
            data.st_inner_panel_ids.push({ id: inner_panel.value.id })
        }

        for (const key in construction_inner_color.value) {
            const element = construction_inner_color.value[key]
            if (element) {
                data.st_inner_panel_ids.push({ id: Number(key), id_properties: String(element) })
            }
        }

        if (film_type_inner.value !== undefined) {
            data.film_type_id = { id: Number(film_type_inner.value) }
        }

        data.price_default = { width: doorSizeWidth.value, height: doorSizeHeight.value }
    }

    data.comment = comment.value
    // console.log(data, 'data')

    return data
}

const validate = () => {
    if ([doorSizeWidth.value, doorSizeHeight.value].some((value) => value % DOOR_SIZE_STEP !== 0)) {
        ElMessageBox.alert(`Размеры (высота, ширина) должны быть кратны ${DOOR_SIZE_STEP}`, 'Ошибка', {
            confirmButtonText: 'ОК'
        })
        return false
    }

    return true
}

const recieveTotalPrice = async () => {
    if (!validate()) {
        return
    }

    const totalPrice = await calculatorStore.recieveTotalPrice(typeOfConstruction.value, getFormData())
    if (!totalPrice) {
        return
    }

    ElMessageBox.alert(new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(totalPrice), 'Итоговая цена', {
        confirmButtonText: 'ОК'
    })
}

const doorSave = async () => {
    if (!validate()) {
        return
    }

    const idOrder = await calculatorStore.doorSave(typeOfConstruction.value, getFormData())
    if (!idOrder) {
        return
    }

    ElMessageBox.confirm(`Выбранные параметры двери сохранены. Номер заказа: ${idOrder}`, 'Успешно', {
        confirmButtonText: 'Скачать файл заказа',
        cancelButtonText: 'Закрыть',
        type: 'success'
    })
        .then(async () => {
            const response = await calculatorStore.doorSaveFile(idOrder)
            if (!response) {
                return
            }

            const contentDisposition = response.headers['Content-Disposition']
            // attachment; filename=result.xlsx
            const filename = String(contentDisposition).split('filename=')[1]
            saveAs(response.data, filename || 'result.xlsx')

            ElMessage({
                type: 'success',
                message: 'Успешно скачано'
            })
        })
        .catch(() => {})
}
</script>

<style scoped lang="scss">
.locks {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
}
.count {
    border-radius: 10px;
    max-width: 400px;
    background: #fff;
    color: #7c7c7c;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    transition: background 0.5s ease;
    border: none;
}

.count:hover {
    background: var(--secondary);
    color: #fff;
    transition: background 0.5s ease;
}

.line {
    border-top: 1px solid #fff;
    margin: 10px 0;
    width: 100%;
}

.dropdown-click {
    background-color: black;
    box-sizing: border-box;
    padding: 15px;
    border-radius: 10%;
    color: #fff;
}

.radio-group {
    align-items: flex-start;
    white-space: pre-line;
}

header {
    line-height: 1.5;
}

.container-4 {
    grid-template-columns: 1fr 2fr 0.5fr;
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}

.el-slider {
    margin-top: 12px;
    margin-left: 12px;
}

.door-1-range {
    width: 350px;
}

.door-2-range {
    padding-left: 15px;
    width: 460px;
}

.door-2,
.door-1 {
    height: 350px;
}

.range-2 {
    display: flex;
}

.door-type {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.button-door {
    min-width: 120px;
    max-width: 215px;
    margin: 20px 0;
    border-radius: 0;
    text-transform: uppercase;
    font-weight: 600;
    color: black;

    &:hover,
    &:focus,
    &:active,
    &.active {
        background-color: var(--secondary);
        color: #fff;
        border: none;
        box-shadow:
            0px 0px 40px 0px rgba(255, 255, 255, 0.25),
            0px 4px 4px 0px rgba(0, 0, 0, 0.25),
            0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    }

    transition: box-shadow 0.3s ease;
    transition: background-color 0.5s ease;
}

.container-3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: flex-start;
}

.checkboxes {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    box-sizing: border-box;
    gap: 10px;

    :deep(.el-checkbox.is-bordered.el-checkbox--large .el-checkbox__label) {
        font-size: 12px;
        text-transform: uppercase;
        margin-right: 0;
        white-space: pre-line;
    }

    :deep(.el-checkbox.is-bordered.el-checkbox--large) {
        border-color: #7c7c7c;
    }

    :deep(.el-checkbox.el-checkbox--large.is-bordered.is-checked) {
        border-color: #fff;
    }

    :deep(span.el-checkbox__label) {
        color: #fff;
    }
}

:deep(.el-radio.is-bordered.el-radio--large) {
    white-space: pre-line;
    width: 100%;
}

:deep(.el-checkbox.is-disabled) {
    opacity: 0.5;
}

:deep(.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner) {
    background: #409eff;
}

:deep(.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after) {
    border-color: #fff;
    opacity: 1;
}
// #tab-userManagement

.input-properties {
    grid-template-columns: repeat(3, 1fr);
}
</style>
