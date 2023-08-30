<script setup>
import Header from "./components/Header.vue";
import {
    ElButton,
    ElRadioGroup,
    ElRadio,
    ElSlider,
    ElDropdown,
    ElDropdownItem,
    ElDropdownMenu,
    ElCol,
    ElOption,
    ElSelect,
} from "element-plus";
import { ref } from "vue";
import data from "./stores/data.json";

const radio1 = ref("1");

console.log("data panel", data[0]);
const insidePanel = ref(`${data[0].insidePanel[0].title}`);
const insidePanelParam = ref(`${data[0].insidePanel[0].param[0].name}`);
const value1 = ref(200);
const value2 = ref(100);

let dropdown = "";
let dropdownPanel = "";

const handleDropdown = (command) => {
    dropdown = command;
};

const handleDropdownPanel = (command) => {
    dropdownPanel = command;
};
</script>

<template>
    <div class="main mx-15">
        <Header />

        <span class="upper-case fw-600 fs-25 ls-3 my-30 text-center">
            конфигуратор дверей
        </span>

        <div class="d-flex flex-column">
            <span class="upper-case fs-16 ls-2 mb-40 ml-20">
                Выберите тип двери
            </span>

            <div class="d-flex justify-content-around w-100 primary-bg py-30">
                <div class="door-type">
                    <img src="./assets/icons/door-1.svg" alt="" />

                    <el-button class="button"> однопольная </el-button>
                </div>

                <div class="door-type">
                    <img src="./assets/icons/door-2.svg" alt="" />

                    <el-button class="button">двупольная</el-button>
                </div>

                <div class="door-type">
                    <img src="./assets/icons/door-2.1.svg" alt="" />

                    <el-button class="button">двупольная с импостом</el-button>
                </div>
            </div>

            <span class="upper-case fs-16 ls-2 my-45">
                укажите размер и способ открывания:
            </span>

            <div class="d-flex justify-content-around w-100 primary-bg py-30">
                <div class="d-none">
                    <el-slider
                        class="row-reverse"
                        vertical
                        :min="0"
                        :max="2550"
                        height="230px"
                        show-input
                        v-model="value2"
                        size="small"
                    />

                    <div class="door-1-range">
                        <el-slider
                            :min="0"
                            :max="1080"
                            v-model="value1"
                            show-input
                            size="small"
                        />

                        <img src="./assets/icons/door-1.0.svg" alt="" />
                    </div>
                </div>

                <!-- checkbox -->
                <div class="d-flex flex-column">
                    <span class="fs-18 fw-600 ls-2 upper-case">
                        открывание двери
                    </span>

                    <el-radio-group
                        v-model="radio1"
                        class="d-flex flex-column radio-group"
                    >
                        <el-radio label="1" size="large" class="my-30" border>
                            Правое
                        </el-radio>

                        <el-radio label="2" size="large" border>
                            Левое
                        </el-radio>
                    </el-radio-group>
                </div>

                <!-- or -->
                <div class="d-flex">
                    <el-slider
                        class="row-reverse range-2"
                        vertical
                        :min="0"
                        :max="2550"
                        height="280px"
                        show-input
                        v-model="value2"
                        size="small"
                    />

                    <div class="door-2-range">
                        <el-slider
                            :min="0"
                            :max="1600"
                            v-model="value1"
                            show-input
                            size="small"
                            class="mb-10 ml-15"
                        />

                        <img
                            class="door-2"
                            src="./assets/icons/door-2.0.svg"
                            alt=""
                        />
                    </div>
                </div>
            </div>

            <span class="upper-case fs-16 ls-2 my-45">
                выберите тип петлей:
            </span>

            <div
                class="container-3 d-flex justify-content-around w-100 primary-bg py-30"
            >
                <div class="door-type">
                    <img src="./assets/icons/door-standart.svg" alt="" />

                    <el-button class="button"> Стандарт </el-button>

                    <span class="fs-14 ls-2 mw-250 fw-300">
                        Стандартная конструкция на двух «шарикоподшипниковых»
                        петлях, без возможности установить МДФ панель снаружи.
                        <br />
                        <br />
                        - Толщина листа 2мм
                        <br />
                        - 2 контура уплотнения
                    </span>
                </div>

                <div class="door-type">
                    <img src="./assets/icons/door-bark.svg" alt="" />

                    <el-button class="button">Петли барк</el-button>

                    <span class="fs-14 ls-2 mw-250 fw-300">
                        Усовершенствованная конструкция на двух петлях «Барк» с
                        возможностью выбора расширенных характеристик.
                        <br />
                        <br />
                        - толщина листа 2мм <br />
                        - 2 контура уплотнения<br />
                        - есть возможность установить панель снаружи
                    </span>
                </div>

                <div class="door-type">
                    <img src="./assets/icons/door-thermo.svg" alt="" />

                    <el-button class="button">Терморазрыв</el-button>

                    <span class="fs-14 ls-2 mw-250 fw-300">
                        Конструкция, которая предназначена для проёмов, которые
                        граничат с улицей.
                    </span>
                </div>
            </div>

            <span class="upper-case fs-16 ls-2 my-45">
                выберите дополнительные параметры:
            </span>

            <div
                class="container-4 d-flex justify-content-center w-100 primary-bg py-30"
            >
                <img
                    src="./assets/icons/door-1.0.svg"
                    alt=""
                    class="p-50 pr-80"
                />

                <div>
                    <div class="dropdowns d-grid grid-3">
                        <div class="d-flex flex-column">
                            <span class="upper-case mb-15 fs-12">
                                внутренняя панель
                            </span>

                            <el-select
                                v-model="insidePanel"
                                class="m-2"
                                placeholder="Select"
                                size="large"
                            >
                                <el-option
                                    v-for="item in data[0].insidePanel"
                                    :key="item.title"
                                    :label="item.title"
                                    :value="item.title"
                                />
                            </el-select>
                        </div>

                        <!-- dropdown insidePanelParam -->
                        <el-select
                            v-model="insidePanelParam"
                            class="m-2"
                            placeholder="Select"
                            size="large"
                        >
                            <el-option
                                v-for="item in data[0].insidePanel[0].params"
                                :key="item.title"
                                :label="item.title"
                                :value="item.title"
                            />
                        </el-select>

                        <div></div>
                        <!-- dropdown -->
                    </div>

                    <div class="dropdowns">
                        <span>цвет конструкции</span>
                        <!-- dropdown -->
                        <span>цвет панели</span>
                        <!-- dropdown -->
                    </div>

                    <div class="checkboxes">
                        <!-- Багеты снаружи -->
                        <!-- ночной страж и тд -->
                    </div>
                </div>
            </div>

            <span class="upper-case fs-16 ls-2 my-45">
                предварительная стоимость:
            </span>
        </div>
    </div>
</template>

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
}

.main {
    display: flex;
    flex-direction: column;
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
    width: 330px;
}

.door-2-range {
    padding-left: 15px;
    width: 460px;
}

.door-2 {
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

.button {
    min-width: 120px;
    max-width: 215px;
    margin: 20px 0;
    border-radius: 0;
    text-transform: uppercase;
    font-weight: 600;
    color: black;

    &:hover {
        background-color: var(--secondary);
        color: #fff;
        border: none;
        box-shadow: 0px 0px 40px 0px rgba(255, 255, 255, 0.25),
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

@media (min-width: 1024px) {
    /* header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
        margin: 0 2rem 0 0;
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    } */
}
</style>
