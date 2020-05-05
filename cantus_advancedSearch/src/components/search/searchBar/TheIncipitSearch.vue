<template>
  <div class="container-fluid TheIncipitSearch_mainContainer">
    <h4>Erweiterte Incipitsuche</h4>
    <br>
    <p>
      Die Incipitsuche nach Sprech- oder Gesangstexten erlaubt eine Einschränkung auf die vordefinierten Filter. Dabei sind alle Auswahlfelder verpflichtend auszuwählen (Zeitraum oder alternativ das jeweilige Fest).
    </p>
    <p></p>
    <p>Im Gegensatz zu den anderen Suchmodi wird das Ergebnis direkt in der Spalte auf der rechten Seite visualisiert. Rechts oben kann zwischen verschiedenen Ansichten gewechselt werden. Eine quantitative Visualisierung der gefundenen Incipits steht in Form einer Tabelle sowie als Balken- und Liniendiagramm zur Verfügung.</p>
    <p>Weitere Suchanfragen werden als Verlauf dokumentiert und können so synoptisch betrachtet werden.</p>
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


    <button class="btn btn-secondary" @click="clearIncipitResults">Suchergebnisse löschen</button>
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
      },
      clearIncipitResults(){
        this.$store.dispatch('incipit_clearAllAction')
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

    em {
      text-decoration: underline;
    }
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
