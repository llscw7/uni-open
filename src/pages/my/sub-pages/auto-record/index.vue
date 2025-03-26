
<template>
    <view class="container">
      <view class="nav-header">
        <uni-icons @click="goBack" type="back" size="20" color="#FFFFFF" class="back-icon"></uni-icons>
        <text class="nav-title">自动记账</text>
      </view>
  
      <view class="main-content">
        <view class="section-card">
          <view class="card-item border-bottom">
            <view class="left-content">
              <text>启用自动记账</text>
              <uni-icons type="star-filled" size="16" color="#f5af19" class="crown-icon"></uni-icons>
            </view>
            <switch checked color="#4CAF50" class="custom-switch"></switch>
          </view>
  
          <view class="card-item border-bottom">
            <view class="title-desc">
              <text class="title">记账自动记账指令</text>
              <text class="desc">点击跳转至系统快捷指令安装</text>
            </view>
            <uni-icons type="right" size="16" color="#999999"></uni-icons>
          </view>
  
          <view class="card-item border-bottom">
            <text class="title">自动记账教程</text>
            <uni-icons type="right" size="16" color="#999999"></uni-icons>
          </view>
  
          <view class="card-item">
            <view class="title-desc">
              <text class="title">粘贴权限</text>
              <text class="desc">点击跳转粘贴权限设置</text>
            </view>
            <uni-icons type="right" size="16" color="#999999"></uni-icons>
          </view>
        </view>
  
        <view class="section-card">
          <view class="card-item border-bottom">
            <text class="title">支持的应用</text>
            <uni-icons type="right" size="16" color="#999999"></uni-icons>
          </view>
  
          <view class="card-item border-bottom">
            <view class="title-desc">
              <text class="title">自动修正管理</text>
              <text class="desc">编辑识别商户的自动填充信息</text>
            </view>
            <uni-icons type="right" size="16" color="#999999"></uni-icons>
          </view>
  
          <view class="card-item">
            <text class="title">已识别账单</text>
            <uni-icons type="right" size="16" color="#999999"></uni-icons>
          </view>
        </view>
  
        <view class="section-card">
          <view class="card-item border-bottom">
            <view class="title-desc">
              <text class="title">备注自动填写</text>
              <text class="desc">关闭后默认备注将设置为空</text>
            </view>
            <switch checked color="#4CAF50" class="custom-switch"></switch>
          </view>
  
          <view class="card-item border-bottom">
            <view class="title-desc">
              <text class="title">完成后返回页面</text>
              <text class="desc">记账完成后返回的页面</text>
            </view>
            <view class="right-content">
              <text class="gray-text">留在记账</text>
              <uni-icons type="right" size="16" color="#999999"></uni-icons>
            </view>
          </view>
  
          <view class="card-item border-bottom">
            <view class="title-desc">
              <text class="title">账本修正</text>
              <text class="desc">同一商户自动选取上次选择的账本</text>
            </view>
            <switch checked color="#4CAF50" class="custom-switch"></switch>
          </view>
  
          <view class="card-item">
            <view class="title-desc">
              <text class="title">自动修正</text>
              <text class="desc">同一商户自动沿用上次分类等信息</text>
            </view>
            <switch checked color="#4CAF50" class="custom-switch"></switch>
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
    background-color: #f5f5f5;
  }
  
  .container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .nav-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 88rpx;
    background-color: #f5af19;
    display: flex;
    align-items: center;
    padding: 0 32rpx;
    z-index: 100;
  }
  
  .back-icon {
    width: 40rpx;
    height: 40rpx;
  }
  
  .nav-title {
    flex: 1;
    text-align: center;
    color: #ffffff;
    font-size: 16px;
    font-weight: 500;
  }
  
  .main-content {
    flex: 1;
    padding: 120rpx 32rpx 40rpx;
  }
  
  .section-card {
    background-color: #ffffff;
    border-radius: 16rpx;
    margin-bottom: 32rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);
  }
  
  .card-item {
    padding: 32rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .border-bottom {
    border-bottom: 2rpx solid #f5f5f5;
  }
  
  .left-content {
    display: flex;
    align-items: center;
    gap: 16rpx;
  }
  
  .crown-icon {
    width: 32rpx;
    height: 32rpx;
  }
  
  .title-desc {
    display: flex;
    flex-direction: column;
  }
  
  .title {
    font-size: 14px;
    color: #333333;
  }
  
  .desc {
    font-size: 12px;
    color: #999999;
    margin-top: 8rpx;
  }
  
  .right-content {
    display: flex;
    align-items: center;
    gap: 16rpx;
  }
  
  .gray-text {
    font-size: 14px;
    color: #999999;
  }
  
  .custom-switch {
    transform: scale(0.8);
  }
  </style>
  
  