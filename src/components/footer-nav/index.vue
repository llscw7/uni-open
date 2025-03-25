<template>
    <div class="tab-bar">

        <div class="tab-item" :class="{ 'active': activeFlag === item.id }" v-for="item in tabList"
            @click="handleNav(item)">
            <div class="icon-size-40" :class="[activeFlag === item.id ? item.selectedIcon : item.icon]"></div>
            <text class="tab-text">{{ item.text }}</text>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
const activeFlag = ref(1);

interface TabItem {
    id: number;
    pagePath: string;
    text: string;
    icon: string;
    selectedIcon: string;
}

const tabList = ref([
    {
        id: 1,
        pagePath: '/pages/index/index',
        text: '首页',
        icon: 'home-icon',
        selectedIcon: 'home-icon-actived',
    },
    {
        id: 2,
        pagePath: '/pages/graph/index',
        text: '统计',
        icon: 'statistics-icon',
        selectedIcon: 'statistics-icon-actived',
    },
    {
        id: 3,
        pagePath: '/pages/chat/index',
        text: '聊天',
        icon: 'chat-icon-2',
        selectedIcon: 'chat-icon-2-actived',
    },
    {
        id: 4,
        pagePath: '/pages/asset/index',
        text: '资产',
        icon: 'asset-icon',
        selectedIcon: 'asset-icon-actived',
    },
    {
        id: 5,
        pagePath: '/pages/my/index',
        text: '我的',
        icon: 'mine-icon',
        selectedIcon: 'mine-icon-actived',
    },
]);

// onMounted(() => {
//     updateCurrentIndex();
// });

const updateCurrentIndex = () => {
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const currentPath = currentPage.route;
    for (let i = 0; i < tabList.value.length; i++) {
        if (tabList.value[i].pagePath === `/${currentPath}`) {
            activeFlag.value = tabList.value[i].id;
            break;
        }
    }
}

const handleNav = (data: TabItem) => {
    activeFlag.value = data.id;
    uni.switchTab({
        url: data.pagePath
    });
}
</script>

<style lang="less" scoped>
.tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 130rpx;
    background: #FFFFFF;
    border-top: 2rpx solid #E5E7EB;
    display: flex;
    padding: 0 48rpx;
    padding-bottom: 10rpx;
    z-index: 100;
}

.tab-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.tab-text {
    font-size: 24rpx;
    color: #999999;
    margin-top: 8rpx;
}

.tab-item.active .tab-text {
    color: var(--primary-color);
}
</style>