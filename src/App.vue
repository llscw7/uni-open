<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";

onLaunch(() => {
  uni.hideTabBar({
    success: () => {
      console.log("隐藏 tabBar 成功");
    },
    fail: (err) => {
      console.log("隐藏 tabBar 失败", err);
    }
  });
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<template>

</template>
<style lang="less">
@import './common/style/common.css';
@import './common/style/icon/in-icon.css';
@import './common/style/icon/out-icon.css';
@import './common/style/icon/other-icon.css';
@import './common/style/theme.css';
@font-face {
  font-family: 'iconfont';  /* Project id 4569308 */
  src: url('//at.alicdn.com/t/c/font_4569308_ymsvqclxgsr.woff2?t=1717139133007') format('woff2'),
       url('//at.alicdn.com/t/c/font_4569308_ymsvqclxgsr.woff?t=1717139133007') format('woff'),
       url('//at.alicdn.com/t/c/font_4569308_ymsvqclxgsr.ttf?t=1717139133007') format('truetype');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
}
/* 在线链接服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
@font-face {
  font-family: 'iconfont2';  /* Project id 4830125 */
  src: url('//at.alicdn.com/t/c/font_4830125_egly426urqs.woff2?t=1740226941110') format('woff2'),
       url('//at.alicdn.com/t/c/font_4830125_egly426urqs.woff?t=1740226941110') format('woff'),
       url('//at.alicdn.com/t/c/font_4830125_egly426urqs.ttf?t=1740226941110') format('truetype');
}
.iconfont2{
    font-family:"iconfont2" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
}
// page {
//   --primary-color: #348F50;
// }
</style>
