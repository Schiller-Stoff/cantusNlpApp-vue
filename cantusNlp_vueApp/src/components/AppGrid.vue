<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col col-2"></div>
      <div class="col col-8"></div>
      <div class="col col-1"></div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "AppGrid"
    }
</script>

<style scoped>

  div.row {
    padding: 10em;
  }

  div.col {
    margin: .5em;
    border-radius: 1em;
  }

  div.container-fluid {
    background-color: #eeeeee;
    min-height: 1000px;
  }

  .col-1 {
    background-color: white;
  }

  .col-2 {
    background-color: darkblue;
  }

  .col-8 {
    background-color: white;
    min-height: 1000px;
  }



</style>
