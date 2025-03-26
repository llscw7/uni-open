
<template>
    <UIPopup :visible="visible" :set-visible="setVisible" :z-index="2000">
        <view class="content">
          <view class="header">
            <view class="left">
              <uni-icons type="closeempty" size="24" color="#666666" />
            </view>
            <view class="right">
              <view class="card-btn">
                <uni-icons type="wallet" size="16" color="#666666" />
                <text class="btn-text">卡片</text>
              </view>
              <button class="add-btn" type="primary">添加</button>
            </view>
          </view>
  
          <view class="account-list">
            <view class="account-item" v-for="(item, index) in accounts" :key="index">
              <view class="account-icon" :style="{ backgroundColor: item.bgColor }">
                <uni-icons :type="item.icon" size="24" color="#FFFFFF" />
              </view>
              <view class="account-info">
                <view class="account-detail">
                  <view class="account-main">
                    <text class="account-name">{{ item.name }}</text>
                    <text class="account-desc">{{ item.desc }}</text>
                  </view>
                  <text class="account-amount" :class="item.amountClass">{{ item.amount }}</text>
                </view>
              </view>
            </view>
          </view>
  
          <view class="footer">
            <text class="reload">重新加载数据</text>
          </view>
        </view>
    </UIPopup>
</template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  import UIPopup from '@/ui-modules/popup/index.vue';
const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    setVisible: {
        type: Function,
        required: true
    }
})
  const accounts = ref([
    {
      name: '支付宝',
      desc: '余额宝',
      amount: '¥ 875.00',
      icon: 'wallet',
      bgColor: '#60A5FA',
      amountClass: 'amount-green'
    },
    {
      name: '微信钱包',
      desc: '零钱',
      amount: '¥ 2,000.00',
      icon: 'wallet',
      bgColor: '#22C55E',
      amountClass: 'amount-green'
    },
    {
      name: '招商银行',
      desc: '信用卡 可用额度: 480.00',
      amount: '-¥ 20.00',
      icon: 'wallet',
      bgColor: '#EF4444',
      amountClass: 'amount-red'
    },
    {
      name: '不选择具体账户',
      desc: '仅计入收支账单，不计入资产',
      amount: '¥ 0.00',
      icon: 'wallet',
      bgColor: '#9CA3AF',
      amountClass: 'amount-gray'
    }
  ])
  </script>
  
  <style>
  .content {
    width: 100%;
    background-color: #FFFFFF;
    border-radius: 32rpx 32rpx 0 0;
    padding: 32rpx;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 48rpx;
  }
  
  .left {
    width: 64rpx;
    height: 64rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .right {
    display: flex;
    align-items: center;
    gap: 24rpx;
  }
  
  .card-btn {
    display: flex;
    align-items: center;
    background-color: #f3f4f6;
    padding: 12rpx 24rpx;
    border-radius: 16rpx;
  }
  
  .btn-text {
    font-size: 14px;
    color: #666666;
    margin-left: 8rpx;
  }
  
  .add-btn {
    padding: 12rpx 32rpx;
    border-radius: 16rpx;
    font-size: 14px;
    background-color: #f5af19;
    margin: 0;
  }
  
  .account-list {
    display: flex;
    flex-direction: column;
    gap: 32rpx;
  }
  
  .account-item {
    display: flex;
    align-items: center;
    padding: 16rpx;
  }
  
  .account-icon {
    width: 80rpx;
    height: 80rpx;
    border-radius: 40rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  
  .account-info {
    flex: 1;
    margin-left: 24rpx;
  }
  
  .account-detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .account-main {
    display: flex;
    flex-direction: column;
  }
  
  .account-name {
    font-size: 16px;
    font-weight: 500;
    color: #1F2937;
  }
  
  .account-desc {
    font-size: 12px;
    color: #6B7280;
    margin-top: 4rpx;
  }
  
  .amount-green {
    color: #22C55E;
  }
  
  .amount-red {
    color: #EF4444;
  }
  
  .amount-gray {
    color: #6B7280;
  }
  
  .footer {
    margin-top: 48rpx;
    padding-top: 32rpx;
    border-top: 2rpx solid #F3F4F6;
  }
  
  .reload {
    display: block;
    width: 100%;
    text-align: center;
    color: #f5af19;
    font-size: 14px;
  }
  </style>
  
  