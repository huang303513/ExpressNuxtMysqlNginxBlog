<template>
  <div class="bodyClass">
    <Header></Header>
    <div class="rootClass">
      <post-cell></post-cell>
      <!-- <Logo></Logo> -->
    </div>
  </div>
</template>

<script>
  import Header from '~/components/Header.vue'
  import PostCell from '~/components/PostCell.vue'
  import axios from 'axios'
  export default {
    components: {
      Header,
      PostCell
    }
  }
</script>

<style lang="less" scoped>
  @import '~assets/less/posts.less';
</style>

