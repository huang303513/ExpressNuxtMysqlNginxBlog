<template>
  <div class="app">
    <header-comp :testname="testname"></header-comp>
    <nuxt/>
    <footer-comp></footer-comp>
  </div>
</template>
<script>
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import {baidutongji,mobilePage} from '../util/assist';
import getConfig from '../config';
let config = getConfig(process.env.NODE_ENV);
export default {
  components: {
      "header-comp": Header,
      "footer-comp": Footer
    },
    data(){
      return{
        testname:"测试"
      }
    },
    mounted(){
      if (!config.devEnv) {
          baidutongji();
      }
      // setTimeout(function () {
      // mobilePage();
      // },1000)
      // this.$root.testname = "huang";
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
