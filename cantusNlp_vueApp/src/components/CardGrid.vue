<template>
  <div class="card-columns">
    <nlp-app-voyant-card :corpora="corpora"></nlp-app-voyant-card>
  </div>
</template>

<script>
  import VoyantCard from "./VoyantCard.vue";
  export default {
    name: "CardGrid",
    components: {
      nlpAppVoyantCard: VoyantCard
    },
    props: ["corpora"]
  }
</script>

<style scoped>

  div {
    /*background-color: darkred;*/
  }

</style>
