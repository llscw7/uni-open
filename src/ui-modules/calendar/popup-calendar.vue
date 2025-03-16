<template>
  <UIPopup ref="popupRef" :z-index="props.zIndex">
      <view class="calendar-container">
          <!-- 头部：显示当前年月和切换按钮 -->
          <view class="header">
              <div class="header-date">
                  <text class="month">{{ currentDate.format('YYYY年MM月') }}</text>
              </div>
              <div class="header-options">
                  <div class="left-arrow-icon icon-size-60" @click="switchMonth(-1)"></div>
                  <div class="right-arrow-icon icon-size-60" @click="switchMonth(1)"></div>
              </div>
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
              :class="{ 
                  'empty': day.empty,
                  'actived': isSelected(day),
                  'today': isToday(day),
              }"
              @click="handleDayClick(day)"
              >
              <text class="day-number">{{ day.day }}</text>
              </view>
          </view>
      </view>
  </UIPopup>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import dayjs from 'dayjs';
import UIPopup from '@/ui-modules/popup/index.vue';

// 定义 DayParam 类型
interface DayParam {
  day?: number;
  date?: dayjs.Dayjs;
  empty?: boolean;
}

const props = defineProps({
  zIndex: {
      type: Number,
      default: 999
  }
});

// 当前日期
const currentDate = ref(dayjs());

const selectDay = ref<dayjs.Dayjs>();

const popupRef = ref();

// 生成日历数据
const days = computed<DayParam[]>(() => {
  const firstDayOfMonth = currentDate.value.startOf('month');
  const startDay = firstDayOfMonth.day(); // 当前月第一天是星期几
  const totalDays = currentDate.value.daysInMonth(); // 当前月的总天数

  // 生成日期数组
  const daysArray = [];
  for (let i = 1; i <= totalDays; i++) {
      const date = firstDayOfMonth.date(i);
      daysArray.push({
          day: i,
          date,
      });
  }
  if (startDay === 0) return daysArray; // 无需填充空白

  // 填充空白
  return [
      ...Array.from({ length: startDay }, () => ({ empty: true })),
      ...daysArray,
  ];
});

// 月份切换
const switchMonth = (step: number) => {
  currentDate.value = currentDate.value.add(step, 'month');
};

// 日期点击事件
const handleDayClick = (day: DayParam) => {
  if (!day.empty) {
      selectDay.value = day.date;
      console.log('选中日期:', day.date?.format('YYYY-MM-DD'));
  }
};

// 判断日期是否选中
const isSelected = (day: DayParam) => {
  return selectDay.value && day.date?.isSame(selectDay.value, 'day');
};

// 判断是否为当天
const isToday = (day: DayParam) => {
  return day.date?.isSame(dayjs(), 'day');
};

const open = () => {
  if (popupRef.value) {
      popupRef.value.open();
  } else {
      console.error('popupRef is not defined');
  }
};

defineExpose({ open });
</script>

  
  <style lang="less" scoped>
  .calendar-container {
    width: 100%;
    height: 760rpx;
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
    margin-bottom: 32rpx;
  }

  .header-options {
    width: 140rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
    // height: 640rpx; /* 固定高度 */
    display: grid;
    grid-gap: 20rpx;
    grid-template-columns: repeat(7, 1fr);
    // grid-auto-rows: calc((640rpx - 5 * 20rpx) / 6); // ios存在bug，第一行不展示
  }
  
  .day-item {
    aspect-ratio: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .day-number {
    display: block;
  }
  
  .empty {
    visibility: hidden;
  }

  .day-item.actived {
    background-color: var(--primary-color);
    color: #fff;
    border-radius: 50%;
    .day-number {
      color: #fff;
    }
  }

  .today {
    border: 1px solid var(--primary-color);
    border-radius: 50%;
    color: var(--primary-color);
  }
  </style>