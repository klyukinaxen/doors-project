<template>
    <div
        v-if="calculatorStore.doorParams"
        class="d-flex flex-column justify-content-center"
    >
        <div class="d-flex flex-column">
            <span class="upper-case fs-16 ls-2 mb-40 ml-20"> Выберите тип двери </span>

            <div class="d-flex justify-content-around w-100 primary-bg py-30">
                <!-- TODO: v-for for door types-->
                <div class="door-type">
                    <img
                        src="../assets/icons/door-1.svg"
                        alt=""
                    />

                    <ElButton
                        class="button-door"
                        :class="{ active: doorType === calculatorStore.doorParams.door_type[0].id }"
                        @click="changeDoorType(calculatorStore.doorParams.door_type[0].id)"
                    >
                        {{ calculatorStore.doorParams.door_type[0].type_name }}
                    </ElButton>
                </div>

                <div class="door-type">
                    <img
                        src="../assets/icons/door-2.svg"
                        alt=""
                    />

                    <ElButton
                        class="button-door"
                        :class="{ active: doorType === calculatorStore.doorParams.door_type[1].id }"
                        @click="changeDoorType(calculatorStore.doorParams.door_type[1].id)"
                    >
                        {{ calculatorStore.doorParams.door_type[1].type_name }}
                    </ElButton>
                </div>

                <div class="door-type">
                    <img
                        src="../assets/icons/door-2.1.svg"
                        alt=""
                    />

                    <ElButton
                        class="button-door"
                        :class="{ active: doorType === calculatorStore.doorParams.door_type[2].id }"
                        @click="doorType = calculatorStore.doorParams.door_type[2].id"
                    >
                        {{ calculatorStore.doorParams.door_type[2].type_name }}
                    </ElButton>
                </div>
            </div>

            <span class="upper-case fs-16 ls-2 my-45"> укажите размер и способ открывания: </span>

            <div class="d-flex justify-content-around w-100 primary-bg py-30">
                <div :class="doorType === 2 || doorType === 3 ? 'd-none' : 'd-flex'">
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

                <div :class="doorType === 1 ? 'd-none' : 'd-flex'">
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

            <div class="container-4 d-flex justify-content-center w-100 primary-bg py-30">
                <div class="d-flex flex-column align-items-center justify-content-center">
                    <span class="upper-case fs-16 ls-2 fw-600">{{ construction_title }}</span>
                    <img
                        :src="construction_image"
                        alt=""
                        class="p-50 pr-80 pt-20"
                    />
                </div>
                <div>
                    <div class="dropdowns d-grid grid-3">
                        <div class="d-flex flex-column">
                            <span class="upper-case mb-15 fs-12"> внутренняя панель </span>

                            <ElSelect
                                v-model="insidePanel"
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
                                        :label="item.param_name"
                                        :value="item.param_name"
                                    />
                                </template>
                            </ElSelect>
                        </div>

                        <div
                            :class="insidePanel.startsWith('В плёнке') ? 'd-flex' : ''"
                            class="d-none flex-column"
                        >
                            <span class="upper-case mb-15 fs-12"> тип пленки внутренней панели </span>

                            <ElSelect
                                v-model="film_type"
                                class="m-2 mw-250"
                                placeholder="Выберите"
                                size="large"
                            >
                                <ElOption
                                    v-for="item in calculatorStore.doorParams.film_type"
                                    :key="item.id"
                                    :label="item.type_name"
                                    :value="item.id"
                                />
                            </ElSelect>
                        </div>

                        <div
                            :class="typeOfConstruction === 'tr' ? 'd-flex' : ''"
                            class="d-none checkboxes w-100"
                        >
                            <ElRadioGroup
                                v-model="tr_type_panel"
                                class="d-flex flex-column radio-group"
                            >
                                <ElRadio
                                    label="tr_outside_panel_9_5"
                                    size="large"
                                    class="my-30 mw-300"
                                    border
                                    @click="tr_type_panel = label"
                                >
                                    Панель снаружи 9.5мм<br />
                                    корабельная фанера
                                </ElRadio>

                                <ElRadio
                                    label="tr_outside_panel_10"
                                    size="large"
                                    class="mw-300"
                                    border
                                    @click="tr_type_panel = label"
                                >
                                    Панель снаружи 10мм мдф
                                </ElRadio>
                            </ElRadioGroup>
                        </div>

                        <div
                            v-if="typeOfConstruction"
                            class="d-none flex-column"
                            :class="typeOfConstruction === 'stbr' || typeOfConstruction === 'tr' ? 'stbr_active' : ''"
                        >
                            <span class="upper-case mb-15 fs-12"> внешняя панель </span>

                            <ElSelect
                                v-if="typeOfConstruction !== 'tr'"
                                v-model="outsidePanel"
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
                                        :value="item.param_name"
                                    />
                                </template>
                            </ElSelect>
                            <ElSelect
                                v-else
                                v-model="outsidePanel"
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
                                        :value="item.param_name"
                                    />
                                </template>
                            </ElSelect>
                        </div>
                        <div></div>
                        <div
                            :class="outsidePanel.startsWith('В плёнке') ? 'd-flex' : ''"
                            class="d-none flex-column"
                        >
                            <span class="upper-case mb-15 fs-12"> тип пленки внешней панели </span>

                            <ElSelect
                                v-model="film_type"
                                class="m-2 mw-250"
                                placeholder="Выберите"
                                size="large"
                            >
                                <ElOption
                                    v-for="item in calculatorStore.doorParams.film_type"
                                    :key="item.id"
                                    :label="item.type_name"
                                    :value="item.id"
                                />
                            </ElSelect>
                        </div>
                    </div>

                    <div class="dropdowns d-grid grid-3 mt-30">
                        <div class="d-flex flex-column">
                            <span class="upper-case mb-15 fs-12"> фреза </span>

                            <ElInput
                                v-model="freza"
                                class="w-50 mw-250"
                                size="large"
                                placeholder="Введите id"
                            />
                        </div>

                        <div class="d-flex flex-column">
                            <span class="upper-case mb-15 fs-12"> цвет конструкции </span>

                            <ElInput
                                v-model="construction_color"
                                class="w-50 mw-250"
                                size="large"
                                placeholder="Введите id"
                            />
                        </div>

                        <div class="d-flex flex-column">
                            <span class="upper-case mb-15 fs-12"> цвет панели </span>

                            <ElInput
                                v-model="panel_color"
                                class="w-50 mw-250"
                                size="large"
                                placeholder="Введите id"
                            />
                        </div>
                    </div>

                    <div class="checkboxes mt-30">
                        <template
                            v-for="property in selected_construction[`${typeOfConstruction}_properties`]"
                            :key="property.id"
                        >
                            <ElCheckbox
                                v-if="
                                    property.param_name !== 'Цвет конструкции' &&
                                    property.param_name !== 'Внутрення панель' &&
                                    property.param_name !== 'Панель снаружи 9.5мм корабельная фанера' &&
                                    property.param_name !== 'Панель снаружи 10мм мдф'
                                "
                                :label="property.param_name"
                                size="large"
                                class="mw-250"
                                border
                            />
                        </template>
                    </div>
                </div>
            </div>
            <span class="upper-case fs-16 ls-2 my-45"> предварительная стоимость: </span>
        </div>
    </div>
</template>

<script setup>
import { useCalculatorStore } from '../stores/calculator'
import { ElButton, ElRadioGroup, ElRadio, ElSlider, ElOption, ElSelect, ElInput, ElCheckbox } from 'element-plus'
import { ref } from 'vue'

const calculatorStore = useCalculatorStore()

const doorType = ref(calculatorStore.doorParams.door_type[0].id)
const changeDoorType = (event) => {
    doorType.value = event
}

const doorOpenType = ref('left')

const doorSizeWidth = ref(180)
const doorSizeHeight = ref(550)

const typeOfConstruction = ref('')
const selected_construction = ref(0)
const construction_title = ref('')
const construction_image = ref('../assets/icons/door-1.0.svg')

const selectConstruction = (event) => {
    typeOfConstruction.value = event
    selected_construction.value = calculatorStore.doorParams[`${event}_config`]
    if (event === 'st') {
        construction_title.value = 'СТ'
        construction_image.value = '../assets/icons/door-1.svg'
    } else if (event === 'stbr') {
        construction_title.value = 'СТБР'
        construction_image.value = '../assets/icons/door-2.svg'
    } else {
        construction_title.value = 'ТР'
        construction_image.value = '../assets/icons/door-2.svg'
    }
}

const insidePanel = ref('')
const outsidePanel = ref('')

const film_type = ref('')

const freza = ref('')
const construction_color = ref('')
const panel_color = ref('')

const tr_type_panel = ref('')
</script>

<style scoped lang="scss">
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
    grid-template-columns: 1fr 1fr 1fr 1fr;
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

.st_active {
    display: flex;
}

.stbr_active {
    display: flex;
}

.tr_active {
    display: flex;
}

@media (min-width: 1024px) {
}
</style>
