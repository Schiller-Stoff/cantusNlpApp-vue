<template>
  <div class="card text-center VoyantCard_container" v-if="isShown" :style="cardSize">
    <div class="card-header">
      <button class="btn btn-link float-right" @click="removeCard">Close</button>
      <button class="btn btn-link float-right" @click.prevent="resizeCard('400px', '600px')">Klein</button>
      <ul class="nav nav-tabs card-header-tabs">
        <li class="nav-item">
          <a class="nav-link" href="#">WordCloud</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" >Reader</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Summary</a>
        </li>
        <li class="nav-item">
          <a class="nav-link">JSON-Data</a>
        </li>
      </ul>
    </div>
    <!--<iframe class="card-img-top" src='https://voyant-tools.org/tool/Cirrus/?corpus=shakespeare'></iframe>-->
    <div class="card-body" v-if="!resultDataDisplayed">
      <!--<iframe class="card-img" :src=iframeVoyantUrl></iframe>-->
      <app-word-cloud
        :data="Object.assign([], linkedCorpus.mostFrequentLemmatas)"
        nameKey="name"
        valueKey="value"
        :color="defaultColors"
        :showTooltip="true"
        :rotate="{from: 0, to: 90, numOfOrientation: 2 }"
      ></app-word-cloud>
      <!--<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>-->
      <br>
      <br>
      <h5 class=".d-inline">{{ linkedCorpus.name }} - {{ currentView }}</h5>
      <a href="#" class="btn btn-light">Lemmatisierter Text/Originaltext</a>
      <a href="#" class="btn btn-light" @click.prevent="resizeCard('100%', '100vh')">Größer</a>
      <a href="#" class="btn btn-light" @click.prevent="resizeCard('400px', '600px')">Kleiner</a>
      <!--<button>Lemma</button>-->

    </div>
    <div class="card-body" v-else>
      <h5>Nlp Daten für {{ linkedCorpus.name }}</h5>
      <hr>
      <a class="btn btn-secondary" >Forschungsdaten als JSON</a>
    </div>
  </div>

</template>

<script>
    import {EventBus} from "../main";
    import wordcloud from 'vue-wordcloud'
    import {defaultWords} from "../data/defaultWordsWordcloud";
    import {defaultColors} from "../data/defaultWordsWordcloud";
    import {wordsNotKnown} from "../data/defaultWordsWordcloud";
    import {nlpResults} from "../data/nlpResults";

    export default {
      name: "VoyantCard",
      components:{
        appWordCloud: wordcloud
      },
      props: ['corpora','linkedCorpus'],
      data(){
        return {
          defaultWords,
          defaultColors,
          wordsNotKnown,
          nlpResultsTry: nlpResults,
          currentView: "Originaltext",
          isShown: true,
          resultDataDisplayed:false,
          cardSize: {
            "height": "600px",
            "min-width": "400px"
          }
        }
      },
      methods: {
        removeCard(){
          EventBus.$emit('removeCard', this.linkedCorpus)
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

          }
          if(view==="reader"){

          }
          if(view==="summary"){

          }
        });

        EventBus.$on("resizeCards", (cssSizeObj)=>{
          this.resizeCard(cssSizeObj["min-width"], cssSizeObj["height"]);
        });

      }
    }
</script>

<style scoped lang="scss">
  @import "../scss/globalVariables.scss";

  .VoyantCard_container {
    display: inline-block;
  }

  .VoyantCard_container {
    margin: .05em !important;
    padding: .05em !important;
    min-width: 400px !important;
    .card-header {margin-bottom: .1em !important;}
    .card-body {margin: 0;}
    h5 {font-weight: 900; color: black}
    iframe {
      padding: 0;
      width: 100% !important;
      min-height: 400px !important;
      height: 80% !important;
      border: none;
    }
  }
</style>
