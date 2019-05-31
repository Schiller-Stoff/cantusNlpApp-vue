<template>
  <div id="vue_appGrid" class="container-fluid" :style="maximizedStyle">
    <div class="row">
      <nlp-app-card-builder-settings></nlp-app-card-builder-settings>
    </div>
    <div class="row">
      <div class="col-lg-1 text-center">
        <nlp-app-card-builder></nlp-app-card-builder>
      </div>
      <div class="col-lg-10">
        <nlp-app-card-grid :corpora="corpora"></nlp-app-card-grid>
      </div>
      <div class="col-lg-1 text-center" id="v-step-10003">
        <nlp-app-card-view :corpora="corpora"></nlp-app-card-view>
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
    import {EventBus} from './../main'
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
          maximizedStyle: undefined,
          steps: [

          ]
        }
      },
      mounted(){
        this.$tours['mainTour'].start();
      },
      created(){
        EventBus.$on("toggleFullscreen",()=>{
          if(this.maximizedStyle){
            this.maximizedStyle = undefined
          } else {
            this.maximizedStyle = {position:'fixed', height:'120vh', width: '100vw', left:0, top:0, overflow:'scroll',zIndex:'2000'}
          }

        });
      }
    }
</script>

<style scoped lang="scss">
  @import "../scss/globalVariables";

  #vue_appGrid {
    background-color: $blankColor;
    border-bottom: 0; @include md {border-bottom: 5em solid $primaryColor};
    padding-right: 0;
    margin-right: 0;
    .col-lg-1 {background-color: $primaryColor; min-height: 28vh; @include lg {min-height: 100vh}; padding: 0; margin: 0}
    .col-lg-10 {border-radius: 1.5em; padding: 0; margin: 0}
    .row:first-child{min-height: 80px;background-color: $primaryColor;}
  }

  /*Styling for vue tours*/
  #vue_appGrid .v-step {
    z-index: 9999;
    text-align: justify;
    background-color: $blankColor;    /*https://color.adobe.com/de/create/color-wheel/?base=2&rule=Compound&selected=3&name=Mein%20Color-Thema&mode=rgb&rgbvalues=0,0,0.5450980392156862,0.24,0.24000000000008187,0.6,0,0.526315789473756,1,1,0.6145833333331439,0.25,0.8,0.32499999999987267,0.07999999999999999&swatchOrder=0,1,2,3,4*/
    color: black;
    /*min-width: 30em;*/
  }

  #vue_appGrid .v-step button:hover {
    /*background-color: white;*/
    border: .1em dashed $secondaryColor;
  }

  #vue_appGrid .v-step button {
    color:black;
  }


  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

</style>
