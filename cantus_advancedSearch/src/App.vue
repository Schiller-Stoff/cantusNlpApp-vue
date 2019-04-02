<template>
  <div id="vue_app" :style="maximizedStyle">
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
      searchResult: [],
      maximizedStyle: undefined
    }
  },
  created(){
    EventBus.$on('resultReceived',data=>{
      this.searchResult = data
    });

    EventBus.$on('toggleFullScreen',_=>{
      if(this.maximizedStyle){
        this.maximizedStyle = undefined
      } else {
        this.maximizedStyle = {position:'fixed', height:'120vh', width: '100vw', left:0, top:0, overflow:'scroll',zIndex:'2000'}
      }
    });
  }
}
</script>

<style lang="scss" scoped>
  #vue_app /deep/ {
    @import "~bootstrap/dist/css/bootstrap.min";
  }
</style>
