<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col col-1 text-center">
        <nlp-app-card-builder></nlp-app-card-builder>
      </div>
      <div class="col col-11">
        <nlp-app-card-grid :corpora="corpora"></nlp-app-card-grid>
      </div>
      <!--<div class="col col-2"></div>-->
    </div>
  </div>
</template>

<script>
    import CardGrid from "./CardGrid.vue";
    import CardBuilder from "./CardBuilder"
    export default {
      name: "AppGrid",
      components: {
        nlpAppCardGrid: CardGrid,
        nlpAppCardBuilder: CardBuilder
      },
      props: ['corpora']
    }
</script>

<style scoped>

  div.row {
    padding: 1em;
  }

  div.col {
    margin: .5em;
    border-radius: .5em;
  }

  div.container-fluid {
    background-color: #eeeeee;
    min-height: 1000px;
  }

  .col-1 {
    background-color: darkblue;
    /*max-height: 600px;*/
    max-width: 100px;
  }

  .col-2 {
    background-color: grey;
  }

  .col-11 {
    background-color: white;
    min-height: 1000px;
  }



</style>
