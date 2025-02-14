<template>
    <div class="detail">
        <view class="uni-padding-wrap" @click="selectDate">
            <view class="uni-title">日期：{{year}}年{{month}}月</view>
        </view>
        <div class="data-view">
            <div class="data-wrap">
                <div class="data-item data-in">
                    <span>收入</span>
                    <div class="num">1000</div>
                </div>
                <div class="data-item data-out">
                    <span>支出</span>
                    <div class="num">-698</div>
                </div>
                <div class="data-item data-spend">
                    <span>预算</span>
                    <div class="spend-setting" v-if="false">设置支出预算</div>
                    <div class="num" v-else>-698</div>
                </div>
            </div>
        </div>
        <div class="detail-list" v-for="item in detail_data" :key="item.time">
            <div class="list-wrap">
                <div class="wrap-head">
                    <div class="head-date">{{ item.date }} {{ item.weekdayCN }}</div>
                    <div class="head-money">支出0.00 收入2.59</div>
                </div>
                <div class="wrap-container">
                    <div class="item-list">
                        <div class="item-list-wrap out" v-for="item2 in item.children" :key="item2.userId">
                            <van-icon name="balance-pay" class="item-wrap-icon" />
                            <div class="item-wrap-message">
                                <div class="title">{{ item2.title }}</div>
                                <div class="desc">{{ item2.desc }}</div>
                            </div>
                            <div class="item-wrap-money">
                                {{ item2.in }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <BottomNav></BottomNav>
        <van-popup
            :show="showPopup" 
            round
            position="bottom" 
            @close="onClosePopup"
        >
            <div class="date-container">
                <div class="date-option">
                    <view class="date-option-item cancel" @click="onCancel">取消</view>
                    <view class="date-option-item right" @click="onConfirm">确定</view>
                </div>
                <picker-view :value="pickerValue" indicator-class="custom-indicator" @change="bindChange" class="date-picker-view">
                    <picker-view-column>
                        <view class="date-item" v-for="(item,index) in years" :key="index">{{item}}年</view>
                    </picker-view-column>
                    <picker-view-column>
                        <view class="date-item" v-for="(item,index) in months" :key="index">{{item}}月</view>
                    </picker-view-column>
                </picker-view>
            </div>
        </van-popup>    
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, Events } from 'vue'
import data from './data.json';
import { formatData } from './tool';
import BottomNav from '../../components/nav/bottom.vue';

const date = new Date()
const years = ref<number[]>([])
const year = ref(date.getFullYear())
const months = ref<number[]>([])
const month = ref(date.getMonth() + 1)
const pickerValue = ref([9999, month])
const tmpDate = ref<number[]>([])
for (let i = 1990; i <= date.getFullYear(); i++) {
    years.value.push(i)
}
for (let i = 1; i <= 12; i++) {
    months.value.push(i)
}

const res = formatData(data)
const detail_data = ref<DetailData[]>(res)
const showPopup = ref(false)

const selectDate = () => {
    pickerValue.value = [years.value.indexOf(year.value), month.value - 1]
    showPopup.value = true
}
const onClosePopup = () => {
    showPopup.value = false
}

const onConfirm = () => {
    year.value = tmpDate.value[0]
    month.value = tmpDate.value[1]
    showPopup.value = false
}
const onCancel = () => {
    showPopup.value = false
}
const bindChange = (e: any) => {
    const val = e.detail.value
    year.value = years.value[val[0]]
    month.value = months.value[val[1]]
    tmpDate.value = [year.value, month.value]
    // day.value = days.value[val[2]]
    console.log(year.value, month.value)
}
</script>

<style scoped lang="less">
.detail {
    background-color: #fff;
    width: 100vw;
    padding: 10rpx 20rpx;
    padding-bottom: 200rpx;
    box-sizing: border-box;
}

.date-select {
    font-weight: bold;
    font-size: 40rpx;
}

.data-view {
    background-color: #efefef;
    border-radius: 16rpx;
    padding: 20rpx;

    .data-wrap {
        display: flex;
        justify-content: space-between;

        .data-item {
            .num {
                font-size: 40rpx;
                font-weight: bold;
                flex-basis: 30%;
            }
        }

        .data-in {}

        .data-out {}

        .data-spend {
            .spend-setting {
                color: #909399;
            }
        }
    }
}

.detail-list {
    margin-top: 20rpx;

    .list-wrap {
        padding: 20rpx;
        background-color: #F2F6FC;

        .wrap-head {
            display: flex;
            justify-content: space-between;
            color: #909399;

            .head-date {}

            .head-money {}
        }

        .wrap-container {
            .item-list {
                .item-list-wrap {
                    position: relative;
                    display: flex;
                    align-items: center;

                    .item-wrap-icon {
                        font-size: 60rpx;
                    }

                    .item-wrap-message {
                        .title {
                            font-weight: bold;
                        }

                        .desc {
                            color: #909399;
                        }
                    }

                    .item-wrap-money {
                        position: absolute;
                        right: 20rpx;
                    }
                }
            }
        }
    }
}
.date-container {
    position: relative;
    height: 600rpx;
    padding: 100rpx 60rpx;
    box-sizing: border-box;
    font-size: 40rpx;
    .date-option {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 100rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 40rpx;
        .date-option-item {
            font-size: 40rpx;
            color: #303133;
        }
        .date-option-item.cancel {
            color: #909399;
        }
        .date-option-item.right {
            color: #07c160;
        }
    }
}
.date-picker-view {
    height: 550rpx;
}
.date-item {
    line-height: 200rpx;
    font-size: 40rpx;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}
/deep/.custom-indicator {
    height: 100rpx;
    line-height: 100rpx;
    font-size: 40rpx;
    color: #303133;
}
</style>