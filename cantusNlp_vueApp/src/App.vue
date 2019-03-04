<template>
  <div id="app">
    <nlp-app-grid></nlp-app-grid>
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
        {name:"salzburg.sal", voy_corpus:"https://voyant-tools.org/tool/Cirrus/?corpus=shakespeare", voy_lemma:"https://voyant-tools.org/tool/Cirrus/?corpus=austen"},
        {name:"salzburg.pac",voy_corpus:"https://voyant-tools.org/tool/Cirrus/?corpus=austen", voy_lemma:"https://voyant-tools.org/tool/Cirrus/?corpus=shakespeare"}
      ]
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
