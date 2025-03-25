<template>
    <view class="create-ledger">
        <!-- 头部区域：账本名称 -->
        <view class="section name-section">
            <text class="section-title">账本名称</text>
            <input class="name-input" type="text" v-model="ledgerName" placeholder="请输入账本名称" maxlength="20" />
        </view>

        <!-- 中部区域：账本图标选择 -->
        <view class="section icon-section">
            <text class="section-title">账本图标</text>
            <div class="category-grid">
                <div v-for="(item, index) in categories.slice(0, 9)" :key="index" class="category-item"
                    @click="handleSelectCategory(item.id)">
                    <div :class="['category-icon', isActived(item.id) ? 'active' : '']">
                        <div class="icon-size-46" :class="categoryIconClass(item.icon, item.id)"></div>
                    </div>
                    <text :class="['category-name', isActived(item.id) ? 'active' : '']">{{ item.name }}</text>
                </div>
                <div class="category-item">
                    <div class="category-icon">
                        <div class="more-icon icon-size-46"></div>
                    </div>
                    <text class="category-name">更多</text>
                </div>
            </div>
        </view>

        <view class="section feature-section">
            <!-- <text class="section-title">功能设置</text> -->
            <div class="detail-card">
                <div class="detail-item">
                    <div class="left">
                        <div class="tag-icon icon-size-40"></div>
                        <text class="detail-text">查看账单</text>
                    </div>
                    <uni-icons type="right" size="14" color="#333" />
                </div>

                <div class="detail-item">
                    <div class="left">
                        <div class="book-icon-2 icon-size-40"></div>
                        <text class="detail-text">迁移账单</text>
                    </div>
                    <uni-icons type="right" size="14" color="#333" />
                </div>

                <div class="detail-item">
                    <div class="left">
                        <div class="account-icon icon-size-40"></div>
                        <text class="detail-text">清空账单</text>
                    </div>
                    <uni-icons type="right" size="14" color="#333" />
                </div>
            </div>
        </view>

        <!-- 功能列表模块 -->
        <view class="section feature-section">
            <text class="section-title">功能设置</text>
            <view class="feature-list">
                <view class="feature-item" @tap="toggleFeature('viewBill')">
                    <view class="feature-info">
                        <text class="iconfont icon-eye"></text>
                        <text class="feature-text">查看账单</text>
                    </view>
                    <div class="right-arrow-icon icon-size-40"></div>
                </view>

                <view class="feature-item" @tap="toggleFeature('migrateBill')">
                    <view class="feature-info">
                        <text class="iconfont icon-transfer"></text>
                        <text class="feature-text">迁移账单</text>
                    </view>
                    <div class="right-arrow-icon icon-size-40"></div>
                </view>

                <view class="feature-item" @tap="toggleFeature('clearBill')">
                    <view class="feature-info">
                        <text class="iconfont icon-delete"></text>
                        <text class="feature-text">清空账单</text>
                    </view>
                    <div class="right-arrow-icon icon-size-40"></div>
                </view>

                <view class="feature-item" @tap="toggleFeature('autoAddCategory')">
                    <view class="feature-info">
                        <text class="iconfont icon-category"></text>
                        <text class="feature-text">对应分类自动加入账本</text>
                    </view>
                    <div class="right-arrow-icon icon-size-40"></div>
                </view>

                <view class="feature-item" @tap="toggleFeature('autoAddTag')">
                    <view class="feature-info">
                        <text class="iconfont icon-tag"></text>
                        <text class="feature-text">对应标签自动加入账本</text>
                    </view>
                    <div class="right-arrow-icon icon-size-40"></div>
                </view>
            </view>
        </view>

        <!-- 账本周期设置模块 -->
        <view class="section period-section">
            <text class="section-title">账本周期</text>
            <view class="period-picker">
                <picker mode="selector" :range="periodOptions" @change="handlePeriodChange">
                    <view class="picker-value">
                        <text>{{ periodOptions[selectedPeriodIndex] }}</text>
                        <text class="iconfont icon-arrow-right"></text>
                    </view>
                </picker>
            </view>
        </view>

        <!-- 底部创建按钮 -->
        <view class="create-btn-wrapper">
            <button class="create-btn" @tap="createLedger">创建账本</button>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useCategories } from './hooks/useCategories';

/** 类别选择模块 */
const {
    selectTab,
    tabs,
    categories,
    handleSelectTab,
    handleSelectCategory,
    isActived,
    categoryIconClass
} = useCategories();
/** 类别选择模块 */


// 账本名称
const ledgerName = ref<string>('');

// 图标列表
const iconList = [
    'icon-wallet', 'icon-money', 'icon-credit-card', 'icon-gift',
    'icon-shopping', 'icon-home', 'icon-car', 'icon-plane',
    'icon-food', 'icon-medical', 'icon-education', 'icon-entertainment'
];
const selectedIconIndex = ref<number>(0);

// 功能列表
const features = reactive({
    viewBill: true,
    migrateBill: false,
    clearBill: false,
    autoAddCategory: true,
    autoAddTag: false
});

// 周期选项
const periodOptions = ['不设置', '每日', '每周', '每月', '每年'];
const selectedPeriodIndex = ref<number>(0);

// 选择图标
const selectIcon = (index: number) => {
    selectedIconIndex.value = index;
};

// 切换功能开关
const toggleFeature = (key: string) => {
    if (key in features) {
        features[key as keyof typeof features] = !features[key as keyof typeof features];
    }
};

// 更新功能状态
const updateFeature = (key: string, value: boolean) => {
    if (key in features) {
        features[key as keyof typeof features] = value;
    }
};

// 处理周期变更
const handlePeriodChange = (e: any) => {
    selectedPeriodIndex.value = e.detail.value;
};

// 创建账本
const createLedger = () => {
    if (!ledgerName.value.trim()) {
        uni.showToast({
            title: '请输入账本名称',
            icon: 'none'
        });
        return;
    }

    const ledgerData = {
        name: ledgerName.value,
        icon: iconList[selectedIconIndex.value],
        features,
        period: periodOptions[selectedPeriodIndex.value]
    };

    console.log('创建账本数据:', ledgerData);

    // 这里添加创建账本的逻辑，如API调用等
    uni.showLoading({ title: '创建中' });

    setTimeout(() => {
        uni.hideLoading();
        uni.showToast({
            title: '创建成功',
            icon: 'success',
            success: () => {
                // 创建成功后的跳转
                setTimeout(() => {
                    uni.navigateBack();
                }, 1500);
            }
        });
    }, 1000);
};
</script>

<style lang="scss">
.create-ledger {
    min-height: 100vh;
    background-color: #f8f8f8;
    padding: 20rpx;
}

.section {
    background-color: #ffffff;
    border-radius: 12rpx;
    padding: 30rpx;
    margin-bottom: 24rpx;
    box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.section-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 20rpx;
    display: block;
}

// 名称输入区域
.name-input {
    height: 80rpx;
    background-color: #f5f5f5;
    border-radius: 8rpx;
    padding: 0 20rpx;
    font-size: 28rpx;
}

// 图标选择区域
.icon-scroll {
    white-space: nowrap;
    width: 100%;
}

.icon-list {
    display: flex;
    padding: 10rpx 0;
}

.icon-item {
    width: 100rpx;
    height: 100rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20rpx;
    background-color: #f8f8f8;
    border-radius: 50%;
    transition: all 0.3s;

    .iconfont {
        font-size: 48rpx;
        color: #666;
    }

    &.icon-selected {
        background-color: #f5af19;

        .iconfont {
            color: #ffffff;
        }
    }
}

// 功能列表
.feature-list {
    border-radius: 8rpx;
}

.feature-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24rpx 0;
    border-bottom: 1px solid #f0f0f0;

    &:last-child {
        border-bottom: none;
    }
}

.feature-info {
    display: flex;
    align-items: center;

    .iconfont {
        margin-right: 16rpx;
        font-size: 36rpx;
        color: #f5af19;
    }

    .feature-text {
        font-size: 28rpx;
        color: #333;
    }
}

// 周期设置
.period-picker {
    background-color: #f5f5f5;
    height: 80rpx;
    border-radius: 8rpx;
    display: flex;
    align-items: center;

    .picker-value {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 0 20rpx;

        text {
            font-size: 28rpx;
            color: #333;
        }

        .icon-arrow-right {
            color: #999;
            font-size: 24rpx;
        }
    }
}

// 创建按钮
.create-btn-wrapper {
    padding: 40rpx 20rpx;
    margin-top: 40rpx;
}

.create-btn {
    height: 90rpx;
    line-height: 90rpx;
    background-color: #f5af19;
    color: #ffffff;
    font-size: 32rpx;
    font-weight: bold;
    border-radius: 45rpx;
    box-shadow: 0 10rpx 20rpx rgba(245, 175, 25, 0.3);
}

.category-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20rpx;
}

.category-item {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.category-icon {
    width: 88rpx;
    height: 88rpx;
    border-radius: 22rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12rpx;
}

.category-icon.active {
    background: rgba(245, 175, 25, 0.1);
}

.category-name {
    font-size: 26rpx;
    color: #666;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 12rpx;
    text-align: center;
}

.category-name.active {
    color: #F5AF19;
    font-weight: bold;
}

.detail-card {
    background: #fff;
    border-radius: 20rpx;
    margin-bottom: 20rpx;
}

.detail-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32rpx;
}

.detail-item:last-child {
    margin-bottom: 0;
}

.detail-text {
    font-size: 28rpx;
    color: #333;
}

.left {
    display: flex;
    align-items: center;
    gap: 16rpx;
    width: 100%;
    overflow: hidden;
}

</style>