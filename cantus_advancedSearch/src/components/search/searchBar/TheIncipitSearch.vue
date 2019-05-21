<template>
  <div class="container-fluid">
    <h4>Incipit Suche</h4>

    <app-v-librii-ordinarii-select v-model="chosenLO"></app-v-librii-ordinarii-select>

    <br>

    <div>
      <p>Wählen Sie einen <em>Zeitraum</em> oder ein...</p>
    </div>

    <app-v-time-frame-select v-model="objectItem"></app-v-time-frame-select>


    <div>
      <p>...<em>einzelnes Fest</em>.</p>
      <app-model-select :options="autoCompleteOptions" v-model="objectItem"></app-model-select>
      <br>
    </div>


    <app-v-horae-select v-model="chosenHora"></app-v-horae-select>

    <br>

    <app-v-genre-select v-model="chosenGenre"></app-v-genre-select>

    <br>

    <button
      class="btn btn-primary" @click="initSearch">Suche starten
    </button>


    <br>

    <br>
    <br>
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
        chosenLO:'o:cantus.passau.ur',
        chosenGenre:'RP',
        chosenHora:'M',

        // inside here are objectItem.text = chosenTimeFrameName AND objectItem.value = chosenTimeFrameNumber!!
        // necessary because of plugin
        objectItem:{
          text:'weihnachten',
          value:'"02122400" "02122500" "02122600" "02122700" "02122800" "05010600"'
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
          chosenTimeFrameName:this.objectItem.text,
          chosenTimeFrameNumber:this.objectItem.value
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
        this.$emit('startIncipitSearch')
      }
    }
  }
</script>

<style scoped>

</style>
