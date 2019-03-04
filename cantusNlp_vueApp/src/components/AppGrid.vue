<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col col-1"></div>
      <div class="col col-10">
        <nlp-app-card-grid :corpora="corpora"></nlp-app-card-grid>
      </div>
      <!--<div class="col col-2"></div>-->
    </div>
  </div>
</template>

<script>
    import CardGrid from "./CardGrid.vue";
    export default {
      name: "AppGrid",
      components: {
        nlpAppCardGrid: CardGrid
      },
      props: ['corpora']
    }
</script>

<style scoped>

  div.row {
    padding: 8em;
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
  }

  .col-2 {
    background-color: grey;
  }

  .col-10 {
    background-color: white;
    min-height: 1000px;
  }



</style>
