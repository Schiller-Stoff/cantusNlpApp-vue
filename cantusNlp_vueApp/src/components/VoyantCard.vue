<template>
  <div id="VoyantCard_container" class="card text-center" v-if="isShown">
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
      </ul>
    </div>
    <!--<iframe class="card-img-top" src='https://voyant-tools.org/tool/Cirrus/?corpus=shakespeare'></iframe>-->
    <div class="card-body">
      <iframe class="card-img" :src=iframeVoyantUrl></iframe>
      <!--<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>-->
      <br>
      <br>
      <a href="#" class="btn btn-light" @click.prevent="toggleLemmaCorpusView">Lemma/Corpus</a>
      <a href="#" class="btn btn-light" @click.prevent="resizeCard('100%', '75em')">Größer</a>
      <a href="#" class="btn btn-light" @click.prevent="resizeCard('400px', '600px')">Kleiner</a>
      <!--<button>Lemma</button>-->
      <hr>
      <h5>{{ linkedCorpus.name }} - {{ currentView }}</h5>
    </div>
  </div>


    <!--<blockquote class="blockquote mb-0">-->
      <!--<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat.</p>-->
      <!--<footer class="blockquote-footer">-->
        <!--<small>-->
          <!--Someone famous in <cite title="Source Title">Source Title</cite>-->
        <!--</small>-->
      <!--</footer>-->
    <!--</blockquote>-->
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
          currentVoyantTool:"", //reassigned in mounted hook
          cardSize: {
            "min-height": "600px",
            "min-width": "400px"
          }
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
        resizeCard(width, height = null){
          this.cardSize = {
            "min-width": width,
            "min-height": (height!==null) ? height : this.cardSize["min-height"]
          }
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
          this.cardSize = cssSizeObj;
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
    margin: .5em;
    padding: .5em;
    min-width: 400px !important;
    iframe {
      margin:-18px;
      padding: 0;
      width: 100%;
      min-height: 400px !important;
      /*min-width: 400px;*/
      border: none;
    }
  }
</style>
