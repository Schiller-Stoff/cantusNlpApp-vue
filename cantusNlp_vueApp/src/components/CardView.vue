<template>
  <div id="cardView_container">
    <div>
      <div @click="notify('Intro Ansichtsleiste'), startVueTour()" class="cantusNlp_iconHolder" data-balloon="Intro Ansichtsleiste" data-balloon-pos="up"><i class="fas fa-info-circle"></i></div>
    </div>
    <hr>
    <div>
      <div @click="notify('Ansichten vergrößert');resizeAllCards('100%', '100vh');markActive($event,'right')" id="v-step-1000" class="cantusNlp_iconHolder" data-balloon="Ansichten vergrößern" data-balloon-pos="up"><i class="fas fa-th-large"></i></div>
    </div>
    <div>
      <div @click="notify('Ansichten verkleinert'); resizeAllCards('400px', '600px');markActive($event,'right')" id="v-step-1001" class="cantusNlp_iconHolder" data-balloon="Ansichten verkleinern" data-balloon-pos="up"><i class="fas fa-th"></i></div>
    </div>
    <hr>
    <div>
      <div @click="notify('Springe zu Gesamtkorpus...'); openInNewTab(corpora[0].voy_corpus)" id="v-step-1002" class="cantusNlp_iconHolder" data-balloon="Originaler Gesamtkorpus" data-balloon-pos="up"><i class="fab fa-adn"></i></div>
    </div>
    <div>
      <div @click="notify('Springe zu lemmatisierten Gesamtkorpus...'); openInNewTab(corpora[0].voy_lemma)" id="v-step-1003" class="cantusNlp_iconHolder" data-balloon="Lemmatisierter Gesamtkorpus" data-balloon-pos="up"><i class="fab fa-vaadin"></i></div>
  </div>
    <v-tour name="cardViewTour" :steps="steps">
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
  import {EventBus} from "../main";
  import {vueNotifyMixin} from "../mixins/vueNotifyMixin";
  import {iconMethodsMixin} from "../mixins/iconMethodsMixin";
  export default {
    name: "CardView",
    props: ["corpora"],
    mixins: [vueNotifyMixin, iconMethodsMixin],
    data(){
      return {
        steps: [
          {
            target: '#v-step-1000',  // We're using document.querySelector() under the hood
            content: `Im <strong>Ansicht-Vergrößerungswerkzeug</strong>werden alle Karten auf eine größere Ansicht geschalten...`,
            params: {
              placement: 'left'
            }
          },
          {
            target: '#v-step-1001',  // We're using document.querySelector() under the hood
            content: `... und via click hier wieder <strong>verkleinert</strong>.`,
            params: {
              placement: 'left'
            }
          },
          {
            target: '#v-step-1002',  // We're using document.querySelector() under the hood
            content: `An dieser Stelle kann zur <strong>Gesamt-Korpus Ansicht in den Voyant Tools gewechselt</strong> werden.`,
            params: {
              placement: 'left'
            }
          },
          {
            target: '#v-step-1003',  // We're using document.querySelector() under the hood
            content: `...und hier selbiges für die <strong>Lemmata-Korpus Ansicht</strong>.`,
            params: {
              placement: 'left'
            }
          }
        ]
      }
    },
    methods:{
      resizeAllCards(minWidth, minHeight){
        let cssSizeObj= {
          "min-width": minWidth,
          "height": minHeight
        }
        EventBus.$emit('resizeCards',cssSizeObj);
      },
      startVueTour(){
        this.$tours['cardViewTour'].start();
      },
      openInNewTab(url){
        let win = window.open(url,'_blank');
        win.focus();
      }
    }
  }
</script>

<style scoped lang="scss">
@import "../scss/globalVariables";

  #cardView_container {
    margin-top: 2em; @include lg {margin-top: 35vh}
    margin-bottom: 2em; @include lg {margin-bottom: 0}
    hr {
      color: $blankColor;
      border: .05em $blankColor solid;
      width: 3em;
    }
    .fa-adn {transform: rotate(180deg)}
    .cantusNlp_iconHolder {margin-top: 1em}
  }

  /*Styling for the vue tours*/
  #cardView_container .v-step {
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
