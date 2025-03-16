<template>
    <div class="popup-date">
        <UIPopup ref="popup">
            <div class="popup-header">
                <div 
                    class="header-option-tab" 
                    :class="{actived: item.id === selectTab}" 
                    v-for="item in tabs" 
                    :key="item.id"
                    @click="changeOptionTab(item.id)"
                >
                    {{ item.title }}
                </div>
            </div>
            <div class="popup-content-custom" v-if="selectTab === 4">
                <div class="start-date" @click="handleCustomStartDate">
                    <div class="title">开始时间</div>
                    <div class="sub-title">2025年3月10日</div>
                    <div class="right-arrow-icon icon-size-40"></div>
                </div>
                <div class="end-date">
                    <div class="title">结束时间</div>
                    <div class="sub-title">2025年3月10日</div>
                    <div class="right-arrow-icon icon-size-40"></div>
                </div>
            </div>
            <div class="popup-content" v-else>
                <picker-view v-if="visible" :indicator-style="indicatorStyle" :value="defaultDate" @change="bindChange" class="picker-view">
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
            <div class="popup-options">
                <div class="popup-close" @click="close">取消</div>
                <div class="popup-submit" @click="open">确定</div>
            </div>
        </UIPopup>
        <UIPopupCalendar ref="popupCalendarRef" :z-index="2000" />
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import UIPopup from '@/ui-modules/popup/index.vue';
import UIPopupCalendar from '@/ui-modules/calendar/popup-calendar.vue'
/** picker-view初始化 */
const popup = ref();
const date = new Date()
const years = ref<number[]>([])
const year = ref(date.getFullYear())
const months = ref<number[]>([])
const month = ref(date.getMonth() + 1)
const days = ref<number[]>([])
const day = ref(date.getDate())
for (let i = 1990; i <= date.getFullYear(); i++) {
    years.value.push(i)
}
for (let i = 1; i <= 12; i++) {
    months.value.push(i)
}
for (let i = 1; i <= 31; i++) {
    days.value.push(i)
}
const defaultDate = ref([years.value.indexOf(year.value), months.value.indexOf(month.value), days.value.indexOf(day.value)])
const indicatorStyle = `height: 50px;`
const visible = true
/** picker-view初始化 */

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

const popupCalendarRef = ref()

const bindChange = (e: any) => {
    const val = e.detail.value
    year.value = years.value[val[0]]
    month.value = months.value[val[1]]
    day.value = days.value[val[2]]
}

const open = () => {
    if (popup.value) {
        popup.value.open();
    } else {
        console.error('popup is not defined');
    }
}

const close = () => {
    if (popup.value) {
        popup.value.close();
    } else {
        console.error('popup is not defined');
    }
}

const change = (e: any) => {
    console.log('当前模式：' + e.type + ',状态：' + e.show);
}

const changeOptionTab = (id: number) => {
    selectTab.value = id
}

const handleCustomStartDate = () => {
    if(popupCalendarRef.value) {
        popupCalendarRef.value.open()
    }else {
        console.error('popup is not defined');
    }
}

// 阻止滚动穿透
const moveHandle = () => { }

defineExpose({ open });
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
    .start-date, .end-date {
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