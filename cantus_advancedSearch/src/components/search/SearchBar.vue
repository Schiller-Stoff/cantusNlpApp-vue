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
        <option value="Passau">Passau</option>
        <option value="Salzburg">Salzburg</option>
        <option value="Regensburg">Regensburg</option>
      </select>
    </div>

    <div class="input-group mb-3" :class="fadeInAtEvent">
      <div class="input-group-prepend">
        <label class="input-group-text" for="inputGroupSelect02">Zeitraum</label>
      </div>
      <select v-model="curQueryObject" class="custom-select" id="inputGroupSelect02">
        <option selected>Bitte wählen...</option>
        <option value="resp.test">resp.test</option>
        <option value="queryWeihnachten">Weihnachten</option>
        <option value="queryVorfastenzeit">Vorfastenzeit</option>
        <option value="queryFastenzeit">Fastenzeit</option>

        <option value="queryTriduumSacrum">Triduum Sacrum</option>
        <option value="queryNachOstern">Nachostern</option>
        <option value="queryPfingsten">Pfingsten</option>

        <option value="querySonntageNachPfingsten">Sonntage nach Pfingsten</option>
        <option value="queryCommuneSanctorum">Commune Sanctorum</option>
        <option value="queryAdventSonntage">Adventsonntage</option>

        <option value="queryAdventQuatember">Adventquatember</option>
        <option value="queryZeitImKirchenjahr">Zeit im Kirchenjahr</option>

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
    <button @click.prevent="searchResp(chosenGenre)" class="btn btn-secondary" :class="fadeInAtEvent">Button atm nutzlos</button>
    <p :class="fadeInAtEvent">{{blazeGraphQuery}}</p>
  </div>
</template>

<script>
import {EventBus} from "../../main";
let timer;
export default {
  name: "Search",
  data(){
    return {
      interfaceLocked: false,
      fadeInAtEvent: 'hidden',
      server:'glossa.uni-graz.at',
      chosenGenre:'RP',
      chosenLO:'Passau',  //atm not in use
      curQueryObject:'resp.test'  //for the times

    }
  },
  computed: {
    blazeGraphQuery(){

      //return `https://${this.server}/archive/objects/query:${this.curQueryObject}/methods/sdef:Query/getJSON?params=%241%7C${this.chosenLO}%3B%242%7C${this.chosenGenre}`

      return `https://${this.server}/archive/objects/query:${this.curQueryObject}/methods/sdef:Query/getJSON?params=%241%7C${this.chosenGenre}`
    }
  },
  methods: {
    searchResp(respShortcut){
      if(respShortcut==='default')return;
      this.$http.get(this.blazeGraphQuery).then(response => {
        EventBus.$emit('resultReceived', response.body)
      });
    },
    toggleFullScreen(){
      EventBus.$emit('toggleFullScreen');
    },
    toggleInterfaceLock(lock_boolean){
      if(lock_boolean){
        EventBus.$emit('interfaceLocked')
      } else {
        EventBus.$emit('interfaceOpened')
      }

      return this.interfaceLocked = lock_boolean
    }
  },
  created(){
    let self = this;
    EventBus.$on('searchBarEnlarge',_=>{
      timer = setTimeout(_=>{
        self.fadeInAtEvent = 'animated once fadeIn'
      },100)

    })

    EventBus.$on('searchBarMinified',_=>{
      clearTimeout(timer)
      self.fadeInAtEvent = 'hidden'
    })

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
    color: $primaryColor;
  }

  input {
    background-color: $primaryColor;
  }

</style>
