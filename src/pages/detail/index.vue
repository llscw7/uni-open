<template>
    <div class="page-container" :style="{ paddingTop: navbarHeight + 'px' }">
        <div class="nav-header"
            :style="{ paddingTop: navbarPaddingTop + 'px', paddingRight: navbarPaddingRight + 'px', height: navbarHeight + 'px' }">
            <div class="left-arrow-icon-wrap" @click="goToBack">
                <div class="left-arrow-icon-2"></div>
            </div>
            <div class="nav-box">
                账单详情
            </div>
        </div>

        <div class="main-content">
            <div class="bill-card">
                <div class="bill-header">
                    <div class="bill-left">
                        <div class="icon-wrapper">
                            <div class="food-icon-yellow icon-size-50"></div>
                        </div>
                        <div class="bill-info">
                            <div class="bill-title">海底捞火锅</div>
                            <div class="bill-subtitle">餐饮 · 朋友聚餐</div>
                        </div>
                    </div>
                    <text class="bill-amount">-¥428</text>
                </div>
            </div>

            <div class="detail-card">
                <div class="detail-item">
                    <div class="detail-label">时间</div>
                    <div class="detail-value-wrapper">
                        <div class="detail-value">2023年12月15日 19:30</div>
                        <div class="right-arrow-icon-wrap" @click="goToBack">
                            <div class="right-arrow-icon-2"></div>
                        </div>
                    </div>
                </div>

                <div class="detail-item">
                    <div class="detail-label">备注</div>
                    <div class="detail-note-wrapper">
                        <div class="note-item">和朋友聚餐，4人分摊和朋友聚餐，4人分摊和朋友聚餐</div>
                        <div class="right-arrow-icon-wrap" @click="goToBack">
                            <div class="right-arrow-icon-2"></div>
                        </div>
                    </div>
                </div>
                
                <div class="detail-item">
                    <div class="detail-label">标签</div>
                    <div class="tags-wrapper">
                        <div class="tag-item">聚餐</div>
                        <div class="tag-item">火锅</div>
                    </div>
                </div>
            </div>

            <div class="detail-card">

                <!-- <div class="detail-item">
                    <div class="detail-label">关联账单</div>
                    <div class="detail-value-wrapper">
                        <uni-icons type="link" size="16" color="#999999" />
                        <div class="detail-value">共同付款 - 王小明（已付）</div>
                    </div>
                </div> -->

                <div class="detail-item">
                    <div class="detail-label">所属账本</div>
                    <div class="detail-value-wrapper">
                        <div class="detail-value">日常开销</div>
                        <div class="right-arrow-icon-wrap" @click="goToBack">
                            <div class="right-arrow-icon-2"></div>
                        </div>
                    </div>
                </div>

                <div class="detail-item">
                    <div class="detail-label">账户</div>
                    <div class="detail-value-wrapper">
                        <div class="detail-value">招商银行储蓄卡</div>
                        <div class="right-arrow-icon-wrap" @click="goToBack">
                            <div class="right-arrow-icon-2"></div>
                        </div>
                    </div>
                </div>

                <!-- <div class="detail-item">
                    <div class="detail-label">地点</div>
                    <div class="detail-value-wrapper">
                        <uni-icons type="location" size="16" color="#999999" />
                        <div class="detail-value">海底捞火锅（万达广场店）</div>
                    </div>
                </div> -->

                <div class="detail-item">
                    <div class="detail-label">记录方式</div>
                    <div class="detail-value">手动记账</div>
                </div>

                <div class="detail-item">
                    <div class="detail-label">不计入收支</div>
                    <switch :checked="excludeIncome" @change="onExcludeIncomeChange" color="#F5AF19" class="switch-btn" />
                </div>

                <div class="detail-item">
                    <div class="detail-label">不计入预算</div>
                    <switch :checked="excludeBudget" @change="onExcludeBudgetChange" color="#F5AF19" class="switch-btn" />
                </div>

                <!-- <div class="detail-item">
                    <div class="detail-label">不计入总资产</div>
                    <switch :checked="excludeAssets" @change="onExcludeAssetsChange" color="#F5AF19" />
                </div> -->
            </div>
        </div>

        <div class="bottom-actions">
            <div class="action-btn delete" @click="onDelete">删除</div>
            <div class="action-btn edit" @click="onEdit">编辑</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { getCapsulePosition } from '@/utils/tool';

const navbarPaddingTop = ref(0);
const navbarPaddingRight = ref(0);
const navbarHeight = ref(0);

const excludeIncome = ref(false);
const excludeBudget = ref(false);
const excludeAssets = ref(false);

onMounted(() => {
    initHeader();
});

/**
 * 初始化头部导航栏
 */
 const initHeader = () => {
  // #ifdef MP-WEIXIN
  const { capsuleCenter, capsuleBottom, capsuleTop, capsuleRight, capsuleWidth } = getCapsulePosition();
  navbarPaddingTop.value = capsuleTop - 2;
  navbarHeight.value = capsuleBottom + 15;
  navbarPaddingRight.value = capsuleWidth + 10;
  // #endif
  // #ifndef MP-WEIXIN
  navbarPaddingTop.value = 56;
  navbarHeight.value = 105;
  navbarPaddingRight.value = 111;
  // #endif
  console.log(navbarPaddingTop.value, navbarHeight.value, navbarPaddingRight.value);
}

const goToBack = () => {
  const pages = getCurrentPages(); // 获取当前页面栈  
  if (pages.length > 1) {  
    uni.navigateBack(); // 存在上一页，返回上一页  
  } else {  
    // 如果没有上一页可以返回，可以选择跳转到首页或其他页面  
    uni.redirectTo({  
      url: '/pages/detail/index'
    });  
  } 
}

const onExcludeIncomeChange = (event: any) => {
    excludeIncome.value = event.detail.value;
};

const onExcludeBudgetChange = (event: any) => {
    excludeBudget.value = event.detail.value;
};

const onExcludeAssetsChange = (event: any) => {
    excludeAssets.value = event.detail.value;
};

const onDelete = () => {
    uni.showToast({
        title: '退款功能开发中',
        icon: 'none'
    });
};

const onEdit = () => {
    uni.showToast({
        title: '编辑功能开发中',
        icon: 'none'
    });
};
</script>

<style lang="less" scoped>

.page-container {
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    height: 100%;
    box-sizing: border-box;
    background-color: #F9FAFB;
}

.nav-header {
  background-color: var(--primary-color);
  padding: 0 20rpx;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 200rpx;
  display: flex;
  align-items: flex-start;
  box-sizing: border-box;
}

.nav-box {
    display: flex;
    align-items: center;
    flex-grow: 1;
    height: 74rpx;
    color: #FFFFFF;
    font-weight: bold;
    font-size: 40rpx;
}

.left-arrow-icon-wrap {
  width: 60rpx;
  height: 70rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  .left-arrow-icon-2 {
    border-color: #FFFFFF;
  }
}

.main-content {
    flex: 1;
    padding: 20rpx;
    overflow: auto;
    box-sizing: border-box;
    margin-bottom: 160rpx;
}

.bill-card {
    background-color: #FFFFFF;
    border-radius: 16rpx;
    padding: 30rpx;
    margin-bottom: 30rpx;
    box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.08);
}

.bill-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.bill-left {
    display: flex;
    align-items: center;
}

.icon-wrapper {
    width: 80rpx;
    height: 80rpx;
    background-color: rgba(245, 175, 25, 0.1);
    border-radius: 20rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}

.bill-info {
    margin-left: 20rpx;
}

.bill-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333333;
}

.bill-subtitle {
    font-size:28rpx;
    color: #999999;
    margin-top: 4rpx;
}

.bill-amount {
    font-size: 40rpx;
    font-weight: 500;
    color: #ff4d4f;
}

.detail-card {
    background-color: #FFFFFF;
    border-radius: 16rpx;
    padding: 0 26rpx;
    box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.08);
    margin-bottom: 30rpx;
}

.detail-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40rpx 0;
    border-bottom: 1px solid #f0f0f0;
    gap: 20rpx;
}

.detail-item:last-child {
    border-bottom: none;
}

.detail-label {
    font-size: 30rpx;
    color: #666666;
}

.detail-value-wrapper {
    display: flex;
    align-items: center;
}

.detail-value {
    font-size: 30rpx;
    color: #333333;
    max-width: 440rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.tags-wrapper {
    display: flex;
    gap: 16rpx;
}

.tag-item {
    background-color: #f5f5f5;
    padding: 8rpx 16rpx;
    border-radius: 8rpx;
    font-size: 28rpx;
    color: #666666;
}

.detail-note-wrapper {
    display: flex;
    align-items: center;
    gap: 8rpx;
}

.note-item {
    font-size: 30rpx;
    color: #333333;
    max-width: 500rpx;
}

.bottom-actions {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    height: 160rpx;
    padding: 20rpx;
    box-sizing: border-box;
    background-color: #FFFFFF;
    border-top: 1px solid #f0f0f0;
    display: flex;
    gap: 20rpx;
}

.action-btn {
    flex: 1;
    height: 88rpx;
    line-height: 88rpx;
    text-align: center;
    font-size: 30rpx;
    font-weight: 500;
    border-radius: 8rpx;
}

.delete {
    background-color: #F3F4F6;
    color: #4B5563;
}

.edit {
    background-color: #F5AF19;
    color: #FFFFFF;
}

.switch-btn {
    transform: scale(0.8);
}

.right-arrow-icon-wrap {
    width: 60rpx;
    height: 40rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    .right-arrow-icon-2 {
        width: 16rpx;
        height: 16rpx;
    }
}

</style>