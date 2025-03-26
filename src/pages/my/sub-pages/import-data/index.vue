
<template>
    <view class="container">
      <view class="nav-bar">
        <button class="back-btn" @click="goBack">
          <uni-icons type="back" size="16" color="#3b82f6"/>
          <text class="back-text">设置</text>
        </button>
        <text class="nav-title">导入数据</text>
        <button class="parse-btn">解析</button>
      </view>
  
      <view class="content">
        <text class="section-title">记录与模板</text>
        
        <view class="grid-container">
          <view class="grid-item" @click="importRecord">
            <uni-icons type="download" size="24" color="#f5af19"/>
            <text class="grid-text">导入记录</text>
          </view>
          <view class="grid-item" @click="downloadTemplate">
            <uni-icons type="download-filled" size="24" color="#3b82f6"/>
            <text class="grid-text">下载模板文件</text>
          </view>
        </view>
  
        <text class="section-title">请按步骤顺序操作</text>
        <text class="section-subtitle">选择数据文件 (xlsx/xls/csv)</text>
  
        <view class="card" @click="selectFile">
          <text class="card-text">文件路径</text>
          <uni-icons type="right" size="16" color="#999"/>
        </view>
  
        <text class="section-title">选择导入来源</text>
        <view class="card" @click="selectSource">
          <text class="card-text">导入来源</text>
          <uni-icons type="right" size="16" color="#999"/>
        </view>
  
        <text class="section-title">选择账户或账本</text>
        <view class="card" @click="selectAccount">
          <text class="card-text">关联账本</text>
          <view class="card-right">
            <text class="default-text">默认账本</text>
            <uni-icons type="right" size="16" color="#999"/>
          </view>
        </view>
  
        <text class="section-title">其他选项</text>
        <view class="card">
          <text class="card-text">根据尾号识别账户</text>
          <switch :checked="isIdentifyByNumber" @change="onSwitchChange" color="#34C759"/>
        </view>
      </view>
    </view>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  
  const isIdentifyByNumber = ref(true);
  
  const goBack = () => {
    uni.navigateBack();
  };
  
  const importRecord = () => {
    uni.showToast({
      title: '导入记录',
      icon: 'none'
    });
  };
  
  const downloadTemplate = () => {
    uni.showToast({
      title: '下载模板',
      icon: 'none'
    });
  };
  
  const selectFile = () => {
    uni.showToast({
      title: '选择文件',
      icon: 'none'
    });
  };
  
  const selectSource = () => {
    uni.showToast({
      title: '选择来源',
      icon: 'none'
    });
  };
  
  const selectAccount = () => {
    uni.showToast({
      title: '选择账本',
      icon: 'none'
    });
  };
  
  const onSwitchChange = (e: any) => {
    isIdentifyByNumber.value = e.detail.value;
  };
  </script>
  
  <style>
  page {
    height: 100%;
    background-color: #f5f5f5;
  }
  
  .container {
    min-height: 100%;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }
  
  .nav-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #ffffff;
    height: 88rpx;
    padding: 0 32rpx;
    border-bottom: 2rpx solid #f0f0f0;
  }
  
  .back-btn {
    display: flex;
    align-items: center;
    background: none;
    border: none;
    padding: 0;
    color: #3b82f6;
  }
  
  .back-text {
    font-size: 14px;
    margin-left: 8rpx;
  }
  
  .nav-title {
    font-size: 16px;
    font-weight: 500;
  }
  
  .parse-btn {
    color: #3b82f6;
    background: none;
    border: none;
    padding: 0;
    font-size: 14px;
  }
  
  .content {
    padding: 32rpx;
  }
  
  .section-title {
    font-size: 14px;
    color: #666;
    margin-bottom: 16rpx;
    display: block;
  }
  
  .section-subtitle {
    font-size: 12px;
    color: #999;
    margin-bottom: 32rpx;
    display: block;
  }
  
  .grid-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 48rpx;
  }
  
  .grid-item {
    flex: 0 0 calc(50% - 16rpx);
    background: #ffffff;
    border-radius: 24rpx;
    padding: 32rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2rpx 6rpx rgba(0,0,0,0.1);
  }
  
  .grid-text {
    font-size: 14px;
    margin-top: 16rpx;
  }
  
  .card {
    background: #ffffff;
    border-radius: 24rpx;
    padding: 32rpx;
    margin-bottom: 32rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2rpx 6rpx rgba(0,0,0,0.1);
  }
  
  .card-text {
    font-size: 16px;
  }
  
  .card-right {
    display: flex;
    align-items: center;
  }
  
  .default-text {
    font-size: 14px;
    color: #999;
    margin-right: 16rpx;
  }
  </style>
  
  