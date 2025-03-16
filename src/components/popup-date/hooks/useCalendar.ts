import { ref, computed } from 'vue'
import dayjs from 'dayjs';

/**
 * 
 * @returns {Object} 返回日历相关数据
 * @property {Ref<dayjs.Dayjs>} customStartDate - 自定义开始日期
 * @property {Ref<dayjs.Dayjs>} customEndDate - 自定义结束日期
 * @property {ComputedRef<Date>} maxDate - 日历中可选的最大日期
 * @property {ComputedRef<Date>} minDate - 日历中可选的最小日期
 * @property {Ref<boolean>} startCalendarShow - 开始日期日历显示
 * @property {Function} setStartCalendarShow - 设置开始日期日历显示
 * @property {Ref<boolean>} endCalendarShow - 结束日期日历显示
 * @property {Function} setEndCalendarShow - 设置结束日期日历显示
 * @property {Function} handleCustomDate - 选择自定义日期选项中的开始或结束日期
 * @property {Function} handleConfirmCalendar - 处理点击确认日期
 */
export function useCalendar() {
    const customDateFlag = ref('start')
    const customStartDate = ref(dayjs().startOf('day').subtract(7, 'day'))
    const customEndDate = ref(dayjs().endOf('day'))

    const maxDate = computed(() => customDateFlag.value === 'start' ? customEndDate.value.toDate() : dayjs().endOf('day').toDate())
    const minDate = computed(() => customDateFlag.value === 'end' ? customStartDate.value.toDate() : dayjs().startOf('day').subtract(1, 'year').toDate())

    console.log(minDate.value, 'minDate')

    const startCalendarShow = ref(false)
    const setStartCalendarShow = (flag: boolean) => {
        startCalendarShow.value = flag
    }
    const endCalendarShow = ref(false)
    const setEndCalendarShow = (flag: boolean) => {
        endCalendarShow.value = flag
        
    }

    const handleCustomDate = async (flag: string) => {
        customDateFlag.value = flag
        if(flag === 'start') setStartCalendarShow(true)
        if(flag === 'end') setEndCalendarShow(true)
    }
    
    const handleConfirmCalendar = (date: dayjs.Dayjs) => {
        console.log('选中日期:', date.format('YYYY年MM月DD日'));
        if(customDateFlag.value === 'start') {
            customStartDate.value = date
            setStartCalendarShow(false)
        }
        if(customDateFlag.value === 'end') {
            customEndDate.value = date
            setEndCalendarShow(false)
        }
    }

    return {
        customStartDate,
        customEndDate,
        maxDate,
        minDate,
        startCalendarShow,
        setStartCalendarShow,
        endCalendarShow,
        setEndCalendarShow,
        handleCustomDate,
        handleConfirmCalendar
    }

}