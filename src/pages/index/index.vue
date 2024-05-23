<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <van-button type="primary" @click="handleAsk">提问</van-button>
    <input type="text" v-model="text" style="border: 1px solid #000">
    <p>
      {{ answer }}
    </p>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import http from '../../api/http'
const title = ref('Hello')

const answer = ref('')

const streamData = ref('')

const text = ref('')

const message: any = ref([])

onMounted(async ()=>{
  
})

const getAccessToken = async () => {
  const res: TokenData = await http('https://aip.baidubce.com/oauth/2.0/token', {
    grant_type: 'client_credentials',
    client_id: 'nLUaLKNehpGw23fHfyl8ImR8',
    client_secret: 'PGodayWRBGeVQmjJZ3qacXLTRnUAOMNu'
  })
  if(res.access_token) {
    return res.access_token
  }
  return ''
}

const handleAsk = async () => {
  if(!text.value) return
  message.value.push({
    role: "user",
    content: text.value
  })
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

    
    requestTask.onChunkReceived((res: any) => {
      let uint8Array = new Uint8Array(res.data);

      let decoder = new TextDecoder('utf-8');
      let text = decoder.decode(uint8Array).trim();
      console.log('原始数据：',text);

      let arr: string[] = []

      if(text.slice(0,5) !== 'data:') {
        streamData.value += text
        arr = streamData.value.split('data: ')
        for(let v of arr) {
          if(v) {
            const data = JSON.parse(v)
            console.log(data, '----3444');
            answer.value += data.result
            if(data.is_end) {
              message.value.push({
                role: "assistant",
                content: answer.value
              })
              break
            }
          }
        }
      }
      else if(text.slice(-2) !== '}}') {
        streamData.value = text
      }
      else {
        arr = text.split('data: ')
        for(let v of arr) {
          if(v) {
            const data = JSON.parse(v)
            console.log(data, '----333');
            answer.value += data.result
            if(data.is_end) {
              console.log(message.value,'----0000')
              message.value.push({
                role: "assistant",
                content: answer.value
              })
              break
            }
          }
        }
      }
    })
  }

}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
