<template>
  <div class="card-columns">
    <nlp-app-voyant-card></nlp-app-voyant-card>
  </div>
</template>

<script>
  import VoyantCard from "./VoyantCard.vue";
  export default {
    name: "CardGrid",
    components: {
      nlpAppVoyantCard: VoyantCard
    }
  }
</script>

<style scoped>

  div {
    /*background-color: darkred;*/
  }

</style>
