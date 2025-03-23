import { ref } from 'vue';
import dayjs from 'dayjs';

const customDate = ref(dayjs());
const minDate = ref(dayjs().subtract(1, 'year').toDate());
const calendarShow = ref(false);

/**
 * 
 * @returns {Object} 返回日期选择器相关数据
 * @property {Ref<dayjs.Dayjs>} customDate - 选中的日期
 * @property {Ref<Date>} minDate - 最小日期
 * @property {Ref<boolean>} calendarShow - 日期选择器是否显示
 * @property {Function} setCalendarShow - 设置日期选择器是否显示
 * @property {Function} handleConfirmCalendar - 点击确定按钮 提交选择日期
 */
export function useDialogCalendar() {
    
    const setCalendarShow = (val: boolean) => {
        calendarShow.value = val;
    }
    const handleConfirmCalendar = (date: Date) => {
        customDate.value = dayjs(date);
        setCalendarShow(false);
    }
    return {
        customDate,
        minDate,
        calendarShow,
        setCalendarShow,
        handleConfirmCalendar,
    }

}