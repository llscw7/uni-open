<template>
  <view class="content">
    <div class="dialogue" v-for="item in message">
      <div class="dialogue-user" v-if="item.role === 'user'">
        <div class="dialogue-user-content">{{ item.content }}</div>
        <img src="/static/logo.png" alt="" class="avatar">
      </div>
      <div class="dialogue-assistant" v-if="item.role === 'assistant'">
        <img src="/static/logo.png" alt="" class="avatar">
        <div class="dialogue-assistant-content">{{ item.content }}</div>
      </div>
    </div>
    <div class="dialogue" v-if="answer">
      <div class="dialogue-assistant">
        <img src="/static/logo.png" alt="" class="avatar">
        <div class="dialogue-assistant-content">{{ answer }}</div>
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
import { ref, onMounted } from 'vue'
import http from '../../api/http'
import { client_id, client_secret } from '../../user'
import { TextEncoder, TextDecoder } from 'text-encoding-shim';
import { autoRun } from '../../util/tool'

const answer = ref('')

const streamData = ref('')

const ask_text = ref('')

const message = ref<Array<MessageParam>>([])

let content = ''

const formatData = (text: string) => {
  let arr = text.split('data: ')
  for(let v of arr) {
    if(v) { 
      const data = JSON.parse(v)
      content += data.result
      autoRun(data.result.split(''), (val: string)=>(answer.value+=val), 10).then(res=>console.log(res,'====end===='))
      if(data.is_end) {
        message.value.push({
          role: "assistant",
          content: content
        })
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
  answer.value = ''
  message.value.push({
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
        messages: message.value,
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

      let arr: string[] = []

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
    .dialogue-assistant-content {
      padding: 20rpx 30rpx;
      background-color: #f4f4f4;
      border-radius: 20rpx;
      margin-left: 20rpx;
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
