<template>
  <div class="card-deck">
    <nlp-app-voyant-card :corpora="corpora" v-for="corpus in cardsToCreate" :linkedCorpus="corpus"></nlp-app-voyant-card>
    <div class="container" v-if="cardsToCreate.length===0">
      <h1 class="container" >Cantus-Voyant App</h1>
      <p>
        Das Cantus Voyant tool dient dazu den Vergleich verschiedener Ansichten zu erleichtern.
        Die Ansichten selbst stammen aus den VoyantTools und können mit Hilfe einfacer Werkzeuge
        auf dieser Seite miteinander verglichen werden.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
      </p>
      <h3>Eine Kurze Anleitung</h3>
      <ul>
        <li>Via Click auf das dropdown links oben kann eine Voyant Karte in diese Ansicht eingefügt werden. </li>
        <li>Auf der linken Seite befinden sich Werkzeuge um Operationen auf alle Karten anwenden zu können.</li>
        <li>Zur Rechten: Werkzeuge und Beschreibungen zur Erklräung der einzelnen Ansichten der Voyant Tools</li>
      </ul>
      <h3>Kontakt und Hilfe</h3>
    </div>
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
    margin-bottom: .5em;
    color: lightgrey;
    border-bottom: .15em solid #eeeeee;
    border-bottom-right-radius: .75em;
    max-width: 17em;
    margin-left: 0em;
  }

  h3 {
    margin-top: 1.5em;
    color: lightgrey;
    border-bottom-right-radius: 1em;
    border-bottom: .2em solid #eeeeee;
    max-width: 25em;
  }

  div.container {
    margin-top: 4em;
    padding: 1em;
    margin-left: 3em;
    max-width: 62%;
  }

  .container li {
    color: grey;
  }

  .container p,li {
    max-width: 62%;
    text-align: justify;
  }

</style>
