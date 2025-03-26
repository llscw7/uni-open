
<template>
    <view class="page">
      <view class="nav">
        <view class="nav-content">
          <view class="nav-left">
            <uni-icons type="left" size="20" color="#333333"/>
          </view>
          <text class="nav-title">添加任务</text>
          <view class="nav-right"></view>
        </view>
      </view>
  
      <view class="main">
        <view class="section">
          <view class="section-header">
            <view class="section-indicator"></view>
            <text class="section-title">周期任务</text>
          </view>
          
          <view class="section-content">
            <input type="text" placeholder="名称" class="input-field"/>
            
            <view class="list-item">
              <view class="item-left">
                <uni-icons type="reload" size="24" color="#999999"/>
                <view class="item-info">
                  <text class="item-title">重复周期</text>
                  <text class="item-desc">根据一定规则执行自动记账</text>
                </view>
              </view>
              <view class="item-right">
                <text class="item-value">每天</text>
                <uni-icons type="right" size="14" color="#999999"/>
              </view>
            </view>
  
            <view class="list-item">
              <view class="item-left">
                <uni-icons type="calendar" size="24" color="#999999"/>
                <view class="item-info">
                  <text class="item-title">开始时间</text>
                  <text class="item-desc">2025年3月26日</text>
                </view>
              </view>
              <view class="item-right">
                <uni-icons type="right" size="14" color="#999999"/>
              </view>
            </view>
  
            <view class="list-item border-none">
              <view class="item-left">
                <uni-icons type="calendar" size="24" color="#999999"/>
                <view class="item-info">
                  <text class="item-title">结束方式</text>
                  <text class="item-desc">根据规则结束此任务</text>
                </view>
              </view>
              <view class="item-right">
                <uni-icons type="right" size="14" color="#999999"/>
              </view>
            </view>
          </view>
        </view>
  
        <view class="section">
          <view class="section-header">
            <view class="header-left">
              <view class="section-indicator"></view>
              <text class="section-title">账单模板</text>
            </view>
            <text class="select-btn">选取</text>
          </view>
          
          <view class="empty-content">
            <text class="empty-text">请选择一个账单模板哦</text>
          </view>
        </view>
  
        <view class="section">
          <view class="section-header">
            <view class="section-indicator"></view>
            <text class="section-title">状态</text>
          </view>
          
          <view class="section-content">
            <view class="switch-item">
              <view class="switch-info">
                <text class="switch-title">开启任务</text>
                <text class="switch-desc">是否启用此周期任务</text>
              </view>
              <switch checked color="#f5af19"/>
            </view>
          </view>
        </view>
      </view>
  
      <view class="footer">
        <button class="submit-btn">保存</button>
      </view>
    </view>
  </template>
  
  <script lang="ts" setup>
  </script>
  
  <style>
  page {
    height: 100%;
  }
  
  .page {
    background-color: #ffffff;
    min-height: 100%;
    position: relative;
  }
  
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #ffffff;
    border-bottom: 1px solid #f5f5f5;
    z-index: 100;
  }
  
  .nav-content {
    height: 88rpx;
    padding: 0 32rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .nav-left {
    width: 48rpx;
    height: 48rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .nav-title {
    font-size: 34rpx;
    font-weight: 500;
    color: #333333;
  }
  
  .nav-right {
    width: 48rpx;
  }
  
  .main {
    padding: 120rpx 32rpx 200rpx;
  }
  
  .section {
    margin-bottom: 48rpx;
  }
  
  .section-header {
    display: flex;
    align-items: center;
    margin-bottom: 32rpx;
  }
  
  .header-left {
    display: flex;
    align-items: center;
  }
  
  .section-indicator {
    width: 4rpx;
    height: 32rpx;
    background-color: #f5af19;
    border-radius: 4rpx;
    margin-right: 16rpx;
  }
  
  .section-title {
    font-size: 32rpx;
    font-weight: 500;
    color: #333333;
  }
  
  .select-btn {
    color: #f5af19;
    font-size: 28rpx;
  }
  
  .section-content {
    background-color: #f8f8f8;
    border-radius: 16rpx;
    padding: 32rpx;
  }
  
  .input-field {
    width: 100%;
    height: 96rpx;
    background-color: #ffffff;
    border-radius: 16rpx;
    padding: 0 32rpx;
    margin-bottom: 32rpx;
    box-sizing: border-box;
  }
  
  .list-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 112rpx;
    border-bottom: 1px solid #f5f5f5;
  }
  
  .border-none {
    border-bottom: none;
  }
  
  .item-left {
    display: flex;
    align-items: center;
    gap: 24rpx;
  }
  
  .item-info {
    display: flex;
    flex-direction: column;
  }
  
  .item-title {
    font-size: 32rpx;
    color: #333333;
  }
  
  .item-desc {
    font-size: 24rpx;
    color: #999999;
    margin-top: 4rpx;
  }
  
  .item-right {
    display: flex;
    align-items: center;
    gap: 8rpx;
  }
  
  .item-value {
    font-size: 28rpx;
    color: #999999;
  }
  
  .empty-content {
    background-color: #f8f8f8;
    border-radius: 16rpx;
    height: 192rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .empty-text {
    font-size: 28rpx;
    color: #999999;
  }
  
  .switch-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .switch-info {
    display: flex;
    flex-direction: column;
  }
  
  .switch-title {
    font-size: 32rpx;
    color: #333333;
    margin-bottom: 8rpx;
  }
  
  .switch-desc {
    font-size: 24rpx;
    color: #999999;
  }
  
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 32rpx;
    background-color: #ffffff;
    border-top: 1px solid #f5f5f5;
  }
  
  .submit-btn {
    width: 100%;
    height: 100rpx;
    background-color: #f5af19;
    color: #ffffff;
    font-weight: 500;
    border-radius: 8rpx;
  }
  </style>
  
  