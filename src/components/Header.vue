<script setup>
import { ElButton, ElDatePicker } from "element-plus";
import { ref } from "vue";

const value1 = ref("");
</script>

<template>
    <div class="d-flex justify-content-around py-30">
        <div class="region">
            <div class="my-15 d-flex align-items-center">
                <img
                    src="../assets/icons/location.svg"
                    alt="map-point"
                    class="icon pr-15"
                />
                <span class="fs-14 ls-2 fw-500">Кировская обл.</span>
            </div>
            <el-button class="upper-case region__button" type="info">
                Изменить регион
            </el-button>
        </div>
        <div
            class="lk d-flex flex-column align-items-center justify-content-center"
        >
            <img src="../assets/icons/user.svg" alt="person" class="icon" />

            <span class="fw-600 mt-10">ВХОД</span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.icon {
    width: 20px;
    height: 20px;
}

.region,
.lk {
    display: flex;
    flex-direction: column;
}

.region {
    &__button {
        background-color: #fff;
        color: #000;
        border-radius: 30px;
    }
}

@media (min-width: 1024px) {
}
</style>
