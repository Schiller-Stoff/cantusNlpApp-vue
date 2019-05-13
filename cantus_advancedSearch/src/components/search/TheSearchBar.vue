<template>
  <div class="container-fluid">
    <app-the-search-control
      class="container-fluid"
      :showFull="searchBarEnlarged"
      @searchModeDemanded="switchSearchMode($event)"

    ></app-the-search-control>

    <component
      :class="fadeInAtEvent"
      :is="searchBarMode"
      @incipitParamsUpdated="logToConsole;routeEvent($event,'incipitParamsUpdated')"
      @startIncipitSearch="logToConsole;routeEvent($event,'startIncipitSearch')"
    ></component>

    <button class="btn btn-primary" @click="toggleInterfaceLock(true)">lock</button>
    <button class="btn btn-primary" @click="toggleInterfaceLock(false)">unlock</button>


  </div>
</template>

<script>
import {mapActions} from 'vuex'
import TheSearchControl from './searchBar/TheSearchControl'
import TheSearchHelpText from './searchBar/TheSearchHelpText'
import TheIncipitSearch from './searchBar/TheIncipitSearch'
import TheFullTextSearch from './searchBar/TheFullTextSearch'

let timer;
export default {
  name: "Search",
  components:{
    appTheSearchControl: TheSearchControl,
    appTheSearchHelpText: TheSearchHelpText,
    appTheIncipitSearch: TheIncipitSearch,
    appTheFullTextSearch: TheFullTextSearch
  },
  props: {
    searchBarEnlarged: {
      type: Boolean
    }
  },
  data(){
    return {
      searchBarMode:'appTheSearchHelpText',
      fadeInAtEvent: 'hidden',  //blending in dynamic components
    }
  },
  watch: {
    searchBarEnlarged(newValue, oldValue) {
      let self = this;
      if(this.searchBarEnlarged){
        timer = setTimeout(_=>{
          self.fadeInAtEvent = 'animated once fadeIn'
        },100)
      } else {
        clearTimeout(timer)
        self.fadeInAtEvent = 'hidden'
      }
    }
  },
  methods: {
    ...mapActions({
      lockInterface: 'interfaceStatesAction_lockSearchbar',
      unlockInterface:'interfaceStatesAction_unlockSearchbar'
    }),
    searchVizCompareData(vuexResultAction,vuexQueryParamsAction){

      //this.$store.dispatch('search_setSearchFailedAction',false)
      //this.$store.dispatch('search_markOngoingSearchAction', true)

      //if in 10 secs no response fail
      // searchTimer = setTimeout(_=>{
      //   //this.$store.dispatch('search_setSearchFailedAction',true)
      //   this.runningRequest.abort()
      // },10000)

      // this.$http.get(this.dataQuery, {
      //   //vue resource specific: using above to cancel current request
      //   before(request){
      //     this.runningRequest = request
      //   }
      // }).then(response => {
      //   this.$store.dispatch(vuexResultAction,response)
      //   //this.$store.dispatch('search_pushOntoSearchHistoryAction',{response:response, searchParams:this.searchParams})
      //   //clearTimeout(searchTimer)
      // },err => {
      //   //this.$store.dispatch('search_setSearchFailedAction',true)
      //   //clearTimeout(searchTimer)
      // }).finally(_=>{
      //   //this.$store.dispatch('search_markOngoingSearchAction', false)
      // });

    },
    toggleInterfaceLock(lock_boolean){
      // uses lockInterface() method -> calls vuex-actions
      if(lock_boolean){
        this.lockInterface()
      } else {
        this.unlockInterface()
      }
    },

    //from here new methods
    switchSearchMode(searchMode){
      this.searchBarMode=searchMode

    },
    logToConsole(){
      console.log("test method called!")
    },
    routeEvent(eventData,eventName){
      this.$emit('routed_' + eventName,eventData)
    }

  }
}
</script>

<style scoped lang="scss">
@import "../../scss/globalVariables/globalVariables";

  h4 {
    color: $secondaryColor;
    margin-top: 2em;
    font-style: normal;
  }

  p {
    color: $secondaryColor;
  }

  hr {
    border-color: $secondaryColor;
    margin-bottom: 0;
  }

  .coloredHr {
    background-color: $secondaryColor;
    padding-bottom: .25em;
  }

  label {
    color: $secondaryColor;
  }

  input {
    background-color: $primaryColor;
  }

  em {
    text-decoration: none;
    font-weight: 600;
  }

</style>
