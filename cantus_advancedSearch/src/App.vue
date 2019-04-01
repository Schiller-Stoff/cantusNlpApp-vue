<template>
  <div id="vue_app">
    <app-main-grid></app-main-grid>
  </div>
</template>

<script>
import MainGrid from './components/MainGrid';
import {EventBus} from "./main";
export default {
  name: 'app',
  components: {
    appMainGrid: MainGrid
  },
  data () {
    return {
      searchResult: []
    }
  },
  created(){
    EventBus.$on('resultReceived',data=>{
      this.searchResult = data
    });
  }
}
</script>

<style lang="scss" scoped>
  #vue_app /deep/ {
    @import './../node_modules/bootstrap/scss/bootstrap';
    @import './../node_modules/bootstrap-vue/src/index.scss';
  }
</style>
