
<template>
    <view class="page">
      <view class="nav-header">
        <text class="logo">logo</text>
        <uni-icons type="notification" size="24" color="#FFFFFF" />
      </view>
      
      <view class="main-content">
        <view class="mb-section">
          <view class="section-header">
            <text class="section-title">账本统计</text>
          </view>
          
          <view class="date-filter-card">
            <view class="filter-buttons">
              <uni-grid :column="4" :showBorder="false">
                <uni-grid-item>
                  <button :class="['filter-btn', periodType === 'week' ? 'active' : '']" @click="switchPeriod('week')">按周</button>
                </uni-grid-item>
                <uni-grid-item>
                  <button :class="['filter-btn', periodType === 'month' ? 'active' : '']" @click="switchPeriod('month')">按月</button>
                </uni-grid-item>
                <uni-grid-item>
                  <button :class="['filter-btn', periodType === 'year' ? 'active' : '']" @click="switchPeriod('year')">按年</button>
                </uni-grid-item>
                <uni-grid-item>
                  <button :class="['filter-btn', periodType === 'custom' ? 'active' : '']" @click="toggleCustomDate">自定义</button>
                </uni-grid-item>
              </uni-grid>
            </view>
  
            <view class="date-navigator">
              <button class="nav-btn" @click="navigatePeriod('prev')">
                <uni-icons type="left" size="12" color="#666666" />
                <text>上一期</text>
              </button>
              <view class="current-date">
                <text class="date-text">{{ currentDateRange }}</text>
              </view>
              <button class="nav-btn" @click="navigatePeriod('next')">
                <text>下一期</text>
                <uni-icons type="right" size="12" color="#666666" />
              </button>
            </view>
  
            <view v-if="showCustomDate" class="custom-date">
              <view class="date-picker-container">
                <view class="date-picker" @click="showStartPicker">
                  <uni-icons type="calendar" size="20" color="#f5af19" />
                  <view class="date-info">
                    <text class="label">开始时间</text>
                    <text class="value">{{ startDate }}</text>
                  </view>
                </view>
                <view class="date-picker" @click="showEndPicker">
                  <uni-icons type="calendar" size="20" color="#f5af19" />
                  <view class="date-info">
                    <text class="label">结束时间</text>
                    <text class="value">{{ endDate }}</text>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
  
        <view class="stat-cards">
          <view class="stat-card income">
            <view class="card-header">
              <text class="card-title">总收入</text>
              <uni-icons type="top" size="16" color="#f5af19" />
            </view>
            <text class="amount">¥156,580</text>
            <text class="compare">较上月 +12.5%</text>
          </view>
  
          <view class="stat-card expense">
            <view class="card-header">
              <text class="card-title">总支出</text>
              <uni-icons type="bottom" size="16" color="#ef4444" />
            </view>
            <text class="amount expense-amount">¥98,320</text>
            <text class="compare">较上月 -5.2%</text>
          </view>
  
          <view class="stat-card balance">
            <view class="card-header">
              <text class="card-title">结余</text>
              <uni-icons type="wallet" size="16" color="#f5af19" />
            </view>
            <text class="amount">¥58,260</text>
            <text class="compare">较上月 +8.3%</text>
          </view>
        </view>
  
        <view class="chart-card">
          <view class="card-header">
            <text class="card-title">收支趋势</text>
            <view class="legend">
              <view class="legend-item">
                <view class="legend-dot income-dot"></view>
                <text class="legend-text">收入</text>
              </view>
              <view class="legend-item">
                <view class="legend-dot expense-dot"></view>
                <text class="legend-text">支出</text>
              </view>
            </view>
          </view>
          <view class="chart-container">
            <!-- 这里需要集成图表组件 -->
          </view>
        </view>
  
        <view class="chart-card">
          <view class="card-header">
            <text class="card-title">支出分类</text>
          </view>
          <text class="total-expense">总支出：¥11,670</text>
          <view class="chart-container">
            <!-- 这里需要集成饼图组件 -->
          </view>
        </view>
  
        <view class="chart-card">
          <view class="card-header">
            <text class="card-title">收支统计</text>
            <view class="view-more">
              <text class="more-text">查看详情</text>
              <uni-icons type="right" size="12" color="#f5af19" />
            </view>
          </view>
          <view class="stats-chart">
            <view class="stats-legend">
              <view class="legend-items">
                <view class="legend-item">
                  <view class="legend-dot primary-dot"></view>
                  <text class="legend-text">月度支出</text>
                </view>
                <view class="legend-item">
                  <view class="legend-dot secondary-dot"></view>
                  <text class="legend-text">平均值</text>
                </view>
              </view>
              <text class="unit-text">单位：元</text>
            </view>
            <view class="chart-container">
              <!-- 这里需要集成柱状图组件 -->
            </view>
          </view>
        </view>
  
        <view class="chart-card">
          <view class="card-header">
            <text class="card-title">支出排行</text>
            <text class="view-all">查看全部</text>
          </view>
          <view class="ranking-list">
            <view class="ranking-item">
              <view class="icon-box food">
                <uni-icons type="shop" size="20" color="#ef4444" />
              </view>
              <view class="ranking-content">
                <view class="ranking-header">
                  <text class="category">餐饮美食</text>
                  <text class="amount expense-amount">¥3,280</text>
                </view>
                <view class="progress-bar">
                  <view class="progress food" style="width: 80%"></view>
                </view>
              </view>
            </view>
  
            <view class="ranking-item">
              <view class="icon-box shopping">
                <uni-icons type="shop" size="20" color="#3b82f6" />
              </view>
              <view class="ranking-content">
                <view class="ranking-header">
                  <text class="category">购物消费</text>
                  <text class="amount expense-amount">¥2,860</text>
                </view>
                <view class="progress-bar">
                  <view class="progress shopping" style="width: 65%"></view>
                </view>
              </view>
            </view>
  
            <view class="ranking-item">
              <view class="icon-box house">
                <uni-icons type="home" size="20" color="#8b5cf6" />
              </view>
              <view class="ranking-content">
                <view class="ranking-header">
                  <text class="category">居住缴费</text>
                  <text class="amount expense-amount">¥2,150</text>
                </view>
                <view class="progress-bar">
                  <view class="progress house" style="width: 45%"></view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
  
      <FooterNav />
    </view>
  </template>
  
  <script lang="ts" setup>
  import { ref, computed } from 'vue'
  import FooterNav from '@/components/footer-nav/index.vue'
  
  const periodType = ref('week')
  const currentOffset = ref(0)
  const showCustomDate = ref(false)
  const startDate = ref('2024-01-08')
  const endDate = ref('2024-01-14')
  
  const currentDateRange = computed(() => {
    return '2024.01.08-2024.01.14'
  })
  
  const switchPeriod = (type: string) => {
    periodType.value = type
    currentOffset.value = 0
    if (type !== 'custom') {
      showCustomDate.value = false
    }
  }
  
  const toggleCustomDate = () => {
    showCustomDate.value = !showCustomDate.value
    if (showCustomDate.value) {
      periodType.value = 'custom'
    }
  }
  
  const navigatePeriod = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      currentOffset.value--
    } else {
      currentOffset.value++
    }
  }
  
  const showStartPicker = () => {
    uni.showDatePicker({
      current: startDate.value,
      success: (res: any) => {
        startDate.value = res.date
      }
    })
  }
  
  const showEndPicker = () => {
    uni.showDatePicker({
      current: endDate.value,
      success: (res: any) => {
        endDate.value = res.date
      }
    })
  }
  </script>
  
  <style>
  page {
    height: 100%;
    background-color: #f8f9fa;
  }
  
  .page {
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }
  
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30rpx;
    height: 88rpx;
    background-color: #f5af19;
  }
  
  .logo {
    font-size: 36rpx;
    color: #FFFFFF;
  }
  
  .main-content {
    flex: 1;
    padding: 30rpx;
    padding-bottom: 120rpx;
  }
  
  .mb-section {
    margin-bottom: 40rpx;
  }
  
  .section-header {
    margin-bottom: 20rpx;
  }
  
  .section-title {
    font-size: 32rpx;
    font-weight: 500;
    color: #333333;
  }
  
  .date-filter-card {
    background: #FFFFFF;
    border-radius: 20rpx;
    padding: 30rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
  }
  
  .filter-buttons {
    background: #f3f4f6;
    border-radius: 20rpx;
    padding: 4rpx;
    margin-bottom: 30rpx;
  }
  
  .filter-btn {
    width: 100%;
    height: 60rpx;
    font-size: 24rpx;
    border-radius: 16rpx;
    background: transparent;
    color: #666666;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .filter-btn.active {
    background: #FFFFFF;
    color: #f5af19;
    font-weight: 500;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
  }
  
  .date-navigator {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30rpx;
  }
  
  .nav-btn {
    display: flex;
    align-items: center;
    font-size: 26rpx;
    color: #666666;
    background: transparent;
    padding: 0;
  }
  
  .current-date {
    padding: 10rpx 30rpx;
  }
  
  .date-text {
    font-size: 26rpx;
    color: #f5af19;
    font-weight: 500;
  }
  
  .custom-date {
    margin-top: 30rpx;
  }
  
  .date-picker-container {
    display: flex;
    gap: 20rpx;
  }
  
  .date-picker {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 20rpx;
    background: #FFFFFF;
    border: 2rpx solid #e5e7eb;
    border-radius: 16rpx;
    padding: 20rpx;
  }
  
  .date-info {
    display: flex;
    flex-direction: column;
  }
  
  .label {
    font-size: 22rpx;
    color: #f5af19;
    font-weight: 500;
  }
  
  .value {
    font-size: 26rpx;
    color: #666666;
    margin-top: 8rpx;
  }
  
  .stat-cards {
    display: flex;
    gap: 20rpx;
    margin-bottom: 40rpx;
  }
  
  .stat-card {
    flex: 1;
    background: #FFFFFF;
    border-radius: 20rpx;
    padding: 20rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
  }
  
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16rpx;
  }
  
  .card-title {
    font-size: 26rpx;
    color: #666666;
  }
  
  .amount {
    font-size: 32rpx;
    font-weight: 500;
    color: #f5af19;
    margin-bottom: 8rpx;
  }
  
  .expense-amount {
    color: #ef4444;
  }
  
  .compare {
    font-size: 22rpx;
    color: #999999;
  }
  
  .chart-card {
    background: #FFFFFF;
    border-radius: 20rpx;
    padding: 30rpx;
    margin-bottom: 40rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
  }
  
  .legend {
    display: flex;
    gap: 20rpx;
  }
  
  .legend-item {
    display: flex;
    align-items: center;
    gap: 8rpx;
  }
  
  .legend-dot {
    width: 16rpx;
    height: 16rpx;
    border-radius: 50%;
  }
  
  .income-dot {
    background-color: #f5af19;
  }
  
  .expense-dot {
    background-color: #ef4444;
  }
  
  .legend-text {
    font-size: 22rpx;
    color: #999999;
  }
  
  .chart-container {
    height: 400rpx;
    margin-top: 20rpx;
  }
  
  .total-expense {
    font-size: 26rpx;
    color: #999999;
    margin-bottom: 20rpx;
  }
  
  .view-more {
    display: flex;
    align-items: center;
    gap: 8rpx;
  }
  
  .more-text {
    font-size: 26rpx;
    color: #f5af19;
  }
  
  .stats-legend {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rpx;
  }
  
  .legend-items {
    display: flex;
    gap: 20rpx;
  }
  
  .primary-dot {
    background-color: #f5af19;
  }
  
  .secondary-dot {
    background-color: #fbbf24;
  }
  
  .unit-text {
    font-size: 22rpx;
    color: #999999;
  }
  
  .ranking-list {
    display: flex;
    flex-direction: column;
    gap: 30rpx;
  }
  
  .ranking-item {
    display: flex;
    gap: 20rpx;
  }
  
  .icon-box {
    width: 80rpx;
    height: 80rpx;
    border-radius: 16rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .food {
    background-color: #fee2e2;
  }
  
  .shopping {
    background-color: #dbeafe;
  }
  
  .house {
    background-color: #ede9fe;
  }
  
  .ranking-content {
    flex: 1;
  }
  
  .ranking-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16rpx;
  }
  
  .category {
    font-size: 26rpx;
    color: #333333;
  }
  
  .progress-bar {
    height: 8rpx;
    background-color: #f3f4f6;
    border-radius: 4rpx;
    overflow: hidden;
  }
  
  .progress {
    height: 100%;
    border-radius: 4rpx;
  }
  
  .progress.food {
    background-color: #ef4444;
  }
  
  .progress.shopping {
    background-color: #3b82f6;
  }
  
  .progress.house {
    background-color: #8b5cf6;
  }
  
  .tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100rpx;
    background: #FFFFFF;
    display: flex;
    padding: 10rpx 0;
    border-top: 2rpx solid #f3f4f6;
  }
  
  .tab-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .tab-text {
    font-size: 22rpx;
    color: #666666;
    margin-top: 8rpx;
  }
  
  .active-text {
    color: #f5af19;
  }
  
  .view-all {
    font-size: 26rpx;
    color: #f5af19;
  }
  </style>
  
  