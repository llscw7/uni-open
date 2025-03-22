<template>
    <div class="page-container" :style="{ paddingTop: navbarHeight + 'px' }">

        <div class="nav-header"
            :style="{ paddingTop: navbarPaddingTop + 'px', paddingRight: navbarPaddingRight + 'px', height: navbarHeight + 'px' }">
            <div class="left-arrow-icon-wrap" @click="goToBack">
                <div class="left-arrow-icon-2"></div>
            </div>
            <div class="nav-box">
                {{ props.title }}
            </div>
        </div>

        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getCapsulePosition } from '@/utils/tool';

const props = defineProps({
    title: {
        type: String,
        default: '记账本'
    }
});

const navbarPaddingTop = ref(0);
const navbarPaddingRight = ref(0);
const navbarHeight = ref(0);

onMounted(() => {
    initHeader();
});

/**
 * 初始化头部导航栏
 */
const initHeader = () => {
    // #ifdef MP-WEIXIN
    const { capsuleCenter, capsuleBottom, capsuleTop, capsuleRight, capsuleWidth } = getCapsulePosition();
    navbarPaddingTop.value = capsuleTop - 2;
    navbarHeight.value = capsuleBottom + 15;
    navbarPaddingRight.value = capsuleWidth + 10;
    // #endif
    // #ifndef MP-WEIXIN
    navbarPaddingTop.value = 56;
    navbarHeight.value = 105;
    navbarPaddingRight.value = 111;
    // #endif
    console.log(navbarPaddingTop.value, navbarHeight.value, navbarPaddingRight.value);
}

const goToBack = () => {
    const pages = getCurrentPages(); // 获取当前页面栈  
    if (pages.length > 1) {
        uni.navigateBack(); // 存在上一页，返回上一页  
    } else {
        // 如果没有上一页可以返回，可以选择跳转到首页或其他页面  
        uni.redirectTo({
            url: '/pages/detail/index'
        });
    }
}
</script>

<style lang="less">
.page-container {
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    // 解决安卓APP中uni.pageScrollTo不生效
    height: auto!important;
    
    box-sizing: border-box;
    background-color: #F9FAFB;
}

.nav-header {
    background-color: var(--primary-color);
    padding: 0 20rpx;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    height: 200rpx;
    display: flex;
    align-items: flex-start;
    box-sizing: border-box;
}

.nav-box {
    display: flex;
    align-items: center;
    flex-grow: 1;
    height: 74rpx;
    color: #FFFFFF;
    font-weight: bold;
    font-size: 40rpx;
}

.left-arrow-icon-wrap {
    width: 60rpx;
    height: 70rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    .left-arrow-icon-2 {
        border-color: #FFFFFF;
    }
}
</style>