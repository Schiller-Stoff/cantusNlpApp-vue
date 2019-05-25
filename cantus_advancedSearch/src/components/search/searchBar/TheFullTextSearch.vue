<template>
  <div>

    <div class="TheFullTextSearch_searchContstraintsContainer">
    <h4>Erweiterte Volltextsuche</h4>
      <br>
      <p>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam.
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
      </p>
      <br>



      <app-full-text-input
        v-model="searchText"
        class="TheFullTextSearch_inputs"
      ></app-full-text-input>
      <br>
      <br>

      <app-time-frame-or-feast-select
        v-model="chosenTimeFrame"
        :searchFieldsShown="false"
        @searchFieldToggled="timeFrameSearchActive = $event"
        class="TheFullTextSearch_inputs"
      ></app-time-frame-or-feast-select>

      <div>
        <br>
        <app-horae-select
          v-model="chosenHora"
          :search-toggable="true"
          :toggleOptions="{mode:'top'}"
          @searchFieldToggled="horaeSearchActive = $event"
          class="TheFullTextSearch_inputs"
        ></app-horae-select>
      </div>

      <br>
      <br>
      <!--<p>FullTextUrl:</p>
      <p>{{fullTextUrl}}</p>-->
      <button class="btn btn-secondary" @click="navigateToQuery">Suche Starten</button>
      <br>
      <br>
      <hr>
    </div>
  </div>
</template>

<script>
  //TODO add incipit query etc.
  //TODO think about: better to let user add further fields???? --> might be much easier to implement!
  // -> because then -> as field is added the query will behave differently!

  import VTimeFrameSelect from './dropdowns/VTimeFrameSelect'
  import VHoraeSelect from './dropdowns/VHoraeSelect'
  import VTimeFrameOrFeastSelect from './dropdowns/VTimeFrameOrFeastSelect'
  import VFullTextInput from './dropdowns/VFullTextInput'

  export default {
    name: "TheFullTextSearch",
    components: {
      appVTimeFrameSelect:VTimeFrameSelect,
      appHoraeSelect:VHoraeSelect,
      appTimeFrameOrFeastSelect: VTimeFrameOrFeastSelect,
      appFullTextInput: VFullTextInput
    },
    data(){
      return {
        urlStart:`https://glossa.uni-graz.at/archive/objects/`,

        searchText:'',
        chosenTimeFrame:{
          text:'',
          value:''
        },
        chosenHora:{text:'',value:''},

        horaeSearchActive:false,
        timeFrameSearchActive:false,

        queryObjects: {
          onlyTimeFrame:'query:cantus.fulladv-feast',
          onlyHorae:'query:cantus.fulladv-hora',
          timeFrameAndHorae:'query:cantus.fulladv-hf',
          standardFullText:'query:cantus.phrase'
        }


      }
    },
    computed: {
      fullTextUrl(){
        if(this.timeFrameSearchActive && !this.horaeSearchActive){
          let queryStart = `${this.urlStart + this.queryObjects.onlyTimeFrame}/methods/sdef:Query/get?params=`
          let params = `$4|${this.chosenTimeFrame.value};$5|${this.searchText.toLowerCase()}`
          return queryStart + encodeURIComponent(params)

        }

        if(this.timeFrameSearchActive && this.horaeSearchActive){
          let queryStart = `${this.urlStart + this.queryObjects.timeFrameAndHorae}/methods/sdef:Query/get?params=`
          let params = `$3|${this.chosenHora.value};$4|${this.chosenTimeFrame.value};$5|${this.searchText.toLowerCase()}`
          return queryStart + encodeURIComponent(params)
        }

        if(!this.timeFrameSearchActive && this.horaeSearchActive){
          let queryStart = `${this.urlStart + this.queryObjects.onlyHorae}/methods/sdef:Query/get?params=`
          let params = `$3|${this.chosenHora.value};$5|${this.searchText.toLowerCase()}`
          return queryStart + encodeURIComponent(params)

        }


        if(!this.timeFrameSearchActive && !this.horaeSearchActive){
          let queryStart = `${this.urlStart + this.queryObjects.standardFullText}/methods/sdef:Query/get?params=`
          let params = `$5|${this.searchText.toLowerCase()}`
          return queryStart + encodeURIComponent(params)
        }

      }
    },
    methods:{
      navigateToQuery(){
        //window.location.href=this.fullTextUrl
        if(this.searchText==='')return window.alert('Bitte geben Sie einen Suchtext im Feld "Volltextsuche" an.')
        return window.open( this.fullTextUrl)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../scss/globalVariables/globalVariables";

  .TheFullTextSearch_searchContstraintsContainer {
    /*padding:4em 2em 2em 2em;*/
    /*border: lightgrey solid .15em;*/
    margin:1em;
    border-radius: .25em;
    background-color: $primaryColor;
  }

  h4 {
    text-decoration: underline;
  }

  hr {
    border: none;
    padding:.25em;
    background-color: lightgrey;
    border-radius: 5em;
  }

  .TheFullTextSearch_inputs {
    width:65%;
  }

  p {
    text-align: justify;
  }

</style>
