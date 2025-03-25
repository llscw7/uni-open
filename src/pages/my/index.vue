
<template>
    <view class="page">
      <view class="content">
        <view class="header-card">
          <view class="user-info">
            <view class="avatar">
              <uni-icons type="person" size="24" color="#ffffff"/>
            </view>
            <view class="info">
              <view class="name-wrapper">
                <text class="name">张雨晨</text>
                <view class="badge">
                  <uni-icons type="medal" size="12" color="#FFD700"/>
                  <text class="badge-text">连续 168 天</text>
                </view>
              </view>
              <text class="motto">让每一笔收支都有意义</text>
            </view>
          </view>
          <view class="stats">
            <view class="stat-item">
              <view class="stat-title">
                <uni-icons type="calendar" size="14" color="rgba(255,255,255,0.9)"/>
                <text class="stat-label">累计记账</text>
              </view>
              <view class="stat-value">
                <text class="number">168</text>
                <text class="unit">天</text>
              </view>
            </view>
            <view class="stat-item">
              <view class="stat-title">
                <uni-icons type="list" size="14" color="rgba(255,255,255,0.9)"/>
                <text class="stat-label">记账总数</text>
              </view>
              <view class="stat-value">
                <text class="number">526</text>
                <text class="unit">笔</text>
              </view>
            </view>
          </view>
        </view>
  
        <view class="vip-card">
          <view class="vip-content">
            <view class="vip-left">
              <uni-icons type="star-filled" size="20" color="#FFD700"/>
              <text class="vip-text">开通会员享专属特权</text>
            </view>
            <uni-icons type="right" size="14" color="#ffffff"/>
          </view>
        </view>
  
        <view class="tools-card">
          <text class="section-title">工具栏</text>
          <view class="tools-grid">
            <view class="tool-item" v-for="(tool, index) in tools" :key="index">
              <view class="tool-icon">
                <uni-icons :type="tool.icon" size="20" color="#F5AF19"/>
              </view>
              <text class="tool-name">{{ tool.name }}</text>
            </view>
          </view>
        </view>
  
        <view class="other-card">
          <text class="section-title">其他</text>
          <view class="other-list">
            <view class="other-item" v-for="(item, index) in otherItems" :key="index">
              <view class="item-left">
                <view class="item-icon">
                  <uni-icons :type="item.icon" size="20" color="#F5AF19"/>
                </view>
                <text class="item-name">{{ item.name }}</text>
              </view>
              <uni-icons type="right" size="14" color="#999999"/>
            </view>
          </view>
        </view>
      </view>
  
      <FooterNav />

    </view>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
    import FooterNav from '@/components/footer-nav/index.vue'
  
  const tools = ref([
    { icon: 'folder', name: '分类管理' },
    { icon: 'tags', name: '标签管理' },
    { icon: 'bookfill', name: '账本管理' },
    { icon: 'wallet', name: '固定收支' },
    { icon: 'notification', name: '定时提醒' },
    { icon: 'upload', name: '账单导出' },
    { icon: 'download', name: '账单导入' },
    { icon: 'settings', name: '更多设置' }
  ])
  
  const otherItems = ref([
    { icon: 'chat', name: '建议与反馈' },
    { icon: 'info', name: '关于我们' },
    { icon: 'star', name: '应用评分' }
  ])
  
  const tabs = ref([
    { icon: 'home', name: '首页' },
    { icon: 'pie', name: '统计' },
    { icon: 'plusempty', name: '记账' },
    { icon: 'person', name: '我的' }
  ])
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
  
  .content {
    flex: 1;
    padding: 120rpx 0 160rpx;
  }
  
  .header-card {
    margin: 0 32rpx 32rpx;
    padding: 40rpx;
    border-radius: 24rpx;
    background: linear-gradient(135deg, #f5af19 50%, #F4D03F);
  }
  
  .user-info {
    display: flex;
    align-items: center;
    margin-bottom: 32rpx;
  }
  
  .avatar {
    width: 128rpx;
    height: 128rpx;
    border-radius: 999rpx;
    background-color: rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 4rpx solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(8rpx);
  }
  
  .info {
    flex: 1;
    margin-left: 40rpx;
  }
  
  .name-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .name {
    font-size: 36rpx;
    color: #ffffff;
    font-weight: 500;
  }
  
  .badge {
    display: flex;
    align-items: center;
    padding: 8rpx 16rpx;
    background: rgba(255, 255, 255, 0.15);
    border: 2rpx solid rgba(255, 255, 255, 0.4);
    border-radius: 999rpx;
    backdrop-filter: blur(8rpx);
  }
  
  .badge-text {
    font-size: 22rpx;
    color: rgba(255, 255, 255, 0.95);
    margin-left: 8rpx;
  }
  
  .motto {
    font-size: 24rpx;
    color: rgba(255, 255, 255, 0.7);
    margin-top: 8rpx;
  }
  
  .stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32rpx;
  }
  
  .stat-item {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(8rpx);
    border-radius: 16rpx;
    padding: 24rpx;
  }
  
  .stat-title {
    display: flex;
    align-items: center;
    margin-bottom: 8rpx;
  }
  
  .stat-label {
    font-size: 28rpx;
    color: rgba(255, 255, 255, 0.9);
    margin-left: 16rpx;
  }
  
  .stat-value {
    display: flex;
    align-items: baseline;
  }
  
  .number {
    font-size: 42rpx;
    color: #ffffff;
    font-weight: 600;
  }
  
  .unit {
    font-size: 28rpx;
    color: #ffffff;
    margin-left: 8rpx;
  }
  
  .vip-card {
    margin: 0 32rpx 32rpx;
    border-radius: 24rpx;
    overflow: hidden;
    background: linear-gradient(135deg, #f5af19 50%, #F4D03F);
  }
  
  .vip-content {
    padding: 32rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .vip-left {
    display: flex;
    align-items: center;
  }
  
  .vip-text {
    color: #ffffff;
    margin-left: 24rpx;
  }
  
  .tools-card, .other-card {
    margin: 0 32rpx 32rpx;
    padding: 32rpx;
    background: #ffffff;
    border-radius: 24rpx;
  }
  
  .section-title {
    font-size: 28rpx;
    color: #999999;
    margin-bottom: 32rpx;
    display: block;
  }
  
  .tools-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 32rpx;
  }
  
  .tool-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .tool-icon {
    width: 96rpx;
    height: 96rpx;
    background: rgba(245, 175, 25, 0.1);
    border-radius: 16rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16rpx;
  }
  
  .tool-name {
    font-size: 24rpx;
    color: #666666;
    width: 128rpx;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .other-list {
    display: flex;
    flex-direction: column;
    gap: 16rpx;
  }
  
  .other-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16rpx;
    border-radius: 16rpx;
  }
  
  .item-left {
    display: flex;
    align-items: center;
  }
  
  .item-icon {
    width: 80rpx;
    height: 80rpx;
    background: rgba(245, 175, 25, 0.1);
    border-radius: 24rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .item-name {
    margin-left: 32rpx;
    color: #333333;
  }
  
  .tab-bar {
    height: 100rpx;
    background: #ffffff;
    border-top: 2rpx solid #f0f0f0;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 16rpx 48rpx;
  }
  
  .tab-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .tab-icon {
    height: 48rpx;
    width: 48rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .tab-name {
    font-size: 24rpx;
    color: #999999;
    margin-top: 4rpx;
  }
  
  .tab-name.active {
    color: #F5AF19;
  }
  </style>
  
  