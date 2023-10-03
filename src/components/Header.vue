<template>
    <div class="d-flex justify-content-around py-30">
        <div class="region">
        </div>
        <!-- <div class="lk d-flex flex-column align-items-center justify-content-center">
            <img
                src="../assets/icons/user.svg"
                alt="person"
                class="icon"
            />

            <span class="fw-600 mt-10">ВХОД</span>
        </div> -->

        <ElButton
            v-if="authStore.accessTokenDecode"
            type="danger"
            @click="authStore.signOut"
        >
            Выйти
        </ElButton>
    </div>
</template>

<script setup>
import { ElButton } from 'element-plus'

import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
</script>

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
</style>
