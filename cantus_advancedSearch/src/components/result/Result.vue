<template>
  <div>
    <transition-group mode="out-in">
      <app-result-preview v-if="showPreview" :prevData="searchResult" :key="1"></app-result-preview>
      <app-result-table v-else :key="2" ></app-result-table>
    </transition-group>
  </div>
</template>

<script>
  let curTimer;
  import ResultTable from '../result/ResultTable'
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
      appResultPreview: ResultPreview,
      appResultTable: ResultTable
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
