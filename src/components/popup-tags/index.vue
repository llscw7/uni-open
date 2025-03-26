
<template>
    <UIPopup :visible="visible" :set-visible="setVisible" :z-index="2000">
        <view class="page">
      <view class="nav-bar">
        <uni-icons type="back" size="24" color="#333333"></uni-icons>
        <view class="tab-group">
          <text class="tab-item active">通用</text>
          <text class="tab-item">账本独立</text>
        </view>
        <view class="placeholder"></view>
      </view>
  
      <view class="main-content">
        <view class="card">
          <view class="card-header">
            <view class="title-wrapper">
              <view class="title-bar"></view>
              <text class="title">提示</text>
            </view>
            <button class="mini-button">帮助</button>
          </view>
          <text class="tip-content">标签 📝 可用于区分哪个人花的钱，或哪个电商平台购买的物品。如：（类别电商：淘宝、京东）（人员：姐姐、妈妈、哥哥）</text>
          <view class="card-footer">
            <text class="tip-desc">功能默认为关闭，点击设置进行开启</text>
            <button class="mini-button">设置</button>
          </view>
        </view>
  
        <view class="card">
          <view class="card-header">
            <view class="title-wrapper">
              <view class="title-bar"></view>
              <text class="title">电商</text>
            </view>
            <button class="mini-button">编辑</button>
          </view>
          <view class="tag-group">
            <text class="tag">拼多多</text>
            <text class="tag">淘宝</text>
            <view class="add-button">
              <uni-icons type="plus" size="16" color="#999999"></uni-icons>
            </view>
          </view>
        </view>
  
        <view class="card">
          <view class="card-header">
            <view class="title-wrapper">
              <view class="title-bar"></view>
              <text class="title">游戏</text>
            </view>
            <button class="mini-button">编辑</button>
          </view>
          <view class="tag-group">
            <text class="tag">手游</text>
            <view class="add-button">
              <uni-icons type="plus" size="16" color="#999999"></uni-icons>
            </view>
          </view>
        </view>
  
        <button class="add-category-button">添加类别</button>
      </view>
    </view>
    </UIPopup>
</template>
  
  <script lang="ts" setup>
    import UIPopup from '@/ui-modules/popup/index.vue';
const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    setVisible: {
        type: Function,
        required: true
    }
})
  </script>
  
  <style>

  
  .page {
    width: 750rpx;
    min-height: 100%;
    position: relative;
  }
  
  .nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 88rpx;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
    z-index: 50;
  }
  
  .tab-group {
    display: flex;
    gap: 16rpx;
  }
  
  .tab-item {
    padding: 8rpx 24rpx;
    border-radius: 999rpx;
    font-size: 14px;
  }
  
  .tab-item.active {
    background-color: #333333;
    color: #ffffff;
  }
  
  .tab-item:not(.active) {
    background-color: #f5f5f5;
    color: #666666;
  }
  
  .placeholder {
    width: 48rpx;
  }
  
  .main-content {
    padding: 120rpx 32rpx 160rpx;
  }
  
  .card {
    background-color: #ffffff;
    border-radius: 16rpx;
    padding: 32rpx;
    margin-bottom: 32rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24rpx;
  }
  
  .title-wrapper {
    display: flex;
    align-items: center;
    gap: 16rpx;
  }
  
  .title-bar {
    width: 8rpx;
    height: 40rpx;
    background-color: #f5af19;
    border-radius: 999rpx;
  }
  
  .title {
    color: #333333;
    font-weight: 500;
    font-size: 16px;
  }
  
  .mini-button {
    padding: 8rpx 24rpx;
    background-color: #f5f5f5;
    color: #666666;
    border-radius: 999rpx;
    font-size: 14px;
  }
  
  .tip-content {
    color: #666666;
    font-size: 14px;
    line-height: 1.5;
    margin: 24rpx 0;
  }
  
  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 24rpx;
  }
  
  .tip-desc {
    color: #999999;
    font-size: 14px;
  }
  
  .tag-group {
    display: flex;
    flex-wrap: wrap;
    gap: 16rpx;
  }
  
  .tag {
    padding: 12rpx 24rpx;
    background-color: #ffefd5;
    color: #f5af19;
    border-radius: 999rpx;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200rpx;
  }
  
  .add-button {
    width: 64rpx;
    height: 64rpx;
    background-color: #f5f5f5;
    border-radius: 999rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .add-category-button {
    position: fixed;
    bottom: 48rpx;
    left: 32rpx;
    right: 32rpx;
    height: 96rpx;
    background-color: #f5af19;
    color: #ffffff;
    border-radius: 8rpx;
    font-weight: 500;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  </style>
  
  