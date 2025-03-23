<template>
    <div class="dialog-calendar" v-if="show" :style="{ zIndex: zIndex }" @click="cancel"
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

            <div class="time-wrap">
                <div class="time-label">时间</div>
                <div class="time-select-wrap">
                    <div class="time-text" @click="timeVisible = true">{{ currentTime }}</div>
                    <div class="time-select" :style="{ zIndex: timeVisible ? 1000 : -1, opacity: timeVisible ? 1 : 0 }" @click.stop>
                        <picker-view v-if="timeVisible" :indicator-style="indicatorStyle" :value="defaultTime" @change="bindChange"  class="picker-view">
                            <picker-view-column>
                                <view class="item" v-for="(item,index) in hours" :key="index">{{item}}</view>
                            </picker-view-column>
                            <picker-view-column>
                                <view class="item" v-for="(item,index) in minutes" :key="index">{{item}}</view>
                            </picker-view-column>
                        </picker-view>
                    </div>
                    <div class="time-select-mask" v-if="timeVisible" @click.stop="timeVisible = false"></div>
                </div>
            </div>

            <div class="dialog-footer">
                <div class="footer-btn cancel" @click="cancel">取消</div>
                <div class="footer-btn" @click="handleSubmit">确定</div>
            </div>
        </view>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import dayjs from 'dayjs';
import { usePickerViewTimeSelect } from './hooks/usePickerViewTimeSelect';

interface DayParam {
    day?: number;
    date?: dayjs.Dayjs;
    empty?: boolean;
}

const props = defineProps({
    defaultValue: {
        type: Date,
        default: new Date()
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

/** 小时分钟选择弹窗 */
const { currentTime, defaultTime, hours, minutes, timeVisible, indicatorStyle, bindChange} = usePickerViewTimeSelect();
/** 小时分钟选择弹窗 */


// 当前日期
const currentDate = ref(dayjs());
const selectDay = ref<dayjs.Dayjs>(dayjs(props.defaultValue));
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
        selectDay.value = dayjs(props.defaultValue);
        currentDate.value = selectDay.value;
        currentMonthIndex.value = months.value.findIndex(month => month.isSame(currentDate.value, 'month'));
        currentTime.value = selectDay.value.format('HH:mm');
        const hour = currentTime.value.split(':')[0];
        const minute = currentTime.value.split(':')[1];
        defaultTime.value = [hours.value.indexOf(hour), minutes.value.indexOf(minute)];
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
    if (!day.empty && day.date) {
        selectDay.value = day.date;
        // emit('confirm', day.date);
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

const cancel = () => {
    emit('cancel');
    selectDay.value = dayjs(props.defaultValue);
    props.setShow(false);
};

const handleSubmit = () => {

    const [hour, minute] = currentTime.value.split(':');
    if(selectDay.value && hour && minute) {
        const fullDate = selectDay.value.set('hour', +hour).set('minute', +minute);
        emit('confirm', fullDate);
    }else {
        console.error('selectDay or currentTime is undefined');
    }
    props.setShow(false);
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
    height: 950rpx;
    padding: 32rpx;
    background-color: #fff;
    border-radius: 10rpx;
    box-sizing: border-box;
    position: relative;
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

.time-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    left: 0;
    right: 0;
    padding: 0 32rpx;
    bottom: 150rpx;
    z-index: 99999;
}
.time-label {
    font-size: 34rpx;
    font-weight: 500;
    color: #000000;
}
.time-text {
    letter-spacing: 8rpx;
    font-size: 28rpx;
    font-weight: 500;
    color: #000000;
    background-color: #F0F2F5;
    padding: 20rpx;
    box-sizing: border-box;
    border-radius: 20rpx;
}
.time-select {
    position: absolute;
    bottom: 100rpx;
    right: 32rpx;
    height: 300rpx;
    background-color: #fff;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 20rpx 40rpx;
    box-sizing: border-box;
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0rpx 0rpx 10rpx 10rpx rgba(0, 0, 0, 0.1);
    border-radius: 20rpx;
}

.time-select-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0);
    z-index: 1;
}

.picker-view {
    position: relative;
    z-index: 10;
    width: 200rpx;
    height: 300rpx;
    margin-top: 20rpx;
}

.item {
    line-height: 40px;
    text-align: center;
}

.dialog-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 20rpx;
    padding: 0 32rpx;
    position: absolute;
    bottom: 32rpx;
    left: 0;
    right: 0;
}

.footer-btn {
    width: 260rpx;
    height: 80rpx;
    font-weight: 500;
    line-height: 80rpx;
    text-align: center;
    font-size: 30rpx;
    color: #fff;
    background-color: var(--primary-color);
    border-radius: 10rpx;
}

.footer-btn.cancel {
    color: #000000;
    background-color: #E4E7ED;
}
</style>