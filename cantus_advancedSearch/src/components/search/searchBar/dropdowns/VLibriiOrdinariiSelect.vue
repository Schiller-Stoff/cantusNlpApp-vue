<template>
  <div>
    <app-v-toggable-search-bar
      v-model="chosenLiberOrdinarius"
      :searchButton="{textActive:'LO', textInActive:'LO einschränken'}"
      :options="libriOrdinarii"
      :searchToggable="searchToggable"
      @input="vModelEmit(chosenLiberOrdinarius)"
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
      value:{
        default(){
          return {text:'', value:''}
        }
      },
      searchToggable:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return {
        libriOrdinarii,
        chosenLiberOrdinarius:this.value

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
