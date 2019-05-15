<template>
  <div class="container-fluid">
    <app-the-result-default
      :key="0"
      v-if="!incipitSearchHistory[0] && !incipitOnGoingSearch && !incipitSearchFailed">
    </app-the-result-default>
    <app-the-result-preview
      v-if="incipitSearchHistory[0] && !incipitOnGoingSearch && !incipitSearchFailed && !searchBarLocked"
      :searchParams="incipitSearch.searchParams"
      :vizHistoData="vizHistory"
      :key="1">
    </app-the-result-preview>
    <app-the-result-table
      v-if="incipitSearchHistory[0] && !incipitOnGoingSearch && !incipitSearchFailed && searchBarLocked"
      :key="2"
      :tableData="incipitSearch.response.body"
      :searchParams="incipitSearch.searchParams">
    </app-the-result-table>
    <app-the-result-load-handler
      v-if="incipitOnGoingSearch || incipitSearchFailed"
      :key="4"
      :searchFailed="incipitSearchFailed"
    >
    </app-the-result-load-handler>

    <button class="btn btn-primary" @click="toggleInterfaceLock(true)">lock</button>
    <button class="btn btn-primary" @click="toggleInterfaceLock(false)">unlock</button>

  </div>
</template>

<script>
  //TODO remove curChartData variable --- I think it's unnecessary?
  //TODO vuex result namings are wrong now -> e.g. searchHistory -> to incipitSearchHistory
  //TODO move gui functionality to TheResultDisplay.vue
  //TODO pass in data via props and events / vuex only in TheResult.vue
  //TODO remove old + dead code
  //TODO Complete renaming and hierarchy

  let curTimer;
  import {mapActions} from 'vuex'
  import {mapGetters} from 'vuex'
  import TheResultTable from './TheResultTable'
  import TheResultPreview from './compare/TheResultPreview'
  import TheResultDefault from './TheResultDefault'
  import TheResultLoadHandler from './TheResultLoadHandler'

  export default {
    name: "TheResult.vue",
    data() {
      return {
        showPreview: false,
        incipitDiagramData:undefined, // "one bar" (but there might be other inline-bars like segments for comparison inside one diagram)
        incipitChartData:undefined,   // "complete chart" with multiple bars next to each other
        vizHistory:[],

        // data of 'last/current' incipitSearch
        incipitSearch:''
      }
    },
    computed: {
      ...mapGetters({
        searchBarEnlarged:'interfaceStates_currentSearchBarState',
        searchBarLocked:'interfaceStates_currentSearchLockState',
        incipitOnGoingSearch:'incipit_getOngoingSearch',
        incipitSearchFailed:'incipit_getSearchFailed',
        incipitSearchHistory:'incipit_getSearchHistory'
      })
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
      incipitSearchHistory(){

        //save reference to last/current incipitSearch
        this.incipitSearch = this.incipitSearchHistory[this.incipitSearchHistory.length-1]

        // might be outdated
        if(this.incipitSearchHistory && this.searchBarEnlarged){
          this.showPreview = true
        }

        //set viz Data
        this.calcCurDiagramData()
        this.calcCurChartData()

        //push into viz history
        this.incipitChartData.searchParams = this.incipitSearch.searchParams
        this.vizHistory.push(this.incipitChartData)
      }
    },
    components: {
      appTheResultPreview: TheResultPreview,
      appTheResultTable: TheResultTable,
      appTheResultDefault: TheResultDefault,
      appTheResultLoadHandler: TheResultLoadHandler
    },
    methods: {
      ...mapActions({
        lockInterface: 'interfaceStatesAction_lockSearchbar',
        unlockInterface:'interfaceStatesAction_unlockSearchbar'
      }),
      toggleInterfaceLock(lock_boolean){
        // uses lockInterface() method -> calls vuex-actions
        if(lock_boolean){
          this.lockInterface()
        } else {
          this.unlockInterface()
        }
      },
      randomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      },
      calcCurDiagramData(){
        let resultCount = this.incipitSearch.response.body.length
        let vizObj = {
          label:'Feste',
          backgroundColor: [],
          data: [resultCount]
        }
        for (let dp of vizObj.data){
          vizObj.backgroundColor.push(this.randomColor())
        }
        this.incipitDiagramData = vizObj
      },
      calcCurChartData(){
        this.incipitChartData = {
          labels:[this.incipitSearch.searchParams.chosenGenre, 'Rest'],
          datasets: [this.incipitDiagramData]
        }
      }
    }
  }
</script>

<style scoped>
</style>
