<template>

</template>

<script>
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
