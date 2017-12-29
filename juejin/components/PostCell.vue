<template>
  <div>
    <article v-for="(post,index) in posts" :key="post._id">
      <p>{{post.title}}{{post.author}}</p>
    </article>
  </div>
</template>
<script>
export default {
  props:{
    posts: {
            type: Array,
            required: true
        }
  }
}
</script>
<style lang="less" scoped>
article {
    border: 1px solid red;
    background: #fff;
    border-radius: 2px;
    height: 100px;
    box-shadow: 0 0 25px rgba(50, 50, 93, .15), 0 5px 15px rgba(0, 0, 0, 0.15);
    margin-bottom: 40px;
}
// p{
//   height: 30px;
//   color:red;
// }
</style>



