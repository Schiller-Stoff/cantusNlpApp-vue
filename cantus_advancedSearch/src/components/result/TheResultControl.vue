<template>
  <div class="TheResultControl_mainContainer">
    <ul class="list-group list-inline text-right">
      <li class="list-group-item">
        <i class="fas fa-chart-bar"></i>
      </li>
      <li class="list-group-item">
        <i class="far fa-file-alt"></i>
      </li>
      <li class="list-group-item">
        <i class="far fa-window-maximize"></i>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "TheResultControl"
  }
</script>

<style scoped lang="scss">
  @import "../../scss/globalVariables/globalVariables";

  .TheResultControl_mainContainer {
    background-color: $primaryColor;
  }

  i {
    font-size: 1.75em;
    padding: .25em;
  }

  li {
    border:none;
  }

  ul {
    position: sticky !important;
  }

</style>
