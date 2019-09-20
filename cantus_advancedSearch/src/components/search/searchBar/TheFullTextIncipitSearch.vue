<template>
  <div class="container-fluid TheFullTextIncipitSearch_mainContainer">
    <h4>Erweiterte Volltextsuche (Incipit)</h4>
    <br>
    <p>
      Die Erweiterte Volltextsuche auf Basis von Incipits erlaubt eine zusätzliche Einschränkung auf Genres.
      Dabei muss für den "minimalen Suchvorgang" zumindest ein Buchstabe im Volltextsuchfeld eingetragen und ein Genre
      gewählt worden sein. (Der Suchknopf wechselt seine Farbe zu Grün sobald eine gültige Sucheingabe erreicht worden ist)
    </p>
    <p>
      Die Einschränkung auf Zeitraum und Horaen sind optional und können jederzeit hinzu- oder abgeschalten werden.

    </p>
    <br>

    <app-full-text-input
      v-model="searchText"
      class="TheFullTextIncipitSearch_input"
    ></app-full-text-input>

    <br>

    <app-v-time-frame-or-feast-select
      v-model="chosenTimeFrame"
      :searchFieldsShown="false"
      class="TheFullTextIncipitSearch_input"
      @searchFieldToggled="timeFrameSearchActive = $event"
    ></app-v-time-frame-or-feast-select>

    <br>

    <app-v-horae-select
      v-model="chosenHora"
      :searchToggable="true"
      :toggleOptions="{mode:'top'}"
      class="TheFullTextIncipitSearch_input"
      @searchFieldToggled="horaeSearchActive = $event"
    ></app-v-horae-select>

    <br>

    <app-v-genre-select
      v-model="chosenGenre"
      class="TheFullTextIncipitSearch_input"
    ></app-v-genre-select>

    <br>
    <br>

    <app-v-search-button
      :buttonEnabled="allowSearch"
      :text="'Suche Starten'"
      @click="navigateToQuery"
    ></app-v-search-button>

    <br>
    <br>
    <hr>
  </div>
</template>

<script>

  import VTimeFrameOrFeastSelect from './dropdowns/VTimeFrameOrFeastSelect'
  import VHoraeSelect from './dropdowns/VHoraeSelect'
  import VFullTextInput from './dropdowns/VFullTextInput'
  import VGenreSelect from './dropdowns/VGenreSelect'
  import VSearchButton from './buttons/VSearchButton'

  export default {
    name: "TheFullTextIncipitSearch",
    components: {
      appVTimeFrameOrFeastSelect: VTimeFrameOrFeastSelect,
      appVHoraeSelect: VHoraeSelect,
      appFullTextInput: VFullTextInput,
      appVGenreSelect:VGenreSelect,
      appVSearchButton:VSearchButton
    },
    data(){
      return {
        urlStart:`https://gams.uni-graz.at/archive/objects/`,

        searchText:{text:'',value:''},
        chosenTimeFrame:{
          text:'',
          value:''
        },
        chosenHora:{text:'',value:''},
        chosenGenre:{text:'',value:''},
        timeFrameSearchActive:false,
        horaeSearchActive:false,
        queryObjects: {
          onlyTimeFrame:'query:cantus.incadv-genrefeast',
          onlyHorae:'query:cantus.incadv-genrehora',
          timeFrameAndHorae:'query:cantus.incadv-genrehf',
          standardFullText:'query:cantus.incadv-genreonly'
        }
      }
    },
    computed:{
      fullTextIncipitUrl(){

        if(this.timeFrameSearchActive && !this.horaeSearchActive){
          let queryStart = `${this.urlStart + this.queryObjects.onlyTimeFrame}/methods/sdef:Query/get?params=`
          let params = `$2|${this.chosenGenre.value};$4|${this.chosenTimeFrame.value};$5|${this.searchText.value.toLowerCase()};$6|${this.chosenTimeFrame.text};$8|${this.chosenGenre.text}`
          return queryStart + encodeURIComponent(params)

        }

        if(this.timeFrameSearchActive && this.horaeSearchActive){
          let queryStart = `${this.urlStart + this.queryObjects.timeFrameAndHorae}/methods/sdef:Query/get?params=`
          let params = `$2|${this.chosenGenre.value};$3|${this.chosenHora.value};$4|${this.chosenTimeFrame.value};$5|${this.searchText.value.toLowerCase()};$6|${this.chosenTimeFrame.text};$7|${this.chosenHora.text};$8|${this.chosenGenre.text}`
          return queryStart + encodeURIComponent(params)
        }

        if(!this.timeFrameSearchActive && this.horaeSearchActive){
          let queryStart = `${this.urlStart + this.queryObjects.onlyHorae}/methods/sdef:Query/get?params=`
          let params = `$2|${this.chosenGenre.value};$3|${this.chosenHora.value};$5|${this.searchText.value.toLowerCase()};$7|${this.chosenHora.text};$8|${this.chosenGenre.text}`
          return queryStart + encodeURIComponent(params)

        }


        if(!this.timeFrameSearchActive && !this.horaeSearchActive){
          let queryStart = `${this.urlStart + this.queryObjects.standardFullText}/methods/sdef:Query/get?params=`
          let params = `$2|${this.chosenGenre.value};$5|${this.searchText.value.toLowerCase()};$8|${this.chosenGenre.text}`
          return queryStart + encodeURIComponent(params)
        }

      },
      allowSearch(){
        return !(this.searchText.value==='' ||this.chosenGenre.value==='')
      }
    },
    methods: {
      navigateToQuery(){
        if(this.searchText.value==='' ||this.chosenGenre.value==='')return window.alert('Bitte geben Sie einen Suchtext im Feld "Volltextsuche" an UND wählen Sie ein Genre.')
        this.$store.dispatch('incipit_markOngoingSearchAction', true)
        return window.location = this.fullTextIncipitUrl

        //return window.open( this.fullTextIncipitUrl)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../scss/globalVariables/globalVariables";

  .TheFullTextIncipitSearch_input {
    width:65% !important;
  }


  .TheFullTextIncipitSearch_mainContainer {
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
  }

  button {
    color:black;
  }

</style>
