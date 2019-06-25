<template>
  <app-v-toggable-search-bar
    :options="[{text:'',value:''}]"
    :searchButton="{textActive:'Fest',textInActive:'Fest einschränken'}"
    :toggleOption="{mode:'normal',inputType:'select'}"
    v-model="selectedValue"
    :showInputMarker="showInputMarker"
    :storageKey="'timeFeastSelect'"
  >
    <app-model-select slot="optional"
      v-if="true"
      :options="autoCompleteOptions"
      v-model="selectedValue"
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
      showInputMarker:{
        type:Boolean,
        default:true
      }
    },
    data(){
      return {
        autoCompleteOptions:autocompleteVals
      }
    },
    computed: {
      selectedValue: {
        get() {
          return this.value;
        },
        set(v) {
          this.$emit('input', v)
        }
      }
    }
  }
</script>

<style scoped>

</style>
