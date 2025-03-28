function wait(func: Function, delay: number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(func())
        }, delay)
    })
}

function* step(waitArr: string[], func: Function, delay: number) {
    for (let v of waitArr) {
        yield wait(() => func(v), delay)
    }
}

function queue(obj: any, pre: string) {
    return new Promise((resolve, reject) => {
        function run(pre: string) {
            let { value, done } = obj.next(pre);
            if (done) {
                console.log('complete');
                resolve(true); // 返回最终结果
                return;
            }
            value.then((res: string) => {
                run(res);
            });
        }

        run(pre);
    });
}

let flag = true
let ll: string[] = []
/**
 * 队列输出函数
 * @param arr 队列数组
 * @param func 对数组执行特定操作的函数
 * @param delay 输出时间间隔
 * @returns 
 */
async function autoRun(arr: string[], func: Function, delay: number) {
  // 需要有个数组来存储后面进来的数组
  ll.push(...arr)
  if(!ll.length || !flag) {
    return 
  }
  flag = false
  let iterator = step(ll.slice(), func, delay)
  ll = []
  const f = await queue(iterator, '')
  if(f) { // 当前队列执行完毕，可以进行下一队列的执行
    flag = true
    if(ll.length) {
      autoRun([], func, delay)
    }
  }
}

/**
 * 获取胶囊按钮位置信息
 * @returns 
 */
function getCapsulePosition() {
     // 获取胶囊按钮信息
  const menuButtonInfo = uni.getMenuButtonBoundingClientRect();

  // 胶囊按钮的垂直中心位置
  const capsuleCenter = menuButtonInfo.top + menuButtonInfo.height / 2;

  const systemInfo = uni.getSystemInfoSync();  
    const screenWidth = systemInfo.screenWidth;

    const capsuleToRight = screenWidth - menuButtonInfo.right;

    return {
        capsuleCenter,
        capsuleTop: menuButtonInfo.top,
        capsuleRight: menuButtonInfo.left,
        capsuleBottom: menuButtonInfo.bottom,
        capsuleWidth: screenWidth - menuButtonInfo.left + capsuleToRight,
    };
}

/**
 * 休眠函数
 * @param ms 休眠时间
 * @returns 
 */
function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 节流函数
 * @param func 要执行的函数
 * @param delay 延迟时间
 * @returns 
 */
function throttle(func: Function, delay: number) {
    let lastCall = 0;
    return function(...args: any[]) {
        const now = new Date().getTime();
        if (now - lastCall >= delay) {
            lastCall = now;
            return func(...args);
        }
    };
}

/**
 * 防抖函数
 * @param func 要执行的函数
 * @param delay 延迟时间
 * @returns 
 */
function debounce(func: Function, delay: number) {
    let timer: any = null;
    return function(...args: any[]) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

/**
 * 将数组中的元素移动到数组的开头
 * @param arr 数组
 * @param index 索引
 * @returns 
 */
function moveToFirst(arr: any[], index: number) {
    let newArr = arr.slice(); // 创建原数组的副本
    let item = newArr.splice(index, 1)[0]; // 移除指定索引的元素
    newArr.unshift(item); // 将移除的元素插入到数组开头
    return newArr;
}


export {
    autoRun,
    getCapsulePosition,
    sleep,
    throttle,
    debounce,
    moveToFirst
}

