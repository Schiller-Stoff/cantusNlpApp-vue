<template>
  <div class="container-fluid TheIncipitSearch_mainContainer">
    <h4>Erweiterte Incipitsuche</h4>
    <br>
    <p>
      Mit Hilfe der Erweiterten Incipitsuche können Incipits in den Cantus Texten nach den vordefinierten Sucheinschränkungen
      gesucht werden.
    </p>
    <p></p>
    <p>Alle Auswahlfelder sind verpflichtend für die Suche anzugeben.</p>
    <p>Im Gegensatz zu den anderen Suchmodi wird das Ergebnis direkt in der Spalte auf der rechten Seite visualisiert. Rechts oben
    kann zwischen verschiedenen Ansichten umgeschalten werden. Es steht eine quantitative Veranschaulichung der gefundenen Incipits einerseits
    in Form einer Tabelle, andererseits in Form eines Balken- und Liniendiagrammes zur Verfügung. </p>

    <p>Das Ergebnis versteht sich als Visualisierung des Suchverlauf. Weitere Sucheingaben führen zu einem "weiteren Aufbau" der Tabelle bzw. Visualisierungen.</p>
    <br>

    <app-v-librii-ordinarii-select
      class="TheIncipitSearch_input"
      v-model="chosenLO"
    ></app-v-librii-ordinarii-select>
    <br>

    <app-v-time-frame-or-feast-select
      :toggleOptions="{toggable:false}"
      v-model="objectItem"
      class="TheIncipitSearch_input"
    ></app-v-time-frame-or-feast-select>
    <br>


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

    <app-v-search-button
      :buttonEnabled="allowSearch"
      :text="'Suche Starten'"
      @click="initSearch"
    ></app-v-search-button>
    <br>

    <br>
    <br>
    <br>
    <hr>
  </div>

</template>

<script>
  import {autocompleteVals} from "../../../data/autocompleteVals"
  import VLibriiOrdinariiSelect from "./dropdowns/VLibriiOrdinariiSelect"
  import VTimeFrameSelect from './dropdowns/VTimeFrameSelect'
  import VHoraeSelect from './dropdowns/VHoraeSelect'
  import VGenreSelect from './dropdowns/VGenreSelect'
  import VSearchButton from './buttons/VSearchButton'
  import VTimeFrameOrFeastSelect from './dropdowns/VTimeFrameOrFeastSelect'

  export default {
    name: "TheIncipitSearch",
    components: {
      appVLibriiOrdinariiSelect: VLibriiOrdinariiSelect,
      appVTimeFrameSelect: VTimeFrameSelect,
      appVHoraeSelect:VHoraeSelect,
      appVGenreSelect:VGenreSelect,
      appVSearchButton: VSearchButton,
      appVTimeFrameOrFeastSelect:VTimeFrameOrFeastSelect
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
      },
      searchButtonColor(){
        if(this.chosenLO.value==='' || this.chosenGenre.value==='' || this.chosenHora.value==='' || this.objectItem.value===''){
          return 'btn-warning'
        } else {
          return 'btn-success '
        }
      },
      allowSearch(){
        return !(this.chosenLO.value==='' || this.chosenGenre.value==='' || this.chosenHora.value==='' || this.objectItem.value==='')
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

  button {
    color:black;
  }

</style>
