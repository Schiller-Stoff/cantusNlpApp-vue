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
      <select v-model="chosenGenre" class="custom-select" id="inputGroupSelect03">
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


    <button @click.prevent="searchResp(chosenGenre)" class="btn btn-secondary" :class="fadeInAtEvent">Query Abfragen</button>

    <h4>Query for Zeiträume AND Einzelfeste</h4>
    <p :class="fadeInAtEvent">{{blazeGraphQuery}}</p>

    <h4>Data Query for the "vergleichende Visualisierung"</h4>
    <p>{{dataQuery}}</p>

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

      //needed for handling selection of timeframes -> like "pfingsten"
      curQueryObject:'weihnachten',  //for the times
      timeFrames: {
        weihnachten: ['02122400','02122500','02122600','02122700','02122800','05010600'],
        vorfastenzeit: ['06011000','06021000','06031000','06034000'],
        fastenzeit: ['07011000','07012000','07013000','07014000','07015000','07016000','07017000','07018000','07021000','07022000','07023000','07024000','07025000','07026000','07027000','07028000','07031000','07032000','07033000','07034000','07035000','07036000','07037000','07038000','07041000','07042000','07043000','07044000','07045000','07046000','07047000','07048000','07051000','07052000','07053000','07054000','07055000','07056000','07057000','07058000','07061000','07062000','07062000','07063000','07063000','07064000','07064000'],
        triduumSacrum: ['07065000','07065010','07066000','07067000','08011000'],
        nachOstern: ['08012000','08013000','08014000','08015000','08016000','08017000','08017000','08021000','08022000','08023000','08024000','08025000','08026000','08026010','08027000','08031000','08032000','08033000','08034000','08035000','08036000','08037000','08041000','08042000','08042500','08043000','08044000','08045000','08046000','08047000','08051000','08052000','08053000','08054000','08055000','08056000','08057000','08061000','08062000','08063000','08064000'],
        pfingsten: ['08081000','08081008','08081008','08082000','08082000','08083000','08083000','08084000','08084000','08085000','08085000','08086000','08086000','08087000','08087000'],
        sonntageNachPfingsten: ['09021000','09031000','09041000','09051000','09061000','09071000','09081000','09091000','09101000','09111000','09121000','09131000','09141000','09151000','09161000','09171000','09181000','09191000','09201000','09211000','09221000','09231000','09241000','09251000','09261000'],
        communeSanctorum:['12001000','12002000','12002100','12003000','12004000','12004100','12004700','12005000','12005200','12005100','12006000','12007000','12007200','12011000','12801000','12802000','12803000','12804000','12805000','12806000','12807000'],
        adventSonntage:['01011000', '01021000', '01031000', '01041000'],
        adventQuatember:['01034009', '01036009', '01037009'],
        zeitImKirchenJahr:['04001000', '04002000', '04003000', '04004000', '04005000', '04006000', '04007000']

      },
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
