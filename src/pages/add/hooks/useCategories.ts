import { ref, onMounted } from 'vue'
import { categories_out, categories_in } from './categories'

const categories = ref(categories_out);
const selectCategoriesIn = ref(1)
const selectCategoriesOut = ref(1)
const selectTab = ref(1)
/**
 * 
 * @returns {Object} 返回类别相关数据
 * @property {Ref<number>} selectTab - 选中的tab 支出 1 收入 2
 * @property {Object[]} tabs - tab数据
 * @property {Function} handleSelectTab - 选择tab
 * @property {Object[]} categories - 类别数据
 * @property {Ref<number>} selectCategoriesIn - 选中的收入类别 id
 * @property {Ref<number>} selectCategoriesOut - 选中的支出类别 id
 * @property {Function} handleSelectCategory - 选择类别
 * @property {Function} isActived - 判断是否选中
 * @property {Function} categoryIconClass - 初始化类别图标样式
 */
export function useCategories() {
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

    return {
        selectTab,
        tabs,
        handleSelectTab,
        categories,
        selectCategoriesIn,
        selectCategoriesOut,
        handleSelectCategory,
        isActived,
        categoryIconClass
    }

}