<template>

  <div class="container-fluid">
    <app-the-search-bar></app-the-search-bar>
  </div>

</template>

<script>
  //TODO --> add this component to MainGrid
  //TODO split functionality between TheSearch component (ajax etc.) and TheSearchBar (gui etc.)
  //TODO think about event emiting / handling and props

  import TheSearchBar from './TheSearchBar'

  export default {
    name: "TheSearch",
    components: {
      appTheSearchBar:TheSearchBar
    }
  }
</script>

<style scoped>

</style>
