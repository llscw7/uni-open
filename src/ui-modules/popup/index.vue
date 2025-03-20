<template>
    <!-- 弹窗组件 -->
    <div class="popup-main">
        <div class="popup-mask" :style="popupMaskStyle" @click.stop="closePopup">
        </div>
        <div class="popup-content" :style="popupContentStyle" @click.stop @transitionend="onAnimationEnd">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

const props = defineProps({
    zIndex: {
        type: Number,
        default: 999
    },
    visible: {
        type: Boolean,
        required: true
    },
    setVisible: {
        type: Function,
        required: true
    }
});

/** 用来控制蒙层的透明的动画效果，确保关闭蒙层时动画正常展示 */
const maskVisible = ref(false);
// 监听transition动画，执行完毕回调函数
const onAnimationEnd = () => {
    if(!props.visible) {
        maskVisible.value = false;
    }
};
watch(() => props.visible, (val) => {
    if(val) {
        maskVisible.value = true;
    }
});
/** 用来控制蒙层的透明的动画效果，确保关闭蒙层时动画正常展示 */

const popupMaskStyle = computed(() => {
    return {
        zIndex: maskVisible.value ? props.zIndex : -1,
        opacity: props.visible ? 1 : 0
    }
});

const popupContentStyle = computed(() => {
    return {
        zIndex: props.zIndex + 100,
        transform: props.visible ? 'translateY(0)' : 'translateY(100%)',
    }
});

// 关闭弹窗
const closePopup = () => {
    props.setVisible(false);
};

// 阻止滚动穿透
const moveHandle = () => { }
</script>

<style scoped>
/* 遮罩层样式 */
.popup-mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity 0.2s ease;
}

/* 弹窗内容样式 */
.popup-content {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    transform: translateY(100%);
    background-color: #fff;
    border-radius: 16px 16px 0 0px;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
    max-height: 80vh;
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