<template>
    <div class="popup-category">
        <UIPopup :visible="visible" :set-visible="setVisible" :z-index="2000">
            <div class="category-container">
                <div class="category-header" @touchmove.stop.prevent>
                    <div class="category-title">选择类别</div>
                    <div class="submit" @click="submit">确定</div>
                </div>
                <div class="category-grid">
                    <div 
                        v-for="(item, index) in categories" 
                        :key="index" 
                        class="category-item"
                        @click="handleSelectCategory(item.id)"
                    >
                        <div :class="['category-icon', isActived(item.id) ? 'active' : '']">
                            <div class="icon-size-46" :class="categoryIconClass(item.icon, item.id)"></div>
                        </div>
                        <text :class="['category-name', isActived(item.id) ? 'active' : '']">{{ item.name }}</text>
                    </div>
                </div>
            </div>
        </UIPopup>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { categories_in, categories_out } from './categories'
import UIPopup from '@/ui-modules/popup/index.vue';

const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    setVisible: {
        type: Function,
        required: true
    },
    selectTab: {
        type: Number,
        default: 1
    }
})

const categories = ref(categories_out);

watch(() => props.selectTab, (val) => {
    categories.value = val === 1 ? categories_out : categories_in;
})

const selectCategoriesIn = ref(1)
const selectCategoriesOut = ref(1)
const handleSelectCategory = (id: number) => {
    if(props.selectTab === 1) {
        selectCategoriesOut.value = id;
    }else {
        selectCategoriesIn.value = id;
    }
}

const categoryIconClass = (icon: string, id: number) => {
    return `${icon}-icon` + (isActived(id) ? '-yellow': '');
}


const isActived = (id: number) => {
    if(props.selectTab === 1) {
        return selectCategoriesOut.value === id;
    }else {
        return selectCategoriesIn.value === id;
    }
}

const submit = () => {
    if(props.selectTab === 1) {
        emit('submit', selectCategoriesOut.value);
    }else {
        emit('submit', selectCategoriesIn.value);
    }
}

const emit = defineEmits(['submit'])
</script>

<style lang="less" scoped>
.category-container {
    position: relative;
    padding: 0 20rpx 60rpx 20rpx;
}

.category-header {
    position: relative;
    display: flex;
    justify-content: center;
    padding: 30rpx 0;
    .category-title {
        font-size: 38rpx;
        color: #333;
    }
    .submit {
        position: absolute;
        right: 20rpx;
        font-size: 34rpx;
        color: #F5AF19;
    }
}

.category-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20rpx;
    max-height: 1000rpx;
    overflow: auto;
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
</style>