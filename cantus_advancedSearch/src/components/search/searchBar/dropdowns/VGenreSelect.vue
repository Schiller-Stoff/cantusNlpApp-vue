<template>
  <div>
    <!--<div class="input-group mb-3">
      <div class="input-group-prepend">
        <label class="input-group-text" for="inputGroupSelect02">Genre</label>
      </div>
      <select v-model="value" class="custom-select" id="inputGroupSelect02" @change="emitVal(value)">
        <option v-for="genre in genres" :value="genre.value">{{genre.text}}</option>
      </select>
    </div>-->

    <app-v-toggable-search-bar
      v-model="value"
      :options="genres"
      :searchButton="{textActive:'Genre', textInActive:'Genre einschränken'}"
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
