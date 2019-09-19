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
                           :key="nlpResult.lo.value"
                           :linkedResult="nlpResult"
                           :serverAndProtocol="serverAndProtocol"
      >
      </nlp-app-voyant-card>

    </transition-group>
    <div class="container">
      <div class="row" id="cardGrid_defaultContent" v-if="cardsToCreate.length===0">
        <div class="col-lg-6">
          <h5 id="v-step-10000">Vergleichende Korpusanalyse / NLP</h5>
          <hr id="v-step-10004">
          <br>
          <h6>Datengrundlage</h6>
          <hr>
          <p>Als Datengrundlage dienten die auf der Webseite herunterladbaren TEI-XML Dateien, die für die Analyse in "plain-text" umgewandelt wurden.
          Dabei wurden Metainformationen des TEI-Headers ignoriert und ausschließlich der Text im TEI-Body verwendet. Weiter wurden editorische
          Hinzufügungen über eigene XSLT Stylesheets herausgefiltert.</p>
          <br>
          <h6>Datenprozessierung</h6>
          <hr>
          <p>
          Im nächsten Schritt erfolgte die Weiterverarbeitung der nun vorhandenen reinen Textdaten über String-Operationen in der Programmiersprache Python.
          Es wurden fehlerhafte bzw. ungünstige Textartefakte entfernt (wie zum Beispiel doppelte Leerzeichen erzeugt durch die Entfernung von editorischen Anmerkungen via XSLT).
          Erst danach erfolgte der eigentliche NLP-Arbeitsprozess unter Einsatz der Python-Bibliothek "Classical Language Toolkit". Damit wurden die vorbereiteten LO-Texte
            (als plain-text) tokenisiert und Stoppwörter entfernt. Schließlich wurde für jeden LO eine eigene lemmatisierte Version errechnet, die nun ebenso wie
            die Originaltexte über die Voyant-Tools analysierbar sind.
          </p>
          <br>
          <h6>Lemmaliste</h6>
          <hr>
          <p>Für die Auflösung der berechneten Lemmata (wie zum Beispiel "dico2") wird die <a href="https://github.com/cltk/latin_pos_lemmata_cltk">Lemmaliste</a> des CLTK benötigt.</p>
          <br>
          <h6>Lemmatisierung - Vergleichende Analyse</h6>
          <hr>
          <p>
            Im letzten Schritt wurden die Lemmata gezählt und die häufigsten (all jene die über 100 mal vorkommen) dem Vergleichswerkzeug zur Verfügung gestellt.
          </p>
        </div>
        <div class="col-lg-6">
          <h5>"Vergleichswerkzeug"</h5>
          <hr>
          <h6>Kurzanleitung</h6>
          <ul>
            <li>Via Click auf das Navigationsmenü links oben kann eine "NLP Karte" eingefügt werden. </li>
            <li>Auf der linken Seite befinden sich Werkzeuge um Operationen auf alle Karten anwenden zu können.</li>
            <li>Zur Rechten: Veränderung der Größe der einzelnen Karten, sowie links zum originalen und lemmatisierten
              Korpus.</li>
          </ul>
          <h6>Benutzungshinweis</h6>
          <hr>
          <p>Bei diesem NLP Vergleichswerkzeug handelt es sich um eine experimentelle Applikation die - zusätzlich zur eigentlichen Analyse via den Voyant-Tools -
          eine vergleichende Visualisierung der gewonnenen Lemmatisierungsdaten anbieten soll.
          </p>
          <p>Die korrekte Funktionsweise der Applikation ist dabei stark von der zur Verfügung stehenden Leistungsstärke des verwendeten Gerätes und
          von der Datenmenge des jeweiligen LO abhängig. Schlägt die experimentelle Visualisierung an dieser Stelle fehl kann jedoch immer auf die
          Voyant Tools zurückgegriffen werden. </p>
          <hr>

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
        useDummyData:false,
        cardsToCreate: [],
        showOrigCantus: false,
        serverAndProtocol:"https://gams.uni-graz.at"
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
          return this.cardsToCreate.push(Object.assign({}, this.nlpResults))
        }

        let query = `${this.serverAndProtocol}/archive/objects/${loInfo.value}/datastreams/LEMMATA_OCCURENCES/content`;
        this.$http.get(query)
          .then(response=>{
            return response.json();
          },error=>{
            alert("Leider konnte keine Verbindung zu den NLP-Daten hergestellt werden. Bitte versuchen Sie es später erneut.")
            console.warn("Unable to reach " + url)
          }).then(json =>{
            console.log("result received for: ")
            console.log(loInfo.value)
            console.log(json)
            let dataObj = {lo:loInfo, mostFrequentLemmatas:json}
            this.cardsToCreate.push(Object.assign({}, dataObj))

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
    background-color: $blankColor;
    h1 {color: $secondaryColor;font-size: 2em; text-align: center}
    h3 {color: $secondaryColor; font-size: 1.5em}
    hr {color:$secondaryColor;background-color: lightgrey;margin-bottom: 1em; padding: .25em; border-radius: 1em}
    ul {
      background-color: lightgrey;
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
