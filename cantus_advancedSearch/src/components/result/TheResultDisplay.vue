<template>
  <div class="container-fluid">
    <app-the-result-default
      :key="0"
      v-if="!incipitSearchHistory[0] && !incipitOngoingSearch && !incipitSearchFailed">
    </app-the-result-default>

    <app-the-result-load-handler
      v-if="incipitOngoingSearch || incipitSearchFailed"
      :key="3"
      :searchFailed="incipitSearchFailed"
    >
    </app-the-result-load-handler>

    <app-the-incipit-viz-factory
      v-if="incipitSearchHistory[0] && !incipitOngoingSearch && !incipitSearchFailed && !showTable"
      :key="1"

      :incipitSearch="incipitSearch"
      :incipitOngoingSearch="incipitOngoingSearch"
      :incipitSearchFailed="incipitOngoingSearch"
      :incipitSearchHistory="incipitSearchHistory"
    ></app-the-incipit-viz-factory>



  </div>
</template>

<script>
  //TODO implement viz Data refactoring inside here!

  import TheResultDefault from './TheResultDefault'
  import TheResultTable from './TheResultTable'
  import TheResultLoadHandler from './TheResultLoadHandler'
  import TheIncipitVizFactory from './viz/TheIncipitVizFactory'

  export default {
    name: "TheResultDisplay",
    components: {
      appTheResultDefault:TheResultDefault,
      appTheResultTable:TheResultTable,
      appTheResultLoadHandler: TheResultLoadHandler,
      appTheIncipitVizFactory: TheIncipitVizFactory
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
    methods: {
      toggleTable(){
        return this.showTable = !this.showTable
      }
    }
  }
</script>

<style scoped>

</style>
