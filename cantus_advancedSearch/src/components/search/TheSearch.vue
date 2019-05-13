<template>
  <app-the-search-bar
    @routed_startIncipitSearch="logToConsole($event)"
    @routed_incipitParamsUpdated="logToConsole($event)"
  ></app-the-search-bar>
</template>

<script>
  //TODO split functionality between TheSearch component (ajax etc.) and TheSearchBar (gui etc.)
  //TODO think about event emiting / handling and props

  import TheSearchBar from './TheSearchBar'

  export default {
    name: "TheSearch",
    components: {
      appTheSearchBar: TheSearchBar
    },
    methods: {
      logToConsole(data){
        console.log("test method called!")
        console.log(data)
      },
    }
  }
</script>

<style scoped>

</style>
