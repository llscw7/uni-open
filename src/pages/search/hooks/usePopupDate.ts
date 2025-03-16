import { ref } from 'vue'
import dayjs from 'dayjs';

interface PopupDateSubmitParam {
    type: number;  
    startDate?: dayjs.Dayjs;
    endDate?: dayjs.Dayjs;
    year?: number;
    month?: number;
    day?: number;
}

export function usePopupDate() {
    const popupDateShow = ref(false)
    const setPopupDateShow = (flag: boolean) => {
        popupDateShow.value = flag
    }
    // 日期选择器点击确定
    const handlePopupDateSubmit = (dates: PopupDateSubmitParam) => {
        if(dates.type === 4) {
            console.log(dates.endDate?.format('YYYY-MM-DD'), '------zzzz1111');
            console.log(dates.startDate?.format('YYYY-MM-DD'), '------zzzz222');
        }else {
            console.log(dates.year, dates.month, dates.day, '------zzzz333');
        }
        setPopupDateShow(false)
    }

    return {
        popupDateShow,
        setPopupDateShow,
        handlePopupDateSubmit
    }
}