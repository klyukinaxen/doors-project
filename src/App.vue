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
} from "element-plus";
import { ref } from "vue";

const radio1 = ref("1");
const value1 = ref("200");
const value2 = ref("100");

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
    <div class="main">
        <Header />

        <span class="upper-case fw-600 fs-25 ls-3 my-30 text-center"
            >конфигуратор дверей</span
        >
        <div class="d-flex flex-column">
            <span class="upper-case fs-16 ls-2 mb-40">Выберите тип двери</span>

            <div class="d-flex justify-content-around w-100 primary-bg py-30">
                <div class="door-type">
                    <img src="./assets/icons/door-1.svg" alt="" />
                    <el-button class="button">однопольная</el-button>
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
                укажите размер и способ открывания:</span
            >

            <div class="d-flex justify-content-around w-100 primary-bg py-30">
                <!-- range -->
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
                    ></el-slider>

                    <div class="door-1-range">
                        <el-slider
                            :min="0"
                            :max="1080"
                            v-model="value1"
                            show-input
                            size="small"
                        ></el-slider>
                        <img src="./assets/icons/door-1.0.svg" alt="" />
                    </div>
                </div>

                <!-- checkbox -->
                <div class="d-flex flex-column">
                    <span class="fs-18 fw-600 ls-2 upper-case"
                        >открывание двери</span
                    >
                    <el-radio-group
                        v-model="radio1"
                        class="d-flex flex-column radio-group"
                    >
                        <el-radio label="1" size="large" class="my-30" border
                            >Правое</el-radio
                        >
                        <el-radio label="2" size="large" border>Левое</el-radio>
                    </el-radio-group>
                    <!-- left or right -->
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
                    ></el-slider>

                    <div class="door-2-range">
                        <el-slider
                            :min="0"
                            :max="1600"
                            v-model="value1"
                            show-input
                            size="small"
                            class="mb-10 ml-15"
                        ></el-slider>

                        <img
                            class="door-2"
                            src="./assets/icons/door-2.0.svg"
                            alt=""
                        />
                    </div>
                </div>
            </div>

            <span class="upper-case fs-16 ls-2 my-45">
                выберите тип петлей:</span
            >

            <div
                class="container-3 d-flex justify-content-around w-100 primary-bg py-30"
            >
                <div class="door-type">
                    <img src="./assets/icons/door-standart.svg" alt="" />

                    <el-button class="button">Стандарт</el-button>

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
                class="container-4 d-flex justify-content-around w-100 primary-bg py-30"
            >
                <img src="./assets/icons/door-1.0.svg" alt="" />

                <div>
                    <div class="dropdowns d-grid grid-3">
                        <el-col class="d-flex flex-column" :span="8">
                            <span class="demonstration upper-case mb-15"
                                >внутренняя панель</span
                            >
                            <el-dropdown
                                trigger="click"
                                @command="handleDropdown"
                            >
                                <span class="el-dropdown-link dropdown-click">
                                    {{ dropdown }}
                                    <img
                                        src="./assets/icons/arrow.svg"
                                        alt=""
                                    />
                                </span>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item command="Крашенная">
                                            Крашенная
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </el-col>
                        <!-- dropdown -->
                        <el-col class="d-flex flex-column" :span="8">
                            <span class="demonstration upper-case mb-15"
                                >толщина панели</span
                            >
                            <el-dropdown
                                trigger="click"
                                @command="handleDropdownPanel"
                            >
                                <span class="el-dropdown-link dropdown-click">
                                    {{ dropdownPanel }}
                                    <img
                                        src="./assets/icons/arrow.svg"
                                        alt=""
                                    />
                                </span>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item command="6 мм">
                                            6 мм
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </el-col>
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

            <span>предварительная стоимость:</span>
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

.el-checkbox__inner {
    width: 50px;
    height: 50px;
}

.el-slider__bar {
    width: 150px;
}

.main {
    display: flex;
    flex-direction: column;
    margin: 0;
}

header {
    line-height: 1.5;
    /* display: flex; */
    /* flex-direction: row; */
    /* margin: auto; */
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}
.slider-demo-block .el-slider {
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
    // margin-bottom: 30px;
}
.container-2 {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
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
