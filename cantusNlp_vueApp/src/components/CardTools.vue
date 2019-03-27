<template>
  <div id="v-step-10002" class="cardTools_componentRoot">
    <div class="cantusNlp_iconContainer">
      <div class="cantusNlp_iconHolder" @click="startVoyantTour();notify('Intro links')" data-balloon="Erkläre Werkzeuge" data-balloon-pos="up"><i class="fas fa-info-circle"></i></div>
    </div>
    <hr>
    <div class="cantusNlp_iconContainer">
      <div class="cantusNlp_iconHolder" id="v-step-0" data-balloon="Wortwolke" data-balloon-pos="up" @click="changeAllCardsView('Cirrus');notify('Wortwolkenmodus');markActive($event,'top');"><i class="fas fa-cloud"></i></div>
      <!--<i class="fas fa-atlas fa-2x" @click="createLOCard"></i>-->
    </div>
    <div class="cantusNlp_iconContainer">
      <div class="cantusNlp_iconHolder" id="v-step-1" data-balloon="Korpusansicht" data-balloon-pos="up" @click="changeAllCardsView('Reader');notify('Korpusmodus'); markActive($event,'top');"><i class="fas fa-adjust"></i></div>
    </div>
    <div class="cantusNlp_iconContainer">
      <div class="cantusNlp_iconHolder" id="v-step-2" data-balloon="Übersicht" data-balloon-pos="up" @click="changeAllCardsView('Summary');notify('Zusammenfassungsmodus'); markActive($event,'top');"><i class="fab fa-creative-commons-share"></i></div>
    </div>
    <div class="cantusNlp_iconContainer">
      <div class="cantusNlp_iconHolder" data-balloon="Lemma-Modus" data-balloon-pos="up" @click="markActive($event,'top');"><i class="fas fa-stream"></i></div>
    </div>
    <div class="cantusNlp_iconContainer">
      <div class="cantusNlp_iconHolder" data-balloon="Weiterer Modus?" data-balloon-pos="up" @click="markActive($event,'top');"><i class="fas fa-tablet"></i></div>
    </div>
    <div class="cantusNlp_iconContainer">
      <div class="cantusNlp_iconHolder" data-balloon="Weiterer Modus?" data-balloon-pos="up" @click="markActive($event,'top');"><i class="far fa-file-excel"></i></div>
    </div>
    <hr>
    <div>
      <div class="cantusNlp_iconContainer">
        <div @click="notify('Title','hi there!')" id="v-step-3" class="cantusNlp_iconHolder" data-balloon="Übersicht" data-balloon-pos="up"><i class="fab fa-adn"></i></div>
      </div>
      <div class="cantusNlp_iconContainer">
        <div class="cantusNlp_iconHolder" id="v-step-4" data-balloon="Karten entfernen" data-balloon-pos="up"><i class="fas fa-broom" @click="deleteAllCards(); notify('Ansichten entfernt')"></i></div>
      </div>

    </div>
    <v-tour name="myTour" :steps="steps">
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
                <button v-if="index<steps.length-1" @click="tour.nextStep" class="btn">Weiter</button>
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
    import {EventBus} from "./../main";
    import {vueNotifyMixin} from "../mixins/vueNotifyMixin"
    import {iconMethodsMixin} from "../mixins/iconMethodsMixin";

    export default {
      name: "CardBuilder",
      mixins: [vueNotifyMixin, iconMethodsMixin],
      data(){
        return {
          steps: [
            {
              target: '#v-step-0',  // We're using document.querySelector() under the hood
              content: `Mit dem <strong>Wortwolken</strong> Werkzeug können alle Voyant Ansichten auf dieselbe Ansicht geschalten werden.`,
              offset:document.documentElement.scrollTop-150,
              duration:100,
              params: {
                placement: 'right'
              }
            },
            {
              target: '#v-step-1',  // We're using document.querySelector() under the hood
              content: `Selbiges funktioniert auch für die  <strong>Korpusansicht</strong> .`,
              offset:document.documentElement.scrollTop-150,
              duration:100,
              params: {
                placement: 'right'
              }
            },
            {
              target: '#v-step-2',  // We're using document.querySelector() under the hood
              content: `...und für die <strong>Zusammenfassung</strong>`,
              offset:document.documentElement.scrollTop-150,
              duration:100,
              params: {
                placement: 'right'
              }
            },
            {
              target: '#v-step-3',  // We're using document.querySelector() under the hood
              content: `Dummy <strong>Cantus Voyant</strong>!`,
              offset:document.documentElement.scrollTop-150,
              duration:100,
              params: {
                placement: 'right'
              }
            },
            {
              target: '#v-step-4',  // We're using document.querySelector() under the hood
              content: `Hiermit können alle Karten <strong>gelöscht</strong> werden.`,
              offset:document.documentElement.scrollTop-150,
              duration:100,
              params: {
                placement: 'right'
              }
            }
          ]
        }
      },
      methods: {
        changeAllCardsView(view_str){
          EventBus.$emit('allViewChange',view_str);
        },
        deleteAllCards(){
          EventBus.$emit("deleteAll");
        },
        startVoyantTour(){
          this.$tours['myTour'].start();
        }
      }
    }
</script>

<style scoped lang="scss">
@import "../scss/globalVariables.scss";

  #v-step-10002 hr {
    color: $blankColor;
    border: .05em $blankColor solid;
    border-radius: 10em;
    width: 50%; @include sm {width: 3em}
  }

  #v-step-10002 .cardTools_componentRoot {
    margin-top: 1em; @include sm {margin-top: initial !important}
  }

  /*Styling for icons*/
  #v-step-10002 .cantusNlp_iconContainer {
    display: inline-block; @include lg {display: block}
    .cantusNlp_iconHolder {
      padding: .5em 1em; @include sm {padding: .5em !important;}
      i {font-size: 2em;@include sm {font-size: 1.5em !important;}}
    }
  }

  /*Styling for the vue tours*/
  #v-step-10002 .v-step {
    z-index: 9999;
    background-color: $secondaryColor;    /*https://color.adobe.com/de/create/color-wheel/?base=2&rule=Compound&selected=3&name=Mein%20Color-Thema&mode=rgb&rgbvalues=0,0,0.5450980392156862,0.24,0.24000000000008187,0.6,0,0.526315789473756,1,1,0.6145833333331439,0.25,0.8,0.32499999999987267,0.07999999999999999&swatchOrder=0,1,2,3,4*/
    color: lightgrey;
    min-width: 20em;
    button {color: lightgrey; &:hover {background-color: $fifthColor;}}
  }

  /*Animations for vue tours*/
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

</style>
