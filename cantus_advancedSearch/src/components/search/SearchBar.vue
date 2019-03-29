<template>
  <div class="container-fluid">
    <div>
      <div><i class="fas fa-volleyball-ball"></i></div>
      <p>Feste</p>
    </div>
    <hr>

    <form class="inline">
      <label for="inlineFormCustomSelectPref">Resp</label>
      <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
        <option selected>Choose...</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </form>

  </div>
</template>

<script>
export default {
  name: "Search"
}
</script>

<style scoped lang="scss">
@import "../../scss/globalVariables/globalVariables";

  .container-fluid {
    margin-top: 5em;
  }

  i {
    color: white;
    font-size: 1.5em;
    margin-top: 1em;
  }

  p {
    color: $primaryColor;
  }

  hr {
    background-color: $primaryColor
  }

  label {
    color: $primaryColor;
  }

  input {
    background-color: $primaryColor;
  }

</style>
