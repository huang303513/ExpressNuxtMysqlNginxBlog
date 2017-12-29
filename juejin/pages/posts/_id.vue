<template>
  <div class="bodyClass">
    <Header></Header>
    <div class="rootClass">
      <post-cell :posts="posts"></post-cell>
    </div>
  </div>
</template>

<script>
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
    
  //   let {data} = await axios.get('/api/posts');
  //   console.log("===============呵呵==============");
  //   // let posts = [];
  //   // if (result.status == 200 && result.data) {
  //   //     posts = result.posts;
  //   // } else {
  //   //    error({ statusCode: 400, message: err })
  //   // }
  //  console.log("===============呵呵==============",data);
  //   return {
  //     posts:data
  //   }
    
    let [data] = await Promise.all([
      axios.get('/api/posts'),
    ]).catch(err => {
      error({ statusCode: 400, message: err })
    })

    return {
      posts: data,
    }
  }
};
</script>

<style lang="less" scoped>
@import "~assets/less/posts.less";
</style>

