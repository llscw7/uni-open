
<template>
    <view class="page">
      <view class="nav">
        <view class="nav-left">
          <button class="nav-button" @click="goBack">
            <uni-icons type="back" size="16" color="#f5af19" />
            <text class="nav-text">设置</text>
          </button>
        </view>
        <view class="nav-center">
          <text class="nav-title">账单导出</text>
          <uni-icons type="info" size="16" color="#f5af19" />
        </view>
        <button class="nav-button">导出</button>
      </view>
  
      <view class="main">
        <view class="card">
          <view class="card-item border-bottom">
            <text class="card-label">开始时间</text>
            <view class="card-value">
              <text class="value-text">2025 年 3 月 26 日</text>
              <uni-icons type="right" size="14" color="#dcdcdc" />
            </view>
          </view>
          <view class="card-item">
            <text class="card-label">结束时间</text>
            <view class="card-value">
              <text class="value-text">2025 年 3 月 26 日</text>
              <uni-icons type="right" size="14" color="#dcdcdc" />
            </view>
          </view>
        </view>
  
        <view class="card">
          <view class="card-item border-bottom">
            <text class="card-label">指定账户</text>
            <view class="card-value">
              <text class="placeholder-text">点此选择 (可不选)</text>
              <uni-icons type="right" size="14" color="#dcdcdc" />
            </view>
          </view>
          <view class="card-item">
            <text class="card-label">指定账本</text>
            <view class="card-value">
              <text class="placeholder-text">点此选择 (可不选)</text>
              <uni-icons type="right" size="14" color="#dcdcdc" />
            </view>
          </view>
        </view>
  
        <view class="card">
          <view class="card-item">
            <text class="card-label">包含图片附件或链接</text>
            <switch class="switch" color="#f5af19" :checked="false" />
          </view>
        </view>
      </view>
    </view>
  </template>
  
  <script lang="ts" setup>
  const goBack = () => {
    uni.navigateBack();
  };
  </script>
  
  <style>
  page {
    height: 100%;
  }
  
  .page {
    background-color: #f5f5f5;
    min-height: 100%;
  }
  
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 88rpx;
    background-color: #ffffff;
    border-bottom: 1px solid #f0f0f0;
    padding: 0 32rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 100;
  }
  
  .nav-left {
    display: flex;
    align-items: center;
  }
  
  .nav-button {
    display: flex;
    align-items: center;
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    color: #f5af19;
    font-size: 14px;
  }
  
  .nav-text {
    margin-left: 8rpx;
  }
  
  .nav-center {
    display: flex;
    align-items: center;
  }
  
  .nav-title {
    font-size: 16px;
    font-weight: 500;
    color: #333333;
    margin-right: 16rpx;
  }
  
  .main {
    padding: 120rpx 32rpx 32rpx;
  }
  
  .card {
    background-color: #ffffff;
    border-radius: 24rpx;
    margin-bottom: 32rpx;
  }
  
  .card-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 32rpx;
  }
  
  .border-bottom {
    border-bottom: 1px solid #f0f0f0;
  }
  
  .card-label {
    font-size: 14px;
    color: #333333;
  }
  
  .card-value {
    display: flex;
    align-items: center;
  }
  
  .value-text {
    font-size: 14px;
    color: #666666;
    margin-right: 16rpx;
  }
  
  .placeholder-text {
    font-size: 14px;
    color: #999999;
    margin-right: 16rpx;
  }
  
  .switch {
    transform: scale(0.8);
  }
  </style>
  
  