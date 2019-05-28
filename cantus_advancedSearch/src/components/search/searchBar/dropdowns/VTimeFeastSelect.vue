<template>
  <app-v-toggable-search-bar
    :options="[{text:'',value:''}]"
    :searchButton="{textActive:'Fest',textInActive:'Fest einschränken'}"
    :toggleOption="{mode:'normal',inputType:'select'}"
    v-model="chosenTimeFrame"
    :clearSelectField="clearSelectField"
  >
    <app-model-select slot="optional"
      v-if="true"
      @input="$emit('input',chosenTimeFrame)"
      :options="autoCompleteOptions"
      v-model="chosenTimeFrame"
    ></app-model-select>
  </app-v-toggable-search-bar>
</template>

<script>
  import { ModelSelect } from 'vue-search-select'
  import VToggableSearchBar from './VToggableSearchBar'
  import {autocompleteVals} from "../../../../data/autocompleteVals"
  export default {
    name: "VTimeFeastSelect",
    components: {
      appModelSelect: ModelSelect,
      appVToggableSearchBar: VToggableSearchBar
    },
    props:{
      value:{
        default(){
          return {text:'',value:''}
        }
      },
      clearSelectField: {
        type:Boolean
      }
    },
    data(){
      return {
        autoCompleteOptions:autocompleteVals,
        chosenTimeFrame:this.value
      }
    }
  }
</script>

<style scoped>

</style>
