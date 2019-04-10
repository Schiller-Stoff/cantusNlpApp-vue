<template>

  <div class="card-columns">
    <app-result-card></app-result-card>
  </div>

</template>

<script>
  import ResultCard from './ResultCard'
  export default {
    name: "ResultCardGrid",
    components: {
      appResultCard: ResultCard
    }
  }
</script>

<style scoped>

</style>
