
<template>
    <view class="page">
      <view class="nav-bar">
        <view class="nav-content">
          <uni-icons type="back" size="20" color="#666"></uni-icons>
          <text class="nav-title">设置重复</text>
          <uni-icons type="checkmarkempty" size="20" color="#f5af19"></uni-icons>
        </view>
      </view>
      <view class="content">
        <view class="card">
          <view class="list-item">
            <text>重复周期</text>
            <view class="right-text">
              <text>每天</text>
              <uni-icons type="right" size="14" color="#999"></uni-icons>
            </view>
          </view>
          <view class="list-item">
            <text>结束重复</text>
            <view class="right-text">
              <text>永不结束</text>
              <uni-icons type="right" size="14" color="#999"></uni-icons>
            </view>
          </view>
          <view class="list-item">
            <text>生效日期</text>
            <view class="right-text">
              <text>今天</text>
              <uni-icons type="right" size="14" color="#999"></uni-icons>
            </view>
          </view>
          <view class="list-item">
            <text>账单时间</text>
            <view class="right-text">
              <text>按添加时间</text>
              <uni-icons type="right" size="14" color="#999"></uni-icons>
            </view>
          </view>
        </view>
  
        <view class="card">
          <view class="list-item">
            <text>收支类型</text>
            <view class="right-text">
              <text>支出</text>
              <uni-icons type="right" size="14" color="#999"></uni-icons>
            </view>
          </view>
          <view class="list-item">
            <text>分类</text>
            <view class="right-text">
              <uni-icons type="folder" size="16" color="#f5af19"></uni-icons>
              <text class="item-text">其他</text>
              <uni-icons type="right" size="14" color="#999"></uni-icons>
            </view>
          </view>
          <view class="list-item">
            <text>金额</text>
            <view class="right-text">
              <text>0.00</text>
              <uni-icons type="right" size="14" color="#999"></uni-icons>
            </view>
          </view>
          <view class="list-item">
            <text>账本</text>
            <view class="right-text">
              <text>日常账本</text>
              <uni-icons type="right" size="14" color="#999"></uni-icons>
            </view>
          </view>
          <view class="list-item">
            <text>账户</text>
            <view class="right-text">
              <uni-icons type="card" size="16" color="#f5af19"></uni-icons>
              <text class="item-text">无账户</text>
              <uni-icons type="right" size="14" color="#999"></uni-icons>
            </view>
          </view>
        </view>
  
        <view class="card">
          <view class="list-item">
            <text>备注</text>
            <view class="right-text">
              <text class="gray-text">添加备注</text>
              <uni-icons type="right" size="14" color="#999"></uni-icons>
            </view>
          </view>
          <view class="list-item">
            <text>标签</text>
            <view class="right-text">
              <text class="gray-text">点击添加</text>
              <uni-icons type="right" size="14" color="#999"></uni-icons>
            </view>
          </view>
          <view class="list-item">
            <text>不计入收支</text>
            <switch class="switch" color="#f5af19" :checked="isIncludeIncome" @change="handleIncomeChange" />
          </view>
          <view class="list-item">
            <text>不计入预算</text>
            <switch class="switch" color="#f5af19" :checked="isIncludeBudget" @change="handleBudgetChange" />
          </view>
        </view>
      </view>
    </view>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  
  const isIncludeIncome = ref(false);
  const isIncludeBudget = ref(false);
  
  const handleIncomeChange = (e: any) => {
    isIncludeIncome.value = e.detail.value;
  };
  
  const handleBudgetChange = (e: any) => {
    isIncludeBudget.value = e.detail.value;
  };
  </script>
  
  <style>
  page {
    height: 100%;
    background-color: #f5f5f5;
  }
  
  .page {
    height: 100%;
  }
  
  .nav-bar {
    background-color: #ffffff;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 50;
    border-bottom: 1px solid #eeeeee;
  }
  
  .nav-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 32rpx;
    height: 88rpx;
  }
  
  .nav-title {
    font-size: 16px;
    font-weight: 500;
  }
  
  .content {
    margin-top: 88rpx;
    padding: 32rpx;
  }
  
  .card {
    background-color: #ffffff;
    border-radius: 24rpx;
    margin-bottom: 32rpx;
  }
  
  .list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 32rpx;
    border-bottom: 1px solid #f5f5f5;
  }
  
  .list-item:last-child {
    border-bottom: none;
  }
  
  .right-text {
    display: flex;
    align-items: center;
    color: #999999;
  }
  
  .item-text {
    margin: 0 16rpx;
  }
  
  .gray-text {
    color: #999999;
    margin-right: 16rpx;
  }
  
  .switch {
    transform: scale(0.8);
  }
  </style>
  
  