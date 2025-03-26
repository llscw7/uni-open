
<template>
  <view class="page">
    <view class="nav-bar">
      <uni-icons type="back" size="24" color="#333333"></uni-icons>
      <text class="nav-title">添加账本</text>
      <text class="nav-complete">完成</text>
    </view>
    
    <view class="main-container">
      <view class="input-box">
        <input type="text" placeholder="默认账本" maxlength="10" v-model="bookName" class="book-input"/>
        <view class="count-box">
          <text class="count-text">{{bookName.length}}/10</text>
          <uni-icons type="clear" size="18" color="#999999" @click="clearInput"></uni-icons>
        </view>
      </view>

      <view class="icon-section">
        <text class="section-title">账本图标</text>
        <view class="icon-grid">
          <view class="icon-item active">
            <text class="icon-text">A</text>
          </view>
          <view class="icon-item star-bg">
            <uni-icons type="star-filled" size="24" color="#FFB300"></uni-icons>
          </view>
          <view class="icon-item heart-bg">
            <uni-icons type="heart-filled" size="24" color="#AB47BC"></uni-icons>
          </view>
          <view class="icon-item pet-bg">
            <uni-icons type="notification-filled" size="24" color="#2196F3"></uni-icons>
          </view>
          <view class="icon-item plane-bg">
            <uni-icons type="paperplane-filled" size="24" color="#3F51B5"></uni-icons>
          </view>
        </view>
      </view>

      <view class="category-section">
        <view class="section-header">
          <text class="section-title">分类选择</text>
          <text class="section-desc">任何添加如下的账目将自动放入该账本</text>
        </view>
        <view class="category-grid">
          <view class="category-item" v-for="(item, index) in categories" :key="index">
            <view class="category-icon" :class="item.bgClass">
              <uni-icons :type="item.icon" size="24" :color="item.color"></uni-icons>
            </view>
            <text class="category-name">{{item.name}}</text>
          </view>
          <view class="category-item">
            <view class="category-icon add-bg">
              <uni-icons type="plus" size="24" color="#999999"></uni-icons>
            </view>
            <text class="category-name">添加</text>
          </view>
        </view>
      </view>

      <view class="tag-section">
        <view class="section-header">
          <text class="section-title">标签选择</text>
          <text class="section-desc">任何添加如下的账目将自动放入该账本</text>
        </view>
        <view class="tag-container">
          <view class="tag-item" v-for="(tag, index) in tags" :key="index">
            <text class="tag-text">#{{tag}}</text>
          </view>
          <view class="tag-item add-tag">
            <uni-icons type="plus" size="16" color="#f5af19"></uni-icons>
          </view>
        </view>
      </view>

      <view class="operation-list">
        <view class="operation-item" v-for="(op, index) in operations" :key="index">
          <view class="operation-left">
            <view class="operation-icon">
              <uni-icons :type="op.icon" size="18" color="#f5af19"></uni-icons>
            </view>
            <text class="operation-name">{{op.name}}</text>
          </view>
          <view class="operation-right">
            <text v-if="op.value" class="operation-value">{{op.value}}</text>
            <uni-icons type="right" size="14" color="#CCCCCC"></uni-icons>
          </view>
        </view>
      </view>
    </view>

    <view class="bottom-button">
      <button class="create-btn" @click="createBook">创建账本</button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const bookName = ref('');

const clearInput = () => {
  bookName.value = '';
};

const categories = ref([
  { name: '餐饮', icon: 'shop', color: '#2196F3', bgClass: 'food-bg' },
  { name: '购物', icon: 'shop', color: '#FFB300', bgClass: 'shopping-bg' },
  { name: '交通', icon: 'shop', color: '#4CAF50', bgClass: 'transport-bg' }
]);

const tags = ref(['早餐', '午餐', '晚餐', '零食']);

const operations = ref([
  { name: '查看账单', icon: 'file', value: '' },
  { name: '迁移账单', icon: 'refresh', value: '' },
  { name: '清空账单', icon: 'trash', value: '' },
  { name: '账本周期', icon: 'calendar', value: '每月' }
]);

const createBook = () => {
  // 创建账本逻辑
};
</script>

<style>
page {
  height: 100%;
  background-color: #f5f5f5;
}

.page {
  min-height: 100%;
  padding-bottom: 120rpx;
  box-sizing: border-box;
}

.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 88rpx;
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32rpx;
  border-bottom: 2rpx solid #f5f5f5;
  z-index: 100;
}

.nav-title {
  font-size: 16px;
  font-weight: 500;
  color: #333333;
}

.nav-complete {
  font-size: 14px;
  color: #f5af19;
}

.main-container {
  padding: 120rpx 32rpx 0;
}

.input-box {
  background-color: #FFFFFF;
  border-radius: 16rpx;
  padding: 32rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32rpx;
}

.book-input {
  flex: 1;
  font-size: 16px;
}

.count-box {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.count-text {
  font-size: 14px;
  color: #999999;
}

.icon-section {
  background-color: #FFFFFF;
  border-radius: 16rpx;
  padding: 32rpx;
  margin-bottom: 32rpx;
}

.section-title {
  font-size: 16px;
  font-weight: 500;
  color: #333333;
  margin-bottom: 24rpx;
}

.icon-grid {
  display: flex;
  gap: 32rpx;
}

.icon-item {
  width: 96rpx;
  height: 96rpx;
  border-radius: 999rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-item.active {
  background-color: #E8F5E9;
  border: 4rpx solid #f5af19;
}

.icon-text {
  font-size: 20px;
  color: #f5af19;
  font-weight: 500;
}

.star-bg {
  background-color: #FFF3E0;
}

.heart-bg {
  background-color: #F3E5F5;
}

.pet-bg {
  background-color: #E3F2FD;
}

.plane-bg {
  background-color: #E8EAF6;
}

.category-section {
  background-color: #FFFFFF;
  border-radius: 16rpx;
  padding: 32rpx;
  margin-bottom: 32rpx;
}

.section-header {
  margin-bottom: 24rpx;
}

.section-desc {
  font-size: 14px;
  color: #999999;
  margin-top: 8rpx;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32rpx;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
}

.category-icon {
  width: 96rpx;
  height: 96rpx;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.food-bg {
  background-color: #E3F2FD;
}

.shopping-bg {
  background-color: #FFF3E0;
}

.transport-bg {
  background-color: #E8F5E9;
}

.add-bg {
  background-color: #f5f5f5;
}

.category-name {
  font-size: 14px;
  color: #333333;
}

.tag-section {
  background-color: #FFFFFF;
  border-radius: 16rpx;
  padding: 32rpx;
  margin-bottom: 32rpx;
}

.tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.tag-item {
  background-color: rgba(245, 175, 25, 0.1);
  border: 2rpx solid rgba(245, 175, 25, 0.2);
  border-radius: 999rpx;
  padding: 8rpx 24rpx;
}

.tag-text {
  font-size: 14px;
  color: #f5af19;
}

.add-tag {
  padding: 8rpx 16rpx;
}

.operation-list {
  background-color: #FFFFFF;
  border-radius: 16rpx;
}

.operation-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32rpx;
  border-bottom: 2rpx solid #f5f5f5;
}

.operation-item:last-child {
  border-bottom: none;
}

.operation-left {
  display: flex;
  align-items: center;
  gap: 24rpx;
}

.operation-icon {
  width: 64rpx;
  height: 64rpx;
  background-color: rgba(245, 175, 25, 0.1);
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.operation-name {
  font-size: 14px;
  color: #333333;
}

.operation-right {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.operation-value {
  font-size: 14px;
  color: #999999;
}

.bottom-button {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 48rpx;
  padding: 0 32rpx;
}

.create-btn {
  width: 100%;
  height: 96rpx;
  background-color: #f5af19;
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 500;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

