import { ref } from 'vue'
import { moveToFirst } from '@/utils/tool';
import { useCategories } from './useCategories'

const { categories, selectCategoriesIn, selectCategoriesOut, selectTab } = useCategories()

// 弹窗是否显示
const visible = ref(false);
/**
 * 
 * @returns {Object} 返回类别选择弹窗数据
 * @property {Ref<boolean>} visible - 弹窗是否显示
 * @property {Function} setVisible - 设置弹窗是否显示
 * @property {Function} selectMore - 选择更多类别
 * @property {Function} handlePopupCategorySubmit - 点击确定按钮 提交选择类别
 */
export function usePopupCategory() {
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

    return {
        visible,
        setVisible,
        selectMore,
        handlePopupCategorySubmit
    }

}