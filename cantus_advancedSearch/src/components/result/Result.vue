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

      <app-result-card-grid></app-result-card-grid>

  </div>
</template>

<script>
  let curTimer;
  import ResultTable from '../result/ResultTable'
  import {EventBus} from "../../main";
  import ResultPreview from './ResultPreview'
  import ResultDefault from './ResultDefault'
  import ResultCardGrid from './ResultCardGrid'
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
      appResultCardGrid:ResultCardGrid
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
