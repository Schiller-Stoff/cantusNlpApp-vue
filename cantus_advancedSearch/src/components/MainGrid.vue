<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-1" @mouseleave="restoreWidth" @mouseover="moveWidth" id="first" ref="first">
        <app-the-search></app-the-search>
      </div>
      <div class="col-md-11" id="second" ref="second">
        <app-result></app-result>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {mapActions} from 'vuex'
  import Result from './result/Result'
  import TheSearch from './search/TheSearch'

  export default {
    name: "MainGrid",
    components: {
      appResult: Result,
      appTheSearch: TheSearch
    },
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters({
        searchBarEnlarged: 'interfaceStates_currentSearchBarState',
        interfaceLocked: 'interfaceStates_currentSearchLockState'
      })
    },
    methods: {
      ...mapActions({
        markSearchEnlargedState: 'interfaceStatesAction_enlargeSearchBar',
        markSearchMinfiedState: 'interfaceStatesAction_minifySearchBar'
      }),
      moveWidth() {
        if(this.searchBarEnlarged)return
        this.markSearchEnlargedState()

        this.$refs.first.classList.add('transition')
        this.$refs.second.classList.add('transition')

        this.$refs.first.classList.remove('col-md-1')
        this.$refs.second.classList.remove('col-md-11')

        this.$refs.first.classList.add('col-md-7')
        this.$refs.second.classList.add('col-md-5')
      },
      restoreWidth() {
        this.markSearchMinfiedState()

        this.$refs.first.classList.add('transition')
        this.$refs.second.classList.add('transition')

        this.$refs.first.classList.remove('col-md-7')
        this.$refs.second.classList.remove('col-md-5')

        this.$refs.first.classList.add('col-md-1')
        this.$refs.second.classList.add('col-md-11')

        setTimeout(_ => {
          this.$refs.first.classList.remove('transition')
          this.$refs.second.classList.remove('transition')
        }, 500)

      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../scss/globalVariables/globalVariables.scss';

  #first {
    background-color: $primaryColor;
    min-height: 10vh;
    @include lg {
      min-height: 100vh;
    }

  }

  #second {
    background-color: $blankColor;
    min-height: 20vh;
    @include lg {
      min-height: 100vh;
    }
  }

  .transition {
    transition: all .5s cubic-bezier(0.23, 1, 0.32, 1);
  }


</style>
