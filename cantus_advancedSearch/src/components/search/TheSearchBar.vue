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
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'
import {EventBus} from "../../main";
import { ModelSelect } from 'vue-search-select'
import {autocompleteVals} from "../../data/autocompleteVals"
import {timeFrames} from '../../data/timeFrameFeasts'
import TheSearchControl from './searchBar/TheSearchControl'
import TheSearchHelpText from './searchBar/TheSearchHelpText'
import TheIncipitSearch from './searchBar/TheIncipitSearch'
import TheFullTextSearch from './searchBar/TheFullTextSearch'

let timer;
let searchTimer;
export default {
  name: "Search",
  components:{
    appModelSelect: ModelSelect,
    appTheSearchControl: TheSearchControl,
    appTheSearchHelpText: TheSearchHelpText,
    appTheIncipitSearch: TheIncipitSearch,
    appTheFullTextSearch: TheFullTextSearch
  },
  data(){
    return {
      searchBarMode:'appTheSearchHelpText',

      fadeInAtEvent: 'hidden',
      server:'glossa.uni-graz.at',
      chosenGenre:'RP',
      chosenLO:'passau.ur',  //atm not in use

      //needed for handling selection of timeframes -> like "pfingsten"
      curQueryObject:'weihnachten',  //for the times
      timeFrames, //ES6 shortcut for timeFrames:timeFrames (imported above)
      feasts: ['02122400','02122500','02122600','02122700','02122800','05010600'], //TODO atm per standard filled with christmas feasts

      //handling Einzelfest
      selectedFeast:{
        value:'default',
        text:'default'
      },
      autoCompleteOptions:autocompleteVals

    }
  },
  computed: {
    ...mapGetters({
      searchBarEnlarged: 'interfaceStates_currentSearchBarState',
      interfaceLocked: 'interfaceStates_currentSearchLockState',
      searchParams: 'search_getSearchParams',
      vizCompareQuery:'search_getVizCompareQuery'
    }),

    blazeGraphQuery(val){
      if(val===undefined)return;
      let searchParams = {
        chosenGenre:this.chosenGenre,
        chosenLO:this.chosenLO,
        chosenTimeFrame:this.curQueryObject,
        chosenFeast: this.selectedFeast.text
      }
      this.$store.dispatch('search_setSearchParamsAction',searchParams)

      //testing failing query
      if(this.chosenLO==='FAIL_QUERY')return '9$$ß34'

      //for testing delayed respinse
      if(this.chosenLO==='/api/users?delay=5')return 'https://reqres.in/api/users?delay=5'
      if(this.chosenLO==='/api/users?delay=12')return 'https://reqres.in/api/users?delay=12'

      //for resp.test
      if(this.chosenLO==='passau') return `https://${this.server}/archive/objects/query:resp.test/methods/sdef:Query/getJSON?params=%241%7C${this.chosenGenre}`;

      // return correct query
      // takes feasts numbers in "feasts" array and build correct SPARQL via string concatination
      // a UNION triple-statement
      if(this.feasts.length > 1){
        let buildQuery = `https://${this.server}/archive/objects/query:cantus.genres/methods/sdef:Query/getJSON?params=%241%7C%3Chttps%3A%2F%2Fgams.uni-graz.at%2Fo%3Acantus.${this.chosenLO}%3E%3B%242%7C${this.chosenGenre}%3B%243%7C`
        for (let i = 0; i < this.feasts.length; i++) {
          if(i===0){
            buildQuery += `%7B%3Ffeast%20cantus%3AfeastCode%20%22${this.feasts[i]}%22%7D`
          } else {
            buildQuery += `%20UNION%20%7B%3Ffeast%20cantus%3AfeastCode%20%22${this.feasts[i]}%22%7D`
          }
        }
        this.$store.dispatch('search_modifyCurSearchQueryAction',buildQuery)
        return buildQuery
      } else {
        let query = `https://${this.server}/archive/objects/query:cantus.genres/methods/sdef:Query/getJSON?params=%241%7C%3Chttps%3A%2F%2Fgams.uni-graz.at%2Fo%3Acantus.${this.chosenLO}%3E%3B%242%7C${this.chosenGenre}%3B%243%7C%7B%3Ffeast%20cantus%3AfeastCode%20%22${this.selectedFeast.value}%22%7D`
        this.$store.dispatch('search_modifyCurSearchQueryAction',query)
        return query
      }
    },
    dataQuery(){
      let queryStart = `https://${this.server}/archive/objects/query:cantus.countgenre/methods/sdef:Query/getJSON?params=%241%7C${this.chosenGenre}%3B%242%7C`
      for (let i = 0; i <this.feasts.length; i++) {
        let feast = this.feasts[i]
        if(i===0){
          queryStart += `%7B%3Ffeast%20cantus%3AfeastCode%20%22${feast}%22%7D%20`
        } else {
          queryStart += `UNION%20%7B%3Ffeast%20cantus%3AfeastCode%20%22${feast}%22%7D%20`
        }
      }
      this.$store.dispatch('search_setVizCompareQueryAction',queryStart)
      return queryStart
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
    },
    curQueryObject(newVal,oldVal){
      let curTimeFrame = this.timeFrames[this.curQueryObject]
      if(curTimeFrame) {  //skip whnen curQueryObject is set to default
        for (let i = 0; i < curTimeFrame.length; i++) {
          if (i === 0) {
            this.addToFeasts(curTimeFrame[i], false)
          } else {
            this.addToFeasts(curTimeFrame[i], true)
          }
        }
      }

      if(newVal==='default')return;
      if(this.selectedFeast.value !=='default'){
        this.selectedFeast.text = 'default'
        return this.selectedFeast.value = 'default'
      }
    },
    selectedFeast(newVal, oldVal){
      this.addToFeasts(this.selectedFeast.value,false)
      if(newVal==='default')return;
      if(this.curQueryObject!=='default'){
        return this.curQueryObject = 'default'
      }
    },
  },
  methods: {
    ...mapActions({
      lockInterface: 'interfaceStatesAction_lockSearchbar',
      unlockInterface:'interfaceStatesAction_unlockSearchbar'
    }),
    searchResp(respShortcut){
      if(respShortcut==='default')return; //todo needs to be redone! -> causes search start atm because default is now passau!

      this.$store.dispatch('search_setSearchFailedAction',false)
      this.$store.dispatch('search_markOngoingSearchAction', true)

      //if in 10 secs no response fail
      searchTimer = setTimeout(_=>{
        this.$store.dispatch('search_setSearchFailedAction',true)
        this.runningRequest.abort()
      },10000)

      //let vuexSearchQuery = this.$store.getters.search_getCurSearchQuery  todo use getter for query ...> but then bug!
      this.$http.get(this.blazeGraphQuery, {
        //vue resource specific: using above to cancel current request
        before(request){
          this.runningRequest = request
        }
      }).then(response => {
        this.$store.dispatch('search_setSearchResultAction',response)
        this.$store.dispatch('search_pushOntoSearchHistoryAction',{response:response, searchParams:this.searchParams})
        clearTimeout(searchTimer)
      },err => {
        this.$store.dispatch('search_setSearchFailedAction',true)
        clearTimeout(searchTimer)
      }).finally(_=>{
        this.$store.dispatch('search_markOngoingSearchAction', false)
      });
    },
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
    toggleFullScreen(){
      EventBus.$emit('toggleFullScreen');   //todo remove! -> handle via vuex!
    },
    toggleInterfaceLock(lock_boolean){
      // uses lockInterface() method -> calls vuex-actions
      if(lock_boolean){
        this.lockInterface()
      } else {
        this.unlockInterface()
      }
    },
    addToFeasts(feastNumbr, prependFlag = true){
      if(!feastNumbr)return console.warn("No Feastnumber given to addToFeasts, but method was called.")
      if(!prependFlag){
        this.feasts.length = 0
      }
      this.feasts.push(feastNumbr)
    },
    switchSearchMode(searchMode){
      this.searchBarMode=searchMode

    },

    //from here new methods
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
