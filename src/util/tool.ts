function sleep(func: Function, delay: number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(func())
        }, delay)
    })
}

function* step(waitArr: string[], func: Function, delay: number) {
    for (let v of waitArr) {
        yield sleep(() => func(v), delay)
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

export {
    autoRun,
}

