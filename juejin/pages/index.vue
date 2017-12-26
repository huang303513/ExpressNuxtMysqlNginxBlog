<template>
  <div class="bodyClass">
    <Header></Header>
    <div class="rootClass">
      <Logo></Logo>
    </div>
  </div>
</template>

<script>
  import Logo from '~/components/Logo.vue'
  import Header from '~/components/Header.vue'
  export default {
    components: {
      Logo,
      Header
    }
  }
</script>

<style lang="less" scoped>
  @import '~assets/less/posts.less';
</style>

