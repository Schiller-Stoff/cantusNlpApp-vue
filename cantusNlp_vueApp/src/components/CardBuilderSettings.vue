<template>
    <div id="v-step-10001" class="container">
      <form class="form-inline">
        <div id="v-step-100" class="form-group mb-2">
          <label for="LO_select" class="sr-only">LO Selection</label>
          <select id="LO_select" class="form-control form-control" v-model="selectedLO">
            <option v-for="lo in libriOrdinarii" :value="lo.value">{{ lo.text }}</option>
          </select>
        </div>
        <progress-button @click.prevent="createCard(selectedLO);notify('Nlp Karte erstellt')" id="v-step-101" name="duration" class="btn mb-2" :duration="loBtnClickBlockDuration">LO hinzufügen</progress-button>
        <div @click="notify('Maximiert/Minimiert'); maximizeApp()">
          <div id="v-step-102" class="cantusNlp_iconHolder" data-balloon="Maximieren" data-balloon-pos="down"><i class="far fa-window-maximize"></i></div>
        </div>
        <div id="cardBuilder_tourButton" @click="startVueTour();notify('Intro oben gestartet')">
          <div class="cantusNlp_iconHolder" data-balloon="Info Werkzeuge oben" data-balloon-pos="down"><i class="fas fa-info-circle"></i></div>
        </div>

      </form>
      <v-tour name="topTour" :steps="steps">
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
  //global for this component, used to delay load of another voyant card for 1sek
  let loBtnClickBlocker = false;

  import {EventBus} from "../main";
  import {vueNotifyMixin} from "../mixins/vueNotifyMixin";
  import ProgressButton from 'vue-progress-button'
  import {libriOrdinarii} from "../data/libriOrdinarii";

  export default {
    name: "CardBuilderSettings",
    mixins: [vueNotifyMixin],
    components: {
      'progress-button': ProgressButton
    },
    data(){
      return {
        selectedLO:"LO auswählen",
        libriOrdinarii,
        loBtnClickBlockDuration: 2000,
        steps: [
          {
            target: '#v-step-100',  // We're using document.querySelector() under the hood
            content: `Im <strong>LO-Werkzeug</strong>werden anzuzeigende LOs ausgewählt und dann...`,
            offset:document.documentElement.scrollTop-150,
            duration:100,
            params: {
              placement: 'bottom'
            }
          },
          {
            target: '#v-step-101',  // We're using document.querySelector() under the hood
            content: `... via click hier eine <strong>Nlp Karte</strong> hinzugefügt.`,
            offset:document.documentElement.scrollTop-150,
            duration:100,
            params: {
              placement: 'bottom'
            }
          },
          {
            target: '#v-step-102',  // We're using document.querySelector() under the hood
            content: `An dieser Stelle kann das Tool <strong>vergrößert bzw. verkleinert</strong>  werden.`,
            offset:document.documentElement.scrollTop-150,
            duration:100,
            params: {
              placement: 'bottom'
            }
          }
        ]
      }
    },
    methods: {
      createCard(LO){
        if(loBtnClickBlocker)return;
        for (let lo of this.libriOrdinarii) {
          if(lo.value===LO){
            loBtnClickBlocker = true;
            setTimeout(()=>{loBtnClickBlocker=false},this.loBtnClickBlockDuration)
            return EventBus.$emit('cardCreate',lo);
          }
        }
      },
      startVueTour(){
        this.$tours['topTour'].start();
      },
      maximizeApp(){
        EventBus.$emit('toggleFullscreen');
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../scss/globalVariables";

  /*Styling of container + buttons*/
  #v-step-10001 {
    padding: 0;
    margin: 2em 0 0 0;
    @include lg {margin-left: 10% !important}
    text-align: center; @include lg {text-align: initial !important;}
    border-bottom: .25em solid $blankColor; @include lg {border-bottom: initial !important;}
    .form-inline {
      display: block; @include lg { display: flex !important;}
      max-width: 60%; @include lg {max-width: initial !important;}
      margin: 0 auto 2em; @include lg {margin: initial !important;}
      padding: 1em 3em 2em; @include lg {padding: initial !important; padding-bottom: .75em !important;}
      border-radius: .5em; @include lg {border-radius: initial !important;}
      border: .1em solid $iconColor; @include lg {border: initial}
      div, button {
        margin-top: 1.5em;
        @include lg {margin-top: initial !important; margin-left: 1em !important;}
      }
      .btn {background-color: $fourthColor}
    }

  }

  #cardBuilder_tourButton {
    color: lightgrey;
  }

  #v-step-10001 .cantusNlp_iconHolder i {
    font-size: 2em; @include sm {font-size: 1.5em !important;}
  }

  /*Styling for vue tours*/
  #v-step-10001 .v-step {
    z-index: 9999;
    background-color: $secondaryColor;    /*https://color.adobe.com/de/create/color-wheel/?base=2&rule=Compound&selected=3&name=Mein%20Color-Thema&mode=rgb&rgbvalues=0,0,0.5450980392156862,0.24,0.24000000000008187,0.6,0,0.526315789473756,1,1,0.6145833333331439,0.25,0.8,0.32499999999987267,0.07999999999999999&swatchOrder=0,1,2,3,4*/
    color: lightgrey;
    button {color: lightgrey}
    button:hover {background-color: $fifthColor}
  }

  /*Animations for vue tours*/
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

</style>
