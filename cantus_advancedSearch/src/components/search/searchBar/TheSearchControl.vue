<template>
  <div class="container-fluid TheSearchControl_mainContainer">

    <div class="TheSearchControl_inlineBar">
      <div class="TheSearchControl_iconHolder" data-balloon="Zur Cantus Startseite" data-balloon-pos="up"><a href="http://gams.uni-graz.at/context:cantus"><i class="fas fa-home TheSearchControl_icons"></i></a></div>
      <div class="searchBar_iconHolder"  :class="animatedAppearance" @click="demandSearchMode('appTheFullTextSearch'); markActive('firstIcon')">
        <div data-balloon="Erweiterte Volltextsuche (Standard)" data-balloon-pos="up" class="TheSearchControl_iconHolder"><i ref="firstIcon" class="fas fa-font TheSearchControl_icons"></i></div>
      </div>
      <div class="searchBar_iconHolder" :class="animatedAppearance" @click="demandSearchMode('appTheFullTextIncipitSearch'); markActive('secondIcon')">
        <div data-balloon="Erweiterte Volltextsuche (Incipit)" data-balloon-pos="up" class="TheSearchControl_iconHolder"><i ref="secondIcon" class="fab fa-linkedin-in TheSearchControl_icons active"></i></div>
      </div>
      <div class="searchBar_iconHolder" :class="animatedAppearance" @click="demandSearchMode('appTheIncipitSearch'); markActive('thirdIcon')">
        <div data-balloon="Erweiterte Incipitsuche" data-balloon-pos="up" class="TheSearchControl_iconHolder"><i ref="thirdIcon" class="fas fa-list-ol TheSearchControl_icons"></i></div>
      </div>
      <div class="searchBar_iconHolder" :class="animatedAppearance" @click="demandSearchMode('appTheSearchHelpText'); markActive('fourthIcon')">
        <div data-balloon="Hilfe" data-balloon-pos="up" class="TheSearchControl_iconHolder"><i ref="fourthIcon" class="far fa-question-circle TheSearchControl_icons"></i></div>
      </div>
      <div class="searchBar_iconHolder" :class="animatedAppearance" @click="resetSearch(); markActive('fifthIcon')">
        <div data-balloon="Suche zurücksetzen" data-balloon-pos="up" class="TheSearchControl_iconHolder"><i ref="fifthIcon" class="fas fa-trash TheSearchControl_icons"></i></div>
      </div>
    </div>

    <hr>
    <div class="TheSearchControl_iconHolder"><i class="fas fa-search TheSearchControl_icons"
                                                :class="reverseAnimatedAppearance"></i></div>
  </div>

</template>

<script>
  export default {
    name: "TheSearchSwitch",
    props: {
      showFull: {
        type: Boolean,
        required: true
      }
    },
    data(){
      return {
        lastRefVal:'secondIcon'
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

      },
      resetSearch(){
        localStorage.clear();
        location.reload()
      },
      markActive(refVal){
        if(this.lastRefVal!=='')this.$refs[this.lastRefVal].classList.remove('active')
        this.$refs[refVal].classList.add('active')
        this.lastRefVal = refVal
      }

    }
  }
</script>

<style scoped lang="scss">
  @import "../../../scss/globalVariables/globalVariables.scss";

  .TheSearchControl_mainContainer {
    @include lg {
      padding-top: 6vh;
    }
    .active {
      color: $fourthColor;
      border-bottom: .15em dotted $fifthColor;
    }
  }

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
          color: $fourthColor;
        }
      }
    }
  }

  hr {
    border: none;
    padding:.25em;
    background-color: lightgrey;
    border-radius: 5em;
  }
</style>
