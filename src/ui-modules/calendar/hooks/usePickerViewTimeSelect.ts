import { ref } from 'vue';
import dayjs from 'dayjs';

const indicatorStyle = `height: 40px;`;
const timeVisible = ref(false);

const hours = ref<string[]>([]);
const minutes = ref<string[]>([]);
const currentTime = ref(dayjs().format('HH:mm'));
const hour = currentTime.value.split(':')[0];
const minute = currentTime.value.split(':')[1];
const defaultTime = ref([hours.value.indexOf(hour), minutes.value.indexOf(minute)]);


/**
 * 
 * @returns {Object} 返回时间选择器相关数据
 * @property {string} indicatorStyle - 时间选择器样式
 * @property {Ref<boolean>} timeVisible - 时间选择器是否显示
 * @property {Ref<string[]>} hours - 小时列表
 * @property {Ref<string[]>} minutes - 分钟列表
 * @property {Ref<string>} currentTime - 当前时间
 * @property {Ref<number[]>} defaultTime - 默认选中的时间
 * @property {Function} bindChange - 时间选择器选中时间改变时触发
 */
export function usePickerViewTimeSelect() {
    for (let i = 0; i <= 59; i++) {
        if (i < 10) {
            hours.value.push('0' + i);
            minutes.value.push('0' + i);
        } else if (i < 24) {
            hours.value.push('' + i);
            minutes.value.push('' + i);
        } else {
            minutes.value.push('' + i);
        }
    }
    
    const bindChange = (e: any) => {
        const val = e.detail.value;
        currentTime.value = dayjs().hour(val[0]).minute(val[1]).format('HH:mm');
        const hour = currentTime.value.split(':')[0];
        const minute = currentTime.value.split(':')[1];
        defaultTime.value = [hours.value.indexOf(hour), minutes.value.indexOf(minute)];
    };

    return {
        indicatorStyle,
        timeVisible,
        hours,
        minutes,
        currentTime,
        defaultTime,
        bindChange,
    }
}