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
        timeFrameSearchActive:false


      }
    },
    computed: {
      fullTextUrl(){
        if(this.timeFrameSearchActive && !this.horaeSearchActive){
          let queryObject = 'query.cantus.FULLTEXT_ONLY_TIMEFRAME'

          let queryStart = `${this.urlStart + queryObject}/methods/sdef:Query/get?params=`
          let params = `$4|${this.chosenTimeFrame.value};$5|${this.searchText}`

          let url = queryStart + encodeURI(params)
          //return url

          return 'ONLY TIMEFRAME'

        }

        if(this.timeFrameSearchActive && this.horaeSearchActive){
          return 'TIMEFRAME AND HORAESAERCH'
        }

        if(!this.timeFrameSearchActive && this.horaeSearchActive){
          return 'ONLY HORAE'

        }


        if(!this.timeFrameSearchActive && !this.horaeSearchActive){
          return 'NORMAL FULLTEXTSEARCH'
        }


        let buildQuery = `${this.urlStart}`

      }
    },
    methods:{

    }
  }
</script>

<style scoped>

</style>
