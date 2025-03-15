<template>
    <!-- 弹窗组件 -->
    <div class="popup-mask" :style="{opacity: isVisible ? 1 : 0, zIndex: isVisible ? props.zIndex : -1}" @click="closePopup" @touchmove.stop.prevent="moveHandle">
        <div class="popup-content" :style="{transform: isVisible ? 'translateY(0)' : 'translateY(100%)'}"  @click.stop>
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineExpose, defineProps } from 'vue';

const props = defineProps({
    zIndex: {
        type: Number,
        default: 999
    }
});

// 控制弹窗显示与隐藏的状态
const isVisible = ref(false);

// 显示弹窗
const showPopup = () => {
    isVisible.value = true;
};

// 关闭弹窗
const closePopup = () => {
    isVisible.value = false;
};

// 确认按钮点击事件
const handleConfirm = () => {
    console.log('确认');
    closePopup();
};

// 取消按钮点击事件
const handleCancel = () => {
    console.log('取消');
    closePopup();
};

// 阻止滚动穿透
const moveHandle = () => { }

const open = () => {
    isVisible.value = true;
}

const close = () => {
    closePopup()
}

defineExpose({ open, close });

</script>

<style scoped>
/* 遮罩层样式 */
.popup-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    /* display: flex;
    justify-content: center;
    align-items: flex-end; */
    z-index: 999;
    opacity: 0;
    transition: all 0.2s ease;
}

/* 弹窗内容样式 */
.popup-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    transform: translateY(-100%);
    background-color: #fff;
    border-radius: 16px 16px 0 0px;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    padding: 16px;
    transition: all 0.2s ease;
}

/* 弹窗头部样式 */
.popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
}

/* 关闭按钮样式 */
.close-btn {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
}

/* 弹窗主体样式 */
.popup-body {
    padding: 16px 0;
}

/* 弹窗底部样式 */
.popup-footer {
    display: flex;
    justify-content: flex-end;
    border-top: 1px solid #eee;
    padding-top: 8px;
}

/* 底部按钮样式 */
.popup-footer button {
    margin-left: 8px;
}
</style>