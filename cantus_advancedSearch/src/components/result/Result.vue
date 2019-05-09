<template>
  <div class="container-fluid">
    <app-result-default
      :key="0"
      v-if="!searchResult && !onGoingSearch && !searchFailed">
    </app-result-default>
    <app-result-preview
      v-if="searchResult && !onGoingSearch && !searchFailed && !searchBarLocked"
      :searchParams="searchParams"
      :curChartData="curChartData"
      :vizHistoData="vizHistory"
      :vizCompareData="vizCompareData.body"
      :key="1">
    </app-result-preview>
    <app-result-table
      v-if="searchResult && !onGoingSearch && !searchFailed && searchBarLocked"
      :key="2"
      :tableData="searchResult.body"
      :searchParams="searchParams">
    </app-result-table>

    <!--<app-result-card-grid-->
      <!--:key="3"-->
      <!--:search-history="searchHistory"-->
      <!--v-if="!showPreview && searchResult && !onGoingSearch && !searchFailed"-->
    <!--&gt;-->
    <!--</app-result-card-grid>-->

    <app-result-load-handler
      v-if="onGoingSearch || searchFailed"
      :key="4"
      :searchFailed="searchFailed"
    >
    </app-result-load-handler>

  </div>
</template>

<script>
  import search from "../../store/modules/search";

  let curTimer;
  import {mapGetters} from 'vuex'
  import ResultTable from '../result/ResultTable'
  import ResultPreview from './compare/ResultPreview'
  import ResultDefault from './ResultDefault'
  import ResultCardGrid from './ResultCardGrid'
  import ResultLoadHandler from './ResultLoadHandler'
  import ResultBarChart from './ResultBarChart'

  export default {
    name: "Result.vue",
    data() {
      return {
        showPreview: false,
        curDiagramData:undefined,
        curChartData:undefined,
        vizHistory:[]
      }
    },
    computed: {
      ...mapGetters({
        searchBarEnlarged:'interfaceStates_currentSearchBarState',
        searchBarLocked:'interfaceStates_currentSearchLockState',
        onGoingSearch:'search_getOngoingSearch',
        searchFailed:'search_getSearchFailed',
        searchResult:'search_getSearchResult',
        searchParams:'search_getSearchParams',
        searchHistory:'search_getSearchHistory',
        vizCompareData:'viz_getVizCompareData'
      }),
      vizHistoData() {
        let vizArray = []
        for (let data of this.searchHistory){
          let toPush= {searchParams:data.searchParams, lengthCount:data.response.body.length}
          vizArray.push(toPush)
        }
        return vizArray
      }
    },
    watch: {
      searchBarEnlarged(newValue, oldValue) {
        /*if(this.searchBarEnlarged){
          if (!this.searchResult) return;
          curTimer = setTimeout(_ => {
            if (this.showPreview) this.showPreview = false;
            this.showPreview = true;
          }, 500)
        } else {
          //this.showPreview = false;
          //clears delayed blend in via setTimeout
          clearTimeout(curTimer)
        }*/
      },
      searchResult(){
        if(this.searchResult && this.searchBarEnlarged){
          this.showPreview = true
        }
        // set viz Data
        this.calcCurDiagramData()
        this.calcCurChartData()

        //push into history
        this.curChartData.searchParams = this.searchParams
        this.vizHistory.push(this.curChartData)
      }
    },
    components: {
      appResultPreview: ResultPreview,
      appResultTable: ResultTable,
      appResultDefault: ResultDefault,
      appResultCardGrid: ResultCardGrid,
      appResultLoadHandler: ResultLoadHandler,
      appResultBarChart: ResultBarChart
    },
    methods: {
      randomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      },
      calcCurDiagramData(){
        // set viz Data
        let genreTotal_int = this.getLOGenreTotal()
        let resultCount = this.searchResult.body.length
        let genreRest = genreTotal_int - resultCount
        let vizObj = {
          label:'Feste',
          backgroundColor: [],
          data: [this.searchResult.body.length, genreRest]
        }
        for (let dp of vizObj.data){
          vizObj.backgroundColor.push(this.randomColor())
        }
        this.curDiagramData = vizObj
      },
      calcCurChartData(){
        this.curChartData = {
          labels:[this.searchParams.chosenGenre, 'Rest'],
          datasets: [this.curDiagramData]
        }
      },
      getLOGenreTotal(){
        let genreTotal;
        let searchedLO = this.searchParams.chosenLO
        switch (searchedLO){
          case 'salzburg.ur':
            genreTotal = 477;
            break;
          case 'salzburg.ra':
            genreTotal = 431;
            break;
          case 'passau.ur':
            genreTotal = 496;
            break;
          //TODO add further data for LOs
          default:
            genreTotal = 500;
            break;
        }
        return genreTotal;
      }
    }
  }
</script>

<style scoped>
</style>
