
<template>
    <view class="page">
      <view class="nav">
        <view class="nav-placeholder"></view>
        <text class="nav-title">资产总览</text>
        <view class="nav-action">
          <uni-icons type="more-filled" size="24" color="#666"></uni-icons>
        </view>
      </view>
  
      <view class="main">
        <view class="asset-card">
          <text class="asset-label">净资产</text>
          <text class="asset-amount">128,500.00</text>
          <view class="asset-details">
            <text class="asset-detail-item">资产 138,500.00</text>
            <text class="asset-detail-item">负债 10,000.00</text>
          </view>
        </view>
  
        <view class="section-card">
          <view class="section-header">
            <text class="section-title">现金账户</text>
            <text class="section-amount">52,300.00</text>
          </view>
          <view class="account-list">
            <view class="account-item">
              <view class="account-info">
                <view class="account-icon">
                  <uni-icons type="wallet" size="24" color="#f5af19"></uni-icons>
                </view>
                <view class="account-details">
                  <text class="account-name">工商银行</text>
                  <text class="account-type">储蓄卡</text>
                </view>
              </view>
              <text class="account-amount">32,300.00</text>
            </view>
            <view class="account-item">
              <view class="account-info">
                <view class="account-icon">
                  <uni-icons type="wallet" size="24" color="#f5af19"></uni-icons>
                </view>
                <view class="account-details">
                  <text class="account-name">现金</text>
                  <text class="account-type">零钱</text>
                </view>
              </view>
              <text class="account-amount">20,000.00</text>
            </view>
          </view>
        </view>
  
        <view class="section-card">
          <view class="section-header">
            <text class="section-title">投资理财</text>
            <text class="section-amount">76,200.00</text>
          </view>
          <view class="account-list">
            <view class="account-item">
              <view class="account-info">
                <view class="account-icon">
                  <uni-icons type="upload" size="24" color="#f5af19"></uni-icons>
                </view>
                <view class="account-details">
                  <text class="account-name">基金</text>
                  <text class="account-type">股票型</text>
                </view>
              </view>
              <text class="account-amount">46,200.00</text>
            </view>
            <view class="account-item">
              <view class="account-info">
                <view class="account-icon">
                  <uni-icons type="wallet" size="24" color="#f5af19"></uni-icons>
                </view>
                <view class="account-details">
                  <text class="account-name">理财产品</text>
                  <text class="account-type">稳健型</text>
                </view>
              </view>
              <text class="account-amount">30,000.00</text>
            </view>
          </view>
        </view>
  
        <view class="add-button">
          <uni-icons type="plusempty" size="24" color="#FFFFFF"></uni-icons>
        </view>
      </view>
  
      <FooterNav />
    </view>
  </template>
  
  <script lang="ts" setup>
  import FooterNav from '@/components/footer-nav/index.vue'
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
  
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 88rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32rpx;
    background-color: #FFFFFF;
    border-bottom: 2rpx solid #f0f0f0;
    z-index: 100;
  }
  
  .nav-placeholder {
    width: 48rpx;
  }
  
  .nav-title {
    font-size: 34rpx;
    font-weight: 500;
    color: #333333;
  }
  
  .nav-action {
    width: 48rpx;
    height: 48rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .main {
    flex: 1;
    margin-top: 88rpx;
    margin-bottom: 98rpx;
    padding: 32rpx;
  }
  
  .asset-card {
    padding: 32rpx;
    border-radius: 24rpx;
    background: linear-gradient(135deg, #f5af19 0%, #ffd666 100%);
    margin-bottom: 48rpx;
  }
  
  .asset-label {
    font-size: 28rpx;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 16rpx;
  }
  
  .asset-amount {
    font-size: 60rpx;
    color: #FFFFFF;
    font-weight: 500;
    margin-bottom: 32rpx;
  }
  
  .asset-details {
    display: flex;
    justify-content: space-between;
  }
  
  .asset-detail-item {
    font-size: 28rpx;
    color: rgba(255, 255, 255, 0.9);
  }
  
  .section-card {
    padding: 32rpx;
    background-color: #FFFFFF;
    border-radius: 24rpx;
    margin-bottom: 32rpx;
  }
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32rpx;
  }
  
  .section-title {
    font-size: 32rpx;
    color: #333333;
  }
  
  .section-amount {
    font-size: 28rpx;
    color: #999999;
  }
  
  .account-list {
    display: flex;
    flex-direction: column;
    gap: 32rpx;
  }
  
  .account-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .account-info {
    display: flex;
    align-items: center;
  }
  
  .account-icon {
    width: 80rpx;
    height: 80rpx;
    border-radius: 40rpx;
    background-color: rgba(245, 175, 25, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 24rpx;
  }
  
  .account-details {
    display: flex;
    flex-direction: column;
  }
  
  .account-name {
    font-size: 28rpx;
    color: #333333;
    margin-bottom: 8rpx;
  }
  
  .account-type {
    font-size: 24rpx;
    color: #999999;
  }
  
  .account-amount {
    font-size: 28rpx;
    color: #333333;
  }
  
  .add-button {
    position: fixed;
    right: 32rpx;
    bottom: 140rpx;
    width: 96rpx;
    height: 96rpx;
    border-radius: 48rpx;
    background-color: #f5af19;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8rpx 16rpx rgba(245, 175, 25, 0.2);
  }
  
  .tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 98rpx;
    background-color: #FFFFFF;
    border-top: 2rpx solid #f0f0f0;
    display: flex;
  }
  
  .tab-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .tab-text {
    font-size: 24rpx;
    margin-top: 8rpx;
  }
  
  .tab-item.active .tab-text {
    color: #f5af19;
  }
  
  .tab-item:not(.active) .tab-text {
    color: #999999;
  }
  </style>
  
  