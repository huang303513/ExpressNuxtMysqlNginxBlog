<template>
  <div class="app">
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
      "footer-comp": Footer
    },
    data(){
      return{
      }
    },
    mounted(){
      if (!config.devEnv) {
          baidutongji();
      }
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
