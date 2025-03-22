<template>
    <div class="dialog-notes" :style="{ zIndex: visible ? 999 : -1 }">
        <view class="dialog-overlay" :style="{ opacity: visible ? 1 : 0 }" @click="setVisible(false)"
            @touchmove.stop.prevent>
        </view>
        <view class="dialog-box" :style="{ bottom: visible ? keyboardHeight + 'px' : 0}"
            @click.stop>
            <div class="dialog-header">编辑备注</div>
            <view class="dialog-body" v-if="visible">
                <textarea v-model="inputValue" type="text" placeholder="请输入" class="notes-input" :focus="visible" auto-focus auto-height :adjust-position="false" :show-confirm-bar="false" confirm-type="done" :confirm-hold="true" @confirm="handleConfirm" />
            </view>
            <view class="dialog-footer">
                <div class="eraser-icon-wrap" @click="handleClear">
                    <div class="eraser-icon icon-size-50"></div>
                </div>
                <div class="check-icon-wrap" @click="handleConfirm">
                    <div class="check-icon icon-size-50"></div>
                </div>
            </view>
        </view>
    </div>

</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

// 定义 props
const props = defineProps({
    visible: {
        type: Boolean,
        required: true,
    },
    setVisible: {
        type: Function,
        required: true,
    },
    defaultValue: {
        type: String,
        default: '',
    },
});


// 定义 emits
const emit = defineEmits(['confirm', 'clear', 'close']);

// 输入框的值
const inputValue = ref('');
// 键盘高度
const keyboardHeight = ref(0);
// let windowHeight = 300

watch(() => props.visible, (val) => {
    if (val) {
        inputValue.value = props.defaultValue;
    }
});

// 清空输入框
const handleClear = () => {
    inputValue.value = '';
    emit('clear');
};

// 确认提交
const handleConfirm = () => {
    emit('confirm', inputValue.value);
};


// 监听键盘高度变化
onMounted(() => {
    // #ifdef MP-WEIXIN || APP-PLUS
    uni.onKeyboardHeightChange((res) => {
        if (res.height) {
            keyboardHeight.value = res.height + 20;
        }
    });
    // #endif

    // #ifndef MP-WEIXIN || APP-PLUS
    if (keyboardHeight.value === 0) {
        uni.getSystemInfo({
            success: function (res) {
                keyboardHeight.value = res.windowHeight * 0.5
            }
        });
    }
    // #endif
});

</script>

<style lang="less" scoped>
.dialog-notes {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
}

.notes-input {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 10rpx;
    background-color: #F5F7FA;
    white-space: pre-wrap; /* 保留空白符和换行符 */
    word-wrap: break-word; 
}

.dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity 0.3s;
}

.dialog-box {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 90vw;
    z-index: 10;
    padding: 20rpx;
    background: white;
    border-radius: 8px;
    box-sizing: border-box;
    transition: bottom 0.3s;
}

.dialog-header {
    font-size: 36rpx;
    font-weight: bold;
    margin-bottom: 20rpx;
}

.dialog-body {
    margin-bottom: 10rpx;
}

.dialog-footer {
    display: flex;
    justify-content: space-between;
}

.eraser-icon-wrap, .check-icon-wrap {
    width: 60rpx;
    height: 60rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}

.dialog-button {
    margin: 0 20rpx;
    margin-top: 50rpx;
    padding: 20rpx;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.dialog-button:first-child {
    background-color: #f0f0f0;
}

.dialog-button:last-child {
    background-color: #007bff;
    color: white;
}
</style>