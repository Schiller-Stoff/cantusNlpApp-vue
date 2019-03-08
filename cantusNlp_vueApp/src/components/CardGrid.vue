<template>
  <div class="card-deck">
    <nlp-app-voyant-card :corpora="corpora" v-for="corpus in cardsToCreate" :linkedCorpus="corpus"></nlp-app-voyant-card>
    <div class="container text-center row" id="cardGrid_defaultContent" v-if="cardsToCreate.length===0">

      <div class="col-sm-6">
        <h1 id="v-step-10000" class="container" >Cantus-Voyant App</h1>
        <hr>
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
        <hr>
        <h3>Eine Kurze Anleitung</h3>
        <ul>
          <li>Via Click auf das dropdown links oben kann eine Voyant Karte in diese Ansicht eingefügt werden. </li>
          <li>Auf der linken Seite befinden sich Werkzeuge um Operationen auf alle Karten anwenden zu können.</li>
          <li>Zur Rechten: Werkzeuge und Beschreibungen zur Erklräung der einzelnen Ansichten der Voyant Tools</li>
        </ul>
        <hr>
      </div>
      <div class="col-sm-6">
        <h3>Wie wurden die Daten gewonnen?</h3>
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
          ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
          dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
          ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
          dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
        </p>
        <ul>
          <li>Python</li>
          <li>Classical Language Toolkit = Cltk</li>
        </ul>
        <hr>
        <h3>Kontakt und Hilfe</h3>
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
          ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
          dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
          ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
          dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
        </p>
        <hr>
      </div>

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

<style scoped lang="scss">
  @import "../scss/globalVariables";

  #cardGrid_defaultContent {
    @include sm {padding: 2.5em; margin: 2em auto 0}
    @include lg {margin: 4em auto 0}
    border: .1em solid $secondaryColor;
    background-color: $blankColor;
    h1 {color: $secondaryColor}
    h3 {color: $secondaryColor}
    hr {color:black;background-color: black;margin-bottom: 1em;}
    ul {
      background-color: $secondaryColor;
      padding: 1.5em;
      border-radius: 1em;
      color: lightgrey;
    }
    p, li {text-align: justify;}
  }

  /*normalization for the root container*/
  .card-deck {
    min-height: 100vh;
    width: 100%;
    margin: 0;
    padding: 0;
  }


</style>
