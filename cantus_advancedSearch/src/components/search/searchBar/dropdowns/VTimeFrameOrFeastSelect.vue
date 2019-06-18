<template>
  <div>
    <span
      class="VTimeFrameOrFeastSelect_buttonSpan"
      @click="toggleSearchFields()"
      :data-balloon="toggleOptions.toggable ? (searchShown ? 'Einschränkung deaktivieren' : 'Einschränkung aktivieren') : undefined"
      data-balloon-pos="left"
      :style="(!toggleOptions.toggable && (selectedFeast.value==='') && (selectedTimeFrame.value==='')) ? 'border:.15em solid tomato' : ''"
    >
       <i v-if="toggleOptions.toggable" :class="faClass"></i>
      {{ searchShown ? 'Zeitraum oder Fest' : 'Zeitraum einschränken' }}</span>
    <app-v-time-feast-select
      v-if="searchShown"
      v-model="selectedFeast"
      @input="inputFilled='feasts'"
      :style="inputFilled==='feasts' ? 'border:.2em solid lightgreen;' : '' "
      :showInputMarker="false"
    ></app-v-time-feast-select>

    <app-time-frame-select
      v-if="searchShown"
      :searchToggable="false"
      v-model="selectedTimeFrame"
      @input="inputFilled='timeFrame'"
      :style="inputFilled==='timeFrame' ? 'border:.2em solid lightgreen;' : '' "
      :showInputMarker="false"
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
      value:{
        default(){return{text:'',value:''}}
      },
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
        searchShown:this.searchFieldsShown,
        autoCompleteOptions:autocompleteVals
      }
    },
    methods: {
      toggleSearchFields(){
        if(!this.toggleOptions.toggable)return
        this.searchShown = !this.searchShown
        this.$emit('searchFieldToggled',this.searchShown)
      }
    },
    computed: {
      selectedFeast: {
        get() {
          if(this.inputFilled!=='feasts')return {text:'',value:''}
          return this.value;
        },
        set(v) {
          this.$emit('input', v)
        }
      },
      selectedTimeFrame: {
        get() {
          if(this.inputFilled!=='timeFrame')return {text:'',value:''}
          return this.value;
        },
        set(v) {
          this.$emit('input', v)
        }
      },
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
