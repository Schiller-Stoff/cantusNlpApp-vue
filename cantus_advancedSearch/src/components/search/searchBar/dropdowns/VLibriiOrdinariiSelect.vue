<template>
  <div class="input-group mb-3">
    <div class="input-group-prepend">
      <label class="input-group-text" for="inputGroupSelect01">LO</label>
    </div>
    <select v-model="value" class="custom-select" id="inputGroupSelect01" :options="libriOrdinarii" @change="emitValue(value)">
      <option value="default">Bitte wählen...</option>
      <option v-for="liber in libriOrdinarii" :value="liber.value">{{liber.text}}</option>

      <option value="FAIL_QUERY">MALFORMED_QUERY</option>
      <option value="/api/users?delay=5">DELAYED_RESPONSE_5sek</option>
      <option value="/api/users?delay=12">DELAYED_RESPONSE_12sek_error_displayed</option>
    </select>
  </div>
</template>

<script>
  import {libriOrdinarii} from "../../../../data/libriOrdinarii";

  export default {
    name: "VLibriiOrdinariiSelect",
    data(){
      return {
        libriOrdinarii,
        value:'default'
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
