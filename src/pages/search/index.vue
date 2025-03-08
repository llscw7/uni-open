
<template>
    <div class="search" :style="{ paddingTop: navbarHeight + 'px' }">
        <div class="header" :style="{ paddingTop: searchPaddingTop + 'px', paddingRight: searchPaddingRight + 'px' }">
            <div class="left-arrow-icon-wrap">
                <div class="left-arrow-icon-2"></div>
            </div>
            <div class="search-box">
                <div class="search-icon icon-size-36"></div>
                <input type="text" placeholder="搜索交易记录" class="search-input" :value="inputSearchValue" @input="clearInput"/>
                <div class="clear-icon-wrap" v-if="showClearIcon" @click="clearIcon">
                    <div class="clear-icon"></div>
                </div>
            </div>
        </div>

      <div class="content">
        
  
        <div class="date-selector">
            <div class="calendar-icon icon-size-36"></div>
          <text class="date-text">2023-12-15</text>
        </div>
  
        <div class="search-history">
          <div class="search-history-header">
            <text class="search-history-title">搜索记录</text>
            <div class="clear-btn">
                <div class="delete-icon icon-size-30"></div>
              <text class="clear-text">清除</text>
            </div>
          </div>
          <div class="tag-container">
            <text class="tag-item">餐饮</text>
            <text class="tag-item">交通</text>
            <text class="tag-item">购物</text>
          </div>
        </div>
  
        <TransactionList :dayWrapTop="100" />
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import TransactionList from '@/components/transaction-list/index.vue';
import { getCapsulePosition } from '@/util/tool';
const searchPaddingTop = ref(0);
const searchPaddingRight = ref(0);
const navbarHeight = ref(0);
const toolsWrapTop = ref(0);

const inputSearchValue = ref('');
const showClearIcon = ref(false);

onMounted(() => {
  initHeader()
});

const initHeader = () => {
  const { capsuleCenter, capsuleBottom, capsuleTop, capsuleRight, capsuleWidth } = getCapsulePosition();
  searchPaddingTop.value = capsuleTop - 2;
  navbarHeight.value = capsuleBottom + 15;
  toolsWrapTop.value = capsuleBottom;
  searchPaddingRight.value = capsuleWidth + 10;
}

const clearInput = (event: any) => {
    inputSearchValue.value = event.detail.value;
            if (event.detail.value.length > 0) {
                showClearIcon.value = true;
            } else {
                showClearIcon.value = false;
            }
}

const clearIcon = () => {
    inputSearchValue.value = '';
    showClearIcon.value = false;
}
  </script>
  
  <style scoped lang="less">
  .search {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
    background-color: #F9FAFB;
  }
  
  .header {
    background-color: var(--primary-color);
    // background-color: #F9FAFB;
    // background-color: #fff;
    padding: 0 20rpx;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    height: 200rpx;
    display: flex;
    align-items: flex-start;
    box-sizing: border-box;
  }
  
  .content {
    flex: 1;
    padding: 32rpx;
    overflow: auto;
  }
  
  .search-box {
    display: flex;
    align-items: center;
    flex-grow: 1;
    padding: 16rpx 24rpx;
    height: 74rpx;
    background-color: #FFFFFF;
    border-radius: 999rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
    box-sizing: border-box;
  }
  
  .search-input {
    flex: 1;
    margin: 0 20rpx;
    font-size: 14px;
  }
  
  .date-selector {
    display: inline-flex;
    align-items: center;
    padding: 16rpx 32rpx;
    background-color: #FFFFFF;
    border-radius: 999rpx;
    margin-bottom: 24rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
  }
  
  .date-text {
    margin-left: 12rpx;
    font-size: 14px;
    color: #666666;
  }
  
  .search-history {
    background-color: #FFFFFF;
    border-radius: 16rpx;
    padding: 24rpx;
    margin-bottom: 24rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
  }
  
  .search-history-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16rpx;
  }
  
  .search-history-title {
    font-size: 14px;
    font-weight: 500;
  }
  
  .clear-btn {
    display: flex;
    align-items: center;
  }
  
  .clear-text {
    font-size: 14px;
    color: #999999;
    margin-left: 8rpx;
  }
  
  .tag-container {
    display: flex;
    flex-wrap: wrap;
    gap: 16rpx;
  }
  
  .tag-item {
    padding: 8rpx 16rpx;
    background-color: #f3f4f6;
    border-radius: 999rpx;
    font-size: 12px;
    color: #666666;
  }
  
  .transaction-day {
    margin-bottom: 32rpx;
  }
  
  .date-title {
    font-size: 14px;
    color: #666666;
    font-weight: 500;
    margin-bottom: 24rpx;
  }
  
  .transaction-items {
    display: flex;
    flex-direction: column;
    gap: 24rpx;
  }
  
  .transaction-item {
    display: flex;
    align-items: center;
    padding: 24rpx;
    background-color: #FFFFFF;
    border-radius: 16rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
  }
  
  .icon-box {
    width: 80rpx;
    height: 80rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 999rpx;
    margin-right: 24rpx;
  }
  
  .blue {
    background-color: rgba(71, 134, 255, 0.1);
  }
  
  .green {
    background-color: rgba(0, 181, 120, 0.1);
  }
  
  .purple {
    background-color: rgba(140, 44, 255, 0.1);
  }
  
  .yellow {
    background-color: rgba(255, 166, 0, 0.1);
  }
  
  .red {
    background-color: rgba(255, 65, 65, 0.1);
  }
  
  .transaction-info {
    flex: 1;
  }
  
  .transaction-name {
    font-size: 14px;
    color: #333333;
    font-weight: 500;
    margin-bottom: 8rpx;
  }
  
  .transaction-category {
    font-size: 12px;
    color: #999999;
  }
  
  .transaction-amount {
    font-size: 14px;
    color: #FF4141;
    font-weight: 500;
  }
  

  .class-icon {
    width: 80rpx;
    height: 80rpx;
    background: var(--class-icon-background-color);
    border-radius: 24rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .left-arrow-icon-wrap {
    width: 60rpx;
    height: 70rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  
  .clear-icon-wrap {
    position: relative;
    width: 30rpx;
    height: 30rpx;
    border-radius: 50%;
    background-color: #999999;
  }

  .clear-icon {
    width: 24rpx;
    height: 24rpx;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
  </style>
  
  