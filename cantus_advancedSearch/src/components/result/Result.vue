<template>
  <div class="container-fluid">
    <app-result-default
      :key="0"
      v-if="!searchResult && !onGoingSearch && !searchFailed">
    </app-result-default>
    <app-result-preview
      v-if="showPreview && searchResult && !onGoingSearch && !searchFailed"
      :searchParams="searchParams"
      :curChartData="curChartData"
      :key="1">
    </app-result-preview>
    <app-result-table
      v-if="!showPreview && searchResult && !onGoingSearch && !searchFailed"
      :key="2"
      :tableData="searchResult.body"
      :searchParams="searchParams">
    </app-result-table>

    <app-result-card-grid
      :key="3"
      :search-history="searchHistory"
      v-if="!showPreview && searchResult && !onGoingSearch && !searchFailed"
    >
    </app-result-card-grid>

    <app-result-load-handler
      v-if="onGoingSearch || searchFailed"
      :key="4"
      :searchFailed="searchFailed"
    >
    </app-result-load-handler>

    <app-result-bar-chart
      v-if="searchHistory && searchResult && vizData[0] && showPreview && !searchFailed && !onGoingSearch"
      :viz-data-results="vizData"
    >

    </app-result-bar-chart>

  </div>
</template>

<script>
  let curTimer;
  import {mapGetters} from 'vuex'
  import ResultTable from '../result/ResultTable'
  import ResultPreview from './ResultPreview'
  import ResultDefault from './ResultDefault'
  import ResultCardGrid from './ResultCardGrid'
  import ResultLoadHandler from './ResultLoadHandler'
  import ResultBarChart from './ResultBarChart'

  export default {
    name: "Result.vue",
    data() {
      return {
        showPreview: false,
      }
    },
    computed: {
      ...mapGetters({
        searchBarEnlarged:'interfaceStates_currentSearchBarState',
        onGoingSearch:'search_getOngoingSearch',
        searchFailed:'search_getSearchFailed',
        searchResult:'search_getSearchResult',
        searchParams:'search_getSearchParams',
        searchHistory:'search_getSearchHistory'
      }),
      vizData() {
        let vizArray = []
        for (let data of this.searchHistory){
          let toPush= {searchParams:data.searchParams, lengthCount:data.response.body.length}
          vizArray.push(toPush)
        }
        return vizArray
      },
      curDiagramData(){
        let vizObj = {
          label:'Feste',
          backgroundColor: [],
          data: [this.searchResult.body.length, 500] //todo 500 is hardcoded value remove!
        }

        for (let dp of vizObj.data){
          vizObj.backgroundColor.push(this.randomColor())
        }

        return vizObj
      },
      curChartData(){
        let chartData = {
          labels:[this.searchParams.chosenGenre, 'Rest'],
          datasets: [this.curDiagramData]
        }
        return chartData
      }
    },


    watch: {
      searchBarEnlarged(newValue, oldValue) {
        if(this.searchBarEnlarged){
          if (!this.searchResult) return;
          curTimer = setTimeout(_ => {
            if (this.showPreview) this.showPreview = false;
            this.showPreview = true;
          }, 500)
        } else {
          this.showPreview = false;
          //clears delayed blend in via setTimeout
          clearTimeout(curTimer)
        }
      },
      searchResult(){
        if(this.searchResult && this.searchBarEnlarged){
          this.showPreview = true
        }
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
      }
    }
  }
</script>

<style scoped>
</style>
