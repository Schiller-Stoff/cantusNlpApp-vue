<template>

  <div>
    <app-bar-chart></app-bar-chart>
  </div>

</template>

<script>
  import BarChart from './charts/BarChart'
  export default {
    name: "ResultBarChart",
    components: {
      appBarChart: BarChart
    }
  }
</script>

<style scoped>

</style>
