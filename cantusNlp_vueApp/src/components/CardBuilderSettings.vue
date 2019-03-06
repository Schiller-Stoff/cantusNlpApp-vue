<template>
    <div id="v-step-10001" class="container">
      <form class="form-inline">
        <div id="v-step-100" class="form-group mb-2">
          <label for="LO_select" class="sr-only">LO Selection</label>
          <select id="LO_select" class="form-control form-control" v-model="selectedLO">
            <option v-for="corpus in corpora">{{ corpus.name }}</option>
          </select>
        </div>
        <!--<div class="form-group mb-2">-->
          <!--<label for="LO_view_select" class="sr-only">Email</label>-->
          <!--<select id="LO_view_select" class="form-control form-control">-->
            <!--<option>Was wäre hier sinnvoll`?</option>-->
          <!--</select>-->
        <!--</div>-->
        <button id="v-step-101" type="button" class="btn btn-primary mb-2" @click.prevent="createCard(selectedLO)">LO hinzufügen</button>
        <div id="cardBuilder_tourButton" @click="startVueTour">
          <div data-balloon="Info Werkzeuge oben" data-balloon-pos="right"><i class="fas fa-info-circle fa-2x"></i></div>
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
  import {EventBus} from "../main";
  export default {
    name: "CardBuilderSettings",
    props: ["corpora"],
    data(){
      return {
        selectedLO:"LO auswählen",
        steps: [
          {
            target: '#v-step-100',  // We're using document.querySelector() under the hood
            content: `Im <strong>LO-Werkzeug</strong>werden anzuzeigende LOs ausgewählt und dann...`,
            params: {
              placement: 'bottom'
            }
          },
          {
            target: '#v-step-101',  // We're using document.querySelector() under the hood
            content: `... via click hier zur <strong>Voyant Ansicht</strong> hinzugefügt.`,
            params: {
              placement: 'bottom'
            }
          }
        ]
      }
    },
    methods: {
      createCard(LO){
        for (let corpus of this.corpora) {
          if(corpus.name===LO){
            console.log("adding now " + LO)
            return EventBus.$emit('cardCreate',corpus);
          }
        }
      },
      startVueTour(){
        this.$tours['topTour'].start();
      }
    }

  }
</script>

<style scoped>

  #cardBuilder_tourButton {
    color: lightgrey;
    margin-left: 2em;
  }

  .container {
    margin-top: 1%;
    margin-left:7.5%;
  }

  .form-group {
    margin-right: 1.5em;
  }


  /*Styling for vue tours*/

  .v-step {
    z-index: 9999;
    background-color: #FF9D40;    /*https://color.adobe.com/de/create/color-wheel/?base=2&rule=Compound&selected=3&name=Mein%20Color-Thema&mode=rgb&rgbvalues=0,0,0.5450980392156862,0.24,0.24000000000008187,0.6,0,0.526315789473756,1,1,0.6145833333331439,0.25,0.8,0.32499999999987267,0.07999999999999999&swatchOrder=0,1,2,3,4*/
    color: black;
    /*min-width: 30em;*/
  }

  .v-step button:hover {
    /*background-color: white;*/
    border: .1em dashed #3D3D99;
  }


  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

</style>
