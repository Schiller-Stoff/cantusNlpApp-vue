<template>

</template>

<script>
  //TODO implement viz Data refactoring inside here!

  export default {
    name: "TheResultDisplay",
    props:{
      incipitSearch:{
        type:required
      },
      incipitOngoingSearch:{
        type:required
      },
      incipitSearchFailed:{
        type:required
      },
      incipitSearchHistory: {
        type:required
      }
    }
  }
</script>

<style scoped>

</style>
