<template>
  <div>
    <app-v-toggable-search-bar
      v-model="selectedGenre"
      :options="genres"
      :searchButton="{textActive:'Genre', textInActive:'Genre'}"
      :searchToggable="searchToggable"
      :toggleOptions="toggleOptions"
      @searchFieldToggled="emitSearchFieldShownStatus($event)"

      :storageKey="'genreSelect'"

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
      value:{
        default(){ return {text:'',value:''}}
      },
      searchToggable:{
        default:false,
        type:Boolean
      },
      toggleOptions: {
        type:Object,
        default(){
          return {
            mode:'normal'
          }
        }
      }
    },
    data(){
      return {
        genres
      }
    },
    methods: {
      emitSearchFieldShownStatus(value){
        this.$emit('searchFieldToggled', value)
      }
    },
    computed:{
      selectedGenre: {
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
