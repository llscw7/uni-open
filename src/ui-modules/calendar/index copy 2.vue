<template>
    <view class="calendar-container">
      <!-- 头部：显示当前年月和切换按钮 -->
      <view class="header">
        <text class="arrow" @click="switchMonth(-1)">◀</text>
        <text class="month">{{ currentDate.toFormat('yyyy年MM月') }}</text>
        <text class="arrow" @click="switchMonth(1)">▶</text>
      </view>
  
      <!-- 星期栏 -->
      <view class="weekdays">
        <text v-for="(w, i) in ['日','一','二','三','四','五','六']" :key="i">{{ w }}</text>
      </view>
  
      <!-- 日期网格 -->
      <view class="days-grid">
        <view
          v-for="(day, index) in days"
          :key="index"
          class="day-item"
          :style="getDayStyle(day)"
          @click="handleDayClick(day)"
        >
          <text class="day-number">{{ day.day }}</text>
          <text class="lunar">{{ day.lunar }}</text>
        </view>
      </view>
    </view>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import { DateTime } from 'luxon'; // 引入 Luxon
  import { Solar, Lunar } from 'lunar-typescript'; // 引入 lunar-typescript
  
  // 当前日期
  const currentDate = ref(DateTime.local());
  
  // 生成日历数据
  const days = computed(() => {
    const firstDayOfMonth = currentDate.value.startOf('month');
    const startDay = firstDayOfMonth.weekday; // 当前月第一天是星期几
    const totalDays = currentDate.value.daysInMonth; // 当前月的总天数
  
    // 生成日期数组
    const daysArray = [];
    for (let i = 1; i <= totalDays; i++) {
      const date = firstDayOfMonth.plus({ days: i - 1 });
      const solar = Solar.fromDate(date.toJSDate());
      const lunar = Lunar.fromDate(date.toJSDate());
      daysArray.push({
        day: i,
        date,
        lunar: `${lunar.getDayInChinese()}`, // 农历
        // lunar: `${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`, // 农历
      });
    }
  
    // 填充空白
    return [
      ...Array.from({ length: startDay }, () => ({ empty: true })),
      ...daysArray,
    ];
  });
  
  // 月份切换
  const switchMonth = (step: number) => {
    currentDate.value = currentDate.value.plus({ months: step });
  };
  
  // 日期点击事件
  const handleDayClick = (day: { day: number; date: DateTime }) => {
    if (!day.empty) {
      console.log('选中日期:', day.date.toFormat('yyyy-MM-dd'));
    }
  };
  
  // 日期样式
  const getDayStyle = (day: { empty?: boolean }) => {
    if (day.empty) {
      return { visibility: 'hidden' };
    }
    return {};
  };
  </script>
  
  <style scoped>
  .calendar-container {
    width: 100%;
    padding: 20rpx;
    background-color: #fff;
    border-radius: 10rpx;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10rpx 0;
  }
  
  .arrow {
    font-size: 32rpx;
    cursor: pointer;
  }
  
  .month {
    font-size: 32rpx;
    font-weight: bold;
  }
  
  .weekdays {
    display: flex;
    justify-content: space-between;
    padding: 10rpx 0;
  }
  
  .weekdays text {
    flex: 1;
    text-align: center;
    font-size: 28rpx;
    color: #666;
  }
  
  .days-grid {
    display: flex;
    flex-wrap: wrap;
  }
  
  .day-item {
    width: 14.28%;
    text-align: center;
    padding: 10rpx 0;
    font-size: 28rpx;
  }
  
  .day-number {
    display: block;
  }
  
  .lunar {
    font-size: 20rpx;
    color: #999;
  }
  </style>