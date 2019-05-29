<template>
  <app-v-toggable-search-bar
    :options="horae"
    :searchToggable="searchToggable"
    :searchButton="{textActive:'Hora',textInActive:'Hora einschränken'}"
    v-model="selectedValue"
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
      value:{
        default(){return {text:'',value:''}}
      },
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
        horae
      }
    },
    methods:{
      emitSearchFieldShownStatus(value){
        this.$emit('searchFieldToggled', value)
      }
    },
    computed: {
      selectedValue: {
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

<style scoped lang="scss">

</style>
