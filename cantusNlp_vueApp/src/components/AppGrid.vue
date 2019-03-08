<template>
  <div class="container-fluid">
    <div class="row">
      <nlp-app-card-builder-settings :corpora="corpora"></nlp-app-card-builder-settings>
    </div>
    <div class="row">
      <div class="col-md-1 text-center">
        <nlp-app-card-builder></nlp-app-card-builder>
      </div>
      <div class="col-md-10" id="v-step-10004">
        <nlp-app-card-grid :corpora="corpora"></nlp-app-card-grid>
      </div>
      <div class="col-md-1 text-center" id="v-step-10003">
        <nlp-app-card-view></nlp-app-card-view>
      </div>
      <!--<div class="col col-2"></div>-->
    </div>

    <v-tour name="mainTour" :steps="steps">
      <template slot-scope="tour">
        <transition name="fade">
          <v-step
            v-if="tour.currentStep === index"
            v-for="(step, index) of tour.steps"
            :key="index"
            :step="step"
            :previous-step="tour.previousStep"
            :next-step="tour.nextStep"
            :stop="tour.stop"
            :is-first="tour.isFirst"
            :is-last="tour.isLast"
            :labels="tour.labels"
          >
            <template>
              <div slot="actions">
                <hr>
                <button @click="tour.previousStep" class="btn">Zurück</button>
                <button @click="tour.nextStep" class="btn">Weiter</button>
                <button @click="tour.stop" class="btn">Beenden</button>
              </div>
            </template>
          </v-step>
        </transition>
      </template>
    </v-tour>
  </div>
</template>

<script>
    import CardGrid from "./CardGrid.vue";
    import CardBuilder from "./CardTools";
    import CardBuilderSettings from "./CardBuilderSettings";
    import CardView from "./CardView";
    export default {
      name: "AppGrid",
      components: {
        nlpAppCardGrid: CardGrid,
        nlpAppCardBuilder: CardBuilder,
        nlpAppCardBuilderSettings: CardBuilderSettings,
        nlpAppCardView: CardView
      },
      props: ['corpora'],
      data(){
        return {
          steps: [
            {
              target: '#v-step-10000',  // We're using document.querySelector() under the hood
              content: `Herzlich wilkommen zur <strong>Cantus Voyant App</strong>!<hr> <p>Sie können
                        diese Einführung jederzeit beenden oder durch click auf "weiter" weiter verfolgen</p>`,
              params: {
                placement: 'bottom'
              }
            },
            {
              target: '#v-step-10001',  // We're using document.querySelector() under the hood
              content: `Werkzeuge der oberen <strong>Leiste</strong> dienen zur Auswahl und dem Hinzufügen
                        von Voyant-Ansichten für gewünschte Libri Ordinari...`,
              params: {
                placement: 'bottom'
              }
            },
            {
              target: '#v-step-10002',  // We're using document.querySelector() under the hood
              content: `...während es sich auf der linken Seite um Werkzeuge zur<strong> Modifkiation aller Voyant
              Karten</strong> zugleich handelt.`,
              params: {
                placement: 'right'
              }
            },
            {
              target: '#v-step-10003',  // We're using document.querySelector() under the hood
              content: `Rechts finden sich weitere Informationen zu den <strong>Legenden und Bezeichnungen</strong> der
                        diversen Ansichten.`,
              params: {
                placement: 'left'
              }
            },
            {
              target: '#v-step-10004',  // We're using document.querySelector() under the hood
              content: `In der <strong>mittleren Ansicht</strong> werden schlussendlich Karten mit den einzelnen Voyant-Ansichten auf die LO
                        eingeblendet. <strong>Benutzen Sie die Info-Knöpfe um weitere Information</strong> zu den Werkzeugen
                         in der jeweiligen Leiste zu bekommen.`,
              params: {
                placement: 'bottom'
              }
            }
          ]
        }
      },
      mounted(){
        this.$tours['mainTour'].start();
      }
    }
</script>

<style scoped lang="scss">
  @import "../scss/globalVariables";

  div.container-fluid {
    background-color: $blankColor;
    min-height: 1000px;
    padding-right: 0;
    margin-right: 0;
    div.col { margin:0; min-height: 100vh;}
    .col-md-1 {background-color: $primaryColor;min-height: 400px;}
    .col-md-10 {border-radius: 1.5em;}
    .row:first-child{min-height: 80px;background-color: $primaryColor;}
  }

  /*Styling for vue tours*/
  .v-step {
    z-index: 9999;
    text-align: justify;
    background-color: $blankColor;    /*https://color.adobe.com/de/create/color-wheel/?base=2&rule=Compound&selected=3&name=Mein%20Color-Thema&mode=rgb&rgbvalues=0,0,0.5450980392156862,0.24,0.24000000000008187,0.6,0,0.526315789473756,1,1,0.6145833333331439,0.25,0.8,0.32499999999987267,0.07999999999999999&swatchOrder=0,1,2,3,4*/
    color: black;
    /*min-width: 30em;*/
  }

  .v-step button:hover {
    /*background-color: white;*/
    border: .1em dashed $secondaryColor;
  }

  .v-step button {
    color:black;
  }


  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

</style>
