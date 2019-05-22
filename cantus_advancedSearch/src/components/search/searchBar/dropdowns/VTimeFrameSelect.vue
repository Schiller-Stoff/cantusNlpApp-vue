<template>
  <div>
    <app-v-toggable-search-bar
      :options="timeFrames"
      :searchToggable="searchToggable"
      :searchButton="{textActive:'activeText',textInActive:'inactiveText'}"
      v-model="value"
      @input="vModelEmit(value)"
      @searchFieldToggled="emitSearchFieldShownStatus($event)"
    ></app-v-toggable-search-bar>
  </div>
</template>

<script>
  import {timeFrames} from "../../../../data/timeFrameFeasts";
  import VToggableSearchBar from './VToggableSearchBar'

  export default {
    name: "VTimeFrameSelect",
    components: {
      appVToggableSearchBar:VToggableSearchBar
    },
    props:{
      searchToggable: {
        default:false
      }
    },
    data(){
      return {
        value:'',
        timeFrames
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
