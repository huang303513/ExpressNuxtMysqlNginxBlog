<template>
  <div>
    <ul>
      <li v-for="(post,index) in posts" :key="post._id">
        <p class="li-title">{{post.title}}</p>
        <p class="li-subtitle">{{"作者:" + post.author.name + " 创建日期:" + post.created_at + " 访问次数:" + post.pv + " 评论数:" + post.commentsCount}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      posts: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "~assets/less/define.less";
  li {
    // border: 1px solid red;
    border-bottom: 1px solid @defaultBGColor;
    background: #fff;
    border-radius: 2px;
    padding: 1.2rem 1rem .5rem;
    // height: 0px;
    box-shadow: 0 0 15px rgba(50, 50, 93, .15), 0 5px 15px rgba(0, 0, 0, 0.15);
  }
  
  .li-title {
    // margin: .5rem 0 .8rem;
    // background-color: green;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: PingFangSC-Semibold;
    font-size: 1.4rem;
    color: #222222;
    letter-spacing: 0;
  }
  
  .li-subtitle {
    margin-top: 1rem;
    // margin-left: .5rem;
    font-family: PingFangSC-Regular;
    font-size: .7rem;
    color: #999999;
  }
</style>



