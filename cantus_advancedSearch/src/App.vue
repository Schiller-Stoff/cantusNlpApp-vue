<template>
  <div id="vue_app">
    <button class="btn btn-secondary">is this styled now?</button>
    <app-main-grid></app-main-grid>
  </div>
</template>

<script>
import MainGrid from './components/MainGrid';
export default {
  name: 'app',
  components: {
    appMainGrid: MainGrid
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
  #vue_app /deep/ {
    @import './../node_modules/bootstrap/scss/bootstrap';
    @import './../node_modules/bootstrap-vue/src/index.scss';
    @import "./scss/globalVariables/globalVariables.scss";
  }
</style>
