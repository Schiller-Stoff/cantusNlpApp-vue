<template>
  <div>

      <app-result-default
        :key="0"
        v-if="!searchResult">
      </app-result-default>
      <app-result-preview
        v-if="showPreview && searchResult"
        :prevData="searchResult"
        :key="1">
      </app-result-preview>
      <app-result-table
        v-if="!showPreview && searchResult"
        :key="2"
        :tableData="searchResult">
      </app-result-table>
      <app-result-card v-for="points in [1,2,4,5]">

      </app-result-card>

  </div>
</template>

<script>
  let curTimer;
  import ResultTable from '../result/ResultTable'
  import {EventBus} from "../../main";
  import ResultPreview from './ResultPreview'
  import ResultDefault from './ResultDefault'
  import ResultCard from './ResultCard'
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
      appResultTable: ResultTable,
      appResultDefault:ResultDefault,
      appResultCard: ResultCard
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
