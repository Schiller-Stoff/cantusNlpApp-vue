<template>
  <div class="container-fluid TheFullTextIncipitSearch_mainContainer">
    <h4>Erweiterte Volltextsuche (incipit)</h4>
    <br>
  </div>
</template>

<script>
  export default {
    name: "TheFullTextIncipitSearch"
  }
</script>

<style scoped lang="scss">
  @import "../../../scss/globalVariables/globalVariables";

  .TheFullTextIncipitSearch_input {
    width:65% !important;
  }


  .TheFullTextIncipitSearch_mainContainer {
    /*padding:4em 2em 2em 2em;*/
    /*border: lightgrey solid .15em;*/
    /*margin:1em;*/
    border-radius: .25em;
    background-color: $primaryColor;
  }


  p {
    text-align: justify;
  }

  hr {
    border: none;
    padding:.25em;
    background-color: lightgrey;
    border-radius: 5em;
  }

  h4 {
    text-decoration: underline;
    /*color: $tertiaryColor*/
  }

</style>
