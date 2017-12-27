<template>
  <div class="bodyClass">
    <Header></Header>
    <div class="rootClass">
      <post-cell :posts="posts"></post-cell>
    </div>
  </div>
</template>

<script>

var test = [{
            _id: 42,
            author: [Object],
            title: 'markdown测试第二',
            content: '<p><a href="https://gold.xitu.io/post/587f8dbd570c3522011c0f59">你真的懂ajax吗？</a></br>\n<a href="http://www.jianshu.com/p/7337ac624b8e">Ajax-hook 原理解析(拦截和处理ajax请求和返回)</a></br>\n<a href="http://www.cnblogs.com/GerryOfZhong/p/6295211.html">ajax上传技术 大文件/超大文件前端切割上传，后端进行重组</a></br>\n<a href="https://github.com/huang303513/WebKeyPointExploration">https://github.com/huang303513/WebKeyPointExploration</a></br>\n<a href="http://www.cnblogs.com/wenanry/archive/2010/02/25/1673368.html">分析输入url到页面返回的过程</a></br></p>',
            pv: 43,
            created_at: '2017年11月9日 14:37:59',
            commentsCount: 0,
            authorId: '18'
        },
        {
            _id: 43,
            author: [Object],
            title: 'asdfasdfasdf',
            content: '<p><img src="http://upload-images.jianshu.io/upload_images/680745-80edab1b32356857?imageMogr2/auto-orient/strip" alt="image"></p>\n',
            pv: 27,
            created_at: '2017年11月9日 14:54:36',
            commentsCount: 1,
            authorId: '20'
        }];

import Header from "~/components/Header.vue";
import PostCell from "~/components/PostCell.vue";
import axios from "axios";
export default {
  components: {
    Header,
    PostCell
  },
  // data() {
  //   return {
  //     posts: []
  //   };
  // },
  async asyncData({ error }) {
    let { success,result } = await axios.get("/api/posts", {
      withCredentials: true
    });
    console.log("===============呵呵==============", result);
    return {
      posts: test
    };
  }
};
</script>

<style lang="less" scoped>
@import "~assets/less/posts.less";
</style>

