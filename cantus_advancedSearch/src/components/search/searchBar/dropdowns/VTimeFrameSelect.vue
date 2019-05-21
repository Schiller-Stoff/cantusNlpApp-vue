<template>
  <div class="input-group mb-3">
    <div class="input-group-prepend">
    </div>
    <select v-model="value" @change="emitValue(value)" class="custom-select" id="inputGroupSelect04" :options="timeFrames">
      <option selected value="default">Bitte wählen...</option>
      <option v-for="time in timeFrames" :value="time">{{time.text}}</option>
    </select>
  </div>
</template>

<script>
  import {timeFrames} from "../../../../data/timeFrameFeasts";

  export default {
    name: "VTimeFrameSelect",
    data(){
      return {
        value:'',
        timeFrames
      }
    },
    methods:{
      emitValue(val){
        this.$emit('input',val)
      }
    }
  }
</script>

<style scoped>

</style>
