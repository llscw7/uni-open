<template>
    <div class="dialog-calendar" v-if="show" :style="{ zIndex: zIndex }" @click="setShow(false)"
    @touchmove.stop.prevent>
        <view class="calendar-container" @click.stop>
            <!-- 头部：显示当前年月和切换按钮 -->
            <view class="header">
                <div class="header-date">
                    <text class="month">{{ currentDate.format('YYYY年MM月') }}</text>
                </div>
                <div class="header-options">
                    <div class="arrow-icon-wrap" :class="{ 'disabled': notSelectMonth('left') }"
                        @click="switchMonth(-1)">
                        <div class="left-arrow-icon-3"></div>
                    </div>
                    <div class="arrow-icon-wrap" :class="{ 'disabled': notSelectMonth('right') }"
                        @click="switchMonth(1)">
                        <div class="right-arrow-icon-3"></div>
                    </div>
                </div>
            </view>

            <!-- 星期栏 -->
            <view class="weekdays">
                <text v-for="(w, i) in ['日', '一', '二', '三', '四', '五', '六']" :key="i">{{ w }}</text>
            </view>

            <!-- 日期网格 -->
            <swiper class="swiper-container" :current="currentMonthIndex" @change="onSwiperChange">
                <swiper-item v-for="(month, index) in months" :key="index">
                    <view class="days-grid">
                        <view v-for="(day, dayIndex) in getDaysForMonth(month)" :key="dayIndex" class="day-item" :class="{
                            'empty': day.empty,
                            'actived': isSelected(day),
                            'today': isToday(day),
                            'disabled': day.date && (day.date.isBefore(props.minDate) || day.date.isAfter(props.maxDate))
                        }" @click="handleDayClick(day)">
                            <text class="day-number">{{ day.day }}</text>
                        </view>
                    </view>
                </swiper-item>
            </swiper>
        </view>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import dayjs from 'dayjs';

interface DayParam {
    day?: number;
    date?: dayjs.Dayjs;
    empty?: boolean;
}

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
        default: () => dayjs().toDate()
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
const currentMonthIndex = ref(0); // 当前月份索引

// 生成月份数组
const months = computed(() => {
    const startMonth = dayjs(props.minDate).startOf('month');
    const endMonth = dayjs(props.maxDate).startOf('month');
    const monthsArray = [];
    let currentMonth = startMonth;
    while (currentMonth.isBefore(endMonth) || currentMonth.isSame(endMonth, 'month')) {
        monthsArray.push(currentMonth);
        currentMonth = currentMonth.add(1, 'month');
    }
    return monthsArray;
});

// 获取某个月份的日期数据
const getDaysForMonth = (month: dayjs.Dayjs): DayParam[] => {
    const firstDayOfMonth = month.startOf('month');
    const startDay = firstDayOfMonth.day(); // 当前月第一天是星期几
    const totalDays = month.daysInMonth(); // 当前月的总天数

    // 生成日期数组
    const daysArray = [];
    for (let i = 1; i <= totalDays; i++) {
        const date = firstDayOfMonth.date(i);
        daysArray.push({
            day: i,
            date,
        });
    }

    // 填充空白
    return [
        ...Array.from({ length: startDay }, () => ({ empty: true })),
        ...daysArray,
    ];
};

// 监听show变化，初始化当前日期，确保每次打开日历都是选中日期的月份
watch(() => props.show, (val) => {
    if (val) {
        currentDate.value = selectDay.value || dayjs();
        currentMonthIndex.value = months.value.findIndex(month => month.isSame(currentDate.value, 'month'));
    }
});

// 月份切换
const switchMonth = (step: number) => {
    const newIndex = currentMonthIndex.value + step;
    if (newIndex >= 0 && newIndex < months.value.length) {
        currentMonthIndex.value = newIndex;
        currentDate.value = months.value[newIndex];
    }
};

// swiper切换事件
const onSwiperChange = (e: any) => {
    currentMonthIndex.value = e.detail.current;
    currentDate.value = months.value[currentMonthIndex.value];
};

// 日期点击事件
const handleDayClick = (day: DayParam) => {
    if (props.minDate && day.date?.isBefore(dayjs(props.minDate))) return;
    if (props.maxDate && day.date?.isAfter(dayjs(props.maxDate))) return;
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


const notSelectMonth = (direction: 'left' | 'right') => {
    if (direction === 'left') {
        return currentMonthIndex.value === 0;
    } else {
        return currentMonthIndex.value === months.value.length - 1;
    }
};

const emit = defineEmits(['confirm', 'cancel']);

</script>

<style lang="less" scoped>
.dialog-calendar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.calendar-container {
    width: 90vw;
    height: 840rpx;
    padding: 32rpx;
    background-color: #fff;
    border-radius: 10rpx;
    box-sizing: border-box;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10rpx;
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

.month {
    font-size: 36rpx;
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

.swiper-container {
    height: 640rpx; /* 固定高度 */
}

.days-grid {
    display: grid;
    grid-gap: 20rpx;
    grid-template-columns: repeat(7, 1fr);
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