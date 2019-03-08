<template>
  <div id="app">
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
        {name:"Salzburg.sal", voy_corpus:"https://voyant-tools.org/tool/Cirrus/?corpus=shakespeare", voy_lemma:"https://voyant-tools.org/tool/Cirrus/?corpus=austen"},
        {name:"Salzburg.pac",voy_corpus:"https://voyant-tools.org/tool/Cirrus/?corpus=austen", voy_lemma:"https://voyant-tools.org/tool/Cirrus/?corpus=shakespeare"},
        {name:"Regensburg", voy_corpus:"https://voyant-tools.org/tool/Cirrus/?corpus=austen", voy_lemma:"https://voyant-tools.org/tool/Cirrus/?corpus=shakespeare"},
        {name:"Seckau.se1",voy_corpus:"https://voyant-tools.org/tool/Cirrus/?corpus=austen", voy_lemma:"https://voyant-tools.org/tool/Cirrus/?corpus=shakespeare"}
        ]
    }
  }
}

</script>

<!--not scoped here!-->
<style lang="scss">
// importing scss global variables first
@import "scss/globalVariables";

  /*Global Style for the notification*/
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

  /*Global Style for icons*/
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


</style>
