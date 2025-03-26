<template>
    <UIPopup :visible="visible" :set-visible="setVisible" :z-index="2000">

        <view class="page-container">
            <view class="nav-bar">
                <view class="nav-left">
                    <uni-icons type="back" size="24" class="nav-icon" />
                    <text class="nav-title">切换账本</text>
                </view>
                <uni-icons type="compose" size="24" class="nav-icon" />
            </view>

            <view class="main-content">
                <view class="book-list">
                    <view class="book-item">
                        <view class="book-left">
                            <view class="icon-wrapper yellow">
                                <uni-icons type="star-filled" size="20" color="#f5af19" />
                            </view>
                            <text class="book-name">玩玩玩</text>
                        </view>
                        <uni-icons type="checkmark" size="20" color="#f5af19" />
                    </view>

                    <view class="book-item">
                        <view class="book-left">
                            <view class="icon-wrapper green">
                                <uni-icons type="checkmark" size="20" color="#10B981" />
                            </view>
                            <text class="book-name">默认账本</text>
                        </view>
                    </view>

                    <view class="book-item">
                        <view class="book-left">
                            <view class="icon-wrapper green">
                                <uni-icons type="paperplane" size="20" color="#10B981" />
                            </view>
                            <text class="book-name">旅游</text>
                        </view>
                    </view>

                    <view class="book-item">
                        <view class="book-left">
                            <view class="icon-wrapper pink">
                                <uni-icons type="heart-filled" size="20" color="#EC4899" />
                            </view>
                            <text class="book-name">充值</text>
                        </view>
                    </view>

                    <view class="book-item">
                        <view class="book-left">
                            <view class="icon-wrapper yellow">
                                <uni-icons type="shop" size="20" color="#f5af19" />
                            </view>
                            <text class="book-name">购物</text>
                        </view>
                    </view>

                    <view class="book-item">
                        <view class="book-left">
                            <view class="icon-wrapper yellow">
                                <uni-icons type="bookmark" size="20" color="#f5af19" />
                            </view>
                            <text class="book-name">学习</text>
                        </view>
                    </view>

                    <view class="book-item">
                        <view class="book-left">
                            <view class="icon-wrapper green">
                                <uni-icons type="person" size="20" color="#10B981" />
                            </view>
                            <text class="book-name">运动</text>
                        </view>
                    </view>
                </view>
            </view>

            <view class="bottom-bar">
                <button class="add-button">
                    <uni-icons type="plusempty" size="20" color="#FFFFFF" />
                    <text class="button-text">新增账本</text>
                </button>
            </view>
        </view>
    </UIPopup>
</template>

<script lang="ts" setup>
import UIPopup from '@/ui-modules/popup/index.vue';
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

</script>

<style lang="less" scoped>
.page-container {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.nav-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx 32rpx;
    background-color: #ffffff;
    border-bottom: 1px solid #f0f0f0;
}

.nav-left {
    display: flex;
    align-items: center;
}

.nav-title {
    margin-left: 16rpx;
    font-size: 16px;
    font-weight: 500;
    color: #333333;
}

.nav-icon {
    height: 48rpx;
    width: 48rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}

.main-content {
    flex: 1;
    padding: 32rpx;
    overflow-y: auto;
}

.book-list {
    display: flex;
    flex-direction: column;
    gap: 32rpx;
}

.book-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 32rpx;
    background-color: #ffffff;
    border-radius: 16rpx;
}

.book-left {
    display: flex;
    align-items: center;
}

.icon-wrapper {
    width: 80rpx;
    height: 80rpx;
    border-radius: 16rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}

.yellow {
    background-color: #FEF3C7;
}

.green {
    background-color: #D1FAE5;
}

.pink {
    background-color: #FCE7F3;
}

.book-name {
    margin-left: 24rpx;
    font-size: 14px;
    color: #4B5563;
}

.bottom-bar {
    padding: 32rpx;
    background-color: #ffffff;
    border-top: 1px solid #f0f0f0;
}

.add-button {
    width: 100%;
    height: 88rpx;
    background-color: #f5af19;
    border-radius: 88rpx;
    color: #ffffff;
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
}

.button-text {
    margin-left: 16rpx;
}
</style>