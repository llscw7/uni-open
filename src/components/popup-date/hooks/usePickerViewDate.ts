import { ref, computed } from 'vue';
import dayjs from 'dayjs';

/**
 * 
 * @returns {Object} 返回日期选择器相关数据
 * @property {Ref<{year: number, month: number, day: number}>} w_data - tab为周账单时 选中的日期
 * @property {Ref<{year: number, month: number}>} m_data - tab为月账单时 选中的日期
 * @property {Ref<{year: number}>} y_data - tab为年账单时 选中的日期
 * @property {Ref<number[]>} years - 年份列表
 * @property {Ref<number[]>} months - 月份列表
 * @property {ComputedRef<number[]>} days - 日列表
 * @property {Ref<number[]>} defaultDate - 默认选中的日期
 * @property {string} indicatorStyle - 日期选择器样式
 * @property {boolean} pickerVisible - 日期选择器是否显示
 * @property {Function} bindChange - 日期选择器选中日期改变时触发
 */
export function usePickerViewDate() {
    const date = dayjs();
    const years = ref<number[]>([]);
    const months = ref<number[]>([]);

    // 初始化年份列表
    for (let i = 1990; i <= date.year(); i++) {
        years.value.push(i);
    }

    // 初始化月份列表
    for (let i = 1; i <= 12; i++) {
        months.value.push(i);
    }

    const indicatorStyle = `height: 50px;`;
    const pickerVisible = true;

    const w_data = ref({ year: date.year(), month: date.month()+ 1, day: date.date() });
    const m_data = ref({ year: date.year(), month: date.month() + 1 });
    const y_data = ref({ year: date.year() });
    console.log(w_data,'当前月')

    const days = computed<number[]>(() => {
        const totalDays = dayjs(`${w_data.value.year}-${w_data.value.month}`).daysInMonth(); // 当前月的总天数
        const daysArray = [];
        for (let i = 1; i <= totalDays; i++) {
            daysArray.push(i);
        }
        return daysArray;
    });

    const defaultDate = ref([years.value.indexOf(w_data.value.year), months.value.indexOf(w_data.value.month), days.value.indexOf(w_data.value.day)])


    const bindChange = (e: any, selectTab: number) => {
        const val = e.detail.value;
        if (selectTab === 1) {
            w_data.value.year = years.value[val[0]];
            w_data.value.month = months.value[val[1]];
            w_data.value.day = days.value[val[2]];
        } else if (selectTab === 2) {
            m_data.value.year = years.value[val[0]];
            m_data.value.month = months.value[val[1]];
        } else if (selectTab === 3) {
            y_data.value.year = years.value[val[0]];
        }
    };

    return {
        w_data,
        m_data,
        y_data,
        years,
        months,
        days,
        defaultDate,
        indicatorStyle,
        pickerVisible,
        bindChange,
    };
}