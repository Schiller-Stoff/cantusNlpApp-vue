<template>
  <div>
    <app-v-toggable-search-bar
      v-model="selectedValue"
      :searchButton="{textActive:'LO', textInActive:'LO einschränken'}"
      :options="libriOrdinarii"
      :searchToggable="searchToggable"
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
        libriOrdinarii
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

<style scoped>

</style>
