<template>

  <div>
    <app-bar-chart></app-bar-chart>
  </div>

</template>

<script>
  import BarChart from './charts/BarChart'

  export default {
    name: "ResultBarChart",
    props: {
      vizDataResults: {
        type: Array,
        required: true,
        validator(val){
          let firstEntry = val[0]
          let requiredKeys = ['searchParams','lengthCount']
          for(let key of requiredKeys){
            if(!firstEntry.hasOwnProperty(key))return false;
          }
          return true
        }
      },
    },
    components: {
      appBarChart: BarChart
    }
  }
</script>

<style scoped>

</style>
