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
export function usePickerViewDate(pick_end_wait_time: number) {
    const pickerEndFlag = ref(true); 

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

    const w_data = ref({ year: date.year(), month: date.month()+ 1, day: date.date() });
    const m_data = ref({ year: date.year(), month: date.month() + 1 });
    const y_data = ref({ year: date.year() });

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
            /** 存在场景：2025年3月31日，切换到2月，只变化了代表月的val[1]的值，代表日的val[2]依旧为31，需要手动修改为2月的最后一天 */ 
            if(days.value.length > val[2]) {
                w_data.value.day = days.value[val[2]];
                defaultDate.value = val;
            }
            else {
                w_data.value.day = days.value.at(-1) ?? 1;
                defaultDate.value = [val[0], val[1], days.value.at(-1) ?? 1];
            }
            /** 存在场景：2025年3月31日，切换到2月，只变化了代表月的val[1]的值，代表日的val[2]依旧为31，需要手动修改为2月的最后一天 */ 
        } else if (selectTab === 2) {
            m_data.value.year = years.value[val[0]];
            m_data.value.month = months.value[val[1]];
            defaultDate.value = val;
        } else if (selectTab === 3) {
            y_data.value.year = years.value[val[0]];
            defaultDate.value = val;
        }
    };

    /**
     * 校验日期是否有效
     * 校验逻辑：传入2025年2月29日，由于2025年2月没有29日，格式化后的日期自动加一，为2025-03-01，所以需要判断格式化后的日期是否和传入的日期一致
     * @param year 
     * @param month 
     * @param day 
     * @returns 
     */
    function isValidDate(year: number, month: number, day: number) {
        const date = dayjs(`${year}-${month}-${day}`)
        const dateString = date.format('YYYY-MM-DD');
        // 使用正则表达式验证日期格式是否符合YYYY-MM-DD
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(dateString)) {
            return false; // 不符合格式要求
        }
    
        return date.year() === year && (date.month() + 1) === month && date.date() === day;
    }  

    const handlePickend = () => {
        console.log('handlePickend====');
        setTimeout(() => {
            pickerEndFlag.value = true;
        }, pick_end_wait_time);
    }

    const handlePickStart = () => {
        pickerEndFlag.value = false;
    }

    return {
        w_data,
        m_data,
        y_data,
        years,
        months,
        days,
        defaultDate,
        indicatorStyle,
        pickerEndFlag,
        bindChange,
        isValidDate,
        handlePickend,
        handlePickStart
    };
}