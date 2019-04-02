<template>
  <div class="container-fluid">

    <div>
      <div class="searchBar_iconHolder"><i class="fas fa-home"></i></div>
      <div class="searchBar_iconHolder" :class="fadeInAtEvent">
        <i @click="toggleFullScreen" class="far fa-window-maximize"></i>
      </div>
      <div class="searchBar_iconHolder" :class="fadeInAtEvent"><i class="fas fa-lock"></i></div>
      <div class="searchBar_iconHolder" :class="fadeInAtEvent"><i class="fas fa-unlock"></i></div>
    </div>

    <hr>
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
      <select class="custom-select" id="inputGroupSelect01">
        <option selected>Bitte wählen...</option>
        <option value="1">Passau</option>
        <option value="2">Salzburg</option>
        <option value="3">Regensburg</option>
      </select>
    </div>

    <div class="input-group mb-3" :class="fadeInAtEvent">
      <div class="input-group-prepend">
        <label class="input-group-text" for="inputGroupSelect02">Genre</label>
      </div>
      <select @change="searchResp(chosenGenre)" v-model="chosenGenre" class="custom-select" id="inputGroupSelect02">
        <option selected value="default">Bitte wählen...</option>
        <option value="RP">RP</option>
        <option value="AB">AB</option>
        <option value="AE">AE</option>
      </select>
    </div>
    <button @click.prevent="searchResp(chosenGenre)" class="btn btn-secondary" :class="fadeInAtEvent">Button atm nutzlos</button>
  </div>
</template>

<script>
import {EventBus} from "../../main";

export default {
  name: "Search",
  data(){
    return {
      chosenGenre:'default',
      fadeInAtEvent: 'd-none'
    }
  },
  methods: {
    searchResp(respShortcut){
      if(respShortcut==='default')return;
      let searchUrl = `https://glossa.uni-graz.at/archive/objects/query:resp.test/methods/sdef:Query/getJSON?params=%241%7C${respShortcut}`
      this.$http.get(searchUrl).then(response => {
        //console.log(response.body.length)
        EventBus.$emit('resultReceived', response.body)
      });
    },
    toggleFullScreen(){
      EventBus.$emit('toggleFullScreen');
    }
  },
  created(){
    let self = this;
    EventBus.$on('searchBarEnlarge',_=>{
      self.fadeInAtEvent = 'animated once fadeIn'
    })

    EventBus.$on('searchBarMinified',_=>{
      self.fadeInAtEvent = 'd-none'
    })

  }
}
</script>

<style scoped lang="scss">
@import "../../scss/globalVariables/globalVariables";

  h4 {
    color: $primaryColor;
    margin-top: 2em;
  }

  .searchBar_iconHolder {
    display: inline-block;
  }

  i {
    color: white;
    font-size: 1.5em;
    margin-top: 1em;
    margin-right: .75em;
  }

  p {
    color: $primaryColor;
  }

  hr {
    background-color: $primaryColor;
  }

  .coloredHr {
    background-color: $fourthColor;
    padding-bottom: .25em;
  }

  label {
    color: $primaryColor;
  }

  input {
    background-color: $primaryColor;
  }

</style>
