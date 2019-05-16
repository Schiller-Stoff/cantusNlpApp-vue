<template>
  <div class="container-fluid">
    <app-the-result-default
      :key="0"
      v-if="!incipitSearchHistory[0] && !incipitOngoingSearch && !incipitSearchFailed">
    </app-the-result-default>
    <app-the-result-preview
      v-if="incipitSearchHistory[0] && !incipitOngoingSearch && !incipitSearchFailed && !showTable"
      :searchParams="incipitSearch.searchParams"
      :vizHistoData="incipitVizHistory"
      :key="1">
    </app-the-result-preview>
    <app-the-result-table
      v-if="incipitSearchHistory[0] && !incipitOngoingSearch && !incipitSearchFailed && showTable"
      :key="2"
      :tableData="incipitSearch.response.body"
      :searchParams="incipitSearch.searchParams">
    </app-the-result-table>
    <app-the-result-load-handler
      v-if="incipitOngoingSearch || incipitSearchFailed"
      :key="3"
      :searchFailed="incipitSearchFailed"
    >
    </app-the-result-load-handler>

    <button class="btn btn-primary" @click="toggleTable">switch</button>
  </div>
</template>

<script>
  //TODO implement viz Data refactoring inside here!

  import TheResultDefault from './TheResultDefault'
  import TheResultTable from './TheResultTable'
  import TheResultLoadHandler from './TheResultLoadHandler'
  import TheResultPreview from './compare/TheResultPreview'

  export default {
    name: "TheResultDisplay",
    components: {
      appTheResultDefault:TheResultDefault,
      appTheResultTable:TheResultTable,
      appTheResultLoadHandler: TheResultLoadHandler,
      appTheResultPreview: TheResultPreview
    },
    props:{
      incipitSearch:{
        required:true
      },
      incipitOngoingSearch:{
        required:true
      },
      incipitSearchFailed:{
        required:true
      },
      incipitSearchHistory: {
        required:true
      }
    },
    data(){
      return {
        showTable:false,
        incipitVizHistory:[]
      }
    },
    computed: {
      incipitDiagramData(){
        let resultCount = this.incipitSearch.response.body.length
        return {
          label:'Incipits',
          backgroundColor: [this.randomColor()],
          data: [resultCount]
        };
      },
      incipitChartData(){
        return {
          labels:[this.incipitSearch.searchParams.chosenGenre, 'Rest'],
          datasets: [this.incipitDiagramData],
          searchParams:this.incipitSearch.searchParams
        }
      }
    },
    watch: {
      incipitSearchHistory:{
        deep:true,
        handler(){
          this.incipitVizHistory.push(this.incipitChartData)
          console.log(this.incipitVizHistory)
        }
      }
    },
    methods: {
      toggleTable(){
        return this.showTable = !this.showTable
      },
      randomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      },
    }
  }
</script>

<style scoped>

</style>
