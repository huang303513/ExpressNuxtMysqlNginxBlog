<template>
  <div class="app">
    <header-comp :hiddenRight="hiddenRight"></header-comp>
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
      "footer-comp": Footer,
      "header-comp": Header
    },
    data(){
      return{
        hiddenRight:true
      }
    },
    mounted(){
      // if (!config.devEnv) {
      //     baidutongji();
      // }
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
