<template>
    <view class="toast" v-if="isVisible">
        <p>{{ message }}</p>
    </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isVisible = ref(false);
const message = ref('');

const showToast = (msg: string, duration: number = 2000) => {
    message.value = msg;
    isVisible.value = true;
    setTimeout(() => {
        isVisible.value = false;
    }, duration);
};

defineExpose({ showToast });
</script>

<style scoped>
.toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    z-index: 9999;
}
</style>