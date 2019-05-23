<template>
  <div class="container-fluid TheIncipitSearch_mainContainer">
    <h4>Erweiterte Incipit Suche</h4>
    <br>
    <p>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam.
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
    </p>
    <br>

    <app-v-librii-ordinarii-select
      class="TheIncipitSearch_input"
      v-model="chosenLO"
    ></app-v-librii-ordinarii-select>

    <br>

    <div>
      <p>Wählen Sie einen <em>Zeitraum</em> oder ein...</p>
    </div>

    <app-v-time-frame-select
      v-model="objectItem"
      class="TheIncipitSearch_input"
    ></app-v-time-frame-select>


    <div>
      <br>
      <p>...<em>einzelnes Fest</em>.</p>
      <app-model-select
        :options="autoCompleteOptions"
        v-model="objectItem"
        class="TheIncipitSearch_input"
      ></app-model-select>
      <br>
    </div>


    <app-v-horae-select
      v-model="chosenHora"
      class="TheIncipitSearch_input"
    ></app-v-horae-select>

    <br>

    <app-v-genre-select
      v-model="chosenGenre"
      class="TheIncipitSearch_input"
    ></app-v-genre-select>

    <br>

    <button
      class="btn btn-secondary" @click="initSearch">Suche starten
    </button>


    <br>
    <br>
    <br>
    <br>
    <hr>
  </div>

</template>

<script>
  import { ModelSelect } from 'vue-search-select'
  import {autocompleteVals} from "../../../data/autocompleteVals"
  import VLibriiOrdinariiSelect from "./dropdowns/VLibriiOrdinariiSelect"
  import VTimeFrameSelect from './dropdowns/VTimeFrameSelect'
  import VHoraeSelect from './dropdowns/VHoraeSelect'
  import VGenreSelect from './dropdowns/VGenreSelect'

  export default {
    name: "TheIncipitSearch",
    components: {
      appModelSelect: ModelSelect,
      appVLibriiOrdinariiSelect: VLibriiOrdinariiSelect,
      appVTimeFrameSelect: VTimeFrameSelect,
      appVHoraeSelect:VHoraeSelect,
      appVGenreSelect:VGenreSelect
    },
    data(){
      return {
        chosenLO:{
          text:'',
          value:''
        },
        chosenGenre:{text:'',value:''},
        chosenHora:{text:'',value:''},

        // inside here are objectItem.text = chosenTimeFrameName AND objectItem.value = chosenTimeFrameNumber!!
        // necessary because of plugin
        objectItem:{
          text:'',
          value:''
        },
        autoCompleteOptions:autocompleteVals
      }
    },
    computed: {
      incipitSearchParams(){
        return {
          chosenLO: this.chosenLO,
          chosenGenre: this.chosenGenre,
          chosenHora: this.chosenHora,
          chosenTimeFrame:{
            text:this.objectItem.text,
            value:this.objectItem.value
          }
        }
      }
    },
    watch: {
      incipitSearchParams(){
        this.$emit('incipitParamsUpdated',this.incipitSearchParams)
      }
    },
    methods: {
      initSearch(){
        if(this.chosenLO.value==='' || this.chosenGenre.value==='' || this.chosenHora.value==='' || this.objectItem.value==='')return window.alert('Alle Eingabefelder müssen für die Suche gefüllt sein.')
        this.$emit('startIncipitSearch')
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../scss/globalVariables/globalVariables";

  .TheIncipitSearch_input {
    width:65% !important;
  }


  .TheIncipitSearch_mainContainer {
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
