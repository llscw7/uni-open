<template>
  <view class="content">
    <div class="dialogue" v-for="(item, index) in message" :key="index">
      <div class="dialogue-user" v-if="item.role === 'user'">
        <div class="dialogue-user-content">{{ item.content }}</div>
        <img src="/static/logo.png" alt="" class="avatar">
      </div>
      <div class="dialogue-assistant" v-if="item.role === 'assistant'">
        <img src="/static/gpt.jpeg" alt="" class="avatar">
        <div class="dialogue-assistant-wrap">
          <div class="assistant-content">
            {{ item.content }}
          </div>
          <div class="assistant-option" v-if="item.end">
            <i class="iconfont copy" @click="handleCopy(item.content)">&#xe607;</i>
            <i class="iconfont other">&#xe756;</i>
          </div>
        </div>
      </div>
    </div> 
    <div class="footer">
      <div class="input-wrap">
        <textarea class="ask-input" type="text" v-model="ask_text" placeholder="有问题尽管问我…" adjust-keyboard-to="bottom" :maxlength="-1" fixed auto-height @confirm="handleAsk"></textarea>
        <van-icon name="upgrade" class="ask-confirm" @click="handleAsk" />
      </div>
    </div>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, watch } from 'vue'
import http from '../../api/http'
import { client_id, client_secret } from '../../user'
import { TextEncoder, TextDecoder } from 'text-encoding-shim';
import { autoRun } from '../../util/tool'

const streamData = ref('')

const ask_text = ref('')

const message = reactive<Array<MessageParam>>([])
/**监听AI回答是否结束 */
let timeoutId: any = null;
const waitTime = 500;

watch(message, (newValue, oldValue) => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    /**AI回答结束，展示操作项 */
    message[message.length-1].end = true
    console.log('message在500ms内未发生变化')
    /**AI回答结束，展示操作项 */
  }, waitTime);
}, { deep: true });
/**监听AI回答是否结束 */

const handleCopy = (text: string) => {
  uni.setClipboardData({
    data: text, // 您想要复制的文本
    success: () => {
      uni.showToast({
        title: '复制成功',
        icon: 'success',
        duration: 1500
      });
    },
    fail: () => {
      uni.showToast({
        title: '复制失败',
        icon: 'none',
        duration: 1500
      });
    }
  });
}

let content = ''

const formatData = (text: string) => {
  let arr = text.split('data: ')
  for(let v of arr) {
    if(v) { 
      const data = JSON.parse(v)

      let len = message.length

      if(message[len - 1].role === 'user') {
        message.push({
          role: "assistant",
          content: ""
        })
        len = len + 1
      }

      autoRun(
        data.result.split(''), 
        (val: string)=>{
          message[len - 1].content += val
        },
        50)
      .then(res=>console.log(res,'====end===='))
      if(data.is_end) {
        break
      }
    }
  }
}

const getAccessToken = async () => {
  const res: TokenData = await http('https://aip.baidubce.com/oauth/2.0/token', {
    grant_type: 'client_credentials',
    client_id,
    client_secret
  })
  if(res.access_token) {
    return res.access_token
  }
  return ''
}

const handleAsk = async () => {
  if(!ask_text.value) return
  message.push({
    role: "user",
    content: ask_text.value
  })
  ask_text.value = ''
  const access_token = await getAccessToken()
  if(access_token) {

    const requestTask = wx.request({
      url: `https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/ernie_speed?access_token=${access_token}`,
      responseType: 'arraybuffer', // 确保返回的数据格式是arraybuffer
      enableChunked: true,
      method: "POST",
      data: {
        messages: message,
        stream: true
      },
      success (res: any) {
        console.log(res.data, '1111')
      }
    })

    content = ''

    
    requestTask.onChunkReceived((res: any) => {
      let uint8Array = new Uint8Array(res.data);

      let decoder = new TextDecoder('utf-8');
      let text = decoder.decode(uint8Array).trim();
      // console.log('原始数据：',text);

      if(text.slice(0,5) !== 'data:') {
        streamData.value += text
        formatData(streamData.value)
      }
      else if(text.slice(-2) !== '}}') {
        streamData.value = text
      }
      else {
        formatData(text)
      }
    })
  }

}
</script>

<style lang="less">
.content {
  background-color: #fff;
  width: 100vw;
  min-height: 100vh;
  padding-bottom: 150rpx;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}


.dialogue {
  width: 100vw;
  padding: 40rpx 20rpx;
  box-sizing: border-box;
  .dialogue-user {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: start;
    .dialogue-user-content {
      padding: 20rpx 30rpx;
      background-color: #f4f4f4;
      border-radius: 20rpx;
      margin-right: 20rpx;
    }
  }
  .dialogue-assistant {
    width: 100%;
    display: flex;
    align-items: start;
    justify-content: flex-start;
    .dialogue-assistant-wrap {
      padding: 20rpx 30rpx;
      background-color: #f4f4f4;
      border-radius: 20rpx;
      margin-left: 20rpx;
    }
    .assistant-option {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      border-top: 1rpx solid rgba(0,0,0,0.2);
      padding-top: 15rpx;
      margin-top: 20rpx;
      .copy {
        margin-right: 30rpx;
      }
    }
  }
  .avatar {
    width: 40rpx;
    height: 40rpx;
    flex-shrink: 0;
    margin-top: 20rpx;
  }
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 40rpx;
  box-sizing: border-box;
  
  .input-wrap {
    background-color: #f4f4f4;
    width: 80vw;
    min-height: 50rpx;
    border-radius: 50rpx;
    padding: 30rpx 40rpx;
    display: flex;
    align-items: center;
    position: relative;
  }
  .ask-confirm {
    position: absolute;
    right: 40rpx;
    bottom: 30rpx;
    font-size: 50rpx;
  }
  .ask-input {
    width: 550rpx;
  }
}
</style>
