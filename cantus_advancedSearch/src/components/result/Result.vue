<template>
  <div>
    <h3>Vorschau</h3>
    <app-pie-chart :prevData="searchResult"></app-pie-chart>
  </div>
</template>

<script>
  import {EventBus} from "../../main";
  import PieChart from './PieChart'
  export default {
    name: "Result.vue",
    data(){
      return {
        searchResult:[]
      }
    },
    components: {
      appPieChart: PieChart
    },
    created(){
      EventBus.$on('resultReceived',data=>{
        this.searchResult = data
      });
    }
  }
</script>

<style scoped>

</style>
