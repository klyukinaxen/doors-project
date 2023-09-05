<script setup>
import Header from './components/Header.vue'

import Calculator from './components/Calculator.vue'
</script>

<template>
    <div class="d-flex flex-column mx-15">
        <Header />

        <Suspense>
            <Calculator />
        </Suspense>
    </div>
</template>
