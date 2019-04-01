<template>
  <div>
    <h3>Ergebnisse</h3>
    <hr>
    <app-result-preview v-if="showPreview" :prevData="searchResult"></app-result-preview>
  </div>
</template>

<script>
  import {EventBus} from "../../main";
  import ResultPreview from './ResultPreview'
  export default {
    name: "Result.vue",
    data(){
      return {
        searchResult:[],
        showPreview:false
      }
    },
    components: {
      appResultPreview: ResultPreview
    },
    created(){
      EventBus.$on('resultReceived',data=>{
        this.searchResult = data
        this.showPreview = true
      });
    }
  }
</script>

<style scoped>

</style>
