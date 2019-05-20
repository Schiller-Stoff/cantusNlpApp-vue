<template>
  <div class="TheResultControl_mainContainer">
    <ul class="list-group list-inline text-right">
      <li class="list-group-item">
        <div @click="demandResultView('incipitHistoViz')"><i class="fas fa-chart-bar"></i></div>
      </li>
      <li class="list-group-item">
        <div @click="demandResultView('incipitTable')"><i class="far fa-file-alt"></i></div>
      </li>
      <li class="list-group-item">
        <div @click="toggleFullScreen"><i class="far fa-window-maximize"></i></div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {EventBus} from "../../main";

  export default {
    name: "TheResultControl",
    methods: {
      demandResultView(val){
        return this.$emit('resultViewDemanded',val)
      },
      toggleFullScreen(){
        EventBus.$emit('toggleFullScreen')
      }
    }
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
