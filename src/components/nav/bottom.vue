<template>
    <div class="nav">
        <div class="nav-list">
            <div class="list-item" @click="handleTab(1)">
                <van-icon name="wap-home-o"  class="item-icon" />
                <div class="item-title">首页</div>
            </div>
            <div class="list-item" @click="handleTab(2)">
                <van-icon name="chat-o"  class="item-icon" />
                <div class="item-title">对话</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
defineOptions({
    name: 'BottomNav'
})
const handleTab = (data: number) => {
    console.log(data,'-----')
    uni.navigateTo({
        url: '/pages/index/index'
    })
}
</script>

<style scoped lang="less">
.nav {
    height: 160rpx;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background-color: #efefef;
    .nav-list {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
        padding-bottom: 50rpx;
        box-sizing: border-box;
        .list-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            flex-grow: 1;
            // background-color: aqua;
            .item-icon {
                font-size: 50rpx;
            }
            .item-title {
                font-size: 30rpx;
                padding-top: 5rpx;
            }
        }
    }
    
}
</style>