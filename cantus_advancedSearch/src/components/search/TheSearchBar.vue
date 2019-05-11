<template>
  <div class="container-fluid">
    <app-the-search-control
      class="container-fluid"
      :showFull="searchBarEnlarged"
      @searchModeDemanded="toggleSearchMode($event)"

    ></app-the-search-control>



    <h4 :class="fadeInAtEvent">Wilkommen zur erweiterten Suche von Cantus</h4>
    <p :class="fadeInAtEvent">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p>

    <br>
    <h5 :class="fadeInAtEvent">Genre</h5>
    <p :class="fadeInAtEvent">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna</p>
    <p :class="fadeInAtEvent">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna</p>

    <hr :class="fadeInAtEvent">
    <h4 :class="fadeInAtEvent">Suche</h4>

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
      <select v-model="chosenGenre" class="custom-select" id="inputGroupSelect03">
        <option selected value="default">Bitte wählen...</option>
        <option value="AB">AB - Antiphon zum Benedictus</option>
        <option value="AC">AC - Antiphon zur Commemoratio bzw. ad suffragium</option>
        <option value="AD">AD - Antiphon zum Nunc dimittis</option>
        <option value="AE">AE - Cantica-Antiphon (Evangelium)</option>
        <option value="ALV">ALV - Alleluia-Vers</option>
        <option value="AM">AM - Antiphon zum Magnificat</option>
        <option value="AN">AN - Antiphon</option>
        <option value="AP">AP - Prozessionsantiphon</option>
        <option value="AS">AS - Marianische Schlussantiphon</option>

        <option value="CO">CO - Communio</option>
        <option value="CP">CP - Capitulum</option>

        <option value="EP">EP - Epistel</option>
        <option value="EPP">EPP - Epistel aus den Propheten</option>
        <option value="EV">EV - Evangelium</option>

        <option value="GR">GR - Graduale</option>

        <option value="HY">HY - Hymnus</option>

        <option value="IN">IN - Introitus</option>
        <option value="INV">INV - Invitatorium</option>

        <option value="LE">LE - Lectio (AT/NT)</option>
        <option value="LH">LH - Homilie als Lectio</option>
        <option value="LHI">LHI - Lectio aus Historia, Vita, Passio, Legenda</option>
        <option value="LS">LS - Sermo als Lectio</option>

        <option value="OF">OF - Offertorium</option>

        <option value="PR">PR - Prosa</option>
        <option value="PS">PS - Psalm</option>

        <option value="RB">RB - Responsorium breve</option>
        <option value="RP">RP - Responsorium prolixum</option>
        <option value="RPP">RPP - Prozessionsresponsorium</option>

        <option value="SE">SE - Sequenz</option>
        <option value="TP">TP - Tropus</option>
        <option value="TR">TR - Tractus</option>
        <option value="VIS">VIS - Visitatio sepulchri</option>
        <option value="VS">VS - Versikel</option>

      </select>
    </div>

    <br>
    <div :class="fadeInAtEvent">
      <!--<h4>Zeitraum oder Fest</h4>-->
      <p>Wählen Sie einen <em>Zeitraum</em> oder ein...</p>
    </div>
    <div class="input-group mb-3" :class="fadeInAtEvent">
      <div class="input-group-prepend">
        <!--<label class="input-group-text" for="inputGroupSelect02">Zeitraum</label>-->
      </div>
      <select v-model="curQueryObject" class="custom-select" id="inputGroupSelect02">
        <option selected value="default">Bitte wählen...</option>
        <option value="weihnachten">Weihnachten</option>
        <option value="vorfastenzeit">Vorfastenzeit</option>
        <option value="fastenzeit">Fastenzeit</option>
        <option value="triduumSacrum">Triduum Sacrum</option>
        <option value="nachOstern">Nachostern</option>
        <option value="pfingsten">Pfingsten</option>
        <option value="sonntageNachPfingsten">Sonntage nach Pfingsten</option>
        <option value="communeSanctorum">Commune Sanctorum</option>
        <option value="adventSonntage">Adventsonntage</option>
        <option value="adventQuatember">Adventquatember</option>
        <option value="zeitImKirchenJahr">Zeit im Kirchenjahr</option>
      </select>
    </div>


    <!--<h4>Query for Zeiträume AND Einzelfeste</h4>-->
    <!--<p :class="fadeInAtEvent">{{blazeGraphQuery}}</p>-->

    <!--<h4>Data Query for the "vergleichende Visualisierung"</h4>-->
    <!--<p>{{dataQuery}}</p>-->
    <div :class="fadeInAtEvent">
      <p>...<em>einzelnes Fest</em>.</p>
      <app-model-select :options="autoCompleteOptions" v-model="selectedFeast"></app-model-select>
      <br>
      <button @click.prevent="searchResp(chosenGenre);searchVizCompareData('viz_setVizCompareDataAction')" class="btn btn-primary" :class="fadeInAtEvent">Suche starten</button>
    </div>
    <br :class="fadeInAtEvent">

    <br :class="fadeInAtEvent">
    <br :class="fadeInAtEvent">
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

let timer;
let searchTimer;
export default {
  name: "Search",
  components:{
    appModelSelect: ModelSelect,
    appTheSearchControl: TheSearchControl
  },
  data(){
    return {
      showIncipitSearch:true,

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
    toggleSearchMode(searchMode){

      if(searchMode==='fullTextSearch')this.showIncipitSearch = false;

      if(searchMode==='incipitSearch')this.showIncipitSearch = true;

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
