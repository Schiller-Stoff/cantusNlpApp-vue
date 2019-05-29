<template>
  <div>
    <app-v-toggable-search-bar
      :options="timeFrames"
      :searchToggable="searchToggable"
      :searchButton="{textActive:'Zeitraum',textInActive:'Einschränken auf Zeitraum'}"
      v-model="selectedValue"
      @searchFieldToggled="emitSearchFieldShownStatus($event)"
      :toggleOptions="{toggable:true,mode:'normal'}"
      :showInputMarker="showInputMarker"
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
      value: {
        default(){return {text:'',value:''}}
      },
      searchToggable: {
        default:false
      },
      showInputMarker:{
        default:true,
        type:Boolean
      }
    },
    data(){
      return {
        timeFrames
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
