<template>
  <div id="vue_cardGrid" class="container-fluid">
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
    <!--<button @click="showOrigCantus = !showOrigCantus" v-if="cardsToCreate.length===0" class="btn btn-primary">LO Vorschau</button>-->
    <div class="container">
      <div class="row" id="cardGrid_defaultContent" v-if="cardsToCreate.length===0">
        <!--Experimental LO Reader Modus-->
        <!--<nlp-app-cantus v-if="showOrigCantus"></nlp-app-cantus>-->
      <div class="col-lg-6">
        <h1 id="v-step-10000">Cantus Voyant Vorschau-Werkzeug</h1>
        <hr id="v-step-10004">
        <p>
          Das Cantus Vorschau-Voyant Werkzeug dient dazu eine schnelle Vorschau verschiedener Voyant Ansichten zu ermöglichen.
          Alle Ansichten stammen direkt von den Voyant-Tools.
          Hier können erste Eindrücke für den quantitativen Vergleich verschiedener Libri Ordinarii gewonnnen und je nach Bedarf Forschungsdatenmaterial im JSON-Format abgerufen werden.
          Es handelt sich hierbei um eine verkürzte Vorschau zusätzlich zur eigentlichen Analyse direkt auf der Voyant-Tools Website.
          Im Felde links neben dem "LO-hinzufügen" Knopf befindet sich ein Auswahlmenü mit dem eine Voyant-Vorschau an Ort und Stelle hinzugefügt werden kann. Einzelne Info-Knöpfe
          an den drei Seiten des Containers geben weitere Auskünfte über die Verwendung des Vorschauwerkzeuges.
        </p>
        <hr>
        <h3>NLP / Korpusanalyse</h3>
        <p>Hier finden Sie eine Darstellung der NLP-Analyse über alle Libri Ordinarii hinweg, einerseits als Orginaltext und andererseits in lemmatisierter Form. Lemmatisierung, Tokenisierung etc. wurden mit Hilfe des "Classical
          Language Toolkits" in Python realisiert.</p>
        <hr>
        <h3>Der Lemmatisierte Text</h3>
        <p>
          Der Text wurde mit Hilfe der Python Bibliothek "Classical Language Toolkit" tokenisiert, lemmatisiert, wie auch
          Stopwörter entfernt. Die dabei enstandenen Analysedaten können den einzelnen Voyant-Vorschau-Karten unter dem
          Menüpunkt "JSON-Daten" entnommen werden. Über das JSON-Format können so entfernte Wörter, der Prozentsatz unbekannter Wörter
          (für den CLTK-Lemmatisierer) und alle unbekannten Wörter abgefragt werden.
          Selbiger lemmatisierter Text steht ebenso allen einzelnen Libri Ordinarii zu Verfügung und kann einzeln
          über die "Lesetext" - Ansicht angesteuert werden.
        </p>
        <hr>

      </div>
      <div class="col-lg-6">

        <h3>Eine Kurze Anleitung</h3>
        <ul>
          <li>Via Click auf das Navigationsmenü links oben kann eine "Voyant Karte" eingefügt werden. </li>
          <li>Auf der linken Seite befinden sich Werkzeuge um Operationen auf alle Karten anwenden zu können.</li>
          <li>Zur Rechten: Veränderung der Größe der einzelnen Karten, sowie links zum originalen und lemmatisierten
            Korpus.</li>
        </ul>
      </div>

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
    @include sm {padding: 2.5em; margin: 2em auto 0 !important;}
    @include lg {margin: 4em auto 0 !important;}
    font-family:"Open Sans", Arial, Helvetica, sans-serif;
    line-height: 1.5;
    /*border: .1em solid $secondaryColor;*/
    background-color: $blankColor;
    h1 {color: $tertiaryColor}
    h3 {color: $tertiaryColor}
    hr {color:black;background-color: black;margin-bottom: 1em;}
    ul {
      background-color: $fourthColor;
      padding: 1.5em;
      border-radius: 1em;
      color: black;
    }
    p, li {text-align: justify;}
  }

  /*normalization for the root container*/
  #vue_cardGrid .card-deck {
    min-height: 100vh;
    width: 100%;
    margin: 0;
    padding: 0;
    background-color: $primaryColor;
  }

  #vue_cardGrid .btn {border-radius: 0;}

  #vue_cardGrid .cardAnim-move {
    transition: all 1s;
  }

  #vue_cardGrid .cardAnim-leave-active {
    position: absolute; /*needed to let anim work at removal of <li> via click*/
  }

</style>
