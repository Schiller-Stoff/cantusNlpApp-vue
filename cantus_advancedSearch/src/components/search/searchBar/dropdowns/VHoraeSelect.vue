<template>
  <app-v-toggable-search-bar
    :options="horae"
    :searchToggable="searchToggable"
    :searchButton="{textActive:'activeText',textInActive:'inactiveText'}"
    v-model="value"
    @input="vModelEmit(value)"
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
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../../scss/globalVariables/globalVariables";
  #basic-addon1{
    width:10px;
    transition: background-color .25s;
    &:hover {
      cursor: pointer;
      background-color: $fourthColor;
    }
  }

</style>
