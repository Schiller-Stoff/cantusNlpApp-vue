<template>
  <div class="input-group mb-3">
    <div class="input-group-prepend">
      <label class="input-group-text" for="inputGroupSelect03">Hora</label>
    </div>
    <select v-model="value" class="custom-select" id="inputGroupSelect03" @change="emitVal(value)">
      <option v-for="hora in horae" :value="hora.value">{{hora.text}}</option>
    </select>
  </div>
</template>

<script>

  import {horae} from "../../../../data/Horae";

  export default {
    name: "VHoraeSelect",
    data(){
      return {
        value:'',
        horae
      }
    },
    methods:{
      emitVal(val){
        this.$emit('input',val)
      }
    }
  }
</script>

<style scoped>

</style>
