<template>
  <div>
    <h3>Vorschau</h3>
    <app-pie-chart></app-pie-chart>
  </div>
</template>

<script>
  import PieChart from './PieChart'
  export default {
    name: "Result.vue",
    components: {
      appPieChart: PieChart
    }
  }
</script>

<style scoped>

</style>
