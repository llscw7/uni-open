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

            <div class="detail-card">
                <div class="detail-item">
                    <div class="left">
                        <div class="calendar-icon-2 icon-size-40"></div>
                        <text class="detail-text">今天</text>
                    </div>
                    <uni-icons type="right" size="14" color="#ddd" />
                </div>

                <div class="detail-item">
                    <div class="left">
                        <div class="note-icon icon-size-40"></div>
                        <input type="text" placeholder="添加备注" class="detail-input" />
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
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { categories_in, categories_out } from './modules/popup-category/categories'
import { moveToFirst } from '@/utils/tool';
import Layout from '@/components/layout/normal.vue';
import PopupCategory from './modules/popup-category/index.vue';

/** 支出、收入tab模块 */
const selectTab = ref(1)
const tabs = ref([
    { title: '支出', id: 1 },
    { title: '收入', id: 2 }
]);
const handleSelectTab = (id: number) => {
    selectTab.value = id;
    if (id === 1) {
        const value = uni.getStorageSync('categories_out');
        if (value) {
            categories.value = JSON.parse(value);
        } else {
            categories.value = categories_out;
        }
    } else {
        const value = uni.getStorageSync('categories_in');
        if (value) {
            categories.value = JSON.parse(value);
        } else {
            categories.value = categories_in;
        }
    }
}
/** 支出、收入tab模块 */

/** 细分类别选择模块 */
const categories = ref(categories_out);
const selectCategoriesIn = ref(1)
const selectCategoriesOut = ref(1)

onMounted(() => {
    initCategories();
})

// 初始化分类 获取本地存储的分类数据
const initCategories = () => {
    try {
        const outData = uni.getStorageSync('categories_out');
        if (outData) {
            selectCategoriesOut.value = JSON.parse(outData)[0].id;
            // 默认选中tab为支出，所以只初始化支出的分类
            categories.value = JSON.parse(outData);
        }

        const inData = uni.getStorageSync('categories_in');
        if (inData) {
            selectCategoriesIn.value = JSON.parse(inData)[0].id;
        }

    } catch (e) {
        // error
        console.error(e);
    }
}

// 选择细分类别
const handleSelectCategory = (id: number) => {
    if (selectTab.value === 1) {
        selectCategoriesOut.value = id;
    } else {
        selectCategoriesIn.value = id;
    }
}

// 判断是否选中
const isActived = (id: number) => {
    if (selectTab.value === 1) {
        return selectCategoriesOut.value === id;
    } else {
        return selectCategoriesIn.value === id;
    }
}

// 初始化图标样式
const categoryIconClass = (icon: string, id: number) => {
    return `${icon}-icon` + (isActived(id) ? '-yellow' : '');
}

/** 细分类别选择模块 */


/** 高级功能模块 */
const showOptionsFlag = ref(false)
// 判断是否固定展开显示高级功能
const pinFlag = ref(false)

const showOptions = () => {
    showOptionsFlag.value = !showOptionsFlag.value;
}
const handlePin = () => {
    pinFlag.value = !pinFlag.value;
}
/** 高级功能模块 */



/** 类别选择弹窗模块 */
const visible = ref(false);
const setVisible = (val: boolean) => {
    visible.value = val;
}

const selectMore = () => {
    setVisible(true);
}

const handlePopupCategorySubmit = (id: number) => {
    if (selectTab.value === 1) {
        const index = categories.value.findIndex(item => item.id === id);
        if (index) {
            categories.value = moveToFirst(categories.value, index);
            selectCategoriesOut.value = id;
            uni.setStorage({
                key: 'categories_out',
                data: JSON.stringify(categories.value),
                success: function () {
                    console.log('success');
                }
            });
        } else {
            console.error('categories id not found');
        }
    } else {
        const index = categories.value.findIndex(item => item.id === id);
        if (index) {
            categories.value = moveToFirst(categories.value, index);
            selectCategoriesIn.value = id;
            uni.setStorage({
                key: 'categories_in',
                data: JSON.stringify(categories.value),
                success: function () {
                    console.log('success');
                }
            });
        } else {
            console.error('categories id not found');
        }
    }
    setVisible(false);
}
/** 类别选择弹窗模块 */

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
}

.detail-input {
    font-size: 28rpx;
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