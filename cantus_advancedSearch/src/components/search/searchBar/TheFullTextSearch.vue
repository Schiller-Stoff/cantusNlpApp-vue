<template>
  <div>
    <h4>Erweiterte Volltextsuche</h4>
    <br>

    <app-full-text-input
      v-model="searchText"
    ></app-full-text-input>
    <hr>
    <br>
    <br>
    <h5>Sucheinschränkungen</h5>
    <hr>
    <app-time-frame-or-feast-select
      v-model="chosenTimeFrame"
      :searchFieldsShown="false"
      @searchFieldToggled="timeFrameSearchActive = $event"
    ></app-time-frame-or-feast-select>

    <div>
      <br>
      <app-horae-select
        v-model="chosenHora"
        :search-toggable="true"
        @searchFieldToggled="horaeSearchActive = $event"
      ></app-horae-select>
    </div>

    <br>
    <p>FullTextUrl:</p>
    <p>{{fullTextUrl}}</p>

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
        urlStart:`https://gams.uni-graz.at/archive/objects/`,

        searchText:'',
        chosenTimeFrame:{
          text:'',
          value:''
        },
        chosenHora:'',

        horaeSearchActive:false,
        timeFrameSearchActive:false,

        queryObjects: {
          onlyTimeFrame:'query:cantus.ONLY_TIMEFRAME',
          onlyHorae:'query:cantus.ONLY_HORAE',
          timeFrameAndHorae:'query:cantus.TIMEFRAME_AND_HORAE',
          standardFullText:'query:cantus.fulltext'
        }


      }
    },
    computed: {
      fullTextUrl(){
        if(this.timeFrameSearchActive && !this.horaeSearchActive){
          let queryStart = `${this.urlStart + this.queryObjects.onlyTimeFrame}/methods/sdef:Query/get?params=`
          let params = `$4|${this.chosenTimeFrame.value};$5|${this.searchText.toLowerCase()}`
          return queryStart + encodeURIC(params)

        }

        if(this.timeFrameSearchActive && this.horaeSearchActive){
          let queryStart = `${this.urlStart + this.queryObjects.timeFrameAndHorae}/methods/sdef:Query/get?params=`
          let params = `$3|${this.chosenHora};$4|${this.chosenTimeFrame.value};$5|${this.searchText.toLowerCase()}`
          return queryStart + encodeURI(params)
        }

        if(!this.timeFrameSearchActive && this.horaeSearchActive){
          let queryStart = `${this.urlStart + this.queryObjects.onlyHorae}/methods/sdef:Query/get?params=`
          let params = `$3|${this.chosenHora};$5|${this.searchText.toLowerCase()}`
          return queryStart + encodeURI(params)

        }


        if(!this.timeFrameSearchActive && !this.horaeSearchActive){
          let queryStart = `${this.urlStart + this.queryObjects.standardFullText}/methods/sdef:Query/get?params=`
          let params = `$5|${this.searchText.toLowerCase()}`
          return queryStart + encodeURIComponent(params)
        }

      }
    },
    methods:{

    }
  }
</script>

<style scoped>

</style>
