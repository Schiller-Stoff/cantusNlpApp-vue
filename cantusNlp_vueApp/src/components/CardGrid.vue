<template>
  <div class="card-deck">
    <nlp-app-voyant-card :corpora="corpora" v-for="card in cardsToCreate"></nlp-app-voyant-card>
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
        cardsToCreate: [

        ]
      }
    },
    created(){
      EventBus.$on('cardCreate',() => {
        this.cardsToCreate.push(this.corpora[1]);
      });
    }
  }
</script>

<style scoped>

  div {
    /*background-color: darkred;*/
  }

</style>
