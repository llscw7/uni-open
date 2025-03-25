
<template>
    <view class="page">
      <view class="nav-box">
        <view class="back-text" @tap="onBack">
          <uni-icons type="left" size="18" color="#3b82f6" />
          <text class="back-label">设置</text>
        </view>
        <view class="nav-tabs">
          <view 
            class="tab-item" 
            :class="{ active: currentTab === 'expense' }"
            @tap="switchTab('expense')"
          >支出</view>
          <view 
            class="tab-item"
            :class="{ active: currentTab === 'income' }"
            @tap="switchTab('income')"
          >收入</view>
        </view>
        <text class="add-text" @tap="onAdd">添加</text>
      </view>
  
      <scroll-view class="content" scroll-y>
        <view class="category-list">
          <view class="category-item" v-for="(item, index) in categories" :key="index">
            <view class="category-icon">
              <uni-icons :type="item.icon" size="20" color="#FFFFFF" />
            </view>
            <text class="category-name">{{ item.name }}</text>
            <view class="more-btn">
              <uni-icons type="more-filled" size="20" color="#3b82f6" />
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  
  const currentTab = ref('expense')
  
  const categories = ref([
    { name: '餐饮', icon: 'shop' },
    { name: '购物', icon: 'cart' },
    { name: '服饰', icon: 'staff' },
    { name: '日用', icon: 'home' },
    { name: '数码', icon: 'phone' },
    { name: '美妆', icon: 'star' },
    { name: '护肤', icon: 'heart' },
    { name: '应用软件', icon: 'phone' },
    { name: '住房', icon: 'home' },
    { name: '交通', icon: 'car' },
    { name: '娱乐', icon: 'star' }
  ])
  
  const switchTab = (tab: string) => {
    currentTab.value = tab
  }
  
  const onBack = () => {
    uni.navigateBack()
  }
  
  const onAdd = () => {
    uni.showToast({
      title: '添加分类',
      icon: 'none'
    })
  }
  </script>
  
  <style>
  page {
    height: 100%;
    background-color: #f5f5f5;
  }
  
  .page {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .nav-box {
    padding: 20rpx 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    position: relative;
  }
  
  .back-text {
    display: flex;
    align-items: center;
    color: #3b82f6;
  }
  
  .back-label {
    font-size: 14px;
    margin-left: 4rpx;
  }
  
  .nav-tabs {
    display: flex;
    gap: 40rpx;
  }
  
  .tab-item {
    padding: 10rpx 40rpx;
    font-size: 14px;
    position: relative;
  }
  
  .tab-item.active {
    color: #f5af19;
  }
  
  .tab-item.active::after {
    content: '';
    position: absolute;
    bottom: -10rpx;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #f5af19;
  }
  
  .add-text {
    color: #3b82f6;
    font-size: 14px;
  }
  
  .content {
    flex: 1;
    overflow: auto;
    padding: 30rpx;
  }
  
  .category-list {
    background-color: #ffffff;
    border-radius: 24rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
  }
  
  .category-item {
    display: flex;
    align-items: center;
    padding: 30rpx;
    border-bottom: 1px solid #f5f5f5;
  }
  
  .category-item:last-child {
    border-bottom: none;
  }
  
  .category-icon {
    width: 80rpx;
    height: 80rpx;
    border-radius: 40rpx;
    background-color: #f5af19;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  }
  
  .category-name {
    margin-left: 30rpx;
    flex-grow: 1;
    font-size: 14px;
  }
  
  .more-btn {
    width: 64rpx;
    height: 64rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  }
  </style>
  
  