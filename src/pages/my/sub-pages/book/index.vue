
<template>
    <view class="container">
      <view class="nav-bar">
        <view class="nav-left">
          <uni-icons type="back" size="24" />
        </view>
        <view class="nav-title">账本管理</view>
        <view class="nav-right">
          <uni-icons type="gear" size="24" />
        </view>
      </view>
      <scroll-view class="content" scroll-y>
        <view class="book-grid">
          <view v-for="(book, index) in accountBooks" :key="index" class="book-card">
            <view class="book-left">
              <view class="icon-wrapper">
                <uni-icons :type="book.icon" size="32" color="#f5af19" />
              </view>
              <text class="book-name">{{ book.name }}</text>
            </view>
            <view class="book-right">
              <view class="edit-icon">
                <uni-icons type="compose" size="20" color="#999" />
              </view>
              <view class="select-icon">
                <uni-icons :type="book.selected ? 'checkbox-filled' : 'circle'" size="20" :color="book.selected ? '#f5af19' : '#999'" />
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  
  interface AccountBook {
    name: string;
    icon: string;
    selected: boolean;
  }
  
  const accountBooks = ref<AccountBook[]>([
    { name: '默认账本', icon: 'wallet', selected: true },
    { name: '生活账本', icon: 'home', selected: false },
    { name: '购物账本', icon: 'shop', selected: false },
    { name: '餐饮账本', icon: 'food', selected: false },
    { name: '旅行账本', icon: 'car', selected: false },
    { name: '理财账本', icon: 'medal', selected: false },
  ]);
  </script>
  
  <style>
  page {
    height: 100%;
  }
  
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #f8f8f8;
  }
  
  .nav-bar {
    display: flex;
    align-items: center;
    height: 88rpx;
    background-color: #fff;
    padding: 0 30rpx;
    flex-shrink: 0;
  }
  
  .nav-left {
    width: 100rpx;
    display: flex;
    align-items: center;
  }
  
  .nav-title {
    flex: 1;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    color: #333;
  }
  
  .nav-right {
    width: 100rpx;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  
  .content {
    flex: 1;
    overflow: auto;
  }
  
  .book-grid {
    padding: 30rpx;
    display: flex;
    flex-wrap: wrap;
    gap: 30rpx;
  }
  
  .book-card {
    width: calc(50% - 15rpx);
    height: 180rpx;
    background-color: #fff;
    border-radius: 16rpx;
    padding: 30rpx;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  }
  
  .book-left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .icon-wrapper {
    width: 64rpx;
    height: 64rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .book-name {
    font-size: 14px;
    color: #333;
    margin-top: 20rpx;
  }
  
  .book-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
  }
  
  .edit-icon {
    width: 40rpx;
    height: 40rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .select-icon {
    width: 40rpx;
    height: 40rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  </style>
  
  