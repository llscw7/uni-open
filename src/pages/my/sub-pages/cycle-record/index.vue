
<template>
    <view class="container">
      <view class="nav-bar">
        <view class="nav-bar-content">
          <view class="btn-icon">
            <uni-icons type="back" size="20" color="#666"></uni-icons>
          </view>
          <view class="tab-group">
            <button class="tab-btn tab-active">进行中</button>
            <button class="tab-btn">已暂停</button>
            <button class="tab-btn">已结束</button>
          </view>
          <view class="btn-icon">
            <uni-icons type="help" size="20" color="#666"></uni-icons>
          </view>
        </view>
      </view>
  
      <scroll-view class="main-content" scroll-y>
        <view class="bill-group">
          <view class="bill-header">
            <text class="group-title">玩玩玩</text>
            <button class="edit-btn">编辑</button>
          </view>
          <view class="bill-card">
            <view class="bill-main">
              <view class="bill-info">
                <view class="icon-box">
                  <uni-icons type="shop" size="24" color="#f5af19"></uni-icons>
                </view>
                <view class="bill-detail">
                  <text class="bill-type">餐饮</text>
                  <text class="bill-desc">午饭</text>
                </view>
              </view>
              <text class="bill-amount">¥ 20.00</text>
            </view>
            <text class="bill-date">预计 2025年03月27日 执行</text>
            <view class="bill-footer">
              <view class="tag-group">
                <text class="tag">永不结束</text>
                <text class="tag">每天</text>
                <text class="tag">已执行1次</text>
              </view>
              <view class="calendar-btn">
                <uni-icons type="calendar" size="20" color="#999"></uni-icons>
              </view>
            </view>
          </view>
        </view>
  
        <view class="bill-group">
          <view class="bill-header">
            <text class="group-title">买买买</text>
            <button class="edit-btn">编辑</button>
          </view>
          <view class="bill-card">
            <view class="bill-main">
              <view class="bill-info">
                <view class="icon-box">
                  <uni-icons type="shop" size="24" color="#f5af19"></uni-icons>
                </view>
                <view class="bill-detail">
                  <text class="bill-type">购物</text>
                  <text class="bill-desc">淘宝</text>
                </view>
              </view>
              <text class="bill-amount">¥ 60.00</text>
            </view>
            <text class="bill-date">预计 2025年03月27日 执行</text>
            <view class="bill-footer">
              <view class="tag-group">
                <text class="tag">永不结束</text>
                <text class="tag">每天</text>
                <text class="tag">已执行1次</text>
              </view>
              <view class="calendar-btn">
                <uni-icons type="calendar" size="20" color="#999"></uni-icons>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
  
      <view class="add-button">
        <button class="submit-btn">添加</button>
      </view>
    </view>
  </template>
  
  <script lang="ts" setup>
  import { onMounted } from 'vue'
  
  onMounted(() => {
    console.log('Page mounted')
  })
  </script>
  
  <style>
  page {
    height: 100%;
    background-color: #f5f5f5;
  }
  
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .nav-bar {
    flex-shrink: 0;
    background: #ffffff;
  }
  
  .nav-bar-content {
    padding: 20rpx 30rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .btn-icon {
    width: 60rpx;
    height: 60rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .tab-group {
    display: flex;
    gap: 20rpx;
  }
  
  .tab-btn {
    font-size: 14px;
    padding: 10rpx 30rpx;
    border-radius: 40rpx;
    background-color: #f5f5f5;
    color: #666;
  }
  
  .tab-active {
    background-color: #f5af19;
    color: #ffffff;
  }
  
  .main-content {
    flex: 1;
    overflow: auto;
    padding: 0 30rpx;
    margin: 20rpx 0 120rpx 0;
  }
  
  .bill-group {
    margin-bottom: 30rpx;
  }
  
  .bill-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rpx;
  }
  
  .group-title {
    color: #666;
  }
  
  .edit-btn {
    font-size: 14px;
    color: #999;
    background: none;
    padding: 0;
  }
  
  .bill-card {
    background: #ffffff;
    border-radius: 24rpx;
    padding: 30rpx;
    box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  }
  
  .bill-main {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .bill-info {
    display: flex;
    align-items: center;
  }
  
  .icon-box {
    width: 90rpx;
    height: 90rpx;
    background-color: #f5f5f5;
    border-radius: 20rpx;
    margin-right: 20rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .bill-detail {
    display: flex;
    flex-direction: column;
  }
  
  .bill-type {
    font-size: 16px;
    color: #333;
    font-weight: 500;
  }
  
  .bill-desc {
    font-size: 14px;
    color: #999;
    margin-top: 4rpx;
  }
  
  .bill-amount {
    color: #ff4d4f;
    font-size: 16px;
  }
  
  .bill-date {
    font-size: 14px;
    color: #999;
    margin: 20rpx 0;
    display: block;
  }
  
  .bill-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .tag-group {
    display: flex;
    gap: 16rpx;
  }
  
  .tag {
    font-size: 12px;
    color: #666;
    background-color: #f5f5f5;
    padding: 8rpx 16rpx;
    border-radius: 40rpx;
  }
  
  .calendar-btn {
    width: 60rpx;
    height: 60rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .add-button {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #ffffff;
    padding: 30rpx;
  }
  
  .submit-btn {
    background-color: #f5af19;
    color: #ffffff;
    font-size: 16px;
    font-weight: 500;
    border-radius: 100rpx;
  }
  </style>
  
  