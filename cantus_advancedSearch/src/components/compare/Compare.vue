<template>
    <div class="container-fluid">
      <h5>I'm the compare viz</h5>
    </div>
</template>

<script>
    export default {
        name: "Compare"
    }
</script>

<style scoped lang="scss">
  @import "../../scss/globalVariables/globalVariables";

  .container-fluid {
    @include lg {
      margin-top: 1em;
      min-height: 50vh;
    }
    background-color: white;
  }

</style>
