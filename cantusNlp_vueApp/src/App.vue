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

        {name:"completeCorpus", voy_corpus:"https://voyant-tools.org/?corpus=da222bf9053920eed2f53645744aa29a&input=http://glossa.uni-graz.at/gamsdev/stoffse/cantus/nlp/lo_corpora.zip", voy_lemma:"https://voyant-tools.org/?corpus=9892f4e834838ee56e8bb78b73fc0ca7&input=http://glossa.uni-graz.at/gamsdev/stoffse/cantus/nlp/lemmat.zip"},

        {name:"Brixen", voy_corpus:"https://voyant-tools.org/?corpus=1ff13aa0798dadb9e92973f7105efdce&input=https://gams.uni-graz.at/archive/objects/o:cantus.brixen/datastreams/CORPUS_PLAIN/content&view=Cirrus",voy_lemma:"https://voyant-tools.org/?corpus=6071fa8642a90eb6de107da8fd01ea54&input=http://gams.uni-graz.at/archive/objects/o:cantus.brixen/datastreams/CORPUS_LEMMAT/content&view=Cirrus"},
        {name:"Emmeram_emm1", voy_corpus:"https://voyant-tools.org/?corpus=642a97bf3093e9b01eaa770d66a08735&input=https://gams.uni-graz.at/archive/objects/o:cantus.emmeram.emm1/datastreams/CORPUS_PLAIN/content&view=Cirrus",voy_lemma:"https://voyant-tools.org/?corpus=e2ae6692a36fb300d8fdab044d7f6063&input=http://gams.uni-graz.at/archive/objects/o:cantus.emmeram.emm1/datastreams/CORPUS_LEMMAT/content&view=Cirrus"},

        // {name:"Emmeram_emm3", voy_corpus:"https://voyant-tools.org/?input=http://gams.uni-graz.at/archive/objects/o:cantus.brixen/datastreams/TEI_SOURCE/content&view=Cirrus",voy_lemma:"https://voyant-tools.org/?input=http://gams.uni-graz.at/archive/objects/o:cantus.salzburg.sal/datastreams/TEI_SOURCE/content&view=Cirrus"},
        // {name:"Emmeram_emm", voy_corpus:"https://voyant-tools.org/?input=http://gams.uni-graz.at/archive/objects/o:cantus.brixen/datastreams/TEI_SOURCE/content&view=Cirrus",voy_lemma:"https://voyant-tools.org/?input=http://gams.uni-graz.at/archive/objects/o:cantus.salzburg.sal/datastreams/TEI_SOURCE/content&view=Cirrus"},
        //
        // {name:"Freising", voy_corpus:"https://voyant-tools.org/?input=http://gams.uni-graz.at/archive/objects/o:cantus.brixen/datastreams/TEI_SOURCE/content&view=Cirrus",voy_lemma:"https://voyant-tools.org/?input=http://gams.uni-graz.at/archive/objects/o:cantus.salzburg.sal/datastreams/TEI_SOURCE/content&view=Cirrus"},
        // {name:"Hirsau", voy_corpus:"https://voyant-tools.org/?input=http://gams.uni-graz.at/archive/objects/o:cantus.brixen/datastreams/TEI_SOURCE/content&view=Cirrus",voy_lemma:"https://voyant-tools.org/?input=http://gams.uni-graz.at/archive/objects/o:cantus.salzburg.sal/datastreams/TEI_SOURCE/content&view=Cirrus"},
        //
        // {name:"Klosterneuburg_knb2", voy_corpus:"https://voyant-tools.org/?input=http://gams.uni-graz.at/archive/objects/o:cantus.brixen/datastreams/TEI_SOURCE/content&view=Cirrus",voy_lemma:"https://voyant-tools.org/?input=http://gams.uni-graz.at/archive/objects/o:cantus.salzburg.sal/datastreams/TEI_SOURCE/content&view=Cirrus"},
        // {name:"Klosterneuburg_knb3", voy_corpus:"https://voyant-tools.org/?input=http://gams.uni-graz.at/archive/objects/o:cantus.brixen/datastreams/TEI_SOURCE/content&view=Cirrus",voy_lemma:"https://voyant-tools.org/?input=http://gams.uni-graz.at/archive/objects/o:cantus.salzburg.sal/datastreams/TEI_SOURCE/content&view=Cirrus"},
        // {name:"Klosterneuburg_knb4", voy_corpus:"https://voyant-tools.org/?input=http://gams.uni-graz.at/archive/objects/o:cantus.brixen/datastreams/TEI_SOURCE/content&view=Cirrus",voy_lemma:"https://voyant-tools.org/?input=http://gams.uni-graz.at/archive/objects/o:cantus.salzburg.sal/datastreams/TEI_SOURCE/content&view=Cirrus"},
        // {name:"Klosterneuburg", voy_corpus:"https://voyant-tools.org/?input=http://gams.uni-graz.at/archive/objects/o:cantus.brixen/datastreams/TEI_SOURCE/content&view=Cirrus",voy_lemma:"https://voyant-tools.org/?input=http://gams.uni-graz.at/archive/objects/o:cantus.salzburg.sal/datastreams/TEI_SOURCE/content&view=Cirrus"},
        //
        // {name:"Moosburg", voy_corpus:"https://voyant-tools.org/?input=http://gams.uni-graz.at/archive/objects/o:cantus.brixen/datastreams/TEI_SOURCE/content&view=Cirrus",voy_lemma:"https://voyant-tools.org/?input=http://gams.uni-graz.at/archive/objects/o:cantus.salzburg.sal/datastreams/TEI_SOURCE/content&view=Cirrus"},

        // {name:"Passau", voy_corpus:"",voy_lemma:""},
        // {name:"Passau_knb", voy_corpus:"",voy_lemma:""},
        // {name:"Passau_sp", voy_corpus:"",voy_lemma:""},
        // {name:"Passau_sve", voy_corpus:"",voy_lemma:""},
        //
        // {name:"Regensburg", voy_corpus:"",voy_lemma:""},
        //
        // {name:"Salzburg", voy_corpus:"",voy_lemma:""},
        // {name:"Salzburg_ra", voy_corpus:"",voy_lemma:""},
        // {name:"Salzburg_sal", voy_corpus:"",voy_lemma:""},
        // {name:"Salzburg_vo", voy_corpus:"",voy_lemma:""},
        //
        // {name:"Seckau1_se1", voy_corpus:"",voy_lemma:""},
        // {name:"Seckau3", voy_corpus:"",voy_lemma:""},



        // {name:"Salzburg.sal", voy_corpus:"https://voyant-tools.org/tool/Cirrus/?corpus=shakespeare", voy_lemma:"https://voyant-tools.org/tool/Cirrus/?corpus=austen"},
        // {name:"Salzburg.pac",voy_corpus:"https://voyant-tools.org/tool/Cirrus/?corpus=austen", voy_lemma:"https://voyant-tools.org/tool/Cirrus/?corpus=shakespeare"},
        // {name:"Regensburg", voy_corpus:"https://voyant-tools.org/tool/Cirrus/?corpus=austen", voy_lemma:"https://voyant-tools.org/tool/Cirrus/?corpus=shakespeare"},
        // {name:"Seckau.se1",voy_corpus:"https://voyant-tools.org/tool/Cirrus/?corpus=austen", voy_lemma:"https://voyant-tools.org/tool/Cirrus/?corpus=shakespeare"}
        ]
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
        color:white;
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
