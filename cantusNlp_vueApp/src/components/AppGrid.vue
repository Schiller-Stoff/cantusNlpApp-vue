<template>
  <div class="container-fluid">
    <div class="row">
      <nlp-app-card-builder-settings :corpora="corpora"></nlp-app-card-builder-settings>
    </div>
    <div class="row">
      <div class="col col-md-1 text-center">
        <nlp-app-card-builder></nlp-app-card-builder>
      </div>
      <div class="col col-md-10">
        <nlp-app-card-grid :corpora="corpora"></nlp-app-card-grid>
      </div>
      <div class="col col-md-1 text-center">
        <!--<nlp-app-card-builder></nlp-app-card-builder>-->
      </div>
      <!--<div class="col col-2"></div>-->
    </div>
  </div>
</template>

<script>
    import CardGrid from "./CardGrid.vue";
    import CardBuilder from "./CardTools";
    import CardBuilderSettings from "./CardBuilderSettings";
    export default {
      name: "AppGrid",
      components: {
        nlpAppCardGrid: CardGrid,
        nlpAppCardBuilder: CardBuilder,
        nlpAppCardBuilderSettings: CardBuilderSettings
      },
      props: ['corpora']
    }
</script>

<style scoped>

  div.col {
    margin:0;
    min-height: 100vh;
  }

  div.container-fluid {
    background-color: #eeeeee;
    min-height: 1000px;
    padding-right: 0;
    margin-right: 0;
  }

  .col-md-1 {
    background-color: darkblue;
    min-height: 400px;
  }

  .col-md-10 {
    background-color: white;
  }

  .container-fluid .row:first-child {
    min-height: 80px;
    background-color: darkblue;
  }

</style>
