<template>
  <div id="vue_app">
    <nlp-app-grid></nlp-app-grid>
    <notifications classes="my-notes" group="foo" :position="'bottom right'"> </notifications>
  </div>
</template>

<script>
import AppGrid from "./components/AppGrid.vue"
export default {
  name: 'app',
  components: {
    nlpAppGrid: AppGrid
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
  }
}

</script>

<style scoped lang="scss">
  @import "scss/globalVariables";

  /*Css that applies to all children of the container*/
  #vue_app /deep/ {
    @import "~bootstrap/dist/css/bootstrap.min";
    .my-notes {
      // Style of the notification itself
      padding: 1em;
      margin: .5em 2em;
      font-size: 1em;
      color: $blankColor;
      background: $secondaryColor;
      border-radius: .5em;
      text-align: center;
      .notification-title { /* Style for title line */ }
      .notification-content { /* Style for content */ }
      &.my-type {/*
      Style for specific type of notification, will be applied when you
      call notification with "type" parameter:
      this.$notify({ type: 'my-type', message: 'Foo' })
      */
      }
    }
    .cantusNlp_iconHolder {
      cursor: pointer;
      i {
        color:$iconColor;
        font-size:1.5em;
        &:hover{
          color:$fourthColor;
        }
      }
    }

    /* Normalizing bootstrap content */
    .container-fluid {
      margin: 0;
      padding: 0;
      @include sm{margin: initial; padding: initial}
    }
    .row {
      margin: 0; padding: 0;
      @include sm{margin: initial; padding: initial}
    }
  }


</style>

<!--not scoped here!-->
<style lang="scss">

  /*Removing body, html overflow*/
  /*html, body {*/
    /*width: 100%;*/
    /*height: 100%;*/
    /*margin:0;*/
    /*padding: 0;*/
    /*overflow-x: hidden;*/
  /*}*/

</style>
