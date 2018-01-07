<template>
  <div class="app">
    <header-comp></header-comp>
    <nuxt/>
    <footer-comp></footer-comp>
  </div>
</template>
<script>
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
export default {
  components: {
      "header-comp": Header,
      "footer-comp": Footer
		}
}
</script>
<style lang="less" scoped>
.app {
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>
