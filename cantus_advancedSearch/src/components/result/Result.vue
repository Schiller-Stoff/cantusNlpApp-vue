<template>
  <div>
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="in-out">
      <app-result-preview v-if="showPreview" :prevData="searchResult" style="animation-duration:.5s; transition: all 1s"></app-result-preview>
    </transition>
  </div>
</template>

<script>
  let curTimer;
  import {EventBus} from "../../main";
  import ResultPreview from './ResultPreview'
  export default {
    name: "Result.vue",
    data(){
      return {
        searchResult:undefined,
        showPreview:false
      }
    },
    components: {
      appResultPreview: ResultPreview
    },
    created(){
      EventBus.$on('resultReceived',data=>{
        this.searchResult = data
        this.showPreview = true
      });

      EventBus.$on('searchBarMinified', _=> {
        this.showPreview = false;

        //clears delayed blend in via setTimeout
        clearTimeout(curTimer)
      })

      EventBus.$on('searchBarEnlarge', _=> {
        if(!this.searchResult)return;
        curTimer = setTimeout(_=>{
          if(this.showPreview)this.showPreview = false;
          this.showPreview = true;
        },500)
      })


    }
  }
</script>

<style scoped>

</style>
