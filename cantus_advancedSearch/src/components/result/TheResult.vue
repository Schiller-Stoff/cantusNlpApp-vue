<template>
  <div class="container-fluid">
    <app-the-result-default
      :key="0"
      v-if="!incipitSearchResult && !incipitOnGoingSearch && !incipitSearchFailed">
    </app-the-result-default>
    <app-the-result-preview
      v-if="incipitSearchResult && !incipitOnGoingSearch && !incipitSearchFailed && !searchBarLocked"
      :searchParams="incipitSearchParams"
      :vizHistoData="vizHistory"
      :vizCompareData="vizCompareData.body"
      :key="1">
    </app-the-result-preview>
    <app-the-result-table
      v-if="incipitSearchResult && !incipitOnGoingSearch && !incipitSearchFailed && searchBarLocked"
      :key="2"
      :tableData="incipitSearchResult.body"
      :searchParams="incipitSearchParams">
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
        curDiagramData:undefined,
        curChartData:undefined,
        vizHistory:[]
      }
    },
    computed: {
      ...mapGetters({
        searchBarEnlarged:'interfaceStates_currentSearchBarState',
        searchBarLocked:'interfaceStates_currentSearchLockState',
        incipitOnGoingSearch:'incipit_getOngoingSearch',
        incipitSearchFailed:'incipit_getSearchFailed',
        incipitSearchResult:'incipit_getSearchResult',
        incipitSearchParams:'incipit_getSearchParams',
        incipitSearchHistory:'incipit_getSearchHistory',
        vizCompareData:'viz_getVizCompareData'
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
      incipitSearchResult(){
        if(this.incipitSearchResult && this.searchBarEnlarged){
          this.showPreview = true
        }
        // set viz Data
        this.calcCurDiagramData()
        this.calcCurChartData()

        //push into history
        this.curChartData.searchParams = this.incipitSearchParams
        this.vizHistory.push(this.curChartData)
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
        // set viz Data
        let genreTotal_int = this.getLOGenreTotal()
        let resultCount = this.incipitSearchResult.body.length
        let genreRest = genreTotal_int - resultCount
        let vizObj = {
          label:'Feste',
          backgroundColor: [],
          data: [this.incipitSearchResult.body.length, genreRest]
        }
        for (let dp of vizObj.data){
          vizObj.backgroundColor.push(this.randomColor())
        }
        this.curDiagramData = vizObj
      },
      calcCurChartData(){
        this.curChartData = {
          labels:[this.incipitSearchParams.chosenGenre, 'Rest'],
          datasets: [this.curDiagramData]
        }
      },
      getLOGenreTotal(){
        let genreTotal;
        let searchedLO = this.incipitSearchParams.chosenLO
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
