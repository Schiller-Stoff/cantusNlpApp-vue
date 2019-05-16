<template>
  <app-the-result-display
    :incipitSearch="incipitSearch"
    :incipitOngoingSearch="incipitOngoingSearch"
    :incipitSearchFailed="incipitSearchFailed"
    :incipitSearchHistory="incipitSearchHistory"
  ></app-the-result-display>
</template>

<script>
  //TODO remove curChartData variable --- I think it's unnecessary?
  //TODO vuex result namings are wrong now -> e.g. searchHistory -> to incipitSearchHistory
  //TODO Complete renaming and hierarchy

  import {mapGetters} from 'vuex'
  import TheResultDisplay from './TheResultDisplay'

  export default {
    name: "TheResult.vue",
    computed: {
      ...mapGetters({
        incipitOngoingSearch:'incipit_getOngoingSearch',
        incipitSearchFailed:'incipit_getSearchFailed',
        incipitSearchHistory:'incipit_getSearchHistory'
      }),
      incipitSearch(){
        let length = this.incipitSearchHistory.length
        return this.incipitSearchHistory[length-1]
      }
    },
    components: {
      appTheResultDisplay: TheResultDisplay
    }
  }
</script>

<style scoped>
</style>
