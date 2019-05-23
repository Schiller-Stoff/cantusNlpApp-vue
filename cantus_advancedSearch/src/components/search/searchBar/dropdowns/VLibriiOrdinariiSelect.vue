<template>
  <div>
    <app-v-toggable-search-bar
      v-model="value"
      :searchButton="{textActive:'LO', textInActive:'LO einschränken'}"
      :options="libriOrdinarii"
      :searchToggable="searchToggable"
      @input="vModelEmit(value.value)"
      @searchFieldToggled="emitSearchFieldShownStatus($event)"
    ></app-v-toggable-search-bar>
  </div>
</template>

<script>
  import {libriOrdinarii} from "../../../../data/libriOrdinarii";
  import VToggableSearchBar from './VToggableSearchBar'

  export default {
    name: "VLibriiOrdinariiSelect",
    components: {
      appVToggableSearchBar:VToggableSearchBar
    },
    props:{
      searchToggable:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return {
        libriOrdinarii,
        value:'default'
      }
    },
    methods:{
      vModelEmit(value){
        this.$emit('input',value)
      },
      emitSearchFieldShownStatus(value){
        this.$emit('searchFieldToggled', value)
      }
    }
  }
</script>

<style scoped>

</style>
