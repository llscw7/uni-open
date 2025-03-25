
<template>
    <view class="page">
      <view class="nav-bar">
        <text class="nav-title">资产详情</text>
        <uni-icons color="#FFFFFF" size="24" type="more" class="nav-icon" />
      </view>
      <view class="main-content">
        <view class="card">
          <view class="flex-row">
            <view class="icon-circle">
              <uni-icons color="#FFFFFF" size="24" type="wallet" />
            </view>
            <view class="card-content">
              <view class="flex-row space-between">
                <view>
                  <text class="bank-name">招商银行</text>
                  <text class="card-type">储蓄卡</text>
                </view>
                <uni-icons color="#f5af19" size="20" type="compose" />
              </view>
              <text class="balance">¥ 25,678.90</text>
            </view>
          </view>
        </view>
  
        <view class="summary-card">
          <view class="flex-row space-between">
            <view class="date-info">
              <text class="date">2023-12-15</text>
              <text class="sub-text">本日交易</text>
            </view>
            <view class="amount-summary">
              <view class="amount-item">
                <text class="amount-label">收入</text>
                <text class="income">¥1,200</text>
              </view>
              <view class="amount-item">
                <text class="amount-label">支出</text>
                <text class="expense">¥458</text>
              </view>
              <view class="amount-item">
                <text class="amount-label">结余</text>
                <text class="balance-text">¥742</text>
              </view>
            </view>
          </view>
        </view>
  
        <view class="transaction-card">
          <view class="transaction-item border-bottom">
            <view class="icon-box">
              <uni-icons color="#f5af19" size="20" type="shop" />
            </view>
            <view class="transaction-content">
              <view class="flex-row space-between">
                <view>
                  <text class="transaction-title">午餐</text>
                  <text class="transaction-desc">和同事聚餐</text>
                </view>
                <text class="expense-amount">-38.00</text>
              </view>
            </view>
          </view>
          <view class="transaction-item">
            <view class="icon-box">
              <uni-icons color="#f5af19" size="20" type="wallet" />
            </view>
            <view class="transaction-content">
              <view class="flex-row space-between">
                <view>
                  <text class="transaction-title">工资收入</text>
                  <text class="transaction-desc">12 月工资</text>
                </view>
                <text class="income-amount">+12,000.00</text>
              </view>
            </view>
          </view>
        </view>
  
        <view class="summary-card">
          <view class="flex-row space-between">
            <view class="date-info">
              <text class="date">2023-12-14</text>
              <text class="sub-text">本日交易</text>
            </view>
            <view class="amount-summary">
              <view class="amount-item">
                <text class="amount-label">收入</text>
                <text class="income">¥0</text>
              </view>
              <view class="amount-item">
                <text class="amount-label">支出</text>
                <text class="expense">¥235</text>
              </view>
              <view class="amount-item">
                <text class="amount-label">结余</text>
                <text class="balance-text">-¥235</text>
              </view>
            </view>
          </view>
        </view>
  
        <view class="transaction-card">
          <view class="transaction-item border-bottom">
            <view class="icon-box">
              <uni-icons color="#f5af19" size="20" type="cart" />
            </view>
            <view class="transaction-content">
              <view class="flex-row space-between">
                <view>
                  <text class="transaction-title">超市购物</text>
                  <text class="transaction-desc">日用品</text>
                </view>
                <text class="expense-amount">-135.50</text>
              </view>
            </view>
          </view>
          <view class="transaction-item">
            <view class="icon-box">
              <uni-icons color="#f5af19" size="20" type="info" />
            </view>
            <view class="transaction-content">
              <view class="flex-row space-between">
                <view>
                  <text class="transaction-title">交通</text>
                  <text class="transaction-desc">地铁</text>
                </view>
                <text class="expense-amount">-4.00</text>
              </view>
            </view>
          </view>
        </view>
      </view>
  
      <view class="bottom-bar">
        <button class="add-button" type="primary">记一笔</button>
      </view>
    </view>
  </template>
  
  <script lang="ts" setup>
  // Component logic can be added here if needed
  </script>
  
  <style>
  page {
    height: 100%;
    background-color: #f5f5f5;
  }
  
  .page {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .nav-bar {
    height: 88rpx;
    background: #f5af19;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32rpx;
    flex-shrink: 0;
  }
  
  .nav-title {
    color: #ffffff;
    font-size: 16px;
    font-weight: 500;
  }
  
  .nav-icon {
    width: 48rpx;
    height: 48rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .main-content {
    flex: 1;
    padding: 32rpx;
    overflow: auto;
  }
  
  .card {
    background: #ffffff;
    border-radius: 16rpx;
    padding: 32rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
  }
  
  .flex-row {
    display: flex;
    align-items: center;
  }
  
  .space-between {
    justify-content: space-between;
  }
  
  .icon-circle {
    width: 96rpx;
    height: 96rpx;
    background: #f5af19;
    border-radius: 48rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .card-content {
    flex: 1;
    margin-left: 32rpx;
  }
  
  .bank-name {
    font-size: 14px;
    color: #666666;
  }
  
  .card-type {
    display: block;
    font-size: 12px;
    color: #999999;
    margin-top: 4rpx;
  }
  
  .balance {
    font-size: 20px;
    font-weight: 500;
    color: #333333;
    margin-top: 16rpx;
    display: block;
  }
  
  .summary-card {
    background: linear-gradient(to right, rgba(245, 175, 25, 0.1), rgba(255, 213, 126, 0.1));
    border-radius: 16rpx;
    padding: 32rpx;
    margin-top: 32rpx;
  }
  
  .date-info {
    display: flex;
    flex-direction: column;
  }
  
  .date {
    font-size: 14px;
    color: #666666;
  }
  
  .sub-text {
    font-size: 12px;
    color: #999999;
    margin-top: 8rpx;
  }
  
  .amount-summary {
    display: flex;
    gap: 32rpx;
  }
  
  .amount-item {
    text-align: center;
  }
  
  .amount-label {
    font-size: 12px;
    color: #999999;
    display: block;
  }
  
  .income {
    color: #4CAF50;
    font-weight: 500;
    font-size: 14px;
  }
  
  .expense {
    color: #f44336;
    font-weight: 500;
    font-size: 14px;
  }
  
  .balance-text {
    color: #666666;
    font-weight: 500;
    font-size: 14px;
  }
  
  .transaction-card {
    background: #ffffff;
    border-radius: 16rpx;
    padding: 0 32rpx;
    margin-top: 16rpx;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
  }
  
  .transaction-item {
    display: flex;
    align-items: center;
    padding: 24rpx 0;
  }
  
  .border-bottom {
    border-bottom: 1px solid #f5f5f5;
  }
  
  .icon-box {
    width: 80rpx;
    height: 80rpx;
    background: rgba(255, 213, 126, 0.2);
    border-radius: 16rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .transaction-content {
    flex: 1;
    margin-left: 24rpx;
  }
  
  .transaction-title {
    font-size: 14px;
    color: #333333;
  }
  
  .transaction-desc {
    font-size: 12px;
    color: #999999;
    display: block;
    margin-top: 4rpx;
  }
  
  .expense-amount {
    color: #f44336;
    font-size: 14px;
  }
  
  .income-amount {
    color: #4CAF50;
    font-size: 14px;
  }
  
  .bottom-bar {
    background: #ffffff;
    padding: 32rpx;
    border-top: 1px solid #f5f5f5;
    flex-shrink: 0;
  }
  
  .add-button {
    width: 100%;
    background: #f5af19;
    color: #ffffff;
    font-weight: 500;
    border-radius: 8rpx;
  }
  
  .add-button:active {
    opacity: 0.8;
  }
  </style>
  
  