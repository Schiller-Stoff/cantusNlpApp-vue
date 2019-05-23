<template>
  <div class="container-fluid TheFullTextIncipitSearch_mainContainer">
    <h4>Erweiterte Volltextsuche (incipit)</h4>
    <br>
    <p>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam.
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
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

    <button
      class="btn btn-secondary" @click="navigateToQuery()">Suche starten
    </button>

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

  export default {
    name: "TheFullTextIncipitSearch",
    components: {
      appVTimeFrameOrFeastSelect: VTimeFrameOrFeastSelect,
      appVHoraeSelect: VHoraeSelect,
      appFullTextInput: VFullTextInput,
      appVGenreSelect:VGenreSelect
    },
    data(){
      return {
        searchText:'',
        chosenTimeFrame:{
          text:'',
          value:''
        },
        chosenHora:'',
        chosenGenre:{text:'',value:''},
        timeFrameSearchActive:false,
        horaeSearchActive:false,
        queryObjects: {
          onlyTimeFrame:'query:cantus.ONLY_TIMEFRAME',
          onlyHorae:'query:cantus.ONLY_HORAE',
          timeFrameAndHorae:'query:cantus.TIMEFRAME_AND_HORAE',
          standardFullText:'query:cantus.ONLY_GENRE'
        }
      }
    },
    computed:{
      fullTextIncipitUrl(){

        if(this.timeFrameSearchActive && !this.horaeSearchActive){
          let queryStart = `${this.urlStart + this.queryObjects.onlyTimeFrame}/methods/sdef:Query/get?params=`
          let params = `$2|${this.chosenGenre.value};$4|${this.chosenTimeFrame.value};$5|${this.searchText.toLowerCase()}`
          return queryStart + encodeURIComponent(params)

        }

        if(this.timeFrameSearchActive && this.horaeSearchActive){
          let queryStart = `${this.urlStart + this.queryObjects.timeFrameAndHorae}/methods/sdef:Query/get?params=`
          let params = `$2|${this.chosenGenre.value};$3|${this.chosenHora};$4|${this.chosenTimeFrame.value};$5|${this.searchText.toLowerCase()}`
          return queryStart + encodeURIComponent(params)
        }

        if(!this.timeFrameSearchActive && this.horaeSearchActive){
          let queryStart = `${this.urlStart + this.queryObjects.onlyHorae}/methods/sdef:Query/get?params=`
          let params = `$2|${this.chosenGenre.value};$3|${this.chosenHora};$5|${this.searchText.toLowerCase()}`
          return queryStart + encodeURIComponent(params)

        }


        if(!this.timeFrameSearchActive && !this.horaeSearchActive){
          let queryStart = `${this.urlStart + this.queryObjects.standardFullText}/methods/sdef:Query/get?params=`
          let params = `$2|${this.chosenGenre.value};$5|${this.searchText.toLowerCase()}`
          return queryStart + encodeURIComponent(params)
        }

      }
    },
    methods: {
      navigateToQuery(){
        //window.location.href=this.fullTextUrl
        if(this.searchText==='' ||this.chosenGenre.value==='')return window.alert('Bitte geben Sie einen Suchtext im Feld "Volltextsuche" an UND wählen Sie ein Genre.')
        return window.open( this.fullTextIncipitUrl)
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

</style>
