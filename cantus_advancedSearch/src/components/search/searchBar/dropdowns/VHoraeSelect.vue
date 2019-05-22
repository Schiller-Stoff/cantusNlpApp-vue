<template>
  <div class="input-group">
    <span class="input-group-addon" id="basic-addon1" @click="searchToggable ? toggleHoraeSearch() : ''">Horae</span>
    <select v-model="value" class="form-control" id="inputGroupSelect03" @change="emitVal(value)" v-if="searchToggable ? showSearch : true">
      <option v-for="hora in horae" :value="hora.value">{{hora.text}}</option>
    </select>
  </div>
</template>

<script>

  import {horae} from "../../../../data/Horae";

  export default {
    name: "VHoraeSelect",
    props:{
      searchToggable:{
        default:false
      }
    },
    data(){
      return {
        value:'',
        horae,
        showSearch:false
      }
    },
    methods:{
      emitVal(val){
        this.$emit('input',val)
      },
      toggleHoraeSearch(){
        this.showSearch = !this.showSearch
        this.$emit('horaeSearchToggled',this.showSearch)
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
