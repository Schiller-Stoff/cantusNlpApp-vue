<template>
  <div class="container-fluid">
      <app-result-default
        :key="0"
        v-if="!searchResult && !waitingForSearchResult">
      </app-result-default>
      <app-result-preview
        v-if="showPreview && searchResult && !waitingForSearchResult"
        :searchParams="searchParams"
        :prevData="searchResult"
        :key="1">
      </app-result-preview>
      <app-result-table
        v-if="!showPreview && searchResult && !waitingForSearchResult"
        :key="2"
        :tableData="searchResult"
        :searchParams="searchParams">
      </app-result-table>

      <app-result-card-grid
        :key="3"
        :search-history="searchHistory"
        v-if="!showPreview && searchResult && !waitingForSearchResult"
      >
      </app-result-card-grid>

      <app-result-load-handler
        v-if="waitingForSearchResult"
        :key="4"
      >
      </app-result-load-handler>

  </div>
</template>

<script>
  let curTimer;
  import ResultTable from '../result/ResultTable'
  import {EventBus} from "../../main";
  import ResultPreview from './ResultPreview'
  import ResultDefault from './ResultDefault'
  import ResultCardGrid from './ResultCardGrid'
  import ResultLoadHandler from './ResultLoadHandler'
  export default {
    name: "Result.vue",
    data(){
      return {
        searchHistory: [],
        searchResult:undefined,
        searchParams:undefined,
        showPreview:false,
        waitingForSearchResult: false
      }
    },
    components: {
      appResultPreview: ResultPreview,
      appResultTable: ResultTable,
      appResultDefault:ResultDefault,
      appResultCardGrid:ResultCardGrid,
      appResultLoadHandler: ResultLoadHandler
    },
    created(){
      EventBus.$on('resultReceived',data=>{
        this.searchHistory.push(data)
        this.searchResult = data.body;
        this.searchParams = data.searchParams;
        this.showPreview = true

        this.waitingForSearchResult = false;
      });

      EventBus.$on('searchStarted',_=>{
        this.waitingForSearchResult = true
      })

      EventBus.$on('searchFailed',err=>{
        this.waitingForSearchResult = false;

        //TODO add error display in component

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
