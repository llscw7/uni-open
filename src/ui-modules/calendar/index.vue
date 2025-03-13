<template>
    <div class="calendar-container">
      <!-- 头部：显示当前年月和切换按钮 -->
      <div class="header">
        <text class="arrow" @click="switchMonth(-1)">◀</text>
        <text class="month">{{ currentYear }}年{{ currentMonth + 1 }}月</text>
        <text class="arrow" @click="switchMonth(1)">▶</text>
      </div>
  
      <!-- 星期栏 -->
      <div class="weekdays">
        <text v-for="(w, i) in ['日','一','二','三','四','五','六']" :key="i">{{ w }}</text>
      </div>
  
      <!-- 日期网格 -->
      <div class="days-grid">
        <div
          v-for="(day, index) in days"
          :key="index"
          class="day-item"
          :class="{ 
            'empty': day.empty,
            'actived': day.date?.toDateString() === selectDay?.toDateString(),
            'today': day.date?.toDateString() === new Date().toDateString(),
          }"
          @click="handleDayClick(day)"
        >
          <text class="day-number">{{ day.day }}</text>
          <text class="lunar">{{ day.lunar }}</text>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, ComputedRef } from 'vue';
  import { Solar, Lunar } from 'lunar-typescript'; // 引入 lunar-typescript
  
  // 当前日期
  const currentDate = ref(new Date());
  const currentYear = computed(() => currentDate.value.getFullYear());
  const currentMonth = computed(() => currentDate.value.getMonth());
  
  const selectDay = ref();

  // 定义 DayParam 类型
  interface DayParam {
    day?: number;
    date?: Date;
    lunar?: string;
    empty?: boolean;
  }

  // 生成日历数据
  const days: ComputedRef<DayParam[]> = computed(() => {
    const year = currentYear.value;
    const month = currentMonth.value;
    const firstDayOfMonth = new Date(year, month, 1);
    const startDay = firstDayOfMonth.getDay(); // 当前月第一天是星期几
    const totalDays = new Date(year, month + 1, 0).getDate(); // 当前月的总天数
  
    // 生成日期数组
    const daysArray = [];
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(year, month, i);
      const solar = Solar.fromDate(date);
      const lunar = Lunar.fromDate(date);
      daysArray.push({
        day: i,
        date,
        lunar: `${lunar.getDayInChinese()}`, // 农历
      });
    }
  
    // 填充空白
    return [
      ...Array.from({ length: startDay }, () => ({ empty: true })),
      ...daysArray,
    ];
  });

  setTimeout(()=>{
    console.log(days.value,'-----adsfasdf')
  }, 500)
  
  // 月份切换
  const switchMonth = (step: number) => {
    const newDate = new Date(currentDate.value);
    newDate.setMonth(currentMonth.value + step);
    currentDate.value = newDate;
  };
  
  // 日期点击事件
  const handleDayClick = (day: DayParam) => {
    if (!day.empty && day.date) {
      console.log(day.date,' -----adfa888888')
      selectDay.value = day.date;
      console.log('选中日期:', day.date?.toISOString().split('T')[0]);
    }
  };
  
  // 日期样式
  // const getDayStyle = (day: DayParam) => {
  //     if (day.empty) {
  //       return { visibility: 'hidden' as any };
  //     }
  //     return {};
  //   };
  </script>
  
  <style lang="less" scoped>
  .calendar-container {
    width: 100%;
    padding: 20rpx;
    background-color: #fff;
    border-radius: 10rpx;
    box-sizing: border-box;
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
    border-radius: 30rpx;
  }
  
  .day-number {
    display: block;
  }
  
  .lunar {
    font-size: 20rpx;
    color: #999;
  }

  .empty {
    visibility: hidden;
  }

  .day-item.actived {
    background-color: var(--primary-color);
    .day-number {
      color: #fff;
    }
    .lunar {
      color: #fff;
    }
  }

  .today {
    color: var(--primary-color);
    .lunar {
      color: var(--primary-color);
    }
  }
  </style>