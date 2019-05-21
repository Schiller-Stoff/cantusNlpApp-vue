<template>
  <div>
    <h4>Erweiterte Volltextsuche</h4>

    <p>Zeitraum</p>
    <app-v-time-frame-select v-model="chosenTimeFrame"></app-v-time-frame-select>

    <p>Fest</p>
    <app-model-select :options="autoCompleteOptions" v-model="chosenTimeFrame"></app-model-select>

    <app-horae-select v-model="chosenHora"></app-horae-select>

    <p></p>

  </div>
</template>

<script>
  //TODO add incipit query etc.

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
        autoCompleteOptions:autocompleteVals,
        chosenTimeFrame:{
          text:'',
          value:''
        },
        chosenHora:''
      }
    }
  }
</script>

<style scoped>

</style>
