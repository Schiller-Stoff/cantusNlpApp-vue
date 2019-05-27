<template>
  <div>
    <app-v-toggable-search-bar
      :options="timeFrames"
      :searchToggable="searchToggable"
      :searchButton="{textActive:'Zeitraum',textInActive:'Einschränken auf Zeitraum'}"
      v-model="value"
      @input="vModelEmit(value)"
      @searchFieldToggled="emitSearchFieldShownStatus($event)"
      :toggleOptions="{toggable:true,mode:'normal'}"
      :clearSelectField="clearSelectField"
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
      },
      clearSelectField: {
        default:false,
        type: Boolean
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
