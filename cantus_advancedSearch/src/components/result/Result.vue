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
        :loadFailed="loadFailed"
      >
      </app-result-load-handler>

  </div>
</template>

<script>
  let curTimer;
  let searchTimer;
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
        waitingForSearchResult: false,
        loadFailed: false
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
        // if result received clear searchTimer
        clearTimeout(searchTimer)
        this.waitingForSearchResult = false;

        this.searchHistory.push(data)
        this.searchResult = data.body;
        this.searchParams = data.searchParams;
        this.showPreview = true
      });

      EventBus.$on('searchStarted',_=>{
        this.loadFailed = false;
        this.waitingForSearchResult = true

        //timer will be cleared insight resultReceived event above.
        let self = this
        searchTimer = setTimeout(_=>{
          self.loadFailed = true;
        },10000);
      })

      EventBus.$on('searchFailed',err=>{
        this.loadFailed = true;
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
