<template>
  <div>
    <button
      class="btn btn-primary"
      @click="toggleSearchFields()"
    >Zeitraumsuche</button>
    <app-model-select
      v-if="searchShown"
      :options="autoCompleteOptions"
      v-model="chosenTimeFrame"
      @input="vModelEmit($event)"
    ></app-model-select>

    <app-time-frame-select
      v-if="searchShown"
      :searchToggable="false"
      v-model="chosenTimeFrame"
      @input="vModelEmit($event)"
    >
    </app-time-frame-select>
  </div>
</template>

<script>

  import { ModelSelect } from 'vue-search-select'
  import {autocompleteVals} from "../../../../data/autocompleteVals"
  import VTimeFrameSelect from './VTimeFrameSelect'

  export default {
    name: "VTimeFrameOrFeastSelect",
    components: {
      appModelSelect: ModelSelect,
      appTimeFrameSelect:VTimeFrameSelect
    },
    props:{
      searchFieldsShown:{
        default:true,
        type:Boolean
      }
    },
    data(){
      return {
        chosenTimeFrame:'',
        searchShown:this.searchFieldsShown,
        autoCompleteOptions:autocompleteVals
      }
    },
    methods: {
      toggleSearchFields(){
        this.searchShown = !this.searchShown
        this.$emit('searchFieldToggled',this.searchShown)
      },
      vModelEmit(value){
        this.$emit('input',value)
      }
    }
  }
</script>

<style scoped>

</style>
