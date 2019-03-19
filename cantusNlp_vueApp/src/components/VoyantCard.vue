<template>
  <div id="VoyantCard_container" class="card text-center" v-if="isShown" :style="cardSize">
    <div class="card-header">
      <!--<h5>LO Name</h5>-->
      <!--<hr>-->
      <button class="btn btn-link float-right" @click="removeCard">Close</button>
      <button class="btn btn-link float-right" @click.prevent="resizeCard('400px', '600px')">Klein</button>
      <ul class="nav nav-tabs card-header-tabs">
        <li class="nav-item">
          <a class="nav-link" :class="(currentVoyantTool==='Cirrus') ? 'active' : '' " href="#" @click.prevent="changeVoyantTool('Cirrus');">WordCloud</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" :class="(currentVoyantTool==='Reader') ? 'active' : '' " href="#" @click.prevent="changeVoyantTool('Reader');">Reader</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" :class="(currentVoyantTool==='Summary') ? 'active' : '' " href="#" @click.prevent="changeVoyantTool('Summary')">Summary</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" :class="(resultDataDisplayed) ? 'active' : '' " href="#" @click.prevent="(resultDataDisplayed = !resultDataDisplayed); retrieveNlpData()">Forschungsdaten</a>
        </li>
      </ul>
    </div>
    <!--<iframe class="card-img-top" src='https://voyant-tools.org/tool/Cirrus/?corpus=shakespeare'></iframe>-->
    <div class="card-body" v-if="!resultDataDisplayed">
      <iframe class="card-img" :src=iframeVoyantUrl></iframe>
      <!--<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>-->
      <br>
      <br>
      <a href="#" class="btn btn-light" @click.prevent="toggleLemmaCorpusView">Lemma/Corpus</a>
      <a href="#" class="btn btn-light" @click.prevent="resizeCard('100%', '100vh')">Größer</a>
      <a href="#" class="btn btn-light" @click.prevent="resizeCard('400px', '600px')">Kleiner</a>
      <!--<button>Lemma</button>-->
      <hr>
      <h5>{{ linkedCorpus.name }} - {{ currentView }}</h5>
    </div>
    <div class="card-body" v-else>
      <h5>Nlp Daten für {{ linkedCorpus.name }}</h5>
      <ul class="list-group">
        <li class="list-group-item">Prozentsatz nich aufgefunener Wörter: {{ nlpResults.lemmasNotKnown }}</li>
        <li class="list-group-item">Entfernte Wörter: {{ nlpResults.deletedTokens }}</li>
        <li class="list-group-item">Unbekannte Wörter: {{ nlpResults.wordsNotKnown }}</li>
      </ul>
      <hr>
      <p></p>
      <hr>
      <h5>{{ linkedCorpus.name }}</h5>
    </div>
  </div>

</template>

<script>
    import {EventBus} from "../main";
    export default {
      name: "VoyantCard",
      props: ['corpora','linkedCorpus'],
      data(){
        return {
          iframeVoyantUrl: this.linkedCorpus.voy_corpus,
          currentView: "Korpus Ansicht",
          isShown: true,
          resultDataDisplayed:false,
          currentVoyantTool:"", //reassigned in mounted hook
          cardSize: {
            "height": "600px",
            "min-width": "400px"
          },
          nlpResults: {deletedTokens:"",lemmasNotKnown:"",wordsNotKnown:""}
        }
      },
      methods: {
        toggleLemmaCorpusView(){
          if(this.currentView === "Korpus Ansicht"){
            this.currentView="Lemma Ansicht";
            let replace = "view=" + this.currentVoyantTool;
            let newUrl = this.linkedCorpus.voy_lemma.replace(/view=.+/, replace).toString();
            this.iframeVoyantUrl = newUrl;
            console.log(this.iframeVoyantUrl);
          } else {
            this.currentView = "Korpus Ansicht";
            let replace = "view=" + this.currentVoyantTool;
            let newUrl = this.linkedCorpus.voy_corpus.replace(/view=.+/, replace).toString();
            this.iframeVoyantUrl = newUrl;
          }
        },
        removeCard(){
          EventBus.$emit('removeCard', this.linkedCorpus)
        },
        changeVoyantTool(toolToSet){
          //first make sure that opional data tab is hidden
          this.resultDataDisplayed = false;

          let curTool = this.detectCurrentVoyantTool();
          this.iframeVoyantUrl = this.iframeVoyantUrl.replace(curTool,toolToSet);
          this.currentVoyantTool = toolToSet;
        },
        detectCurrentVoyantTool(url=null){
          url = (url===null) ? this.iframeVoyantUrl : url;
          let regxString = url.match("view=.+").toString();
          let onlyToolName= regxString.replace("view=", "")
          console.log(onlyToolName);
          return onlyToolName;
        },
        retrieveNlpData(){
          let url = 'http://glossa.uni-graz.at/archive/objects/o:cantus.brixen/datastreams/NLP_RESULTS/content';
          this.$http.get(url)
            .then(response=>{
            return response.json();
          },error=>{
            console.log("Unable to reach " + url)
          }).then(json =>{
            this.nlpResults = json;

          });
        },
        resizeCard(width, height = null){
          console.log("resize!")
          this.cardSize = {
            "min-width": width + " !important",
            "height": (height!==null) ? (height + " !important") : this.cardSize["height"]
          }
          console.log(this.cardSize);
        }
      },
      created(){
        EventBus.$on("deleteAll",()=>{
          this.removeCard();
        });

        EventBus.$on("allViewChange",(view)=>{
          view = view.toLowerCase();
          if(view==="cirrus"){
            this.changeVoyantTool("Cirrus");
          }
          if(view==="reader"){
            this.changeVoyantTool("Reader");
          }
          if(view==="summary"){
            this.changeVoyantTool("Summary");
          }
        });

        EventBus.$on("resizeCards", (cssSizeObj)=>{
          this.resizeCard(cssSizeObj["min-width"], cssSizeObj["height"]);
        });

      },
      mounted(){
        this.currentVoyantTool = this.detectCurrentVoyantTool();
      }
    }
</script>

<style scoped lang="scss">
  @import "../scss/globalVariables.scss";

  #VoyantCard_container {
    display: inline-block;
  }

  #VoyantCard_container {
    margin: .05em !important;
    padding: .05em !important;
    min-width: 400px !important;
    .card-body {margin: 0;}
    h5 {font-weight: 900; color: $secondaryColor}
    iframe {
      margin:-18px;
      padding: 0;
      width: 100%;
      min-height: 400px !important;
      height: 80% !important;
      border: none;
    }
  }
</style>
