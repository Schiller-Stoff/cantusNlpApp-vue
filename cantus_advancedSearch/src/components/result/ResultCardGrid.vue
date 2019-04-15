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
    },
    data() {
      return {
        delayedDisplay:'hidden'
      }
    },
    created(){
      setTimeout(_=>{
        this.delayedDisplay = 'animated fadeIn once faster'
      },200);
    }
  }
</script>

<style scoped>

</style>
