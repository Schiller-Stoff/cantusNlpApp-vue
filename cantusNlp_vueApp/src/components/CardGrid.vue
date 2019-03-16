<template>
  <div class="container-fluid">
    <transition-group name="cardAnim"
                      @before-enter="beforeEnter"
                      @enter="enter"
                      @leave="leave"
                      tag="div"
                      mode="in-out"
                      class="card-deck"
                      v-if="cardsToCreate.length>0"
    >

      <nlp-app-voyant-card :key="corpus.name" :corpora="corpora" v-for="corpus in cardsToCreate" :linkedCorpus="corpus"></nlp-app-voyant-card>

    </transition-group>
    <!--Experimental LO Reader Modus-->
    <button @click="showOrigCantus = !showOrigCantus" v-if="cardsToCreate.length===0" class="btn btn-primary">LO Vorschau</button>

    <div class="container text-center row" id="cardGrid_defaultContent" v-if="cardsToCreate.length===0">

      <nlp-app-cantus v-if="showOrigCantus"></nlp-app-cantus>
      <div class="col-sm-6">
        <h1 id="v-step-10000">Cantus-Voyant App</h1>
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
  import Cantus from "./Cantus";
  import {EventBus} from "./../main";
  export default {
    name: "CardGrid",
    components: {
      nlpAppVoyantCard: VoyantCard,
      nlpAppCantus: Cantus
    },
    props: ["corpora"],
    data(){
      return {
        cardsToCreate: [],
        showOrigCantus: false
      }
    },
    methods: {
      beforeEnter(el){
        el.style.opacity = 0;
        el.style.top = el.style.top -200;
      },
      enter(el, done){
        this.fadeSlideIn(el,done)
      },
      leave(el, done){
        this.fadeSlideOut(el,done)
      },
      fadeSlideIn(el, done){
        let inc_opacity = 0;
        let incTop = -200;

        const interval = setInterval(()=>{
          inc_opacity += 0.02;
          if(incTop<0)incTop += 20;
          el.style.opacity = inc_opacity;
          el.style.top = incTop + "px";
          console.log(el.style.opacity);
          if(inc_opacity >= 1){
            clearInterval(interval);
            done();
          }
        },10);
      },
      fadeSlideOut(el,done){
        let inc_opacity = 1;
        let incTop = el.style.top;

        const interval = setInterval(()=>{
          inc_opacity -= 0.05;
          incTop -= 20; // TODO top movement is not working
          el.style.opacity = inc_opacity;
          el.style.top = incTop + "px";
          console.log(el.style.opacity);
          if(inc_opacity <= 0){
            clearInterval(interval);
            done();
          }
        },10);
      },
      removeCard(cardToRemove){
        console.log(cardToRemove)
        let indexPos = this.cardsToCreate.indexOf(cardToRemove);
        this.cardsToCreate.splice(indexPos,1);
      }
    },
    created(){
      EventBus.$on('cardCreate',(lo_to_create) => {
        this.cardsToCreate.push(lo_to_create);
      });

      EventBus.$on('removeCard',(cardToRemove)=>{
        this.removeCard(cardToRemove);
      });
    }
  }
</script>

<style scoped lang="scss">
  @import "../scss/globalVariables";

  #cardGrid_defaultContent {
    @include sm {padding: 2.5em; margin: 2em auto 0}
    @include lg {margin: 4em auto 0}
    /*border: .1em solid $secondaryColor;*/
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

  .btn {border-radius: 0;}

  .cardAnim-move {
    transition: all 1s;
  }

  .cardAnim-leave-active {
    position: absolute; /*needed to let anim work at removal of <li> via click*/
  }

</style>
