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

      <nlp-app-voyant-card
                           v-for="nlpResult in cardsToCreate"
                           :key="nlpResult.deletedTokens.length"
                           :linkedResult="nlpResult">
      </nlp-app-voyant-card>

    </transition-group>
    <div class="container">
      <div class="row" id="cardGrid_defaultContent" v-if="cardsToCreate.length===0">
        <div class="col-lg-6">
          <h1 id="v-step-10000">Cantus NLP Werkzeug</h1>
          <hr id="v-step-10004">
          <p>
            Das Cantus NLP Werkzeug dient dazu eine Vorschau auf das mit Natural Language Processing analysierte Datenmaterial zu ermöglichen.
            Hier können erste Eindrücke für den quantitativen Vergleich verschiedener Libri Ordinarii gewonnnen und je nach Bedarf Forschungsdatenmaterial im JSON-Format abgerufen werden.
            Es handelt sich hierbei um eine verkürzte Vorschau zusätzlich zur eigentlichen Analyse direkt auf der Voyant-Tools Website.
            Im Felde links neben dem "LO-hinzufügen" Knopf befindet sich ein Auswahlmenü mit dem eine quantitative Visualisierung an Ort und Stelle hinzugefügt werden kann. Einzelne Info-Knöpfe
            an den drei Seiten des Containers geben weitere Auskünfte über die Verwendung des Vorschauwerkzeuges.
          </p>
          <h3>NLP / Korpusanalyse</h3>
          <hr>
          <p>Hier finden Sie eine Darstellung der NLP-Analyse über alle Libri Ordinarii hinweg, einerseits als Orginaltext und andererseits in lemmatisierter Form. Lemmatisierung, Tokenisierung etc. wurden mit Hilfe des "Classical
            Language Toolkits" in Python realisiert.</p>
          <h3>Der Lemmatisierte Text</h3>
          <hr>
          <p>
            Der Text wurde mit Hilfe der Python Bibliothek "Classical Language Toolkit" tokenisiert, lemmatisiert, wie auch
            Stopwörter entfernt. Die dabei enstandenen Analysedaten können den einzelnen Karten unter dem
            Menüpunkt "JSON-Daten" entnommen werden. Über das JSON-Format können so entfernte Wörter, der Prozentsatz unbekannter Wörter
            (für den CLTK-Lemmatisierer) und alle unbekannten Wörter abgefragt werden.
            Selbiger lemmatisierter Text steht ebenso allen einzelnen Libri Ordinarii zu Verfügung und kann einzeln
            über die "Lesetext" - Ansicht angesteuert werden.
          </p>
          <hr>
        </div>
        <div class="col-lg-6">
          <h3>Eine Kurze Anleitung</h3>
          <hr>
          <ul>
            <li>Via Click auf das Navigationsmenü links oben kann eine "NLP Karte" eingefügt werden. </li>
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
  import {EventBus} from "./../main";
  import {nlpResults} from "../data/nlpResults";

  export default {
    name: "CardGrid",
    components: {
      nlpAppVoyantCard: VoyantCard
    },
    data(){
      return {
        nlpResults,
        useDummyData:true,
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
      },

      getNlpData(loInfo){

        if(this.useDummyData){
          this.nlpResults.lo = loInfo
          return this.cardsToCreate.push(this.nlpResults)
        }

        let query;
        this.$http.get(query)
          .then(response=>{
            return response.json();
          },error=>{
            console.log("Unable to reach " + url)
          }).then(json =>{
          this.cardsToCreate.push(json)

        });
      },
    },
    created(){
      EventBus.$on('cardCreate',(loInfo) => {
        this.getNlpData(loInfo)
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
