<template>
  <button
    class="btn btn-secondary" :class="searchButtonColor" @click="emitClick">Suche starten
  </button>
</template>

<script>
  export default {
    name: "VSearchButton",
    props: {
      buttonEnabled: {
        required:true,
        type: Boolean
      },
      text: {
        type:String,
        required:true
      }
    },
    computed: {
      searchButtonColor(){
        return this.buttonEnabled ? 'btn-success' : 'btn-warning'
      }
    },
    methods: {
      emitClick(){
        this.$emit('click')
      }
    }
  }
</script>

<style scoped>

</style>
