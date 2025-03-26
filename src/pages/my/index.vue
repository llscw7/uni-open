
<template>
  <view class="container">
    <!-- 主要内容滚动区 -->
    <scroll-view scroll-y class="scroll-area">
      <!-- 用户信息卡片 -->
      <view class="user-card">
        <view class="user-info">
          <view class="avatar">
            <uni-icons type="person" size="28" color="#FFFFFF" />
          </view>
          <view class="info-right">
            <view class="info-top">
              <text class="username">张雨晨</text>
              <view class="user-badge">
                <uni-icons type="medal" size="18" color="#FFD700" />
                <text class="badge-text">连续 168 天</text>
              </view>
            </view>
            <text class="user-motto">让每一笔收支都有意义</text>
          </view>
        </view>
        <view class="user-stats">
          <view class="stat-item">
            <view class="stat-title">
              <uni-icons type="calendar" size="16" color="rgba(255,255,255,0.9)" />
              <text class="stat-label">累计记账</text>
            </view>
            <view class="stat-value">
              168<text class="stat-unit">天</text>
            </view>
          </view>
          <view class="stat-item">
            <view class="stat-title">
              <uni-icons type="list" size="16" color="rgba(255,255,255,0.9)" />
              <text class="stat-label">记账总数</text>
            </view>
            <view class="stat-value">
              526<text class="stat-unit">笔</text>
            </view>
          </view>
        </view>
      </view>

      <!-- VIP卡片 -->
      <view class="vip-card">
        <view class="vip-content">
          <view class="vip-left">
            <uni-icons type="star" size="24" color="#FFD700" />
            <text class="vip-text">开通会员享专属特权</text>
          </view>
          <uni-icons type="right" size="16" color="#FFFFFF" />
        </view>
      </view>

      <!-- 常用功能 -->
      <view class="function-card">
        <text class="card-title">常用功能</text>
        <view class="function-grid">
          <view class="function-item" v-for="(item, index) in functionList" :key="index" @click="goToPage(item.url)">
            <view class="function-icon" :style="{ backgroundColor: item.bgColor }">
              <uni-icons :type="item.icon" size="24" :color="item.iconColor" />
            </view>
            <text class="function-name">{{ item.name }}</text>
          </view>
        </view>
      </view>

      <!-- 账单管理 -->
      <view class="list-card">
        <text class="card-title">账单管理</text>
        <view class="list-content">
          <view class="list-item" v-for="(item, index) in billManageList" :key="index" @click="goToPage(item.url)">
            <view class="list-left">
              <view class="list-icon" :style="{ backgroundColor: item.bgColor }">
                <uni-icons :type="item.icon" size="20" :color="item.iconColor" />
              </view>
              <text class="list-text">{{ item.name }}</text>
            </view>
            <uni-icons type="right" size="16" color="#CCCCCC" />
          </view>
        </view>
      </view>

      <!-- 其他设置 -->
      <view class="list-card">
        <text class="card-title">其他</text>
        <view class="list-content">
          <view class="list-item" v-for="(item, index) in otherList" :key="index">
            <view class="list-left">
              <view class="list-icon" :style="{ backgroundColor: item.bgColor }">
                <uni-icons :type="item.icon" size="20" :color="item.iconColor" />
              </view>
              <text class="list-text">{{ item.name }}</text>
            </view>
            <uni-icons type="right" size="16" color="#CCCCCC" />
          </view>
        </view>
      </view>

      <!-- 更多设置 -->
      <view class="list-card">
        <text class="card-title">更多</text>
        <view class="list-content">
          <view class="list-item" v-for="(item, index) in moreList" :key="index">
            <view class="list-left">
              <view class="list-icon" :style="{ backgroundColor: item.bgColor }">
                <uni-icons :type="item.icon" size="20" :color="item.iconColor" />
              </view>
              <text class="list-text">{{ item.name }}</text>
            </view>
            <uni-icons type="right" size="16" color="#CCCCCC" />
          </view>
        </view>
      </view>
    </scroll-view>
    <FooterNav />

  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import FooterNav from '@/components/footer-nav/index.vue'

const functionList = ref([
  { name: '分类管理', icon: 'folder', bgColor: '#EBF5FF', iconColor: '#3B82F6', url: '/pages/my/sub-pages/category-edit/index' },
  { name: '标签管理', icon: 'tags', bgColor: '#F3E8FF', iconColor: '#9333EA', url: '/pages/my/sub-pages/tag-edit/index' },
  { name: '账本管理', icon: 'bookfill', bgColor: '#ECFDF5', iconColor: '#059669', url: '/pages/my/sub-pages/book/index' },
  { name: '固定收支', icon: 'wallet', bgColor: '#FFF7ED', iconColor: '#EA580C', url: '/pages/my/sub-pages/cycle-record/index' },
  { name: '自动记账', icon: 'settings', bgColor: '#ECFEFF', iconColor: '#0891B2', url: '/pages/my/sub-pages/auto-record/index' },
  { name: '小工具', icon: 'gear', bgColor: '#FEF2F2', iconColor: '#DC2626', url: '' },
  { name: '更多设置', icon: 'more', bgColor: '#EEF2FF', iconColor: '#4F46E5', url: '' }
]);

const billManageList = ref([
  { name: '账单导出', icon: 'upload', bgColor: '#F0FDFA', iconColor: '#0D9488', url: '/pages/my/sub-pages/export-data/index' },
  { name: '账单导入', icon: 'download', bgColor: '#FDF2F8', iconColor: '#DB2777', url: '/pages/my/sub-pages/import-data/index' },
  { name: '云同步', icon: 'cloud-upload', bgColor: '#EFF6FF', iconColor: '#3B82F6', url: '' }
]);

const otherList = ref([
  { name: '帮助中心', icon: 'help', bgColor: '#F3E8FF', iconColor: '#9333EA' },
  { name: '主题设置', icon: 'staff', bgColor: '#FFF1F2', iconColor: '#E11D48' },
  { name: '自定义小组件', icon: 'plus', bgColor: '#FFFBEB', iconColor: '#D97706' }
]);

const moreList = ref([
  { name: '建议与反馈', icon: 'chat', bgColor: '#FEF3C7', iconColor: '#D97706' },
  { name: '关于我们', icon: 'info', bgColor: '#DBEAFE', iconColor: '#2563EB' },
  { name: '应用评分', icon: 'star', bgColor: '#ECFDF5', iconColor: '#059669' }
]);

const tabList = ref([
  { name: '首页', icon: 'home', active: true },
  { name: '统计', icon: 'circle', active: false },
  { name: '记账', icon: 'plusempty', active: false },
  { name: '我的', icon: 'person', active: false }
]);

const goToPage = (url: string) => {
  console.log('goToPage', url);
  if(url) {
    uni.navigateTo({ url });
  }
};
</script>

<style>

.container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.scroll-area {
  flex: 1;
  overflow: auto;
}

/* 用户信息卡片样式 */
.user-card {
  margin: 30rpx;
  padding: 30rpx;
  border-radius: 24rpx;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.95), rgba(244, 114, 182, 0.95));
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 30rpx;
}

.avatar {
  width: 96rpx;
  height: 96rpx;
  border-radius: 48rpx;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8rpx);
  border: 2rpx solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.info-right {
  flex: 1;
  margin-left: 30rpx;
}

.info-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.username {
  font-size: 32rpx;
  color: #FFFFFF;
  font-weight: 500;
}

.user-badge {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8rpx);
  border: 2rpx solid rgba(255, 255, 255, 0.4);
  border-radius: 999rpx;
  padding: 8rpx 16rpx;
}

.badge-text {
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.95);
  margin-left: 8rpx;
}

.user-motto {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 8rpx;
}

.user-stats {
  display: flex;
  gap: 24rpx;
}

.stat-item {
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8rpx);
  border-radius: 16rpx;
  padding: 20rpx;
}

.stat-title {
  display: flex;
  align-items: center;
  margin-bottom: 8rpx;
}

.stat-label {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.9);
  margin-left: 12rpx;
}

.stat-value {
  font-size: 36rpx;
  color: #FFFFFF;
  font-weight: 600;
}

.stat-unit {
  font-size: 24rpx;
  font-weight: normal;
  margin-left: 8rpx;
}

/* VIP卡片样式 */
.vip-card {
  margin: 0 30rpx 30rpx;
  border-radius: 24rpx;
  overflow: hidden;
  background: linear-gradient(to right, #6366f1, #f472b6);
}

.vip-content {
  padding: 30rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.vip-left {
  display: flex;
  align-items: center;
}

.vip-text {
  color: #FFFFFF;
  margin-left: 20rpx;
}

/* 功能卡片样式 */
.function-card {
  margin: 0 30rpx 30rpx;
  padding: 30rpx;
  background: #FFFFFF;
  border-radius: 24rpx;
}

.card-title {
  font-size: 24rpx;
  color: #666666;
  margin-bottom: 30rpx;
  display: block;
}

.function-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24rpx;
}

.function-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.function-icon {
  width: 88rpx;
  height: 88rpx;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12rpx;
}

.function-name {
  font-size: 24rpx;
  color: #666666;
  width: 120rpx;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 列表卡片样式 */
.list-card {
  margin: 0 30rpx 30rpx;
  padding: 30rpx;
  background: #FFFFFF;
  border-radius: 24rpx;
}

.list-content {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16rpx;
  border-radius: 16rpx;
}

.list-item:active {
  background-color: #f5f5f5;
}

.list-left {
  display: flex;
  align-items: center;
}

.list-icon {
  width: 72rpx;
  height: 72rpx;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.list-text {
  font-size: 28rpx;
  color: #333333;
  margin-left: 24rpx;
}

/* 底部导航栏样式 */
.tab-bar {
  display: flex;
  padding: 16rpx 60rpx;
  background: #FFFFFF;
  border-top: 2rpx solid #f0f0f0;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tab-text {
  font-size: 24rpx;
  color: #999999;
  margin-top: 8rpx;
}

.tab-text.active {
  color: #6366f1;
}
</style>

