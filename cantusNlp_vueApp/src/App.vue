<template>
  <div id="vue_app">
    <nlp-app-grid :corpora="corpora"></nlp-app-grid>
    <notifications classes="my-notes" group="foo" :position="'bottom right'"> </notifications>
  </div>
</template>

<script>
import AppGrid from "./components/AppGrid.vue"
export default {
  name: 'app',
  components: {
    nlpAppGrid: AppGrid
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      corpora: [

        //sending data via glossa: http://glossa.uni-graz.at/gamsdev/stoffse/cantus/nlp/lemmat.zip                  // For the creation of an aggregated corpus
        // created lemma corpus with link above:
          // - https://voyant-tools.org/?corpus=9892f4e834838ee56e8bb78b73fc0ca7&input=http://glossa.uni-graz.at/gamsdev/stoffse/cantus/nlp/lemmat.zip

        {name:"Korpus Gesamt", voy_corpus:"https://voyant-tools.org/?corpus=136b572f827655c9f62d923584d406be&input=http://gams.uni-graz.at/context:cantus/CORPUS_ORIG", voy_lemma:"https://voyant-tools.org/?corpus=bfb2ddb650a86ae776575fbf5bf05568&input=http://gams.uni-graz.at/context:cantus/CORPUS_LEMMAT"},

        {name:"Passau", voy_corpus:"https://voyant-tools.org/?corpus=5c34ab5c3e2b39cf2cc2a1e4c9fde7a2&input=https://gams.uni-graz.at/archive/objects/o:cantus.passau/datastreams/CORPUS_PLAIN/content&view=Cirrus",voy_lemma:"https://voyant-tools.org/?corpus=193fd3bc42098c938fc3c6f0d3ed47c3&input=https://gams.uni-graz.at/archive/objects/o:cantus.passau/datastreams/CORPUS_LEMMAT/content&view=Cirrus", nlpResults:"http://gams.uni-graz.at/archive/objects/o:cantus.passau/datastreams/NLP_RESULTS/content"},
        {name:"Passau_knb", voy_corpus:"https://voyant-tools.org/?corpus=30212f907cd263eac28d07535195c433&input=https://gams.uni-graz.at/archive/objects/o:cantus.passau.knb/datastreams/CORPUS_PLAIN/content&view=Cirrus",voy_lemma:"https://voyant-tools.org/?corpus=f4371588282c87bbf80cbc2ae7df8196&input=https://gams.uni-graz.at/archive/objects/o:cantus.passau.knb/datastreams/CORPUS_LEMMAT/content&view=Cirrus", nlpResults:"http://gams.uni-graz.at/archive/objects/o:cantus.passau.knb/datastreams/NLP_RESULTS/content"},
        {name:"Passau_sp", voy_corpus:"https://voyant-tools.org/?corpus=bbfa77ef776c60675c400465b3ee673c&input=https://gams.uni-graz.at/archive/objects/o:cantus.passau.sp/datastreams/CORPUS_PLAIN/content&view=Cirrus",voy_lemma:"https://voyant-tools.org/?corpus=02345f59e456cc49a98a9ef721b6e429&input=https://gams.uni-graz.at/archive/objects/o:cantus.passau.sp/datastreams/CORPUS_LEMMAT/content&view=Cirrus", nlpResults:"http://gams.uni-graz.at/archive/objects/o:cantus.passau.sp/datastreams/NLP_RESULTS/content"},
        {name:"Passau_sve", voy_corpus:"https://voyant-tools.org/?corpus=3e08cd69fc449c31f897d4292b176130&input=https://gams.uni-graz.at/archive/objects/o:cantus.passau.sve/datastreams/CORPUS_PLAIN/content&view=Cirrus",voy_lemma:"https://voyant-tools.org/?corpus=bf3c4e9f28b863ee3e3a4583163808ad&input=https://gams.uni-graz.at/archive/objects/o:cantus.passau.sve/datastreams/CORPUS_LEMMAT/content&view=Cirrus", nlpResults:"http://gams.uni-graz.at/archive/objects/o:cantus.passau.sve/datastreams/NLP_RESULTS/content"},

        {name:"Salzburg", voy_corpus:"https://voyant-tools.org/?corpus=2da464ef8ff441361960674e1929ddda&input=https://gams.uni-graz.at/archive/objects/o:cantus.salzburg/datastreams/CORPUS_PLAIN/content&view=Cirrus",voy_lemma:"https://voyant-tools.org/?corpus=13a18cf889f1c6c68072e8b512a251ba&input=https://gams.uni-graz.at/archive/objects/o:cantus.salzburg/datastreams/CORPUS_LEMMAT/content&view=Cirrus", nlpResults:"http://gams.uni-graz.at/archive/objects/o:cantus.salzburg/datastreams/NLP_RESULTS/content"},
        {name:"Salzburg_ra", voy_corpus:"https://voyant-tools.org/?corpus=5b1dcbf7f179857de5d373c206d18612&input=https://gams.uni-graz.at/archive/objects/o:cantus.salzburg.ra/datastreams/CORPUS_PLAIN/content&view=Cirrus",voy_lemma:"https://voyant-tools.org/?corpus=0c43982c40ecfed4cd5e59df544ffe61&input=https://gams.uni-graz.at/archive/objects/o:cantus.salzburg.ra/datastreams/CORPUS_LEMMAT/content&view=Cirrus", nlpResults:"http://gams.uni-graz.at/archive/objects/o:cantus.salzburg.ra/datastreams/NLP_RESULTS/content"},
        {name:"Salzburg_sal", voy_corpus:"https://voyant-tools.org/?corpus=6b21c784c93f88dbf35dc02d90202a64&input=https://gams.uni-graz.at/archive/objects/o:cantus.salzburg.sal/datastreams/CORPUS_PLAIN/content&view=Cirrus",voy_lemma:"https://voyant-tools.org/?corpus=7652ed1360aa4ba552c45f32ce975588&input=https://gams.uni-graz.at/archive/objects/o:cantus.salzburg.sal/datastreams/CORPUS_LEMMAT/content&view=Cirrus", nlpResults:"http://gams.uni-graz.at/archive/objects/o:cantus.salzburg.sal/datastreams/NLP_RESULTS/content"},
        {name:"Salzburg_vo", voy_corpus:"https://voyant-tools.org/?corpus=1287cb250374443d5810a9e08ff8db78&input=https://gams.uni-graz.at/archive/objects/o:cantus.salzburg.vo/datastreams/CORPUS_PLAIN/content&view=Cirrus",voy_lemma:"https://voyant-tools.org/?corpus=bcfe9eaa06deb92c314133f9c005b5f1&input=https://gams.uni-graz.at/archive/objects/o:cantus.salzburg.vo/datastreams/CORPUS_LEMMAT/content&view=Cirrus", nlpResults:"http://gams.uni-graz.at/archive/objects/o:cantus.salzburg.vo/datastreams/NLP_RESULTS/content"},


        // {name:"Klosterneuburg_knb2", voy_corpus:"https://voyant-tools.org/?input=http://gams.uni-graz.at/archive/objects/o:cantus.brixen/datastreams/TEI_SOURCE/content&view=Cirrus",voy_lemma:"https://voyant-tools.org/?input=http://gams.uni-graz.at/archive/objects/o:cantus.salzburg.sal/datastreams/TEI_SOURCE/content&view=Cirrus"},
        // {name:"Klosterneuburg_knb3", voy_corpus:"https://voyant-tools.org/?input=http://gams.uni-graz.at/archive/objects/o:cantus.brixen/datastreams/TEI_SOURCE/content&view=Cirrus",voy_lemma:"https://voyant-tools.org/?input=http://gams.uni-graz.at/archive/objects/o:cantus.salzburg.sal/datastreams/TEI_SOURCE/content&view=Cirrus"},
        // {name:"Klosterneuburg_knb4", voy_corpus:"https://voyant-tools.org/?input=http://gams.uni-graz.at/archive/objects/o:cantus.brixen/datastreams/TEI_SOURCE/content&view=Cirrus",voy_lemma:"https://voyant-tools.org/?input=http://gams.uni-graz.at/archive/objects/o:cantus.salzburg.sal/datastreams/TEI_SOURCE/content&view=Cirrus"},
        // {name:"Klosterneuburg", voy_corpus:"https://voyant-tools.org/?input=http://gams.uni-graz.at/archive/objects/o:cantus.brixen/datastreams/TEI_SOURCE/content&view=Cirrus",voy_lemma:"https://voyant-tools.org/?input=http://gams.uni-graz.at/archive/objects/o:cantus.salzburg.sal/datastreams/TEI_SOURCE/content&view=Cirrus"},

        {name:"Freising", voy_corpus:"https://voyant-tools.org/?corpus=18ac768c0b97a5c1a1d75cf94c1b1482&input=https://gams.uni-graz.at/archive/objects/o:cantus.freising/datastreams/CORPUS_PLAIN/content&view=Cirrus",voy_lemma:"https://voyant-tools.org/?corpus=b16ac7f6ff3261fb2c00a1baa1339ded&input=https://gams.uni-graz.at/archive/objects/o:cantus.freising/datastreams/CORPUS_LEMMAT/content&view=Cirrus", nlpResults:"http://gams.uni-graz.at/archive/objects/o:cantus.freising/datastreams/NLP_RESULTS/content"},

        {name:"Emmeram_emm1", voy_corpus:"https://voyant-tools.org/?corpus=642a97bf3093e9b01eaa770d66a08735&input=https://gams.uni-graz.at/archive/objects/o:cantus.emmeram.emm1/datastreams/CORPUS_PLAIN/content&view=Cirrus",voy_lemma:"https://voyant-tools.org/?corpus=e2ae6692a36fb300d8fdab044d7f6063&input=http://gams.uni-graz.at/archive/objects/o:cantus.emmeram.emm1/datastreams/CORPUS_LEMMAT/content&view=Cirrus", nlpResults:"http://gams.uni-graz.at/archive/objects/o:cantus.emmeram.emm1/datastreams/NLP_RESULTS/content"},
        {name:"Emmeram_emm2", voy_corpus:"https://voyant-tools.org/?corpus=3955048faae992b6a59cf4ee814533ce&input=https://gams.uni-graz.at/archive/objects/o:cantus.emmeram/datastreams/CORPUS_PLAIN/content&view=Cirrus",voy_lemma:"https://voyant-tools.org/?corpus=f6cf2718da2864525998ad6ea14936bd&input=https://gams.uni-graz.at/archive/objects/o:cantus.emmeram/datastreams/CORPUS_LEMMAT/content&view=Cirrus", nlpResults:"http://gams.uni-graz.at/archive/objects/o:cantus.emmeram/datastreams/NLP_RESULTS/content"},
        {name:"Emmeram_emm3", voy_corpus:"https://voyant-tools.org/?corpus=120297dd7590a2b5f6258b8857adfe88&input=https://gams.uni-graz.at/archive/objects/o:cantus.emmeram.emm3/datastreams/CORPUS_PLAIN/content&view=Cirrus",voy_lemma:"https://voyant-tools.org/?corpus=84c28312fa7277270ca33d1f06dccd49&input=https://gams.uni-graz.at/archive/objects/o:cantus.emmeram.emm3/datastreams/CORPUS_LEMMAT/content&view=Cirrus", nlpResults:"http://gams.uni-graz.at/archive/objects/o:cantus.emmeram.emm3/datastreams/NLP_RESULTS/content"},

        {name:"Regensburg", voy_corpus:"https://voyant-tools.org/?corpus=fa325d63d66c53bbba370b71c71013e6&input=https://gams.uni-graz.at/archive/objects/o:cantus.regensburg/datastreams/CORPUS_PLAIN/content&view=Cirrus",voy_lemma:"https://voyant-tools.org/?corpus=21c134a50dcc39e730eaf0d1712a55cc&input=https://gams.uni-graz.at/archive/objects/o:cantus.regensburg/datastreams/CORPUS_LEMMAT/content&view=Cirrus", nlpResults:"http://gams.uni-graz.at/archive/objects/o:cantus.regensburg/datastreams/NLP_RESULTS/content"},

        {name:"Brixen", voy_corpus:"https://voyant-tools.org/?corpus=1ff13aa0798dadb9e92973f7105efdce&input=https://gams.uni-graz.at/archive/objects/o:cantus.brixen/datastreams/CORPUS_PLAIN/content&view=Cirrus",voy_lemma:"https://voyant-tools.org/?corpus=6071fa8642a90eb6de107da8fd01ea54&input=http://gams.uni-graz.at/archive/objects/o:cantus.brixen/datastreams/CORPUS_LEMMAT/content&view=Cirrus", nlpResults:"http://gams.uni-graz.at/archive/objects/o:cantus.brixen/datastreams/NLP_RESULTS/content"},

        {name:"Moosburg", voy_corpus:"https://voyant-tools.org/?corpus=3f4291833c2881d9979e7e037e1572e1&input=https://gams.uni-graz.at/archive/objects/o:cantus.moosburg/datastreams/CORPUS_PLAIN/content&view=Cirrus",voy_lemma:"https://voyant-tools.org/?corpus=cc0fbe76d62d2b03deb4468e7bff800b&input=https://gams.uni-graz.at/archive/objects/o:cantus.moosburg/datastreams/CORPUS_LEMMAT/content&view=Cirrus", nlpResults:"http://gams.uni-graz.at/archive/objects/o:cantus.moosburg/datastreams/NLP_RESULTS/content"},

        {name:"Seckau1_se1", voy_corpus:"https://voyant-tools.org/?corpus=43f9e1a260f78ec6e191337d399be932&input=https://gams.uni-graz.at/archive/objects/o:cantus.seckau1.se1/datastreams/CORPUS_PLAIN/content&view=Cirrus",voy_lemma:"https://voyant-tools.org/?corpus=671df38549dbd13b92dd2f2ca60e054a&input=https://gams.uni-graz.at/archive/objects/o:cantus.seckau1.se1/datastreams/CORPUS_LEMMAT/content&view=Cirrus", nlpResults:"http://gams.uni-graz.at/archive/objects/o:cantus.seckau1.se1/datastreams/NLP_RESULTS/content"},

        {name:"Seckau3", voy_corpus:"https://voyant-tools.org/?corpus=05d52c71e8d968a6f268add518358a8c&input=https://gams.uni-graz.at/archive/objects/o:cantus.seckau3/datastreams/CORPUS_PLAIN/content&view=Cirrus",voy_lemma:"https://voyant-tools.org/?corpus=03d8c5906e3dbdd73bd4150457013797&input=https://gams.uni-graz.at/archive/objects/o:cantus.seckau3/datastreams/CORPUS_LEMMAT/content&view=Cirrus", nlpResults:"http://gams.uni-graz.at/archive/objects/o:cantus.seckau3/datastreams/NLP_RESULTS/content"},

        {name:"Hirsau", voy_corpus:"https://voyant-tools.org/?corpus=f83e7eae8c6afccafa3e51ffea86604a&input=https://gams.uni-graz.at/archive/objects/o:cantus.hirsau/datastreams/CORPUS_PLAIN/content&view=Cirrus",voy_lemma:"https://voyant-tools.org/?corpus=4bbdc8d88d49d574cfdeda092ba3ce18&input=https://gams.uni-graz.at/archive/objects/o:cantus.hirsau/datastreams/CORPUS_LEMMAT/content&view=Cirrus", nlpResults:"http://gams.uni-graz.at/archive/objects/o:cantus.hirsau/datastreams/NLP_RESULTS/content"},



        ]
    }
  },
  created(){
    try {
      if(vueCardUiConfig){
        console.warn("--- Found configuration file --- \n Hardcoded data from js will be ignored now.")
        this.corpora = vueCardUiConfig.corpora;
      }
    } catch (e) {
      console.warn("No configuration file 'vueCardUiConfig' found. Applying data from inside the javascript");
    }
  }
}

</script>

<style scoped lang="scss">
  @import "scss/globalVariables";

  /*Css that applies to all children of the container*/
  #vue_app /deep/ {
    @import "~bootstrap/dist/css/bootstrap.min";
    .my-notes {
      // Style of the notification itself
      padding: 1em;
      margin: .5em 2em;
      font-size: 1em;
      color: $blankColor;
      background: $secondaryColor;
      border-radius: .5em;
      text-align: center;
      .notification-title { /* Style for title line */ }
      .notification-content { /* Style for content */ }
      &.my-type {/*
      Style for specific type of notification, will be applied when you
      call notification with "type" parameter:
      this.$notify({ type: 'my-type', message: 'Foo' })
      */
      }
    }
    .cantusNlp_iconHolder {
      cursor: pointer;
      i {
        color:$iconColor;
        font-size:1.5em;
        &:hover{
          color:$fourthColor;
        }
      }
    }

    /* Normalizing bootstrap content */
    .container-fluid {
      margin: 0;
      padding: 0;
      @include sm{margin: initial; padding: initial}
    }
    .row {
      margin: 0; padding: 0;
      @include sm{margin: initial; padding: initial}
    }
  }


</style>

<!--not scoped here!-->
<style lang="scss">

  /*Removing body, html overflow*/
  /*html, body {*/
    /*width: 100%;*/
    /*height: 100%;*/
    /*margin:0;*/
    /*padding: 0;*/
    /*overflow-x: hidden;*/
  /*}*/

</style>
