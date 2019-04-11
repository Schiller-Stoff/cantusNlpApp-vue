<template>
  <div class="container-fluid">
    <br>
    <h3>Vorangegangene Suchen</h3>
    <hr>
    <div class="card-columns">
      <app-result-card v-for="search in searchHistory" :search-result="search"></app-result-card>
    </div>
  </div>
</template>

<script>
  import ResultCard from './ResultCard'
  export default {
    name: "ResultCardGrid",
    components: {
      appResultCard: ResultCard
    },
    props: {
      searchHistory: {
        required:true,
        type:Array
      }
    }
  }
</script>

<style scoped>

</style>
