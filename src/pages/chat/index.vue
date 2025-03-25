
<template>
  <view class="chat-container">
    <view class="nav-bar">
      <view class="nav-content">
        <view class="nav-left">
          <uni-icons type="back" size="18" color="#666"/>
          <view class="user-info">
            <text class="username">玩玩玩</text>
            <uni-icons type="bottom" size="12" color="#999"/>
          </view>
        </view>
        <view class="nav-right">
          <text class="wx-btn">微信记账</text>
          <uni-icons type="more" size="18" color="#666"/>
        </view>
      </view>
    </view>

    <scroll-view class="chat-main" scroll-y>
      <view class="chat-list">
        <view class="chat-item">
          <image class="avatar" src="https://ai-public.mastergo.com/ai/img_res/a40c62d76c3f951be415296d433d5047.jpg" mode="aspectFill"/>
          <view class="message-box">
            <text class="message-text">我是小乖，你的 AI 记账管家，可以语音或者文字说开销我来帮你记账，试试这样跟我说：</text>
            <view class="example-tags">
              <text class="tag">吃饭 32</text>
              <text class="tag">买菜 3+2.4</text>
              <text class="tag">昨天工资到账 7000</text>
            </view>
          </view>
        </view>

        <view class="chat-item">
          <image class="avatar" src="https://ai-public.mastergo.com/ai/img_res/fa72a8d263221f0647823964e1ef2a91.jpg" mode="aspectFill"/>
          <view class="message-box">
            <text class="message-text">晚上好，有什么要我记录的吗？</text>
          </view>
        </view>

        <view class="chat-item user">
          <view class="user-message">
            <text class="message-text">打车 20 元</text>
          </view>
        </view>

        <view class="chat-item">
          <image class="avatar" src="https://ai-public.mastergo.com/ai/img_res/fab197ce71c37526f8267417a5d3074c.jpg" mode="aspectFill"/>
          <view class="message-box record-box">
            <view class="record-header">
              <text class="record-title">已记账：</text>
              <text class="record-date">2025年03月07日</text>
            </view>
            <view class="record-content">
              <view class="record-type">
                <view class="type-icon">
                  <uni-icons type="car" size="20" color="#4CD964"/>
                </view>
                <text class="type-text">交通</text>
              </view>
              <text class="record-amount">¥-20.0</text>
            </view>
            <view class="record-actions">
              <text class="action-btn">修改分类</text>
              <text class="action-btn">删除账单</text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>

    <view class="input-bar">
      <view class="input-wrapper">
        <uni-icons type="camera" size="20" color="#666"/>
        <input class="chat-input" type="text" placeholder="点击输入文字" placeholder-class="input-placeholder"/>
        <uni-icons type="mic" size="20" color="#666"/>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
</script>

<style>
page {
  height: 100%;
}

.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: linear-gradient(180deg, #FFF8E7 0%, #FFF 100%);
}

.nav-bar {
  flex-shrink: 0;
  height: 88rpx;
  background-color: #FFFFFF;
  border-bottom: 1px solid #f1f1f1;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32rpx;
  height: 88rpx;
}

.nav-left {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  margin-left: 32rpx;
}

.username {
  font-size: 16px;
  font-weight: 500;
  margin-right: 8rpx;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 32rpx;
}

.wx-btn {
  padding: 8rpx 24rpx;
  background-color: #4CD964;
  color: #FFFFFF;
  font-size: 14px;
  border-radius: 999rpx;
}

.chat-main {
  flex: 1;
  overflow: auto;
}

.chat-list {
  padding: 32rpx;
}

.chat-item {
  display: flex;
  margin-bottom: 32rpx;
}

.chat-item.user {
  justify-content: flex-end;
}

.avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 40rpx;
  flex-shrink: 0;
}

.message-box {
  margin-left: 24rpx;
  background-color: #FFFFFF;
  padding: 32rpx;
  border-radius: 24rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
  max-width: 560rpx;
}

.message-text {
  font-size: 14px;
  color: #333333;
}

.example-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
  margin-top: 24rpx;
}

.tag {
  padding: 8rpx 24rpx;
  background-color: #f5f5f5;
  color: #666666;
  font-size: 14px;
  border-radius: 999rpx;
}

.user-message {
  background-color: #f5af19;
  padding: 24rpx;
  border-radius: 24rpx;
}

.user-message .message-text {
  color: #FFFFFF;
}

.record-box {
  width: 560rpx;
}

.record-header {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #999999;
}

.record-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24rpx;
}

.record-type {
  display: flex;
  align-items: center;
}

.type-icon {
  width: 80rpx;
  height: 80rpx;
  background-color: rgba(76, 217, 100, 0.1);
  border-radius: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.type-text {
  margin-left: 24rpx;
  color: #666666;
}

.record-amount {
  font-size: 20px;
  font-weight: 500;
  color: #333333;
}

.record-actions {
  display: flex;
  gap: 24rpx;
  margin-top: 24rpx;
}

.action-btn {
  padding: 16rpx 32rpx;
  background-color: #f5f5f5;
  color: #666666;
  font-size: 14px;
  border-radius: 999rpx;
}

.input-bar {
  flex-shrink: 0;
  padding: 16rpx 32rpx;
  background-color: #FFFFFF;
  border-top: 1px solid #f1f1f1;
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: 24rpx;
}

.chat-input {
  flex: 1;
  height: 72rpx;
  background-color: #f5f5f5;
  border-radius: 999rpx;
  padding: 0 32rpx;
  font-size: 14px;
}

.input-placeholder {
  color: #999999;
}
</style>

