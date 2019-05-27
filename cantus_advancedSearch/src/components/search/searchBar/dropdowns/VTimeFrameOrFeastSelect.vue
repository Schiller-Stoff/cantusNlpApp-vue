<template>
  <div>
    <span
      class="VTimeFrameOrFeastSelect_buttonSpan"
      @click="toggleSearchFields()"
      :data-balloon="searchShown ? 'Einschränkung deaktivieren' : 'Einschränkung aktivieren'"
      data-balloon-pos="left"
    >
       <i :class="faClass"></i>
      {{ searchShown ? 'Zeitraum' : 'Zeitraum einschränken' }}</span>
    <app-model-select
      v-if="searchShown"
      :options="autoCompleteOptions"
      v-model="chosenTimeFrame"
      @input="inputFilled='feasts';vModelEmit($event)"
      :style="inputFilled==='feasts' ? 'border:.2em solid lightgreen;' : '' "
    ></app-model-select>

    <app-time-frame-select
      v-if="searchShown"
      :searchToggable="false"
      v-model="chosenTimeFrame"
      @input="inputFilled='timeFrame';vModelEmit($event)"
      :style="inputFilled==='timeFrame' ? 'border:.2em solid lightgreen;' : '' "
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
        inputFilled:'no_value',
        chosenFeast:{text:'',value:''},
        chosenTimeFrame:{text:'',value:''},
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
    },
    computed: {
      faClass(){
        return this.searchShown ? 'far fa-check-circle green' : 'far fa-times-circle red'
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../../scss/globalVariables/globalVariables";
  .VTimeFrameOrFeastSelect_buttonSpan {
    width: 100%;
    display: block;
    text-align: center;
    background-color:#eee;
    padding: 3px 8px;
    border: 1px solid #ccc;
    transition: background-color .25s;
    &:hover {
      cursor: pointer;
      background-color: $fourthColor;
    }
    i {
      margin: .25em 0 0 1em;
    }
  }

  .green {
    color: lightgreen;
  }

  .red {
    color: tomato;
  }
</style>
