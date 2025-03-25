
<template>
    <!-- 用于弹窗展示时，阻止页面滚动 -->
    <page-meta :page-style="popupDateShow ? 'overflow: hidden;' : 'overflow: auto;'" />
    <div class="page" :style="{ paddingTop: navbarHeight + 'px' }">
      <div class="header" :style="{ height: navbarHeight + 'px' }">

        <div class="header-content">
           <div class="title" :style="{ top: titleTop + 'px' }">记账本</div>
        </div>

        <div class="tools-section" :style="{ top: toolsWrapTop + 'px' }">
          <div class="tools-left-wrap">
            <div class="book-btn tools-btn">
              <div class="book-icon icon-size-40"></div>
              <div class="text">总账本</div>
            </div>
          </div>
          <div class="tools-right-wrap">
            <div class="search-btn tools-btn" @click="goToPage('/pages/search/index')">
              <div class="search-icon-2 icon-size-40"></div>
              <div class="text">搜索</div>
            </div>
            <div class="filter-btn tools-btn">
              <div class="filter-icon icon-size-40"></div>
              <div class="text">筛选</div>
            </div>
          </div>
        </div>

      </div>

      
  
      <div class="main">
        <div class="bill-section">
          <div class="bill-header">
            <text class="bill-title" @click="openPopupDate">{{ billDate }}</text>
            <!-- <text class="bill-title">2023年12月11日</text> -->
            <div class="down-arrow-icon icon-size-40"></div>
            <div class="switch-month" v-if="false">
                <div class="calendar-icon icon-size-36"></div>
                <text class="switch-text">切换日期</text>
            </div>
          </div>
  
          <div class="stats-cards">
            <div class="stats-card income">
              <div class="card-header">
                <div class="icon-wrapper">
                    <div class="upgrade-icon
                    icon-size-70"></div>
                </div>
                <text class="card-label">本月收入</text>
              </div>
              <text class="amount income-amount">¥ 12,580</text>
            </div>
  
            <div class="stats-card expense">
              <div class="card-header">
                <div class="icon-wrapper">
                    <div class="decline-icon
                    icon-size-70"></div>
                </div>
                <text class="card-label">本月支出</text>
              </div>
              <text class="amount expense-amount">¥ 8,320</text>
            </div>
  
            <div class="stats-card balance">
              <div class="card-header">
                <div class="icon-wrapper">
                  <div class="surplus-icon
                  icon-size-70"></div>
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
          </div>

          <TransactionList :dayWrapTop="navbarHeight" />
        </div>
      </div>
  
      <div class="add-button">
        <div class="add-icon icon-size-60"></div>
      </div>
      
      <FooterNav />
      
      <PopupDate :visible="popupDateShow" :setVisible="setPopupDateShow" @submit="handlePopupDateSubmit" />
    </div>
  </template>
  
  <script lang="ts" setup>
import { ref, onMounted } from 'vue';
import TransactionList from '@/components/transaction-list/index.vue';
import { getCapsulePosition } from '@/utils/tool';
import PopupDate from '@/components/popup-date/index.vue'
import dayjs from 'dayjs';
import FooterNav from '@/components/footer-nav/index.vue';

interface PopupDateSubmitParam {
  type: number;  
  startDate?: dayjs.Dayjs;
  endDate?: dayjs.Dayjs;
  year?: number;
  month?: number;
  day?: number;
}

const titleTop = ref(0);
const navbarHeight = ref(0);
const toolsWrapTop = ref(0);
const billDate = ref(dayjs().format('YYYY年MM月'));

/** popup弹窗 */
const popupDateShow = ref(false)
const setPopupDateShow = (flag: boolean) => {
  popupDateShow.value = flag
}
/** popup弹窗 */

onMounted(() => {
  // calculateTitlePosition();
  initHeader()
});

const goToPage = (url: string) => {
  uni.navigateTo({
    url: url,
  });
}

const initHeader = () => {
  // #ifdef MP-WEIXIN
  const { capsuleCenter, capsuleBottom } = getCapsulePosition();
  titleTop.value = capsuleCenter - 26 / 2;
  navbarHeight.value = capsuleBottom + 62;
  toolsWrapTop.value = capsuleBottom;
  // #endif
  // #ifndef MP-WEIXIN
  titleTop.value = 61;
  navbarHeight.value = 152;
  toolsWrapTop.value = 90;
  // #endif
  console.log(titleTop.value, navbarHeight.value, toolsWrapTop.value);
}

const handlePopupDateSubmit = (dates: PopupDateSubmitParam) => {
  console.log(dates, '-----dates')
  if(dates.type === 4) {
    billDate.value = `${dates.startDate?.format('YYYY年MM月DD日')}-${dates.endDate?.format('YYYY年MM月DD日')}`;
  }
  else if (dates.type === 3) {
    billDate.value = `${dates.year}年`;
  }
  else if (dates.type === 2) {
    billDate.value = `${dates.year}年${dates.month}月`;
  }
  else if (dates.type === 1) {
    billDate.value = `${dates.year}年${dates.month}月${dates.day}日`;
  }

  setPopupDateShow(false)
}

/**
 * 打开日期选择弹窗
 */
const openPopupDate = () => {
  setPopupDateShow(true)
}
  </script>
  
  <style lang="less" scoped>

  .page {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
    background-color: var(--background-color);
  }
  
  .header {
    background-color: var(--primary-color);
    padding: 0 30rpx;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }
  
  .header-content {
    height: 100%;
    .chat-icon {
      position: absolute;
      bottom: 50rpx;
    }
    .title {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font-size: 46rpx;
      color: #FFFFFF;
      line-height: 1;
    }
  }
  
  .logo {
    font-size: 36rpx;
    color: #FFFFFF;
    font-family: 'Pacifico';
  }
  
  .main {
    flex: 1;
    padding: 0 30rpx;
    padding-bottom: 200rpx;
  }
  
  .tools-section {
    position: absolute;
    left: 0;
    right: 0;
    padding: 20rpx 20rpx 16rpx 20rpx;
    box-sizing: border-box;
    z-index: 90;
    display: flex;
    justify-content: space-between;
  }

  .tools-left-wrap {
    display: flex;
    gap: 20rpx;
  }

  .tools-right-wrap {
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

  .tools-btn {
    padding: 16rpx 20rpx;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 16rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    .text {
      margin-left: 10rpx;
      font-size: 30rpx;
      color: #FFFFFF;
      font-weight: bold;
    }
  }
  
  .bill-section {
    margin-bottom: 40rpx;
  }
  
  .bill-header {
    display: flex;
    // justify-content: space-between;
    align-items: center;
    margin: 28rpx 0 20rpx;
    height: 56rpx;
  }
  
  .bill-title {
    font-size: 36rpx;
    font-weight: 500;
  }
  
  .switch-month {
    display: flex;
    align-items: center;
    color: var(--primary-color);
  }
  
  .switch-text {
    font-size: 30rpx;
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
    background: var(--budget-background-color);
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
    background-color: var(--primary-color);
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
    color: var(--primary-color);
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
    color: var(--primary-color);
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
    top: 204rpx;
    background-color: #F9FAFB;
    padding: 16rpx 0;
    z-index: 80;
  }
  
  .day-date {
    font-size: 28rpx;
    font-weight: bold;
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
    background-color: var(--primary-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8rpx 16rpx rgba(99, 102, 241, 0.2);
    z-index: 100;
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

  </style>
  
  