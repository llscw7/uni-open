<template>
    <UIPopup :visible="visible" :set-visible="setVisible" :z-index="2000">
        <view class="page-container">
            <view class="nav">
                <view class="nav-content">
                    <uni-icons type="back" size="24" color="#666666" />
                    <text class="nav-title">筛选</text>
                </view>
            </view>

            <view class="main-content">
                <view class="section">
                    <text class="section-title">快捷分类</text>
                    <view class="button-grid">
                        <div class="category-btn" type="default">工资</div>
                        <div class="category-btn" type="default">兼职</div>
                        <div class="category-btn" type="default">投资理财</div>
                        <div class="category-btn" type="default">人情社交</div>
                        <div class="category-btn" type="default">奖金补贴</div>
                        <div class="category-btn" type="default">报销</div>
                    </view>
                </view>

                <view class="section">
                    <text class="section-title">支出分类</text>
                    <view class="button-grid">
                        <div class="category-btn" type="default">生意</div>
                        <div class="category-btn" type="default">卖二手</div>
                        <div class="category-btn" type="default">生活费</div>
                        <div class="category-btn" type="default">中奖</div>
                        <div class="category-btn" type="default">转账</div>
                        <div class="category-btn" type="default">保险理赔</div>
                        <div class="category-btn" type="default">其他</div>
                    </view>
                </view>

                <view class="section">
                    <text class="section-title">不计收支分类</text>
                    <view class="button-grid">
                        <div class="category-btn" type="default">退款</div>
                        <div class="category-btn" type="default">亲友代付</div>
                        <div class="category-btn" type="default">借还款</div>
                        <div class="category-btn" type="default">转账</div>
                        <div class="category-btn" type="default">投资理财</div>
                        <div class="category-btn" type="default">其他</div>
                    </view>
                </view>

                <view class="section">
                    <text class="section-title">标签</text>
                    <scroll-view class="tags-scroll" scroll-x>
                        <view class="tags-container">
                            <div class="tag-btn" type="default">早餐</div>
                            <div class="tag-btn" type="default">午餐</div>
                            <div class="tag-btn" type="default">晚餐</div>
                            <div class="tag-btn" type="default">金融</div>
                            <div class="tag-btn" type="default">娱乐</div>
                        </view>
                    </scroll-view>
                </view>
            </view>

            <view class="footer">
                <div class="footer-btn reset-btn" type="default">重置</div>
                <div class="footer-btn confirm-btn" type="primary">确认</div>
            </view>
        </view>
    </UIPopup>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
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

<style>
.page-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #ffffff;
}

.nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 88rpx;
    background-color: #ffffff;
    border-bottom: 2rpx solid #f5f5f5;
    z-index: 100;
}

.nav-content {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 32rpx;
}

.nav-title {
    margin-left: 16rpx;
    font-size: 36rpx;
    font-weight: 500;
    color: #333333;
}

.main-content {
    flex: 1;
    padding: 120rpx 32rpx 160rpx;
    overflow: auto;
}

.section {
    margin-bottom: 48rpx;
}

.section-title {
    display: block;
    margin-bottom: 24rpx;
    font-size: 32rpx;
    font-weight: 500;
    color: #333333;
}

.button-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24rpx;
}

.category-btn {
    height: 80rpx;
    line-height: 80rpx;
    background-color: #f5f5f5 !important;
    border: none !important;
    font-size: 28rpx !important;
    color: #666666 !important;
    border-radius: 16rpx !important;
}

.tags-scroll {
    width: 100%;
    white-space: nowrap;
    overflow: auto;
}

.tags-container {
    display: inline-flex;
    padding-bottom: 16rpx;
    gap: 16rpx;
}

.tag-btn {
    display: inline-flex;
    align-items: center;
    height: 64rpx;
    padding: 0 32rpx !important;
    background-color: #ffffff !important;
    border: 2rpx solid #4A90E2 !important;
    border-radius: 64rpx !important;
    font-size: 28rpx !important;
    color: #4A90E2 !important;
}

.footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 32rpx;
    background-color: #ffffff;
    border-top: 2rpx solid #f5f5f5;
    display: flex;
    gap: 32rpx;
}

.footer-btn {
    flex: 1;
    height: 88rpx;
    line-height: 88rpx;
    border-radius: 8rpx !important;
    font-size: 32rpx !important;
}

.reset-btn {
    background-color: #f5f5f5 !important;
    border: none !important;
    color: #666666 !important;
}

.confirm-btn {
    background-color: #f5af19 !important;
    border: none !important;
    color: #ffffff !important;
}
</style>