
<template>
    <div class="page">
      <!-- <div class="header">
        <div class="header-content">
          <text class="logo">logo</text>
          <uni-icons type="notification" size="24" color="#FFFFFF"></uni-icons>
        </div>
      </div> -->
  
      <div class="main">
        <div class="search-section">
          <div class="search-wrapper">
            
            <div class="search-icon icon-size-24"></div>
            <input type="text" placeholder="搜索交易记录" class="search-input"/>
          </div>
          <div class="filter-btn">
            <div class="filter-icon icon-size-24"></div>
          </div>
        </div>
  
        <div class="bill-section">
          <div class="bill-header">
            <text class="bill-title">2023 年 12 月账单</text>
            <div class="switch-month">
                <div class="calendar-icon icon-size-24"></div>
                <text class="switch-text">切换月份</text>
            </div>
          </div>
  
          <div class="stats-cards">
            <div class="stats-card income">
              <div class="card-header">
                <div class="icon-wrapper">
                    <div class="upgrade-icon
                    icon-size-60"></div>
                </div>
                <text class="card-label">本月收入</text>
              </div>
              <text class="amount income-amount">¥ 12,580</text>
            </div>
  
            <div class="stats-card expense">
              <div class="card-header">
                <div class="icon-wrapper">
                    <div class="decline-icon
                    icon-size-60"></div>
                </div>
                <text class="card-label">本月支出</text>
              </div>
              <text class="amount expense-amount">¥ 8,320</text>
            </div>
  
            <div class="stats-card balance">
              <div class="card-header">
                <div class="icon-wrapper">
                  <div class="surplus-icon
                  icon-size-60"></div>
                </div>
                <text class="card-label">本月结余</text>
              </div>
              <text class="amount balance-amount">¥ 4,260</text>
            </div>
          </div>
        </div>
  
        <div class="budget-section">
          <div class="budget-card">
            <div class="budget-header">
              <text class="budget-title">本月支出预算</text>
              <text class="budget-percent">已使用 36.4%</text>
            </div>
            <div class="progress-bar">
              <div class="progress" style="width: 36.4%"></div>
            </div>
            <div class="budget-footer">
              <text class="used">已用 ¥ 1,820</text>
              <text class="remaining">剩余 ¥ 3,180</text>
            </div>
          </div>
        </div>
  
        <div class="transactions-section">
          <div class="transactions-header">
            <text class="section-title">近期交易</text>
            <text class="div-all">查看全部</text>
          </div>
  
          <scroll-div scroll-y class="transaction-list">
            <div class="day-group" v-for="(day, index) in ['2023-12-15', '2023-12-14', '2023-12-13', '2023-12-12', '2023-12-11', '2023-12-10', '2023-12-09']" :key="index">
              <div class="day-header">
                <text class="day-date">{{day}}</text>
                <div class="day-summary">
                  <text class="income-text" v-if="day === '2023-12-15'">收入 ¥12,580</text>
                  <text class="expense-text">支出 ¥428</text>
                </div>
              </div>
  
              <div class="transaction-items">
                <div class="transaction-item">
                    <div class="food-icon icon-size-80"></div>
                  <div class="transaction-info">
                    <div class="transaction-title">海底捞火锅</div>
                    <div class="transaction-subtitle">晚餐 · 与朋友聚餐</div>
                  </div>
                  <text class="transaction-amount expense">-¥ 428</text>
                </div>
  
                <div class="transaction-item" v-if="day === '2023-12-15'">
                    <div class="salary-icon icon-size-80"></div>
                  <div class="transaction-info">
                    <div class="transaction-title">工资收入</div>
                    <div class="transaction-subtitle">12 月工资</div>
                  </div>
                  <text class="transaction-amount income">+¥ 12,580</text>
                </div>
              </div>
            </div>
          </scroll-div>
        </div>
      </div>
  
      <div class="add-button">
        <uni-icons type="plusempty" size="24" color="#FFFFFF"></uni-icons>
      </div>
  
      <div class="tab-bar">
        <div class="tab-item active">
          <div class="home-icon icon-size-40"></div>
          <text class="tab-text">首页</text>
        </div>
        <div class="tab-item">
          <div class="statistics-icon icon-size-40"></div>
          <text class="tab-text">统计</text>
        </div>
        <div class="tab-item">
          <div class="mine-icon icon-size-40"></div>
          <text class="tab-text">我的</text>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  // 组件逻辑
  </script>
  
  <style>
  page {
    height: 100%;
    background-color: #F9FAFB;
  }
  
  .page {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .header {
    background-color: #6366F1;
    padding: 0 30rpx;
    height: 88rpx;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }
  
  .header-content {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .logo {
    font-size: 36rpx;
    color: #FFFFFF;
    font-family: 'Pacifico';
  }
  
  .main {
    flex: 1;
    /* margin-top: 88rpx; */
    margin-bottom: 98rpx;
    padding: 0 30rpx;
    padding-bottom: 200rpx;
  }
  
  .search-section {
    position: sticky;
    /* top: 88rpx; */
    top: 0;
    background-color: #F9FAFB;
    padding: 20rpx 0;
    z-index: 90;
    display: flex;
    gap: 20rpx;
  }
  
  .search-wrapper {
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
    background-color: #FFFFFF;
    border-radius: 16rpx;
    overflow: hidden;
  }
  
  .search-input {
    width: 100%;
    height: 80rpx;
    background: #FFFFFF;
    padding: 0 80rpx;
    font-size: 28rpx;
  }
  
  .search-wrapper .uni-icons {
    position: absolute;
    left: 30rpx;
  }
  
  .filter-btn {
    width: 80rpx;
    height: 80rpx;
    background: #FFFFFF;
    border-radius: 16rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .bill-section {
    margin-bottom: 40rpx;
  }
  
  .bill-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rpx;
  }
  
  .bill-title {
    font-size: 32rpx;
    font-weight: 500;
  }
  
  .switch-month {
    display: flex;
    align-items: center;
    color: #6366F1;
  }
  
  .switch-text {
    font-size: 24rpx;
    margin-left: 8rpx;
  }
  
  .stats-cards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20rpx;
  }
  
  .stats-card {
    padding: 30rpx;
    border-radius: 32rpx;
  }
  
  .stats-card.income {
    background: linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(34, 197, 94, 0.1) 100%);
  }
  
  .stats-card.expense {
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(239, 68, 68, 0.1) 100%);
  }
  
  .stats-card.balance {
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(139, 92, 246, 0.1) 100%);
  }
  
  .card-header {
    display: flex;
    align-items: center;
    margin-bottom: 16rpx;
  }
  
  .icon-wrapper {
    width: 64rpx;
    height: 64rpx;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16rpx;
  }
  
  .card-label {
    font-size: 24rpx;
    color: #666666;
  }
  
  .amount {
    font-size: 40rpx;
    font-weight: 500;
  }
  
  .income-amount {
    color: #22C55E;
  }
  
  .expense-amount {
    color: #EF4444;
  }
  
  .balance-amount {
    color: #8B5CF6;
  }
  
  .budget-section {
    margin-bottom: 40rpx;
  }
  
  .budget-card {
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(99, 102, 241, 0.1) 100%);
    border-radius: 32rpx;
    padding: 24rpx;
  }
  
  .budget-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12rpx;
  }
  
  .budget-title {
    font-size: 28rpx;
    font-weight: 500;
  }
  
  .budget-percent {
    font-size: 24rpx;
    color: #666666;
  }
  
  .progress-bar {
    width: 100%;
    height: 10rpx;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 10rpx;
    overflow: hidden;
    margin-bottom: 12rpx;
  }
  
  .progress {
    height: 100%;
    background-color: #6366F1;
    border-radius: 10rpx;
    transition: width 0.5s ease;
  }
  
  .budget-footer {
    display: flex;
    justify-content: space-between;
  }
  
  .used {
    font-size: 24rpx;
    color: #666666;
  }
  
  .remaining {
    font-size: 24rpx;
    color: #6366F1;
    font-weight: 500;
  }
  
  .transactions-section {
    margin-bottom: 40rpx;
  }
  
  .transactions-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30rpx;
  }
  
  .section-title {
    font-size: 36rpx;
    font-weight: 500;
  }
  
  .div-all {
    font-size: 28rpx;
    color: #6366F1;
  }
  
  .day-group {
    margin-bottom: 40rpx;
  }
  
  .day-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rpx;
    position: sticky;
    top: 110rpx;
    background-color: #F9FAFB;
    padding: 16rpx 0;
    z-index: 80;
  }
  
  .day-date {
    font-size: 28rpx;
    color: #666666;
  }
  
  .day-summary {
    display: flex;
    gap: 24rpx;
    font-size: 28rpx;
  }
  
  .income-text {
    color: #22C55E;
  }
  
  .expense-text {
    color: #EF4444;
  }
  
  .transaction-items {
    display: flex;
    flex-direction: column;
    gap: 24rpx;
  }
  
  .transaction-item {
    display: flex;
    align-items: center;
    background: #FFFFFF;
    padding: 24rpx;
    border-radius: 16rpx;
  }

  .transaction-info {
    flex: 1;
    margin-left: 24rpx;
  }
  
  .transaction-title {
    font-size: 32rpx;
    font-weight: 500;
    height: 42rpx;
    line-height: 42rpx;
  }
  
  .transaction-subtitle {
    font-size: 28rpx;
    color: #666666;
    height: 40rpx;
    line-height: 40rpx;
  }
  
  .transaction-amount {
    font-size: 32rpx;
    font-weight: 500;
  }
  
  .transaction-amount.expense {
    color: #EF4444;
  }
  
  .transaction-amount.income {
    color: #22C55E;
  }
  
  .add-button {
    position: fixed;
    right: 30rpx;
    bottom: 160rpx;
    width: 112rpx;
    height: 112rpx;
    background-color: #6366F1;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8rpx 16rpx rgba(99, 102, 241, 0.2);
    z-index: 100;
  }
  
  .tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 130rpx;
    background: #FFFFFF;
    border-top: 2rpx solid #E5E7EB;
    display: flex;
    padding: 0 48rpx;
    padding-bottom: 10rpx;
    z-index: 100;
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
    color: #999999;
    margin-top: 8rpx;
  }
  
  .tab-item.active .tab-text {
    color: #6366F1;
  }

  .icon-size-24 {
    width: 24rpx;
    height: 24rpx;
  }

  .icon-size-40 {
    width: 40rpx;
    height: 40rpx;
  }
  
  .icon-size-60 {
    width: 60rpx;
    height: 60rpx;
  }

  .icon-size-80 {
    width: 80rpx;
    height: 80rpx;
  }

  .search-icon {
    position: absolute;
    left: 28rpx;
  }

  </style>
  
  