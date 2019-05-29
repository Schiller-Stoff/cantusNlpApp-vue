<template>
  <div>
    <span
      class="VTimeFrameOrFeastSelect_buttonSpan"
      @click="toggleSearchFields()"
      :data-balloon="toggleOptions.toggable ? (searchShown ? 'Einschränkung deaktivieren' : 'Einschränkung aktivieren') : undefined"
      data-balloon-pos="left"
    >
       <i v-if="toggleOptions.toggable" :class="faClass"></i>
      {{ searchShown ? 'Zeitraum' : 'Zeitraum einschränken' }}</span>
    <!--<app-model-select
      v-if="searchShown"
      :options="autoCompleteOptions"
      v-model="chosenTimeFrame"
      @input="inputFilled='feasts';vModelEmit($event);clearSelectFieldMethod()"
      :style="inputFilled==='feasts' ? 'border:.2em solid lightgreen;' : '' "
    ></app-model-select>-->

    <app-v-time-feast-select
      v-if="searchShown"
      v-model="chosenFeast"
      @input="inputFilled='feasts';vModelEmit($event);clearSelectFieldMethod(false)"
      :style="inputFilled==='feasts' ? 'border:.2em solid lightgreen;' : '' "
      :clearSelectField="clearFeast"

    ></app-v-time-feast-select>

    <app-time-frame-select
      v-if="searchShown"
      :searchToggable="false"
      v-model="chosenTimeFrame"
      @input="inputFilled='timeFrame';vModelEmit($event);clearSelectFieldMethod(true)"
      :style="inputFilled==='timeFrame' ? 'border:.2em solid lightgreen;' : '' "
      :clearSelectField="clearTimeFrame"
    >
    </app-time-frame-select>
  </div>
</template>

<script>

  import { ModelSelect } from 'vue-search-select'
  import {autocompleteVals} from "../../../../data/autocompleteVals"
  import VTimeFrameSelect from './VTimeFrameSelect'
  import VFeastSelect from './VTimeFeastSelect'

  export default {
    name: "VTimeFrameOrFeastSelect",
    components: {
      appModelSelect: ModelSelect,
      appTimeFrameSelect:VTimeFrameSelect,
      appVTimeFeastSelect:VFeastSelect
    },
    props:{
      searchFieldsShown:{
        default:true,
        type:Boolean
      },
      toggleOptions: {
        type: Object,
        default() {
          return {
            toggable: true
          }
        }
      }
    },
    data(){
      return {
        inputFilled:'no_value',
        clearTimeFrame:false,
        clearFeast:false,
        chosenFeast:{text:'',value:''},
        chosenTimeFrame:{text:'',value:''},
        searchShown:this.searchFieldsShown,
        autoCompleteOptions:autocompleteVals
      }
    },
    methods: {
      toggleSearchFields(){
        if(!this.toggleOptions.toggable)return
        this.searchShown = !this.searchShown
        this.$emit('searchFieldToggled',this.searchShown)
      },
      vModelEmit(value){
        this.$emit('input',value)
      },
      clearSelectFieldMethod(clearFeast){
        let self = this
        if(clearFeast){
          this.clearFeast = true;
          setTimeout(_=>{
            self.clearFeast = false
          },10)
        } else {
          this.clearTimeFrame = true;
          setTimeout(_=>{
            self.clearTimeFrame = false
          },10)
        }


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
