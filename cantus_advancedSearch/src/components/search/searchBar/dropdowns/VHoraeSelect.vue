<template>
  <app-v-toggable-search-bar
    :options="horae"
    :searchToggable="searchToggable"
    :searchButton="{textActive:'Horae',textInActive:'Horae einschränken'}"
    v-model="value"
    @input="vModelEmit(value)"
    @searchFieldToggled="emitSearchFieldShownStatus($event)"

    :toggleOptions="toggleOptions"

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
      },
      toggleOptions:{
        default(){
          return {
            mode:'normal'
          }
        },
      },
    },
    data(){
      return {
        value:'',
        horae
      }
    },
    methods:{
      vModelEmit(val){
        this.$emit('input',val)
      },
      emitSearchFieldShownStatus(value){
        this.$emit('searchFieldToggled', value)
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
