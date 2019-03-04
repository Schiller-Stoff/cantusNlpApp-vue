<template>
  <div class="card-deck">
    <nlp-app-voyant-card :corpora="corpora" v-for="corpus in cardsToCreate" :linkedCorpus="corpus">
      <h5>{{corpus.name}}</h5>
    </nlp-app-voyant-card>
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

  div {
    /*background-color: darkred;*/
  }

</style>
