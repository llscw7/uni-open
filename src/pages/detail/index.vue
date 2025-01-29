<template>
    <div class="detail">
        <div class="date-select">
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
        <div class="detail-list" v-for="(item,index) in 3" :key="index">
            <div class="list-wrap">
                <div class="wrap-head">
                    <div class="head-date">1月28号 星期二</div>
                    <div class="head-money">支出0.00 收入2.59</div>
                </div>
                <div class="wrap-container">
                    <div class="item-list">
                        <div class="item-list-wrap out">
                            <van-icon name="balance-pay" class="item-wrap-icon" />
                            <div class="item-wrap-message">
                                <div class="title">其他</div>
                                <div class="desc">相关描述信息</div>
                            </div>
                            <div class="item-wrap-money">
                                -22.22
                            </div>
                        </div>
                        <div class="item-list-wrap in">
                            <van-icon name="cash-on-deliver" class="item-wrap-icon" />
                            <div class="item-wrap-message">
                                <div class="title">其他</div>
                                <div class="desc">相关描述信息</div>
                            </div>
                            <div class="item-wrap-money">
                                12.22
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
.detail {
    background-color: #fff;
    width: 100vw;
    padding: 10rpx 20rpx;
    padding-bottom: 150rpx;
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