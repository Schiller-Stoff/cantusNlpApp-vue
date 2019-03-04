<template>
  <div class="card text-center" v-if="isShown">
    <div class="card-header">
      <!--<h5>LO Name</h5>-->
      <!--<hr>-->
      <button class="btn btn-link float-right" @click="removeCard">Close</button>
      <ul class="nav nav-tabs card-header-tabs">
        <li class="nav-item">
          <a class="nav-link active" href="#" @click.prevent="changeVoyantTool('Cirrus')">WordCloud</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" @click.prevent="changeVoyantTool('Reader')">Reader</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" @click.prevent="changeVoyantTool('Summary')">Summary</a>
        </li>
      </ul>
    </div>
    <!--<iframe class="card-img-top" src='https://voyant-tools.org/tool/Cirrus/?corpus=shakespeare'></iframe>-->
    <div class="card-body">
      <iframe class="card-img" :src=iframeVoyantUrl></iframe>
      <!--<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>-->
      <br>
      <br>
      <a href="#" class="btn btn-primary" @click.prevent="toggleLemmaCorpusView">Toggle Lemma/Corpus - View</a>
      <!--<button>Lemma</button>-->
      <hr>
      <h5>{{ linkedCorpus.name }} - {{ currentView }}</h5>
      <button @click.prevent="changeVoyantTool('Reader'),detectCurrentVoyantTool ">This is a test</button>
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
          currentView: "Corpus Ansicht",
          isShown: true,
          currentVoyantTool:""
        }
      },
      methods: {
        toggleLemmaCorpusView(){
          if(this.iframeVoyantUrl === this.linkedCorpus.voy_corpus){
            this.currentView="Lemma Ansicht";
            this.iframeVoyantUrl = this.linkedCorpus.voy_lemma;
          } else {
            this.currentView = "Corpus Ansicht";
            this.iframeVoyantUrl = this.linkedCorpus.voy_corpus;
          }
        },
        removeCard(){
          this.isShown=false;
        },
        changeVoyantTool(toolToSet){
          let curTool = this.detectCurrentVoyantTool();
          console.log(curTool);
          this.iframeVoyantUrl = this.iframeVoyantUrl.replace(curTool,toolToSet);
          this.currentVoyantTool = toolToSet;
          console.log(this.iframeVoyantUrl);
        },
        detectCurrentVoyantTool(){
          let regxString = this.iframeVoyantUrl.match("tool/.+/").toString();
          let onlyToolName= regxString.replace("tool/", "").replace("/","");
          //console.log(onlyToolName);
          return onlyToolName;
        }
      },
      created(){

        EventBus.$on("voyantToolChange",(tool)=>{

        });
      },
      mounted(){
        this.currentVoyantTool = this.detectCurrentVoyantTool();
      }
    }
</script>

<style scoped>

  h5 {

  }

  .card {
    min-height: 400px;
    min-width: 600px;
    /*max-width: 800px;*/
    margin: .5em;
    padding: .5em;
    /*border: none;*/
  }

  iframe {
    margin:-18px;
    padding: 0;
    width: 100%;
    border: none;
    min-height: 400px;
  }



</style>
