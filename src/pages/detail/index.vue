
<template>
    <view class="container">
      <uni-fab :content="[{iconPath: 'plus'}]" horizontal="right" 
        :pattern="{backgroundColor: '#00B8A9'}" fixed direction="vertical" class="button-fab"/>
  
      <view class="nav-header">
        <view class="nav-content">
          <view class="nav-left">
            <uni-icons type="left" size="20" color="#333"/>
          </view>
          <view class="nav-title">账单分析</view>
          <view class="nav-right"></view>
        </view>
      </view>
  
      <view class="main-content">
        <view class="month-title">6月</view>
  
        <view class="budget-card">
          <view class="budget-header">
            <view class="budget-info">
              <text class="budget-title">月度预算</text>
              <text class="budget-desc">设置并跟踪您的月度支出目标</text>
            </view>
            <uni-icons type="wallet" size="24" color="#00B8A9"/>
          </view>
          <uni-button type="primary" class="budget-button">创建新预算</uni-button>
        </view>
  
        <view class="overview-section">
          <view class="section-header">
            <text class="section-title">收支概览</text>
            <text class="section-link">详情</text>
          </view>
          
          <view class="overview-cards">
            <view class="overview-card">
              <view class="card-header">
                <uni-icons type="top" size="12" color="#ef4444"/>
                <text class="card-label">支出</text>
              </view>
              <text class="card-amount expense">-¥4,980</text>
            </view>
            <view class="overview-card">
              <view class="card-header">
                <uni-icons type="bottom" size="12" color="#22c55e"/>
                <text class="card-label">收入</text>
              </view>
              <text class="card-amount income">¥5,000</text>
            </view>
          </view>
  
          <view class="chart-container" id="chart"></view>
        </view>
  
        <view class="details-section">
          <view class="section-header">
            <text class="section-title">分类明细</text>
            <view class="filter-buttons">
              <uni-button size="mini" class="filter-button">
                <uni-icons type="calendar" size="14"/>
                <text class="button-text">2023年6月</text>
              </uni-button>
              <uni-button size="mini" class="filter-button">
                <uni-icons type="list" size="14"/>
                <text class="button-text">全部</text>
              </uni-button>
            </view>
          </view>
  
          <view class="bill-list">
            <view class="bill-item">
              <view class="bill-date">6月15日 星期四</view>
              <view class="bill-content">
                <view class="icon-wrapper">
                  <uni-icons type="home" size="24" color="#00B8A9"/>
                </view>
                <view class="bill-info">
                  <text class="bill-title">房租</text>
                  <text class="bill-desc">月付房租</text>
                </view>
                <text class="bill-amount expense">-¥2,800</text>
              </view>
            </view>
  
            <view class="bill-item">
              <view class="bill-date">6月5日 星期一</view>
              <view class="bill-content">
                <view class="icon-wrapper">
                  <uni-icons type="wallet" size="24" color="#00B8A9"/>
                </view>
                <view class="bill-info">
                  <text class="bill-title">工资收入</text>
                  <text class="bill-desc">6月份工资</text>
                </view>
                <text class="bill-amount income">+¥5,000</text>
              </view>
            </view>
  
            <view class="bill-item">
              <view class="bill-date">6月1日 星期四</view>
              <view class="bill-content-group">
                <view class="bill-content">
                  <view class="icon-wrapper">
                    <uni-icons type="shop" size="24" color="#00B8A9"/>
                  </view>
                  <view class="bill-info">
                    <text class="bill-title">餐饮</text>
                    <text class="bill-desc">午餐</text>
                  </view>
                  <text class="bill-amount expense">-¥35</text>
                </view>
                <view class="bill-content">
                  <view class="icon-wrapper">
                    <uni-icons type="cart" size="24" color="#00B8A9"/>
                  </view>
                  <view class="bill-info">
                    <text class="bill-title">购物</text>
                    <text class="bill-desc">超市日用品</text>
                  </view>
                  <text class="bill-amount expense">-¥128</text>
                </view>
                <view class="bill-content">
                  <view class="icon-wrapper">
                    <uni-icons type="car" size="24" color="#00B8A9"/>
                  </view>
                  <view class="bill-info">
                    <text class="bill-title">交通</text>
                    <text class="bill-desc">地铁</text>
                  </view>
                  <text class="bill-amount expense">-¥7</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </template>
  
  <script lang="ts" setup>
  import { onMounted } from 'vue';
  import * as echarts from 'echarts';
  
  onMounted(() => {
    setTimeout(() => {
    const query = uni.createSelectorQuery().in(this);

    query.select('#chart').node((res) => {
      const chartDom = res;
      if (chartDom) {
        const chart = echarts.init(chartDom);
        const option = {
          grid: {
            top: 20,
            right: 20,
            bottom: 30,
            left: 40
          },
          xAxis: {
            type: 'category',
            data: Array.from({length: 31}, (_, i) => i + 1),
            axisLine: {
              lineStyle: {
                color: '#E5E7EB'
              }
            }
          },
          yAxis: {
            type: 'value',
            axisLine: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: '#E5E7EB'
              }
            }
          },
          series: [{
            name: '当月',
            type: 'line',
            smooth: true,
            data: Array.from({length: 31}, () => Math.floor(Math.random() * 1000)),
            itemStyle: {
              color: '#00B8A9'
            }
          }, {
            name: '3个月平均',
            type: 'line',
            smooth: true,
            lineStyle: {
              type: 'dashed'
            },
            data: Array.from({length: 31}, () => Math.floor(Math.random() * 1000)),
            itemStyle: {
              color: '#94A3B8'
            }
          }],
          legend: {
            data: ['当月', '3个月平均'],
            bottom: 0,
            textStyle: {
              color: '#64748B'
            }
          }
        };
        }
      });
    }, 300);
  });
  </script>
  
  <style>
  page {
    height: 100%;
    background-color: #F8F9FA;
  }
  
  .container {
    min-height: 100%;
    width: 750rpx;
    position: relative;
    padding-bottom: 160rpx;
  }
  
  .button-fab {
    right: 32rpx;
    bottom: 160rpx;
    width: 112rpx;
    height: 112rpx;
  }
  
  .nav-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(8px);
    z-index: 100;
    box-shadow: 0 4rpx 8rpx rgba(0,0,0,0.05);
  }
  
  .nav-content {
    height: 112rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32rpx;
  }
  
  .nav-left, .nav-right {
    width: 64rpx;
    height: 64rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .nav-title {
    font-size: 36rpx;
    font-weight: 600;
  }
  
  .main-content {
    padding: 144rpx 32rpx 0;
  }
  
  .month-title {
    font-size: 64rpx;
    font-weight: bold;
    margin-bottom: 48rpx;
  }
  
  .budget-card {
    background-color: white;
    border-radius: 16rpx;
    padding: 32rpx;
    margin-bottom: 48rpx;
    box-shadow: 0 8rpx 12rpx rgba(0,0,0,0.05);
    border: 2rpx solid #f1f1f1;
  }
  
  .budget-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 32rpx;
  }
  
  .budget-info {
    display: flex;
    flex-direction: column;
  }
  
  .budget-title {
    font-size: 36rpx;
    font-weight: 500;
    margin-bottom: 8rpx;
  }
  
  .budget-desc {
    font-size: 28rpx;
    color: #666;
  }
  
  .budget-button {
    width: 100%;
    border-radius: 8rpx !important;
  }
  
  .overview-section {
    margin-bottom: 48rpx;
  }
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32rpx;
  }
  
  .section-title {
    font-size: 36rpx;
    font-weight: 500;
  }
  
  .section-link {
    color: #00B8A9;
    font-size: 28rpx;
  }
  
  .overview-cards {
    display: flex;
    gap: 32rpx;
    margin-bottom: 32rpx;
  }
  
  .overview-card {
    flex: 1;
    background-color: white;
    border-radius: 16rpx;
    padding: 32rpx;
    box-shadow: 0 8rpx 12rpx rgba(0,0,0,0.05);
    border: 2rpx solid #f1f1f1;
  }
  
  .card-header {
    display: flex;
    align-items: center;
    gap: 8rpx;
    margin-bottom: 8rpx;
  }
  
  .card-label {
    font-size: 28rpx;
    color: #666;
  }
  
  .card-amount {
    font-size: 40rpx;
    font-weight: 600;
  }
  
  .expense {
    color: #ef4444;
  }
  
  .income {
    color: #22c55e;
  }
  
  .chart-container {
    background-color: white;
    border-radius: 16rpx;
    padding: 32rpx;
    height: 400rpx;
    box-shadow: 0 8rpx 12rpx rgba(0,0,0,0.05);
    border: 2rpx solid #f1f1f1;
  }
  
  .filter-buttons {
    display: flex;
    gap: 16rpx;
  }
  
  .filter-button {
    display: flex;
    align-items: center;
    padding: 8rpx 24rpx;
    background-color: white;
    border: 2rpx solid #e5e7eb;
    border-radius: 8rpx;
  }
  
  .button-text {
    font-size: 24rpx;
    margin-left: 8rpx;
  }
  
  .bill-list {
    display: flex;
    flex-direction: column;
    gap: 32rpx;
  }
  
  .bill-item {
    background-color: white;
    border-radius: 16rpx;
    padding: 32rpx;
    box-shadow: 0 8rpx 12rpx rgba(0,0,0,0.05);
    border: 2rpx solid #f1f1f1;
  }
  
  .bill-date {
    font-size: 28rpx;
    color: #666;
    margin-bottom: 32rpx;
  }
  
  .bill-content {
    display: flex;
    align-items: center;
  }
  
  .icon-wrapper {
    width: 88rpx;
    height: 88rpx;
    border-radius: 22rpx;
    background: linear-gradient(135deg, rgba(0,184,169,0.2) 0%, rgba(0,184,169,0.05) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  
  .bill-info {
    flex: 1;
    margin-left: 32rpx;
  }
  
  .bill-title {
    font-size: 32rpx;
    font-weight: 500;
    color: #333;
  }
  
  .bill-desc {
    font-size: 28rpx;
    color: #666;
    margin-top: 8rpx;
  }
  
  .bill-amount {
    font-size: 36rpx;
    font-weight: 500;
  }
  
  .bill-content-group {
    display: flex;
    flex-direction: column;
    gap: 32rpx;
  }
  </style>
  
  