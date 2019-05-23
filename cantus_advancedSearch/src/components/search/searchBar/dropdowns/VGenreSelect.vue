<template>
  <div>
    <app-v-toggable-search-bar
      v-model="value"
      :options="genres"
      :searchButton="{textActive:'Genre', textInActive:'Genre'}"
      :searchToggable="searchToggable"
      @input="vModelEmit(value.value)"
      @searchFieldToggled="emitSearchFieldShownStatus($event)"

    ></app-v-toggable-search-bar>
  </div>
</template>

<script>

  import {genres} from "../../../../data/genres";
  import VToggableSearchBar from './VToggableSearchBar'

  export default {
    name: "VGenreSelect",
    components: {
      appVToggableSearchBar:VToggableSearchBar
    },
    props: {
      searchToggable:{
        default:false,
        type:Boolean
      }
    },
    data(){
      return {
        value:'',
        genres
      }
    },
    methods: {
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
