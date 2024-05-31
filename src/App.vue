<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style>
@import "./wxcomponents/vant/common/index.wxss";
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
</style>
