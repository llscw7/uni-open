<template>
    <div v-if="isVisible" class="dialog-overlay" :style="{zIndex: zIndex}" @click="onOverlayClick" catchtouchmove>
      <div class="dialog" @click.stop>
        <div class="dialog-header" v-if="title">
          <slot name="header">{{ title }}</slot>
        </div>
        <div class="dialog-body" :class="{'has-title': title}" v-if="message && !useSlot">
            {{ message }}
        </div>
        <div class="dialog-body" v-if="useSlot">
          <slot></slot>
        </div>
        <div class="dialog-footer">
          <div class="dialog-button cancel" @click="onCancel" v-if="showCancelButton">{{ cancelButtonText }}</div>
          <div class="dialog-button confirm" @click="onConfirm" v-if="showConfirmButton">{{ confirmButtonText }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, watch } from 'vue';
  
  // 定义 props
  const props = defineProps({
    title: {
      type: String,
      default: '',
    },
    message: {
        type: String,
        default: '',
    },
    useSlot: {
        type: Boolean,
        default: false,
    },
    closeOnClickOverlay: {
        type: Boolean,
        default: false,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    confirmButtonText: {
      type: String,
      default: '确认',
    },
    cancelButtonText: {
      type: String,
      default: '取消',
    },
    showConfirmButton: {
        type: Boolean,
        default: true,
    },
    showCancelButton: {
        type: Boolean,
        default: true,
    },
    zIndex: {
        type: Number,
        default: 1000,
    },
  });
  
  // 定义 emits
  const emit = defineEmits(['update:visible', 'confirm', 'cancel']);
  
  // 控制弹窗显示状态
  const isVisible = ref(props.visible);
  
  // 监听 visible 的变化
  watch(
    () => props.visible,
    (newVal) => {
      isVisible.value = newVal;
    }
  );
  
  // 确认按钮事件
  const onConfirm = () => {
    emit('confirm');
    closeDialog();
  };
  
  // 取消按钮事件
  const onCancel = () => {
    emit('cancel');
    closeDialog();
  };

  const onOverlayClick = () => {
    if (props.closeOnClickOverlay) {
        closeDialog();
    }
  };
  
  // 关闭弹窗
  const closeDialog = () => {
    isVisible.value = false;
    emit('update:visible', false);
  };
  </script>

  <style scoped>


  .dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .dialog {
    background-color: #fff;
    border-radius: 16px;
    width: 80%;
    max-width: 320px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: 0.3s;
    font-size: 16px;
  }
  
  .dialog-header {
    padding-top: 26px;
    font-weight: 500;
    line-height: 24px;
    text-align: center;
  }
  
  .dialog-body {
    color: #323233;
    flex: 1;
    max-height: 60vh;
    padding: 26px 24px;
    overflow-y: auto;
    font-size: 14px;
    line-height: 20px;
    white-space: pre-wrap;
    text-align: center;
    word-wrap: break-word;
  }

  .has-title {
    padding-top: 8px;
    color: #646566;
  }
  
  .dialog-footer {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #ebedf0;
    user-select: none;
    overflow: hidden;
  }
  
  .dialog-button {
    width: 160px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    font-size: 14px;
    border: none;
    border-radius: 0;
    background-color: transparent;
    cursor: pointer;
  }
  
  .dialog-button.cancel {
    color: #666;
    border-right: 1px solid #ebedf0;
  }
  
  .dialog-button.cancel:hover {
    background-color: #f5f5f5;
  }
  
  .dialog-button.confirm {
    color: #07c160;
  }
  
  .dialog-button.confirm:hover {
    background-color: #f0fff4;
  }
  </style>