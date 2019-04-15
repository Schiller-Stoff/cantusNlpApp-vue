<template>
  <div class="container-fluid text-center">
    <i class="fas fa-circle-notch fa-spin" v-if="!loadFailed"></i>
    <div v-else>
      <h5>Suchfehler: Momentan ist leider keine Verbindung zur Datenbank möglich. Bitte versuchen Sie es später erneut.</h5>
    </div>
  </div>
</template>
<script>
  export default {
    name: "ResultLoadHandler",
    props: {
      loadFailed: {
        type: Boolean,
        required: true,
        default: false
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "../../scss/globalVariables/globalVariables";
  .container-fluid {
    margin-top: 40vh;
    i {
      font-size: 3em;
    }
  }
</style>
