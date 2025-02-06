<template>
    <div class="detail">
        <div class="date-select" @click="selectDate">
            2025年1月
        </div>
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
                    <div class="head-date">{{item.date}} {{ item.weekdayCN }}</div>
                    <div class="head-money">支出0.00 收入2.59</div>
                </div>
                <div class="wrap-container">
                    <div class="item-list">
                        <div class="item-list-wrap out" v-for="item2 in item.children" :key="item2.userId">
                            <van-icon name="balance-pay" class="item-wrap-icon" />
                            <div class="item-wrap-message">
                                <div class="title">{{item2.title}}</div>
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
            <van-datetime-picker
                type="year-month"
                :value="currentDate"
                @input="onInput"
                @confirm="onConfirm"
            />
        </van-popup>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, Events } from 'vue'
import data from './data.json';
import { formatData } from './tool';
import BottomNav from '../../components/nav/bottom.vue';

const res = formatData(data)
const detail_data = ref<DetailData[]>(res)

const currentDate = ref(new Date().getTime())
const minDate = ref(new Date().getTime())
const showPopup = ref(false)

const onInput = (event: any) => {
    // currentDate.value = event.detail;
}
const onConfirm = (value: any) => {
    console.log(currentDate.value,'------',value)
}
const selectDate = () => {
    showPopup.value = true
}
const onClosePopup = () => {
    showPopup.value = false
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
            .head-date {

            }
            .head-money {

            }
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
</style>