<template>
    <div class="marked">
        <div class="marked-preview">
            <rich-text :nodes="html"></rich-text>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import {Marked} from 'marked'
import {markedHighlight} from "marked-highlight";
import hljs from "highlight.js"
import 'highlight.js/styles/monokai-sublime.css';


const props = defineProps({
  value: {
    type: String,
    required: true,
  }
})

const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang, info) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value
    }
  })
)
marked.use({
    gfm: true,
    breaks: true
});


const html = computed(() => {
  // const format = md.value.replace(/\n/g, "<br>")
  const dom = marked.parse(props.value.trim())
  if(typeof dom === 'string') {
    return dom.replace('<code>', '<code class="code">')
  }else {
    return dom
  }
});


</script>

<style lang="less">
/* Markdown 样式设置 */
.marked-preview .hljs{
    display: block;
    background-color: #283646;
    padding: 20rpx;
    overflow-y: auto;
    font-weight: 300;
    font-family: Menlo, monospace;
    border-radius: 10rpx;
}
.marked-preview .code {
    display: inline-block ;
    background-color: #283646;
    border-radius:3px;
    font-size: 14px;
    padding-left: 5px;
    padding-right: 5px;
    color:#fff;
    margin: 0px 3px;
    padding: 8rpx;
}
.marked-preview ul,.marked-preview li {
    list-style: revert;
    margin-left: 40rpx;
}
.marked-preview li {margin: 5rpx 0;}
.marked-preview blockquote {
    border-left: 4rpx solid #ccc;
    margin-bottom: 5rpx;
    margin-top: 5rpx;
    padding-left: 16rpx;
}
.marked-preview blockquote p {
    margin: 0;
}
.marked-preview {
    max-width: 80vw;
    // padding: 0 20rpx;
    h1,h2,h3,h4,h5,h6 {
        /* padding: 20rpx 0; */
        /* padding-bottom: 0rpx; */
    }
}

.marked-preview table{
    text-align:center;
    padding:0 10rpx;
}
.marked-preview a {
    color: #29B5E8;
}
.marked-preview a:hover {
    color:#fff;
    background-color: #98a3b1;
}
.marked-preview img {
    max-width: 100%;
    transition: all 0.3s ease-out;
}
.marked-preview img:hover {
    transform: scale3d(1.01,1.01,1);
    box-shadow: 0rpx 0rpx 5rpx 5rpx rgba(0, 0, 0, .2);
}
</style>