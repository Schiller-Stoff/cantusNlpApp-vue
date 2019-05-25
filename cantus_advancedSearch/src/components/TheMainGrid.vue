<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-1" @mouseleave="restoreWidth" @mouseover="moveWidth" id="first" ref="first">
        <app-the-search
          :searchBarEnlarged="searchBarEnlarged"
        ></app-the-search>
      </div>
      <div class="col-md-11" id="second" ref="second" :style="maximizedStyle" :class="animClass">
        <app-the-result></app-the-result>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {mapActions} from 'vuex'
  import TheResult from './result/TheResult'
  import TheSearch from './search/TheSearch'
  import {EventBus} from "../main";

  export default {
    name: "TheMainGrid",
    components: {
      appTheResult: TheResult,
      appTheSearch: TheSearch
    },
    data() {
      return {
        //searchBarEnlarged:false
        maximizedStyle:'',
        animClass:''
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
        //this.searchBarEnlarged = true;

        this.$refs.first.classList.add('transition')
        this.$refs.second.classList.add('transition')

        this.$refs.first.classList.remove('col-md-1')
        this.$refs.second.classList.remove('col-md-11')

        this.$refs.first.classList.add('col-md-7')
        this.$refs.second.classList.add('col-md-5')
      },
      restoreWidth() {
        this.markSearchMinfiedState()
        //this.searchBarEnlarged = false;

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
    },
    created(){
      EventBus.$on('toggleFullScreen',_=>{
        if(this.maximizedStyle){
          this.animClass = ""
          this.maximizedStyle = undefined
        } else {
          this.animClass = "animated fadeIn once";
          this.maximizedStyle = {position:'absolute', height:'120vh', width: '99vw', left:0, top:0,zIndex:'2000'}
        }
      });
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
    box-shadow: 10px 10px 5px 0px lightgrey;
    border-radius: 1em;
    min-height: 20vh;
    padding-left: 0;
    @include lg {
      min-height: 100vh;
    }
  }

  .transition {
    transition: all .5s cubic-bezier(0.23, 1, 0.32, 1);
  }


</style>
