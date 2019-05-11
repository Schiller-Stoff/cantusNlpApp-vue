<template>
  <div class="container-fluid">

    <div class="TheSearchControl_inlineBar">
      <div class="TheSearchControl_iconHolder"><i class="fas fa-home TheSearchControl_icons"></i></div>
      <div class="searchBar_iconHolder" :class="animatedAppearance" @click="demandSearchMode('fullTextSearch')">
        <div class="TheSearchControl_iconHolder"><i class="fas fa-font TheSearchControl_icons"></i></div>
      </div>
      <div class="searchBar_iconHolder" :class="animatedAppearance" @click="demandSearchMode('incipitSearch')">
        <div class="TheSearchControl_iconHolder"><i class="fas fa-list-ol TheSearchControl_icons"></i></div>
      </div>
    </div>

    <hr>
    <div class="TheSearchControl_iconHolder"><i class="fas fa-search TheSearchControl_icons"
                                                :class="reverseAnimatedAppearance"></i></div>
  </div>

</template>

<script>
  //TODO: events: --> switching between fullText + incipitSearch / toogleFullscreen? / interfaceLocked?
  //TODO  props? -->
  //TODO : remove old/outdated functionality from TheSearchBar!


  export default {
    name: "TheSearchSwitch",
    props: {
      showFull: {
        type: Boolean,
        required: true
      }
    },
    computed: {
      animatedAppearance() {
        return this.showFull ? 'animated once fadeIn' : 'hidden'
      },
      reverseAnimatedAppearance() {
        return this.showFull ? 'hidden' : 'animated once fadeIn'
      }
    },
    methods: {
      demandSearchMode(newMode_str){
        this.$emit('searchModeDemanded',newMode_str)
      },
      toggleFullScreen(){

      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../scss/globalVariables/globalVariables.scss";

  .TheSearchControl_icons {
    color: $secondaryColor;
    font-size: 1.5em;
    margin-right: .5em;
  }

  .TheSearchControl_inlineBar {
    div {
      display: inline-block;
    }
    .TheSearchControl_iconHolder {
      &:hover {
        cursor: pointer;
        i {
          color: $fourthColor
        }
      }
    }
  }

  hr {
    border-color: $secondaryColor;
  }
</style>
