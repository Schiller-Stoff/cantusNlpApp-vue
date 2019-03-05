<template>
  <div class="card-deck">
    <nlp-app-voyant-card :corpora="corpora" v-for="corpus in cardsToCreate" :linkedCorpus="corpus"></nlp-app-voyant-card>
    <h1 class="container float-left" v-if="cardsToCreate.length===0">Voyant Ansicht hinzufügen</h1>
  </div>
</template>

<script>
  import VoyantCard from "./VoyantCard.vue";
  import {EventBus} from "./../main";
  export default {
    name: "CardGrid",
    components: {
      nlpAppVoyantCard: VoyantCard
    },
    props: ["corpora"],
    data(){
      return {
        cardsToCreate: []
      }
    },
    created(){
      EventBus.$on('cardCreate',(lo_to_create) => {
        this.cardsToCreate.push(lo_to_create);
      });
    }
  }
</script>

<style scoped>

  h1 {
    margin-top:4em;
    color: lightgrey;
  }

</style>
