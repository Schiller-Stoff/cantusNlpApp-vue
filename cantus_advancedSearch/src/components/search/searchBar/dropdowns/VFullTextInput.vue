<template>
  <div class="input-group">
    <span class="input-group-addon" id="basic-addon1">Volltextsuche</span>
    <input v-model="value" type="text" class="form-control" placeholder="Text" aria-describedby="basic-addon1" @change="vModelEmit(value)">
  </div>
</template>

<script>
  export default {
    name: "VFullTextInput",
    data(){
      return {
        value:''
      }
    },
    methods: {
      vModelEmit(val){
        this.$emit('input',val)
      }
    }
  }
</script>

<style scoped>

</style>
