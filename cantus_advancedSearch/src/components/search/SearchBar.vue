<template>
  <div class="container-fluid">



    <div>
      <div class="searchBar_iconHolder"><i class="fas fa-home"></i></div>
      <div class="searchBar_iconHolder" :class="fadeInAtEvent">
        <i @click="toggleFullScreen" class="far fa-window-maximize"></i>
      </div>
      <div @click="toggleInterfaceLock(true)" class="searchBar_iconHolder" :class="fadeInAtEvent"><i class="fas fa-lock"></i></div>
      <div @click="toggleInterfaceLock(false)" class="searchBar_iconHolder" :class="fadeInAtEvent"><i class="fas fa-unlock"></i></div>
    </div>

    <hr>
    <i class="fas fa-search" :class="fadeInAtEvent === 'hidden' ? '' : 'hidden'"></i>
    <br>
    <h4 :class="fadeInAtEvent">Wilkommen zur erweiterten Suche von Cantus</h4>
    <p :class="fadeInAtEvent">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p>

    <hr class="coloredHr" :class="fadeInAtEvent">

    <br>
    <h5 :class="fadeInAtEvent">Genre</h5>
    <p :class="fadeInAtEvent">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna</p>
    <p :class="fadeInAtEvent">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna</p>

    <div class="input-group mb-3" :class="fadeInAtEvent">
      <div class="input-group-prepend">
        <label class="input-group-text" for="inputGroupSelect01">LO</label>
      </div>
      <select v-model="chosenLO" class="custom-select" id="inputGroupSelect01">
        <option selected>Bitte wählen...</option>
        <option value="passau">PASSAU RESP.TEST</option>
        <option value="passau.ur">Passau Ur</option>
        <option value="passau.sp">Passau SP</option>
        <option value="FAIL_QUERY">MALFORMED_QUERY</option>
        <option value="/api/users?delay=5">DELAYED_RESPONSE_5sek</option>
        <option value="/api/users?delay=12">DELAYED_RESPONSE_12sek_error_displayed</option>


        <option value="salzburg.ur">Salzburg Ur</option>
        <option value="klosterneuburg.ur">Kosterneuburg Ur</option>
      </select>
    </div>

    <div class="input-group mb-3" :class="fadeInAtEvent">
      <div class="input-group-prepend">
        <label class="input-group-text" for="inputGroupSelect03">Genre</label>
      </div>
      <select @change="searchResp(chosenGenre)" v-model="chosenGenre" class="custom-select" id="inputGroupSelect03">
        <option selected value="default">Bitte wählen...</option>
        <option value="RP">RP</option>
        <option value="AB">AB</option>
        <option value="AE">AE</option>
      </select>
    </div>

    <h4 :class="fadeInAtEvent">Zeitraum oder Fest</h4>

    <div class="input-group mb-3" :class="fadeInAtEvent">
      <div class="input-group-prepend">
        <label class="input-group-text" for="inputGroupSelect02">Zeitraum</label>
      </div>
      <select v-model="curQueryObject" class="custom-select" id="inputGroupSelect02">
        <option selected value="default">Bitte wählen...</option>
        <option value="weihnachten">Weihnachten</option>

        <!--<option value="adventsonntage">Adventsonntage</option>-->
        <!--<option value="nachostern">Nachostern</option>-->

        <!--<option value="queryTriduumSacrum">Triduum Sacrum</option>-->
        <!--<option value="queryNachOstern">Nachostern</option>-->
        <!--<option value="queryPfingsten">Pfingsten</option>-->

        <!--<option value="querySonntageNachPfingsten">Sonntage nach Pfingsten</option>-->
        <!--<option value="queryCommuneSanctorum">Commune Sanctorum</option>-->
        <!--<option value="queryAdventSonntage">Adventsonntage</option>-->

        <!--<option value="queryAdventQuatember">Adventquatember</option>-->
        <!--<option value="queryZeitImKirchenjahr">Zeit im Kirchenjahr</option>-->

      </select>
    </div>


    <button @click.prevent="searchResp(chosenGenre)" class="btn btn-secondary" :class="fadeInAtEvent">Query Abfragen</button>
    <p :class="fadeInAtEvent">{{blazeGraphQuery}}</p>

    <div :class="fadeInAtEvent">
      <app-model-select :options="autoCompleteOptions" v-model="selectedFeast"></app-model-select>
      <p>Ausgewählte Feast-ID: {{selectedFeast.value}}</p>
    </div>

  </div>



</template>

<script>
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'
import {EventBus} from "../../main";
import {autocompleteVals} from "../../data/autocompleteVals"
import { ModelSelect } from 'vue-search-select'
let timer;
let searchTimer;
export default {
  name: "Search",
  components:{
    appModelSelect: ModelSelect
  },
  data(){
    return {
      fadeInAtEvent: 'hidden',
      server:'glossa.uni-graz.at',
      chosenGenre:'RP',
      chosenLO:'passau.ur',  //atm not in use
      curQueryObject:'weihnachten',  //for the times
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
      searchParams: 'search_getSearchParams'
    }),

    blazeGraphQuery(val){
      if(val===undefined)return;
      let searchParams = {
        chosenGenre:this.chosenGenre,
        chosenLO:this.chosenLO,
        chosenTimeFrame:this.curQueryObject
        //TODO update searchParams --> chosenFeast now additionally added!
      }
      this.$store.dispatch('search_setSearchParamsAction',searchParams)

      //testing failing query
      if(this.chosenLO==='FAIL_QUERY')return '9$$ß34'

      //for testing delayed respinse
      if(this.chosenLO==='/api/users?delay=5')return 'https://reqres.in/api/users?delay=5'
      if(this.chosenLO==='/api/users?delay=12')return 'https://reqres.in/api/users?delay=12'

      //for resp.test
      if(this.chosenLO==='passau') return `https://${this.server}/archive/objects/query:resp.test/methods/sdef:Query/getJSON?params=%241%7C${this.chosenGenre}`;

      // return different query when a feast is selected
      if(this.selectedFeast.value !== 'default'){
        let query = `https://${this.server}/archive/objects/query:cantus.genres/methods/sdef:Query/getJSON?params=%241%7C%3Chttps%3A%2F%2Fgams.uni-graz.at%2Fo%3Acantus.${this.chosenLO}%3E%3B%242%7C${this.chosenGenre}%3B%243%7C%${this.selectedFeast.value}%22`
        this.$store.dispatch('search_modifyCurSearchQueryAction',query)
        return query
      }

      //standard query
      let buildQuery = `https://${this.server}/archive/objects/query:cantus.${this.curQueryObject}/methods/sdef:Query/getJSON?params=%241%7C%3Chttps%3A%2F%2Fgams.uni-graz.at%2Fo%3Acantus.${this.chosenLO}%3E%3B%242%7C${this.chosenGenre}`
      this.$store.dispatch('search_modifyCurSearchQueryAction',buildQuery)
      return buildQuery


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
      if(newVal==='default')return;
      if(this.selectedFeast.value !=='default'){
        return this.selectedFeast.value = 'default'
      }
    },
    selectedFeast(newVal, oldVal){
      if(newVal==='default')return;
      if(this.curQueryObject!=='default'){
        return this.curQueryObject = 'default'
      }
    }
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
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../scss/globalVariables/globalVariables";

  .container-fluid {
    border: .1em solid $secondaryColor;
  }

  h4 {
    color: $secondaryColor;
    margin-top: 2em;
    font-style: normal;
  }

  .searchBar_iconHolder {
    display: inline-block;
    &:hover {
      cursor: pointer;
      i {color: $fourthColor}
      }
  }

  i {
    color: $secondaryColor;
    font-size: 1.5em;
    margin-top: 1em;
    margin-right: .75em;
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

</style>
