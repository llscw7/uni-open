<template>
  <div class="transaction-list">
    <div class="day-group"
      v-for="(day, index) in ['2023-12-15', '2023-12-14', '2023-12-13', '2023-12-12', '2023-12-11', '2023-12-10', '2023-12-09']"
      :key="index">
      <div class="day-header" :style="{ top: dayWrapTop + 'px' }">
        <text class="day-date">{{ day }}</text>
        <div class="day-summary">
          <text class="income-text" v-if="day === '2023-12-15'">收入 ¥12,580</text>
          <text class="expense-text">支出 ¥428</text>
        </div>
      </div>

      <div class="transaction-items" @click="goToDetail()">
        <div class="transaction-item">
          <div class="class-icon">
            <div class="food-icon-yellow icon-size-40"></div>
          </div>
          <div class="transaction-info">
            <div class="transaction-title">海底捞火锅</div>
            <div class="transaction-subtitle">晚餐 · 与朋友聚餐</div>
          </div>
          <text class="transaction-amount expense">-¥ 428</text>
        </div>

        <div class="transaction-item">
          <div class="class-icon">
            <div class="food-icon-yellow icon-size-40"></div>
          </div>
          <div class="transaction-info">
            <div class="transaction-title">海底捞火锅</div>
            <div class="transaction-subtitle">晚餐 · 与朋友聚餐</div>
          </div>
          <text class="transaction-amount expense">-¥ 428</text>
        </div>
        <div class="transaction-item">
          <div class="class-icon">
            <div class="food-icon-yellow icon-size-40"></div>
          </div>
          <div class="transaction-info">
            <div class="transaction-title">海底捞火锅</div>
            <div class="transaction-subtitle">晚餐 · 与朋友聚餐</div>
          </div>
          <text class="transaction-amount expense">-¥ 428</text>
        </div>

        <div class="transaction-item" v-if="day === '2023-12-15'">
          <div class="class-icon">
            <div class="salary-icon-yellow icon-size-40"></div>
          </div>
          <div class="transaction-info">
            <div class="transaction-title">工资收入</div>
            <div class="transaction-subtitle">12 月工资</div>
          </div>
          <text class="transaction-amount income">+¥ 12,580</text>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue'
const props = defineProps({
  dayWrapTop: {
    type: Number,
    default: 0,
  },
});

// 解构 props 并保持响应性
const { dayWrapTop } = toRefs(props);

const goToDetail = () => {
  uni.navigateTo({
    url: '/pages/detail/index',
  });
};
</script>

<style lang="less" scoped>
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
  color: var(--primary-color);
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

.icon-size-30 {
  width: 30rpx;
  height: 30rpx;
}

.icon-size-36 {
  width: 36rpx;
  height: 36rpx;
}

.icon-size-40 {
  width: 40rpx;
  height: 40rpx;
}

.icon-size-60 {
  width: 60rpx;
  height: 60rpx;
}

.icon-size-70 {
  width: 70rpx;
  height: 70rpx;
}

.icon-size-80 {
  width: 80rpx;
  height: 80rpx;
}
</style>