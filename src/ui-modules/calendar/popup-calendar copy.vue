<template>
  <UIPopup :visible="show" :setVisible="setShow" :z-index="props.zIndex">
    <view class="calendar-container" v-if="show">
      <!-- 头部：显示当前年月和切换按钮 -->
      <view class="header">
        <div class="header-date">
          <text class="month">{{ currentDate.format('YYYY年MM月') }}</text>
        </div>
        <div class="header-options">
          <div class="arrow-icon-wrap" :class="{ 'disabled': notSelectMonth('left') }" @click="switchMonth(-1)">
            <div class="left-arrow-icon-3"></div>
          </div>
          <div class="arrow-icon-wrap" :class="{ 'disabled': notSelectMonth('right') }" @click="switchMonth(1)">
            <div class="right-arrow-icon-3"></div>
          </div>
        </div>
      </view>

      <!-- 星期栏 -->
      <view class="weekdays">
        <text v-for="(w, i) in ['日', '一', '二', '三', '四', '五', '六']" :key="i">{{ w }}</text>
      </view>

      <!-- 日期网格 -->
      <view class="days-grid">
        <view v-for="(day, index) in days" :key="index" class="day-item" :class="{
          'empty': day.empty,
          'actived': isSelected(day),
          'today': isToday(day),
          'disabled': day.date && (day.date.isBefore(props.minDate) || day.date.isAfter(props.maxDate))
        }" @click="handleDayClick(day)">
          <text class="day-number">{{ day.day }}</text>
        </view>
      </view>
    </view>
  </UIPopup>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import dayjs from 'dayjs';
import UIPopup from '@/ui-modules/popup/index.vue';

const props = defineProps({
  defaultValue: {
    type: Date,
  },
  zIndex: {
    type: Number,
    default: 999
  },
  maxDate: {
    type: Date,
    default: () => new Date()
  },
  minDate: {
    type: Date,
    default: () => dayjs().subtract(1, 'year').toDate()
  },
  show: {
    type: Boolean,
    required: true
  },
  setShow: {
    type: Function,
    required: true
  }
});

// 当前日期
const currentDate = ref(dayjs());

const selectDay = ref<dayjs.Dayjs | undefined>(props.defaultValue ? dayjs(props.defaultValue) : undefined);

const popupRef = ref();

/** 生成日历数据 */
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
/** 生成日历数据 */

// 监听show变化，初始化当前日期，确保每次打开日历都是选中日期的月份
watch(() => props.show, (val) => {
  if (val) {
    currentDate.value = selectDay.value || dayjs();
  }
});

// 月份切换
const switchMonth = (step: number) => {
  if(step === 1 && currentDate.value.isSame(props.maxDate, 'month')) return;
  if(step === -1 && currentDate.value.isSame(props.minDate, 'month')) return;
  currentDate.value = currentDate.value.add(step, 'month');
};

// 日期点击事件
const handleDayClick = (day: DayParam) => {
  if(props.minDate && day.date?.isBefore(dayjs(props.minDate))) return;
  if(props.maxDate && day.date?.isAfter(dayjs(props.maxDate))) return;
  if (!day.empty) {
    selectDay.value = day.date;
    emit('confirm', day.date);
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

const open = async () => {
  if (popupRef.value) {
    popupRef.value.open();
  } else {
    console.error('popupRef is not defined');
  }
};

const close = () => {
  if (popupRef.value) {
    popupRef.value.close();
  } else {
    console.error('popupRef is not defined');
  }
};

const notSelectMonth = (direction: 'left' | 'right') => {
  if (direction === 'left') {
    return currentDate.value.isSame(props.minDate, 'month');
  } else {
    return currentDate.value.isSame(props.maxDate, 'month');
  }
};

const emit = defineEmits(['confirm', 'cancel']);

defineExpose({ open, close });
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

.arrow-icon-wrap {
  width: 50rpx;
  height: 50rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.arrow-icon-wrap.disabled {
  cursor: not-allowed;
  opacity: 0.4;
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

.day-item.disabled {
  color: #ccc;
}
</style>