<template>
  <div id="vue_app" :style="maximizedStyle" :class="animClass">
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
      maximizedStyle: undefined,
      animClass:""
    }
  },
  created(){
    EventBus.$on('resultReceived',data=>{
      this.searchResult = data
    });

    EventBus.$on('toggleFullScreen',_=>{
      if(this.maximizedStyle){
        this.animClass = ""
        this.maximizedStyle = undefined
      } else {
        this.animClass = "animated fadeIn once";
        this.maximizedStyle = {position:'fixed', height:'120vh', width: '100vw', left:0, top:0, overflow:'scroll',zIndex:'2000'}
      }
    });
  }
}
</script>

<style lang="scss" scoped>
  #vue_app /deep/ {
    //old deep import of bootstrap 4 -> not used any longer
    //@import "~bootstrap/dist/css/bootstrap.min";
  }

</style>
