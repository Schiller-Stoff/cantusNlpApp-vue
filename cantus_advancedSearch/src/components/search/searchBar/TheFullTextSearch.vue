<template>
  <div>
    <h4>Erweiterte Volltextsuche</h4>

    <p>Zeitraum</p>
    <app-v-time-frame-select
      v-model="chosenTimeFrame"
      :search-toggable="true"
      @searchFieldToggled="timeFrameSearchActive = $event"
    ></app-v-time-frame-select>

    <p>Fest</p>
    <app-model-select
      :options="autoCompleteOptions"
      v-model="chosenTimeFrame"
    ></app-model-select>

    <hr>
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

  import { ModelSelect } from 'vue-search-select'
  import VTimeFrameSelect from './dropdowns/VTimeFrameSelect'
  import VHoraeSelect from './dropdowns/VHoraeSelect'
  import {autocompleteVals} from "../../../data/autocompleteVals"

  export default {
    name: "TheFullTextSearch",
    components: {
      appVTimeFrameSelect:VTimeFrameSelect,
      appModelSelect: ModelSelect,
      appHoraeSelect:VHoraeSelect
    },
    data(){
      return {
        urlStart:`https://gams.uni-graz.at/archive/objects/`,

        autoCompleteOptions:autocompleteVals,
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
        if(this.horaeSearchActive){
          /*let queryObject = 'query.cantus.FULLTEXT_ONLY_FEAST'

          let queryStart = `${this.urlStart + queryObject}/methods/sdef:Query/get?params=`
          let params = `$4|${this.chosenTimeFrame.value}`

          let url = queryStart + encodeURI(params)
          return url*/

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
