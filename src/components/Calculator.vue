<template>
    <div
        v-if="calculatorStore.doorParams"
        class="d-flex flex-column justify-content-center"
    >
        <div class="d-flex flex-column">
            <span class="upper-case fs-16 ls-2 mb-40 ml-20"> Выберите тип двери </span>

            <!-- DOOR TYPE -->
            <div class="d-flex justify-content-around w-100 primary-bg py-30">
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
                <div :class="door_type === 2 || door_type === 3 ? 'd-none' : 'd-flex'">
                    <ElSlider
                        v-model="doorSizeHeight"
                        class="row-reverse"
                        vertical
                        :min="0"
                        :max="2550"
                        height="230px"
                        show-input
                        size="small"
                        @change="doorSizeHeight = $event"
                    />

                    <div class="door-1-range">
                        <ElSlider
                            v-model="doorSizeWidth"
                            :min="0"
                            :max="1080"
                            show-input
                            size="small"
                            @change="doorSizeWidth = $event"
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
                        <ElRadio
                            label="right"
                            size="large"
                            class="my-30"
                            border
                            @click="doorOpenType = label"
                        >
                            Правое
                        </ElRadio>

                        <ElRadio
                            label="left"
                            size="large"
                            border
                            @click="doorOpenType = label"
                        >
                            Левое
                        </ElRadio>
                    </ElRadioGroup>
                </div>

                <div :class="door_type === 1 ? 'd-none' : 'd-flex'">
                    <ElSlider
                        v-model="doorSizeHeight"
                        class="row-reverse range-2"
                        vertical
                        :min="0"
                        :max="2550"
                        height="280px"
                        show-input
                        size="small"
                        @change="doorSizeHeight = $event"
                    />

                    <div class="door-2-range">
                        <ElSlider
                            v-model="doorSizeWidth"
                            :min="0"
                            :max="1600"
                            show-input
                            size="small"
                            class="mb-10 ml-15"
                            @change="doorSizeWidth = $event"
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
                        СТ
                    </ElButton>

                    <span class="fs-14 ls-2 mw-250 fw-300">
                        Стандартная конструкция на двух «шарикоподшипниковых» петлях, без возможности установить МДФ панель снаружи.
                        <br />
                        <br />
                        - Толщина листа 2мм
                        <br />
                        - 2 контура уплотнения
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
                        СТБР
                    </ElButton>

                    <span class="fs-14 ls-2 mw-250 fw-300">
                        Усовершенствованная конструкция на двух петлях «Барк» с возможностью выбора расширенных характеристик.
                        <br />
                        <br />
                        - толщина листа 2мм <br />
                        - 2 контура уплотнения<br />
                        - есть возможность установить панель снаружи
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
                        ТР
                    </ElButton>

                    <span class="fs-14 ls-2 mw-250 fw-300">
                        Конструкция, которая предназначена для проёмов, которые граничат с улицей.
                    </span>
                </div>
            </div>

            <span class="upper-case fs-16 ls-2 my-45"> выберите дополнительные параметры: </span>

            <div v-if="typeOfConstruction !== ''">
                <!-- DOOR PROPERTIES -->

                <div class="container-4 d-flex justify-content-center w-100 primary-bg py-30">
                    <div class="d-flex flex-column align-items-center justify-content-start mr-20">
                        <span class="upper-case fs-16 ls-2 fw-600">{{ construction_title }}</span>

                        <img
                            :src="construction_image"
                            alt=""
                            class="p-50 pr-80 pt-20"
                        />
                    </div>

                    <div>
                        <!-- PROPERTIES: INSIDE PANEL -->
                        <div class="dropdowns d-grid grid-3 mb-20">
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
                                        v-for="item in selected_construction[`${typeOfConstruction}_inner_panel`]"
                                        :key="item.id"
                                    >
                                        <ElOption
                                            v-if="item.param_name !== 'Фреза' && item.param_name !== 'Цвет панели'"
                                            :key="item.id"
                                            :label="item.param_name"
                                            :value="item"
                                        />
                                    </template>
                                </ElSelect>
                            </div>

                            <template
                                v-for="item in selected_construction[`${typeOfConstruction}_inner_panel`]"
                                :key="item.id"
                            >
                                <div
                                    v-if="item.param_name === 'Фреза' || item.param_name === 'Цвет панели'"
                                    class="d-flex flex-column"
                                >
                                    <span class="upper-case mb-15 fs-12"> {{ item.param_name }} </span>

                                    <ElInput
                                        v-model="construction_inner_color[item.id]"
                                        class="mw-250"
                                        size="large"
                                        type="number"
                                        placeholder="Введите id"
                                    />
                                </div>
                            </template>

                            <div
                                :class="inner_panel.param_name.startsWith('В плёнке') ? 'd-flex' : ''"
                                class="d-none flex-column"
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
                                            v-if="
                                                ((door_type === 2 || door_type === 3) && item.double_door === true) ||
                                                (door_type === 1 && item.double_door === false)
                                            "
                                            :label="item.type_name"
                                            :value="item.id"
                                        />
                                    </template>
                                </ElSelect>
                            </div>
                        </div>

                        <!-- PROPERTIES: OUTSIDE PANEL -->

                        <div class="line"></div>

                        <div
                            :class="typeOfConstruction === 'tr' ? 'd-grid grid-3' : ''"
                            class="d-none w-100"
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
                                    @click="tr_type_panel = label"
                                >
                                    Панель снаружи 9.5мм<br />
                                    корабельная фанера
                                </ElRadio>

                                <ElRadio
                                    label="tr_outside_panel_10"
                                    size="large"
                                    class="mw-260"
                                    border
                                    @click="tr_type_panel = label"
                                >
                                    Панель снаружи 10мм мдф
                                </ElRadio>
                            </ElRadioGroup>

                            <template
                                v-for="item in selected_construction[`${tr_type_panel}`]"
                                :key="item.id"
                            >
                                <div
                                    v-if="item.id === 1"
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
                                    v-for="item in selected_construction[`${tr_type_panel}`]"
                                    :key="item.id"
                                >
                                    <div
                                        v-if="item.param_name === 'Фреза' || item.param_name === 'Цвет панели'"
                                        class="d-flex flex-column mt-10"
                                    >
                                        <span class="upper-case mb-15 fs-12"> {{ item.param_name }} </span>

                                        <ElInput
                                            v-model="tr_type_items[item.id]"
                                            class="mw-250"
                                            size="large"
                                            type="number"
                                            placeholder="Введите id"
                                        />
                                    </div>
                                </template>
                            </div>
                        </div>

                        <div class="outside_panel dropdowns d-grid grid-3 my-20">
                            <div
                                v-if="typeOfConstruction"
                                class="d-none flex-column"
                                :class="typeOfConstruction === 'stbr' ? 'd-flex' : ''"
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
                                        v-for="item in selected_construction[`${typeOfConstruction}_outside_panel`]"
                                        :key="item.id"
                                    >
                                        <ElOption
                                            v-if="item.param_name !== 'Фреза' && item.param_name !== 'Цвет панели'"
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
                                        v-for="item in selected_construction[`${tr_type_panel}`]"
                                        :key="item.id"
                                    >
                                        <ElOption
                                            v-if="item.param_name !== 'Фреза' && item.param_name !== 'Цвет панели'"
                                            :label="item.param_name"
                                            :value="item.id"
                                        />
                                    </template>
                                </ElSelect>
                            </div>

                            <template
                                v-for="item in selected_construction[`${typeOfConstruction}_outside_panel`]"
                                :key="item.id"
                            >
                                <div
                                    v-if="item.param_name === 'Фреза' || item.param_name === 'Цвет панели'"
                                    class="d-flex flex-column"
                                >
                                    <span class="upper-case mb-15 fs-12"> {{ item.param_name }} </span>

                                    <ElInput
                                        v-model="construction_color[item.id]"
                                        class="mw-250"
                                        size="large"
                                        type="number"
                                        placeholder="Введите id"
                                    />
                                </div>
                            </template>

                            <div
                                :class="outside_panel === 2 ? 'd-flex' : ''"
                                class="d-none flex-column"
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
                                            v-if="
                                                ((door_type === 2 || door_type === 3) && item.double_door === true) ||
                                                (door_type === 1 && item.double_door === false)
                                            "
                                            :label="item.type_name"
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
                                v-for="property in selected_construction[`${typeOfConstruction}_properties`]"
                                :key="property.id"
                            >
                                <div
                                    v-if="property.id === 1 || property.id === 2"
                                    class="d-flex flex-column mt-5"
                                >
                                    <span class="upper-case mb-5 fs-12 mt-10"> {{ property.param_name }} </span>

                                    <ElInput
                                        v-model="properties[property.id]"
                                        class="mw-250"
                                        size="large"
                                        type="number"
                                        placeholder="Введите id"
                                    />
                                </div>
                            </template>
                        </div>

                        <!-- PROPERTIES: CHECKBOXES -->
                        <div class="checkboxes mt-30">
                            <template
                                v-for="property in selected_construction[`${typeOfConstruction}_properties`]"
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
                                    v-model="properties[property.id]"
                                    :label="property.param_name"
                                    size="large"
                                    class="mw-250"
                                    border
                                />
                            </template>
                        </div>

                        <!-- PROPERTIES: LOCKS AND COVER -->
                        <div class="d-grid locks mt-20">
                            <div
                                v-if="properties['7']"
                                class="d-flex flex-column"
                            >
                                <span class="upper-case mb-15 fs-12"> ID ручки</span>

                                <ElInput
                                    v-model="properties['7']"
                                    class="mw-250"
                                    size="large"
                                    type="number"
                                    placeholder="Введите id"
                                />
                            </div>

                            <div class="d-flex flex-column">
                                <span class="upper-case mb-15 fs-12"> Накладки </span>

                                <template
                                    v-for="property in selected_construction[`${typeOfConstruction}_properties`]"
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
                                    v-for="property in selected_construction[`${typeOfConstruction}_properties`]"
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
                    </div>
                </div>

                <div class="w-100 d-flex align-items-center justify-content-center">
                    <button
                        class="upper-case count fs-16 ls-2 my-45 mw-270 fw-600"
                        @click="recieveTotalPrice"
                    >
                        рассчитать стоимость
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useCalculatorStore } from '../stores/calculator'
import { ElButton, ElRadioGroup, ElRadio, ElSlider, ElOption, ElSelect, ElInput, ElCheckbox, ElMessageBox } from 'element-plus'
import { ref } from 'vue'

const calculatorStore = useCalculatorStore()

const door_type = ref(calculatorStore.doorParams.door_type[0].id)
const changeDoorType = (event) => {
    door_type.value = event
}

const doorOpenType = ref('left')

const doorSizeWidth = ref(180)
const doorSizeHeight = ref(550)

const typeOfConstruction = ref('') //tr-stbr-st
const selected_construction = ref(0)
const construction_title = ref('')
const construction_image = ref('../assets/icons/door-1.0.svg')

const selectConstruction = (event) => {
    typeOfConstruction.value = event
    selected_construction.value = calculatorStore.doorParams[`${event}_config`]
    if (event === 'st') {
        construction_title.value = 'СТ'
    } else if (event === 'stbr') {
        construction_title.value = 'СТБР'
    } else {
        construction_title.value = 'ТР'
    }

    if (door_type.value === 1) {
        construction_image.value = '../assets/icons/door-1.svg'
    } else {
        construction_image.value = '../assets/icons/door-2.svg'
    }
}

const inner_panel = ref({ id: '', param_name: '' })
const outside_panel = ref()

const properties = ref({})

const film_type_inner = ref()
const film_type_outside = ref()

const construction_color = ref({})
const construction_inner_color = ref({})

const tr_type_panel = ref('')
const tr_type = ref({})
const tr_type_items = ref([])

const getFormData = () => {
    let data = {}
    if (typeOfConstruction.value === 'tr') {
        data = {
            door_type_id: {
                id: Number(door_type.value)
            }
        }

        data.tr_properties_ids = []

        for (const key in properties.value) {
            if (Object.hasOwnProperty.call(properties.value, key)) {
                const element = properties.value[key]
                if (typeof element === 'boolean') {
                    data.tr_properties_ids.push({ id: Number(key) })
                } else {
                    data.tr_properties_ids.push({ id: Number(key), id_properties: Number(element) })
                }
            }
        }

        data.tr_inner_panel_ids = []

        if (construction_inner_color.value !== undefined) {
            for (const key in construction_inner_color.value) {
                // console.log(construction_inner_color, 'construction_inner_color')
                const element = construction_inner_color.value[key]
                data.tr_inner_panel_ids.push({ id: Number(key), id_properties: Number(element) })
            }
        }

        if (film_type_inner.value !== 'undefined') {
            data.tr_inner_panel_ids.push({ id: Number(inner_panel.value.id), id_properties: Number(film_type_inner.value) })
        }

        if (tr_type_panel.value === 'tr_outside_panel_9_5') {
            data.tr_outside_panel_9_5_ids = []
            if (tr_type.value.checked) {
                data.tr_outside_panel_9_5_ids.push({ id: Number(tr_type.value.id) })
            }

            for (let index = 0; index < tr_type_items.value.length; index++) {
                const element = tr_type_items.value[index]
                if (element !== undefined) {
                    data.tr_outside_panel_9_5_ids.push({ id: Number(index), id_properties: Number(element) })
                }
            }
        }

        if (tr_type_panel.value === 'tr_outside_panel_10') {
            data.tr_outside_panel_10_ids = []
            if (tr_type.value.checked) {
                data.tr_outside_panel_10_ids.push({ id: Number(tr_type.value.id) })
            }

            for (let index = 0; index < tr_type_items.value.length; index++) {
                const element = tr_type_items.value[index]

                if (element !== undefined) {
                    data.tr_outside_panel_10_ids.push({ id: Number(index), id_properties: Number(element) })
                }
            }
        }

        data.price_default = { width: Number(doorSizeWidth.value), height: Number(doorSizeHeight.value) }
    }

    // STBR
    else if (typeOfConstruction.value === 'stbr') {
        data = {
            door_type_id: {
                id: Number(door_type.value)
            }
        }

        data.stbr_properties_ids = []

        for (const key in properties.value) {
            if (Object.hasOwnProperty.call(properties.value, key)) {
                const element = properties.value[key]
                if (typeof element === 'boolean') {
                    data.stbr_properties_ids.push({ id: Number(key) })
                } else {
                    data.stbr_properties_ids.push({ id: Number(key), id_properties: Number(element) })
                }
            }
        }

        data.stbr_inner_panel_ids = []
        data.stbr_outside_panel_ids = []

        // if (construction_color.value.length) {
        for (const key in construction_color.value) {
            const element = construction_color.value[key]
            data.stbr_outside_panel_ids.push({ id: Number(key), id_properties: Number(element) })
        }

        if (film_type_inner.value !== 'undefined') {
            data.stbr_outside_panel_ids.push({ id: Number(outside_panel.value), id_properties: Number(film_type_inner.value) })
        }

        if (film_type_outside.value !== 'undefined') {
            data.stbr_inner_panel_ids.push({ id: Number(inner_panel.value), id_properties: Number(film_type_outside.value) })
        }

        if (construction_inner_color.value !== undefined) {
            for (const key in construction_inner_color.value) {
                const element = construction_inner_color.value[key]
                data.stbr_inner_panel_ids.push({ id: Number(key), id_properties: Number(element) })
            }
        }

        data.price_default = { width: Number(doorSizeWidth.value), height: Number(doorSizeHeight.value) }
    }

    // ST
    else {
        data = {
            door_type_id: {
                id: Number(door_type.value)
            }
        }

        data.st_properties_ids = []

        for (const key in properties.value) {
            if (Object.hasOwnProperty.call(properties.value, key)) {
                const element = properties.value[key]
                if (typeof element === 'boolean') {
                    data.st_properties_ids.push({ id: Number(key) })
                } else {
                    data.st_properties_ids.push({ id: Number(key), id_properties: Number(element) })
                }
            }
        }

        data.st_inner_panel_ids = []

        if (film_type_inner.value !== 'undefined') {
            data.st_inner_panel_ids.push({ id: Number(inner_panel.value.id), id_properties: Number(film_type_inner.value) })
        }

        for (const key in construction_inner_color.value) {
            const element = construction_inner_color.value[key]
            data.st_inner_panel_ids.push({ id: Number(key), id_properties: Number(element) })
        }

        if (film_type_inner.value !== 'undefined') {
            data.film_type_id = { id: Number(film_type_inner.value) }
        }

        data.price_default = { width: Number(doorSizeWidth.value), height: Number(doorSizeHeight.value) }
    }
    // console.log(data, 'data')

    return data
}

const recieveTotalPrice = async () => {
    const totalPrice = await calculatorStore.recieveTotalPrice(typeOfConstruction.value, getFormData())
    if (!totalPrice) {
        return
    }

    ElMessageBox.alert(new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(totalPrice), 'Итоговая цена', {
        confirmButtonText: 'ОК'
    })
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
        border: 2px solid #fff;
    }

    :deep(span.el-checkbox__label) {
        color: #fff;
    }
}

:deep(.el-radio.is-bordered.el-radio--large) {
    white-space: pre-line;
    width: 100%;
}
// #tab-userManagement


.input-properties {
    grid-template-columns: repeat(3, 1fr);
}
</style>
