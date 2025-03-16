<template>
    <div class="popup-date">
        <UIPopup :visible="visible" :set-visible="setVisible" :z-index="2000">
            <div class="popup-header">
                <div class="header-option-tab" :class="{ actived: item.id === selectTab }" v-for="item in tabs"
                    :key="item.id" @click="changeOptionTab(item.id)">
                    {{ item.title }}
                </div>
            </div>
            <!-- 自定义选择日期 -->
            <div class="popup-content-custom" v-if="selectTab === 4">
                <div class="start-date" @click="handleCustomDate('start')">
                    <div class="title">开始时间</div>
                    <div class="sub-title">{{ customStartDate.format('YYYY年MM月DD日') }}</div>
                    <div class="right-arrow-icon icon-size-40"></div>
                </div>
                <div class="end-date" @click="handleCustomDate('end')">
                    <div class="title">结束时间</div>
                    <div class="sub-title">{{ customEndDate.format('YYYY年MM月DD日') }}</div>
                    <div class="right-arrow-icon icon-size-40"></div>
                </div>
            </div>
            <!-- 自定义选择日期 -->
            <!-- 周、月、年日期选择 -->
            <div class="popup-content" v-else>
                <picker-view v-if="pickerVisible" :indicator-style="indicatorStyle" :value="defaultDate"
                    @change="bindChange($event, selectTab)" class="picker-view">
                    <picker-view-column>
                        <view class="item" v-for="(item, index) in years" :key="index">{{ item }}年</view>
                    </picker-view-column>
                    <picker-view-column v-if="selectTab === 2 || selectTab === 1">
                        <view class="item" v-for="(item, index) in months" :key="index">{{ item }}月</view>
                    </picker-view-column>
                    <picker-view-column v-if="selectTab === 1">
                        <view class="item" v-for="(item, index) in days" :key="index">{{ item }}日</view>
                    </picker-view-column>
                </picker-view>
            </div>
            <!-- 周、月、年日期选择 -->
            <div class="popup-options">
                <div class="popup-close" @click="cancel">取消</div>
                <div class="popup-submit" @click="submit">确定</div>
            </div>
        </UIPopup>
        <!-- 自定义选择日期 开始时间 -->
        <UIPopupCalendar :show="startCalendarShow" :setShow="setStartCalendarShow"
            :default-value="customStartDate.toDate()" :z-index="2000" @confirm="handleConfirmCalendar"
            :max-date="maxDate" :min-date="minDate" />
        <!-- 自定义选择日期 开始时间 -->
        <!-- 自定义选择日期 结束时间 -->
        <UIPopupCalendar :show="endCalendarShow" :setShow="setEndCalendarShow" :default-value="customEndDate.toDate()"
            :z-index="2000" @confirm="handleConfirmCalendar" :minDate="minDate" :max-date="maxDate" />
        <!-- 自定义选择日期 结束时间 -->
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import UIPopup from '@/ui-modules/popup/index.vue';
import UIPopupCalendar from '@/ui-modules/calendar/popup-calendar.vue'
import dayjs from 'dayjs';
import { usePickerViewDate } from '@/components/popup-date/hooks/usePickerViewDate';
import { useCalendar } from '@/components/popup-date/hooks/useCalendar';

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

/** picker-view初始化 */
const { w_data, m_data, y_data, years, months, days, pickerVisible, defaultDate, indicatorStyle, bindChange } = usePickerViewDate();
/** picker-view初始化 */

/** 日历组件逻辑 */
const { startCalendarShow, setStartCalendarShow, endCalendarShow, setEndCalendarShow, customStartDate, customEndDate, handleCustomDate, handleConfirmCalendar, maxDate, minDate } = useCalendar();
/** 日历组件逻辑 */

/** tab切换 */
const selectTab = ref(2)
const tabs = ref([
    {
        id: 1,
        title: '周账单',
    },
    {
        id: 2,
        title: '月账单',
    },
    {
        id: 3,
        title: '年账单',
    },
    {
        id: 4,
        title: '自定义',
    }
])

const changeOptionTab = (id: number) => {
    selectTab.value = id
    if (selectTab.value === 1) {
        defaultDate.value = [years.value.indexOf(w_data.value.year), months.value.indexOf(w_data.value.month), days.value.indexOf(w_data.value.day)]
    }
    if (selectTab.value === 2) {
        defaultDate.value = [years.value.indexOf(m_data.value.year), months.value.indexOf(m_data.value.month)]
    }
    if (selectTab.value === 3) {
        defaultDate.value = [years.value.indexOf(y_data.value.year)]
    }
}
/** tab切换 */

/** 对外方法 */
const submit = () => {
    if (selectTab.value === 1) {
        emit('submit', {
            year: w_data.value.year,
            month: w_data.value.month,
            day: w_data.value.day,
            type: selectTab.value
        })
    }
    else if (selectTab.value === 2) {
        emit('submit', {
            year: m_data.value.year,
            month: m_data.value.month,
            type: selectTab.value
        })
    }
    else if (selectTab.value === 3) {
        emit('submit', {
            year: y_data.value.year,
            type: selectTab.value
        })
    }
    else if (selectTab.value === 4) {
        emit('submit', {
            startDate: customStartDate.value,
            endDate: customEndDate.value,
            type: selectTab.value
        })
    }
    props.setVisible(false)
}

const cancel = () => {
    emit('cancel')
    props.setVisible(false)
}

const emit = defineEmits(['submit', 'cancel']);
/** 对外方法 */

</script>

<style lang="less" scoped>
.popup-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.popup-content {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 15px;
    background-color: #fff;
}

.picker-view {
    width: 750rpx;
    height: 600rpx;
    margin-top: 20rpx;
}

.item {
    line-height: 100rpx;
    text-align: center;
}

.popup-options {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-top: 10rpx;
    padding-bottom: 30rpx;

    .popup-submit {
        background-color: var(--primary-color);
        font-size: 28rpx;
        color: #fff;
        padding: 12rpx 24rpx;
        box-sizing: border-box;
        border-radius: 9999rpx;
    }

    .popup-close {
        background-color: #f5f7fa;
        font-size: 28rpx;
        color: #606266;
        padding: 12rpx 24rpx;
        box-sizing: border-box;
        border-radius: 9999rpx;
        margin-right: 20rpx;
    }
}

.popup-header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10rpx;

    .header-option-tab {
        color: #606266;
        font-size: 28rpx;
        padding: 14rpx 24rpx;
        box-sizing: border-box;
        border-radius: 9999rpx;
    }

    .header-option-tab.actived {
        background-color: var(--primary-color);
        color: #fff;
    }
}

.popup-content-custom {
    padding: 15px;
    background-color: #fff;

    .start-date,
    .end-date {
        position: relative;

        .title {
            font-size: 30rpx;
            font-weight: bold;
            color: #606266;
        }

        .sub-title {
            margin-top: 8rpx;
            font-size: 26rpx;
            color: #606266;
        }

        .right-arrow-icon {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
        }

    }

    .end-date {
        margin-top: 30rpx;
    }

}
</style>