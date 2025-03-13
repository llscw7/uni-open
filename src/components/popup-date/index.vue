<template>
    <div class="popup-date">
        <UIPopup ref="popup">
            <div class="popup-header">
                <view class="popup-date">{{ year }}年{{ month }}月</view>
                <view class="popup-close" @click="open">确定</view>
            </div>
            <div class="popup-content">
                <picker-view v-if="visible" :indicator-style="indicatorStyle" :value="value2" @change="bindChange" class="picker-view">
                    <picker-view-column>
                        <view class="item" v-for="(item, index) in years" :key="index">{{ item }}年</view>
                    </picker-view-column>
                    <picker-view-column>
                        <view class="item" v-for="(item, index) in months" :key="index">{{ item }}月</view>
                    </picker-view-column>
                    <!-- <picker-view-column>
                        <view class="item" v-for="(item, index) in days" :key="index">{{ item }}日</view>
                    </picker-view-column> -->
                </picker-view>
            </div>
        </UIPopup>
    </div>
</template>

<script lang="ts" setup>
import { ref, defineExpose, onMounted } from 'vue';
import UIPopup from '@/ui-modules/popup/index.vue';
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
console.log(years.value,'-----')
const value2 = ref([years.value.indexOf(year.value), months.value.indexOf(month.value), days.value.indexOf(day.value)])
console.log(value2.value,'-----')

const indicatorStyle = `height: 50px;`

const visible = true

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

const change = (e: any) => {
    console.log('当前模式：' + e.type + ',状态：' + e.show);
}

// 阻止滚动穿透
const moveHandle = () => { }

defineExpose({ open });
</script>

<style scoped>
.popup-content {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 15px;
    /* height: 50px; */
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
</style>