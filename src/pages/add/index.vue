<template>
    <!-- 用于弹窗展示时，阻止页面滚动 -->
    <page-meta :page-style="visible ? 'overflow: hidden;' : 'overflow: auto;'" />
    <Layout title="记一笔">
        <div class="main-content">
            <div class="amount-card">
                <div class="amount-input">
                    <text class="currency">¥</text>
                    <input type="digit" class="input" placeholder="0.00" />
                </div>
            </div>

            <div class="detail-card">
                <div class="detail-item" @click="setCalendarShow(true)">
                    <div class="left">
                        <div class="calendar-icon-2 icon-size-40"></div>
                        <text class="detail-text">{{ customDate.format('YYYY-MM-DD HH:mm') }}</text>
                    </div>
                    <uni-icons type="right" size="14" color="#ddd" />
                </div>

                <div class="detail-item">
                    <div class="left">
                        <div class="note-icon icon-size-40"></div>
                        <textarea v-model="notes" type="text" placeholder="添加备注" class="notes-input" id="notes-input" :auto-height="true" :maxlength="200" confirm-type="done"  :show-confirm-bar="false" :cursor-spacing="30" />
                    </div>
                </div>
            </div>

            <div class="type-card">
                <div class="tab-wrapper">
                    <div class="tab" :class="{ 'active': selectTab === tab.id }" v-for="(tab, index) in tabs"
                        :key="index" @click="handleSelectTab(tab.id)">
                        <text>{{ tab.title }}</text>
                        <div class="active-line" v-if="selectTab === tab.id"></div>
                    </div>
                </div>

                <div class="category-grid">
                    <div v-for="(item, index) in categories.slice(0, 9)" :key="index" class="category-item"
                        @click="handleSelectCategory(item.id)">
                        <div :class="['category-icon', isActived(item.id) ? 'active' : '']">
                            <div class="icon-size-46" :class="categoryIconClass(item.icon, item.id)"></div>
                        </div>
                        <text :class="['category-name', isActived(item.id) ? 'active' : '']">{{ item.name }}</text>
                    </div>
                    <div class="category-item" @click="selectMore">
                        <div class="category-icon">
                            <div class="more-icon icon-size-46"></div>
                        </div>
                        <text class="category-name">更多</text>
                    </div>
                </div>
            </div>

            <div class="detail-option" @click="showOptions">
                <div class="option-item">高级功能</div>
                <div class="option-wrap">
                    <div class="pin-icon-wrap" v-if="showOptionsFlag" @click.stop="handlePin">
                        <div class="pin-icon icon-size-40" :class="{ 'actived': pinFlag }"></div>
                    </div>
                    <div class="down-arrow-icon icon-size-40" :class="{ 'actived': showOptionsFlag }"></div>
                </div>
            </div>

            <div class="detail-card" v-if="showOptionsFlag">
                <div class="detail-item">
                    <div class="left">
                        <div class="tag-icon icon-size-40"></div>
                        <text class="detail-text gray">选择标签</text>
                    </div>
                    <uni-icons type="right" size="14" color="#ddd" />
                </div>

                <div class="detail-item">
                    <div class="left">
                        <div class="book-icon-2 icon-size-40"></div>
                        <text class="detail-text gray">选择账本</text>
                    </div>
                    <uni-icons type="right" size="14" color="#ddd" />
                </div>

                <div class="detail-item">
                    <div class="left">
                        <div class="account-icon icon-size-40"></div>
                        <text class="detail-text gray">不选择账户</text>
                    </div>
                    <uni-icons type="right" size="14" color="#ddd" />
                </div>
            </div>

            <div class="switch-card" v-if="showOptionsFlag">
                <div class="switch-item">
                    <text>不计入收支</text>
                    <switch color="#F5AF19" class="switch-btn" />
                </div>
                <div class="switch-item">
                    <text>不计入预算</text>
                    <switch color="#F5AF19" class="switch-btn" />
                </div>
            </div>
        </div>

        <div class="bottom-actions">
            <button class="save-btn">保存</button>
        </div>
    </Layout>
    <PopupCategory :visible="visible" :set-visible="setVisible" :select-tab="selectTab"
        @submit="handlePopupCategorySubmit" />
    <UIDialogCalendar :show="calendarShow" :set-show="setCalendarShow" :default-value="customDate.toDate()" :z-index="2000" @confirm="handleConfirmCalendar" :min-date="minDate" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Layout from '@/components/layout/normal.vue';
import PopupCategory from './modules/popup-category/index.vue';
import { useCategories } from './hooks/useCategories';
import { usePopupCategory } from './hooks/usePopupCategory';
import UIDialogCalendar from '@/ui-modules/calendar/dialog-calendar.vue';
import dayjs from 'dayjs';


const notes = ref('');

const customDate = ref(dayjs());
const minDate = ref(dayjs().subtract(1, 'year').toDate());
const calendarShow = ref(false);
const setCalendarShow = (val: boolean) => {
    calendarShow.value = val;
}
const handleConfirmCalendar = (date: Date) => {
    customDate.value = dayjs(date);
    setCalendarShow(false);
}

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

/** 类别选择弹窗模块 */
const {
    visible,
    setVisible,
    selectMore,
    handlePopupCategorySubmit
} = usePopupCategory();
/** 类别选择弹窗模块 */

/** 高级功能模块 */
const showOptionsFlag = ref(false)
// 判断是否固定展开显示高级功能
const pinFlag = ref(false)

uni.getStorage({
    key: 'pinFlag',
    success: (res) => {
        console.log(res, 'res', typeof res.data);
        pinFlag.value = res.data;
        if(res.data) {
            showOptionsFlag.value = true;
        }
    }
});

const showOptions = () => {
    if(pinFlag.value) return;
    showOptionsFlag.value = !showOptionsFlag.value;
}
const handlePin = () => {
    pinFlag.value = !pinFlag.value;
    uni.setStorage({
        key: 'pinFlag',
        data: pinFlag.value
    });
}
/** 高级功能模块 */

</script>

<style lang="less" scoped>

.main-content {
    flex: 1;
    padding: 20rpx;
    overflow: auto;
    box-sizing: border-box;
    margin-bottom: 160rpx;
}

.amount-card {
    background: #fff;
    border-radius: 20rpx;
    padding: 30rpx;
    margin-bottom: 20rpx;
}

.amount-input {
    display: flex;
    align-items: center;
    gap: 16rpx;
}

.currency {
    font-size: 48rpx;
    color: #333;
}

.input {
    flex: 1;
    font-size: 48rpx;
    font-weight: 500;
    height: 70rpx;
}

.type-card {
    background: #fff;
    border-radius: 20rpx;
    padding: 30rpx;
    margin-bottom: 20rpx;
}

.tab-wrapper {
    display: flex;
    gap: 48rpx;
    margin: -16rpx 0 24rpx;
    border-bottom: 2rpx solid #f5f5f5;
}

.tab {
    position: relative;
    padding: 24rpx 0;
}

.tab text {
    font-size: 28rpx;
    color: #999;
}

.tab.active text {
    color: #F5AF19;
    font-weight: 500;
}

.active-line {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4rpx;
    background: #F5AF19;
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

.detail-option {
    background: #fff;
    border-radius: 20rpx;
    padding: 30rpx;
    margin-bottom: 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.option-wrap {
    display: flex;
    align-items: center;
    gap: 16rpx;
}

.pin-icon-wrap {
    display: flex;
    align-items: center;

    .pin-icon {
        transform: rotate(45deg);
        transition: transform 0.3s;
    }

    .pin-icon.actived {
        transform: rotate(0);
    }
}

.option-item {}

.down-arrow-icon {
    transform: rotate(0);
    transition: transform 0.3s;
}

.down-arrow-icon.actived {
    transform: rotate(180deg);
}

.detail-card {
    background: #fff;
    border-radius: 20rpx;
    padding: 30rpx;
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

.left {
    display: flex;
    align-items: center;
    gap: 16rpx;
    width: 100%;
    overflow: hidden;
}

.detail-input {
    font-size: 28rpx;
    width: 600rpx;
    white-space: pre-wrap;
}

.notes-input {
    font-size: 28rpx;
    width: 100%;
    white-space: pre-wrap;
    word-wrap: break-word;
}

.detail-text {
    font-size: 28rpx;
    color: #333;
}

.detail-text.gray {
    color: #999;
}

.switch-card {
    background: #fff;
    border-radius: 20rpx;
    padding: 30rpx;
}

.switch-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24rpx;
}

.switch-item:last-child {
    margin-bottom: 0;
}

.switch-item text {
    font-size: 28rpx;
    color: #333;
}

.switch-btn {
    transform: scale(0.8);
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

.save-btn {
    background: #F5AF19;
    color: #fff;
    font-size: 32rpx;
    padding: 0 120rpx;
    height: 80rpx;
    line-height: 80rpx;
    border-radius: 8rpx;
}
</style>