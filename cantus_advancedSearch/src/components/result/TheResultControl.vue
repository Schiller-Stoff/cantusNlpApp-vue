<template>
  <div class="TheResultControl_mainContainer">
    <ul class="list-group list-inline text-right">
      <li class="list-group-item">
        <div><i class="fas fa-chart-bar"></i></div>
      </li>
      <li class="list-group-item">
        <div><i class="far fa-file-alt"></i></div>
      </li>
      <li class="list-group-item">
        <div><i class="far fa-window-maximize"></i></div>
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
    i {
      font-size: 1.5em;
      padding: .25em;
    }
    li {
      border: none;
    }
    ul {
      position: sticky !important;
    }
    div:hover {
      & > i {
        color: $fourthColor;
        cursor: pointer;
      }
    }
  }


</style>
