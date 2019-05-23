<template>
  <app-v-toggable-search-bar
    :options="horae"
    :searchToggable="searchToggable"
    :searchButton="{textActive:'Horae',textInActive:'Horae einschränken'}"
    v-model="value"
    @input="vModelEmit(value)"
    @searchFieldToggled="emitSearchFieldShownStatus($event)"
  ></app-v-toggable-search-bar>
</template>

<script>

  import {horae} from "../../../../data/Horae";
  import VToggableSearchBar from './VToggableSearchBar'

  export default {
    name: "VHoraeSelect",
    components: {
      appVToggableSearchBar:VToggableSearchBar
    },
    props:{
      searchToggable:{
        default:false
      }
    },
    data(){
      return {
        value:'',
        horae
      }
    },
    methods:{
      vModelEmit(val){
        this.$emit('input',val.value)
      },
      emitSearchFieldShownStatus(value){
        this.$emit('searchFieldToggled', value)
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
